---
layout: post
title: 解决laravel新建项目时，提示输入TOKENS的问题
tags:
  - composer
  - github
  - laravel
  - token
categories:
  - B/S(ERP OA)
  - PHP
---

解决LARAVEL新建项目时，提示输入TOKENS的问题
``` bash
Could not fetch https://api.github.com/repos/RobinHerbots/jquery.inputmask/commits/b8f06eef3ccf9b8009607f30d47f66133670afc2, please create a GitHub OAuth token to go over the API rate limit
<!--more-->
Head to https://github.com/settings/tokens/new?scopes=repo&description=Composer on calcyu 2016-02-24 0639
to retrieve a token. It will be stored in " C:\Users\calcyu\AppData\Roaming\Composer\auth.json" for future use by Composer.

Token (hidden):
```
直接访问错误提示的地址
```
https://github.com/settings/tokens/new?scopes=repo&description=Composer on calcyu 2016-02-24 0639
```
获取TOKENS值，没有GITHUB账号的需要注册，登陆后点击Generate new token生成TOKENS值

执行以下命令：
``` bash
composer config -g github-oauth.github.com xxxx
```
命令中的 ```xxxx``` 修改为你获取的TOKENS值


目录```C:\Users\calcyu\AppData\Roaming\Composer```中的auth.json会增加github授权的TOKENS值

``` json
{

"http-basic": {},

"github-oauth": {

"github.com": "286e574371121ae8bad1c4bf1541a24aaa5a7"},

"gitlab-oauth": {}

}
```
理论上你把获取到的TOKENS值，按照上面的内容进行修改也是可以的。因为要删除缓存所以没有测试直接修改是否可行，有兴趣的同学可以试一下