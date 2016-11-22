---
layout: post
title: 安装Tomcat指定JDK
id: 61
categories:
  - LINUX
  - Tools
date: 2015-09-22 16:15:54
tags:
---

<div>

# [安装Tomcat指定JDK](http://www.cnblogs.com/lioillioil/archive/2011/10/08/2202169.html)

</div>
一、应用实例

一般情况下一台服务器只跑一个业务，那么就直接配置一套环境，设置好Java环境变量即可。某些时候一台服务器上会安装多个业务，而且各个业务需要的JDK版本各不相同，或者为了使业务独立开来，需要指定Tomcat的JDK。

现假设某个业务的Tomcat(apache-tomcat-6.0.32)需要用到该版本JDK(jdk1.6.0_18)，JDK安装目录为 "/usr/local/java/jdk1.6.0_18"。

&nbsp;

二、安装Tomcat

1、通过Apache官网下载获得Tomcat(apache-tomcat-6.0.32.tar.gz)，将文件上传至指定目录，解压Tomcat安 装。我上传至Linux服务器的 "/home/appuser/yuexin/" 目录下，取名为 "tomcat-yuexin" 。命令如下：
<div>
<pre># tar zxvf apache-tomcat-6.0.32.tar.gz

# mv apache-tomcat-6.0.32 tomcat-yuexin</pre>
</div>
&nbsp;

2、修改Tomcat三个配置文件，"tomcat/bin/catalina.sh" 、 "tomcat/bin/setclasspath.sh" 、 "tomcat/conf/server.xml" 。

1) 在catalina.sh文件和setclasspath.sh文件开头的空白处加上如下两句(指定JDK)：
<div>
<pre>export JAVA_HOME=/usr/local/java/jdk1.6.0_18
export JRE_HOME=/usr/local/java/jdk1.6.0_18/jre</pre>
</div>
2) 修改server.xml文件如下内容(解决多个Tomcat启动、停止端口冲突问题)：
<div>
<div><a title="复制代码">![复制代码](http://common.cnblogs.com/images/copycode.gif)</a></div>
<pre>&lt;Server port="8005" shutdown="SHUTDOWN"&gt;    ----&gt;    &lt;Server port="8195" shutdown="SHUTDOWN"&gt;

&lt;Connector port="8080" protocol="HTTP/1.1" connectionTimeout="20000" redirectPort="8443" /&gt;    ----&gt;    &lt;Connector port="8091" protocol="HTTP/1.1"  maxThreads="150" minSpareThreads="25" maxSpareThreads="75" enableLookups="false" redirectPort="8443" acceptCount="100" debug="0" connectionTimeout="20000" disableUploadTimeout="true" /&gt;

&lt;Connector port="8009" protocol="AJP/1.3" redirectPort="8443" /&gt;    ----&gt;    &lt;Connector port="8199" protocol="AJP/1.3" redirectPort="8443" /&gt;

&lt;Host name="localhost"  appBase="webapps" unpackWARs="true" autoDeploy="true" xmlValidation="false" xmlNamespaceAware="false"&gt;    ----&gt;    &lt;Host name="10.10.3.54"  appBase="webapps" unpackWARs="true" autoDeploy="true" xmlValidation="false" xmlNamespaceAware="false" &gt;&lt;Context path="" docBase="ROOT" reloadable="true"&gt;&lt;/Context&gt;&lt;/Host&gt;</pre>
<div><a title="复制代码">![复制代码](http://common.cnblogs.com/images/copycode.gif)</a></div>
</div>
三、启动，停止Tomcat验证安装

1、启动Tomcat，并查看进程。如下：
<div>
<div><a title="复制代码">![复制代码](http://common.cnblogs.com/images/copycode.gif)</a></div>
<pre># cd bin/
# ./startup.sh

# ps -ef|grep tomcat
root     25178     1  0 09:46 ?        00:00:30 /usr/local/java/jdk1.6.0_18/jre/bin/java -Djava.util.logging.config.file=/home/appuser/yuexin/tomcat-yuexin/conf/logging.properties -Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager -Djava.endorsed.dirs=/home/appuser/yuexin/tomcat-yuexin/endorsed -classpath /home/appuser/yuexin/tomcat-yuexin/bin/bootstrap.jar -Dcatalina.base=/home/appuser/yuexin/tomcat-yuexin -Dcatalina.home=/home/appuser/yuexin/tomcat-yuexin -Djava.io.tmpdir=/home/appuser/yuexin/tomcat-yuexin/temp org.apache.catalina.startup.Bootstrap start
root     26513 26303  0 14:48 pts/0    00:00:00 grep tomcat

# ./shutdown.sh</pre>
<div><a title="复制代码">![复制代码](http://common.cnblogs.com/images/copycode.gif)</a></div>
</div>
从进程信息可以看出Tomcat使用的JDK环境为 "/usr/local/java/jdk1.6.0_18" ，并且能正常启动和停止，启动后访问该服务器相应端口能看到Apach Tomcat的欢迎界面，停止时不影响其他应用进程。至此安装配置完成。

原文：http://www.cnblogs.com/lioillioil/archive/2011/10/08/2202169.html