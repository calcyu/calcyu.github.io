---
layout: external-post
title: （总结）Nginx配置文件nginx.conf中文详解
categories:
  - LINUX
  - Tools
tags:
  - fastcgi
  - gzip
  - nginx
external-url: http://www.ha97.com/5194.html
external-name: （总结）Nginx配置文件nginx.conf中文详解
---

# 定义Nginx运行的用户和用户组
```
user www www;
```

# nginx进程数，建议设置为等于CPU总核心数。
```
worker_processes 8;
```
<!--more-->
# 全局错误日志定义类型，[ debug | info | notice | warn | error | crit ]
```
error_log /var/log/nginx/error.log info;
```
