# centos7安装文档
一、yum install epel-release  
二、yum install -y python python-dev redis-server python-pip supervisor nginx git gcc python-devel docker
三、cd /opt  
四、git clone https://github.com/jimmy201602/webterminal.git  
五、cd webterminal  
六、pip install -r requirements.txt  
七、python manage.py makemigrations webterminal  
八、python manage.py migrate  
九、开启redis服务 service redis start
十、用docker装Guacamole服务端
docker pull guacamole/guacd
十一、运行guacd镜像 docker run --name guacd -p 4822:4822 -d guacamole/guacd
十二、创建管理员账户python manage.py createsuperuser  
十三、vim webterminal/settings.py  
ALLOWED_HOSTS = []   #这句改为  ALLOWED_HOSTS = ['*']
十四、python manage.py runserver 0.0.0.0:8000

