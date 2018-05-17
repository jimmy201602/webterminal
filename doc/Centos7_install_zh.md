# Centos7 详细部署 webterminal

## 系统环境

```
1.全新Centos7系统
2.项目目录 /opt/
3.关闭防火墙
setenforce 0
systemctl stop iptables.service
systemctl stop firewalld.service
```

## 准备环境

#### 1.安装系统依赖

```
yum install -y epel-release
yum clean all
yum install -y python python-dev python-devel redis-server redis python-pip supervisor nginx git gcc 
```

#### 2.编译安装guacamole-server

```
rpm --import http://li.nux.ro/download/nux/RPM-GPG-KEY-nux.ro
rpm -Uvh http://li.nux.ro/download/nux/dextop/el7/x86_64/nux-dextop-release-0-5.el7.nux.noarch.rpm

yum clean all
yum install epel-release -y

yum install -y freerdp-plugins gcc gnu-free-mono-fonts pv libjpeg-devel freerdp-devel libssh2-devel libvorbis-devel libwebp-devel pulseaudio-libs-devel libvncserver-devel libssh-devel pango-devel ffmpeg ffmpeg-devel openssl-devel dialog libtelnet-devel wget cairo-devel libpng-devel uuid-devel

yum localinstall http://sourceforge.net/projects/libjpeg-turbo/files/libjpeg-turbo-official-1.5.2.x86_64.rpm -y
ln -vfs /opt/libjpeg-turbo/include/* /usr/include/
ln -vfs /opt/libjpeg-turbo/lib??/* /usr/lib64/

cd /tmp
wget http://sourceforge.net/projects/guacamole/files/current/source/guacamole-server-0.9.14.tar.gz
tar -xvpf guacamole-server-0.9.14.tar.gz
cd guacamole-server-0.9.14
./configure --with-init-dir=/etc/init.d
make && make install

/etc/init.d/guacd start
/sbin/chkconfig guacd on
```

#### 3.创建python2.7虚拟环境（避免与系统环境混乱）

```
cd /opt/
pip install virtualenv
virtualenv --python=/usr/bin/python2.7 py2
source /opt/py2/bin/activate
```

#### 4.拉取项目（时间取决于网络环境）

```
git clone https://github.com/jimmy201602/webterminal.git
```

## 安装webterminal 

```
1.进入项目目录
cd webterminal
2.安装依赖
pip install -r requirements.txt
3.检测变动
python manage.py makemigrations
4.建立
python manage.py migrate
5.启动redis
systemctl start redis
6.创建项目管理员账户
python manage.py createsuperuser
```

## 启动项目

```
python manage.py runserver 0.0.0.0:8000
```
[http://webterminal_server_ip:8000](http://webterminal_server_ip:8000)


## 注意事项

#### 1.twisted 安装失败时 手动安装

```
wget https://twistedmatrix.com/Releases/Twisted/17.5/Twisted-17.5.0.tar.bz2
tar -jxvf Twisted-17.5.0.tar.bz2
cd Twisted-17.5.0/
python setup.py install
```