from django.conf.urls import url

from permission.views import UserRegister,UserUpdate,UserList,UserDelete

urlpatterns = [
    url(r'^user/add/$', UserRegister.as_view(), name='usercreate'),
    #url(r'^user/(?P<pk>[0-9]+)/update/$',UserUpdate.as_view(),name='userupdate'),
    url(r'^user/(?P<pk>[0-9]+)/delete/$',UserDelete.as_view(),name='userdelete'),
    url(r'^user/$',UserList.as_view(),name='userlist'),
]