---
layout: post
title: Homestead laravel常见问题
tags:
  - HOMESTEAD
  - LARAVEL
  - VAGRANT
categories: LARAVEL
---

## 问题1：
已经添加了box，但Vagrant启动的时候找不到box的问题
解答：
修改：```Homestead\scripts\homestead.rb```
``` bash
config.vm.box_version = settings["version"] ||= ">= 0.4.0"
config.vm.box_version = settings["version"] ||= ">= 0"
```
<!--more-->
## 问题2：
```
Stderr: 0%...
Progress state: E_FAIL
VBoxManage.exe: error: Failed to create the host-only adapter
VBoxManage.exe: error: Could not find Host Interface Networking driver! Please reinstall
VBoxManage.exe: error: Details: code E_FAIL (0x80004005), component HostNetworkInterfaceWrap,
 interface IHostNetworkInterface
VBoxManage.exe: error: Context: "enum RTEXITCODE __cdecl handleCreate(struct HandlerArg *)" at line 71 of file VBoxManageHostonly.cpp
```
解答：安装doctor引起的问题，卸载了重装VirtualBox之后就好了。

## 问题3：
按照要求部署之后，访问phphub.app报 502 错误， vagrant ssh 运动 `service nginx configtest` 报错。 查看nginx站点配置,phphub.app，估计是fastcgi这句错误：`fastcgi_pass unix:/var/run/php/php7.0-fpm.sock; `运行`ps -ef|grep php-fpm`，显示正在运行的是php-fpm5，nginx配置里却是php7.0-fpm
解答：Homestead版本的问题。