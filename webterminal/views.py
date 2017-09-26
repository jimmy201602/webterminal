from django.views.generic import View
from django.shortcuts import render_to_response,HttpResponse
from django.http import JsonResponse
from webterminal.models import ServerGroup,CommandsSequence
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

class Index(LoginRequiredMixin,View):
    def get(self,request):
        server_groups=ServerGroup.objects.all()
        return render_to_response('index.html',locals())

class Commands(LoginRequiredMixin,View):
    def get(self,request):
        server_groups=ServerGroup.objects.all()
        return render_to_response('commands.html',locals())
    
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

class CommandExecute(LoginRequiredMixin,View):
    def get(self,request):
        commands=CommandsSequence.objects.all()
        return render_to_response('commandexecute.html',locals())

class CommandExecuteList(LoginRequiredMixin,ListView):
    model = CommandsSequence
    template_name = 'commandslist.html'
    
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