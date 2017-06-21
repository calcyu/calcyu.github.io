---
layout: post
title: Mybatis分页插件生成分页SQL
tags: MYBATIS
categories: MYBATIS
---

## **应用场景：**

MYBATIS生成的XML文件中不带分页SQL，手动添加太不优雅了。

## **使用方法：**

mybatisGeneratorConfig.xml文件中添加下面这句配置即可。
<!--more-->

``` xml
<plugin type="org.mybatis.generator.ext.plugin.MySQLPaginationPlugin"/>
```

``` java
package org.mybatis.generator.ext.plugin;

/**
* Created by calcyu on 2015/10/8.
*/

import org.mybatis.generator.api.CommentGenerator;
import org.mybatis.generator.api.IntrospectedTable;
import org.mybatis.generator.api.PluginAdapter;
import org.mybatis.generator.api.dom.java.*;
import org.mybatis.generator.api.dom.xml.Attribute;
import org.mybatis.generator.api.dom.xml.TextElement;
import org.mybatis.generator.api.dom.xml.XmlElement;

import java.util.List;
/**
* MySQL 分页生成插件。
*
*/
public final class MySQLPaginationPlugin extends PluginAdapter {

@Override
public boolean modelExampleClassGenerated(TopLevelClass topLevelClass,
IntrospectedTable introspectedTable) {
// add field, getter, setter for limit clause
addPage(topLevelClass, introspectedTable, "page");
return super.modelExampleClassGenerated(topLevelClass, introspectedTable);
}

@Override
public boolean sqlMapSelectByExampleWithoutBLOBsElementGenerated(XmlElement element,
IntrospectedTable introspectedTable) {
XmlElement page = new XmlElement("if");
page.addAttribute(new Attribute("test", "page != null"));
page.addElement(new TextElement("limit #{page.offset} , #{page.pageSize}"));
element.addElement(page);

return super.sqlMapUpdateByExampleWithoutBLOBsElementGenerated(element, introspectedTable);
}

/**
* @param topLevelClass
* @param introspectedTable
* @param name
*/
private void addPage(TopLevelClass topLevelClass, IntrospectedTable introspectedTable,
String name) {
topLevelClass.addImportedType(new FullyQualifiedJavaType(
"com.calcyu.core.dao.page.PagerModel"));
CommentGenerator commentGenerator = context.getCommentGenerator();
Field field = new Field();
field.setVisibility(JavaVisibility.PROTECTED);
field.setType(new FullyQualifiedJavaType("com.calcyu.core.dao.page.PagerModel"));
field.setName(name);
commentGenerator.addFieldComment(field, introspectedTable);
topLevelClass.addField(field);
char c = name.charAt(0);
String camel = Character.toUpperCase(c) + name.substring(1);
Method method = new Method();
method.setVisibility(JavaVisibility.PUBLIC);
method.setName("set" + camel);
method.addParameter(new Parameter(new FullyQualifiedJavaType(
"com.calcyu.core.dao.page.PagerModel"), name));
method.addBodyLine("this." + name + "=" + name + ";");
commentGenerator.addGeneralMethodComment(method, introspectedTable);
topLevelClass.addMethod(method);
method = new Method();
method.setVisibility(JavaVisibility.PUBLIC);
method.setReturnType(new FullyQualifiedJavaType("com..PagerModel"));
method.setName("get" + camel);
method.addBodyLine("return " + name + ";");
commentGenerator.addGeneralMethodComment(method, introspectedTable);
topLevelClass.addMethod(method);
}

/**
* This plugin is always valid - no properties are required
*/
public boolean validate(List warnings) {
return true;
}
}
```