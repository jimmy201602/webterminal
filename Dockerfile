#Webterminal dockfile
FROM python:3.9.2-buster
LABEL maintainer zhengge2012@gmail.com
WORKDIR /opt
ADD . /opt/webterminal
WORKDIR /opt/webterminal
RUN apt-get update && apt-get install nginx -y
RUN mkdir -p /opt/webterminal/media/admin/Download
RUN mkdir -p /opt/webterminal/db
RUN mkdir -p /var/log/web
RUN mkdir -p /run/daphne
RUN pip3 install --no-cache-dir -r requirements.txt
RUN cp extra_settings.py.example extra_settings.py
RUN python3 manage.py makemigrations
RUN python3 manage.py migrate
RUN python3 createsuperuser.py
ADD nginx.conf /etc/nginx/nginx.conf
ADD supervisord.conf /etc/supervisor/supervisord.conf
ADD docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80 2100
CMD ["/docker-entrypoint.sh", "start"]
