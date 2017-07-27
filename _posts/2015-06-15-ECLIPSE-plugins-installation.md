---
layout: post
title: ECLIPSE插件万能安装方法
categories:
  - ECLIPSE
tags:
  - ECLIPSE
  - JAR
  - JAVA
  - PLUGIN
---


## 简介

ECLIPSE的插件安装方法有好几种，

*   直接拷贝到ECLIPSE安装目录的PLUGINS目录
*   使用在线安装或者选择一个本地的插件包
*   使用LINK文件的方法
以上几种方法遇到不同环境，不同ECLIPSE版本，都会有所不同。

<!--more-->

我主要是介绍万能安装方法，也就是执行一段代码，打印一串信息，复制到ECLIPSE的配置文件中的方法，但我介绍的这种方法稍微简便了一些，因为我把那段代码，打包成了一个JAR可执行文件，这样免去了，在ECLIPSE中新建项目，复制代码，修改插件路径的麻烦。现在直接运行可执行文件即可。并且提供JAR和EXE两个版本。

## 使用方法

运行pluginsSetup程序，粘贴你插件的目录，点击生成，显示出配置信息。

把打印出来的配置信息，追加到ECLIPSE的配置文件当中。

X: eclipseconfigurationorg.eclipse.equinox.simpleconfiguratorbundles.info

以下是安装SVN插件的示例图：

## 软件地址

[http://download.csdn.net/detail/as3kenn/8801995](http://download.csdn.net/detail/as3kenn/8801995)