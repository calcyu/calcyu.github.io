---
title: centos7.0安装rabbitMQ
tag: 
- centos
- erlang
- rabbitmq
- rpm
- systemctl
---

## 简介
RabbitMQ 是实现了高级消息队列协议（AMQP）的开源消息代理软件。RabbitMQ 服务器是用 Erlang 语言编写的，所以下面要安装 RabbitMQ 需要安装 Erlang。

## 安装环境
```bash
cat /etc/redhat-release
CentOS Linux release 7.0.1406 (Core)
```
> yum和rpm安装方式各有优缺点，以下为rpm安装方式，yum要更新repos相对麻烦一些。

## 安装Erlang
### 1. 下载rpm安装包
```bash
wget http://www.rabbitmq.com/releases/erlang/erlang-19.0.4-1.el7.centos.x86_64.rpm
```
### 2. 安装erlang
```bash
rpm -ivh erlang-19.0.4-1.el7.centos.x86_64.rpm
```
### 3. 检查erlang是否安装成功
```bash
erl -version
```
## 安装rabbitMQ
### 1. 下载rabbitMQ安装包
```bash
wget http://www.rabbitmq.com/releases/rabbitmq-server/v3.6.10/rabbitmq-server-3.6.10-1.el7.noarch.rpm
```
### 2. 安装rabbitMQ
```bash
rpm -ivh rabbitmq-server-3.6.10-1.el7.noarch.rpm
```
> RPM更多命令：[查看](http://geek5.cn/blog/2018/06/30/Centos-cmd.html#fiytp)

> 如果喜欢踩坑，可以尝试安装不同的版本
    

### 启动rabbitMQ
```bash
rabbitmq-server start

#后台运行
rabbitmq-server -detached
```
## 安装网页管理插件
```bash
rabbitmq-plugins enable rabbitmq_management
```    
## 访问WEB管理界面
http://192.168.0.103:15672/

> 默认初始用户名:guest 密码:guest，如果是远程访问用不了，只有本地访问才能用guest

## rabbitMQ用户管理基本命令
```bash
# 查看用户列表
rabbitmqctl list_users
# 创建用户
rabbitmqctl add_user admin admin
# 授予管理员（administrator）角色
rabbitmqctl set_user_tags admin administrator
# 授予虚拟主机访问权
rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"
# 删除一个用户
rabbitmqctl delete_user guest
# 修改用户密码
rabbitmqctl change_password admin newpassword
```    

## rabbitMQ常用命令
```bash
# 停止rabbitMQ
rabbitmqctl stop
# 查看状态
rabbitmqctl status
# 查看消息队列
rabbitmqctl list_queues
# 清除所有队伍
rabbitmqctl reset
# 插件列表 
rabbitmq-plugins list
```

## centos7防火墙设置
```bash
# web管理页面端口
firewall-cmd --add-port=15672/tcp --permanent
# AMQP高级消息队列协议端口
firewall-cmd --add-port=5672/tcp --permanent
firewall-cmd --reload
```

## 设置开机启动
```bash
# 设置开机启动
systemctl enable rabbitmq-server
# 禁止开机启动
systemctl disable rabbitmq-server
# 查看启动列表
systemctl list-unit-files|grep enabled
```

## 解决使用systemctl启动失败的错误
```bash
vim /etc/selinux/config
```

把参数SELINUX由enabled修改为disabled
```bash
SELINUX=disabled
```
