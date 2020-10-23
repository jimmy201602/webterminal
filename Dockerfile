#Webterminal dockfile
FROM ubuntu:latest
LABEL maintainer zhengge2012@gmail.com
ENV DEBIAN_FRONTEND noninteractive
# Version number of Guacamole to install
ENV GUACVERSION="1.2.0"
WORKDIR /opt
RUN apt-get update -y
RUN apt-get install -y python3 python3-pip python3-dev redis-server nginx tzdata
RUN sed -i 's/bind 127.0.0.1 ::1/bind 127.0.0.1/g' /etc/redis/redis.conf
RUN apt-get install build-essential libpulse-dev libssh-dev libwebp-dev software-properties-common curl gcc g++ libavcodec-dev libavutil-dev libcairo2-dev libswscale-dev libpango1.0-dev libvncserver-dev libssh2-1-dev libossp-uuid-dev jq wget libpng-dev libvorbis-dev libtelnet-dev libssl-dev libjpeg-dev libjpeg-turbo8-dev libkrb5-dev libtool-bin freerdp2-dev -y
WORKDIR /tmp
RUN wget https://downloads.apache.org/guacamole/${GUACVERSION}/source/guacamole-server-${GUACVERSION}.tar.gz
RUN tar -xvpf guacamole-server-${GUACVERSION}.tar.gz
WORKDIR /tmp/guacamole-server-${GUACVERSION}
RUN ./configure --with-init-dir=/etc/init.d
RUN make && make install
RUN rm -rf /tmp/guacamole-server*
RUN cp -rfv /usr/local/lib/libguac* /usr/lib/
RUN mkdir -p /usr/lib/x86_64-linux-gnu/freerdp/
RUN ln -s /usr/local/lib/freerdp/guacdr-client.so /usr/lib/x86_64-linux-gnu/freerdp/guacdr-client.so
RUN ln -s /usr/local/lib/freerdp/guacsnd-client.so /usr/lib/x86_64-linux-gnu/freerdp/guacsnd-client.so 
RUN mkdir -p /var/log/web
WORKDIR /opt
ADD . /opt/webterminal
#RUN git clone https://github.com/jimmy201602/webterminal.git
WORKDIR /opt/webterminal
RUN mkdir -p /opt/webterminal/media/admin/Download
RUN pip3 install -r requirements.txt
RUN python3 manage.py makemigrations
RUN python3 manage.py migrate
RUN python3 createsuperuser.py
ADD nginx.conf /etc/nginx/nginx.conf
ADD supervisord.conf /etc/supervisor/supervisord.conf
ADD docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80 2100
CMD ["/docker-entrypoint.sh", "start"]