本项目为django框架下实现！为实现自动运维化持续集成及集中化管理IT设备而创建。

现支持绝大多数网络远程管理协议(linux 下ssh、sftp协议、Windows rdp远程管理协议、Telnet远程管理协议及vnc远控协议)。

用户使用此项目时全部操作将会被录像，在必要时可进行回放审计。另可实时监控用户操作，在必要时可强制将用户踢下线！

更多功能请自行发掘......

# 使用文档

[中文使用文档](./manual_zh.md)

# 安装文档

[中文安装部署文档](./Centos7_install_zh.md)

# 以docker方式运行本项目

[Centos7 Docker安装部署 webterminal](./Centos7_docker_deploy_zh.md)

```sh
docker pull webterminal/webterminal(国内请使用阿里云镜像 docker pull registry.cn-hangzhou.aliyuncs.com/webterminal/webterminal)

docker run -itd -p 80:80 webterminal/webterminal

登录账户与密码

账户名: admin

密码: password!23456
 ```

# demo/试用 

[试用服务器](http://ssh.yygzs.cn/)

账户/密码: demo/demo12345678

# QQ讨论群
QQ群号 531612760

![screenshots](../screenshots/qqgroupqr.png  "screenshots")
# 开源协议

[开源协议(GPL v3)](../LICENSE) 


# 欢迎提交bug
欢迎提交并反馈[bug](https://github.com/jimmy201602/webterminal/issues/new)


# 欢迎打赏

## 微信
![screenshots](../screenshots/wechatpay.png  "wechat")

## 支付宝
![screenshots](../screenshots/alipay.png  "alipay")
