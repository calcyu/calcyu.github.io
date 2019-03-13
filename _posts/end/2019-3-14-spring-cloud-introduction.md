---
title: Spring cloud（一）：微服务基本概念
tag:
- java
- spring
- spring cloud
---

## 提出微服务概念

- 首先提出微服务的两个人James Lewis 和 Martin Fowler，2014年3月25日写的[《Microservices》](https://martinfowler.com/articles/microservices.html)



> 原文中强调的几点内容
- 一系列微小的服务共同组成
- 跑在自己的进程里
- 每个服务为独立的业务开发
- 独立部署
- 分布式的管理

![](https://note.youdao.com/yws/public/resource/abd1cb1752149b111d0ce724b0e1c717/xmlnote/FAC77AE12703499BA3E15A9074E19DDC/26343) ![](https://note.youdao.com/yws/public/resource/abd1cb1752149b111d0ce724b0e1c717/xmlnote/165A00E3B8E445DDAEF443A110F02AE0/26345)


## 系统演变过程
![](https://note.youdao.com/yws/public/resource/abd1cb1752149b111d0ce724b0e1c717/xmlnote/85DCA0EFD42740CB8801E043BF5D36DE/26195)


## 单体架构的缺点
- 部署不灵活
- 稳定性不高
- 扩展性不够


## 微服务主流解决方法

- 阿里系
    - Dubbo
    - Zookeeper
    - SpringBoot

- Spring系
    - Spring Cloud Netflix Eureka
    - Spring Boot

## 什么是Spring Cloud

Spring Cloud是一系列框架的有序集合。它利用Spring Boot的开发便利性巧妙地简化了分布式系统基础设施的开发，如服务发现注册、配置中心、消息总线、负载均衡、断路器、数据监控等，都可以用Spring Boot的开发风格做到一键启动和部署。Spring并没有重复制造轮子，它只是将目前各家公司开发的比较成熟、经得起实际考验的服务框架组合起来，通过Spring Boot风格进行再封装屏蔽掉了复杂的配置和实现原理，最终给开发者留出了一套简单易懂、易部署和易维护的分布式系统开发工具包。

是一个开发工具集，由多个开源子项目组成
- Spring Cloud项目依赖Spring Boot(搭建配置项目简单)
- 基于Netflix开源项目进行两次封装
- Spring Cloud简化了分布式开发
> 掌握如何使用，更要理解分布式、架构的特点



## 优势
微服务的框架那么多比如：dubbo、Kubernetes，为什么就要使用Spring Cloud的呢？

1. 产出于spring大家族，spring在企业级开发框架中无人能敌，来头很大，可以保证后续的更新、完善。比如dubbo现在就差不多死了
2. 有Spring Boot 这个独立干将可以省很多事，大大小小的活Spring Boot都搞的挺不错。
3. 作为一个微服务治理的大家伙，考虑的很全面，几乎服务治理的方方面面都考虑到了，方便开发开箱即用。
4. Spring Cloud 活跃度很高，教程很丰富，遇到问题很容易找到解决方案
5. 轻轻松松几行代码就完成了熔断、均衡负载、服务中心的各种平台功能
Spring Cloud对于中小型互联网公司来说是一种福音，因为这类公司往往没有实力或者没有足够的资金投入去开发自己的分布式系统基础设施，使用Spring Cloud一站式解决方案能在从容应对业务发展的同时大大减少开发成本。同时，随着近几年微服务架构和Docker容器概念的火爆，也会让Spring Cloud在未来越来越“云”化的软件开发风格中立有一席之地，尤其是在目前五花八门的分布式解决方案中提供了标准化的、全站式的技术方案，意义可能会堪比当前Servlet规范的诞生，有效推进服务端软件系统技术水平的进步。


## 集群和分布式的区别

### 集群部署
单体应用开发模式是把整个系统部署在一个web容器中，如果这个容器挂了，整个系统就蹦了。
所以有人就想到了集群部署，即一个容器不够，那我就运行两个，或者更多，再通过反向代理软件如nginx来进行路由转发，我们把这种对整个系统进行横向的复杂称为集群部署。
![](https://note.youdao.com/yws/public/resource/abd1cb1752149b111d0ce724b0e1c717/xmlnote/7BA34793C2DD41E995A4892F30C67DB4/27939)

### 分布式部署
把一个完整的系统拆分成若干个子功能，分别部署至不同容器中，我们称为分布式部署。
![](https://note.youdao.com/yws/public/resource/abd1cb1752149b111d0ce724b0e1c717/xmlnote/B7F8BFF7703D4BA2B077E25936507544/27955)


## spring cloud 帝国成员

### pring Cloud Netflix
这可是个大boss，地位仅次于老大，老大各项服务依赖与它，与各种Netflix OSS组件集成，组成微服务的核心，它的小弟主要有Eureka, Hystrix, Zuul, Archaius… 太多了

### Netflix Eureka

服务中心，云端服务发现，一个基于 REST 的服务，用于定位服务，以实现云端中间层服务发现和故障转移。这个可是springcloud最牛鼻的小弟，服务中心，任何小弟需要其它小弟支持什么都需要从这里来拿，同样的你有什么独门武功的都赶紧过报道，方便以后其它小弟来调用；它的好处是你不需要直接找各种什么小弟支持，只需要到服务中心来领取，也不需要知道提供支持的其它小弟在哪里，还是几个小弟来支持的，反正拿来用就行，服务中心来保证稳定性和质量。

### Netflix Hystrix

熔断器，容错管理工具，旨在通过熔断机制控制服务和第三方库的节点,从而对延迟和故障提供更强大的容错能力。比如突然某个小弟生病了，但是你还需要它的支持，然后调用之后它半天没有响应，你却不知道，一直在等等这个响应；有可能别的小弟也正在调用你的武功绝技，那么当请求多之后，就会发生严重的阻塞影响老大的整体计划。这个时候Hystrix就派上用场了，当Hystrix发现某个小弟不在状态不稳定立马马上让它下线，让其它小弟来顶上来，或者给你说不用等了这个小弟今天肯定不行，该干嘛赶紧干嘛去别在这排队了。

### Netflix Zuul

Zuul 是在云平台上提供动态路由,监控,弹性,安全等边缘服务的框架。Zuul 相当于是设备和 Netflix 流应用的 Web 网站后端所有请求的前门。当其它门派来找大哥办事的时候一定要先经过zuul,看下有没有带刀子什么的给拦截回去，或者是需要找那个小弟的直接给带过去。

### Netflix Archaius

配置管理API，包含一系列配置管理API，提供动态类型化属性、线程安全配置操作、轮询框架、回调机制等功能。可以实现动态获取配置， 原理是每隔60s（默认，可配置）从配置源读取一次内容，这样修改了配置文件后不需要重启服务就可以使修改后的内容生效，前提使用archaius的API来读取。

### Spring Cloud Config
俗称的配置中心，配置管理工具包，让你可以把配置放到远程服务器，集中化管理集群配置，目前支持本地存储、Git以及Subversion。就是以后大家武器、枪火什么的东西都集中放到一起，别随便自己带，方便以后统一管理、升级装备。

### Spring Cloud Bus
事件、消息总线，用于在集群（例如，配置变化事件）中传播状态变化，可与Spring Cloud Config联合实现热部署。相当于水浒传中日行八百里的神行太保戴宗，确保各个小弟之间消息保持畅通。

### Spring Cloud for Cloud Foundry
Cloud Foundry是VMware推出的业界第一个开源PaaS云平台，它支持多种框架、语言、运行时环境、云平台及应用服务，使开发人员能够在几秒钟内进行应用程序的部署和扩展，无需担心任何基础架构的问题

其实就是与CloudFoundry进行集成的一套解决方案，抱了Cloud Foundry的大腿。

### Spring Cloud Cluster 【集群】
Spring Cloud Cluster将取代Spring Integration。提供在分布式系统中的集群所需要的基础功能支持，如：选举、集群的状态一致性、全局锁、tokens等常见状态模式的抽象和实现。

如果把不同的帮派组织成统一的整体，Spring Cloud Cluster已经帮你提供了很多方便组织成统一的工具。

### Spring Cloud Consul
Consul 是一个支持多数据中心分布式高可用的服务发现和配置共享的服务软件,由 HashiCorp 公司用 Go 语言开发, 基于 Mozilla Public License 2.0 的协议进行开源. Consul 支持健康检查,并允许 HTTP 和 DNS 协议调用 API 存储键值对.

### Spring Cloud Consul   
封装了Consul操作，consul是一个服务发现与配置工具，与Docker容器可以无缝集成。

