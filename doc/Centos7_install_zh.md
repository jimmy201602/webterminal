# Centos7 生产中部署webterminal操作手册

## 系统准备

#部署环境 Centos7 Python3.6
```
1.全新最小化Centos7系统 
2.项目部署目录 /opt
3.关闭Selinux
setenforce 0
sed -i "s/SELINUX=enforcing/SELINUX=disabled/g" /etc/selinux/config
4.开放防火墙
firewall-cmd --zone=public --add-port=80/tcp --permanent
```

## 准备环境

#### 1.安装系统依赖

```
yum install -y epel-release
yum clean all
yum install -y gcc gcc-c++ libffi-devel MySQL-python36 python36 python36-dev python36-pip supervisor git bzip2 wget
```
#####1.1设置系统默认python版本为python3.6

```
rm -rf /bin/python
ln -s /bin/python3 /bin/python
ln -s /bin/pip /bin/pip3

因为firewalld和yum需要python2所以设置后需要修改相关文件
影响以下文件 需要修改第一行 #!/usr/bin/python 为 #!/usr/bin/python2
/bin/firewall-cmd
/usr/sbin/firewalld
/bin/yum
/usr/libexec/urlgrabber-ext-down
```

#### 2.安装并配置mariadb
```
yum install mariadb mariadb-server
systemctl enable mariadb
systemctl start mariadb
#此时数据库密码为空 可执行 mysql_secure_installation 初始化数据库
mysql -uroot 
CREATE DATABASE `webterminal` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
grant all on webterminal.* to 'webterminal'@'127.0.0.1' identified by 'password'; 
flush privileges;
```

#### 3.安装redis并设置开机启动
```
yum install -y redis
systemctl start redis
systemctl enable redis
```

#### 4.安装guacamole-server
```
yum install -y freerdp-plugins gcc gnu-free-mono-fonts pv libjpeg-devel freerdp-devel libssh2-devel libvorbis-devel libwebp-devel pulseaudio-libs-devel libvncserver-devel libssh-devel pango-devel ffmpeg ffmpeg-devel openssl-devel dialog libtelnet-devel cairo-devel libpng-devel uuid-devel
yum localinstall http://sourceforge.net/projects/libjpeg-turbo/files/libjpeg-turbo-official-1.5.2.x86_64.rpm -y
ln -vfs /opt/libjpeg-turbo/include/* /usr/include/
ln -vfs /opt/libjpeg-turbo/lib??/* /usr/lib64/
cd /tmp
wget http://sourceforge.net/projects/guacamole/files/current/source/guacamole-server-0.9.14.tar.gz
tar -xvpf guacamole-server-0.9.14.tar.gz
cd guacamole-server-0.9.14
./configure --with-init-dir=/etc/init.d
make && make install
#设置开机启动
/sbin/chkconfig guacd on
```

#### 5.安装webterminal
```
#拉取项目代码

git clone https://github.com/jimmy201602/webterminal.git
cd /opt/webterminal
#安装项目依赖
pip install -r requirements.txt
#如果使用mariadb数据库  修改以下2个配置文件
vim webterminal.conf 
[db]
engine = mysql
host = 127.0.0.1
port = 3306
user = webterminal
password = password
database = webterminal

vim webterminal/settings.py
#注释以下行
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
#添加以下行
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'webterminal',
        'USER': 'webterminal',
        'PASSWORD': 'password',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}

#检测项目程序数据表变动并创建数据库
python manage.py makemigrations
python manage.py migrate
#这一步如果有报错，请参考最下方手动安装twisted
#创建管理员账户
python manage.py createsuperuser
```

#### 6.安装并配置nginx
```
#安装nginx并设置开机启动
yum install -y nginx
systemctl start nginx
systemctl enable nginx
#设置nginx代理
rm -rf /etc/nginx/nginx.conf
cp /opt/webterminal/nginx.conf /etc/nginx/nginx.conf
systemctl restart nginx
```

#### 7.安装supervisor
```
mkdir /var/log/web/
cp /opt/webterminal/supervisord.conf /etc/supervisord.conf
systemctl restart guacd
systemctl restart nginx
#开启supervisor守护进程 (启动webterminal应用)
supervisord -c /etc/supervisord.conf
#设置开机启动
echo 'supervisord -c /etc/supervisord.conf' >> /etc/rc.local
```

## 访问webterminal

[http://webterminal_server_ip](http://webterminal_server_ip)

## 注意事项

#### 1.twisted 安装失败时 手动安装

```
wget https://twistedmatrix.com/Releases/Twisted/17.5/Twisted-17.5.0.tar.bz2
tar -jxvf Twisted-17.5.0.tar.bz2
cd Twisted-17.5.0/
python setup.py install
```
