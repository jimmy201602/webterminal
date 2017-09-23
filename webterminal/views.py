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

class Index(View):
    def get(self,request):
        server_groups=ServerGroup.objects.all()
        return render_to_response('index.html',locals())

class Commands(View):
    def get(self,request):
        server_groups=ServerGroup.objects.all()
        return render_to_response('commands.html',locals())
    
    def post(self,request):
        if request.is_ajax():
            try:
                data = json.loads(request.body)
                obj = CommandsSequence.objects.create(name=data['name'],commands=data['commands'])
                for group in data['group']:
                    obj.group.add(ServerGroup.objects.get(name=group))
                obj.save()
                return JsonResponse({'status':True,'message':'%s create success!' %(str(data.get('name',None)))})
            except ObjectDoesNotExist:
                return JsonResponse({'status':False,'message':'Please input a valid group name!' })
            except IntegrityError:
                return JsonResponse({'status':False,'message':'Task name:%s already exist,Please use another name instead!' %(data['name']) })
            except KeyError:
                return JsonResponse({'status':False,'message':"Invalid parameter,Please report it to the adminstrator!" })
            except Exception,e:
                import traceback
                print traceback.print_exc()
                return JsonResponse({'status':False,'message':'Some error happend! Please report it to the adminstrator! Error info:%s' %(str(e)) })
        else:
            pass