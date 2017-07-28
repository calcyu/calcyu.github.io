---
layout: post
title: Intellij 入门操作
categories: IDE
tags:
  - JAVA
  - WEB
  - USAGE
---


## 创建WEB项目
1. 点击 `create New Project `
2. 选择 `Java Enterprise `  
Project SDK选择jdk版本（即JDK,没有就新增一个，点击` new `选择jdk的安装目录）   
Application Server选择tomcat (没有就新增一个，点击` new `选择Tomcat server ，再选择tomcat的解压路径即可)  
3. 勾选从模板创建   
4. 输入项目名称点完成即可   

## 安装JDK
[下载JDK](http://rj.baidu.com/soft/detail/17531.html)

### 配置环境变量
右击`我的电脑`->`高级系统设置`->`高级`->`环境变量`  
新建以下变量：  
`JAVA_HOME`   `D:\Program Files\Java\jdk1.8.0`   
`classpath`   `.;%JAVA_home%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;`  
在path中追加 `D:\Program Files\Java\jdk1.8.0\bin;`  


## 配置TOMCAT
tomcat 有绿色版，开包即用，前题需要配置好JDK  
[下载TOMCAT](http://tomcat.apache.org/download-90.cgi)  

## 常见错误
> the file is indented with 2 spaces instead  of 4
当前文本缩进使用的是两个空格是否修改为四个

> Error running Tomcat 9.0.0.M1: Address localhost:8080 is already in use
> Error running Tomcat 9.0.0.M1: Unable to open debugger port (127.0.0.1:54167): java.net.SocketException "socket closed"
8080端口被占用了，可以通过`Edit Configuration`修改tomcat启动端口。

> 	Error running Unnamed: Unable to open debugger port (127.0.0.1:58568): java.net.BindException "Address already in use: JVM_Bind"

打开任务管理器，结束所有JAVA的进程，再尝试启动


