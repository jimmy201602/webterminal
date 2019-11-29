from common.models import Settings
from django.core.exceptions import ObjectDoesNotExist


def detect_webterminal_helper_is_installed(request):
    try:
        data = Settings.objects.get(
            name='detect_webterminal_helper_is_installed')
        if data.value == 'True':
            value = True
        else:
            value = False
    except ObjectDoesNotExist:
        value = True
    return {"detect_webterminal_helper_is_installed": value}

