from rest_framework import viewsets
from webterminal.serializers import ServerGroupSerializer,ServerInforSerializer,CommandsSequenceSerializer,CredentialSerializer
from webterminal.models import ServerGroup,ServerInfor,CommandsSequence,Credential

class ServerGroupViewSet(viewsets.ModelViewSet):
    queryset = ServerGroup.objects.all()
    serializer_class = ServerGroupSerializer
    
class ServerInforViewSet(viewsets.ModelViewSet):
    queryset = ServerInfor.objects.all()
    serializer_class = ServerInforSerializer

class CredentialViewSet(viewsets.ModelViewSet):
    queryset = Credential.objects.all()
    serializer_class = CredentialSerializer
    

class CommandsSequenceViewSet(viewsets.ModelViewSet):
    queryset = CommandsSequence.objects.all()
    serializer_class = CommandsSequenceSerializer