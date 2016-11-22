---
layout: post
title: spring aop expression简单说明
tags:
  - aop
  - spring
id: 70
categories:
  - B/S(ERP OA)
  - JAVA
  - Spring
date: 2015-10-07 15:45:31
---

示例代码：
<div>
<div>
<div>**[java]** [view plain](http://blog.csdn.net/steryzone/article/details/7240028# "view plain")[copy](http://blog.csdn.net/steryzone/article/details/7240028# "copy")</div>
</div>

1.  &lt;aop:config&gt;
2.  &lt;aop:pointcut id="userDAO"
3.  expression="execution(public * cn.dao.IUserDAO.*(..))" /&gt;
4.  &lt;aop:advisor advice-ref="tx" pointcut-ref="userDAO"/&gt;
5.  &lt;/aop:config&gt;
</div>
在上面的代码中

execution   是方法运行

public         是指定public的方法，也可以不写直接：execution(* cn.dao.IUserDAO.*(..)

*                  是任意返回值，可以有返回值，也可以是void没有返回值的方法

cn.dao.IUserDAO.*                  是指定目录下的指定类任意方法

cn.dao.IUserDAO.insert*       是指定目录下的指定类insert开头的任意方法

cn.dao.IUserDAO.*.*              是指定目录下的任意类下的任意方法

cn.dao..*.*                                是指定目录下的任意目录下任意类下的任意方法

(..)                                              是任何参数，可以是没有参数

&nbsp;

&nbsp;

在execution中是可以有多个的方法，例如：

execution(* com.action.userinfoAction..*(..))&amp;&amp;execution(* com.action.memberAction..*(..))&amp;&amp;!execution(* get*(..))&amp;&amp;!execution(* set*(..))