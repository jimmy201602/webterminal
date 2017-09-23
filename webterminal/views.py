from django.views.generic import View
from django.shortcuts import render_to_response,HttpResponse
from django.http import JsonResponse
from webterminal.models import ServerGroup
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect,csrf_exempt
try:
    import simplejson as json
except ImportError:
    import json
from django.contrib import messages as message
    
class Index(View):
    def get(self,request):
        server_groups=ServerGroup.objects.all()
        return render_to_response('index.html',locals())

class Commands(View):
    def get(self,request):
        return render_to_response('commands.html',locals())
    
    def post(self,request):
        if request.is_ajax():
            data = json.loads(request.body)
            return JsonResponse({'status':True,'message':'%s create success!' %(str(data.get('name',None)))})
        else:
            pass