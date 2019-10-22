# Centos7 Docker 部署 webterminal

## 一、Docker 環境安裝

```
1.卸載舊版本
yum remove docker-latest-logrotate  docker-logrotate  docker-selinux dockdocker-engine
2.安裝依賴
yum install -y yum-utils   device-mapper-persistent-data   lvm2
3.設置yum源
yum-config-manager     --add-repo     https://download.docker.com/linux/centos/docker-ce.repo
4.建立緩存
yum makecache fast
5.yum安裝
yum install docker-ce

6.啟動docker
systemctl start docker
7.查看docker運行狀態
systemctl status docker
8.設置docker開機啟動
systemctl enable docker
```

## 二、拉取項目運行

```
1.拉取項目，阿裡雲鏡像時間取決於網絡環境請耐心等待
docker pull registry.cn-hangzhou.aliyuncs.com/webterminal/webterminal
2.運行項目
docker run -itd -p 80:80 -p 2100:2100 webterminal/webterminal
```

## 三、訪問項目

```
項目默認賬號
username: admin
項目默認密碼
password: password!23456
```

[http://webterminal_server_ip](http://webterminal_server_ip)
