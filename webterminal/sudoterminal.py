import paramiko
import re
try:
    import simplejson as json
except ImportError:
    import json
from django.utils.encoding import smart_unicode
import threading
from common.models import ServerInfor
import StringIO
import socket
import traceback
import logging
logger = logging.getLogger(__name__)


class ShellHandler(object):

    def __init__(self, ip, username, port, method, credential, timeout=3, channel_name=None):
        if method not in ['key', 'password']:
            raise Exception('Authication must be key or password')
        self.ssh = paramiko.SSHClient()
        self.ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        from webterminal.asgi import channel_layer
        if method == 'password':
            self.ssh.connect(ip, port=port, username=username,
                             password=credential, timeout=timeout)
        else:
            private_key = StringIO.StringIO(credential)
            if 'RSA' in credential:
                private_key = paramiko.RSAKey.from_private_key(private_key)
            elif 'DSA' in credential:
                private_key = paramiko.DSSKey.from_private_key(private_key)
            elif 'EC' in credential:
                private_key = paramiko.ECDSAKey.from_private_key(private_key)
            elif 'OPENSSH' in credential:
                private_key = paramiko.Ed25519Key.from_private_key(
                    private_key)
            else:
                logger.error(
                    "Unknown or unsupported key type, only support rsa dsa ed25519 ecdsa key type!")
            try:
                self.ssh.connect(ip, port=port, username=username,
                                 pkey=private_key, timeout=timeout)
            except socket.timeout:
                logger.error('Connect to server {0} time out!'.format(ip))
                self.is_connect = False
                return
            except Exception as e:
                logger.error(traceback.print_exc())
                self.is_connect = False
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
        from webterminal.asgi import channel_layer
        channel_layer.send(channel_name, {'text': json.dumps(
            ['stdout', smart_unicode('command executed: {}'.format(cmd))])})
        logger.debug('command executed: {}'.format(cmd))
        logger.debug('STDOUT:')
        channel_layer.send(channel_name, {'text': json.dumps(
            ['stdout', smart_unicode('STDOUT:')])})
        for line in out_buf:
            logger.debug(line, "end=")
            channel_layer.send(channel_name, {'text': json.dumps(
                ['stdout', smart_unicode(line.strip('\n'))])})
        channel_layer.send(channel_name, {'text': json.dumps(
            ['stdout', smart_unicode('end of STDOUT')])})
        logger.debug('end of STDOUT')
        channel_layer.send(channel_name, {'text': json.dumps(
            ['stdout', smart_unicode('STDERR:')])})
        logger.debug('STDERR:')
        for line in err_buf:
            logger.debug(line, "end=")
            channel_layer.send(channel_name, {'text': json.dumps(
                ['stdout', smart_unicode(line, "end=")])})
        channel_layer.send(channel_name, {'text': json.dumps(
            ['stdout', smart_unicode('end of STDERR')])})
        logger.debug('end of STDERR')
        channel_layer.send(channel_name, {'text': json.dumps(
            ['stdout', smart_unicode('finished with exit status: {}'.format(exit_status))])})
        logger.debug('finished with exit status: {}'.format(exit_status))
        channel_layer.send(channel_name, {'text': json.dumps(
            ['stdout', smart_unicode('------------------------------------')])})
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

    def __init__(self, message=None, commands=None, server_list=None):
        super(ShellHandlerThread, self).__init__()
        self.commands = commands
        self.server_list = server_list
        self.message = message

    def run(self):
        for server_ip in self.server_list:
            self.message.reply_channel.send({"text": json.dumps(
                ['stdout', '\033[1;3;31mExecute task on server:{0} \033[0m'.format(server_ip)])}, immediately=True)

            # get server credential info
            serverdata = ServerInfor.objects.get(ip=server_ip, credential__protocol__in=[
                                                 'ssh-password', 'ssh-key'])
            port = serverdata.credential.port
            method = serverdata.credential.method
            username = serverdata.credential.username
            if method == 'password':
                credential = serverdata.credential.password
            else:
                credential = serverdata.credential.key

            # do actual job
            ssh = ShellHandler(server_ip, username, port, method,
                               credential, channel_name=self.message.reply_channel.name)
            for command in self.commands:
                if ssh.is_connect:
                    ssh.execute(command)
                else:
                    self.message.reply_channel.send({"text": json.dumps(
                        ['stdout', '\033[1;3;31mCan not connect to server {0}! \033[0m'.format(server_ip)])}, immediately=True)
                    break
            del ssh
