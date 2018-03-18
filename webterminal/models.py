from django.db import models
from django.core.exceptions import ValidationError
try:
    import simplejson as json
except ImportError:
    import json
from django.contrib.auth.models import User 
import uuid
from django.utils.text import slugify

class ServerInfor(models.Model):
    name = models.CharField(max_length=40,verbose_name='Server name',blank=False,unique=True)
    hostname = models.CharField(max_length=40,verbose_name='Host name',blank=True)
    ip = models.GenericIPAddressField(protocol='ipv4',blank=False)
    createdatetime = models.DateTimeField(auto_now_add=True)
    updatedatetime = models.DateTimeField(auto_created=True,auto_now=True)
    credential = models.ForeignKey('Credential')
    
    def __unicode__(self):
        return self.name
    def gethostname(self):
        return slugify(self.hostname)
    
    class Meta:
        permissions = (
            ("can_add", "Can add server"),
            ("can_change", "Can change server info"),
            ("can_delete", "Can delete server info"),
            ("can_connect", "Can connect to server"),
            ("can_view", "Can view server info"),
        )

class ServerGroup(models.Model):
    name = models.CharField(max_length=40,verbose_name='Server group name',blank=False,unique=True)
    servers = models.ManyToManyField(ServerInfor,related_name='servers')
    createdatetime = models.DateTimeField(auto_now_add=True)
    updatedatetime = models.DateTimeField(auto_created=True,auto_now=True)
    
    def __unicode__(self):
        return self.name

    class Meta:
        permissions = (
            ("can_add", "Can add group"),
            ("can_change", "Can change group info"),
            ("can_delete", "Can delete group info"),
            ("can_view", "Can view group info"),
        )

protocol_choices = (
        ('ssh-password','ssh-password'),
        ('ssh-key','ssh-key'),
        ('vnc','vnc'),
        ('rdp','rdp'),
        ('telnet','telnet')
    )

class Credential(models.Model):
    name = models.CharField(max_length=40,verbose_name='Credential name',blank=False,unique=True)
    username = models.CharField(max_length=40,verbose_name='Auth user name',blank=False)
    port = models.PositiveIntegerField(default=22,blank=False)
    method = models.CharField(max_length=40,choices=(('password','password'),('key','key')),blank=False,default='password')
    key = models.TextField(blank=True)
    password = models.CharField(max_length=40,blank=True)
    proxy = models.BooleanField(default=False)
    proxyserverip = models.GenericIPAddressField(protocol='ipv4',null=True, blank=True)
    proxyport = models.PositiveIntegerField(blank=True,null=True)
    proxypassword = models.CharField(max_length=40,verbose_name='Proxy password',blank=True)
    protocol = models.CharField(max_length=40,default='ssh-password', choices=protocol_choices)
    width = models.PositiveIntegerField(verbose_name='width',default=1024)
    height = models.PositiveIntegerField(verbose_name='height',default=768)
    dpi = models.PositiveIntegerField(verbose_name='dpi',default=96)

    def __unicode__(self):
        return self.name    
    
    def clean(self):
        if self.protocol == 'ssh-password' or self.protocol == 'ssh-key':
            if self.method == 'password' and len(self.password) == 0:
                raise ValidationError('If you choose password auth method,You must set password!')
            if self.method == 'password' and len(self.key) >0:
                raise ValidationError('If you choose password auth method,You must make key field for blank!')
            if self.method == 'key' and len(self.key) == 0:
                raise ValidationError('If you choose key auth method,You must fill in key field!')
            if self.method == 'key' and len(self.password) >0:
                raise ValidationError('If you choose key auth method,You must make password field for blank!')  
            if self.proxy:
                if self.proxyserverip is None or self.proxyport is None:
                    raise ValidationError('If you choose auth proxy,You must fill in proxyserverip and proxyport field !')

    class Meta:
        permissions = (
            ("can_add", "Can add credential"),
            ("can_change", "Can change credential info"),
            ("can_delete", "Can delete credential info"),
            ("can_view", "Can view credential info"),
        )

class CommandsSequence(models.Model):
    name = models.CharField(max_length=40,verbose_name='Task name',blank=False,unique=True)
    commands = models.TextField(verbose_name='Task commands',blank=False)
    group = models.ManyToManyField(ServerGroup,verbose_name='Server group you want to execute')
    
    def __unicode__(self):
        return self.name
    
    def clean(self):
        try:
            json.dumps(self.commands)
        except Exception:
            raise ValidationError('Commands sequence is not valid json type')
        
    def save(self, *args, **kwargs):
        if isinstance(self.commands,(list)):
            self.commands = json.dumps(self.commands)
        super(CommandsSequence,self).save(*args, **kwargs)

    class Meta:
        permissions = (
            ("can_add", "Can add commands"),
            ("can_change", "Can change commands info"),
            ("can_delete", "Can delete commands info"),
            ("can_view", "Can view commands info"),
        )

class SshLog(models.Model):
    server = models.ForeignKey(ServerInfor)
    channel = models.CharField(max_length=100,verbose_name='Channel name',blank=False,unique=True,editable=False)
    log = models.UUIDField(max_length=100,default=uuid.uuid4,verbose_name='Log name',blank=False,unique=True,editable=False)
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(auto_created=True,auto_now=True)
    is_finished = models.BooleanField(default=False)
    user = models.ForeignKey(User)
    width = models.PositiveIntegerField(default=90)
    height = models.PositiveIntegerField(default=40)

    def __unicode__(self):
        return self.server.name
    
    class Meta:
        permissions = (
            ("can_delete", "Can delete log info"),
            ("can_view", "Can view log info"),
        )