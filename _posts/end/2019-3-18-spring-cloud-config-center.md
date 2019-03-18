---
title: Spring cloud（五）：统一配置中心
tag:
- java
- spring
- spring cloud
- config
---


随着线上项目变的日益庞大，每个项目都散落着各种配置文件，如果采用分布式的开发模式，需要的配置文件随着服务增加而不断增多。某一个基础服务信息变更，都会引起一系列的更新和重启，运维苦不堪言也容易出错。配置中心便是解决此类问题的灵丹妙药。

市面上开源的配置中心有很多，BAT每家都出过，360的QConf、淘宝的diamond、百度的disconf都是解决这类问题。国外也有很多开源的配置中心Apache Commons Configuration、owner、cfg4j等等。这些开源的软件以及解决方案都很优秀，但是我最钟爱的却是Spring Cloud Config，因为它功能全面强大，可以无缝的和spring体系相结合，够方便够简单颜值高我喜欢。


## Spring Cloud Config

在我们了解spring cloud config之前，我可以想想一个配置中心提供的核心功能应该有什么

- 提供服务端和客户端支持
- 集中管理各环境的配置文件
- 配置文件修改之后，可以快速的生效
- 可以进行版本管理
- 支持大的并发查询
- 支持各种语言

Spring Cloud Config可以完美的支持以上所有的需求。

Spring Cloud Config项目是一个解决分布式系统的配置管理方案。它包含了Client和Server两个部分，server提供配置文件的存储、以接口的形式将配置文件的内容提供出去，client通过接口获取数据、并依据此数据初始化自己的应用。Spring cloud使用git或svn存放配置文件，默认情况下使用git，我们先以git为例做一套示例。


首先在github上面创建了一个项目config-repo用来存放配置文件，为了模拟开发生产测试环境，我们创建以下四个配置文件：


``` properties
// 开发环境
robot-dev.properties
// 测试环境
robot-test.properties
// 生产环境
robot-pro.properties
// 以上配置文件中共同内容
robot.properties
```

为了验证不同环境下，可以加载不同的配置值，每个环境中都添加`server.port`这个值来修改tomcat的启动端口。这样可以比较直观的看到程序读取了不同的配置。


## server 端

### 1、 创建项目`spring-cloud-config-server`

### 2、添加依赖

``` xml
<dependencies>
	<dependency>
		<groupId>org.springframework.cloud</groupId>
		<artifactId>spring-cloud-config-server</artifactId>
	</dependency>
	<dependency>
		<groupId>org.springframework.cloud</groupId>
		<artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
	</dependency>
</dependencies>
```

### 3、配置文件

``` properties
spring.application.name=spring-cloud-config-server
spring.cloud.config.server.git.uri=https://github.com/calcyu/config-repo
spring.cloud.config.server.git.username=calcyu
spring.cloud.config.server.git.password=密码
#远程配置项目的本地缓存目录，注意不要指定为项目根目录，会把项目代码全部删除
spring.cloud.config.server.git.basedir=./config/basedir
eureka.client.service-url.defaultZone=http://localhost:8000/eureka/

```

### 4、启动类

启动类添加```@EnableConfigServer```，激活对配置中心的支持

``` java
@EnableConfigServer
@SpringBootApplication
public class ConfigServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConfigServerApplication.class, args);
	}
}
```

到此server端相关配置已经完成

### 5、测试

首先我们先要测试server端是否可以读取到github上面的配置信息，直接访问：```http://localhost:8080/robot-dev.yml```

返回信息如下：

```
eureka:
  client:
    service-url:
      defaultZone: http://localhost:8000/eureka/
mysql:
  password: 321
  username: root
password: 123
server:
  port: 9090
spring:
  application:
    name: robot
  rabbitmq:
    host: 192.168.190.187
    password: admin
    port: 5672
    username: admin
username: meimei
```

上述的返回的信息包含了配置文件的位置、版本、配置文件的名称以及配置文件中的具体内容，说明server端已经成功获取了git仓库的配置信息。

可以修改扩展名来返回不同格式的配置信息
例如：
```
http://localhost:8080/robot-dev.properties
http://localhost:8080/robot-dev.yml
http://localhost:8080/robot-dev.json
http://localhost:8080/robot-test.properties
http://localhost:8080/robot-test.yml
http://localhost:8080/robot-test.json
http://localhost:8080/robot-pro.properties
http://localhost:8080/robot-pro.yml
http://localhost:8080/robot-pro.json
```
 > git服务器上只保存了一种格式的文件，配置中心会帮我们转换成json和yml格式
 
### 本地管理配置文件
 
Spring Cloud Config也提供本地存储配置的方式。
把配置文件修改为
```
spring.application.name=spring-cloud-config-server
#spring.cloud.config.server.git.uri=https://github.com/calcyu/config-repo
#spring.cloud.config.server.git.username=calcyu
#spring.cloud.config.server.git.password=密码
##远程配置项目的本地缓存目录，注意不要指定为项目根目录，会把项目代码全部删除
#spring.cloud.config.server.git.basedir=./config/basedir
eureka.client.service-url.defaultZone=http://localhost:8000/eureka/
spring.cloud.config.server.native.searchLocations=file:E:/calcyu/config
```
> git相关的远程配置项可以删除或者注释

当客户端发送请求，配置中心会从`E:/calcyu/config`查找对应的配置文件。

虽然Spring Cloud Config提供了这样的功能，但是为了支持更好的管理内容和版本控制的功能，还是推荐使用git的方式。


## client 端

主要展示如何在业务项目中去获取server端的配置信息

创建项目`spring-cloud-robot`

### 1、添加依赖

``` xml
<dependencies>
	<dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
	<dependency>
		<groupId>org.springframework.cloud</groupId>
		<artifactId>spring-cloud-starter-config</artifactId>
	</dependency>
	<dependency>
		<groupId>org.springframework.cloud</groupId>
		<artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
	</dependency>
</dependencies>
```


> 新版本eureka客户端需要引入spring-boot-starter-web包，eureka服务端不需要，自身包含web依赖

### 2、配置文件

把配置文件application.properties改名为bootstrap.properties

配置bootstrap.properties如下：

``` properties
spring.application.name=robot
eureka.client.service-url.defaultZone=http://localhost:8000/eureka/
#从注册中心获取配置中心服务id
spring.cloud.config.discovery.service-id=spring-cloud-config-server
spring.cloud.config.discovery.enabled=true
spring.profiles.active=dev
#默认分支为master
spring.cloud.config.label=master
```

以上配置：客户端会请求`http://localhost:8080/robot-dev.yml`获取配置信息。

- spring.application.name：对应{application}部分  
- spring.profiles.active：对应{profile}部分  
- spring.cloud.config.label：对应git的分支。如果配置中心使用的是本地存储，则该参数无用
- spring.cloud.config.uri：配置中心的具体地址 
- spring.cloud.config.discovery.service-id：指定配置中心的service-id，便于扩展为高可用配置集群。  

> 特别注意：上面这些与spring-cloud相关的属性必须配置在bootstrap.properties中，config部分内容才能被正确加载。因为config的相关配置会先于application.properties，而bootstrap.properties的加载也是先于application.properties。


### 3、启动类

启动类添加```@EnableConfigServer```，激活对配置中心的支持

``` java
@SpringBootApplication
public class ConfigClientApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConfigClientApplication.class, args);
	}
}
```

启动类只需要```@SpringBootApplication```注解就可以

### 4、web测试

创建两个类`MysqlConfig.java`和`GetConfigController.java`  

使用`@ConfigurationProperties("mysql")`定义参数前缀，通过成员变量username和password来获取参数的值

``` java
# MysqlConfig.java
@Component
@ConfigurationProperties("mysql")
public class MysqlConfig {

    private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
```
上面类可以获取以下配置项的值
```yml
mysql:
    username: admin
    password: 123
```



使用```@Value```注解来获取配置中username和password参数的值  

``` java
# GetConfigController.java
@RestController
public class GetConfigController {

    @Value("${username}")
    private String userName;

    @Value("${password}")
    private String password;

    @GetMapping("userinfo")
    public String getUserInfo() {
        return String.format("用户名：%s，密码：%s", userName, password);
    }

    @Autowired
    private MysqlConfig mysqlConfig;

    @GetMapping("mysql")
    public String getMysql() {
        return String.format("用户名：%s，密码：%s", mysqlConfig.getUsername(), mysqlConfig.getPassword());
    }
}

```

启动项目后依次访问：
```
http://desktop-deqbgel:9090/userinfo
http://desktop-deqbgel:9090/mysql
```
如果显示对应的值说明已经正确的从server端获取到了参数，
到此一个完整的服务端提供配置服务，客户端获取配置参数的例子就完成了。

参考：

[springcloud(六)：配置中心git示例](http://www.ityouknow.com/springcloud/2017/05/22/springcloud-config-git.html)

**[示例代码-github](https://github.com/calcyu/spring-cloud-examples/tree/master/Lesson04)**

