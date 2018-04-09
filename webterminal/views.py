from django.views.generic import View
from django.shortcuts import render_to_response,HttpResponse
from django.http import JsonResponse
from webterminal.models import ServerGroup,CommandsSequence,Credential,ServerInfor,Log
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect,csrf_exempt
try:
    import simplejson as json
except ImportError:
    import json
from django.contrib import messages as message
from django.core.exceptions import ObjectDoesNotExist
from django.db import IntegrityError
from django.utils.encoding import smart_str
from django.views.generic.list import ListView
from django.views.generic.edit import DeleteView,CreateView
from django.views.generic.detail import DetailView
from django.core.serializers import serialize
from webterminal.settings import MEDIA_URL
from django.utils.timezone import now
from webterminal.interactive import get_redis_instance
from django.contrib.auth.mixins import PermissionRequiredMixin
from django.views.generic import TemplateView
from django.core.exceptions import  PermissionDenied
from permission.models import Permission
from django.urls import reverse_lazy
from common.views import LoginRequiredMixin

class Index(LoginRequiredMixin,PermissionRequiredMixin,TemplateView):
    template_name = 'webterminal/index.html'
    permission_required = 'webterminal.can_connect_serverinfo'
    raise_exception = False
    login_url = reverse_lazy('admin:login')

    def get_context_data(self, **kwargs):
        context = super(Index, self).get_context_data(**kwargs)
        try:
            groups = Permission.objects.get(user__username=self.request.user.username)
        except ObjectDoesNotExist:
            return context
        context['server_groups'] = ServerGroup.objects.filter(name__in=[group.name for group in groups.groups.all()])
        return context

class Commands(LoginRequiredMixin,TemplateView):
    template_name = 'webterminal/commandcreate.html'

    def get_context_data(self, **kwargs):
        context = super(Commands, self).get_context_data(**kwargs)
        context['server_groups'] = ServerGroup.objects.all()
        return context
    
    def post(self,request):
        if request.is_ajax():
            try:
                data = json.loads(request.body)
                if data['action'] == 'create':
                    if not request.user.has_perm('webterminal.can_add_commandssequence'):
                        raise PermissionDenied(_('403 Forbidden'))
                    obj = CommandsSequence.objects.create(name=data['name'],commands=data['commands'])
                    for group in data['group']:
                        obj.group.add(ServerGroup.objects.get(name=group))
                    obj.save()
                    return JsonResponse({'status':True,'message':'%s create success!' %(smart_str(data.get('name',None)))})
                elif data['action'] == 'update':
                    if not request.user.has_perm('webterminal.can_change_commandssequence'):
                        raise PermissionDenied(_('403 Forbidden'))
                    try:
                        obj = CommandsSequence.objects.get(id=data.get('id',None))
                        obj.commands = data['commands']
                        [obj.group.remove(group) for group in obj.group.all()]
                        for group in data['group']:
                            obj.group.add(ServerGroup.objects.get(name=group))
                        data.pop('group')
                        obj.__dict__.update(data)
                        obj.save()
                        return JsonResponse({'status':True,'message':'%s update success!' %(smart_str(data.get('name',None)))})                        
                    except ObjectDoesNotExist:
                        return JsonResponse({'status':False,'message':'Request object not exist!'})
                elif data['action'] == 'delete':
                    if not request.user.has_perm('webterminal.can_delete_commandssequence'):
                        raise PermissionDenied(_('403 Forbidden'))
                    try:
                        obj = CommandsSequence.objects.get(id=data.get('id',None))
                        taskname = obj.name 
                        obj.delete()
                        return JsonResponse({'status':True,'message':'Delete task %s success!' %(taskname)})
                    except ObjectDoesNotExist:
                        return JsonResponse({'status':False,'message':'Request object not exist!'})
                else:
                    return JsonResponse({'status':False,'message':'Illegal action.'}) 
            except ObjectDoesNotExist:
                return JsonResponse({'status':False,'message':'Please input a valid group name!' })
            except IntegrityError:
                return JsonResponse({'status':False,'message':'Task name:%s already exist,Please use another name instead!' %(data['name']) })
            except KeyError:
                return JsonResponse({'status':False,'message':"Invalid parameter,Please report it to the adminstrator!" })
            except Exception,e:
                import traceback
                print traceback.print_exc()
                return JsonResponse({'status':False,'message':'Some error happend! Please report it to the adminstrator! Error info:%s' %(smart_str(e)) })
        else:
            pass

class CommandExecute(LoginRequiredMixin,PermissionRequiredMixin,TemplateView):
    template_name = 'webterminal/commandexecute.html'
    permission_required = 'webterminal.can_execute_commandssequence'
    raise_exception = True

    def get_context_data(self, **kwargs):
        context = super(CommandExecute, self).get_context_data(**kwargs)
        try:
            groups = Permission.objects.get(user__username=self.request.user.username)
        except ObjectDoesNotExist:
            return context
        context['commands'] = CommandsSequence.objects.filter(group__name__in=[group.name for group in groups.groups.all()])
        return context

class CommandExecuteList(LoginRequiredMixin,PermissionRequiredMixin,ListView):
    model = CommandsSequence
    template_name = 'webterminal/commandslist.html'
    permission_required = 'webterminal.can_view_commandssequence'
    raise_exception = True

    def get_context_data(self, **kwargs):
        context = super(CommandExecuteList, self).get_context_data(**kwargs)
        context['server_groups'] = ServerGroup.objects.all()
        return context
        

class CommandExecuteDetailApi(LoginRequiredMixin,PermissionRequiredMixin,View):
    permission_required = 'webterminal.can_execute_commandssequence'
    raise_exception = True

    def post(self,request):
        if request.is_ajax():
            id = request.POST.get('id',None)
            try:
                data = CommandsSequence.objects.get(id=id)
                return JsonResponse({'status':True,'name':data.name,'commands':json.loads(data.commands),'data':{'name':data.name,'commands':json.loads(data.commands),'group':[ group.name for group in data.group.all() ]}})
            except ObjectDoesNotExist:
                return JsonResponse({'status':False,'message':'Request object not exist!'})
        else:
            return JsonResponse({'status':False,'message':'Method not allowed!'})

class CredentialCreate(LoginRequiredMixin,TemplateView):
    template_name = 'webterminal/credentialcreate.html'
    
    def post(self,request):
        if request.is_ajax():
            try:
                data = json.loads(request.body)
                id = data.get('id',None)
                action = data.get('action',None)                
                fields = [field.name for field in Credential._meta.get_fields()]
                [ data.pop(field) for field in data.keys() if field not in fields]
                if action == 'create':
                    if not request.user.has_perm('webterminal.can_add_credential'):
                        raise PermissionDenied(_('403 Forbidden'))
                    obj = Credential.objects.create(**data)
                    obj.save()
                    return JsonResponse({'status':True,'message':'Credential %s was created!' %(obj.name)})
                elif action == 'update':
                    if not request.user.has_perm('webterminal.can_change_credential'):
                        raise PermissionDenied(_('403 Forbidden'))
                    try:
                        obj = Credential.objects.get(id=id)
                        obj.__dict__.update(**data)
                        obj.save()
                        return JsonResponse({'status':True,'message':'Credential %s update success!' %(smart_str(data.get('name',None)))})
                    except ObjectDoesNotExist:
                        return JsonResponse({'status':False,'message':'Request object not exist!'})
                elif action == 'delete':
                    if not request.user.has_perm('webterminal.can_delete_credential'):
                        raise PermissionDenied(_('403 Forbidden'))
                    try:
                        obj = Credential.objects.get(id=id)
                        obj.delete()
                        return JsonResponse({'status':True,'message':'Delete credential %s success!' %(smart_str(data.get('name',None)))})
                    except ObjectDoesNotExist:
                        return JsonResponse({'status':False,'message':'Request object not exist!'})
                else:
                    return JsonResponse({'status':False,'message':'Illegal action.'}) 
            except IntegrityError:
                return JsonResponse({'status':False,'message':'Credential %s already exist! Please use another name instead!' %(smart_str(json.loads(request.body).get('name',None)))})
            except Exception,e:
                import traceback
                print traceback.print_exc()
                return JsonResponse({'status':False,'message':'Error happend! Please report it to adminstrator! Error:%s' %(smart_str(e))})
            
class CredentialList(LoginRequiredMixin,PermissionRequiredMixin,ListView):
    
    model = Credential
    template_name = 'webterminal/credentiallist.html'
    permission_required = 'webterminal.can_view_credential'
    raise_exception = True
    
class CredentialDetailApi(LoginRequiredMixin,PermissionRequiredMixin,View):
    permission_required = 'webterminal.can_view_credential'
    raise_exception = True

    def post(self,request):
        if request.is_ajax():
            id = request.POST.get('id',None)
            data = Credential.objects.filter(id=id)
            if data.count() == 0:
                return JsonResponse({'status':False,'message':'Request object not exist!'})
            return JsonResponse({'status':True,'message':json.loads(serialize('json',data))[0]['fields']})
        else:
            return JsonResponse({'status':False,'message':'Method not allowed!'})


class ServerCreate(LoginRequiredMixin,PermissionRequiredMixin,TemplateView):
    template_name = 'webterminal/servercreate.html'
    permission_required = 'webterminal.can_add_serverinfo'
    raise_exception = True

    def get_context_data(self, **kwargs):
        context = super(ServerCreate, self).get_context_data(**kwargs)
        context['credentials'] = Credential.objects.all()
        return context

class ServerlList(LoginRequiredMixin,PermissionRequiredMixin,ListView):
    
    model = ServerInfor
    template_name = 'webterminal/serverlist.html'
    permission_required = 'webterminal.can_view_serverinfo'
    raise_exception = True

    def get_context_data(self, **kwargs):
        context = super(ServerlList, self).get_context_data(**kwargs)
        context['credentials'] = Credential.objects.all()
        return context

class GroupList(LoginRequiredMixin,PermissionRequiredMixin,ListView):
    model = ServerGroup
    template_name = 'webterminal/grouplist.html'
    permission_required = 'webterminal.can_view_servergroup'
    raise_exception = True
    
    def get_context_data(self, **kwargs):
        context = super(GroupList, self).get_context_data(**kwargs)
        context['servers'] = ServerInfor.objects.all()
        return context

class GroupCreate(LoginRequiredMixin,PermissionRequiredMixin,TemplateView):
    template_name = 'webterminal/groupcreate.html'
    permission_required = 'webterminal.can_add_servergroup'
    raise_exception = True

    def get_context_data(self, **kwargs):
        context = super(GroupCreate, self).get_context_data(**kwargs)
        context['servers'] = ServerInfor.objects.all()
        return context


class SshLogList(LoginRequiredMixin,PermissionRequiredMixin,ListView):
    model = Log
    template_name = 'webterminal/sshlogslist.html'
    permission_required = 'webterminal.can_view_log'
    raise_exception = True

class SshLogPlay(LoginRequiredMixin,PermissionRequiredMixin,DetailView):
    model = Log
    template_name = 'webterminal/sshlogplay.html'
    permission_required = 'webterminal.can_play_log'
    raise_exception = True

    def get_context_data(self, **kwargs):
        context = super(SshLogPlay, self).get_context_data(**kwargs)
        objects = kwargs['object']
        context['logpath'] = '{0}{1}-{2}-{3}/{4}.json'.format(MEDIA_URL,objects.start_time.year,objects.start_time.month,objects.start_time.day,objects.log)
        return context

class SshTerminalMonitor(LoginRequiredMixin,PermissionRequiredMixin,DetailView):
    model = Log
    template_name = 'webterminal/sshlogmonitor.html'
    permission_required = 'webterminal.can_monitor_serverinfo'
    raise_exception = True

class SshTerminalKill(LoginRequiredMixin,PermissionRequiredMixin,View):
    permission_required = 'webterminal.can_kill_serverinfo'
    raise_exception = True

    def post(self,request):
        if request.is_ajax():
            channel_name = request.POST.get('channel_name',None)
            try:
                data = Log.objects.get(channel=channel_name)
                if data.is_finished:
                    return JsonResponse({'status':False,'message':'Ssh terminal does not exist!'})
                else:
                    data.end_time = now()
                    data.is_finished = True
                    data.save()
                    
                    queue = get_redis_instance()
                    redis_channel = queue.pubsub()
                    queue.publish(channel_name, json.dumps(['close'])) 
                    
                    return JsonResponse({'status':True,'message':'Terminal has been killed !'})
            except ObjectDoesNotExist:
                return JsonResponse({'status':False,'message':'Request object does not exist!'})