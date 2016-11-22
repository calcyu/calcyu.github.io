---
layout: post
title: Spring freemarker 配置说明
tags:
  - freemarker
  - springframework
id: 73
categories:
  - Spring
date: 2015-10-07 16:30:17
---

<pre>&lt;!-- 设置freeMarker配置文件路径 --&gt;
&lt;bean id="freemarkerConfiguration" class="org.springframework.beans.factory.config.PropertiesFactoryBean"&gt;
    &lt;property name="location" value="classpath:freemarker.properties" /&gt;
&lt;/bean&gt;

&lt;!-- 配置freeMarker模板路径 --&gt;
&lt;bean id="freemarkerConfig" class="org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer"&gt;
    &lt;property name="freemarkerSettings" ref="freemarkerConfiguration" /&gt;
    &lt;property name="templateLoaderPath" value="/" /&gt;
    &lt;property name="defaultEncoding" value="UTF-8" /&gt;
    &lt;!-- 全局变量部分 --&gt;
    &lt;property name="freemarkerVariables"&gt;
        &lt;map&gt;
            &lt;entry key="systemManager"&gt;
                &lt;bean class="com.xxx.xxx" /&gt;
            &lt;/entry&gt;
        &lt;/map&gt;
    &lt;/property&gt;
&lt;/bean&gt;
&lt;!--配置jsp视图解析器 --&gt;
&lt;bean id="viewResolverCommon" class="org.springframework.web.servlet.view.InternalResourceViewResolver"&gt;
    &lt;property name="prefix" value="/"/&gt;
    &lt;property name="suffix" value=".jsp"/&gt;&lt;!--可为空,方便实现自已的依据扩展名来选择视图解释类的逻辑  --&gt;
    &lt;property name="viewClass" value="org.springframework.web.servlet.view.JstlView"/&gt;
    &lt;property name="order" value="1"/&gt;
&lt;/bean&gt;
&lt;!-- 配置freeMarker视图解析器 --&gt;
&lt;bean id="viewResolver" class="org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver"&gt;
    &lt;property name="viewClass" value="org.springframework.web.servlet.view.freemarker.FreemarkerView"/&gt;
    &lt;property name="prefix" value="/"/&gt;
    &lt;property name="contentType" value="text/html; charset=utf-8" /&gt;
    &lt;property name="requestContextAttribute" value="request" /&gt;
    &lt;property name="suffix" value=".ftl" /&gt;
    &lt;property name="order" value="0"/&gt;
&lt;/bean&gt;</pre>