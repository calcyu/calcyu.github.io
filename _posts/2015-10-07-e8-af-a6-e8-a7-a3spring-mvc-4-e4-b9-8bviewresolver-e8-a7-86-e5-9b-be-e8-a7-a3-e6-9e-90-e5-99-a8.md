---
layout: post
title: 详解Spring MVC 4之ViewResolver视图解析器
tags:
  - freemarker
  - SpringMVC
id: 67
categories:
  - B/S(ERP OA)
  - JAVA
  - Spring
date: 2015-10-07 15:04:35
---

<span style="font-family: 微软雅黑;"><span>  所有的We MVC框架都有一套它自己的解析视图的机制，Spring MVC也不例外，它使用ViewResolver进行视图解析，让用户在浏览器中渲染模型。ViewResolver是一种开箱即用的技术，能够解析 JSP、Velocity模板和XSLT等多种视图。</span></span>
<span style="font-family: 微软雅黑;"><span>    Spring处理视图最重要的两个接口是ViewResolver和View。ViewResolver接口在视图名称和真正的视图之间提供映射； 而View接口则处理请求将真正的视图呈现给用户。</span></span>

<span style="font-family: 微软雅黑;"><span>   ** 1.几种常见的ViewResolver视图解析器**</span></span>

<span style="font-family: 微软雅黑;"><span>    在Spring MVC 4控制器中，所有的处理方法必须返回一个逻辑视图名称，无论是显式的（返回String，View或ModelAndView）还是隐式的。Spring中的视图由视图解析器处理这个逻辑视图名称，Spring有以下几种视图解析器：</span></span>

<span style="font-family: 微软雅黑;"><span>  <span>AbstractCachingViewResolver</span>：用来缓存视图的抽象视图解析器。通常情况下，视图在使用前就准备好了。继承改解析器就能够使用视图缓存。</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>
<span>XmlViewResolver</span> ：XML视图解析器。它实现了ViewResolver接口，接受相同DTD定义的XML配置文件作为Spring的XML bean工厂。</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>
<span>ResourceBundleViewResolver</span>：它使用了ResourceBundle定义下的bean，实现了ViewResolver接口，指定了绑定包的名称。通常情况下，配置文件会定义在classpath下的properties文件中，默认的文件名字是views.properties。</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>
<span>UrlBasedViewResolver</span>：它简单实现了ViewResolver接口，它不用显式定义，直接影响逻辑视图到URL的映射。它让你不用任何映射就能通过逻辑视图名称访问资源。</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>
<span>InternalResourceViewResolver</span>：国际化视图解析器。</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>
VelocityViewResolver<span style="font-family: Helvetica,Arial,Freesans,Clean,sans-serif;"> /</span>FreeMarkerViewResolver：Velocity或FreeMarker视图解析器。</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>
<span>ContentNegotiatingViewResolver</span>：内容谈判视图解析器</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>    在JSP视图技术中，Spring MVC经常会使用 UrlBasedViewResolver视图解析器，该解析器会将视图名称翻译成URL并通过RequestDispatcher处理请求后渲染视图。</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>&lt;bean id="viewResolver"        class="org.springframework.web.servlet.view.UrlBasedViewResolver"&gt;    &lt;property name="viewClass" value="org.springframework.web.servlet.view.JstlView"/&gt;    &lt;property name="prefix" value="/WEB-INF/views/"/&gt;    &lt;property name="suffix" value=".jsp"/&gt;&lt;/bean&gt;</span></span>
<span style="font-family: 微软雅黑;"><span>    假如我们配置了如上所示的URL视图解析器，我们返回了一个叫“favmvc”的视图名称，视图解析器就会将请求转发到RequestDispatcher，然后跳转到/WEB-INF/views/favmvc.jsp页面。</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>    假如我们想要在应用中使用不同的视图技术，我们就应该使用 ResourceBundleViewResolver。</span></span>
<span style="font-family: 微软雅黑;"><span>&lt;bean id="viewResolver"        class="org.springframework.web.servlet.view.ResourceBundleViewResolver"&gt;    &lt;property name="basename" value="views"/&gt;    &lt;property name="defaultParentView" value="parentView"/&gt;&lt;/bean&gt;</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>    ResourceBundleViewResolver对于每个要处理的视图，都会检查 ResourceBundle中basename的唯一性，它使用 [viewname].(class)作为视图类，[viewname].url作为视图的url。</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>   ** 2\. 链式视图解析器（Chaining ViewResolvers）**</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>    Spring支持同时配置多个视图解析器，也就是链式视图解析器。这样，在某些情况下，就能够重写某些视图。如果我们配置了多个视图解析器，并想要给视图 解析器排序的话，设定 order 属性就可以指定解析器执行的顺序。order的值越高，解析器执行的顺序越晚。</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>    下面代码所示的例子由两个视图解析器组成。 InternalResourceViewResolver总是最后一个执行，而 XmlViewResolver则指定解析XML视图（InternalResourceViewResolver不支持Excel视图）。</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>&lt;bean id="jspViewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver"&gt;    &lt;property name="viewClass" value="org.springframework.web.servlet.view.JstlView"/&gt;    &lt;property name="prefix" value="/WEB-INF/jsp/"/&gt;    &lt;property name="suffix" value=".jsp"/&gt;&lt;/bean&gt;&lt;bean id="excelViewResolver" class="org.springframework.web.servlet.view.XmlViewResolver"&gt;    &lt;property name="order" value="1"/&gt;    &lt;property name="location" value="/WEB-INF/views.xml"/&gt;&lt;/bean&gt;_&lt;!-- in views.xml --&gt;_&lt;beans&gt;    &lt;bean name="report"/&gt;&lt;/beans&gt;</span></span>

<span style="font-family: 微软雅黑;"><span>    如果视图解析器没有指定视图的话，Spring就会检查其它的视图解析器，直到有一个完整的包含视图的视图解析器。如果一个完整的视图解析器也没有找到的话，Spring就会抛出 ServletException。</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>    视图解析器规定如果没有找到视图就返回null。但不是所有的视图解析器都这么做，因为在某些情况下，解析器并不能检测是否存在视图。比如 InternalResourceViewResolver在内部使用RequestDispatcher时，调度转发是判断JSP是否存在的唯一方法， 但该action却只能执行一次。VelocityViewResolver和其它的一些解析器也这样，区分这些视图解析器能否在找不到视图的情况下返回 null，最好的方法就是看官方文档中它是否支持了。由于 InternalResourceViewResolver总会返回视图，在视图链中使用InternalResourceViewResolver就能 让你避免这些问题。</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>**    3.  重定向视图**</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>    在controller控制器中强制重定向的方法就是创建并返回Spring的RedirectView实例。在这种情况 下，DispatcherServlet不再使用正常的视图机制，因为它已经返回了重定向视图，DispatcherServlet只是告诉视图去显示。</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>    RedirectView会调用 HttpServletResponse.sendRedirect()方法，然后它就作为HTTP重定向返回给客户端浏览器。默认情况下，所有的模板属性变量都认为是重定向URL，其余的属性自动附加为查询参数。</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>    **redirect前缀**</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>    尽管RedirectView工作机制很好，但如果控制器本身创建RedirectView时，毫无疑问控制器本身知道该如何重定向。这样做并不好，控制器不应该关心响应如何处理，它只是处理被注入的视图名称。</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>    当我们在返回视图名称时，如果使用了“redirect：”前缀（如“redirect : /login”），UrlBasedViewResolver视图控制器会识别这是一次特殊的重定向，并把redirect后面的视图名称当做重定向的地址。</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>    假如我们在[http://favccxx.com](http://favccxx.com)应用中返回“redirect:/favboy”视图时， 系统会重定向到[http://favccxx.com/favboy](http://favccxx.com/favboy)。但如果我们返回了“redirect:[http://favsoft.me](http://favsoft.me)”这样的视图时，系统会重定向到http://favsoft.me的视图上。</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>    **forward前缀**</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>    forward前缀视图是另一种通过URLBasedViewResolver机制处理到的转向机制，它在视图名称周围创建 InternalResourceView，因此这个前缀跟InternalResourceViewResolver和 InternalResourceView无关。但这个前缀在你想使用其它视图技术但想强制通过Servlet/JSP引擎处理资源进行转向时是有用的。</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>   ** redirect与forward的区别    **</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>    **redirect**方 式相当 于"response.sendRedirect()".这种方式外部特征就是浏览器地址栏最后显示的路径是转发后的新的路径.工作方式是这样的，服务器 端会首先发一个response给浏览器，然后浏览器收到这个response后再发一个requeset给服务器，然后服务器发新的response给 浏览器。这时页面收到的request是一个新从浏览器发来的.这种方式的结果是：</span></span>
<span style="font-family: 微软雅黑;"><span>    A.在转发前后有两个不同的request对象,转发前后的两个控制器在request上的参数(request.getParameter())和request属性(request.getAttribute())不能共享。</span></span>
<span style="font-family: 微软雅黑;"><span>    B.如果转发前后的两个控制器都配置在spring 拦截器范围内,这样拦截器会拦截前后两个request,即会拦截两次。</span></span>
<span style="font-family: 微软雅黑;"><span>    C.最后返回到浏览器后,因为地址栏显示的是转发后的url，所以刷新页面时只会执行后面的url映射的控制器。</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>    **forward**方 式相当于 request.getRequestDispatcher().forward(request,response) .这种方式的外部特征是浏览器地址显示的路径是转发前的路径。工作方式是这样，forward 发生在服务器内部,在前一个控制器处理完毕后,直接进入下一个控制器处理，并将最后的response发给浏览器。这种方式的结果是：</span></span>
<span style="font-family: 微软雅黑;"><span>    A.转发前后是同一个request,后一个控制器可共享前一个控制器的参数与属性。</span></span>
<span style="font-family: 微软雅黑;"><span>    B.因为是同一个request，拦截器只会拦截前一个url，如果前一个url在映射时未配置到拦截器拦截，则拦截后一个url，即只拦截一次。</span></span>
<span style="font-family: 微软雅黑;"><span>    C.最后返回到浏览器后,因为地址栏显示的是转发前的url，所以刷新页面时会依次执行前后两个控制器。</span></span>
<span style="font-family: 微软雅黑;"><span>
</span></span>
<span style="font-family: 微软雅黑;"><span>   总结：本文介绍了Spring MVC 4中常见的几种视图解析器，以及如何配置视图解析器包括链式视图解析器，最后除了正常视图映射机制外，我们还能够通过redirect/forward视 图转向机制完成视图的重定向。本文偏向原理性介绍，关于视图解析机制在工作中的使用，并没有做过多的介绍，目的是让读者能够了解ViewResolver 的工作机制。</span></span>

原文：http://bbs.51cto.com/thread-1133128-1.html