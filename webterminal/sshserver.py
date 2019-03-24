import sys
import os
sys.path.insert(0, os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))))
# setup django to use django orm
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "webterminal.settings")
import django
django.setup()
from webterminal.server import main

if __name__ == '__main__':
    main()
