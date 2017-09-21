from django.db import models

class ServerInfor(models.Model):
    name = models.CharField(max_length=40,verbose_name='Server name',blank=False)
    hostname = models.CharField(max_length=40,verbose_name='Host name',blank=True)
    ip = models.GenericIPAddressField(protocol='ipv4',blank=False)
    onlinedatetime = models.DateTimeField(auto_created=True,auto_now=True)
    updatedatetime = models.DateTimeField(auto_created=True,auto_now_add=True)
    credential = models.ForeignKey('Credential')
    def __unicode__(self):
        return self.name

class ServerGroup(models.Model):
    name = models.CharField(max_length=40,verbose_name='Server group name',blank=False)
    servers = models.ManyToManyField(ServerInfor,related_name='servers')
    createdatetime = models.DateTimeField(auto_created=True,auto_now=True)
    updatedatetime = models.DateTimeField(auto_created=True,auto_now_add=True)
    def __unicode__(self):
        return self.name

class Credential(models.Model):
    name = models.CharField(max_length=40,verbose_name='Credential name',blank=False)
    username = models.CharField(max_length=40,verbose_name='Auth user name',blank=False)
    port = models.PositiveIntegerField(default=22,blank=True)
    method = models.CharField(max_length=40,choices=(('password','password'),('key','key')),blank=False)
    key = models.TextField(blank=True)
    password = models.CharField(max_length=40,blank=True)
    proxy = models.BooleanField(default=False)
    proxyserverip = models.GenericIPAddressField(protocol='ipv4',null=True, blank=True)
    proxyport = models.PositiveIntegerField(default=22,blank=True)
    proxyrequired = models.BooleanField(default=False,blank=True)
    proxypassword = models.CharField(max_length=40,verbose_name='Proxy password',blank=True)
    def __unicode__(self):
        return self.name    
