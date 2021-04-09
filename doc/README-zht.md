本項目為django框架下實現！為實現自動運維化持續集成及集中化管理IT設備而創建。

現支持絕大多數網絡遠程管理協議(linux 下ssh、sftp協議、Windows rdp遠程管理協議、Telnet遠程管理協議及vnc遠控協議)。

用戶使用此項目時全部操作將會被錄像，在必要時可進行回放審計。另可實時監控用戶操作，在必要時可強制將用戶踢下線！

更多功能請自行發掘......

## Features

- RDP 遠程協議支持
- VNC 遠程協議支持
- SSH SFTP 協議支持
- Telnet 協議支持
- VNC, RDP, SFTP 遠程文件管理 (下載、刪除、更新和上傳文件)
- 遠程命令控制和腳本執行 (shell)
- 實時用戶行為審計
- 用戶會話審計
- 在線用戶強制下線
- SSH命令審計
- 權限控制
- Webterminal助手支持 (使用熟悉的工具去連接和管理服務器)

# 使用文檔

[中文使用文檔](./manual_zh.md)

# 以docker compose方式運行本項目

```sh
sudo docker-compose up -d

登錄賬戶與密碼

賬戶名: admin

密碼: password!23456
```

# demo/試用 

[試用服務器](http://193.112.194.114:8000/)

賬戶/密碼: demo/demo12345678

# 預覽
![screenshots](../screenshots/screenshots1.png  "screenshots")
![screenshots](../screenshots/screenshots2.gif  "screenshots")

# 開源版本提供ssh調用putty、xshell、securecrt、sftp功能(rdp調用後端不開源)
![screenshots](../screenshots/screenshots9.gif  "screenshots")
# Ubuntu 系統webterminal helper 支持
![screenshots](../screenshots/screenshotslinux1.gif  "screenshots")
![screenshots](../screenshots/screenshotslinux2.gif  "screenshots")
# 蘋果系統 webterminal helper 支持
![screenshots](../screenshots/screenshotsmac.gif  "screenshots")
# 商業版本提供rdp本地調用mstsc及vnc功能(支持文本及文件複製粘貼及nla安全認證)
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

# 開源協議

[開源協議(GPL v3)](../LICENSE) 


# 歡迎提交bug
歡迎提交並反饋[bug](https://github.com/jimmy201602/webterminal/issues/new)
