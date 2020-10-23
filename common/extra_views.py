from django.views.decorators.csrf import csrf_protect
from django.urls import reverse_lazy
from django.views.generic import FormView, TemplateView
from django.contrib.auth.tokens import default_token_generator
from django import VERSION as DJANGO_VERSION
from django.contrib.auth.forms import (SetPasswordForm,
                                       PasswordResetForm)
from django.shortcuts import resolve_url
from django.utils.functional import lazy
import six
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.debug import sensitive_post_parameters
try:
    from django.contrib.auth.views import INTERNAL_RESET_URL_TOKEN, INTERNAL_RESET_SESSION_TOKEN
except ImportError:
    INTERNAL_RESET_URL_TOKEN = None
    INTERNAL_RESET_SESSION_TOKEN = None
from django.http import HttpResponseRedirect
from django.contrib.auth import get_user_model, login as auth_login
from django.utils.http import urlsafe_base64_decode
from django.contrib import auth
from django.conf import settings

User = get_user_model()


def _safe_resolve_url(url):
    """
    Previously, resolve_url_lazy would fail if the url was a unicode object.
    See <https://github.com/fusionbox/django-authtools/issues/13> for more
    information.

    Thanks to GitHub user alanwj for pointing out the problem and providing
    this solution.
    """
    return six.text_type(resolve_url(url))


resolve_url_lazy = lazy(_safe_resolve_url, six.text_type)


def DecoratorMixin(decorator):
    """
    Converts a decorator written for a function view into a mixin for a
    class-based view.

    ::

        LoginRequiredMixin = DecoratorMixin(login_required)

        class MyView(LoginRequiredMixin):
            pass

        class SomeView(DecoratorMixin(some_decorator),
                       DecoratorMixin(something_else)):
            pass

    """

    class Mixin(object):
        __doc__ = decorator.__doc__

        @classmethod
        def as_view(cls, *args, **kwargs):
            view = super(Mixin, cls).as_view(*args, **kwargs)
            return decorator(view)

    Mixin.__name__ = str('DecoratorMixin(%s)' % decorator.__name__)
    return Mixin


NeverCacheMixin = DecoratorMixin(never_cache)
CsrfProtectMixin = DecoratorMixin(csrf_protect)
SensitivePostParametersMixin = DecoratorMixin(
    sensitive_post_parameters('password', 'old_password', 'password1',
                              'password2', 'new_password1', 'new_password2')
)


class AuthDecoratorsMixin(NeverCacheMixin, CsrfProtectMixin, SensitivePostParametersMixin):
    pass


class PasswordResetView(CsrfProtectMixin, FormView):
    template_name = 'registration/password_reset_form.html'
    token_generator = default_token_generator
    success_url = reverse_lazy('password_reset_done')
    domain_override = None
    subject_template_name = 'registration/password_reset_subject.txt'
    email_template_name = 'registration/password_reset_email.html'
    html_email_template_name = None
    from_email = None
    form_class = PasswordResetForm
    extra_email_context = None

    def form_valid(self, form):
        kwargs = dict(
            domain_override=self.domain_override,
            subject_template_name=self.subject_template_name,
            email_template_name=self.email_template_name,
            token_generator=self.token_generator,
            from_email=self.from_email,
            request=self.request,
            use_https=self.request.is_secure(),
            html_email_template_name=self.html_email_template_name,
        )

        if DJANGO_VERSION[:2] >= (1, 9):
            kwargs['extra_email_context'] = self.extra_email_context

        form.save(**kwargs)

        return super(PasswordResetView, self).form_valid(form)


class PasswordResetDoneView(TemplateView):
    template_name = 'registration/password_reset_done.html'


class PasswordResetConfirmView(AuthDecoratorsMixin, FormView):
    template_name = 'registration/password_reset_confirm.html'
    token_generator = default_token_generator
    form_class = SetPasswordForm
    success_url = reverse_lazy('password_reset_complete')
    post_reset_login = False
    post_reset_login_backend = None

    def dispatch(self, *args, **kwargs):
        assert self.kwargs.get('token') is not None
        self.user = self.get_user()
        self.validlink = False

        if self.user is not None:
            if INTERNAL_RESET_SESSION_TOKEN and INTERNAL_RESET_URL_TOKEN:
                # django 1.11 does this differently. Most of this is copied from django
                token = kwargs['token']
                if token == INTERNAL_RESET_URL_TOKEN:
                    session_token = self.request.session.get(
                        INTERNAL_RESET_SESSION_TOKEN)
                    if self.token_generator.check_token(self.user, session_token):
                        # If the token is valid, display the password reset form.
                        self.validlink = True
                        return super(PasswordResetConfirmView, self).dispatch(*args, **kwargs)
                else:
                    if self.token_generator.check_token(self.user, token):
                        # Store the token in the session and redirect to the
                        # password reset form at a URL without the token. That
                        # avoids the possibility of leaking the token in the
                        # HTTP Referer header.
                        self.request.session[INTERNAL_RESET_SESSION_TOKEN] = token
                        redirect_url = self.request.path.replace(
                            token, INTERNAL_RESET_URL_TOKEN)
                        return HttpResponseRedirect(redirect_url)
            else:
                # do the pre django 1.11 way.
                self.validlink = self.valid_link()

        return super(PasswordResetConfirmView, self).dispatch(*args, **kwargs)

    def get_queryset(self):
        return User._default_manager.all()

    def get_user(self):
        uidb64 = self.kwargs.get('uidb64')
        try:
            uid = urlsafe_base64_decode(uidb64)
            return self.get_queryset().get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return None

    def valid_link(self):
        user = self.user
        return user is not None and self.token_generator.check_token(user, self.kwargs.get('token'))

    def get_form_kwargs(self):
        kwargs = super(PasswordResetConfirmView, self).get_form_kwargs()
        kwargs['user'] = self.user
        return kwargs

    def get_context_data(self, **kwargs):
        kwargs = super(PasswordResetConfirmView,
                       self).get_context_data(**kwargs)
        if self.validlink:
            kwargs['validlink'] = True
        else:
            kwargs['validlink'] = False
            kwargs['form'] = None
        return kwargs

    def form_valid(self, form):
        if not self.validlink:
            return self.form_invalid(form)

        user = self.save_form(form)

        if INTERNAL_RESET_SESSION_TOKEN:
            del self.request.session[INTERNAL_RESET_SESSION_TOKEN]

        if self.post_reset_login:
            auth_login(self.request, user, self.post_reset_login_backend)

        return super(PasswordResetConfirmView, self).form_valid(form)

    def save_form(self, form):
        return form.save()


class PasswordResetConfirmAndLoginView(PasswordResetConfirmView):
    success_url = resolve_url_lazy(settings.LOGIN_REDIRECT_URL)

    def save_form(self, form):
        ret = super(PasswordResetConfirmAndLoginView, self).save_form(form)
        user = auth.authenticate(username=self.user.get_username(),
                                 password=form.cleaned_data['new_password1'])
        auth.login(self.request, user)
        return ret
