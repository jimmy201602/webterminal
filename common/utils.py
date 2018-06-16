# -*- coding: utf-8 -*-

class WebsocketAuth(object):

    @property
    def authenticate(self):
        #user auth
        if self.message.user.is_authenticated():
            return True
        else:
            return False

    def haspermission(self,perm):
        #permission auth
        if self.message.user.has_perm(perm):
            return True
        else:
            return False