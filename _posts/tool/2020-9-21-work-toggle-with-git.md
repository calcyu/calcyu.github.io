---
title: 使用git协同开发
tags:
    - git
    - github
---



# 一、git简介

Git(读音为/gɪt/。)是一个开源的分布式版本控制系统，可以有效、高速地处理从很小到非常大的项目版本管理。

> Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。



## 二、git的使用



### 基本命令

> 初始化、查看状态、暂存、提交

```bash
# git 初始化
git init
# 查看文件状态
git status
# 跟踪源码
git add
git add .
# 提交源码
git commit -m '备注'
```



##  提交代码

> 推送代码、拉取代码

```bash
#本地仓库关联git服务器
git remote add git服务器地址
#第一次提交 需要指定服务器对应的分支
git push -u origin master  
# 代码提交至服务器
git push
# 服务器代码同步至本地
git pull
```



## 查看日志

```bash
git log
```

### 比较日志

```bash
git diff 日志版本id
git diff head^^
```



## 月光宝盒

```bash
git reset --hard head^
git reset --hard xxxx(版本编号，最少4位)
# 查看本地操作日志
git reflog
git reset --hard xxxx(日志中查看版本号)
```



### 多人协同

邀请贡献



## 分支操作

> 创建分支、切换分支、删除分支

```bash
#查看分支
git branch -v
#创建分支
git branch 分支名称
#切换分支
git checkout 分支名称
#删除分支
git branch -d 分支名称
# 快速创建分支并切换
git checkout -b 分支名称
```

