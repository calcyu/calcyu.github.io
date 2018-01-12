---
title: Spring freemarker 配置说明
tags:
  - FREEMARKER
  - SPRINGFRAMEWORK
---

spring freemarker的配置参考



``` xml
<!-- 设置freeMarker配置文件路径 -->
<bean id="freemarkerConfiguration" class="org.springframework.beans.factory.config.PropertiesFactoryBean">
    <property name="location" value="classpath:freemarker.properties" />
</bean>

<!-- 配置freeMarker模板路径 -->
<bean id="freemarkerConfig" class="org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer">
    <property name="freemarkerSettings" ref="freemarkerConfiguration" />
    <property name="templateLoaderPath" value="/" />
    <property name="defaultEncoding" value="UTF-8" />
    <!-- 全局变量部分 -->
    <property name="freemarkerVariables">
        <map>
            <entry key="systemManager">
                <bean class="com.xxx.xxx" />
            </entry>
        </map>
    </property>
</bean>
<!--配置jsp视图解析器 -->
<bean id="viewResolverCommon" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <property name="prefix" value="/"/>
    <property name="suffix" value=".jsp"/>
    <!--可为空,方便实现自已的依据扩展名来选择视图解释类的逻辑  -->
    <property name="viewClass" value="org.springframework.web.servlet.view.JstlView"/>
    <property name="order" value="1"/>
</bean>
<!-- 配置freeMarker视图解析器 -->
<bean id="viewResolver" class="org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver">
    <property name="viewClass" value="org.springframework.web.servlet.view.freemarker.FreemarkerView"/>
    <property name="prefix" value="/"/>
    <property name="contentType" value="text/html; charset=utf-8" />
    <property name="requestContextAttribute" value="request" />
    <property name="suffix" value=".ftl" />
    <property name="order" value="0"/>
</bean>
```