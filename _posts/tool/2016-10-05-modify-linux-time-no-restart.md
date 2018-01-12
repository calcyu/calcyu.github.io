---
title: 不重启修改LINUX时区和时间
tags: LINUX
---

## 查看系统时间
``` bash
date
```

## 查看BIOS时间
``` bash
clock
```
<!--more-->

## 修改时间
``` bash
date -s 10/05/2016 16:02:30
```

## 同步时间
``` bash
clock --hctosys #硬件时间同步至系统时间
clock --systohc #系统时间同步至硬件时间
```

## 不重启更新LINUX系统时区
``` bash
cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
cp: overwrite `/etc/localtime'? y
date
Thu Oct  6 16:00:14 CST 2016
clock
Thu 06 Oct 2016 03:59:49 PM CST  -0.891096 seconds
```
    
