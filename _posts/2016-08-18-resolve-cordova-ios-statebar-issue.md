---
layout: redirect
title: 解决cordova ios 状态栏和页面重叠的问题
categories:
  - Cordova
  - IOS
  - Javascript
tags: ios
dest_url: http://blog.csdn.net/abc__d/article/details/51322870
---
在使用cordova6.0的过程中，编译好的APP运行在IOS7+系统上默认是与状态栏重叠的，而运行在IOS6及老版本中时是于状态栏分离的。
解决办法如下：
把文件MainViewController.m中的方法viewWillAppear进行相关修改如下。 作用是更改view的边界，使其下移20px，刚好是状态栏的高度。
