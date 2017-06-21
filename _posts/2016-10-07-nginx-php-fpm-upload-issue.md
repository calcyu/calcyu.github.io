---
layout: post
title: nginx+php-fpm上传报错
categories: LINUX
tags: LINUX
---

## 上传文件过大浏览器报错内容
> 413 Request Entity Too Large

## 解决方案
Nginx配置文件nginx.conf 中的 http{} 段增加 client_max_body_size 5m;
上传最大文件大小为5M，其它需求自行调整
<!--more-->

## nginx错误日志
```
2022#0: *83 FastCGI sent in stderr: "PHP message: PHP Fatal error:  Maximum execution time of 30 seconds exceeded in
```

## 解决方案
修改配置文件php-fpm.conf和nginx.conf
1. request_terminate_timeout = 300
2. fastcgi_read_timeout 300;

``` bash
$ service php-fpm reload
$ service nginx reload
```
