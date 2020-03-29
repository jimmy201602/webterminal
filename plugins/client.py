import docker

class DockerBridgeClient(object):
    def __init__(self):
        self.client = docker.APIClient()
    
    def get_all_running_cotainers(self):
        return self.client.containers()
    
    def get_all_images(self):
        return self.client.images()