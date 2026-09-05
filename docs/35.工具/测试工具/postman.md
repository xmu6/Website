---
title: Postman 接口测试
categories:
  - 测试工具
date: 2026-09-06 08:00:00
tags:
  - 接口测试
  - Postman
permalink: /tools/nzx1f
coverImg: /covers/postman.webp
---

# 基本概念

## 接口

- 接口：指系统或组件之间的交互点，通过这些交互点可以实现数据的交互。（数据交互的通道）
- 类型：
  - 按协议分：HTTP、TCP、UDP、IP、FTP、USB...
  - 按语言分：java、Python...
  - 按范围分：系统之间、程序内部
- 接口测试：对系统或组件之间的接口进行测试，主要是校验数据的交换、传递和控制管理过程，以及相互逻辑依赖关系。
- 原理：模拟客户端向服务器发送请求，服务器接受请求后进行相应的业务处理，并向客户端返回响应数据，检查响应数据是否符合预期。

## 协议

- HTTP：超文本传输协议，基于请求和响应模式的应用层协议。

  - 特点：支持客户端、服务器模式，简单快速，无连接，无状态。
  - URL：统一资源定位符，是互联网上标准资源的地址。HTTP使用URL来建立连接和传输数据。格式：
    - 协议部分：常见的协议有HTTP，HTTPS，FTP等
    - 域名部分："www.itcast.cn"，也可使用IP地址作为域名
    - 端口部分："8080"，可省略。默认端口(HTTP:80, HTTPS:443, FTP:21)
    - 资源路径部分："/news/index.html"，对应网页的源代码或网络中的一个数据资源。
    - 查询参数部分：'uid=123&page=1'，问号后的所有内容。

- HTTP请求：有三部分组成，请求行、请求头、请求体。

  <img src="/test-tools/postman/image-20240712155855345.png" alt="image-20240712155855345" style="zoom:67%;" />

- HTTP响应：规定服务器回发给客户端的数据语法格式。响应行(状态行)、响应头、空行、响应体。

  <img src="/test-tools/postman/image-20240712161946976.png" alt="image-20240712161946976" style="zoom:67%;" />

# 接口测试

## 流程

1. 需求分析，主要依据需求文档
2. 接口文档分析，一般由开发人员编写（API文档）
3. 设计测试用例
4. 执行测试，测试工具、代码
5. 接口缺陷管理与跟踪
6. 生成测试报告
7. 接口自动化持续集成（可选）

- 接口文档
  - 基本信息：接口名称、请求方法、请求路径、接口描述
  - 请求参数：请求头、请求体
  - 返回结果：状态码、状态描述、响应体

## 测试用例

为什么写？防止漏测；管理工作进度，评估工作量

1. 基本正向用例
2. 有可选参数的扩展正向用例
3. 有效的反向用例
4. 无效的反向用例
5. 破环性用例

## 测试点

- 功能测试：单接口功能；业务场景功能。
- 性能测试：响应时间，吞吐量，并发数，服务器资源使用率。
- 安全测试：敏感数据是否加密，SQL注入，其他。

## 手工用例要点

8要素：编号、标题、项目描述、优先级、预置条件、测试数据、执行步骤、预期结果。

- 测试页面布局、控件的位置是否精准。
- 针对用户名的编辑框中的数据值
  - 正确手机号、手机号有特殊字符、手机号不足11位、手机号超11位、手机号为空。
- 针对密码的编辑框的数据值
  - 正确密码、错误密码、密码有特殊字符、密码1位、密码100位、密码为空。
- 针对验证码的编辑框中的数据值
  - 正确验证码、错误验证码、过期验证码、验证码为空。

## 接口用例设计要点

编号、标题、用例名称、优先级、预置条件、接口名称、测试方法、URL、请求头、请求体、预期结果。

- 手工页面中的用户名编辑框对应接口中的key位username的value值。
- 手工页面中密码编辑框的值对应接口中key位password的value值。
- ...

# postman

接口类型：soap、rest、graphql、websocket、rpc...

分为两大类：基于TCP的全双工、基于HTTP的半双工。

- 基于TCP的全双工，rpc、websocket，不适用于postman。
- 基于HTTP的半双工，rest、graphql。soap，适用于postman。

## 简介

<img src="/test-tools/postman/image-20240715211913127.png" alt="image-20240715211913127" style="zoom:100%;" />

- 查询字符串，会成为URL的一部分
- 鉴权方式
- 请求头
- 正文参数
- 前置脚本，JavaScript
- 后置脚本
- 设置

<img src="/test-tools/postman/image-20240715212424467.png" alt="image-20240715212424467" style="zoom:100%;" />

- 正文（接口响应值）
  - 美化
  - 原始内容
  - 预览（HTML渲染）
  - 自定义展示
- 响应头
  - cookie
- 自动化测试结果

## 4要素

方法、地址、鉴权、参数

## token鉴权

- 账号相关：注册登录，不用鉴权
- 操作任务：增删查改，需要token
- 管理后台：数据管理，需要apikey

1. 获取token

   登录：方法post，地址，鉴权无，参数...

   接口响应获得

2. 使用token

   <img src="/test-tools/postman/QQ_1721469283600.png" alt="QQ_1721469283600" style="zoom:100%;" />

   底层原理：添加请求头：`Authorization`，请求头值：`Bearer`+`空格`+token

3. 接口关联：让A接口返回的值成为B接口的请求参数

   自动完成一些数据获取：注册账号、获取token、构造测试数据。

   思路：A接口把获取的值放在某处，B接口从该处读取数据。在postman中通过变量的方式实现接口关联。

### postman变量详解

- 使用变量：通过双大括号使用变量`{{a}}, {{token}}`

- 变量作用域：范围越大，优先级越低。

  - G：全局
  - C：集合
  - E：环境

- 创建变量

  ![QQ_1721470971855](/test-tools/postman/QQ_1721470971855.png)

  或

  ![QQ_1721471088042](/test-tools/postman/QQ_1721471088042.png)

  - 自动创建

    ![QQ_1721471289112](/test-tools/postman/QQ_1721471289112.png)

    或

    ![QQ_1721471480551](/test-tools/postman/QQ_1721471480551.png)

- pm常用对象

  | 变量名                 | 内容     |
  | ---------------------- | -------- |
  | pm.request             | 请求     |
  | pm.response            | 响应结果 |
  | pm.globals             | 全局变量 |
  | pm.collectionVariables | 集合变量 |
  | pm.environment         | 环境变量 |
  | pm.variables           | 局部变量 |

## 自动化断言

脚本实现

### 内置的断言实例

```javascript
pm.test("Response time is less than 200ms", function(){
        pm.expect(pm.response.responseTime).to.be.below(200);
        }); // 断言响应时长

pm.test("Body matches string", function(){
    pm,expect(pm.response.text()).to.include("size");
}); // 断言响应内容包含指定的字符串

pm.test("Status code is 200", function(){
    pm.response.to.have.status(200);
}); //断言状态码
```

### 断言的封装

大部分的接口拥有相似的断言

1. 响应时长

   ```javascript
   pm.test("响应耗时小于3000ms", function(){
           pm.expect(pm.response.responseTime).to.be.below(3000);
           }); // 断言响应耗时
   ```

2. 响应字节

   ```javascript
   pm.test("响应字节小于10MB", function(){
       pm.expect(pm.response.responseSize).to.be.below(1024*1024*10);
   }); // 断言响应大小
   ```

3. 接口契约

   - 状态码
   - 数据格式
   - 值

   ```javascript
   pm.sendRequest('http://....', (err, res) => {
       eval(res.text());
       beifan_assert(
       200, // 预期状态码
       {
           "id": 1,
           "title": "null",
           "is_done": false,
           "create_datetime": "2019-08-24T14:15:22Z",
           "done_datetime": "2019-08-24T14:15:22Z"
       },  //数据格式
       "token"  // 预期文本包含
       );
   });
   ```

## 数据驱动

#  测试报告

Newman执行测试用例之后，自动生成报告

# 持续集成
