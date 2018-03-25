# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render,render_to_response,HttpResponseRedirect
from django.views.generic import FormView,DetailView,DeleteView,ListView,UpdateView,CreateView
from django.contrib.auth.models import User
from permission.forms import RegisterForm,PermissionForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.urlresolvers import reverse_lazy
from permission.models import Permission

class UserRegister(LoginRequiredMixin,FormView):
    template_name = 'permission/userregister.html'
    form_class = RegisterForm
    success_url = reverse_lazy('userlist')

    def form_valid(self, form):
        username=form.cleaned_data['user']
        password=form.cleaned_data['newpassword1']
        email=form.cleaned_data['email']
        User.objects.create_user(username=username,email=email,password=password,is_active=False)
        return HttpResponseRedirect(self.get_success_url())

class UserList(LoginRequiredMixin,ListView):
    template_name='permission/userlist.html'
    model=User

class UserDelete(LoginRequiredMixin,DeleteView):
    template_name='permission/userdelete.html'
    model=User
    success_url = reverse_lazy('userlist')

class UserUpdate(LoginRequiredMixin,UpdateView):
    template_name='permission/userupdate.html'
    model=User
    fields=['email']
    success_url = reverse_lazy('userlist')


class PermissonCreate(LoginRequiredMixin,CreateView):
    model = Permission
    form_class = PermissionForm
    success_url = reverse_lazy('userlist')
    template_name = 'permission/userregister.html'