#!/bin/bash
set -e

trap "kill -15 -1 && echo all proc killed" TERM KILL INT

if [ "$1" = "start" ]; then
	service redis-server start
	service nginx start
	service supervisor start 
	#service guacd start
	/usr/local/sbin/guacd -b 127.0.0.1 -f
	sleep inf & wait
else
	exec "$@"
fi