---
layout: post
title: javaEE项目实现登录验证码功能
categories: IDE
tags:
  - JAVA
  - JAVAEE
  - SERVLET
  - JCAPTCHA
---

这个教程教大家如何使用JCaptcha快速实现一个简单的登录验证码功能
> JCaptcha是一个用来生成验证码的强大开源JAVA类库，最新版本2.0

![验证码效果图](/assets/image/sac01.jpg)

## 第一步：配置servlet
```xml
<servlet>
    <servlet-name>jcaptcha</servlet-name>
    <servlet-class>com.octo.captcha.module.servlet.image.SimpleImageCaptchaServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>jcaptcha</servlet-name>
    <url-pattern>/jcaptcha.jpg</url-pattern>
</servlet-mapping>
```

## 第二步：创建登录页面
```java
<form action="checkCode.jsp">
    <img src="/jcaptcha.jpg" /> <input type="text" name="jcaptcha" value="" />
    <input type="submit" value="提交">
</form>
```

## 第三步：创建业务验证逻辑
```java
String userCaptchaResponse = request.getParameter("jcaptcha");
boolean captchaPassed = SimpleImageCaptchaServlet.validateResponse(request, userCaptchaResponse);
if (captchaPassed) {
    out.print("验证码输入正确");
} else {
    out.print("验证码输入错误");
}
```

## 依赖的JAR包
1. [commons-collections-3.2.jar](/assets/jar/commons-collections-3.2.jar)  
2. [commons-logging-1.0.4.jar](/assets/jar/commons-logging-1.0.4.jar)  
3. [filters-2.0.235.jar](/assets/jar/filters-2.0.235.jar)  
4. [jcaptcha-2.0-alpha-1-SNAPSHOT.jar](/assets/jar/jcaptcha-2.0-alpha-1-SNAPSHOT.jar)  
5. [jcaptcha-api-1.0.jar](/assets/jar/jcaptcha-api-1.0.jar)  
6. [jcaptcha-integration-simple-servlet-2.0-alpha-1-SNAPSHOT.jar](/assets/jar/jcaptcha-integration-simple-servlet-2.0-alpha-1-SNAPSHOT.jar)  