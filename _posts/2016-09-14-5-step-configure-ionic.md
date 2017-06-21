---
layout: post
title: 5步完成ionic环境配置
tags:
  - CORDOVA
  - IONIC
  - NPM
  - TABS
categories: IONIC
---

## 第一步

安装NodeJS,[下载地址](https://nodejs.org/en/)

## 第二步

配置npm参数

1.  自定义全局安装目录
``` bash
npm config set prefix "D:\nodejs\node_global"
```
2.  自定义缓存目录
``` bash
npm config set cache "D:\nodejs\node_cache"
```
3.  自定义淘宝镜像地址
``` bash
npm config set registry https://registry.npm.taobao.org  
```
4.  因为node默认地址修改了，所有需要在系统环境变量PATH中增加
``` bash
D:\nodejs\node_global 
```
<!--more-->

## 第三步

安装cordova ionic 命令行工具
``` bash
npm install -g cordova ionic 
```

## 第四步

创建项目
``` bash
ionic start geek5.cn tabs 
```

## 第五步

运行项目
``` bash
cd geek5.cn
ionic serve
```