from django.views.generic import View
from django.shortcuts import render_to_response
from webterminal.models import ServerGroup

class Index(View):
    def get(self,request):
        server_groups=ServerGroup.objects.all()
        return render_to_response('index.html',locals())