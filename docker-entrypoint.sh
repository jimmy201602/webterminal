#!/bin/bash
set -e

trap "kill -15 -1 && echo all proc killed" TERM KILL INT

if [ "$1" = "start" ]; then
	if [ ! -f /opt/webterminal/db/db.sqlite3 ]; then
		cd /opt/webterminal
		python3 manage.py makemigrations
		python3 manage.py migrate
		python3 createsuperuser.py
	fi
	service nginx start
	/usr/local/bin/supervisord -c /etc/supervisor/supervisord.conf
	sleep inf & wait
else
	exec "$@"
fi