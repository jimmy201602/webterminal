#Webterminal dockfile
FROM ubuntu:latest
LABEL maintainer zhengge2012@gmail.com
WORKDIR /opt
RUN apt-get update -y
RUN apt-get install -y python python-dev redis-server python-pip supervisor nginx git
RUN sed -i 's/bind 127.0.0.1 ::1/bind 127.0.0.1/g' /etc/redis/redis.conf
RUN apt-get install build-essential libpulse-dev libssh-dev libwebp-dev libvncserver-dev software-properties-common curl gcc libavcodec-dev libavutil-dev libcairo2-dev libswscale-dev libpango1.0-dev libfreerdp-dev libssh2-1-dev libossp-uuid-dev jq wget libpng-dev libvorbis-dev libtelnet-dev libssl-dev libjpeg-dev libjpeg-turbo8-dev libkrb5-dev -y
#RUN add-apt-repository ppa:jonathonf/ffmpeg-3 -y
#RUN apt-get update -y
#RUN apt-get install ffmpeg libffmpegthumbnailer-dev -y
RUN apt-get remove gcc g++ -y
RUN add-apt-repository ppa:ubuntu-toolchain-r/test -y
RUN apt-get update
RUN apt-get install gcc-snapshot -y
RUN apt-get update
RUN apt-get install gcc-6 g++-6 -y
RUN update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-6 60 --slave /usr/bin/g++ g++ /usr/bin/g++-6
WORKDIR /tmp
#RUN wget https://bitbucket.org/pypy/pypy/downloads/pypy2-v6.0.0-linux64.tar.bz2
#RUN tar -xvpf pypy2-v6.0.0-linux64.tar.bz2
#RUN mv pypy2-v6.0.0-linux64 pypy
#RUN mv pypy /usr/local/
#RUN ln -s /usr/local/pypy/bin/pypy /usr/bin/pypy
#RUN wget https://bootstrap.pypa.io/get-pip.py
#RUN /usr/bin/pypy get-pip.py
RUN wget http://sourceforge.net/projects/guacamole/files/current/source/guacamole-server-0.9.14.tar.gz
RUN tar -xvpf guacamole-server-0.9.14.tar.gz
WORKDIR /tmp/guacamole-server-0.9.14
RUN ./configure --with-init-dir=/etc/init.d
RUN make && make install
RUN rm -rf /tmp/guacamole-server*
RUN cp -rfv /usr/local/lib/libguac* /usr/lib/
RUN mkdir -p /usr/lib/x86_64-linux-gnu/freerdp/
RUN ln -s /usr/local/lib/freerdp/guacdr-client.so /usr/lib/x86_64-linux-gnu/freerdp/guacdr-client.so
RUN ln -s /usr/local/lib/freerdp/guacsnd-client.so /usr/lib/x86_64-linux-gnu/freerdp/guacsnd-client.so 
RUN mkdir -p /var/log/web
WORKDIR /opt
RUN git clone https://github.com/jimmy201602/webterminal.git
WORKDIR /opt/webterminal
RUN mkdir -p /opt/webterminal/media/admin/Download
RUN pip install -r requirements.txt
#RUN /usr/local/pypy/bin/pip install -r requirements.txt
RUN python manage.py makemigrations
RUN python manage.py migrate
RUN python createsuperuser.py
ADD nginx.conf /etc/nginx/nginx.conf
ADD supervisord.conf /etc/supervisor/supervisord.conf
ADD docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
EXPOSE 80
CMD ["/docker-entrypoint.sh", "start"]
