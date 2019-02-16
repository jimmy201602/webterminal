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
sys.path.insert(0, os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))))
# setup django to use django orm
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "webterminal.settings")
import django
django.setup()

import socket
import threading
import traceback
import select
import paramiko
from paramiko.py3compat import b, u, decodebytes, string_types
try:
    import SocketServer
except ImportError:
    import socketserver as SocketServer
from common.utils import get_redis_instance
from common.models import Credential, ServerInfor, Log
from django.contrib.auth.models import User
from webterminal.encrypt import PyCrypt
from django.core.exceptions import ObjectDoesNotExist
import uuid
try:
    from StringIO import StringIO
except ImportError:
    from io import StringIO
# setup logging
paramiko.util.log_to_file("demo_server.log")

host_key = paramiko.RSAKey(filename="test_rsa.key")
# host_key = paramiko.DSSKey(filename='test_dss.key')


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
    channelid = None

    def __init__(self):
        self.event = threading.Event()

    def check_channel_request(self, kind, chanid):
        if kind == "session":
            return paramiko.OPEN_SUCCEEDED
        return paramiko.OPEN_FAILED_ADMINISTRATIVELY_PROHIBITED

    def check_auth_password(self, username, password):
        conn = get_redis_instance()

        encrypt = PyCrypt('88aaaf7ffe3c6c0488aaaf7ffe3c6c04')
        if password == '' or password == u'':
            return paramiko.AUTH_FAILED
        try:
            key = encrypt.encrypt(
                content=username + encrypt.decrypt(password))
            key = encrypt.md5_crypt(key)
        except:
            conn.delete(username)
            return paramiko.AUTH_FAILED

        serverid = conn.get(key)
        if serverid is None:
            conn.delete(username)
            conn.delete(key)
            return paramiko.AUTH_FAILED
        else:
            try:
                if isinstance(serverid, bytes):
                    serverid = serverid.decode(
                        'utf8', 'ignore')
                serverid, request_username = serverid.rsplit('_')
                serverid = encrypt.decrypt(serverid)
                request_username = encrypt.decrypt(request_username)
                self.request_http_username = request_username
                try:
                    User.objects.get(username=request_username)
                except ObjectDoesNotExist:
                    print('request user name not exist')
                    conn.delete(username)
                    conn.delete(key)
                    return paramiko.AUTH_FAILED
            except:
                print('user {0} auth failed'.format(username))
                conn.delete(username)
                conn.delete(key)
                return paramiko.AUTH_FAILED

        try:
            ServerInfor.objects.get(id=serverid)
            self.serverid = int(serverid)
        except ObjectDoesNotExist:
            conn.delete(username)
            conn.delete(key)
            return paramiko.AUTH_FAILED

        if isinstance(conn.get(username), bytes) and isinstance(password, str):
            password = password.encode('utf8', 'ignore')

        try:
            if conn.get(username) is not None and password == conn.get(username) and serverid != None:
                print('success connect to webterminal server')
                conn.delete(username)
                conn.delete(key)
                return paramiko.AUTH_SUCCESSFUL
        except:
            conn.delete(username)
            conn.delete(key)
            return paramiko.AUTH_FAILED
        conn.delete(username)
        conn.delete(key)
        return paramiko.AUTH_FAILED

    def check_auth_publickey(self, username, key):
        print("Auth attempt with key: " + u(hexlify(key.get_fingerprint())))
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
        return False

    def get_allowed_auths(self, username):
        return "gssapi-keyex,gssapi-with-mic,password,publickey"

    def check_channel_shell_request(self, channel):
        self.event.set()
        return True

    def check_channel_pty_request(
        self, channel, term, width, height, pixelwidth, pixelheight, modes
    ):
        return True

    def get_banner(self):
        return ('Webterminal ', 'version 1.0')

    def check_channel_window_change_request(self, channel, width, height,
                                            pixelwidth, pixelheight):
        print("Change window size to {0}*{1})".format(width, height))
        if self.channel is not None:
            self.channel.resize_pty(width=width, height=height)
        return True


def posix_shell(chan, channel):
    try:
        while True:
            r, w, x = select.select([chan], [], [])
            if chan in r:
                data = chan.recv(1024 * 24)
                if len(data) == 0:
                    channel.send('\r\n*** EOF\r\n')
                    print('posix_shell', x)
                    break
                if data == "exit\r\n" or data == "logout\r\n" or data == 'logout':
                    chan.close()
                channel.send(data)
            else:
                print('else')
    finally:
        chan.close()
        channel.close()


class SshServer(SocketServer.BaseRequestHandler):
    def handle(self):
        try:
            # self.request
            t = paramiko.Transport(self.request, gss_kex=False)
            # t.local_version = "webterminal ssh server"
            t.set_gss_host(socket.getfqdn(""))
            try:
                t.load_server_moduli()
            except:
                print("(Failed to load moduli -- gex will be unsupported.)")
                raise
            t.add_server_key(host_key)
            server = Server()
            try:
                t.start_server(server=server)
            except paramiko.SSHException:
                print("*** SSH negotiation failed.")
                return

            # wait for auth
            chan = t.accept(20)
            if chan is None:
                print("*** No channel.")
                return
            print("Authenticated!")

            server.event.wait(10)
            if not server.event.is_set():
                print("*** Client never asked for a shell.")

            chan.send("Welcome to webterminal ssh server!\r\n\r\n")

            # forward chan
            ssh = paramiko.SSHClient()
            ssh.set_missing_host_key_policy(
                paramiko.AutoAddPolicy())

            data = ServerInfor.objects.get(id=server.serverid)
            port = data.credential.port
            method = data.credential.method
            username = data.credential.username
            ip = data.ip
            if method == 'password':
                password = data.credential.password
            else:
                key = data.credential.key
            try:
                if method == 'password':
                    ssh.connect(ip, port=port, username=username,
                                password=password, timeout=3)
                else:
                    private_key = StringIO.StringIO(key)
                    if 'RSA' in key:
                        private_key = paramiko.RSAKey.from_private_key(
                            private_key)
                    elif 'DSA' in key:
                        private_key = paramiko.DSSKey.from_private_key(
                            private_key)
                    elif 'EC' in key:
                        private_key = paramiko.ECDSAKey.from_private_key(
                            private_key)
                    elif 'OPENSSH' in key:
                        private_key = paramiko.Ed25519Key.from_private_key(
                            private_key)
                    else:
                        print('unsupported key')
                    ssh.connect(
                        ip, port=port, username=username, pkey=private_key, timeout=3)
                # record log
                channelid = uuid.uuid4().hex
                server.channelid = channelid
                audit_log = Log.objects.create(user=User.objects.get(
                    username=server.request_http_username), server=data, channel=channelid, width=80, height=24)
                audit_log.save()
            except socket.timeout:
                print('socket timeout')
                return

            sendchan = ssh.invoke_shell()
            t = threading.Thread(target=posix_shell, args=(chan, sendchan))
            t.setDaemon(True)
            t.start()

            server.channel = sendchan
            while True:
                r, w, x = select.select([sendchan], [], [])
                if sendchan in r:
                    byte = sendchan.recv(1024 * 24)
                    if byte == b'' or byte == '':
                        break
                    try:
                        chan.send(byte)
                    except socket.error:
                        print('return')
                        return
                    if byte == '':
                        break
            print('Session closed')
            chan.close()
            sendchan.close()

        except Exception as e:
            print("*** Caught exception: " +
                  str(e.__class__) + ": " + str(e))
            traceback.print_exc()
            try:
                t.close()
            except:
                pass


class ForwardServer(SocketServer.ThreadingTCPServer):
    daemon_threads = True
    allow_reuse_address = True


def main():
    ForwardServer(("0.0.0.0", 2100), SshServer).serve_forever()


if __name__ == '__main__':
    main()
