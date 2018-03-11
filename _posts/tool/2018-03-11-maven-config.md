---
title: Maven安装配置
tag:
- Maven
- mirrors
---

1. 下载Maven  

[Maven官方网站](https://maven.apache.org/)  
[Windows下载地址](http://mirrors.tuna.tsinghua.edu.cn/apache/maven/maven-3/3.5.3/binaries/apache-maven-3.5.3-bin.zip)

2. 安装Maven  

绿色无公害软件，找个地方解压即可。建议不要解压到C盘（系统盘），因为是绿色软件，所以即使重装了系统，只要配置一下环境变量就可以继续使用。

3. 配置环境变量  

打开`我的电脑->右击->属性->高级系统设置->高级->环境变量`窗口
编辑`path`变量，在最后追加`E:\Maven\apache-maven-3.5.2\bin`
> 注：不同变量值之间使用`;`分隔
如果想修改MAVEN运行JVM的内容，可以新增环境变量`MAVEN_OPTS`,变量值为：`-Xms256m -Xmx512m`

4. 检测Maven  

> 检查MAVEN是否安装好之前，先把系统环境变量的窗口确认关闭了，再重新打开CMD窗口
> 注：Maven 3.3版本或更高版本 要求 JDK 1.7或更高版本
打开CMD窗口，输入 `mvn -v` 命令，如果能看到Maven版本及相关信息，说明已经安装好了

5. 配置本地仓库路径  

打开`E:\Maven\apache-maven-3.5.2\conf\settings.xml`配置文件
在`<settings>`节点中新增`<localRepository>E:\Maven\repository</localRepository>`指向本地仓库路径

6. 配置伟大阿里的MAVEN镜像库  

如果你想要使项目依赖库下载更快、更稳，那就需要在MAVEN的配置文件settings.xml中设置镜像属性
同样打开`E:\Maven\apache-maven-3.5.2\conf\settings.xml`配置文件
在`mirrors`节点新增如下内容
```html
<mirror>
    <id>nexus-aliyun</id>
    <mirrorOf>*</mirrorOf>
    <name>Nexus aliyun</name>
    <url>http://maven.aliyun.com/nexus/content/groups/public</url>
</mirror>
```

