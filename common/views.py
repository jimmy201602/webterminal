# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.mixins import AccessMixin
from django.utils.translation import activate
from django.views.generic import View
from django.http import JsonResponse
from common.models import ServerGroup, CommandsSequence, Credential, ServerInfor, Log, CommandLog
try:
    import simplejson as json
except ImportError:
    import json
from django.core.exceptions import ObjectDoesNotExist
from django.db import IntegrityError
from django.utils.encoding import smart_str
from django.views.generic.list import ListView
from django.core.serializers import serialize
from django.contrib.auth.mixins import PermissionRequiredMixin
from django.views.generic import TemplateView, FormView
from django.core.exceptions import PermissionDenied
import traceback
from django.contrib.auth.views import redirect_to_login
from django.utils.translation import ugettext_lazy as _
import pytz
import uuid
from common.utils import get_redis_instance, get_settings_value
from common.extra_views import PasswordResetView as PasswordResetViewNew, PasswordResetDoneView as PasswordResetDoneViewNew, PasswordResetConfirmAndLoginView
from common.forms import PasswordResetForm, SetPasswordForm, SettingsForm
try:
    # django >= 1.10
    from django.urls import reverse_lazy
except ImportError:
    # django < 1.10
    from django.core.urlresolvers import reverse_lazy
from django.conf import settings
__webterminalhelperversion__ = '0.3'


class LoginRequiredMixin(AccessMixin):
    """
    CBV mixin which verifies that the current user is authenticated.
    """

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated():
            return self.handle_no_permission()
        activate(request.LANGUAGE_CODE.replace('-', '_'))
        return super(LoginRequiredMixin, self).dispatch(request, *args, **kwargs)

    def handle_no_permission(self):
        if self.raise_exception and self.request.user.is_authenticated():
            raise PermissionDenied(self.get_permission_denied_message())
        return redirect_to_login(self.request.get_full_path(), self.get_login_url(), self.get_redirect_field_name())


class Commands(LoginRequiredMixin, TemplateView):
    template_name = 'common/commandcreate.html'

    def get(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        if not request.user.is_authenticated():
            return redirect_to_login(self.request.get_full_path(), self.get_login_url(), self.get_redirect_field_name())
        if not request.user.has_perm('common.can_add_commandssequence'):
            raise PermissionDenied(_('403 Forbidden'))
        return self.render_to_response(context)

    def get_context_data(self, **kwargs):
        context = super(Commands, self).get_context_data(**kwargs)
        context['server_groups'] = ServerGroup.objects.all()
        return context

    def post(self, request):
        if request.is_ajax():
            try:
                if isinstance(request.body, bytes):
                    data = json.loads(request.body.decode())
                else:
                    data = json.loads(request.body)
                if data['action'] == 'create':
                    if not request.user.has_perm('common.can_add_commandssequence'):
                        raise PermissionDenied(_('403 Forbidden'))
                    obj = CommandsSequence.objects.create(
                        name=data['name'], commands=data['commands'])
                    for group in data['group']:
                        obj.group.add(ServerGroup.objects.get(name=group))
                    obj.save()
                    return JsonResponse({'status': True, 'message': '%s create success!' % (smart_str(data.get('name', None)))})
                elif data['action'] == 'update':
                    if not request.user.has_perm('common.can_change_commandssequence'):
                        raise PermissionDenied(_('403 Forbidden'))
                    try:
                        obj = CommandsSequence.objects.get(
                            id=data.get('id', None))
                        obj.commands = data['commands']
                        [obj.group.remove(group)
                         for group in obj.group.all()]
                        for group in data['group']:
                            obj.group.add(
                                ServerGroup.objects.get(name=group))
                        data.pop('group')
                        obj.__dict__.update(data)
                        obj.save()
                        return JsonResponse({'status': True, 'message': '%s update success!' % (smart_str(data.get('name', None)))})
                    except ObjectDoesNotExist:
                        return JsonResponse({'status': False, 'message': 'Request object not exist!'})
                elif data['action'] == 'delete':
                    if not request.user.has_perm('common.can_delete_commandssequence'):
                        raise PermissionDenied(_('403 Forbidden'))
                    try:
                        obj = CommandsSequence.objects.get(
                            id=data.get('id', None))
                        taskname = obj.name
                        obj.delete()
                        return JsonResponse({'status': True, 'message': 'Delete task %s success!' % (taskname)})
                    except ObjectDoesNotExist:
                        return JsonResponse({'status': False, 'message': 'Request object not exist!'})
                else:
                    return JsonResponse({'status': False, 'message': 'Illegal action.'})
            except ObjectDoesNotExist:
                return JsonResponse({'status': False, 'message': 'Please input a valid group name!'})
            except IntegrityError:
                return JsonResponse({'status': False, 'message': 'Task name:%s already exist,Please use another name instead!' % (data['name'])})
            except KeyError:
                return JsonResponse({'status': False, 'message': "Invalid parameter,Please report it to the adminstrator!"})
            except Exception as e:
                print(traceback.print_exc())
                return JsonResponse({'status': False, 'message': 'Some error happend! Please report it to the adminstrator! Error info:%s' % (smart_str(e))})
        else:
            pass


class CommandExecuteList(LoginRequiredMixin, PermissionRequiredMixin, ListView):
    model = CommandsSequence
    template_name = 'common/commandslist.html'
    permission_required = 'common.can_view_commandssequence'
    raise_exception = True

    def get_context_data(self, **kwargs):
        context = super(CommandExecuteList, self).get_context_data(**kwargs)
        context['server_groups'] = ServerGroup.objects.all()
        return context


class CommandExecuteDetailApi(LoginRequiredMixin, PermissionRequiredMixin, View):
    permission_required = 'common.can_execute_commandssequence'
    raise_exception = True

    def post(self, request):
        if request.is_ajax():
            id = request.POST.get('id', None)
            try:
                data = CommandsSequence.objects.get(id=id)
                return JsonResponse({'status': True, 'name': data.name, 'commands': json.loads(data.commands), 'data': {'name': data.name, 'commands': json.loads(data.commands), 'group': [group.name for group in data.group.all()]}})
            except ObjectDoesNotExist:
                return JsonResponse({'status': False, 'message': 'Request object not exist!'})
        else:
            return JsonResponse({'status': False, 'message': 'Method not allowed!'})


class CredentialCreate(LoginRequiredMixin, TemplateView):
    template_name = 'common/credentialcreate.html'

    def post(self, request):
        if request.is_ajax():
            try:
                if isinstance(request.body, bytes):
                    data = json.loads(request.body.decode())
                else:
                    data = json.loads(request.body)
                id = data.get('id', None)
                action = data.get('action', None)
                fields = [
                    field.name for field in Credential._meta.get_fields()]
                data = {k: v for k, v in data.items() if k in fields}
                if action == 'create':
                    if not request.user.has_perm('common.can_add_credential'):
                        raise PermissionDenied(_('403 Forbidden'))
                    obj = Credential.objects.create(**data)
                    obj.save()
                    return JsonResponse({'status': True, 'message': 'Credential %s was created!' % (obj.name)})
                elif action == 'update':
                    if not request.user.has_perm('common.can_change_credential'):
                        raise PermissionDenied(_('403 Forbidden'))
                    try:
                        obj = Credential.objects.get(id=id)
                        obj.__dict__.update(**data)
                        obj.save()
                        return JsonResponse({'status': True, 'message': 'Credential %s update success!' % (smart_str(data.get('name', None)))})
                    except ObjectDoesNotExist:
                        return JsonResponse({'status': False, 'message': 'Request object not exist!'})
                elif action == 'delete':
                    if not request.user.has_perm('common.can_delete_credential'):
                        raise PermissionDenied(_('403 Forbidden'))
                    try:
                        obj = Credential.objects.get(id=id)
                        obj.delete()
                        return JsonResponse({'status': True, 'message': 'Delete credential %s success!' % (smart_str(data.get('name', None)))})
                    except ObjectDoesNotExist:
                        return JsonResponse({'status': False, 'message': 'Request object not exist!'})
                else:
                    return JsonResponse({'status': False, 'message': 'Illegal action.'})
            except IntegrityError:
                return JsonResponse({'status': False, 'message': 'Credential %s already exist! Please use another name instead!' % (smart_str(json.loads(request.body).get('name', None)))})
            except Exception as e:
                print(traceback.print_exc())
                return JsonResponse({'status': False, 'message': 'Error happend! Please report it to adminstrator! Error:%s' % (smart_str(e))})


class CredentialList(LoginRequiredMixin, PermissionRequiredMixin, ListView):

    model = Credential
    template_name = 'common/credentiallist.html'
    permission_required = 'common.can_view_credential'
    raise_exception = True


class CredentialDetailApi(LoginRequiredMixin, PermissionRequiredMixin, View):
    permission_required = 'common.can_view_credential'
    raise_exception = True

    def post(self, request):
        if request.is_ajax():
            id = request.POST.get('id', None)
            data = Credential.objects.filter(id=id)
            if data.count() == 0:
                return JsonResponse({'status': False, 'message': 'Request object not exist!'})
            return JsonResponse({'status': True, 'message': json.loads(serialize('json', data))[0]['fields']})
        else:
            return JsonResponse({'status': False, 'message': 'Method not allowed!'})


class ServerCreate(LoginRequiredMixin, PermissionRequiredMixin, TemplateView):
    template_name = 'common/servercreate.html'
    permission_required = 'common.can_add_serverinfo'
    raise_exception = True

    def get_context_data(self, **kwargs):
        context = super(ServerCreate, self).get_context_data(**kwargs)
        context['credentials'] = Credential.objects.all()
        return context


class ServerlList(LoginRequiredMixin, PermissionRequiredMixin, ListView):

    model = ServerInfor
    template_name = 'common/serverlist.html'
    permission_required = 'common.can_view_serverinfo'
    raise_exception = True

    def get_context_data(self, **kwargs):
        context = super(ServerlList, self).get_context_data(**kwargs)
        context['credentials'] = Credential.objects.all()
        return context


class GroupList(LoginRequiredMixin, PermissionRequiredMixin, ListView):
    model = ServerGroup
    template_name = 'common/grouplist.html'
    permission_required = 'common.can_view_servergroup'
    raise_exception = True

    def get_context_data(self, **kwargs):
        context = super(GroupList, self).get_context_data(**kwargs)
        context['servers'] = ServerInfor.objects.all()
        return context


class GroupCreate(LoginRequiredMixin, PermissionRequiredMixin, TemplateView):
    template_name = 'common/groupcreate.html'
    permission_required = 'common.can_add_servergroup'
    raise_exception = True

    def get_context_data(self, **kwargs):
        context = super(GroupCreate, self).get_context_data(**kwargs)
        context['servers'] = ServerInfor.objects.all()
        return context


class LogList(LoginRequiredMixin, PermissionRequiredMixin, ListView):
    model = Log
    template_name = 'common/logslist.html'
    permission_required = 'common.can_view_log'
    raise_exception = True


class CommandLogList(LoginRequiredMixin, PermissionRequiredMixin, View):
    permission_required = 'common.can_view_command_log'
    raise_exception = True

    def post(self, request):
        if request.is_ajax():
            id = request.POST.get('id', None)
            data = CommandLog.objects.filter(log__id=id)
            if data.count() == 0:
                return JsonResponse({'status': False, 'message': 'Request object not exist!'})
            if request.LANGUAGE_CODE == 'zh-hans':
                return JsonResponse({'status': True, 'message': [{'datetime': i.datetime.astimezone(pytz.timezone("Asia/Shanghai")).strftime('%Y-%m-%d %H:%M:%S'), 'command': i.command} for i in data]})
            else:
                return JsonResponse({'status': True, 'message': [{'datetime': i.datetime.strftime('%Y-%m-%d %H:%M:%S'), 'command': i.command} for i in data]})
        else:
            return JsonResponse({'status': False, 'message': 'Method not allowed!'})


class WebterminalHelperDetectApi(LoginRequiredMixin, View):

    def post(self, request):
        if request.is_ajax():
            conn = get_redis_instance()
            version = request.POST.get('version', None)
            protocol = request.POST.get('protocol', None)
            identify = request.POST.get('identify', None)
            if identify is not None and version is None and protocol is None:
                # get identify id
                id = str(uuid.uuid4())
                conn.set(id, 'ok')
                conn.expire(id, 15)
                return JsonResponse({'status': True, 'message': id})
            elif protocol in ["rdp", "ssh", "sftp"] and identify:
                identify_data = conn.get(identify)
                if isinstance(identify_data, bytes):
                    identify_data = identify_data.decode()
                else:
                    identify_data = identify_data
                if identify_data == 'installed':
                    conn.delete(identify)
                    return JsonResponse({'status': True, 'message': 'ok'})
                elif identify_data == 'need upgrade':
                    conn.delete(identify)
                    return JsonResponse({'status': False, 'message': 'Webterminal helper need upgrade to version: {0}'.format(__webterminalhelperversion__)})
                else:
                    conn.delete(identify)
                    # not install webterminal helper
                    return JsonResponse({'status': False, 'message': 'no'})
            else:
                return JsonResponse({'status': False, 'message': 'Method not allowed!'})
        else:
            return JsonResponse({'status': False, 'message': 'Method not allowed!'})


class WebterminalHelperDetectCallbackApi(View):

    def post(self, request):
        if not request.is_ajax():
            conn = get_redis_instance()
            version = request.POST.get('version', None)
            protocol = request.POST.get('protocol', None)
            identify = request.POST.get('identify', None)
            if version and protocol in ["rdp", "ssh", "sftp"] and identify:
                identify_data = conn.get(identify)
                if isinstance(identify_data, bytes):
                    identify_data = identify_data.decode()
                else:
                    identify_data = identify_data
                if identify_data == 'ok' and version == __webterminalhelperversion__:
                    conn.set(identify, 'installed')
                    return JsonResponse({'status': True, 'message': 'ok'})
                elif identify_data == 'ok' and version != __webterminalhelperversion__:
                    conn.set(identify, 'need upgrade')
                    return JsonResponse({'status': False, 'message': 'no'})
                else:
                    conn.delete(identify)
                    # not install webterminal helper
                    return JsonResponse({'status': False, 'message': 'no'})
            else:
                return JsonResponse({'status': False, 'message': 'Method not allowed!'})
        else:
            return JsonResponse({'status': False, 'message': 'Method not allowed!'})


class PasswordResetView(PasswordResetViewNew):
    form_class = PasswordResetForm
    template_name = "common/password-reset.html"
    success_url = reverse_lazy("password-reset-done")
    subject_template_name = "common/emails/password-reset-subject.txt"
    email_template_name = "common/emails/password-reset-email.html"


class PasswordResetDoneView(PasswordResetDoneViewNew):
    template_name = "common/password-reset-done.html"


class PasswordResetConfirmView(PasswordResetConfirmAndLoginView):
    success_url = reverse_lazy('index')
    template_name = "common/password-reset-confirm.html"
    form_class = SetPasswordForm


class SettingsView(LoginRequiredMixin, PermissionRequiredMixin, FormView):
    success_url = reverse_lazy('settings')
    template_name = "common/settings.html"
    form_class = SettingsForm
    permission_required = 'common.can_view_log'

    def form_valid(self, form):
        # This method is called when valid form data has been POSTed.
        # It should return an HttpResponse.
        form.set_settings(self.request)
        return super(SettingsView, self).form_valid(form)

    def get_initial(self):
        """
        Returns the initial data to use for forms on this view. To avoid form initial cache.
        """
        initial = super().get_initial()
        initial['webterminal_detect'] = get_settings_value(
            "detect_webterminal_helper_is_installed")
        initial['otp_switch'] = get_settings_value("otp")
        initial['timezone'] = getattr(settings, "TIME_ZONE", 'UTC')
        return initial
