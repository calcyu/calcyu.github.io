---
title: React-native创建的例子启动就报错怎么玩
tags: ERROR REACT-NATIVE
---

好不容易把“脸叔”FACEBOOK开源项目 REACT-NATIVE（移动跨平台解决方案）的环境搭建好，

通过命令行创建了HELLOWORLD项目

```
react-native init geek5
cd geek5
react-native run-android
```
<!--more-->
启动就报错怎么玩

```
Could not get BatchedBridge, make sure your bundle is packaged correctly
```

解决方案是凯哥辛苦百出来的，请笑纳！

在ANDROID项目根目录运行下面的命令

```
react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --sourcemap-output android/app/src/main/assets/index.android.map --assets-dest android/app/src/main/res/
```

注：记得在ANDROID项目中创建assets目录，不然会提示目录不存在