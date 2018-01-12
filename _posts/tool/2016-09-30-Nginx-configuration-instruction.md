---
title: （总结）Nginx配置文件nginx.conf中文详解
tags:
  - FASTCGI
  - GZIP
  - NGINX
dest_url: http://www.ha97.com/5194.html
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
