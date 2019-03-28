---
title: Spring cloud（九）：Rancher中部署分布式集群服务
tag:
- java
- spring
- spring cloud
- rancher
- aliyun
- docker
- Dockerfile
---


### 打包项目
```bash
mvn package -Dmaven.test.skip=true
```
### 打包docker容器

1、创建Dockerfile
```bash
FROM hub.c.163.com/library/java:8-alpine

MAINTAINER calcyu calcyu@qq.com

ADD target/*.jar app.jar

EXPOSE 8761

ENTRYPOINT ["java","-jar","/app.jar"]
```

2、打包成docker镜像
```bash
docker build -t springcloud/eureka .
```

3、查看镜像容器
```bash
docker images
```

4、运行容器
```bash
docker run -p 8761:8761 -d springcloud/eureka
```

5、查看运行进程
```bash
docker ps
```

### 推送至阿里云仓库

1、注册账号
> 本来是用网易云仓库的，没认证不让推送->后台显示系统在升级又不让认证->无解->用阿里云镜像仓库   

2、创建镜像仓库

![]({{ "/assets/image/deploy-in-rancher/1.png" | prepend: site.baseurl }})

3、登录阿里云镜像仓库

```bash
docker login --username=登录用户名 registry.cn-hangzhou.aliyuncs.com
Password:
WARNING! Your password will be stored unencrypted in C:\Users\Administrator\.docker\config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

Login Succeeded

```

4、标记本地镜像
```bash
#sudo docker tag [ImageId] registry.cn-hangzhou.aliyuncs.com/calcyu/springcloud:[镜像版本号]
docker tag springcloud/eureka registry.cn-hangzhou.aliyuncs.com/calcyu/springcloud:1.0-eureka
```

5、推送镜像至网易云仓库
```bash
#docker push registry.cn-hangzhou.aliyuncs.com/calcyu/springcloud:[镜像版本号]
docker push registry.cn-hangzhou.aliyuncs.com/calcyu/springcloud:1.0-eureka
```

### rancher中安装镜像

1、创建应用
> 应用中包含多个服务

![]({{ "/assets/image/deploy-in-rancher/2.png" | prepend: site.baseurl }})

2、 添加服务

> 创建的服务用来部署我们打包好的docker容器

![]({{ "/assets/image/deploy-in-rancher/3.png" | prepend: site.baseurl }})
![]({{ "/assets/image/deploy-in-rancher/4.png" | prepend: site.baseurl }})

3、监控程序的运行

> 服务详情页面可以监控程序的一些运行情况，如：CPU\内存\ 网络\存储等，还可以查看应用日志和进入容器执行命令等。

![]({{ "/assets/image/deploy-in-rancher/5.png" | prepend: site.baseurl }})
