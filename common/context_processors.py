from common.utils import get_settings_value


def detect_webterminal_helper_is_installed(request):
    return {
        "detect_webterminal_helper_is_installed": get_settings_value("detect_webterminal_helper_is_installed"),
        "otp_is_open": get_settings_value("otp")
    }

