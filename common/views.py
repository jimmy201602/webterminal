# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.contrib.auth.mixins import AccessMixin
from django.utils.translation import activate

class LoginRequiredMixin(AccessMixin):
    """
    CBV mixin which verifies that the current user is authenticated.
    """
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return self.handle_no_permission()
        activate(request.LANGUAGE_CODE.replace('-','_'))
        return super(LoginRequiredMixin, self).dispatch(request, *args, **kwargs)