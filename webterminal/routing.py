from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from .token_auth import TokenAuthMiddleware
from webterminal.consumers import Webterminal, CommandExecute, SshTerminalMonitor

application = ProtocolTypeRouter({
    # (http->django views is added by default)
    'websocket':
        URLRouter([
            path('ws', Webterminal),
            path('execute', CommandExecute),
            path('monitor', SshTerminalMonitor),
        ]
        ),
})
