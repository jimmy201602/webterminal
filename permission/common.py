from django.contrib.auth.models import Permission


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
                        "text": p.content_type.model,
                        "icon": "fa fa-linux",
                        "state": {"selected": "!0"},
                        "app_label": p.content_type.app_label,
                        "model": p.content_type.model,
                        'children': [{
                            "text": p.codename,
                            "icon": "fa fa-linux",
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
                                "text": p.codename,
                                "icon": "fa fa-linux",
                                "state": {"selected": "!0"},
                                "id": p.id,
                                "app_label": p.content_type.app_label,
                                "model": p.content_type.model,
                            })
            else:
                permission_tree['text'] = i
                permission_tree['children'] = []
                permission_tree['children'].append({
                    "text": p.content_type.model,
                    "icon": "fa fa-linux",
                    "app_label": p.content_type.app_label,
                    "model": p.content_type.model,
                    "state": {"selected": "!0"},
                    'children': [{
                        "text": p.codename,
                        "icon": "fa fa-linux",
                        "state": {"selected": "!0"},
                        "id": p.id,
                        "app_label": p.content_type.app_label,
                        "model": p.content_type.model,
                    }]
                })
        permission_tree_list.append(permission_tree)
        permission_tree = {}
    return permission_tree_list
