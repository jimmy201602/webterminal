from django.views.generic import View
from django.shortcuts import render_to_response

class Index(View):
    def get(self,request):
        return render_to_response('index.html')