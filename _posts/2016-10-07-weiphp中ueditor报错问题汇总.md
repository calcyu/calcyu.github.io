---
layout: post
title: weiphp中ueditor报错问题汇总
date: 2016-10-07 9:44:13
categories:
- LANGUAGE
- PHP
tags:
- linux
- weiphp
- nginx
- ueditor
description: weiphp部署在nginx环境下ueditor各种报错的问题汇总
---
# weiphp中ueditor报错问题汇总
## ueditor 配置说明
[百度官方配置说明](http://fex.baidu.com/ueditor/)

## ueditor 不能获取到配置文件
>  GET http://*.com/Public/static/ueditor/php/controller.php?action=config&&noCache=1475802337777 403 (Forbidden)

> 请求后台配置项http错误，上传功能将不能正常使用！

修改NGINX配置文件

## nginx报405错误
因为ueditor通过静态文件进行POST请求，对于NGINX是不允许的。  
[解决方法](https://my.oschina.net/lemonzone2010/blog/174505)

## 目录创建失败
``` nginx
    location ~ \.php$ {
      #增加root目录
      root $root_path;
    ...
```
