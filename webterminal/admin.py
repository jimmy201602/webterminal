from django.contrib import admin
from webterminal.models import ServerInfor,ServerGroup,Credential,CommandsSequence,SshLog

admin.site.register(ServerInfor)
admin.site.register(ServerGroup)
admin.site.register(Credential)
admin.site.register(CommandsSequence)
admin.site.register(SshLog)