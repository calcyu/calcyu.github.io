---
layout: external-post
title: Tomcat使用指定版本JDK的安装方法
categories:
  - LINUX
  - Tools
tags: tomcat jdk
external-url: http://www.cnblogs.com/lioillioil/archive/2011/10/08/2202169.html
external-name: cnblog
---

一般情况下一台服务器只跑一个业务，那么就直接配置一套环境，设置好Java环境变量即可。某些时候一台服务器上会安装多个业务，而且各个业务需要的JDK版本各不相同，或者为了使业务独立开来，需要指定Tomcat的JDK。

现假设某个业务的Tomcat(apache-tomcat-6.0.32)需要用到该版本JDK(jdk1.6.0_18)，JDK安装目录为 "/usr/local/java/jdk1.6.0_18"。
