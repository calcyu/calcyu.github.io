---
layout: post
title: GIT如何删除错误提交的文件
categories: GIT
tags: GIT
---
## 思路：
 - 创建和切换至临时分支
 - 删除误提交文件
 - 提交修改的内容
 - 切换至主线
 - 重组分支到主线版本
 - 删除临时分支运动

<!--more-->

运行下面的git命令

``` bash
#创建和切换至临时分支
git checkout -b tempbranch <sha1-of-merge>

#删除误提交文件
git rm somefile

#提交修改的内容
git commit --amend

#切换至主线
git checkout master

#重组分支到主线版本
git rebase tempbranch

#删除临时分支运动
git branch -d tempbranch
```
