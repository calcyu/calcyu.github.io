---
title: Maven自定义编码和JDK问题
tags:
  - maven
  - encoding
  - utf-8
  - jdk
  - compiler
---

# 编码问题

1. JAVA编译时的编码
```xml
<project>
  ...
    <properties>
        <!-- 复制文件时使用的编码 -->
        <maven.compiler.encoding>UTF-8</maven.compiler.encoding>
    </properties>
  ...
</project>
```
或者
```xml
<project>
  ...
  <plugins>
    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>2.6</version>
        <configuration>
            <encoding>UTF-8</encoding>
        </configuration>
    </plugin>
  </plugins>
  ...
<project>
```

2. 复制文件时的编码问题
在pom.xml的properties节点(如果没有就创建)中新增以下属性


```xml
<project>
  ...
    <properties>
        <!-- 复制文件时使用的编码 -->
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
  ...
</project>
```
或者
```xml
<project>
  ...
  <plugins>
    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-resources-plugin</artifactId>
        <version>2.6</version>
        <configuration>
        <outputEncoding>UTF-8</outputEncoding>
        </configuration>
    </plugin>
  </plugins>
  ...
<project>
```

3. 生成站点时的编码问题

```xml
<project>
  ...
    <properties>
        <!-- 生成站点时使用的编码 -->
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
    </properties>
  ...
</project>
```
或者
```xml
<project>
  ...
  <plugins>
    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-site-plugin</artifactId>
        <version>3.6</version>
        <configuration>
            <outputEncoding>UTF-8</outputEncoding>
        </configuration>
    </plugin>
  </plugins>
  ...
<project>
```

> 如果以上还解决不了乱码问题，设置运行时参数`-Dfile.encoding=utf-8`

IDEA在Debug Configurations窗口的 VM Options：中设置`-Dfile.encoding=utf-8`

# JDK问题
自定义编码JDK版本
```xml
<project>
  ...
  <properties>
    <!-- 使用JDK 1.8语言特征编码代码，默认JDK 1.5 -->
    <maven.compiler.source>1.8</maven.compiler.source>
    <!-- 编码的类运行在JVM 1.8中 -->
    <maven.compiler.target>1.8</maven.compiler.target>
  </properties>
  ...
</project>
```
或者
```xml
<project>
  ...
  <build>
  ...
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.3</version>
        <configuration>
          <source>1.8</source>
          <target>1.8</target>
        </configuration>
      </plugin>
    </plugins>
  ...
  </build>
  ...
</project>
```

[参考文档](http://maven.apache.org/general.html)
