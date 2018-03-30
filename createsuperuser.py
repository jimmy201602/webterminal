import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "webterminal.settings")
import django
django.setup()
from django.contrib.auth.models import User

username = '$USER'
password = '$PASS'
email = '$MAIL'

if User.objects.filter(username=username).count()==0:
    User.objects.create_superuser(username, email, password)
    print('Superuser created.')
else:
    print('Superuser creation skipped.')