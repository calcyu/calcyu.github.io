---
layout: post
title: PHP-FPM多进程开机自启
categories: blog
tags:
- php-fpm
- linux
- centos
- chkconfig
---
## 自启sh脚本文件start-php
<!--more-->

``` bash
#!/bin/bash
#chkconfig: 2345 90 10
#description: php-fpm service
/usr/sbin/php-fpm -y /etc/php-fpm-conf/php-fpm.conf
/usr/sbin/php-fpm -y /etc/php-fpm-conf/php-fpm.conf1
/usr/sbin/php-fpm -y /etc/php-fpm-conf/php-fpm.conf2
/usr/sbin/php-fpm -y /etc/php-fpm-conf/php-fpm.conf3
/usr/sbin/php-fpm -y /etc/php-fpm-conf/php-fpm.conf4
```

把start-php复制到/etc/rc.d/init.d/

设置开机自启
```bash
chkconfig --add start-php
chkconfig start-php on
```
