# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from webterminal.models import ServerGroup
from django.contrib.auth.models import User
from django.contrib.auth.models import Permission as AuthPermission
from django.contrib.contenttypes.models import ContentType
from django.utils.translation import ugettext_lazy as _

class Permission(models.Model):
    user = models.OneToOneField(User,verbose_name=_('User'),related_name='permissionuser')
    permissions = models.ManyToManyField(AuthPermission,verbose_name=_('Permissions'),related_name='permission')
    groups = models.ManyToManyField(ServerGroup,verbose_name=_('Server group'))
    createdatetime = models.DateTimeField(auto_now_add=True,verbose_name=_('Create time'))
    updatedatetime = models.DateTimeField(auto_created=True,auto_now=True,verbose_name=_('Update time'))
    
    def __unicode__(self):
        return self.user
    
    class Meta:
        permissions = (
            ("can_add_user", _("Can add user")),
            ("can_change_user", _("Can change user info")),
            ("can_delete_user", _("Can delete user info")),
            ("can_view_user", _("Can view user info")),
            ("can_view_permissions", _("Can view user permissions")),
            ("can_change_permissions", _("Can change user permissions")),
            ("can_delete_permissions", _("Can revoke user permissions")),
            ("can_add_permissions", _("Can add user permissions")),
        )
