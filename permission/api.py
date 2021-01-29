from rest_framework import viewsets
from rest_framework import permissions
from permission.serializers import PermissionSerializer, PermissionWithGroupInfoSerializer
from permission.models import Permission
from common.models import CommandsSequence
from rest_framework.views import APIView
from rest_framework.response import Response
from permission.commons import parse_permission_tree
from common.utils import CustomModelPerm
from django.core.exceptions import ObjectDoesNotExist
import uuid


class PermissionWithGroupInfoViewSet(viewsets.ModelViewSet):
    queryset = Permission.objects.all()
    serializer_class = PermissionWithGroupInfoSerializer
    permission_classes = [
        permissions.IsAuthenticated, CustomModelPerm
    ]


class PermissionViewSet(viewsets.ModelViewSet):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer
    permission_classes = [
        permissions.IsAuthenticated, CustomModelPerm
    ]


class PermissionTreeView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = None

    def get(self, request, format=None):
        permission_tree, permission_tree_map = parse_permission_tree()
        return Response({"permissiontree": permission_tree, "permissiontreemap": permission_tree_map})


class GetServerListTreeApi(APIView):
    queryset = None
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, request, format=None):
        obj = Permission.objects.filter(user__id=request.user.id)
        server_list_tree = []
        tree_object_dict = {}
        can_login_usernames = set()
        for permission in obj:
            for credential in permission.credentials.all():
                can_login_usernames.add(credential.username)
            for group in permission.groups.all():
                tree = {
                    "label": group.name,
                    "selectable": False,
                    "children": []
                }
                for server in group.servers.all():
                    tree["children"].append(
                        {
                            "label": '{0} {1}'.format(server.name, server.ip),
                            "icon": 'devices',
                            "id": server.id,
                            "raw": '{0}_{1}'.format(server.id,uuid.uuid4().hex)
                        }
                    )
                    tree_object_dict[server.id] = '{0} {1}'.format(
                        server.name, server.ip)
                server_list_tree.append(tree)
        return Response({"tree": server_list_tree, "tree_map": tree_object_dict, "can_login_usernames": list(can_login_usernames)})


class GetCommandListTreeApi(APIView):
    queryset = None
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, request, format=None):
        # CommandsSequence
        obj = Permission.objects.filter(user__id=request.user.id)
        command_task_list_tree = []
        tree_object_dict = {}
        can_login_usernames = set()
        availabel_server_groups = set()
        for permission in obj:
            for credential in permission.credentials.all():
                if credential.protocol in ['ssh-password', 'ssh-key', 'ssh-key-with-password']:
                    can_login_usernames.add(credential.username)
            for group in permission.groups.all():
                availabel_server_groups.add(group.name)
        for commandtask in CommandsSequence.objects.all():
            tree = {
                "label": commandtask.name,
                "id": commandtask.id,
                "raw": '{0}_{1}'.format(server.id,uuid.uuid4().hex),
                "selectable": False,
                "children": []
            }
            for group in commandtask.groups.all():
                if group.name in availabel_server_groups:
                    for server in group.servers.all():
                        # just choose ssh server
                        for credential in server.credentials.all():
                            if credential.protocol in ['ssh-password', 'ssh-key', 'ssh-key-with-password'] and credential.username in can_login_usernames:
                                tree["children"].append(
                                    {
                                        "label": '{0} {1}'.format(server.name, server.ip),
                                        "icon": 'devices',
                                        "id": server.id,
                                        "commandid": commandtask.id,
                                        "raw": '{0}_{1}'.format(server.id,uuid.uuid4().hex)
                                    }
                                )
                                tree_object_dict[server.id] = '{0} {1}'.format(
                                    server.name, server.ip)
                    command_task_list_tree.append(tree)
        return Response({"tree": command_task_list_tree, "tree_map": tree_object_dict, "can_login_usernames": list(can_login_usernames)})


class GetLinuxServerListTreeApi(APIView):
    queryset = None
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, request, format=None):
        obj = Permission.objects.filter(user__id=request.user.id)
        server_list_tree = []
        tree_object_dict = {}
        can_login_usernames = set()
        for permission in obj:
            for credential in permission.credentials.all():
                can_login_usernames.add(credential.username)
            for group in permission.groups.all():
                tree = {
                    "label": group.name,
                    "selectable": False,
                    "children": []
                }
                for server in group.servers.all():
                    # just choose ssh server
                    for credential in server.credentials.all():
                        if credential.protocol in ['ssh-password', 'ssh-key', 'ssh-key-with-password'] and credential.username in can_login_usernames:
                            tree["children"].append(
                                {
                                    "label": '{0} {1}'.format(server.name, server.ip),
                                    "icon": 'devices',
                                    "id": server.id,
                                    "raw": '{0}_{1}'.format(server.id,uuid.uuid4().hex)
                                }
                            )
                            tree_object_dict[server.id] = '{0} {1}'.format(
                                server.name, server.ip)
                server_list_tree.append(tree)
        return Response({"tree": server_list_tree, "tree_map": tree_object_dict, "can_login_usernames": list(can_login_usernames)})


class GetMenuListApi(APIView):
    queryset = None
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, request, format=None):
        links1 = []
        links2 = []
        links3 = []
        menu_permission_map = {
            "links1": {
                "can_connect_serverinfor": {'icon': 'home', 'text': 'Webterminal', 'name': 'home'},
                "can_execute_commandssequence": {'icon': 'play_arrow', 'text': 'Command execution', 'name': 'play_arrow'}
            },
            "links2": {
                "can_view_credential": {'icon': 'format_list_numbered', 'text': 'Credential', 'name': 'credential'},
                "can_view_serverinfor": {'icon': 'devices', 'text': 'Server', 'name': 'server'},
                "can_view_servergroup": {'icon': 'group_work', 'text': 'Group', 'name': 'group'},
                "can_view_commandssequence": {'icon': 'list_alt', 'text': 'Commands', 'name': 'command'}
            },
            "links3": {
                "can_view_log": {'icon': 'view_list', 'text': 'Log list', 'name': 'log'},
                "can_view_user": {'icon': 'account_box', 'text': 'User list', 'name': 'user'},
                "can_view_permission": {'icon': 'lock', 'text': 'Permission list', 'name': 'permission'},
                "can_view_settings": {'icon': 'settings', 'text': 'Settings', 'name': 'setting'}

            },
        }
        all_perms = set()
        try:
            obj = Permission.objects.get(user__id=request.user.id)
            for perm in obj.permissions.all():
                all_perms.add(perm.codename)
        except ObjectDoesNotExist:
            pass
        for key in menu_permission_map.keys():
            for perm_code in menu_permission_map[key].keys():
                if key == 'links1':
                    if (request.user.is_active and request.user.is_superuser) or perm_code in all_perms:
                        links1.append(
                            menu_permission_map[key][perm_code])
                if key == 'links2':
                    if (request.user.is_active and request.user.is_superuser) or perm_code in all_perms:
                        links2.append(
                            menu_permission_map[key][perm_code])
                if key == 'links3':
                    if (request.user.is_active and request.user.is_superuser) or perm_code in all_perms:
                        links3.append(
                            menu_permission_map[key][perm_code])
        if (request.user.is_active and request.user.is_superuser) or "can_connect_serverinfor" in all_perms:
            links1.append(
                {'icon': 'playlist_play', 'text': 'Batch command execution', 'name': 'playlist_play'})
        return Response({'links1': links1, 'links2': links2, 'links3': links3})
