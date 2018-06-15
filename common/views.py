# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.contrib.auth.mixins import AccessMixin
from django.utils.translation import activate
from django.views.generic import View
from django.shortcuts import render_to_response,HttpResponse
from django.http import JsonResponse
from common.models import ServerGroup,CommandsSequence,Credential,ServerInfor,Log
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
import traceback

class LoginRequiredMixin(AccessMixin):
    """
    CBV mixin which verifies that the current user is authenticated.
    """
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return self.handle_no_permission()
        activate(request.LANGUAGE_CODE.replace('-','_'))
        return super(LoginRequiredMixin, self).dispatch(request, *args, **kwargs)

class Commands(LoginRequiredMixin,TemplateView):
    template_name = 'common/commandcreate.html'

    def get_context_data(self, **kwargs):
        context = super(Commands, self).get_context_data(**kwargs)
        context['server_groups'] = ServerGroup.objects.all()
        return context
    
    def post(self,request):
        if request.is_ajax():
            try:
                data = json.loads(request.body)
                if data['action'] == 'create':
                    if not request.user.has_perm('common.can_add_commandssequence'):
                        raise PermissionDenied(_('403 Forbidden'))
                    obj = CommandsSequence.objects.create(name=data['name'],commands=data['commands'])
                    for group in data['group']:
                        obj.group.add(ServerGroup.objects.get(name=group))
                    obj.save()
                    return JsonResponse({'status':True,'message':'%s create success!' %(smart_str(data.get('name',None)))})
                elif data['action'] == 'update':
                    if not request.user.has_perm('common.can_change_commandssequence'):
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
                    if not request.user.has_perm('common.can_delete_commandssequence'):
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
                print(traceback.print_exc())
                return JsonResponse({'status':False,'message':'Some error happend! Please report it to the adminstrator! Error info:%s' %(smart_str(e)) })
        else:
            pass

class CommandExecute(LoginRequiredMixin,PermissionRequiredMixin,TemplateView):
    template_name = 'common/commandexecute.html'
    permission_required = 'common.can_execute_commandssequence'
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
    template_name = 'common/commandslist.html'
    permission_required = 'common.can_view_commandssequence'
    raise_exception = True

    def get_context_data(self, **kwargs):
        context = super(CommandExecuteList, self).get_context_data(**kwargs)
        context['server_groups'] = ServerGroup.objects.all()
        return context
        

class CommandExecuteDetailApi(LoginRequiredMixin,PermissionRequiredMixin,View):
    permission_required = 'common.can_execute_commandssequence'
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
    template_name = 'common/credentialcreate.html'
    
    def post(self,request):
        if request.is_ajax():
            try:
                data = json.loads(request.body)
                id = data.get('id',None)
                action = data.get('action',None)                
                fields = [field.name for field in Credential._meta.get_fields()]
                [ data.pop(field) for field in data.keys() if field not in fields]
                if action == 'create':
                    if not request.user.has_perm('common.can_add_credential'):
                        raise PermissionDenied(_('403 Forbidden'))
                    obj = Credential.objects.create(**data)
                    obj.save()
                    return JsonResponse({'status':True,'message':'Credential %s was created!' %(obj.name)})
                elif action == 'update':
                    if not request.user.has_perm('common.can_change_credential'):
                        raise PermissionDenied(_('403 Forbidden'))
                    try:
                        obj = Credential.objects.get(id=id)
                        obj.__dict__.update(**data)
                        obj.save()
                        return JsonResponse({'status':True,'message':'Credential %s update success!' %(smart_str(data.get('name',None)))})
                    except ObjectDoesNotExist:
                        return JsonResponse({'status':False,'message':'Request object not exist!'})
                elif action == 'delete':
                    if not request.user.has_perm('common.can_delete_credential'):
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
                print(traceback.print_exc())
                return JsonResponse({'status':False,'message':'Error happend! Please report it to adminstrator! Error:%s' %(smart_str(e))})
            
class CredentialList(LoginRequiredMixin,PermissionRequiredMixin,ListView):
    
    model = Credential
    template_name = 'common/credentiallist.html'
    permission_required = 'common.can_view_credential'
    raise_exception = True
    
class CredentialDetailApi(LoginRequiredMixin,PermissionRequiredMixin,View):
    permission_required = 'common.can_view_credential'
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
    template_name = 'common/servercreate.html'
    permission_required = 'common.can_add_serverinfo'
    raise_exception = True

    def get_context_data(self, **kwargs):
        context = super(ServerCreate, self).get_context_data(**kwargs)
        context['credentials'] = Credential.objects.all()
        return context

class ServerlList(LoginRequiredMixin,PermissionRequiredMixin,ListView):
    
    model = ServerInfor
    template_name = 'common/serverlist.html'
    permission_required = 'common.can_view_serverinfo'
    raise_exception = True

    def get_context_data(self, **kwargs):
        context = super(ServerlList, self).get_context_data(**kwargs)
        context['credentials'] = Credential.objects.all()
        return context

class GroupList(LoginRequiredMixin,PermissionRequiredMixin,ListView):
    model = ServerGroup
    template_name = 'common/grouplist.html'
    permission_required = 'common.can_view_servergroup'
    raise_exception = True
    
    def get_context_data(self, **kwargs):
        context = super(GroupList, self).get_context_data(**kwargs)
        context['servers'] = ServerInfor.objects.all()
        return context

class GroupCreate(LoginRequiredMixin,PermissionRequiredMixin,TemplateView):
    template_name = 'common/groupcreate.html'
    permission_required = 'common.can_add_servergroup'
    raise_exception = True

    def get_context_data(self, **kwargs):
        context = super(GroupCreate, self).get_context_data(**kwargs)
        context['servers'] = ServerInfor.objects.all()
        return context


class LogList(LoginRequiredMixin,PermissionRequiredMixin,ListView):
    model = Log
    template_name = 'common/logslist.html'
    permission_required = 'common.can_view_log'
    raise_exception = True