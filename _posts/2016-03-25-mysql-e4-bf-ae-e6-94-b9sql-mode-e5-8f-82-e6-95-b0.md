---
layout: post
title: mysql 修改sql_mode参数
tags:
  - mysql
id: 123
categories:
  - MYSQL
date: 2016-03-25 13:38:02
---

mysql报错
`ERROR 1067 (42000): Invalid default value`

命令行进入mysql
输入：
`show variables like 'sql_mode';`

如果 value 值中包括：
`NO_ZERO_IN_DATE,NO_ZERO_DATE`

去除这两个值
运行：
`set @@sql_mode='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';`