---
title: Mybatis运行常见错误汇总（持续更新）
tag: 
- mybatis
- error
---

## 1：找不到类中的get属性
```java
org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.reflection.ReflectionException: There is no getter for property named 'userName' in 'class cn.geek5.Xxxx'
```
检查取值表达式中的属性名是否写错了，例如：{username,jdbcType=INTEGER}把userName写成了username

## 2：BaseResultMap重复了
因为mybatis的代码生成插件，xml文件是追加，如果你执行了两次生成的话，表的映射xml里的代码会生成两遍，所以就会报错
```java
Error parsing Mapper XML. Cause: java.lang.IllegalArgumentException: Result Maps collection already contains value for com.seecen.news.dao.SysLogMapper.BaseResultMap
```
解决方法：检查对应的xml文件中是否有两个相同的BaseResultMap结果集

## 3：jdbcType写错了
 ```java
 Cause: org.apache.ibatis.builder.BuilderException: Error resolving JdbcType. Cause: java.lang.IllegalArgumentException: No enum constant org.apache.ibatis.type.JdbcType.xxxxx
 ```
### 解决方法
1. 检查resultMap节点中的jdbcType属性是否写错了，例如：jdbcType="DECIMAL"
2. 检查取值表达式中的jdbcType属性是否写错了，例如：#{userid,jdbcType=DECIMAL}

## 4：类名写错了
```java
Cause: org.apache.ibatis.type.TypeException: Could not resolve type alias 'com.xxxx'.  Cause: java.lang.ClassNotFoundException: Cannot find class: com.xxxx
```
### 解决方法
检查配置文件中的parameterType、或者resultMap节点中的type属性对应的类是否写错了。

## 5：结果集ID写错了
```java
org.apache.ibatis.builder.IncompleteElementException: Could not find result map com.seecen.news.dao.UserMapper.BaseResultMap2
```
### 解决方法
检查CRUD对应resultMap属性名是否写错了

## 6：找不到类中的set属性
```java
org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.reflection.ReflectionException: Could not set property 'userName' of 'class cn.geek5.Xxxx' with value '25' Cause: org.apache.ibatis.reflection.ReflectionException: There is no setter for property named 'userName' in 'class cn.geek5.Xxxx'
```
### 解决方法
检查resultMap节点中的，id或者result节点中的property属性名是否写错了


## 7：创建MYBATIS配置文件实例出错
```java
Cause: org.xml.sax.SAXParseException; lineNumber: 3; columnNumber: 53; 文档根元素 "mapper" 必须匹配 DOCTYPE 根 "con"。
```
### 解决方法  
这个问题引起的原因是mybatis的mapper配置文件的DOCTYPE有误，正确的应该是  `<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >`

## 8：解析MYBATIS配置文件出错

错误日志
```java
Error creating bean with name 'sqlSessionFactory' defined in class path resource
 [*.xml]: Invocation of init method failed; nested exception is org.springframework.core.NestedIOException: Failed to parse mapping resource: 'file [*.xml]'; nested exception is org.apache.ibatis.builder.BuilderException: Error parsing Mapper XML.
 ```