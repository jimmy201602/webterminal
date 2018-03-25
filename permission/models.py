# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from webterminal.models import ServerGroup
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.utils.translation import gettext as _

class Permission(models.Model):
    user = models.ForeignKey(User,verbose_name=_('User'),related_name='permissionuser')
    permissions = models.ManyToManyField(ContentType,verbose_name=_('Permissions'),related_name='permissions')
    groups = models.ManyToManyField(ServerGroup,verbose_name=_('Server group'))
    createdatetime = models.DateTimeField(auto_now_add=True,verbose_name=_('Create time'))
    updatedatetime = models.DateTimeField(auto_created=True,auto_now=True,verbose_name=_('Update time'))
    
    def __unicode__(self):
        return self.user
    
    