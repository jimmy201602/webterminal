import paramiko
import re
try:
    from django.utils.encoding import smart_unicode
except ImportError:
    from django.utils.encoding import smart_text as smart_unicode
import threading
import socket
import traceback
import logging
from asgiref.sync import async_to_sync
logger = logging.getLogger(__name__)


class ShellHandler(object):

    def __init__(self, ip, username, port, password, timeout=3, channel_name=None):
        self.ssh = paramiko.SSHClient()
        self.ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        from channels.layers import get_channel_layer
        channel_layer = get_channel_layer()
        try:
            self.ssh.connect(ip, port=port, username=username,
                             password=password, timeout=timeout)
        except socket.timeout:
            logger.error('Connect to server {0} time out!'.format(ip))
            self.is_connect = False
            async_to_sync(channel_layer.send)(channel_name, {
                'text': 'Connect to server {0} time out!\r\n'.format(ip), "type": "webterminal.message"})
            return
        except Exception as e:
            logger.error(e)
            self.is_connect = False
            async_to_sync(channel_layer.send)(
                channel_name, {'text': '{0}\r\n'.format(e), "type": "webterminal.message"})
            return
        channel = self.ssh.invoke_shell(term='xterm')
        self.stdin = channel.makefile('wb')
        self.stdout = channel.makefile('r')
        self.channel_name = channel_name
        self.is_connect = True

    def __del__(self):
        self.ssh.close()

    @staticmethod
    def _print_exec_out(cmd, out_buf, err_buf, exit_status, channel_name=None):
        from channels.layers import get_channel_layer
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.send)(channel_name, {'text': smart_unicode(
            'command executed: {}\r\n'.format(cmd)), "type": "webterminal.message"})
        logger.debug('command executed: {}'.format(cmd))
        logger.debug('STDOUT:')
        async_to_sync(channel_layer.send)(channel_name, {
            'text': smart_unicode('STDOUT:\r\n'), "type": "webterminal.message"})
        for line in out_buf:
            logger.debug("{0} end=".format(line))
            async_to_sync(channel_layer.send)(channel_name, {'text': '{0}\r\n'.format(
                smart_unicode(line.strip('\n'))), "type": "webterminal.message"})
        async_to_sync(channel_layer.send)(channel_name, {'text': smart_unicode(
            'end of STDOUT\r\n'), "type": "webterminal.message"})
        logger.debug('end of STDOUT')
        async_to_sync(channel_layer.send)(channel_name, {
            'text': smart_unicode('STDERR:\r\n'), "type": "webterminal.message"})
        logger.debug('STDERR:')
        for line in err_buf:
            logger.debug("{0} end=".format(line))
            async_to_sync(channel_layer.send)(channel_name, {'text': '{0}\r\n'.format(
                smart_unicode(line, "end")), "type": "webterminal.message"})
        async_to_sync(channel_layer.send)(channel_name, {'text': smart_unicode(
            'end of STDERR\r\n'), "type": "webterminal.message"})
        logger.debug('end of STDERR')
        async_to_sync(channel_layer.send)(channel_name, {'text': smart_unicode(
            'finished with exit status: {}\r\n'.format(exit_status)), "type": "webterminal.message"})
        logger.debug('finished with exit status: {}'.format(exit_status))
        async_to_sync(channel_layer.send)(channel_name, {'text': smart_unicode(
            '------------------------------------\r\n'), "type": "webterminal.message"})
        logger.debug('------------------------------------')

    def execute(self, cmd):
        """

        :param cmd: the command to be executed on the remote computer
        :examples:  execute('ls')
                    execute('finger')
                    execute('cd folder_name')
        """
        cmd = cmd.strip('\n')
        self.stdin.write(cmd + '\n')
        finish = 'end of stdOUT buffer. finished with exit status'
        echo_cmd = 'echo {} $?'.format(finish)
        self.stdin.write(echo_cmd + '\n')
        shin = self.stdin
        self.stdin.flush()

        shout = []
        sherr = []
        exit_status = 0
        for line in self.stdout:
            if str(line).startswith(cmd) or str(line).startswith(echo_cmd):
                # up for now filled with shell junk from stdin
                shout = []
            elif str(line).startswith(finish):
                # our finish command ends with the exit status
                exit_status = int(str(line).rsplit()[-1])
                if exit_status:
                    # stderr is combined with stdout.
                    # thus, swap sherr with shout in a case of failure.
                    sherr = shout
                    shout = []
                break
            else:
                # get rid of 'coloring and formatting' special characters
                shout.append(re.compile(r'(\x9B|\x1B\[)[0-?]*[ -/]*[@-~]').sub('', line).
                             replace('\b', '').replace('\r', ''))

        # first and last lines of shout/sherr contain a prompt
        if shout and echo_cmd in shout[-1]:
            shout.pop()
        if shout and cmd in shout[0]:
            shout.pop(0)
        if sherr and echo_cmd in sherr[-1]:
            sherr.pop()
        if sherr and cmd in sherr[0]:
            sherr.pop(0)

        self._print_exec_out(cmd=cmd, out_buf=shout, err_buf=sherr,
                             exit_status=exit_status, channel_name=self.channel_name)
        return shin, shout, sherr


class ShellHandlerThread(threading.Thread):

    def __init__(self, channel_name=None, commands=None, server_list=None, server_ip=None, port=2100, username=None, password=None):
        super(ShellHandlerThread, self).__init__()
        self.commands = commands
        self.server_list = server_list
        self.channel_name = channel_name
        self.server_ip = server_ip
        self.port = port
        self.username = username
        self.password = password

    def run(self):
        for server_ip in self.server_list:
            from channels.layers import get_channel_layer
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.send)(self.channel_name, {
                'text': '\033[1;3;31mExecute task on server:{0} \033[0m\r\n'.format(server_ip), "type": "webterminal.message"})
            # do actual job
            ssh = ShellHandler(self.server_ip, self.username, self.port,
                               self.password, channel_name=self.channel_name)
            for command in self.commands:
                if ssh.is_connect:
                    try:
                        ssh.execute(command)
                    except OSError:
                        async_to_sync(channel_layer.send)(self.channel_name, {
                            'text': '\033[1;3;31mServer {0} has been closed the session! \033[0m\r\n'.format(server_ip), "type": "webterminal.message"})
                        break
                else:
                    async_to_sync(channel_layer.send)(self.channel_name, {
                        'text': '\033[1;3;31mCan not connect to server {0}! \033[0m\r\n'.format(server_ip), "type": "webterminal.message"})
                    break
            del ssh
