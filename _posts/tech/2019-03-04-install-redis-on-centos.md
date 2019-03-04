---
title: centos7.0安装redis5.0
tag:
- centos
- redis
- epel
- remi
- redis-cli
- firewall
---
#### 简介
 Redis是一个开源的使用ANSI C语言编写、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库，并提供多种语言的API。从2010年3月15日起，Redis的开发工作由VMware主持。从2013年5月开始，Redis的开发由Pivotal赞助。


#### Centos版本
 ```
 [root@localhost ~]# cat /etc/redhat-release
CentOS Linux release 7.0.1406 (Core)
 ```
#### 更新yum源
 因为yum默认源软件不全或者版本过低，可以通过安装epel和remi源来安装最新版本的软件
##### 安装epel源
 ```
 yum install epel-release
 ```
##### 安装remi源
 ```
 # centos7版本对应的源
 yum install -y http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
 ```
 > remi默认开启的是remi-safe源，所有要做些修改
 
 修改配置文件
 ```
 vim /etc/yum.repos.d/remi.repo
 ```
##### 验证查看可用源
 ```
 yum repolist enabled
 ```
 > 可以看到remi和epel说明安装成功
 
#### 安装redis
 ```
 yum install -y redis
 ```
#### redis基本命令
```
# 启动
systemctl start redis
# 停止
systemctl stop redis
# 查看运行状态
systemctl status redis
# 重启
systemctl restart redis
# 开机启动
systemctl enable redis
# 开机禁用
systemctl disable redis
```
#### 命令行工具redis-cli基本使用验证
```
# 启动redis-cli
redis-cli 
```
####  redis-cli基本命令
```
127.0.0.1:6379> set msg "hello world"
OK
127.0.0.1:6379> get msg
"hello world"
```

#### 开启远程连接
修改配置文件redis.conf
```
vim /etc/redis.conf
```
把第69行`bind 127.0.0.1`注解或是修改为`bind 0.0.0.0`
重新redis
```
systemctl restart redis
```

#### 防火墙设置
> redis默认端口是6379

```
# web管理页面端口
firewall-cmd --add-port=6379/tcp --permanent
firewall-cmd --reload
```

