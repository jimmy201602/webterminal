from django.conf.urls import url

from permission.views import UserRegister,UserUpdate,UserList,UserDelete,PermissionCreate,PermissionList,PermissionUpdate,PermissionDelete

urlpatterns = [
    url(r'^user/add/$', UserRegister.as_view(), name='usercreate'),
    url(r'^user/(?P<pk>[0-9]+)/update/$',UserUpdate.as_view(),name='userupdate'),
    url(r'^user/(?P<pk>[0-9]+)/delete/$',UserDelete.as_view(),name='userdelete'),
    url(r'^user/$',UserList.as_view(),name='userlist'),
    url(r'^permission/$',PermissionList.as_view(),name='permissionlist'),
    url(r'^permission/add/$', PermissionCreate.as_view(), name='permissioncreate'),
    url(r'^permission/(?P<pk>[0-9]+)/update/$',PermissionUpdate.as_view(),name='permissionupdate'),
    url(r'^permission/(?P<pk>[0-9]+)/delete/$',PermissionDelete.as_view(),name='permissiondelete'),    
]