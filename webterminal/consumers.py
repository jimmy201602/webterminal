import paramiko
import socket
from channels.generic.websocket import  AsyncWebsocketConsumer
try:
    import simplejson as json
except ImportError:
    import json
from webterminal.interactive import SshTerminalThread, InterActiveShellThread
from common.models import CommandsSequence
from webterminal.sudoterminal import ShellHandlerThread
import ast
from asgiref.sync import async_to_sync
import traceback
from common.utils import get_redis_instance
import logging
logger = logging.getLogger(__name__)
from six import string_types as basestring
from channels.db import database_sync_to_async
from urllib.parse import parse_qsl
try:
    unicode
except NameError:
    unicode = str
from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async


class Webterminal(AsyncWebsocketConsumer):

    ssh = paramiko.SSHClient()
    http_user = True
    #http_user_and_session = True
    channel_session = True
    channel_session_user = True
    user = None
    chan = None

    async def connect(self):
        parsed_query = parse_qsl(self.scope["query_string"].decode('utf8'))
        username = None
        password = None
        width = 90
        height = 40
        for p in parsed_query:
            if p[0] == 'username':
                username = p[1]
            if p[0] == 'password':
                password = p[1]
            if p[0] == 'width':
                try:
                    width = int(p[1])
                except:
                    pass
            if p[0] == 'height':
                try:
                    height = int(p[1])
                except:
                    pass
        if not username and not password:
            await self.accept()
            await self.send(text_data='\033[1;3;31mUsername and password needed!\033[0m')
            await self.close()
        try:
            self.ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
            self.ssh.connect(
                '127.0.0.1', port=2100, username=username, password=password, timeout=3)
            self.chan = self.ssh.invoke_shell(
                width=width, height=height, term='xterm')
            # open ssh terminal
            interactivessh = InterActiveShellThread(
                self.chan, self.channel_name, width=width, height=height)
            interactivessh.setDaemon = True
            interactivessh.start()
            sshterminal = SshTerminalThread(
                self.channel_name, self.chan, elementid=self.channel_name)
            sshterminal.setDaemon = True
            sshterminal.start()
        except socket.error:
            self.closessh()
            await self.close()
        except ValueError:
            self.closessh()
            await self.close()
        except Exception:
            traceback.print_exc()
            self.closessh()
            await self.close()
        await self.accept()

    async def disconnect(self, message, **kwargs):
        # close threading
        self.queue.publish(self.channel_name, json.dumps(['close']))
        self.closessh()
        await self.close()

    @property
    def queue(self):
        queue = get_redis_instance()
        queue.pubsub()
        return queue

    def closessh(self):
        # close threading
        self.queue.publish(self.channel_name, json.dumps(['close']))

    async def webterminal_message(self, event):
        """
        Called when someone has messaged our chat.
        """
        # Send a message down to the client
        try:
            await self.send(
                event["text"]
            )
        except KeyError:
            pass
        except:
            traceback.print_exc()
            self.closessh()
            await self.close()
            return

    async def receive(self, text_data=None, bytes_data=None, **kwargs):
        origin_text = text_data
        try:
            text_data = json.loads(text_data)
        except:
            pass
        if isinstance(text_data, list) and text_data[0] in ['stdin', 'stdout']:
            async_to_sync(self.queue.publish(
                self.channel_name, text_data[1]))
        elif isinstance(text_data, list) and text_data[0] == u'set_size':
            async_to_sync(self.chan.resize_pty(
                width=text_data[3], height=text_data[4], width_pixels=text_data[1], height_pixels=text_data[2]))
            async_to_sync(self.queue.publish(self.channel_name, origin_text))
        elif isinstance(text_data, list) and text_data[0] == u'close':
            await self.disconnect(self.channel_name)
            return
        else:
            try:
                async_to_sync(self.chan.send(str(text_data)))
            except OSError:
                self.closessh()
                await self.close()
                return
            except:
                traceback.print_exc()
                self.closessh()
                await self.close()
                return


class CommandExecute(AsyncWebsocketConsumer):
    ssh = paramiko.SSHClient()
    http_user = True
    #http_user_and_session = True
    channel_session = True
    channel_session_user = True
    user = None
    chan = None

    async def connect(self):
        parsed_query = parse_qsl(self.scope["query_string"].decode('utf8'))
        username = None
        password = None
        commandid = None
        ip = None
        for p in parsed_query:
            if p[0] == 'username':
                username = p[1]
            if p[0] == 'password':
                password = p[1]
            if p[0] == 'commandid':
                try:
                    commandid = int(p[1])
                except:
                    pass
            if p[0] == 'ip':
                try:
                    ip = p[1]
                except:
                    pass
        if not username and not password:
            await self.accept()
            await self.send(text_data='\033[1;3;31mUsername and password needed!\033[0m')
            await self.close()
        await self.accept()
        commands = await self.get_commands(commandid)
        commands = json.loads(commands)
        if isinstance(commands, (basestring, str, unicode)):
            commands = ast.literal_eval(commands)
        # Run commands
        commandshell = ShellHandlerThread(
            channel_name=self.channel_name, commands=commands, server_list=[ip], server_ip='127.0.0.1', port=2100, username=username, password=password)
        commandshell.setDaemon = True
        commandshell.start()

    async def disconnect(self, message, **kwargs):
        # close threading
        self.queue.publish(self.channel_name, json.dumps(['close']))
        self.closessh()
        await self.close()

    @database_sync_to_async
    def get_commands(self, commandid):
        return CommandsSequence.objects.get(id=commandid).commands

    def closessh(self):
        # close threading
        self.queue.publish(self.channel_name, json.dumps(['close']))

    @property
    def queue(self):
        queue = get_redis_instance()
        queue.pubsub()
        return queue

    async def webterminal_message(self, event):
        """
        Called when someone has messaged our chat.
        """
        # Send a message down to the client
        try:
            await self.send(
                event["text"]
            )
        except KeyError:
            pass
        except:
            traceback.print_exc()
            self.closessh()
            await self.close()
            return


class SshTerminalMonitor(AsyncWebsocketConsumer):

    http_user = True
    http_user_and_session = True
    channel_session = True
    channel_session_user = True

    async def connect(self):
        parsed_query = parse_qsl(self.scope["query_string"].decode('utf8'))
        channel = None
        for p in parsed_query:
            if p[0] == 'channel':
                channel = p[1]
        await self.accept()
        await self.channel_layer.group_add("monitor-{0}".format(channel), self.channel_name)

    async def disconnect(self, message, **kwargs):
        parsed_query = parse_qsl(self.scope["query_string"].decode('utf8'))
        channel = None
        for p in parsed_query:
            if p[0] == 'channel':
                channel = p[1]
        await self.channel_layer.group_discard("monitor-{0}".format(channel), self.channel_name)
        await self.close()

    async def receive(self, text=None, bytes=None, **kwargs):
        pass

    async def webterminal_message(self, event):
        """
        Called when someone has messaged our chat.
        """
        # Send a message down to the client
        try:
            await self.send(
                event["text"]
            )
        except KeyError:
            pass
        except:
            traceback.print_exc()
            await self.close()
            return
