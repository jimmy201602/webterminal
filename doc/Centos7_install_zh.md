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
加入开机启动项
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
5.1 将redis加入开机启动项
systemctl enable redis
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

## 开机自启动项目配置

1. 关闭防火墙启动！ 确认你是否已执行安装教程以上的guacd、redis 等服务加入开机启动项。如果没有请执行以下命令，已执行的请忽略。

```
1.将guacd 加入开机启动项
/sbin/chkconfig guacd on
2.将redis 加入开机启动项
systemctl enable redis
```

2. 配置开机守护进程

```
yum install supervisor
```

3. 配置启动文件

```
vi /etc/supervisord.d/webterminal.ini

###########文件内容##########
# 被守护项目名称
[program:webterminal]
# 启动命令  前边是你python 虚拟环境执行文件  后边是项目启动文件
command = /opt/py2/bin/python /opt/webterminal/manage.py runserver 0.0.0.0:8000
# 是否跟随supervisord启动自启
autostart = true
# 启动5秒无异常为正常启动
startsecs = 5
# 程序异常退出自动启动
autorestart = true 
# 启动失败自动重试次数
startretries = 3
# 启动用户
user = root
# 日志重定向
redirect_stderr = true
# 日志文件大小
stdout_logfile_maxbytes = 20MB
# 日志备份数
stdout_logfile_backups = 20
# 日志目录
stdout_logfile = /var/log/webterminal_stdout.log
# 进程被杀死时，是否向进程组发送stop信号。
stopasgroup=false
# 向进程组发送kill信号
killasgroup=false
###########文件内容##########
```

4. 启动服务

```
1. 启动服务
systemctl start supervisord
2. 加入开机启动项
systemctl enable supervisord
```

5. supervisord 管理命令

```
supervisorctl status                    #查看项目状态
supervisorctl stop webterminal          #关闭 webterminal
supervisorctl start webterminal         #启动 webterminal
supervisorctl restart webterminal       #重启 webterminal
supervisorctl reread
supervisorctl update                    #更新新的配置
```