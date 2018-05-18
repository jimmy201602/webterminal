# Centos7 生产中部署webterminal操作手册

## 系统准备

```
1.全新Centos7系统
2.项目部署目录 /opt
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

#### 2.编译安装guacamole server

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
```

#### ３.拉取项目代码（时间取决于网络环境）

```
cd /opt
git clone https://github.com/jimmy201602/webterminal.git
```

## 安装webterminal 

```
1.进入项目目录
cd /opt/webterminal
2.安装程序依赖包
pip install -r requirements.txt
3.检测项目程序数据表变动
python manage.py makemigrations
4.创建数据表
python manage.py migrate
5.启动redis
systemctl start redis
6.创建管理员账户
python manage.py createsuperuser
```

## nginx代理配置
```sh
1 删除原有的nginx配置文件
rm -rf /etc/nginx/nginx.conf
2 设置新的nginx配置文件
cp /opt/webterminal/nginx.conf /etc/nginx/nginx.conf
3 重启nginx以使配置文件生效
systemctl restart nginx
```

## 开机自启动服务配置

1. 关闭防火墙！ 确认你是否已执行安装教程以上的guacd、redis 等服务加入开机启动项。如果没有请执行以下命令，已执行的请忽略。

```
1.将guacd 加入开机启动项
/sbin/chkconfig guacd on
2.将redis 加入开机启动项
systemctl enable redis
3 将nginx加入开机启动项
systemctl enable nginx
```

2. 安装supervisor(进程守护程序)

```
yum install supervisor
```

3. supervisor配置文件
将项目根目录下的的supervisord.conf 拷贝至/etc/supervisord.conf
```
cp /opt/webterminal/supervisord.conf /etc/supervisord.conf
```
## 启动webterminal
```sh
1 开启redis 服务
systemctl start redis
2 开启guacamole server服务
systemctl start guacd
3 开启supervisor守护进程 (启动webterminal应用)
supervisord -c /etc/supervisord.conf
4 开启nginx代理
systemctl start nginx
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
