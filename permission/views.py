# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render, render_to_response, HttpResponseRedirect
from django.views.generic import FormView, DetailView, DeleteView, ListView, UpdateView, CreateView
from django.contrib.auth.models import User
from permission.forms import RegisterForm, PermissionForm
from django.core.urlresolvers import reverse_lazy
from permission.models import Permission
from django.utils.translation import ugettext, ugettext_lazy as _
from django.contrib.auth.mixins import PermissionRequiredMixin
from common.views import LoginRequiredMixin
from permission.commons import parse_permission_tree


class UserRegister(LoginRequiredMixin, PermissionRequiredMixin, FormView):
    template_name = 'permission/userregister.html'
    form_class = RegisterForm
    success_url = reverse_lazy('userlist')
    permission_required = 'permission.can_add_user'
    raise_exception = True

    def form_valid(self, form):
        username = form.cleaned_data['user']
        password = form.cleaned_data['newpassword1']
        email = form.cleaned_data['email']
        User.objects.create_user(
            username=username, email=email, password=password, is_active=True, is_staff=True)
        return HttpResponseRedirect(self.get_success_url())


class UserList(LoginRequiredMixin, PermissionRequiredMixin, ListView):
    template_name = 'permission/userlist.html'
    model = User
    permission_required = 'permission.can_view_user'
    raise_exception = True


class UserDelete(LoginRequiredMixin, PermissionRequiredMixin, DeleteView):
    template_name = 'permission/userdelete.html'
    model = User
    success_url = reverse_lazy('userlist')
    permission_required = 'permission.can_delete_user'
    raise_exception = True


class UserUpdate(LoginRequiredMixin, PermissionRequiredMixin, FormView, UpdateView):
    template_name = 'permission/userupdate.html'
    model = User
    form_class = RegisterForm
    success_url = reverse_lazy('userlist')
    permission_required = 'permission.can_change_user'
    raise_exception = True

    def get_initial(self):
        """
        Returns the initial data to use for forms on this view.
        """
        data = self.get_object()
        initial = super(UserUpdate, self).get_initial()
        initial['user'] = data.username
        initial['email'] = data.email
        return initial

    def form_valid(self, form):
        username = form.cleaned_data['user']
        password = form.cleaned_data['newpassword1']
        email = form.cleaned_data['email']
        data = self.get_object()
        if len(password) != 0:
            data.set_password(password)
        data.email = email
        data.save()
        return HttpResponseRedirect(self.get_success_url())

    def get_form(self, form_class=None):
        form = super(UserUpdate, self).get_form(form_class)
        form.fields['user'].widget.attrs.update({'readonly': True})
        form.fields['newpassword1'].required = False
        form.fields['newpassword2'].required = False
        return form


class PermissionCreate(LoginRequiredMixin, PermissionRequiredMixin, CreateView):
    model = Permission
    form_class = PermissionForm
    success_url = reverse_lazy('permissionlist')
    template_name = 'permission/permissioncreate.html'
    permission_required = 'permission.can_add_permissions'
    raise_exception = True

    def get_context_data(self, **kwargs):
        context = super(PermissionCreate, self).get_context_data(**kwargs)
        context['title'] = _('Create Permission')
        context['permission_tree_list'] = parse_permission_tree()
        return context

    def form_valid(self, form):
        user = form.cleaned_data['user']
        permissionset = form.cleaned_data['permissions']
        user.user_permissions.clear()
        user.user_permissions.add(*permissionset)
        user.save()
        self.object = form.save()
        return super(PermissionCreate, self).form_valid(form)

    def get_form(self, form_class=None):
        form = super(PermissionCreate, self).get_form(form_class)
        # form.fields['permissions'].widget.attrs.update(
            # {'checked': 'checked'})
        return form


class PermissionList(LoginRequiredMixin, PermissionRequiredMixin, ListView):
    model = Permission
    template_name = 'permission/permissionlist.html'
    permission_required = 'permission.can_view_permissions'
    raise_exception = True


class PermissionUpdate(LoginRequiredMixin, PermissionRequiredMixin, UpdateView):
    model = Permission
    form_class = PermissionForm
    success_url = reverse_lazy('permissionlist')
    template_name = 'permission/permissioncreate.html'
    permission_required = 'permission.can_change_permissions'
    raise_exception = True

    def get_context_data(self, **kwargs):
        context = super(PermissionUpdate, self).get_context_data(**kwargs)
        context['title'] = _('Update Permission')
        return context

    def form_valid(self, form):
        user = form.cleaned_data['user']
        permissionset = form.cleaned_data['permissions']
        user.user_permissions.clear()
        user.user_permissions.add(*permissionset)
        user.save()
        self.object = form.save()
        return super(PermissionUpdate, self).form_valid(form)


class PermissionDelete(LoginRequiredMixin, PermissionRequiredMixin, DeleteView):
    model = Permission
    success_url = reverse_lazy('permissionlist')
    template_name = 'permission/permissiondelete.html'
    permission_required = 'permission.can_delete_permissions'
    raise_exception = True

    def delete(self, request, *args, **kwargs):
        self.object = self.get_object()
        success_url = self.get_success_url()
        user = self.object.user
        permissionset = self.object.permissions.all()
        for permission in permissionset:
            user.user_permissions.remove(permission)
            user.save()
        self.object.delete()
        return HttpResponseRedirect(success_url)
