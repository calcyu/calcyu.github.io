---
layout: post
title: algolia自动更新文章索引
categories:
  - gh-pages
tags:
  - github
  - gh-pages
---


### 增加.travis.yml配置文件


```bash
# .travis.yml
# This file should be at the root of your project
language: ruby
cache: bundler
script:
  - bundle exec jekyll algolia
branches:
  only:
    # Change this to gh-pages if you're deploying using the gh-pages branch
    - master
rvm:
 - 2.4

```   

### travis官网配置项目   

 [travis-ci](https://travis-ci.org)

找到你的gh-pages的项目，项目名称为github账号名.github.io
1. 点击设置
2. 勾选 `Build only if .travis.yml is present`
3. 增加环境变量`ALGOLIA_API_KEY`,值在[algolia官网](https://www.algolia.com/apps/)查找`Admin API Key`


