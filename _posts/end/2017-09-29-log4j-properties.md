---
title: LOG4J配置详解
tags:
  - LOG4J
  - JAR
  - LOG
---

# LOG4J配置
 
## 新建JAVA项目

## 导入JAR包
在项目中导入log4j-1.2.14.jar包就可以了

## 基本配置文件
在project根目录下，新建log4j.properties。


``` 
##error > warn > info > debug
log4j.rootLogger=debug, stdout, logfile

log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.Target=System.err
log4j.appender.stdout.layout=org.apache.log4j.SimpleLayout

log4j.appender.logfile=org.apache.log4j.FileAppender
log4j.appender.logfile.File=d:/review.log
log4j.appender.logfile.layout=org.apache.log4j.PatternLayout
log4j.appender.logfile.layout.ConversionPattern=%d{yyyy-MM-dd HH\:mm\:ss} %l %F %p %m%n
```
 
## 加载配置文件
PropertyConfigurator.configure("log4j.properties");


## 使用代码的方法配置参数
``` java
private static void initLog4j() {
    Properties prop = new Properties();
    prop.setProperty("log4j.rootLogger", "DEBUG, CONSOLE");
    prop.setProperty("log4j.appender.CONSOLE", "org.apache.log4j.ConsoleAppender");
    prop.setProperty("log4j.appender.CONSOLE.layout", "org.apache.log4j.PatternLayout");
    prop.setProperty("log4j.appender.CONSOLE.layout.ConversionPattern", "%d{HH:mm:ss,SSS} [%t] %-5p %C{1} : %m%n");
    PropertyConfigurator.configure(prop);
}
```
 
 
## log4J参数说明

### 日志级别
```
ALL < DEBUG < INFO < WARN < ERROR < FATAL < OFF，不区分大小写
FATAL       0  
ERROR      3  
WARN       4  
INFO         6  
DEBUG      7
```
**注意**
1. 需在控制台输入，只需将其中一个appender定义为stdout即可
2. rootLogger默认是对整个工程生效
3. 如果只想对某些包操作，
那么：```log4j.logger.cn.geek5=info, stdout```，表示该日志对package cn.geek5生效
4. 这样做可以区分dev/线上，也可以减小性能影响：
```
if(log.isDebugEnabled()){
    log.debug();
}
```
5. 级别越大显示信息越多，即DEBUG会打印所有内容

### Appender 为日志输出目的地，Log4j提供的appender有以下几种：
```
org.apache.log4j.ConsoleAppender（控制台），
org.apache.log4j.FileAppender（文件），
org.apache.log4j.DailyRollingFileAppender（每天产生一个日志文件），
org.apache.log4j.RollingFileAppender（文件大小到达指定尺寸的时候产生一个新的文件），
org.apache.log4j.WriterAppender（将日志信息以流格式发送到任意指定的地方） 
```
### Layout：日志输出格式，Log4j提供的layout有以下几种：
```
org.apache.log4j.HTMLLayout（以HTML表格形式布局），
org.apache.log4j.PatternLayout（可以灵活地指定布局模式），
org.apache.log4j.SimpleLayout（包含日志信息的级别和信息字符串），
org.apache.log4j.TTCCLayout（包含日志产生的时间、线程、类别等等信息） 
```
### 打印参数: Log4J采用类似C语言中的printf函数的打印格式格式化日志信息，如下:
```
%m   输出代码中指定的消息
%p   输出优先级，即DEBUG，INFO，WARN，ERROR，FATAL 
%r   输出自应用启动到输出该log信息耗费的毫秒数 
%c   输出所属的类目，通常就是所在类的全名 
%t   输出产生该日志事件的线程名 
%n   输出一个回车换行符，Windows平台为“\r\n”，Unix平台为“\n” 
%d   输出日志时间点的日期或时间，默认格式为ISO8601，也可以在其后指定格式，比如：%d{yyy MMM dd HH:mm:ss , SSS}，输出类似：2002年10月18日  22 ： 10 ： 28 ， 921  
%l   输出日志事件的发生位置，包括类目名、发生的线程，以及在代码中的行数。举例：Testlog4.main(TestLog4.java: 10 )  
```

### 代码使用
```
public   class  Log4jTest  {
     public   static   void  main(String[] args)  {
        PropertyConfigurator.configure( "log4j.properties " );
        Logger logger  =  Logger.getLogger(Log4jTest.class );
        logger.debug( " debug " );
        logger.error( " error " );
    }
} 
```

### 常用配置
```
### set log levels ###
log4j.rootLogger = debug ,  stdout ,  D ,  E

### 输出到控制台 ###
log4j.appender.stdout = org.apache.log4j.ConsoleAppender
log4j.appender.stdout.Target = System.out
log4j.appender.stdout.layout = org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern =  %d{ABSOLUTE} %5p %c{ 1 }:%L - %m%n

### 输出到日志文件 ###
log4j.appender.D = org.apache.log4j.DailyRollingFileAppender
log4j.appender.D.File = logs/log.log
log4j.appender.D.Append = true
log4j.appender.D.Threshold = DEBUG ## 输出DEBUG级别以上的日志
log4j.appender.D.layout = org.apache.log4j.PatternLayout
log4j.appender.D.layout.ConversionPattern = %-d{yyyy-MM-dd HH:mm:ss}  [ %t:%r ] - [ %p ]  %m%n

### 保存异常信息到单独文件 ###
log4j.appender.D = org.apache.log4j.DailyRollingFileAppender
log4j.appender.D.File = logs/error.log ## 异常日志文件名
log4j.appender.D.Append = true
log4j.appender.D.Threshold = ERROR ## 只输出ERROR级别以上的日志!!!
log4j.appender.D.layout = org.apache.log4j.PatternLayout
log4j.appender.D.layout.ConversionPattern = %-d{yyyy-MM-dd HH:mm:ss}  [ %t:%r ] - [ %p ]  %m%n 
```

## 常见问题
1. 如果读取不到配置文件
```
PropertyConfigurator.configure(ClassLoader.getSystemResource("log4j.properties"));
```