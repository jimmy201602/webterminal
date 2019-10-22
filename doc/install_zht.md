# centos7開發安裝文檔
一、yum install epel-release

二、yum install -y python python-dev redis-server python-pip supervisor nginx git gcc python-devel

三、cd /opt

四、git clone https://github.com/jimmy201602/webterminal.git

五、cd webterminal

六、pip install -r requirements.txt

七、python manage.py makemigrations

八、python manage.py migrate

九、開啟redis服務 service redis start

十、編譯安裝Guacamole guacd服務端
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

十一、運行guacd service start guacd

十二、創建管理員賬戶python manage.py createsuperuser

十三、python manage.py runserver 0.0.0.0:8000

# 註意事項
若twisted安裝失敗，有可能pip安裝低版本導致　可以按照以下方式安裝版本即可
```sh
pip install Twisted==17.5.0
```
若出現以下異常，通常為安裝了相衝突的組件，按照以下解決方法解決即可
AttributeError: 'module' object has no attribute 'GSSException'

組件衝突：
```sh
pip uninstall python-gssapi
```

# RDP無法查看到文件共享上傳目錄G盤

文件上傳無G盤，日誌出現：
guacd[13088]: Failed to load guacdr plugin. Drive redirection and printing will not work. Sound MAY not work.
guacd[13088]: Failed to load guacsnd alongside guacdr plugin. Sound will not work. Drive redirection and printing MAY not work.

這個問題是freerdp的庫默認安裝在/usr/local/lib/freerdp下了，copy到centos默認的路徑就行。
```sh
cp /usr/local/lib/freerdp/* /usr/lib64/freerdp/
```