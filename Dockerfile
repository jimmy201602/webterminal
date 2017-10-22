#Webterminal dockfile
FROM ubuntu:latest
LABEL maintainer zhengge2012@gmail.com
WORKDIR /opt
RUN apt-get update
RUN apt-get install -y python python-dev redis-server python-pip supervisor nginx git
RUN mkdir -p /var/log/web
WORKDIR /opt
RUN git clone https://github.com/jimmy201602/webterminal.git
WORKDIR /opt/webterminal
RUN pip install -r requirements.txt
RUN python manage.py makemigrations
RUN python manage.py migrate
RUN USER="admin"
RUN PASS="password!@#$"
RUN MAIL="admin@admin.com"
RUN script="
from django.contrib.auth.models import User;

username = '$USER';
password = '$PASS';
email = '$MAIL';

if User.objects.filter(username=username).count()==0:
    User.objects.create_superuser(username, email, password);
    print('Superuser created.');
else:
    print('Superuser creation skipped.');
"
RUN printf "$script" | python manage.py shell
ADD nginx.conf /etc/nginx/nginx.conf
ADD supervisord.conf /etc/supervisor/supervisord.conf
ADD docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
EXPOSE 80
CMD ["/docker-entrypoint.sh", "start"]
