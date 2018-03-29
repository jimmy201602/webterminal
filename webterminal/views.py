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
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.serializers import serialize
from webterminal.settings import MEDIA_URL
from django.utils.timezone import now
from webterminal.interactive import get_redis_instance
from django.contrib.auth.mixins import PermissionRequiredMixin
from django.views.generic import TemplateView

class Index(LoginRequiredMixin,TemplateView):
    template_name = 'webterminal/index.html'

    def get_context_data(self, **kwargs):
        context = super(Index, self).get_context_data(**kwargs)
        context['server_groups'] = ServerGroup.objects.all()
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
                    obj = CommandsSequence.objects.create(name=data['name'],commands=data['commands'])
                    for group in data['group']:
                        obj.group.add(ServerGroup.objects.get(name=group))
                    obj.save()
                    return JsonResponse({'status':True,'message':'%s create success!' %(smart_str(data.get('name',None)))})
                elif data['action'] == 'update':
                    try:
                        obj = CommandsSequence.objects.get(id=data.get('id',None))
                        obj.commands = data['commands']
                        [obj.group.remove(group) for group in obj.group.all()]
                        for group in data['group']:
                            obj.group.add(ServerGroup.objects.get(name=group))                        
                        obj.save()
                        return JsonResponse({'status':True,'message':'%s update success!' %(smart_str(data.get('name',None)))})                        
                    except ObjectDoesNotExist:
                        return JsonResponse({'status':False,'message':'Request object not exist!'})
                elif data['action'] == 'delete':
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

class CommandExecute(LoginRequiredMixin,TemplateView):
    template_name = 'webterminal/commandexecute.html'

    def get_context_data(self, **kwargs):
        context = super(CommandExecute, self).get_context_data(**kwargs)
        context['commands'] = CommandsSequence.objects.all()
        return context

class CommandExecuteList(LoginRequiredMixin,ListView):
    model = CommandsSequence
    template_name = 'webterminal/commandslist.html'
    
    def get_context_data(self, **kwargs):
        context = super(CommandExecuteList, self).get_context_data(**kwargs)
        context['server_groups'] = ServerGroup.objects.all()
        return context
        

class CommandExecuteDetailApi(LoginRequiredMixin,View):
    
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

class CredentialCreate(LoginRequiredMixin,View):
    
    def get(self,request):
        return render_to_response('webterminal/credentialcreate.html',locals())
    
    def post(self,request):
        if request.is_ajax():
            try:
                data = json.loads(request.body)
                id = data.get('id',None)
                action = data.get('action',None)                
                fields = [field.name for field in Credential._meta.get_fields()]
                [ data.pop(field) for field in data.keys() if field not in fields]
                if action == 'create':
                    obj = Credential.objects.create(**data)
                    obj.save()
                    return JsonResponse({'status':True,'message':'Credential %s was created!' %(obj.name)})
                elif action == 'update':
                    try:
                        obj = Credential.objects.get(id=id)
                        obj.__dict__.update(**data)
                        obj.save()
                        return JsonResponse({'status':True,'message':'Credential %s update success!' %(smart_str(data.get('name',None)))})
                    except ObjectDoesNotExist:
                        return JsonResponse({'status':False,'message':'Request object not exist!'})
                elif action == 'delete':
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
            
class CredentialList(LoginRequiredMixin,ListView):
    
    model = Credential
    template_name = 'webterminal/credentiallist.html'
    
class CredentialDetailApi(LoginRequiredMixin,View):
    
    def post(self,request):
        if request.is_ajax():
            id = request.POST.get('id',None)
            data = Credential.objects.filter(id=id)
            if data.count() == 0:
                return JsonResponse({'status':False,'message':'Request object not exist!'})
            return JsonResponse({'status':True,'message':json.loads(serialize('json',data))[0]['fields']})
        else:
            return JsonResponse({'status':False,'message':'Method not allowed!'})


class ServerCreate(LoginRequiredMixin,View):
    def get(self,request):
        credentials = Credential.objects.all()
        return render_to_response('webterminal/servercreate.html',locals())

class ServerlList(LoginRequiredMixin,ListView):
    
    model = ServerInfor
    template_name = 'webterminal/serverlist.html'
    
    def get_context_data(self, **kwargs):
        context = super(ServerlList, self).get_context_data(**kwargs)
        context['credentials'] = Credential.objects.all()
        return context

class GroupList(LoginRequiredMixin,ListView):
    model = ServerGroup
    template_name = 'webterminal/grouplist.html'
    
    def get_context_data(self, **kwargs):
        context = super(GroupList, self).get_context_data(**kwargs)
        context['servers'] = ServerInfor.objects.all()
        return context

class GroupCreate(LoginRequiredMixin,View):
    def get(self,request):
        servers = ServerInfor.objects.all()
        return render_to_response('webterminal/groupcreate.html',locals())


class SshLogList(LoginRequiredMixin,ListView):
    model = Log
    template_name = 'webterminal/sshlogslist.html'

class SshLogPlay(LoginRequiredMixin,DetailView):
    model = Log
    template_name = 'webterminal/sshlogplay.html'
    
    def get_context_data(self, **kwargs):
        context = super(SshLogPlay, self).get_context_data(**kwargs)
        objects = kwargs['object']
        context['logpath'] = '{0}{1}-{2}-{3}/{4}.json'.format(MEDIA_URL,objects.start_time.year,objects.start_time.month,objects.start_time.day,objects.log)
        return context

class SshTerminalMonitor(LoginRequiredMixin,DetailView):
    model = Log
    template_name = 'webterminal/sshlogmonitor.html'
        
class SshTerminalKill(LoginRequiredMixin,View):
    
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