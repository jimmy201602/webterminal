import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "webterminal.settings")
import django
django.setup()
from django.contrib.auth.models import User
from common.models import Settings

username = 'admin'
password = 'password!23456'
email = 'admin@admin.com'

if User.objects.filter(username=username).count() == 0:
    User.objects.create_superuser(username, email, password)
    try:
        User.objects.get(username='AnonymousUser').delete()
    except Exception:
        pass
    print('Superuser created.')
else:
    print('Superuser creation skipped.')
try:
    Settings.objects.create(name="detect_webterminal_helper_is_installed",value="True")
    Settings.objects.create(name="otp",value="False")
except:
    pass
