---
title: docker基本命令使用说明
tag:
- docker
- command
---
## 什么是Docker
Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。容器是完全使用沙箱机制，相互之间不会有任何接口。

## 基本命令使用说明

1.查看正在运行的容器
```bash
$ sudo docker ps
```
2.查看所有的容器
```bash
$ sudo docker ps -a
```
3.查看本地镜像
```bash
$ sudo docker images
```
4.从镜像中运行/停止一个新实例
```bash
$ sudo docker run/stop --help

$ sudo docker run/stop container
```
5.避免输出Sudo

这里把当前用户加入到docker组就可以直接使用命令，而不用每次都加sudo
```bash
$ sudo groupadd docker
```
#改完后需要重新登陆用户
```bash
$ sudo gpasswd -a ${USER} docker
```
6.Docker版本
```bash
$ sudo docker --version
```
7.搜索Docker Image
```bash
$ docker search tutorial
```
搜索网址是：index.docker.io [国内无法访问]

其他网址是：https://hub.docker.com/

8.通过docker命令下载tutorial镜像
```bash
$ docker pull learn/tutorial
```
9.从指定image里生成一个container并在其中运行一个命令
```bash
$ docker run [image] [cmd]
```
10.在container里运行交互式命令，比如shell
```bash
$ docker run -i -t [image] [cmd]

$ docker run -i -t ubuntu /bin/bash
```
11.在container里运行后台任务
```bash
$ docker run -d [image] [cmd]
```
12.列出最近一个运行过的container

不加-l则只列出正在运行的container（比如后台任务）
```bash
$ docker ps -l
```
13.列出所有container
```bash
$ docker ps -a
```
14.查看container详情
```bash
$ docker inspect [container]
```
15.删除某个container

其中container_id不需要输入完整，只要能保证唯一即可。

运行中的Docker容器是无法删除的，必须先通过docker stop或者docker kill命令停止。
```bash
$ docker rm [container]

$ docker rm `docker ps -a -q` 删除所有容器，-q表示只返回容器的ID
```
16.再次运行某个container
```bash
$ docker start [container]
```
17.查看某个container的运行日志
```bash
$ docker logs [container]

$ docker logs -f [container] 类似tailf
```
18.切换到后台任务container, 需要当前容器正常运行

注意：切换到后台任务以后无法用Ctrl-C退出
```bash
$ docker attach [container]
```
19.中止后台任务container
```bash
$ docker stop [container]
```
20.将container保存为一个image
```bash
$ docker commit [container] [image_name]
```
21.将image上传到仓库
```bash
$ docker push [image_name]
```
22.删除images
```bash
$ docker rmi [image id]
```
23.为容器指定名称，容器的名称是唯一
```bash
$ docker run --name edison -i -t ubuntu /bin/bash
```
24.有三种方式可以唯一指代容器

短UUID: 716d3c16dc65（12位）

长UUID：716d3c16dc654230ada14f555faadd036474231dfca0ca44b597574a5c618565（64位）

名称: edison

25.当前Docker宿主机的信息
```bash
$ docker info
```
26.查看容器内部的进程信息
```bash
$ docker top [container]
```
27.在容器中运行后台任务，只对正在运行的容器有效。
```bash
$ docker exec -d [container] [cmd]

$ docker exec -d edison touch /home/haha
```
28.在容器中运行交付式任务，只对正在运行的容器有效。
```bash
$ docker exec -t -i edison /bin/bash
```
> 注：在/var/lib/docker中，可以查看Docker Image、Container和Volumes等细节信息。

**参考**   
[https://www.cnblogs.com/edisonxiang/p/6068212.html](https://www.cnblogs.com/edisonxiang/p/6068212.html)