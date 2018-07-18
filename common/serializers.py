from builtins import object
from rest_framework import serializers
from common.models import ServerInfor,ServerGroup,Credential,CommandsSequence

class ServerInforSerializer(serializers.HyperlinkedModelSerializer):
    class Meta(object):
        model = ServerInfor
        fields = '__all__'

class ServerGroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta(object):
        model = ServerGroup
        fields = '__all__'
            
class CredentialSerializer(serializers.HyperlinkedModelSerializer):
    class Meta(object):
        model = Credential
        fields = '__all__'            
        
class CommandsSequenceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta(object):
        model = CommandsSequence
        fields = '__all__'                    