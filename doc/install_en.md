# How to install in ubutu
For ubuntu, you can follow these steps
``` sh
apt-get update -y
apt-get install -y python python-dev redis-server python-pip supervisor nginx git docker
apt-get install python-software-properties build-essential libpulse-dev libssh-dev libwebp-dev libvncserver-dev software-properties-common curl gcc libavcodec-dev libavutil-dev libcairo2-dev libswscale-dev libpango1.0-dev libfreerdp-dev libssh2-1-dev libossp-uuid-dev jq wget libpng12-dev libvorbis-dev libtelnet-dev libssl-dev libjpeg-dev libjpeg-turbo8-dev -y
add-apt-repository ppa:jonathonf/ffmpeg-3 -y
apt-get update -y
apt-get install ffmpeg libffmpegthumbnailer-dev -y
cd /tmp
wget http://sourceforge.net/projects/guacamole/files/current/source/guacamole-server-0.9.14.tar.gz
tar -xvpf guacamole-server-0.9.14.tar.gz
cd guacamole-server-0.9.14
./configure --with-init-dir=/etc/init.d
make && make install
ldconfig
service guacd start
cd /opt
git clone https://github.com/jimmy201602/webterminal.git
cd webterminal
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```
You can run server locally like this.
```sh
python manage.py runserver
```
# Use with docker
* build docker
```sh
docker build --no-cache -t webterminal:latest .
```
* run docker
```sh
docker run --link guacd:guacd -d -p 80:80 --name webterminal webterminal
```
* login user and password
```sh
login user: admin
login password: password!23456
```
