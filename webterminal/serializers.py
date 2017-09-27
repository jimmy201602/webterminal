from rest_framework import serializers
from webterminal.models import ServerInfor,ServerGroup,Credential,CommandsSequence

class ServerInforSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ServerInfor
        fields = '__all__'

class ServerGroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ServerGroup
        fields = '__all__'
            
class CredentialSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Credential
        fields = '__all__'            
        
class CommandsSequenceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CommandsSequence
        fields = '__all__'                    