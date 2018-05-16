# Centos7 Docker 部署 webterminal

## 一、Docker 环境安装

```
1.卸载旧版本
yum remove docker-latest-logrotate  docker-logrotate  docker-selinux dockdocker-engine
2.安装依赖
yum install -y yum-utils   device-mapper-persistent-data   lvm2
3.设置yum源
yum-config-manager     --add-repo     https://download.docker.com/linux/centos/docker-ce.repo
4.建立缓存
yum makecache fast
5.yum安装
yum install docker-ce

6.启动docker
systemctl start docker
7.查看docker运行状态
systemctl status docker
8.设置docker开机启动
systemctl enable docker
```

## 二、拉取项目运行

```
1.拉取项目，阿里云镜像时间取决于网络环境请耐心等待
docker pull registry.cn-hangzhou.aliyuncs.com/webterminal/webterminal
2.运行项目
docker run -itd -p 80:80 webterminal/webterminal
```

## 三、访问项目

```
项目默认账号
username: admin
项目默认密码
password: password!23456
```

[http://webterminal_server_ip](http://webterminal_server_ip)
