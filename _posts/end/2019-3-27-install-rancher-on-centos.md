---
title: Spring cloud（八）：分布式集群部署环境搭建
tag:
- java
- spring
- spring cloud
- rancher
- centos
- docker
- kernel
---

## 什么是Rancher

Rancher是一个开源的企业级容器管理平台。通过Rancher，企业再也不必自己使用一系列的开源软件去从头搭建容器服务平台。Rancher提供了在生产环境中使用的管理Docker和Kubernetes的全栈化容器部署与管理平台。

## 为什么需要Rancher
在原来, 如果我们需要做一个分布式集群我们需要学习一全套的框架并编码实现如 服务发现, 负载均衡等逻辑, 给开发者造成很大的负担, 不过好在现在有Docker以及他周边的一些技术能在上层解决这些问题, 而应用该怎么开发就怎么开发.
当你选择使用Docker技术栈的时候, 会发现在生产环境中不光光是 docker run就能解决的. 还需要考虑比如docker之间的组网, 缩扩容等问题, 于是你去学习kubernetes, 发现好像有点复杂啊, 有没有更傻瓜化一点的? 那就是rancher了.

## 安装步骤

### 1、安装环境
**Centos版本**
```
[root@localhost ~]# cat /etc/redhat-release
CentOS Linux release 7.0.1406 (Core)
```
**Docker版本**
> 18.09.3

```
[root@localhost ~]# docker version
Client:
 Version:           18.09.3
 API version:       1.39
 Go version:        go1.10.8
 Git commit:        774a1f4
 Built:             Thu Feb 28 06:33:21 2019
 OS/Arch:           linux/amd64
 Experimental:      false

Server: Docker Engine - Community
 Engine:
  Version:          18.09.3
  API version:      1.39 (minimum version 1.12)
  Go version:       go1.10.8
  Git commit:       774a1f4
  Built:            Thu Feb 28 06:02:24 2019
  OS/Arch:          linux/amd64
  Experimental:     false

```
**Rancher版本** 
> 1.6.26

[Rancher和Docker版本兼容对照表](https://rancher.com/docs/rancher/v1.6/en/hosts/#supported-docker-versions)

> 声明：本教程是在该环境下安装的，不同环境肯定有问题，甚至多一个版本都会有妖怪出现。本教程是凯哥经过了三四个日日夜夜，踏平无数个大小坑而整理出来的。

### 2、安装docker
2.1、 安装仓库配置工具
```
yum install -y yum-utils device-mapper-persistent-data lvm2
```
2.2、添加docker仓库
```
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

2.3、安装docker
查看可安装版本
```
yum list docker-ce --showduplicates | sort -r
```
这里安装 ` docker-ce ` 当前最新版本`3:18.09.3-3.el7`
```
yum install docker-ce docker-ce-cli containerd.io
```

2.4、查看版本号  
```
docker version
```
运行结果：
```
[root@localhost ~]# docker version
Client:
 Version:           18.09.3
 API version:       1.39
 Go version:        go1.10.8
 Git commit:        774a1f4
 Built:             Thu Feb 28 06:33:21 2019
 OS/Arch:           linux/amd64
 Experimental:      false
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?

```
`Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?`是因为还没有启动docker

2.5、启动docker
```
[root@localhost ~]# systemctl start docker
```

启动报错：
```
Job for docker.service failed because the control process exited with error code.
See "systemctl status docker.service" and "journalctl -xe" for details.
```
解决办法：

升级`xfsprogs`，再尝试启动
```
yum update xfsprogs
```
这是一个神奇的方法，如果你是先升级xfsprogs的话，那你要先删除再重新安装xfsprogs

如果安装过程出问题，想重装，可以删除以下目录
```
rm -rf /var/lib/docker
rm -rf /run/docker*
rm -rf /etc/docker

```

2.6、查看docker信息
```
[root@localhost ~]# docker version
Client:
 Version:           18.09.3
 API version:       1.39
 Go version:        go1.10.8
 Git commit:        774a1f4
 Built:             Thu Feb 28 06:33:21 2019
 OS/Arch:           linux/amd64
 Experimental:      false

Server: Docker Engine - Community
 Engine:
  Version:          18.09.3
  API version:      1.39 (minimum version 1.12)
  Go version:       go1.10.8
  Git commit:       774a1f4
  Built:            Thu Feb 28 06:02:24 2019
  OS/Arch:          linux/amd64
  Experimental:     false


[root@localhost ~]# docker info
Containers: 0
 Running: 0
 Paused: 0
 Stopped: 0
Images: 0
Server Version: 18.09.3
Storage Driver: devicemapper
...
```

2.7、hello world

运行一个hello world压压惊！
```
[root@localhost ~]# docker run hello-world
```
运行报错：
```
[root@localhost ~]# docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
1b930d010525: Pull complete
Digest: sha256:2557e3c07ed1e38f26e389462d03ed943586f744621577a99efb77324b0fe535
Status: Downloaded newer image for hello-world:latest
docker: Error response from daemon: OCI runtime create failed: container_linux.go:348: starting container process caused "process_linux.go:297: copying bootstrap data to pipe caused \"write init-p: broken pipe\"": unknown.
ERRO[0010] error waiting for container: context canceled
```
刚想压压惊，错误又来了，而且还是一个很严重的错误。
docker官方论坛上有人提出了这个[问题](https://forums.docker.com/t/centos7-docker-hello-world-fails/68941/6)

解决办法:

[更新内核](https://www.tecmint.com/install-upgrade-kernel-version-in-centos-7/)

2.7.1、添加内核repo
```
rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org
rpm -Uvh http://www.elrepo.org/elrepo-release-7.0-3.el7.elrepo.noarch.rpm 
```

这时又会报错如下：
```
[root@localhost ~]# rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org
curl: (35) Cannot communicate securely with peer: no common encryption algorithm(s).
error: https://www.elrepo.org/RPM-GPG-KEY-elrepo.org: import read failed(2).

```
解决方法：升级`curl`
```
yum update curl
```
完成内核repo的添加，继续升级内核

2.7.2、查看可安装内核
```
yum --disablerepo="*" --enablerepo="elrepo-kernel" list available
```

2.7.3、安装内核
```
yum --enablerepo=elrepo-kernel install kernel-ml
```

2.7.4、查看系统可选择内核及编号
```
sudo awk -F\' '$1=="menuentry " {print i++ " : " $2}' /etc/grub2.cfg
```

2.7.5、设置默认启动内核
```
grub2-set-default 0
```
2.7.6、生成grub2配置文件
```
grub2-mkconfig -o /boot/grub2/grub.cfg
```

终于可以运行`docker run hello-world`，吃根辣条压压惊了！！


2.8、设置开机自启动
```
# 设置开机启动
systemctl enable docker
# 禁止开机启动
systemctl disable docker
# 查看启动列表
systemctl list-unit-files|grep enabled
```

到此docker已经安装完毕！

### 3、安装Rancher

3.1 修改镜像

> 为了加快rancher的下载速度，把docker的镜像修改为： 
[中国docker镜像加速](https://www.docker-cn.com/registry-mirror)

编辑`/etc/docker/daemon.json`文件
```
vi /etc/docker/daemon.json
```
添加如下内容
```
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
```
更新镜像并重启docker
```
systemctl daemon-reload
systemctl restart docker
```

3.2 安装rancher-server
```
docker run -d --restart=unless-stopped -p 8080:8080 rancher/server:stable
```
过一会，等rancher启动，浏览器中访问`http://193.168.1.189:8080`，右下角可以选择中文版本。
如图：
![]({{ "/assets/image/install-rancher/1.png" | prepend: site.baseurl }})



3.3 安装rancher-agent  

> 安装rancher-agent代理，也就是部署服务的主机

1、 添加主机

点击上图中的`添加主机`按钮，进入如图页面：
![]({{ "/assets/image/install-rancher/2.png" | prepend: site.baseurl }})
点击`保存`进入主机配置页面
![]({{ "/assets/image/install-rancher/3.png" | prepend: site.baseurl }})
输入主机ip地址，复制生成的脚本，在主机中运行。
```
docker run -e CATTLE_AGENT_IP="193.168.1.162"  --rm --privileged -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/rancher:/var/lib/rancher rancher/agent:v1.2.11 http://193.168.1.189:8080/v1/scripts/AED58989A5B749C89BD8:1546214400000:aPUteFcsD8g2vIhmkirh810DNo
```
> 注意不能直接复制，你主机的ip和我的不同

安装成功后如图：
![]({{ "/assets/image/install-rancher/4.png" | prepend: site.baseurl }})

### 小结
安装过程中主要遇到的就是内核问题，可以提前修复打包至虚拟机镜像中。

### 参考：  
[https://blog.csdn.net/kikajack/article/details/79396793](https://blog.csdn.net/kikajack/article/details/79396793)  
[https://docs.docker.com/install/linux/docker-ce/centos/#prerequisites](https://docs.docker.com/install/linux/docker-ce/centos/#prerequisites)  
[https://www.jianshu.com/p/3a492440c89b](https://www.jianshu.com/p/3a492440c89b)
