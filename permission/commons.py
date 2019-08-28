from django.contrib.auth.models import Permission
from django.utils.translation import ugettext_lazy as _


def parse_permission_tree():
    permission_tree = {}
    permission_tree_list = []
    queryset = Permission.objects.filter(content_type__app_label__in=[
        'common', 'permission'], codename__contains='can_')
    for i in ['common', 'permission']:
        for p in queryset.filter(content_type__app_label=i):
            if 'text' in permission_tree.keys():
                if p.content_type.model not in [i['model'] for i in permission_tree['children']]:
                    permission_tree['children'].append({
                        "text": _(p.content_type.model),
                        "icon": "fa fa-folder",
                        "state": {"selected": "!0"},
                        "app_label": p.content_type.app_label,
                        "model": p.content_type.model,
                        'children': [{
                            "text": _(p.name),
                            "icon": "fa fa-folder",
                            "state": {"selected": "!0"},
                            "id": p.id,
                            "app_label": p.content_type.app_label,
                            "model": p.content_type.model,
                        }]
                    })
                else:
                    for i in permission_tree['children']:
                        if i['model'] == p.content_type.model:
                            permission_tree['children'][permission_tree['children'].index(i)]['children'].append({
                                "text": _(p.name),
                                "icon": "fa fa-folder",
                                "state": {"selected": "!0"},
                                "id": p.id,
                                "app_label": p.content_type.app_label,
                                "model": p.content_type.model,
                            })
            else:
                permission_tree['text'] = i
                permission_tree['children'] = []
                permission_tree['children'].append({
                    "text": _(p.content_type.model),
                    "icon": "fa fa-folder",
                    "app_label": p.content_type.app_label,
                    "model": p.content_type.model,
                    "state": {"selected": "!0"},
                    'children': [{
                        "text": _(p.name),
                        "icon": "fa fa-folder",
                        "state": {"selected": "!0"},
                        "id": p.id,
                        "app_label": p.content_type.app_label,
                        "model": p.content_type.model,
                    }]
                })
        permission_tree_list.append(permission_tree)
        permission_tree = {}
    return permission_tree_list
