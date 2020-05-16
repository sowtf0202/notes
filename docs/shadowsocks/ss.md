# 搬瓦工安装 shadowsocks
搬瓦工没有19.99$/年的 vps 了,心好痛,目前最便宜的是49.99$/年
<br/>

首先按照这个顺序进入控制面板 `services` -> `My Services` -> `KiViVM Control Panel`
<br/>

* 1. 进入控制面板,如果左侧 `KiViVM Extras` 中有 `Shadowsocks Server` 一栏(目前有些用户控制面板是没有一键安装的),那么点进去一键安装即可,  点击 `Install Shadowsocks Server` 即可一键安装,耐心等待安装完成后点击 `Go Back` 返回就可以看到 SS 信息了

::: tip 提示
 iphone 上 Wingy 只支持 `aes-256-cfb` 模式
 模式,端口,密码就可以设置 SS 客户端了
:::

* 2. 如果控制面板中左侧没有 `Shadowsocks Server` 一栏, 网上说可以通过 [链接](https://kiwivm.64clouds.com/preloader.php?load=/main-exec.php?mode=extras_shadowsocks) 可以访问一键安装页面,但是我试了一下好像不行,仅做参考,如果可以访问,参考方式 1

* 3. SSH 脚本方式安装Shadowsocks
<br/>

搬瓦工为了用户的安全，要求用户在购买 VPS 后，要自己手动在 KiwiVM 控制面板重置密码, 进入控制面板,左侧找到 `Root password modification`, 进入点击 `Generate and set new root password` 重置密码

左侧菜单栏 `Main controls` 进入,复制 ip 地址和端口号
<br/>

mac 系统直接终端输入命令,回车,然后输入密码进入服务器
```shell
ssh root@[ip] -p [端口号]
```
<br/>

windows 系统安装 `putty`, `Xshell` 或者其他连接接服务器的软件进入服务器
<br/>

然后复制以下命令,回车
``` shell
wget --no-check-certificate -O shadowsocks-all.sh https://raw.githubusercontent.co ... /shadowsocks-all.sh
```
::: tip 提示
国外服务器运行脚本时容易出错，如出现错误提示 bash: wget: command not found，可以请在先执行 yum -y install wget 命令。成功后，再执行上面的命令。如果没有出现提示错误，请略过
:::

```shell
chmod +x shadowsocks-all.sh
```

```shell
./shadowsocks-all.sh 2>&1 | tee shadowsocks-all.log
```

::: tip 提示
下面会提示你输入你的SS SERVER的密码，和端口。不输入就是默认。跑完命令后会出来你的SS客户端的信息。
:::

然后会提示选择设置模式, 输入7 ,选择 `aes-256-cfb` 模式, 回车
<br/>

耐心等待几分钟, 安装完成后,会出现如下提示

```shell
Congratulations, Shadowsocks-Python server install completed!
Your Server IP : IP地址
Your Server Port : 端口
Your Password : 密码
Your Encryption Method: aes-256-gcm
Your QR Code: (For Shadowsocks Windows, OSX, Android and iOS clients)
ss://YWVzLTsadsa206YnVkZHkyMDA4QDEwNC4yMjQuMTM1Ldfghdfgk=
Your QR Code has been saved as a PNG file path:
/root/shadowsocks_python_qr.png
Welcome to visit: https://teddysun.com/486.html
Enjoy it!
```
复制 `ip` `port` `password` 自行保存登录 ss 客户端使用
<br/>

End
