---
title: JDK安装及环境变量配置
tag:
- jdk
- java_home
- jre
- JDK所有版本下载地址
- 环境变量配置
---
# 下载JDK
官方下载地址
- [JDK1.9下载地址](http://www.oracle.com/technetwork/java/javase/downloads/jdk9-downloads-3848520.html)
- [JDK1.8下载地址](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- [JDK1.7下载地址](http://www.oracle.com/technetwork/java/javase/downloads/java-archive-downloads-javase7-521261.html)
- [JDK1.6下载地址](http://www.oracle.com/technetwork/java/javase/downloads/java-archive-downloads-javase6-419409.html)
- [JDK1.5下载地址](http://www.oracle.com/technetwork/java/javasebusiness/downloads/java-archive-downloads-javase5-419410.html)

在官网下载需要注册账号，如果不想注册可以使用我的百度网盘地址，里面有制作好的绿色版本
[JDK所有版本下载地址](https://pan.baidu.com/s/1E8bmxYU-WSe6SbeSR-PYaA)

[绿色JDK的制作方法移步](http://geek5.cn/blog/2018/03/13/green-jdk-make.html)

# 安装或者解压
EXE为安装版本，直接下一步
压缩包为绿色版本，解压后，配置一下环境变量即可以使用（推荐）

# 环境变量配置
1. 打开`右击我的电脑->属性->高级系统设置->高级->环境变量`窗口
2. 在系统环境变量栏里，新增变量`JAVA_HOME`，变量的值指向JDK安装或者解压目录，比如我的路径是：`E:\JDK\jdk1.8.0_8u161_64`
3. 新增`CLASSPATH`变量，变量值为`.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;`
4. 打开path变量，在最开始位置追加`%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;`

> 注意：path变量的值是追加，而不是替换，否则可能引起部分程序无法正常运行，还有就是在最开始的位置加，否则运行JAVA程序的时候，会报如下错误
```
Error: opening registry key 'Software\JavaSoft\Java Runtime Environment'
Error: could not find java.dll
Error: Could not find Java SE Runtime Environment.
```

# 测试运行
1. 打开cmd窗口（WIN+R）
2. 输入`java -version`，可以看到类似如下信息说明安装配置成功
```
# 不同版本有所不同
java version "1.8.0_161"
Java(TM) SE Runtime Environment (build 1.8.0_161-b12)
Java HotSpot(TM) 64-Bit Server VM (build 25.161-b12, mixed mode)
```