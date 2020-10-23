from rest_framework import viewsets
from common.serializers import ServerGroupSerializer, ServerInforSerializer, CommandsSequenceSerializer, CredentialSerializer, UserSerializer, LogSerializer, CommandsSequenceGroupsSerializer, ServerGroupSerializerWithServerInfo, SettingsSerializer, ServerInforWithCredentialInfoSerializer, DefaultUserSettingsSerializer
from common.models import ServerGroup, ServerInfor, CommandsSequence, Credential, Log, DefaultUserSettings, CommandLog
from rest_framework import permissions
from django.contrib.auth import get_user_model
import pytz
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from common.utils import get_settings_value, get_redis_instance
from django.conf import settings
import uuid
from webterminal.encrypt import PyCrypt
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import User
try:
    import simplejson as json
except ImportError:
    import json
import base64
from binascii import b2a_hex, a2b_hex
from django.utils.timezone import now
import re
try:
    import commands
except ImportError:
    import subprocess as commands
# from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
# from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication

from .utils import CustomModelPerm
# permissions.IsAuthenticated = CustomModelPerm


class ServerGroupViewSet(viewsets.ModelViewSet):
    queryset = ServerGroup.objects.all()
    serializer_class = ServerGroupSerializer
    permission_classes = [
        permissions.IsAuthenticated, CustomModelPerm
    ]


class ServerGroupWithServerInfoViewSet(viewsets.ModelViewSet):
    queryset = ServerGroup.objects.all()
    serializer_class = ServerGroupSerializerWithServerInfo
    permission_classes = [
        permissions.IsAuthenticated, CustomModelPerm
    ]


class ServerInforViewSet(viewsets.ModelViewSet):
    queryset = ServerInfor.objects.all()
    serializer_class = ServerInforSerializer
    permission_classes = [
        permissions.IsAuthenticated, CustomModelPerm
    ]


class ServerInforWithCredentialInfoViewSet(viewsets.ModelViewSet):
    queryset = ServerInfor.objects.all()
    serializer_class = ServerInforWithCredentialInfoSerializer
    permission_classes = [
        permissions.IsAuthenticated, CustomModelPerm
    ]


class CredentialViewSet(viewsets.ModelViewSet):
    queryset = Credential.objects.all()
    serializer_class = CredentialSerializer
    permission_classes = [
        permissions.IsAuthenticated, CustomModelPerm
    ]


class CommandsSequenceViewSet(viewsets.ModelViewSet):
    queryset = CommandsSequence.objects.all()
    serializer_class = CommandsSequenceSerializer
    permission_classes = [
        permissions.IsAuthenticated, CustomModelPerm
    ]


class CommandsSequenceGroupsViewSet(viewsets.ModelViewSet):
    queryset = CommandsSequence.objects.all()
    serializer_class = CommandsSequenceGroupsSerializer
    permission_classes = [
        permissions.IsAuthenticated, CustomModelPerm
    ]


class LogViewSet(viewsets.ModelViewSet):
    queryset = Log.objects.all()
    serializer_class = LogSerializer
    permission_classes = [
        permissions.IsAuthenticated, CustomModelPerm
    ]


class CreateUserViewSet(viewsets.ModelViewSet):
    perms_map = {
        'GET': ['permission.can_view_user'],
        'OPTIONS': [],
        'HEAD': [],
        'POST': ['permission.can_add_user'],
        'PUT': ['permission.can_change_user'],
        'PATCH': ['permission.can_change_user'],
        'DELETE': ['permission.can_delete_user'],
    }
    queryset = get_user_model().objects.all()
    permission_classes = [
        permissions.IsAuthenticated, CustomModelPerm
    ]
    serializer_class = UserSerializer


class DefaultUserSettingsViewSet(viewsets.ModelViewSet):
    queryset = DefaultUserSettings.objects.all()
    permission_classes = [
        permissions.IsAuthenticated, CustomModelPerm
    ]
    serializer_class = DefaultUserSettingsSerializer


class TimeZoneList(APIView):
    perms_map = {
        'GET': ['common.can_view_time_zone_list'],
    }
    permission_classes = [permissions.IsAuthenticated, CustomModelPerm]
    queryset = None

    def get(self, request, format=None):
        return Response([tz for tz in pytz.common_timezones])


class SettingsList(APIView):
    perms_map = {
        'GET': ['common.can_view_settings'],
    }
    permission_classes = [permissions.IsAuthenticated, CustomModelPerm]
    queryset = None

    def get(self, request, format=None):
        initial = {}
        initial['webterminal_detect'] = get_settings_value(
            "detect_webterminal_helper_is_installed")
        initial['otp_switch'] = get_settings_value("otp")
        initial['timezone'] = getattr(settings, "TIME_ZONE", 'UTC')
        initial['use_tz'] = getattr(settings, "USE_TZ", True)
        return Response(initial)


class Settings(APIView):
    perms_map = {
        'PATCH': ['common.can_change_settings']
    }
    permission_classes = [permissions.IsAuthenticated, CustomModelPerm]
    queryset = None
    serializer_class = SettingsSerializer

    def patch(self, request, format=None):
        serializer = SettingsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DefaultUserSettingsApi(APIView):
    perms_map = {
        'PATCH': ['common.can_view_defaultusersettings']
    }
    queryset = None
    permission_classes = [permissions.IsAuthenticated, CustomModelPerm]

    def get(self, request, format=None):
        data = [{'username': i.username, 'id': i.id} for i in DefaultUserSettings.objects.filter(
            server__id=request.GET.get('query', None))]
        return Response(data)


class GetDynamicPasswordApi(APIView):
    queryset = None
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        serverid = request.data.get('serverid', None)
        # need to connect server user name
        conn_username = request.data.get('username', None)
        protocol = 'ssh'
        try:
            data = ServerInfor.objects.get(id=serverid)
            usernames = []
            for i in data.credentials.all():
                usernames.append(i.username)
                if conn_username == i.username:
                    if i.protocol in ('vnc', 'rdp', 'telnet'):
                        protocol = i.protocol
            if conn_username not in usernames:
                return Response({'status': False, 'message': 'Request user name not exist!'})
            username = uuid.uuid4().hex[0:5]
            password = uuid.uuid4().hex
            conn = get_redis_instance()
            encrypt = PyCrypt('88aaaf7ffe3c6c0488aaaf7ffe3c6c04')
            request_conn_username = encrypt.encrypt(content=conn_username)
            key = encrypt.encrypt(content=username + password)
            key = encrypt.md5_crypt(key)
            serverid = encrypt.encrypt(content=str(serverid))
            password = encrypt.encrypt(content=password)
            request_username = encrypt.encrypt(content=request.user.username)
            if isinstance(serverid, bytes):
                serverid = serverid.decode('utf8')
            if isinstance(request_username, bytes):
                request_username = request_username.decode('utf8')
            if isinstance(request_conn_username, bytes):
                request_conn_username = request_conn_username.decode('utf8')
            conn.set(key, '{0}_{1}_{2}'.format(
                serverid, request_username, request_conn_username))
            conn.set(username, password)
            conn.expire(key, 60)
            conn.expire(username, 60)
            if isinstance(password, bytes):
                password = password.decode('utf8')
            return Response({'status': True, 'data': {'username': username, 'password': password, "protocol": protocol, "ip": data.ip}})
        except ObjectDoesNotExist:
            return Response({'status': False, 'message': 'Request object does not exist!'})
        except ValueError:
            return Response({'status': False, 'message': 'Type error!'})


class DynamicPasswordAuthApi(APIView):
    queryset = None
    permission_classes = [permissions.IsAuthenticated]
    request_http_username = None
    request_conn_username = None
    serverid = None
    username = None
    password = None
    ip = None
    port = None
    protocol = 'ssh'

    def post(self, request, format=None):
        username = request.data.get('username', None)
        # need to connect server user name
        password = request.data.get('password', None)
        try:
            conn = get_redis_instance()

            encrypt = PyCrypt('88aaaf7ffe3c6c0488aaaf7ffe3c6c04')
            if not username or not password:
                return Response({'status': False, 'message': 'Usename and password needed!'})
            try:
                key = encrypt.encrypt(
                    content=username + encrypt.decrypt(password))
                key = encrypt.md5_crypt(key)
            except:
                conn.delete(username)
                return Response({'status': False, 'message': 'Password or user is invalid!'})

            conn_str = conn.get(key)
            if conn_str is None:
                conn.delete(username)
                conn.delete(key)
                return Response({'status': False, 'message': 'Password or user is invalid!'})
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
                        return Response({'status': False, 'message': 'Request user not exist!'})
                except Exception:
                    conn.delete(username)
                    conn.delete(key)
                    return Response({'status': False, 'message': 'Auth failed!'})

            try:
                data = ServerInfor.objects.get(id=serverid)
                self.serverid = int(serverid)
                self.ip = data.ip
                request_conn_username_exist = False
                for credential in data.credentials.all():
                    if credential.username == self.request_conn_username:
                        request_conn_username_exist = True
                        self.password = credential.password
                        self.port = credential.port
                        if credential.protocol in ('vnc', 'rdp', 'telnet'):
                            self.protocol = credential.protocol
                if not request_conn_username_exist:
                    # detect request connection user is not exist
                    return Response({'status': False, 'message': 'Request auth username not exist!'})
            except ObjectDoesNotExist:
                conn.delete(username)
                conn.delete(key)
                return Response({'status': False, 'message': 'Request auth server not exist!'})

            if isinstance(conn.get(username), bytes) and isinstance(password, str):
                password = password.encode('utf8', 'ignore')

            try:
                if conn.get(username) is not None and password == conn.get(username) and serverid != None:
                    self.username = username
                credential_dict = {"request_conn_username": self.request_conn_username, "request_http_username":
                                   self.request_http_username, "ip": self.ip, "password": self.password, "port": str(self.port), "protocol": self.protocol}
                conn.delete(username)
                conn.set(username, b2a_hex(base64.b64encode(
                    json.dumps(credential_dict).encode('utf8', 'ignore'))))
                conn.expire(username, 60)
                return Response({'status': True, 'message': None})
            except Exception as e:
                conn.delete(username)
                conn.delete(key)
                return Response({'status': False, 'message': "Auth failed"})
        except ObjectDoesNotExist:
            return Response({'status': False, 'message': 'Request object does not exist!'})
        except ValueError:
            return Response({'status': False, 'message': 'Type error!'})


class GetCommandLogListApi(APIView):
    perms_map = {
        'PATCH': ['common.can_view_command_log']
    }
    queryset = None
    permission_classes = [permissions.IsAuthenticated, CustomModelPerm]

    def post(self, request, format=None):
        id = request.data.get('id', None)
        data = CommandLog.objects.filter(log__id=id)
        if data.count() == 0:
            return Response({'status': False, 'message': 'No command record exist!'})
        return Response({'status': True, 'data': [{'datetime': i.datetime.astimezone(pytz.timezone(getattr(settings, "TIME_ZONE", 'UTC'))).strftime('%Y-%m-%d %H:%M:%S'), 'command': i.command} for i in data]})


class WriteGuacamoleLogApi(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        username = request.data.get('username', "")
        recording_path = request.data.get("recording_path", "")
        gucamole_id = request.data.get("gucamole_id", "")
        is_finished = request.data.get("is_finished", False)
        if username != "" and gucamole_id == "":
            try:
                conn = get_redis_instance()
                conn_str = json.loads(base64.b64decode(
                    a2b_hex(conn.get(username))))
                # {
                # "request_conn_username": self.request_conn_username,
                # "request_http_username": self.request_http_username,
                # "ip": self.ip,
                # "password": self.password,
                # "port": str(self.port),
                # "protocol": self.protocol
                # }
                # type Log struct {
                # UserName      string `json:"username"`
                # RecordingPath string `json:"recording_path"`
                # GucamoleId    string `json:"gucamole_id"`
                # IsFinished    bool   `json:"is_finished"`
                # }
                conn.delete(username)
                conn_str["recording_path"] = recording_path
                conn.set(username, b2a_hex(base64.b64encode(
                    json.dumps(conn_str).encode('utf8', 'ignore'))))
                conn.expire(username, 60)
                Log.objects.create(user=User.objects.get(username=conn_str["request_http_username"]), server=ServerInfor.objects.get(
                    ip=conn_str["ip"]), channel=recording_path, width=1024, height=768, log=recording_path, tag="guacamole", loginuser=conn_str["request_conn_username"], protocol=conn_str["protocol"])
                return Response({"status": True, "message": None})
            except Exception as e:
                return Response({"status": False, "message": "Error encountered on server!"})
        if gucamole_id != "" and username != "":
            try:
                conn = get_redis_instance()
                conn_str = json.loads(base64.b64decode(
                    a2b_hex(conn.get(username))))
                recording_path = conn_str["recording_path"]
                data = Log.objects.get(channel=recording_path)
                data.gucamole_client_id = gucamole_id
                data.save()
                return Response({"status": True, "message": None})
            except Exception as e:
                return Response({"status": False, "message": "Error encountered on server!"})
        if is_finished is True and gucamole_id != "":
            try:
                data = Log.objects.get(gucamole_client_id=gucamole_id)
                data.is_finished = True
                data.save()
                return Response({"status": True, "message": None})
            except Exception as e:
                return Response({"status": False, "message": "Error encountered on server!"})


class SshTerminalKillApi(APIView):
    perms_map = {
        'PATCH': ['common.can_kill_serverinfor']
    }
    permission_classes = [permissions.IsAuthenticated, CustomModelPerm]

    def post(self, request, format=None):
        channel_name = request.data.get('channel_name', None)
        try:
            data = Log.objects.get(channel=channel_name)
            if data.is_finished:
                return Response({'status': False, 'message': 'Ssh terminal does not exist!'})
            else:
                data.end_time = now()
                data.is_finished = True
                data.save()

                queue = get_redis_instance()
                if '_' in channel_name:
                    queue.publish(channel_name.rsplit(
                        '_')[0], json.dumps(['close']))
                else:
                    queue.publish(channel_name, json.dumps(['close']))
                return Response({'status': True, 'message': 'Terminal has been killed !'})
        except ObjectDoesNotExist:
            return Response({'status': False, 'message': 'Request object does not exist!'})


class CommandAutoCompeleteApi(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        cmd = request.data.get('cmd', '')
        commandall = commands.getoutput(
            "PATH=$PATH:./:/usr/lib:/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin;for dir in $(echo $PATH |sed 's/:/ /g');do ls $dir;done").strip().split('\n')
        commandmatch = []
        for command in commandall:
            match = re.search('^{0}.*'.format(cmd), command)
            if match:
                commandmatch.append(match.group())
            else:
                continue
        return Response({'status': True, 'data': list(set(commandmatch))})
