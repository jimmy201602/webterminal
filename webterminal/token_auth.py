from channels.auth import AuthMiddlewareStack
from asgiref.sync import sync_to_async
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AnonymousUser
from django.db import close_old_connections
from channels.db import database_sync_to_async
from asgiref.sync import SyncToAsync
from django.core.exceptions import ObjectDoesNotExist


class TokenAuthMiddleware:
    """
    Token authorization middleware for Django Channels 2
    """

    def __init__(self, inner):
        self.inner = inner

    def __call__(self, scope):
        headers = dict(scope['headers'])
        if b'sec-websocket-protocol' in headers:
            token_key = headers[b'sec-websocket-protocol'].decode()
            scope['user'] = self.get_user_name(token_key)
        return self.inner(scope)

    @database_sync_to_async
    def get_user_name(self, token_key):
        try:
            token = Token.objects.get(key=token_key)
            close_old_connections()
            return token.user
        except ObjectDoesNotExist:
            return AnonymousUser()


def TokenAuthMiddlewareStack(inner):
    return TokenAuthMiddleware(
        AuthMiddlewareStack(inner))
