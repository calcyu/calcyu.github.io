---
title: Spring mybatis 配置说明
tags: MYBATIS
---
Spring mybatis 配置属性参考说明



``` xml
<!-- 配置c3p0数据源 -->
   <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
      <property name="driverClass" value="${jdbc.driver}" />
      <property name="jdbcUrl" value="${jdbc.url}" />
      <property name="user" value="${jdbc.username}" />
      <property name="password" value="${jdbc.password}" />
<!--      <property name="setAutoCommitOnClose" value="false"/> -->
      <!--连接池中保留的最小连接数。 -->
      <property name="minPoolSize" value="${jdbc.pool.minPoolSize}"/>
      <!--连接池中保留的最大连接数。Default: 15 -->
      <property name="maxPoolSize" value="${jdbc.pool.maxPoolSize}"/>
      <!--初始化时获取的连接数，取值应在minPoolSize与maxPoolSize之间。Default: 3 -->
      <property name="initialPoolSize" value="${jdbc.pool.initialPoolSize}"/>
      <!--最大空闲时间,60秒内未使用则连接被丢弃。若为0则永不丢弃。Default: 0 -->
      <property name="maxIdleTime" value="${jdbc.pool.maxIdleTime}"/>
      <!--当连接池中的连接耗尽的时候c3p0一次同时获取的连接数。Default: 3 -->
      <property name="acquireIncrement" value="30"/>
      <!--JDBC的标准参数，用以控制数据源内加载的PreparedStatements数量。但由于预缓存的statements 属于单个connection而不是整个连接池。所以设置这个参数需要考虑到多方面的因素。
         如果maxStatements与maxStatementsPerConnection均为0，则缓存被关闭。Default: 0 -->
      <property name="maxStatements" value="0"/>
      <!--每60秒检查所有连接池中的空闲连接。Default: 0 -->
      <property name="idleConnectionTestPeriod" value="60"/>
      <!--定义在从数据库获取新连接失败后重复尝试的次数。Default: 30 -->
      <property name="acquireRetryAttempts" value="30"/>
      <!--获取连接失败将会引起所有等待连接池来获取连接的线程抛出异常。但是数据源仍有效 保留，并在下次调用getConnection()的时候继续尝试获取连接。如果设为true，那么在尝试 
         获取连接失败后该数据源将申明已断开并永久关闭。Default: false -->
      <property name="breakAfterAcquireFailure" value="true"/>
      <!--因性能消耗大请只在需要的时候使用它。如果设为true那么在每个connection提交的 时候都将校验其有效性。建议使用idleConnectionTestPeriod或automaticTestTable 
         等方法来提升连接测试的性能。Default: false -->
      <property name="testConnectionOnCheckout" value="true"/>
   </bean>

<!-- 创建SqlSessionFactory，同时指定数据源 -->
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
   <property name="dataSource" ref="dataSource" />
</bean>

<!--创建数据映射器，数据映射器必须为接口 -->
<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
   <property name="annotationClass" value="org.springframework.stereotype.Repository" />
   <property name="basePackage" value="com.shishuo.cms.dao" />
</bean>
```