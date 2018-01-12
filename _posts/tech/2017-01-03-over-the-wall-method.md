---
title: 国际学习交流方法
tags:
  - 科学上网
  - SHADOWSOCKS
  - PYTHON
  - CONFIG
---

## 环境要求
搬瓦工VPS账号一个
Centos6.5系统
IPhone手机或Android手机一步

## 配置步骤
1. 搬瓦工VPS账号购买和系统安装直接略过，现在购买支持支付宝，简直就是零门槛。
2. 安装shadowsocks  

```bash
yum install epel-release  
yum update  
yum install python-setuptools m2crypto supervisor  
easy_install pip  
pip install shadowsocks
```

3. shadowsocks配置文件 

```bash
vi /etc/shadowsocks.json
```

输入以下JSON内容  

```json
{ 
"server":"VPS服务器IP", 
"server_port":18388, 
"local_address": "127.0.0.1", 
"local_port":1080, 
"password":"客户端连接密码", 
"timeout":600, 
"method":"rc4-md5"
}
```

## 运行服务
```bash
#ssserver -c /etc/shadowsocks.json -d start
#通过参数运行
 ssserver -p 18388 -k geek5 -m rc4-md5 -d start
```

## 停止服务
```bash
 ssserver -c /etc/shadowsocks.json -d stop
```

## 客户端
1. IPhone手机从App store直接下载shadowsocks应用
2. android手机可以从github上下载最新的shadowsocks版本，有兴趣的还可以研究一下客户端代码