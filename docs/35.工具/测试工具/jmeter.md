---
title: JMeter 接口测试
categories:
  - 测试工具
date: 2026-09-06 08:00:00
tags:
  - 接口测试
  - JMeter
permalink: /tools/t1tfw
coverImg: /covers/jmeter.webp
---

# 安装

jdk的安装以及环境变量的配置：

在系统变量中

- 新建

  变量名：JAVA_HOME

  变量值：C:\Program Files\Java\jdk-22  （jdk的安装路径）

- 新建：

  变量名：CLASSPATH

  变量值：.;%JAVA_HOME%\lib\tools.jar;%JAVA_HOME%\lib\dt.jar;  （固定）

- 编辑PATH，在最前面添加：%JAVA_HOME%\bin;  （固定）

环境验证：在dos窗口输入：java -version 和 javac

解压jmeter后，点击bin目录下的`jmeter.bat`即可。

<img src="/test-tools/jmeter/QQ_1721659215532.png" alt="QQ_1721659215532" style="zoom:80%;" />

- backups：自动备份的目录
- <u>bin中 -> jmeter.bat启动文件，jmeter.propties核心配置文件</u>
- extras：存放和第三方集成的构建文件
- lib：存放jar包

# 简介

## 10大组件（元件）

1. 测试计划：容器
2. 线程组：1-N用户
3. 配置元件：接口配置，协议，接口服务器IP，接口服务器端口
4. 前置处理器：在接口请求前的操作
5. 逻辑控制器：判断条件成立才请求接口，循环请求
6. 定时器：延时请求
7. 取样器：发送请求
8. 后置处理器：在接口请求之后的操作
9. 断言：判断接口是否成功
10. 监听器：收集测试结果

基本架构

![QQ_1721659802871](/test-tools/jmeter/QQ_1721659802871.png)

- 组件的作用域：组件可以作用于**父组件**、**平级兄弟组件**、**平级兄弟组件之下的子组件**。

## 接口关联

在下方使用提取器（后置处理器）

- json path

<img src="/test-tools/jmeter/QQ_1721745126537.png" alt="QQ_1721745126537"  />

表达式取值：`$.access_token`  ->  $表示根节点，.取子节点的值。

在下一个接口使用${变量名}使用值。

- 正则提取：(.*?)
