from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from .token_auth import TokenAuthMiddleware
from webterminal.consumers import Webterminal, CommandExecute, SshTerminalMonitor

application = ProtocolTypeRouter({
    # (http->django views is added by default)
    'websocket':
        URLRouter([
            path('ws', Webterminal.as_asgi()),
            path('execute', CommandExecute.as_asgi()),
            path('monitor', SshTerminalMonitor.as_asgi()),
        ]
        ),
})
