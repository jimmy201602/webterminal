# webterminal plugin to manage docker
```sh
docker pull webterminal/webterminal:dockerplugin
docker run -it -v /var/run/docker.sock:/var/run/docker.sock -e webterminalserver=127.0.0.1 webterminal/webterminal:dockerplugin
```