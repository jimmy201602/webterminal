#How to install in ubutu
For ubuntu, you can follow these steps
``` sh
apt-get update
apt-get install -y python python-dev redis-server python-pip supervisor nginx git
cd /opt
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
#Use docker
* build docker
```sh
docker build --no-cache -t webterminal:latest .
```
* run docker
```sh
docker run -d -p 80:80 --name webterminal webterminal
```