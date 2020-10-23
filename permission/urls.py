from django.conf.urls import url, include

# from permission.views import UserRegister, UserUpdate, UserList, UserDelete, PermissionCreate, PermissionList, PermissionUpdate, PermissionDelete
from permission.api import PermissionViewSet, PermissionWithGroupInfoViewSet, PermissionTreeView, GetServerListTreeApi, GetCommandListTreeApi,GetLinuxServerListTreeApi,GetMenuListApi
from rest_framework import routers

# Register webterminal api
router = routers.DefaultRouter()
router.register('permission', PermissionViewSet)
router.register('permissionwithinfo', PermissionWithGroupInfoViewSet)


urlpatterns = [
    url(r'^api/permissiontree/$',
        PermissionTreeView.as_view(), name='permissiontree'),
    url(r'^api/getmenulist/$',
        GetMenuListApi.as_view(), name='getmenulist'),    
    url(r'^api/getserverlisttree/$',
        GetServerListTreeApi.as_view(), name='getserverlisttree'),
    url(r'^api/getcommandlisttree/$',
        GetCommandListTreeApi.as_view(), name='getcommandlisttree'),
    url(r'^api/getlinuxserverlisttree/$',
        GetLinuxServerListTreeApi.as_view(), name='getlinuxserverlisttree'),
    url(r'^api/', include(router.urls)),
    # url(r'^user/add/$', UserRegister.as_view(), name='usercreate'),
    # url(r'^user/(?P<pk>[0-9]+)/update/$',
    # UserUpdate.as_view(), name='userupdate'),
    # url(r'^user/(?P<pk>[0-9]+)/delete/$',
    # UserDelete.as_view(), name='userdelete'),
    # url(r'^user/$', UserList.as_view(), name='userlist'),
    # url(r'^permission/$', PermissionList.as_view(), name='permissionlist'),
    # url(r'^permission/add/$', PermissionCreate.as_view(), name='permissioncreate'),
    # url(r'^permission/(?P<pk>[0-9]+)/update/$',
    # PermissionUpdate.as_view(), name='permissionupdate'),
    # url(r'^permission/(?P<pk>[0-9]+)/delete/$',
    # PermissionDelete.as_view(), name='permissiondelete'),
]
