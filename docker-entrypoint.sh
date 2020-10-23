#!/bin/bash
set -e

trap "kill -15 -1 && echo all proc killed" TERM KILL INT

if [ "$1" = "start" ]; then
	service redis-server start
	service nginx start
	/usr/local/bin/supervisord -c /etc/supervisor/supervisord.conf
	service guacd start
	sleep inf & wait
else
	exec "$@"
fi