# Centos7 生產中部署webterminal操作手冊

## 系統準備

```
1.全新Centos7系統
2.項目部署目錄 /opt
3.關閉防火牆
setenforce 0
systemctl stop iptables.service
systemctl stop firewalld.service
```

## 準備環境

#### 1.安裝系統依賴

```
yum install -y epel-release
yum clean all
yum install -y python python-dev python-devel redis-server redis python-pip supervisor nginx git gcc 
```

#### 2.編譯安裝guacamole server

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

#### ３.拉取項目代碼（時間取決於網絡環境）

```
cd /opt
git clone https://github.com/jimmy201602/webterminal.git
```

## 安裝webterminal 

```
1.進入項目目錄
cd /opt/webterminal
2.安裝程序依賴包
pip install -r requirements.txt
3.檢測項目程序數據表變動
python manage.py makemigrations
4.創建數據表
python manage.py migrate
5.啟動redis
systemctl start redis
6.創建管理員賬戶
python manage.py createsuperuser
```

## nginx代理配置
```sh
1 刪除原有的nginx配置文件
rm -rf /etc/nginx/nginx.conf
2 設置新的nginx配置文件
cp /opt/webterminal/nginx.conf /etc/nginx/nginx.conf
3 重啟nginx以使配置文件生效
systemctl restart nginx
```

## 開機自啟動服務配置

1. 關閉防火牆！ 確認你是否已執行安裝教程以上的guacd、redis 等服務加入開機啟動項。如果沒有請執行以下命令，已執行的請忽略。

```
1.將guacd 加入開機啟動項
/sbin/chkconfig guacd on
2.將redis 加入開機啟動項
systemctl enable redis
3 將nginx加入開機啟動項
systemctl enable nginx
```

2. 安裝supervisor(進程守護程序)

```
yum install supervisor
```

3. supervisor配置文件
將項目根目錄下的的supervisord.conf 拷貝至/etc/supervisord.conf
```
cp /opt/webterminal/supervisord.conf /etc/supervisord.conf
```
## 啟動webterminal
```sh
1 開啟redis 服務
systemctl start redis
2 開啟guacamole server服務
systemctl start guacd
3 開啟supervisor守護進程 (啟動webterminal應用)
supervisord -c /etc/supervisord.conf
4 開啟nginx代理
systemctl start nginx
```
## 訪問webterminal

[http://webterminal_server_ip](http://webterminal_server_ip)

## 註意事項

#### 1.twisted 安裝失敗時 手動安裝

```
wget https://twistedmatrix.com/Releases/Twisted/17.5/Twisted-17.5.0.tar.bz2
tar -jxvf Twisted-17.5.0.tar.bz2
cd Twisted-17.5.0/
python setup.py install
```
