# centos6安装文档
centos6下面安装步骤  (python版本是2.7  django版本是1.11.5)  
一、yum update  
二、yum install -y python python-dev redis-server python-pip supervisor nginx git gcc python-devel
三、cd /opt  
四、git clone https://github.com/jimmy201602/webterminal.git  
五、cd webterminal  
六、pip install -r requirements.txt  
七、python manage.py makemigrations webterminal  
八、python manage.py migrate  
九、安装redis  

linux下yum安装redis以及使用  
1、yum install redis      --查看是否有redis   yum 源  
2、yum install epel-release    --下载fedora的epel仓库  

3、 yum install redis    -- 安装redis数据库  

4、service redis start    --开启redis服务  

　　redis-server /etc/redis.conf   --开启方式二  

5、ps -ef | grep redis   -- 查看redis是否开启  

6、redis-cli       -- 进入redis服务  

7、redis-cli  shutdown      --关闭服务  

8、开放端口6379的防火墙  

/sbin/iptables -I INPUT -p tcp --dport 6379  -j ACCEPT   开启6379  

 /etc/rc.d/init.d/iptables save                           保存防火墙规则  

9、使用redis  desktop manager连接redis  

十、python manage.py createsuperuser  

十一、vim webterminal/settings.py  
ALLOWED_HOSTS = []   #这句改为  ALLOWED_HOSTS = ['*']  

十二、python manage.py runserver 0.0.0.0:8000  
如果出现报错(ImportError: cannot import name RemovedInDjango19Warning)执行以下命令   
sudo pip uninstall django           #先卸载掉之前的django版本  

sudo pip install django==1.11.5  

