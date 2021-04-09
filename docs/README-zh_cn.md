本项目为django框架下实现！为实现自动运维化持续集成及集中化管理IT设备而创建。

现支持绝大多数网络远程管理协议(linux 下ssh、sftp协议、Windows rdp远程管理协议、Telnet远程管理协议及vnc远控协议)。

用户使用此项目时全部操作将会被录像，在必要时可进行回放审计。另可实时监控用户操作，在必要时可强制将用户踢下线！

更多功能请自行发掘......

## Features

- RDP 远程协议支持
- VNC 远程协议支持
- SSH SFTP 协议支持
- Telnet 协议支持
- VNC, RDP, SFTP 远程文件管理 (下载、删除、更新和上传文件)
- 远程命令控制和脚本执行 (shell)
- 实时用户行为审计
- 用户会话审计
- 在线用户强制下线
- SSH命令审计
- 权限控制
- Webterminal助手支持 (使用熟悉的工具去连接和管理服务器)

# 使用文档

[中文使用文档](./manual_zh.md)

# 安装文档

[中文安装文档](./install_zh_cn.md)

# 以docker compose方式运行本项目

```sh
sudo docker-compose up -d

登录账户与密码

账户名: admin

密码: password!23456
```

# demo/试用 

[试用服务器](http://193.112.194.114:8000/)

账户/密码: demo/demo12345678

# 预览
![screenshots](../screenshots/screenshots1.png  "screenshots")
![screenshots](../screenshots/screenshots2.gif  "screenshots")

# 开源版本提供ssh调用putty、xshell、securecrt、sftp功能(rdp调用后端不开源)
![screenshots](../screenshots/screenshots9.gif  "screenshots")
# Ubuntu 系统webterminal helper 支持
![screenshots](../screenshots/screenshotslinux1.gif  "screenshots")
![screenshots](../screenshots/screenshotslinux2.gif  "screenshots")
# 苹果系统 webterminal helper 支持
![screenshots](../screenshots/screenshotsmac.gif  "screenshots")
# 商业版本提供rdp本地调用mstsc及vnc功能(支持文本及文件复制粘贴及nla安全认证)
![screenshots](../screenshots/screenshotmstsc.gif  "screenshots")
![screenshots](../screenshots/screenshotvnc.gif  "screenshots")

![screenshots](../screenshots/screenshots3.gif  "screenshots")
![screenshots](../screenshots/screenshots4.gif  "screenshots")
![screenshots](../screenshots/screenshots2.png  "screenshots")
![screenshots](../screenshots/screenshots5.gif  "screenshots")
![screenshots](../screenshots/screenshots3.png  "screenshots")
![screenshots](../screenshots/screenshots4.png  "screenshots")
![screenshots](../screenshots/screenshots5.png  "screenshots")
![screenshots](../screenshots/screenshots6.png  "screenshots")
![screenshots](../screenshots/screenshots7.png  "screenshots")
![screenshots](../screenshots/screenshots8.png  "screenshots")
![screenshots](../screenshots/screenshots6.gif  "screenshots")
![screenshots](../screenshots/screenshots7.gif  "screenshots")
![screenshots](../screenshots/screenshots8.gif  "screenshots")

# 开源协议
开源不易，请尊重作者的付出，感谢。

在此处声明，本系统持续更新了四年才实现目前项目功能，目前除了ocr功能暂未实现，其他功能已与商业堡垒机媲美！目前此项目未产生任何盈利，基于作者的一片热心用爱发电，已发现有人更改本项目去进行商业化使用。在此严正声明，基于本项目进行商业化的行为所产生的一切后果请自行承担。

因此避免纠纷，不建议商业产品使用，若执意使用，请联系原作者获得授权。

再次声明，若是未联系作者直接将本系统使用于商业产品，出现的商业纠纷，本系统概不承担，感谢。

[开源协议(LGPL-3.0 License)](../LICENSE)


# 欢迎提交bug
欢迎提交并反馈[bug](https://github.com/jimmy201602/webterminal/issues/new)
