---
layout: post
title: GIT和NODEJS配置
categories: GIT
tags:
  - GIT
  - NODEJS
---

## 配置前端环境
1.	安装GIT
a)	https://git-for-windows.github.io/
2.	安装NODEJS
a)	https://nodejs.org/en/download/

这两个软件安装直接下一步

检查软件是否安装成功
GIT在右键菜单有git bash here命令就说明安装好了

nodejs可以在CMD命令行中输入node –v
和npm –v
 

GIT和SVN是同类软件都是对软件代码进行版本化管理的工具

nodejs和JAVA中的JDK类似是JS在服务器端的运行环境

npm(node pagkege manager)node包管理工具

npm install -g cnpm --registry=https://registry.npm.taobao.org

查看cnpm的配置

cnpm config list

其中有一项，说明cnpm 是从淘宝镜像上下载相应的依赖包
registry = http://registry.npm.taobao.org/

把原始的npm修改为淘宝镜像
npm config set registry = http://registry.npm.taobao.org/

npm config list

从github开源社区下载项目
1.	找到对应的项目首页
2.	复制项目地址
3.	git clone https://github.com/angular/angular-seed.git

下载完angular-seed这个种子项目后
输入cd angular-seed 进入项目目录

输入cnpm install 安装依赖包

输入cnpm start 运行APP

