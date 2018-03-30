#Webterminal dockfile
FROM ubuntu:latest
LABEL maintainer zhengge2012@gmail.com
WORKDIR /opt
RUN apt-get update -y
RUN apt-get install -y python python-dev redis-server python-pip supervisor nginx git
RUN apt-get install python-software-properties build-essential libpulse-dev libssh-dev libwebp-dev libvncserver-dev software-properties-common curl gcc libavcodec-dev libavutil-dev libcairo2-dev libswscale-dev libpango1.0-dev libfreerdp-dev libssh2-1-dev libossp-uuid-dev jq wget libpng12-dev libvorbis-dev libtelnet-dev libssl-dev libjpeg-dev libjpeg-turbo8-dev -y
RUN add-apt-repository ppa:jonathonf/ffmpeg-3 -y
RUN apt-get update -y
RUN apt-get install ffmpeg libffmpegthumbnailer-dev -y
RUN cd /tmp
RUN wget http://sourceforge.net/projects/guacamole/files/current/source/guacamole-server-0.9.14.tar.gz
RUN tar -xvpf guacamole-server-0.9.14.tar.gz
RUN cd guacamole-server-0.9.14 && ./configure --with-init-dir=/etc/init.d
RUN cd guacamole-server-0.9.14 && make && make install
RUN mkdir -p /var/log/web
WORKDIR /opt
RUN git clone https://github.com/jimmy201602/webterminal.git
WORKDIR /opt/webterminal
RUN pip install -r requirements.txt
RUN python manage.py makemigrations
RUN python manage.py migrate
RUN python createsuperuser.py
ADD nginx.conf /etc/nginx/nginx.conf
ADD supervisord.conf /etc/supervisor/supervisord.conf
ADD docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
EXPOSE 80
CMD ["/docker-entrypoint.sh", "start"]
