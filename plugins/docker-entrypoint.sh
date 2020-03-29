#!/bin/bash
set -e

trap "kill -15 -1 && echo all proc killed" TERM KILL INT

if [ "$1" = "start" ]; then
    service supervisor start 
    sleep inf & wait
else
    exec "$@"
fi