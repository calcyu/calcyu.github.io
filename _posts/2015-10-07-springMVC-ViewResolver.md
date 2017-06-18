---
layout: redirect
title: 详解Spring MVC 4之ViewResolver视图解析器
categories:
  - B/S(ERP OA)
  - JAVA
  - Spring
tags:
  - freemarker
  - SpringMVC
dest_url: http://bbs.51cto.com/thread-1133128-1.html
---

所有的We MVC框架都有一套它自己的解析视图的机制，Spring MVC也不例外，它使用ViewResolver进行视图解析，让用户在浏览器中渲染模型。ViewResolver是一种开箱即用的技术，能够解析JSP、Velocity模板和XSLT等多种视图。

Spring处理视图最重要的两个接口是ViewResolver和View。ViewResolver接口在视图名称和真正的视图之间提供映射； 而View接口则处理请求将真正的视图呈现给用户。