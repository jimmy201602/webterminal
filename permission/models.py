# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from common.models import ServerGroup,Credential
from django.contrib.auth.models import User
from django.contrib.auth.models import Permission as AuthPermission
from django.contrib.contenttypes.models import ContentType
from django.utils.translation import ugettext_lazy as _


class Permission(models.Model):
    user = models.OneToOneField(User, verbose_name=_(
        'User'), related_name='permissionuser',on_delete=models.CASCADE)
    permissions = models.ManyToManyField(
        AuthPermission, verbose_name=_('Permissions'), related_name='permission')
    groups = models.ManyToManyField(
        ServerGroup, verbose_name=_('Server group'))
    credentials = models.ManyToManyField(Credential,verbose_name=_('credentials'), related_name='credentials')
    createdatetime = models.DateTimeField(
        auto_now_add=True, verbose_name=_('Create time'))
    updatedatetime = models.DateTimeField(
        auto_created=True, auto_now=True, verbose_name=_('Update time'))

    def __unicode__(self):
        return self.user.username

    def __str__(self):
        return self.user.username

    class Meta:
        permissions = (
            ("can_add_user", _("Can add user")),
            ("can_change_user", _("Can change user info")),
            ("can_delete_user", _("Can delete user info")),
            ("can_view_user", _("Can view user info")),
            ("can_view_permission", _("Can view user permission")),
            ("can_change_permission", _("Can change user permission")),
            ("can_delete_permission", _("Can revoke user permission")),
            ("can_add_permission", _("Can add user permission")),
        )
        app_label = 'permission'


class Role(models.Model):
    name = models.CharField(max_length=50, verbose_name=_(
        'Role name'), blank=False, unique=True)
    permissions = models.ManyToManyField(
        AuthPermission, verbose_name=_('Permissions'), related_name='rolepermission', limit_choices_to={'content_type__app_label__in': ['common', 'permission'], "codename__contains": 'can_'})
    groups = models.ManyToManyField(
        ServerGroup, verbose_name=_('Server group'))
    createdatetime = models.DateTimeField(
        auto_now_add=True, verbose_name=_('Create time'))
    updatedatetime = models.DateTimeField(
        auto_created=True, auto_now=True, verbose_name=_('Update time'))

    def __unicode__(self):
        return self.user.username

    def __str__(self):
        return self.user.username

    class Meta:
        permissions = (
            ("can_add_role", _("Can add role")),
            ("can_change_role", _("Can change role info")),
            ("can_delete_role", _("Can delete role info")),
            ("can_view_role", _("Can view role info")),
            ("can_view_role_permissions", _("Can view role permissions")),
            ("can_change_role_permissions", _("Can change role permissions")),
            ("can_delete_role_permissions", _("Can revoke role permissions")),
            ("can_add_role_permissions", _("Can add role permissions")),
        )
        app_label = 'permission'
