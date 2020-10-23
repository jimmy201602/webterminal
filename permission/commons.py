from django.contrib.auth.models import Permission
from django.utils.translation import ugettext_lazy as _


def parse_permission_tree():
    permission_tree = {}
    permission_code_map = {}
    permission_tree_list = []
    queryset = Permission.objects.filter(content_type__app_label__in=[
        'common', 'permission'], codename__contains='can_').exclude(content_type__model='role')
    for i in ['common', 'permission']:
        for p in queryset.filter(content_type__app_label=i):
            if 'text' in permission_tree.keys():
                if p.content_type.model not in [i['model'] for i in permission_tree['children']]:
                    permission_tree['children'].append({
                        "text": _(p.content_type.model),
                        "label": _(p.content_type.model),
                        "icon": "fa fa-folder",
                        "state": {"selected": "!0"},
                        "app_label": p.content_type.app_label,
                        "model": p.content_type.model,
                        'level': 'two',
                        'children': [{
                            "text": _(p.name),
                            "label": _(p.name),
                            "icon": "fa fa-folder",
                            "state": {"selected": "!0"},
                            "id": p.id,
                            "app_label": p.content_type.app_label,
                            "model": p.content_type.model,
                            'level': 'three'
                        }]
                    })
                else:
                    for i in permission_tree['children']:
                        if i['model'] == p.content_type.model:
                            permission_tree['children'][permission_tree['children'].index(i)]['children'].append({
                                "text": _(p.name),
                                "label": _(p.name),
                                "icon": "fa fa-folder",
                                "state": {"selected": "!0"},
                                "id": p.id,
                                "app_label": p.content_type.app_label,
                                "model": p.content_type.model,
                                'level': 'three'
                            })
            else:
                permission_tree['text'] = i
                permission_tree['level'] = 'one'
                permission_tree['label'] = i
                permission_tree['children'] = []
                permission_tree['children'].append({
                    "text": _(p.content_type.model),
                    "label": _(p.content_type.model),
                    "icon": "fa fa-folder",
                    "app_label": p.content_type.app_label,
                    "model": p.content_type.model,
                    "state": {"selected": "!0"},
                    'level': 'two',
                    'children': [{
                        "text": _(p.name),
                        "label": _(p.name),
                        "icon": "fa fa-folder",
                        "state": {"selected": "!0"},
                        "id": p.id,
                        "app_label": p.content_type.app_label,
                        "model": p.content_type.model,
                        'level': 'three'
                    }]
                })
        permission_tree_list.append(permission_tree)
        permission_tree = {}
    for p in queryset:
        permission_code_map[p.name] = p.id
    return permission_tree_list, permission_code_map
