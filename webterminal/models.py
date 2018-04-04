from django.db import models
from django.core.exceptions import ValidationError
try:
    import simplejson as json
except ImportError:
    import json
from django.contrib.auth.models import User 
import uuid
from django.utils.text import slugify
from django.utils.translation import ugettext_lazy as _

class ServerInfor(models.Model):
    name = models.CharField(max_length=40,verbose_name=_('Server name'),blank=False,unique=True)
    hostname = models.CharField(max_length=40,verbose_name=_('Host name'),blank=True)
    ip = models.GenericIPAddressField(protocol='ipv4',verbose_name=_('ip'),blank=False)
    createdatetime = models.DateTimeField(auto_now_add=True,verbose_name=_('Create time'))
    updatedatetime = models.DateTimeField(auto_created=True,auto_now=True,verbose_name=_('Update time'))
    credential = models.ForeignKey('Credential')
    
    def __unicode__(self):
        return self.name
    def gethostname(self):
        return slugify(self.hostname)
    
    class Meta:
        permissions = (
            ("can_add_serverinfo", _("Can add server")),
            ("can_change_serverinfo", _("Can change server info")),
            ("can_delete_serverinfo", _("Can delete server info")),
            ("can_connect_serverinfo", _("Can connect to server")),
            ("can_kill_serverinfo", _("Can kill online user")),
            ("can_monitor_serverinfo", _("Can monitor user action")),
            ("can_view_serverinfo", _("Can view server info")),
            ("can_filemanage_serverinfo", _("Can manage file")),
        )

class ServerGroup(models.Model):
    name = models.CharField(max_length=40,verbose_name=_('Server group name'),blank=False,unique=True)
    servers = models.ManyToManyField(ServerInfor,related_name='servers',verbose_name=_('Servers'))
    createdatetime = models.DateTimeField(auto_now_add=True,verbose_name=_('Create time'))
    updatedatetime = models.DateTimeField(auto_created=True,auto_now=True,verbose_name=_('Update time'))
    
    def __unicode__(self):
        return self.name

    class Meta:
        permissions = (
            ("can_add_servergroup", _("Can add group")),
            ("can_change_servergroup", _("Can change group info")),
            ("can_delete_servergroup", _("Can delete group info")),
            ("can_view_servergroup", _("Can view group info")),
        )

class Credential(models.Model):
    protocol_choices = (
            ('ssh-password',_('ssh-password')),
            ('ssh-key',_('ssh-key')),
            ('vnc',_('vnc')),
            ('rdp',_('rdp')),
            ('telnet',_('telnet'))
        )

    name = models.CharField(max_length=40,verbose_name=_('Credential name'),blank=False,unique=True)
    username = models.CharField(max_length=40,verbose_name=_('Auth user name'),blank=False)
    port = models.PositiveIntegerField(default=22,blank=False,verbose_name=_('Port'))
    method = models.CharField(max_length=40,choices=(('password',_('password')),('key',_('key'))),blank=False,default='password',verbose_name=_('Method'))
    key = models.TextField(blank=True,verbose_name=_('Key'))
    password = models.CharField(max_length=40,blank=True,verbose_name=_('Password'))
    proxy = models.BooleanField(default=False,verbose_name=_('Proxy'))
    proxyserverip = models.GenericIPAddressField(protocol='ipv4',null=True, blank=True,verbose_name=_('Proxy ip'))
    proxyport = models.PositiveIntegerField(blank=True,null=True,verbose_name=_('Proxy port'))
    proxypassword = models.CharField(max_length=40,verbose_name=_('Proxy password'),blank=True)
    protocol = models.CharField(max_length=40,default='ssh-password', choices=protocol_choices,verbose_name=_('Protocol'))
    width = models.PositiveIntegerField(verbose_name=_('width'),default=1024)
    height = models.PositiveIntegerField(verbose_name=_('height'),default=768)
    dpi = models.PositiveIntegerField(verbose_name=_('dpi'),default=96)

    def __unicode__(self):
        return self.name    
    
    def clean(self):
        if self.protocol == 'ssh-password' or self.protocol == 'ssh-key':
            if self.method == 'password' and len(self.password) == 0:
                raise ValidationError(_('If you choose password auth method,You must set password!'))
            if self.method == 'password' and len(self.key) >0:
                raise ValidationError(_('If you choose password auth method,You must make key field for blank!'))
            if self.method == 'key' and len(self.key) == 0:
                raise ValidationError(_('If you choose key auth method,You must fill in key field!'))
            if self.method == 'key' and len(self.password) >0:
                raise ValidationError(_('If you choose key auth method,You must make password field for blank!'))
            if self.proxy:
                if self.proxyserverip is None or self.proxyport is None:
                    raise ValidationError(_('If you choose auth proxy,You must fill in proxyserverip and proxyport field !'))

    class Meta:
        permissions = (
            ("can_add_credential", _("Can add credential")),
            ("can_change_credential", _("Can change credential info")),
            ("can_delete_credential", _("Can delete credential info")),
            ("can_view_credential", _("Can view credential info")),
        )

class CommandsSequence(models.Model):
    name = models.CharField(max_length=40,verbose_name=_('Task name'),blank=False,unique=True)
    commands = models.TextField(verbose_name=_('Task commands'),blank=False)
    group = models.ManyToManyField(ServerGroup,verbose_name=_('Server group you want to execute'))
    
    def __unicode__(self):
        return self.name
    
    def clean(self):
        try:
            json.dumps(self.commands)
        except Exception:
            raise ValidationError(_('Commands sequence is not valid json type'))
        
    def save(self, *args, **kwargs):
        if isinstance(self.commands,(list)):
            self.commands = json.dumps(self.commands)
        super(CommandsSequence,self).save(*args, **kwargs)

    class Meta:
        permissions = (
            ("can_add_commandssequence", _("Can add commands")),
            ("can_change_commandssequence", _("Can change commands info")),
            ("can_delete_commandssequence", _("Can delete commands info")),
            ("can_view_commandssequence", _("Can view commands info")),
            ("can_execute_commandssequence", _("Can execute commands")),
        )

class Log(models.Model):
    server = models.ForeignKey(ServerInfor,verbose_name=_('Server'))
    channel = models.CharField(max_length=100,verbose_name=_('Channel name'),blank=False,unique=True,editable=False)
    log = models.UUIDField(max_length=100,default=uuid.uuid4,verbose_name=_('Log name'),blank=False,unique=True,editable=False)
    start_time = models.DateTimeField(auto_now_add=True,verbose_name=_('Start time'))
    end_time = models.DateTimeField(auto_created=True,auto_now=True,verbose_name=_('End time'))
    is_finished = models.BooleanField(default=False,verbose_name=_('Is finished'))
    user = models.ForeignKey(User,verbose_name=_('User'))
    width = models.PositiveIntegerField(default=90,verbose_name=_('Width'))
    height = models.PositiveIntegerField(default=40,verbose_name=_('Height'))

    def __unicode__(self):
        return self.server.name
    
    class Meta:
        permissions = (
            ("can_delete_log", _("Can delete log info")),
            ("can_view_log", _("Can view log info")),
            ("can_play_log", _("Can play record")),
        )
        ordering = [
            ('-start_time')
        ]