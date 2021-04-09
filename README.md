# Webterminal bastion server (挖到宝堡垒机)
[![EN doc](https://img.shields.io/badge/document-English-blue.svg)](README.md)
[![CN doc](https://img.shields.io/badge/文档-中文版-blue.svg)](./docs/README-zh_cn.md)
[![CNT doc](https://img.shields.io/badge/文檔-繁體版-blue.svg)](./docs/README-zht.md)


Webterminal implemented by django.
This project focus on DevOps and Continuous Delivery.
For now it support almost 90% remote management protocol such as vnc, ssh,rdp,telnet,sftp... It support a possiblity to monitor and recorded user action when user use this project to manage their server!You can also replay the user action such as like a video.
Hope you enjoy it.

## Features

- RDP remote desktop control
- VNC remote desktop control
- SSH SFTP protocol support
- Telnet protocol support
- VNC, RDP, SFTP Remote file browser (download, delete, update and upload files)
- Remote command and script execution (shell)
- Realtime user action audit
- User session audit
- Kick user off this project
- SSH command audit
- Permission control
- Webterminal helper support (use your favourite tools to manage and connect server)

## useage manual
[![Usage Video](https://i.ytimg.com/vi/-HwhB21v8L8/1.jpg?time=1527217648531)](https://www.youtube.com/watch?v=-HwhB21v8L8)

[How to use this project](./docs/manual_en.md)


## Installation guide
[installation guide](./docs/install_en.md)


## Run with docker compose

```sh
sudo docker-compose up -d
Login user & password
username: admin
password: password!23456
```
## Demo server 

[demo server](http://193.112.194.114:8000/)

user/password: demo/demo12345678


## Author Email
zhengge2012@gmail.com

## screenshots
![screenshots](./screenshots/screenshots1.png  "screenshots")
![screenshots](./screenshots/screenshots2.gif  "screenshots")
## Ubuntu webterminal helper support
![screenshots](./screenshots/screenshotslinux1.gif  "screenshots")
![screenshots](./screenshots/screenshotslinux2.gif  "screenshots")
## Mac webterminal helper support
![screenshots](./screenshots/screenshotsmac.gif  "screenshots")
## Windows webterminal helper support
![screenshots](./screenshots/screenshots9.gif  "screenshots")
## commercial version provide mstsc helper（rdp clipboard support vs file upload download and vnc protocol connection support）
![screenshots](./screenshots/screenshotmstsc.gif  "screenshots")
![screenshots](./screenshots/screenshotvnc.gif  "screenshots")

![screenshots](./screenshots/screenshots3.gif  "screenshots")
![screenshots](./screenshots/screenshots4.gif  "screenshots")
![screenshots](./screenshots/screenshots2.png  "screenshots")
![screenshots](./screenshots/screenshots5.gif  "screenshots")
![screenshots](./screenshots/screenshots3.png  "screenshots")
![screenshots](./screenshots/screenshots4.png  "screenshots")
![screenshots](./screenshots/screenshots5.png  "screenshots")
![screenshots](./screenshots/screenshots6.png  "screenshots")
![screenshots](./screenshots/screenshots7.png  "screenshots")
![screenshots](./screenshots/screenshots8.png  "screenshots")
![screenshots](./screenshots/screenshots6.gif  "screenshots")
![screenshots](./screenshots/screenshots7.gif  "screenshots")
![screenshots](./screenshots/screenshots8.gif  "screenshots")

## License

[GPL V3 License](LICENSE)

## Reporting Issues
If you're experiencing a problem, we encourage you to open [an issue](https://github.com/jimmy201602/webterminal/issues/new), and share your feedback.
