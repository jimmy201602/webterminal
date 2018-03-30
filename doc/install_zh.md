# centos7开发安装文档
一、yum install epel-release

二、yum install -y python python-dev redis-server python-pip supervisor nginx git gcc python-devel

三、cd /opt

四、git clone https://github.com/jimmy201602/webterminal.git

五、cd webterminal

六、pip install -r requirements.txt

七、python manage.py makemigrations

八、python manage.py migrate

九、开启redis服务 service redis start

十、编译安装Guacamole guacd服务端
```sh
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

十一、运行guacd service start guacd

十二、创建管理员账户python manage.py createsuperuser

十三、python manage.py runserver 0.0.0.0:8000
