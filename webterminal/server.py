#!/usr/bin/env python

# Copyright (C) 2003-2007  Robey Pointer <robeypointer@gmail.com>
#
# This file is part of paramiko.
#
# Paramiko is free software; you can redistribute it and/or modify it under the
# terms of the GNU Lesser General Public License as published by the Free
# Software Foundation; either version 2.1 of the License, or (at your option)
# any later version.
#
# Paramiko is distributed in the hope that it will be useful, but WITHOUT ANY
# WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
# A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more
# details.
#
# You should have received a copy of the GNU Lesser General Public License
# along with Paramiko; if not, write to the Free Software Foundation, Inc.,
# 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA.

import base64
from binascii import hexlify
import sys
import os
from paramiko.ssh_exception import NoValidConnectionsError


def get_package_root():
    return os.path.dirname(os.path.abspath(__file__))


sys.path.insert(0,
                os.path.dirname(os.path.abspath(get_package_root())))

# setup django to use django orm
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "webterminal.settings")
import django
django.setup()

import socket
import threading
import traceback
import select
import paramiko
import time
from paramiko.py3compat import b, u, decodebytes, string_types
try:
    import SocketServer
except ImportError:
    import socketserver as SocketServer
from common.utils import get_redis_instance, mkdir_p, CustomeFloatEncoder
from webterminal.commandextract import CommandDeal
from common.models import ServerInfor, Log, CommandLog
from django.contrib.auth.models import User
from webterminal.encrypt import PyCrypt
from django.core.exceptions import ObjectDoesNotExist
import re
try:
    from StringIO import StringIO
except ImportError:
    from io import StringIO
try:
    from django.utils.encoding import smart_unicode
except ImportError:
    from django.utils.encoding import smart_text as smart_unicode
from webterminal.settings import MEDIA_ROOT
import codecs
try:
    import simplejson as json
except ImportError:
    import json
from django.utils import timezone
try:
    unicode
except NameError:
    unicode = str
# setup logging
# paramiko.util.log_to_file("demo_server.log")
import logging
import uuid
logging.basicConfig(level=logging.CRITICAL)

host_key = paramiko.RSAKey(filename="test_rsa.key")
# host_key = paramiko.DSSKey(filename='test_dss.key')
from webterminal.sftphandle import SftpHandle
from asgiref.sync import async_to_sync
from paramiko.ssh_exception import AuthenticationException, SSHException, PasswordRequiredException


class Server(paramiko.ServerInterface):
    # 'data' is the output of base64.b64encode(key)
    # (using the "user_rsa_key" files)
    data = (
        b"AAAAB3NzaC1yc2EAAAABIwAAAIEAyO4it3fHlmGZWJaGrfeHOVY7RWO3P9M7hp"
        b"fAu7jJ2d7eothvfeuoRFtJwhUmZDluRdFyhFY/hFAh76PJKGAusIqIQKlkJxMC"
        b"KDqIexkgHAfID/6mqvmnSJf0b5W8v5h2pI/stOSwTQ+pxVhwJ9ctYDhRSlF0iT"
        b"UWT10hcuO4Ks8="
    )
    good_pub_key = paramiko.RSAKey(data=decodebytes(data))
    channel = None
    serverid = None
    request_http_username = None
    request_conn_username = None
    channelid = None
    chanwidth = None
    chanheight = None
    session_type = None
    username = None
    password = None

    def __init__(self):
        self.event = threading.Event()

    def check_channel_request(self, kind, chanid):
        if kind == "session":
            return paramiko.OPEN_SUCCEEDED
        return paramiko.OPEN_FAILED_ADMINISTRATIVELY_PROHIBITED

    def check_auth_password(self, username, password):
        # self.serverid = 1
        # self.request_http_username = 'jimmy'
        # return paramiko.AUTH_SUCCESSFUL
        conn = get_redis_instance()

        encrypt = PyCrypt('88aaaf7ffe3c6c0488aaaf7ffe3c6c04')
        if password == '' or password == u'':
            return paramiko.AUTH_FAILED
        try:
            key = encrypt.encrypt(
                content=username + password)
            key = encrypt.md5_crypt(key)
        except:
            conn.delete(username)
            return paramiko.AUTH_FAILED

        conn_str = conn.get(key)
        if conn_str is None:
            conn.delete(username)
            conn.delete(key)
            return paramiko.AUTH_FAILED
        else:
            try:
                if isinstance(conn_str, bytes):
                    conn_str = conn_str.decode(
                        'utf8', 'ignore')
                serverid, request_username, request_conn_username = conn_str.rsplit(
                    '_')
                serverid = encrypt.decrypt(serverid)
                request_username = encrypt.decrypt(request_username)
                request_conn_username = encrypt.decrypt(
                    request_conn_username)
                self.request_http_username = request_username
                self.request_conn_username = request_conn_username
                try:
                    User.objects.get(username=request_username)
                except ObjectDoesNotExist:
                    # print('request user name not exist')
                    conn.delete(username)
                    conn.delete(key)
                    return paramiko.AUTH_FAILED
            except Exception:
                # print('user {0} auth failed'.format(username))
                conn.delete(username)
                conn.delete(key)
                traceback.print_exc()
                return paramiko.AUTH_FAILED

        try:
            data = ServerInfor.objects.get(id=serverid)
            self.serverid = int(serverid)
            request_conn_username_exist = False
            for credential in data.credentials.all():
                if credential.username == self.request_conn_username:
                    request_conn_username_exist = True
            if not request_conn_username_exist:
                # detect request connection user is not exist
                return paramiko.AUTH_FAILED
        except ObjectDoesNotExist:
            conn.delete(username)
            conn.delete(key)
            return paramiko.AUTH_FAILED

        if isinstance(conn.get(username), bytes) and isinstance(password, str):
            password = password.encode('utf8', 'ignore')

        try:
            if conn.get(username) is not None and password == conn.get(username) and serverid != None:
                # print('success connect to webterminal server')
                # conn.delete(username)
                # conn.delete(key)
                self.username = username
                self.password = password
                return paramiko.AUTH_SUCCESSFUL
        except Exception as e:
            conn.delete(username)
            conn.delete(key)
            traceback.print_exc()
            return paramiko.AUTH_FAILED
        conn.delete(username)
        conn.delete(key)
        return paramiko.AUTH_FAILED

    def check_auth_publickey(self, username, key):
        # print("Auth attempt with key: " + u(hexlify(key.get_fingerprint())))
        # print (username, u(hexlify(key.get_fingerprint())
        # ), u(hexlify(self.good_pub_key.get_fingerprint())))
        if (username == "robey") and (key == self.good_pub_key):
            return paramiko.AUTH_SUCCESSFUL
        return paramiko.AUTH_FAILED

    def check_auth_gssapi_with_mic(
        self, username, gss_authenticated=paramiko.AUTH_FAILED, cc_file=None
    ):
        """
        .. note::
            We are just checking in `AuthHandler` that the given user is a
            valid krb5 principal! We don't check if the krb5 principal is
            allowed to log in on the server, because there is no way to do that
            in python. So if you develop your own SSH server with paramiko for
            a certain platform like Linux, you should call ``krb5_kuserok()`` in
            your local kerberos library to make sure that the krb5_principal
            has an account on the server and is allowed to log in as a user.
        .. seealso::
            `krb5_kuserok() man page
            <http://www.unix.com/man-page/all/3/krb5_kuserok/>`_
        """
        if gss_authenticated == paramiko.AUTH_SUCCESSFUL:
            return paramiko.AUTH_SUCCESSFUL
        return paramiko.AUTH_FAILED

    def check_auth_gssapi_keyex(
        self, username, gss_authenticated=paramiko.AUTH_FAILED, cc_file=None
    ):
        if gss_authenticated == paramiko.AUTH_SUCCESSFUL:
            return paramiko.AUTH_SUCCESSFUL
        return paramiko.AUTH_FAILED

    def enable_auth_gssapi(self):
        return True

    def get_allowed_auths(self, username):
        return "gssapi-keyex,gssapi-with-mic,password,publickey"

    def check_channel_shell_request(self, channel):
        self.event.set()
        return True

    def check_channel_pty_request(
        self, channel, term, width, height, pixelwidth, pixelheight, modes
    ):
        self.chanheight = height
        self.chanwidth = width
        return True

    def get_banner(self):
        return ('Webterminal 1\n', 'en-US')

    def check_channel_window_change_request(self, channel, width, height,
                                            pixelwidth, pixelheight):
        # print("Change window size to {0}*{1})".format(width, height))
        self.chanheight = height
        self.chanwidth = width
        if self.channel is not None:
            self.channel.resize_pty(width=width, height=height)
        return True

    def check_channel_subsystem_request(self, channel, name):
        # set session type to handle subsystem protocol
        self.session_type = name
        self.event.set()
        transport = channel.get_transport()
        handler_class, larg, kwarg = transport._get_subsystem_handler(name)
        if handler_class is None:
            return False
        handler = handler_class(channel, name, self, *larg, **kwarg)
        handler.start()
        return True

    # def check_auth_none(self, username):
        # """
        # Determine if a client may open channels with no (further)
        # authentication.

        # Return ``AUTH_FAILED`` if the client must authenticate, or
        # ``AUTH_SUCCESSFUL`` if it's okay for the client to not
        # authenticate.

        # The default implementation always returns ``AUTH_FAILED``.

        # :param str username: the username of the client.
        # :return:
        # ``AUTH_FAILED`` if the authentication fails; ``AUTH_SUCCESSFUL`` if
        # it succeeds.
        # :rtype: int
        # """
        # return paramiko.AUTH_SUCCESSFUL


def posix_shell(chan, channel, channelid, serverchan):

    stdout = list()
    begin_time = time.time()
    last_write_time = {'last_activity_time': begin_time}
    command = list()
    logobj = Log.objects.get(log=channelid)
    vim_flag = False
    vim_data = ''
    first_redis_data = True

    try:
        directory_date_time = timezone.now()
        log_name = os.path.join('{0}-{1}-{2}'.format(directory_date_time.year,
                                                     directory_date_time.month, directory_date_time.day), '{0}'.format(channelid))
        from channels.layers import get_channel_layer
        channel_layer = get_channel_layer()
        # terminate ssh session control
        redis_instance = get_redis_instance()
        redis_sub = redis_instance.pubsub()
        redis_sub.subscribe(logobj.channel)
        # print(redis_sub.connection._sock.fileno()) # redis instance epool
        logging.debug(
            'Create control redis queue: {0}'.format(logobj.channel))
        while True:
            text = redis_sub.get_message()
            if text and first_redis_data and text['data'] == 1:
                text = None
                first_redis_data = False
            if text:
                logging.debug(
                    'Receive control command from redis, command: {0}'.format(text))
                try:
                    if isinstance(text['data'], bytes):
                        text['data'] = smart_unicode(text['data'])
                    data = json.loads(text['data'])
                except:
                    data = []
                if len(data) >= 1 and str(data[0]) == 'close':
                    logging.debug('Session terminated by administrator!')
                    chan.send(
                        '\033[1;3;31mSession terminated by administrator!\r\n\033[0m')
                    return
                    # if not channel.closed:
                    # channel.close()
                    # break

            epoll = select.epoll()
            epoll.register(channel.fileno(), select.EPOLLIN)

            events = epoll.poll(1)
            for fileno, event in events:
                if event & select.EPOLLIN:

                    # r, w, x = select.select([channel], [], [])
                    # if channel in r:
                    data = channel.recv(1024 * 24)
                    # logging.debug('server get data: {0}'.format(data))
                    epoll.modify(channel.fileno(), select.EPOLLIN)
                    if len(data) == 0:
                        print('close data 0')
                        if not channel.closed:
                            channel.send('\r\n*** EOF\r\n')
                        return
                    if data == b"exit\r\n" or data == b"logout\r\n" or data == b'logout' or data == b'<<<close>>>':
                        logging.debug(
                            'server receive exit code, exit recording')
                        # channel.close()
                        if data == b"exit\r\n" or data == b"logout\r\n" or data == b'logout':
                            chan.send(data)
                        return
                    now = time.time()
                    delay = now - last_write_time['last_activity_time']
                    last_write_time['last_activity_time'] = now

                    if vim_flag:
                        if isinstance(data, bytes):
                            vim_data += codecs.getincrementaldecoder(
                                'UTF-8')('replace').decode(data)
                        else:
                            vim_data += data

                    # fix rz upload bug
                    if '\r' not in codecs.getincrementaldecoder('UTF-8')('replace').decode(data):
                        command.append(codecs.getincrementaldecoder(
                            'UTF-8')('replace').decode(data))
                    else:
                        command_result = CommandDeal().deal_command(''.join(command))
                        if len(command_result) != 0:
                            # vim command record patch
                            if command_result.strip().startswith('vi') or command_result.strip().startswith('fg'):
                                CommandLog.objects.create(
                                    log=logobj, command=command_result[0:255])
                                vim_flag = True
                            else:
                                if vim_flag:
                                    if re.compile('\[.*@.*\][\$#]').search(vim_data):
                                        vim_flag = False
                                        vim_data = ''
                                else:
                                    CommandLog.objects.create(
                                        log=logobj, command=command_result[0:255])
                        command = list()

                    if isinstance(data, unicode):
                        stdout.append([delay, data])
                    else:
                        stdout.append([delay, codecs.getincrementaldecoder(
                            'UTF-8')('replace').decode(data)])
                    async_to_sync(channel_layer.group_send)(smart_unicode('monitor-{0}'.format(channelid)), {'text': json.dumps(
                        [codecs.getincrementaldecoder('UTF-8')('replace').decode(data), serverchan.chanwidth, serverchan.chanheight]), "type": "webterminal.message"})
                    if not chan.closed:
                        try:
                            chan.send(data)
                        except EOFError:
                            pass
                        except Exception:
                            traceback.print_exc()
                    else:
                        print('else return')
                        return
                else:
                    print('else')
                    pass
                # avoid cpu usage always 100%
                # time.sleep(0.001)
    except Exception:
        traceback.print_exc()
    finally:
        attrs = {
            "version": 1,
            "width": 180,
            "height": 40,
            "duration": round(time.time() - begin_time, 6),
            "command": os.environ.get('SHELL', None),
            'title': None,
            "env": {
                "TERM": os.environ.get('TERM'),
                "SHELL": os.environ.get('SHELL', 'sh')
            },
            'stdout': list(map(lambda frame: [round(frame[0], 6), frame[1]], stdout))
        }
        mkdir_p(
            '/'.join(os.path.join(MEDIA_ROOT, log_name).rsplit('/')[0:-1]))
        with open(os.path.join(MEDIA_ROOT, log_name), "a") as f:
            f.write(json.dumps(attrs, ensure_ascii=True,
                               cls=CustomeFloatEncoder, indent=2))
        logging.debug(
            'Write ssh session recording data to {0} succeed!'.format(log_name))
        logobj.is_finished = True
        logobj.end_time = timezone.now()
        logobj.save()
        channel.close()
        try:
            if not chan.closed:
                chan.close()
        except OSError:
            logging.debug('Try to close ssh channel faield, OSError.')


class SshServer(SocketServer.BaseRequestHandler):
    def handle(self):
        try:
            # paramiko_level = getattr(paramiko.common, 'DEBUG')
            # paramiko.common.logging.basicConfig(level=paramiko_level)
            # self.request
            t = paramiko.Transport(self.request, gss_kex=True)
            # t.local_version = "webterminal ssh server"
            t.set_gss_host(socket.getfqdn(""))
            try:
                t.load_server_moduli()
            except:
                # print("(Failed to load moduli -- gex will be unsupported.)")
                raise
            t.add_server_key(host_key)
            t.set_subsystem_handler(
                'sftp', paramiko.SFTPServer, SftpHandle
            )
            server = Server()
            try:
                t.start_server(server=server)
            except paramiko.SSHException:
                # print("*** SSH negotiation failed.")
                return

            # wait for auth in 20 seconds
            chan = t.accept(20)
            # ssh auth wait for 10 seconds
            server.event.wait(10)
            if chan is None:
                # print("*** No channel.")
                t.close()
                return
            # print("Authenticated!")
            # set keep alive check
            # t.set_keepalive(1)

            # handle sftp protocol
            if server.session_type and server.session_type == 'sftp':
                # print('subsystem table', t.subsystem_table)
                while t.is_active():
                    time.sleep(1)
                t.close()
                return

            # ssh auth
            with paramiko.SSHClient() as ssh:
                ssh.set_missing_host_key_policy(
                    paramiko.AutoAddPolicy())

                data = ServerInfor.objects.get(id=server.serverid)
                port = None
                method = None
                username = None
                key = None
                password = None
                for credential in data.credentials.all():
                    if credential.username == server.request_conn_username:
                        port = credential.port
                        method = credential.method
                        username = credential.username
                        if method == 'password':
                            password = credential.password
                        else:
                            password = credential.password
                            key = credential.key
                if not port or not username or not method:
                    chan.send('Request login user name not exist!\n')
                    chan.close()
                    chan.transport.close()
                    return
                ip = data.ip
                try:
                    if method == 'password':
                        ssh.connect(ip, port=port, username=username,
                                    password=password, timeout=3)
                    else:
                        private_key = StringIO(key)
                        key_filename = None
                        if 'RSA' in key:
                            private_key = paramiko.RSAKey.from_private_key(
                                private_key, password=password)
                        elif 'DSA' in key:
                            private_key = paramiko.DSSKey.from_private_key(
                                private_key, password=password)
                        elif 'EC' in key:
                            private_key = paramiko.ECDSAKey.from_private_key(
                                private_key, password=password)
                        elif 'OPENSSH' in key:
                            private_key = paramiko.Ed25519Key.from_private_key(
                                private_key, password=password)
                        else:
                            logging.debug('Use publickey auth')
                            password = password
                            public_key_path = os.path.join(get_package_root(),uuid.uuid4().hex)
                            with open(public_key_path,'wb') as f:
                                f.write(key.encode())
                            key_filename = public_key_path
                            private_key = None                            
                        ssh.connect(
                            ip, port=port, username=username, pkey=private_key, password=password, key_filename=key_filename, timeout=3)
                        if key_filename and os.path.exists(key_filename):
                            os.remove(key_filename)
                    # record log
                    # add keep alive beat heart
                    transport = ssh.get_transport()
                    transport.set_keepalive(5)
                    channelid = smart_unicode(PyCrypt.random_pass(32))
                    audit_log = Log.objects.create(user=User.objects.get(
                        username=server.request_http_username), server=data, channel=channelid, width=180, height=40, tag='ssh', loginuser=username, protocol="ssh")
                    server.channelid = str(audit_log.log)
                    audit_log.save()
                except socket.timeout:
                    chan.send(
                        '\033[1;3;31mCan not login to remote server:{0}, login time out.\033[0m'.format(ip))
                    chan.close()
                    chan.transport.close()
                    return
                except NoValidConnectionsError:
                    chan.send(
                        '\033[1;3;31mCan not login to remote server:{0}, may be server is down.\033[0m'.format(ip))
                    chan.close()
                    chan.transport.close()
                    return
                except AttributeError:
                    # error key
                    chan.send(
                        '\033[1;3;31mCan not login to remote server:{0}, please use a validate key to auth.\033[0m'.format(ip))
                    chan.close()
                    chan.transport.close()
                    return
                except PasswordRequiredException:
                    # auth error
                    chan.send(
                        '\033[1;3;31mCan not login to remote server:{0}, auth failed, key with password auth, you do not have a password.\033[0m'.format(ip))
                    chan.close()
                    chan.transport.close()
                    return
                except AuthenticationException:
                    # auth error
                    chan.send(
                        '\033[1;3;31mCan not login to remote server:{0}, auth failed, may be the password or key is invalid or wrong key auth configuration.\033[0m'.format(ip))
                    chan.close()
                    chan.transport.close()
                    return
                except SSHException:
                    # key with wrong password
                    chan.send(
                        '\033[1;3;31mCan not login to remote server:{0}, auth failed, wrong key password or invalid private key.\033[0m'.format(ip))
                    chan.close()
                    chan.transport.close()
                    return

                # handle ssh protocol
                # forward chan
                if not server.event.is_set():
                    # print("*** Client never asked for a shell.")
                    pass

                sendchan = ssh.invoke_shell(
                    term="xterm-color", width=server.chanwidth, height=server.chanheight)  # xterm-color for color ssh #xterm no color
                t1 = threading.Thread(target=posix_shell, args=(
                    chan, sendchan, server.channelid, server))
                t1.setDaemon(True)
                t1.start()

                epoll = select.epoll()
                epoll.register(chan.fileno(), select.EPOLLIN)

                server.channel = sendchan

                while True:
                    if t1.is_alive() is False:
                        logging.debug('Server not alive, close the session.')
                        break
                    events = epoll.poll(1)
                    for fileno, event in events:
                        if event & select.EPOLLIN:
                            byte = chan.recv(1024 * 24)
                            logging.debug(
                                'receive from server data: {0}'.format(byte))
                            try:
                                epoll.modify(chan.fileno(), select.EPOLLIN)
                            except FileNotFoundError:
                                # channel closed
                                print('file not found')
                                return
                            # print('received',byte)
                            if byte == b'' or byte == '':
                                logging.debug('no data')
                                return
                            try:
                                sendchan.send(byte)
                            except socket.error:
                                logging.debug('socket error')
                                logging.debug(traceback.format_exc())
                                # print('return')
                                return
                # while True:
                    # r, w, x = select.select([chan], [], [], 1)
                    # if t1.is_alive() is False:
                        # break
                    # if chan in r:
                        # byte = chan.recv(1024 * 24)
                        # # print('received',byte)
                        # if byte == b'' or byte == '':
                            # break
                        # try:
                            # sendchan.send(byte)
                        # except socket.error:
                            # # print('return')
                            # return
                        # if byte == '':
                            # break

        except OSError:
            try:
                traceback.print_exc()
                # t1.close()
                t1._stop()
                #
                conn = get_redis_instance()

                encrypt = PyCrypt('88aaaf7ffe3c6c0488aaaf7ffe3c6c04')
                try:
                    key = encrypt.encrypt(
                        content=server.username + encrypt.decrypt(server.password))
                    key = encrypt.md5_crypt(key)
                    conn.delete(server.username)
                    conn.delete(key)
                except:
                    conn.delete(server.username)
            except:
                traceback.print_exc()
                pass
        except Exception as e:
            # print("*** Caught exception: " +
            # str(e.__class__) + ": " + str(e))
            traceback.print_exc()
            try:
                # t1.close()
                t1._stop()
                #
                conn = get_redis_instance()

                encrypt = PyCrypt('88aaaf7ffe3c6c0488aaaf7ffe3c6c04')
                try:
                    key = encrypt.encrypt(
                        content=server.username + encrypt.decrypt(server.password))
                    key = encrypt.md5_crypt(key)
                    conn.delete(server.username)
                    conn.delete(key)
                except:
                    conn.delete(server.username)
            except:
                traceback.print_exc()


class ForwardServer(SocketServer.ThreadingTCPServer):
    daemon_threads = True
    allow_reuse_address = True


def main():
    ForwardServer(("0.0.0.0", 2100), SshServer).serve_forever()


if __name__ == '__main__':
    main()
