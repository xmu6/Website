---
title: Django REST Framework
date: 2026-09-06 08:00:00
categories:
  - Python
tags:
  - DRF
  - Django
  - RESTful
  - 接口
coverImg: /covers/python-drf.webp
permalink: /python/s3t4u
---

# web应用模式

两种应用模式：

前后端不分离（客户端看到的内容和所有界面效果都是由服务端提供出来）

<img src="/python/DRF/DRF.assets/2b9e962c7a702d9ddb3f78d6df0c5722-880.webp" srcset="/python/DRF/DRF.assets/2b9e962c7a702d9ddb3f78d6df0c5722-880.webp 1x, /python/DRF/DRF.assets/2b9e962c7a702d9ddb3f78d6df0c5722-1224.webp 2x" width="880" height="421" data-full-src="/python/DRF/DRF.assets/2b9e962c7a702d9ddb3f78d6df0c5722.png" alt="2b9e962c7a702d9ddb3f78d6df0c5722" style="zoom:60%;"  loading="lazy" decoding="async" />

前后端分离（把前端的界面效果html，css，js分离到另一个服务端或另一个目录下，python服务端只需要返回数据即可）。前端形成一个独立的网站，服务端构成一个独立的网站。

<img src="/python/DRF/DRF.assets/a2119a8d19469476804c3d0ddaa69d71-880.webp" srcset="/python/DRF/DRF.assets/a2119a8d19469476804c3d0ddaa69d71-880.webp 1x, /python/DRF/DRF.assets/a2119a8d19469476804c3d0ddaa69d71-1198.webp 2x" width="880" height="569" data-full-src="/python/DRF/DRF.assets/a2119a8d19469476804c3d0ddaa69d71.png" alt="a2119a8d19469476804c3d0ddaa69d71" style="zoom:60%;"  loading="lazy" decoding="async" />

# api接口

应用程序编程接口，就是应用程序对外提供了一个操作数据的入口，这个入口可以是函数或类方法，也可以是一个URL地址或一个网络地址。当客户端调用这个入库，应用程序则会执行对应代码操作，给客户端完成相对应的功能。

api接口在工作中是比较常见的开发内容，需要在调用或编写时有一个明确的编写规范：

## RPC

远程服务调用，访问/调用远程服务端提供的api接口。这种接口一般以服务或过程式代码提供。

- 服务端提供一个**唯一的访问入口地址**：http://api.xxx.com/ 或 http://www.xx.com/api 或基于其他协议的地址
- 客户端请求服务端的时候，所有的操作都理解为**动作**（action），一般web开发时，对应的就是HTTP请求的post请求
- 通过**请求体**参数，指定要调用的接口名称或接口所需的参数：action=get_all_student&class=301&sex=1
- 基本上现有的rpc的数据格式：protobuf、json、xml

rpc接口多了，对应函数名和参数就多，前端在请求api接口时难找。容易出现重复的接口。

## restful

资源状态转换（表征性状态转移），专用于web开发

- 把服务端提供的所有的数据/文件都看成资源，那么通过api接口请求数据的操作本质上就是对资源的操作。因此restful中要求把<u>当前接口对外提供哪种操作就把资源名称写在url地址上</u>。

- web开发中操作资源最常见的就是增删改查，所以restful要求在地址栏中声明要操作的资源是什么。然后通过HTTP请求动作来说明对该资源进行哪一种操作。

  POST  http://www.xxx.com/api/students/  添加学生数据

  GET  http://www.xxx.com/api/students/  获取所有学生

  DELETE  http://www.xxx.com/api/students/&lt;pk&gt;/  删除id=pk的一个学生

  PUT  http://www.xxx.com/api/students/&lt;pk&gt;/  修改一个学生的全部信息

  PATCH  http://www.xxx.com/api/students/&lt;pk&gt;/  修改一个学生的部分信息

也就是说我们仅需要通过URL地址上的资源名称结合HTTP请求动作就可以说明当前api接口的功能是什么

要求：

1. 域名

   尽量将api部署在专用域名下，如果api简单且不会进一步扩展，可以考虑放在主域名下

   ```http
   https://api.example.com
   https://www.example.org/api/
   ```

2. 版本

   将api的版本号放入URL中

   ```http
   http://www.example.com/app/1.0/foo
   http://www.example.com/app/1.1/foo
   ```

   或将版本号放在HTTP头信息中

   ```http
   Accept: vnd.example-com.foo+json; version=1.0
   ```

   

<img src="/python/DRF/DRF.assets/c2f7cdb3bccbd187da60c1bd2fcb7561-880.webp" srcset="/python/DRF/DRF.assets/c2f7cdb3bccbd187da60c1bd2fcb7561-880.webp 1x, /python/DRF/DRF.assets/c2f7cdb3bccbd187da60c1bd2fcb7561-935.webp 2x" width="880" height="582" data-full-src="/python/DRF/DRF.assets/c2f7cdb3bccbd187da60c1bd2fcb7561.png" alt="c2f7cdb3bccbd187da60c1bd2fcb7561" style="zoom:60%;"  loading="lazy" decoding="async" />

3. 路径

   资源作为网址，只能有名词，不能有动词，而且所用的名词往往与数据库的表名对应。api中的名词应该使用复数

   ```http
   获取单个产品：http://127.0.0.1:8080/AppName/rest/products/1
   获取所有产品：http://127.0.0.1:8080/AppName/rest/products
   ```

4. HTTP动词

   GET(SELECT)：从服务器取出资源

   POST(CREATE)：在服务器新建一个资源

   PUT(UPDATE)：在服务器更新资源（客户端提供改变后的完整资源)

   DELETE(DELETE)：从服务器删除资源

   另外三个不常用的：

   PATCH(UPDATE)：在服务器更新资源（客户端提供改变的属性）

   HEAD：获取资源的元数据

   OPTIONS：获取信息，关于资源的哪些属性是客户端可以改变的

<img src="/python/DRF/DRF.assets/d9a40160f234de311786ab196549da31-737.webp" srcset="/python/DRF/DRF.assets/d9a40160f234de311786ab196549da31-737.webp 1x" width="737" height="305" data-full-src="/python/DRF/DRF.assets/d9a40160f234de311786ab196549da31.png" alt="d9a40160f234de311786ab196549da31" style="zoom:70%;"  loading="lazy" decoding="async" />

5. 过滤信息

   query_string查询字符串，地址栏后面问号后面的数据，格式：name=xx&sss=xx

   ```
   完整的URL地址格式
   协议://域名(ip):端口号/students/?查询字符串#锚点
   查询字符串：query_string
   格式与请求体类型：
   username=xiaoming&class=301
   ```

   <img src="/python/DRF/DRF.assets/3c66ac1f78065cc042ce60c430091989-769.webp" srcset="/python/DRF/DRF.assets/3c66ac1f78065cc042ce60c430091989-769.webp 1x" width="769" height="207" data-full-src="/python/DRF/DRF.assets/3c66ac1f78065cc042ce60c430091989.png" alt="3c66ac1f78065cc042ce60c430091989" style="zoom:70%;"  loading="lazy" decoding="async" />

6. 状态码

   ```
   1xx 表示当前本次请求还在持续
   2xx 表示当前本次请求成功
   3xx 表示当前本次请求成功，但服务器进行代理操作/重定向
   4xx 表示当前本次请求失败，主要是客户端发生了错误
   5xx 表示当前本次请求失败，主要是服务端发生了错误
   ```

7. 错误处理

   如果状态码是4xx或5xx，服务器就应该向用户返回出错信息，一般返回信息将error作为键名，出错信息作为键值即可，一般json格式。

   ```JSON
   {
       error:"Invalid API key"
   }
   ```

8. 返回数据

   服务器向用户返回的结果应该符合一下规范

   GET /collections：返回资源对象的列表（数组）

   GET /collections/ID：返回单个资源字典（json）

   POST /collections：返回**新生成**的资源字典（json）

   PUT /collection/ID：返回修改后的资源对象（json）

   DELETE /collection/ID：返回一个空文档（空字符串，空字典）

9. 超媒体（Hypermedia API)

   做好Hypermedia（返回结果中提供链接，连向其他API的方法），使得用户不查文档也知道下一步该做什么

10. 其他

    服务器返回的数据格式应该尽量使用json，避免使用xml（xml使用场景：配置文件、微星开发、小程序、安卓）

restful规范是一种同用规范，不限制语言和框架

## 幂等性

指客户端发起多次同样请求时，是否对于服务端里面的资源产生不同结果。如果多次请求，服务端结果一样，则属于幂等接口，否则为非幂等接口。

<img src="/python/DRF/DRF.assets/f89d715f9c72aa3417883dc07f7fd52f-880.webp" srcset="/python/DRF/DRF.assets/f89d715f9c72aa3417883dc07f7fd52f-880.webp 1x, /python/DRF/DRF.assets/f89d715f9c72aa3417883dc07f7fd52f-1069.webp 2x" width="880" height="216" data-full-src="/python/DRF/DRF.assets/f89d715f9c72aa3417883dc07f7fd52f.png" alt="f89d715f9c72aa3417883dc07f7fd52f" style="zoom:60%;"  loading="lazy" decoding="async" />

# 序列化

数据转换格式。常见的序列化方式：json、pickle、base64、...

序列化分为两个阶段：

**序列化**：把我们识别的数据转换成指定的格式提供给别人。

例如：在Django中获取到的数据默认是模型对象，但模型对象数据无法直接提供给前端或别的平台使用，所以需要把数据进行序列化，变成字符串或json数据提供给别人

**反序列化**：把别人提供的数据转换还原成我们需要的格式

例如：前端js提供过来的json数据，对于python而言json就是字符串，我们需要进行反序列化成字典，然后再转换成模型对象存到数据库中。

# Django Rest_Framework

核心：大量缩减编写API接口的代码

Django Rest Framework是一个建立在Django基础之上的web开发框架，可以快速的开发rest API接口应用。在Django Rest Framework中，提供了序列化器serialzier的定义，可以帮助我们简化序列化与反序列化的过程，还提供了丰富的类视图、扩展类、视图集来简化视图的编写工作，还提供了认证、权限、限流、过滤、分页、接口文档等功能支持，还提供了一个调试API的web可视化界面在方便查看测试接口。

特点：

- 提供了定义序列化器serializer的方法，可以快速根据Django ORM或其他库自动序列化
- 提供了丰富的类视图、mixin扩展类，简化视图的编写
- 丰富的定制层级：函数视图、类视图、视图集合到自动 生成API
- 多种身份认证和权限认证
- 内置了限流系统
- 直观的API web界面
- 可扩展性

## 安装DRF

前提是已经安装了Django

`pip install djangorestframework`

创建Django项目，在settings的installed_app中加入`'rest_framework'`

在项目中使用rest framework实现API接口主要有三个步骤：

- 将请求的数据转换为模型类对象
- 操作数据库
- 将模型类对象转换为响应的数据

# 序列化器-serializer

## 定义序列化器

使用类来定义，须继承rest_framework.serializers.Serializer。

`python manage.py startapp sers`

注册，创建serializers.py：

```py
from rest_framework import serializers
'''
serializers是drf提供给开发者调用的序列化器模块
里面声明了所有的可用序列化器基类：
Serializer      序列化器基类，drf中所有的序列化器类都必须继承于Serializer
ModelSerializer 模型序列化器基类，是序列化器基类的子类
'''


class StudentSerializer(serializers.Serializer):
    """学生信息序列化器"""

    # 1. 转换的字段声明
    # 字段=serializers.字段类型（选项=选项值，）
    id = serializers.IntegerField()
    name = serializers.CharField()
    sex = serializers.BooleanField()
    age = serializers.IntegerField()
    description = serializers.CharField()
    # 2. 如果当前的序列化器继承的是ModelSerializer，则需要声明调用的模型信息
    # class Meta:
    #     model = Student
    #     fields = "__all__"   或   ["字段1", "字段2", ...]
    # 3. 验证代码的对象方法
    # def validate(self, attrs):  validate是固定的
    #     pass
    #     return attrs
    #
    # def validate_<字段名>(self, data):  方法名的格式必须以validate_<字段名>为名称，否则序列化器不识别
    # pass
    # return data
    #
    # 4. 模型操作的方法
    # def create(self, validated_data):   添加操作，添加数据以后就自动实现了从字典变成模型对象的过程
    #     pass
    #
    # def update(self, instance, validated_data):  更新操作，更新数据以后就自动实现了从字典变成模型对象的过程
    #     pass
```

绑定路由：

```py
from django.urls import path
from . import views
urlpatterns = [
    path("students", views.StudentView.as_view()),

]
```

字段参数：

<img src="/python/DRF/DRF.assets/image-20240219184209305-880.webp" srcset="/python/DRF/DRF.assets/image-20240219184209305-880.webp 1x, /python/DRF/DRF.assets/image-20240219184209305-1289.webp 2x" width="880" height="679" data-full-src="/python/DRF/DRF.assets/image-20240219184209305.png" alt="image-20240219184209305" style="zoom:80%;"  loading="lazy" decoding="async" />

<img src="/python/DRF/DRF.assets/image-20240219184343093-880.webp" srcset="/python/DRF/DRF.assets/image-20240219184343093-880.webp 1x, /python/DRF/DRF.assets/image-20240219184343093-1285.webp 2x" width="880" height="349" data-full-src="/python/DRF/DRF.assets/image-20240219184343093.png" alt="image-20240219184343093" style="zoom:80%;"  loading="lazy" decoding="async" />

<img src="/python/DRF/DRF.assets/image-20240219184449316-880.webp" srcset="/python/DRF/DRF.assets/image-20240219184449316-880.webp 1x, /python/DRF/DRF.assets/image-20240219184449316-1286.webp 2x" width="880" height="254" data-full-src="/python/DRF/DRF.assets/image-20240219184449316.png" alt="image-20240219184449316" style="zoom:80%;"  loading="lazy" decoding="async" />

<img src="/python/DRF/DRF.assets/2f88140ed88359b7e617d4f3bb701287-880.webp" srcset="/python/DRF/DRF.assets/2f88140ed88359b7e617d4f3bb701287-880.webp 1x, /python/DRF/DRF.assets/2f88140ed88359b7e617d4f3bb701287-1291.webp 2x" width="880" height="362" data-full-src="/python/DRF/DRF.assets/2f88140ed88359b7e617d4f3bb701287.png" alt="2f88140ed88359b7e617d4f3bb701287" style="zoom:80%;"  loading="lazy" decoding="async" />

Serializer的构造方法为：`StudentSerializer(instance=None, data=empty, **kwargs)`

说明：

- 用序列化时，将模型参数对象传入instance参数

- 用于反序列化时，将要被反序列化的数据传入data参数

- 还可通过context参数额外添加数据

  ```py
  serializer = AccountSerializer(account, context={"request": request})
  ```

  通过context参数附加的数据可以通过Serializer对象的context属性获取。

注意事项：

- 序列化器声明了以后不会自动执行，需要我们在视图中调用
- 序列化器无法接收数据，需要在视图中实例化序列化器对象时把使用的数据传递进来
- 其字段声明类似于我们使用过的模型
- 开发restful api时，序列化器会帮我们把模型对象转换为字典



## 序列化器的使用

in views:

```py
from django.http.response import JsonResponse
from django.views import View
from .serializers import StudentSerializer


class StudentView(View):
    def get(self, request):
        """序列化器调用"""

        # 1.获取数据集
        students = Student.objects.all()
        #     [
        #     {"id": 1, "name": "张三", "sex": True, "age": 18, "description": "fjkladjfl"},
        #     {"id": 2, "name": "李四", "sex": True, "age": 20, "description": "fjkladjfl"},
        #     {"id": 3, "name": "王五", "sex": True, "age": 22, "description": "fjkladjfl"},
        #      ]
        
        # 2.实例化序列化器，得到序列化对象
        serializer = StudentSerializer(instance=students, many=True)
        # 3. 调用序列化对象的data属性方法获取转换后的数据
        data = serializer.data
        # 4.响应数据
        return JsonResponse(data=data, status=200, safe=False)
```

`many=True`：序列化多个

### 反序列化

**数据验证**

使用序列化器进行反序列化时，需要对数据进行验证后，才能获取验证成功的数据或保存成模型类对象。

在获取反序列化的数据之前，必须调用**is_valid()**方法进行验证，验证成功返回True。

验证失败可以通过序列化器对象的errors属性获取错误信息，返回字典，包含了字段和字段的错误。如果是非字段错误，可以通过修改rest framework配置中的NON_FIELD_ERRORS_KEY来控制错误字典中的键名。

验证成功可以通过序列化器对象的validated_data属性获取数据。

定义序列化器时，指明每个字段的序列化类型和选项参数本身就是一种验证行为。

- 使用选项验证

```py
from rest_framework import serializers


class StudentSerializer(serializers.Serializer):
    """学生信息序列化器"""
    # 1. 转换的字段声明
    # 字段=serializers.字段类型（选项=选项值，）
    id = serializers.IntegerField(read_only=True)  # 在客户端提交数据（反序列化阶段不会要求id字段）
    name = serializers.CharField(required=True)  # 反序列化阶段必填
    sex = serializers.BooleanField(default=True)
    age = serializers.IntegerField(max_value=100, min_value=0)
    description = serializers.CharField(allow_null=True, allow_blank=True)  # 允许客户端不填或传递一个none值
```

in views:

```py
import json
from django.http.response import JsonResponse
from django.views import View
from .serializers import StudentSerializer


class StudentView(View):
    def get(self, request):
        """反序列化采用字段选项来验证数据"""
        # 1. 接受客户端提交的数据
        # data = json.dumps(request.body)
        # 模拟
        data = {
            "name": "张三",
            "age": -18,
            "sex": True,
            "description": "fjkladjfl"
        }
        # 2. 实例化序列化器，获取序列化对象
        serializer = StudentSerializer(data=data)
        # 3. 调用序列化器进行数据验证
        ret = serializer.is_valid()  # 不抛出异常
        # 抛出异常,这种写法可以省略下面的if-else，工作中最常用
        # ret = serializer.is_valid(raise_exception=True)
        # 4. 获取验证以后的结果
        if ret:
            return JsonResponse(serializer.validated_data)
        else:
            return JsonResponse(serializer.errors)
        # 5. 操作数据库
        # 6. 返回结果
        # return JsonResponse(serializer.validated_data)
```

- 使用validate验证（单个）：

```py
from rest_framework import serializers
class StudentSerializer(serializers.Serializer):
    """学生信息序列化器"""
    id = serializers.IntegerField(read_only=True) 
    name = serializers.CharField(required=True) 
    sex = serializers.BooleanField(default=True)
    age = serializers.IntegerField(max_value=100, min_value=0)
    description = serializers.CharField(allow_null=True, allow_blank=True)

    def validate_name(self, data):  # 方法名的格式必须以validate_<字段名>为名称，否则序列化器不识别
        """
        验证单个字段（name）
        validate开头的方法会自动被is_valid调用
        :param data: 当前字段的值
        """
        if data in ["张三", "李四"]:
            # 验证失败，抛出异常
            raise serializers.ValidationError("姓名不能是张三或李四")
        # 验证成功，必须返回数据
        return data
```

- 使用选项+外部验证函数(不常用)：

```py
from rest_framework import serializers

# 外部验证函数
def check_description(data):
    if len(data) < 10:
        raise serializers.ValidationError('简介长度不能少于10个字符')
    # 验证通过，必须返回结果，否则结果中无数据
    return data


class StudentSerializer(serializers.Serializer):
    """学生信息序列化器"""
    id = serializers.IntegerField(read_only=True)  
    name = serializers.CharField(required=True)  
    sex = serializers.BooleanField(default=True)
    age = serializers.IntegerField(max_value=100, min_value=0)
    # 外部验证选项，值是一个列表，列表成员是函数名，不能字符串！
    description = serializers.CharField(validators=[check_description]) 
```



- 使用validate验证（多个）：

```py
from rest_framework import serializers

class StudentSerializer(serializers.Serializer):
    """学生信息序列化器"""
    id = serializers.IntegerField(read_only=True) 
    name = serializers.CharField(required=True) 
    sex = serializers.BooleanField(default=True)
    age = serializers.IntegerField(max_value=100, min_value=0)
    description = serializers.CharField(allow_null=True, allow_blank=True)  
    
    def validate(self, attrs):
        """
        验证来自客户端的多个字段
        类似用户注册的密码和确认密码的验证，只能在validate中实现
        validate是固定的方法名，attrs：序列化器实例化时的data选项数据
        """
        # 张三不能18岁
        if attrs["name"] == "张三" and attrs["age"] >= 18:
            raise serializers.ValidationError("张三不能18岁")
        return attrs
```

### 保存数据

in views:
```py
from django.http.response import JsonResponse
from django.views import View
from .serializers import StudentSerializer
from .models import Students


class StudentView(View):
    def get0(self, request):
        """反序列化采用字段选项来验证数据，验证成功后写入数据库"""
        # 1. 接受客户端提交的数据
        # data = json.dumps(request.body)
        # 模拟
        data = {
            "name": "张三",
            "age": 18,
            "sex": True,
            "description": "fjkladjfl"
        }
        # 2. 实例化序列化器，获取序列化对象
        serializer = StudentSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        # 获取验证以后的结果,操作数据库
        serializer.save()  # 会根据实例化序列化器的时候是否传入instance属性来自动调用create或update方法：传入instance，自动调用update；没有传入，则自动调用create
        return JsonResponse(serializer.data, status=201)
    
    def get(self, request):
        """反序列化采用字段选项来验证数据，验证成功后更新数据入库"""
        # 1. 根据客户端访问的url地址获取pk值
        # sers/students/2/    path("/students/(?P<pk>)\d+/", views.StudentView.as_view())
        pk = 1  # pk是Django模型中唯一标识一个对象的字段（id）
        try:
            student = Students.objects.filter(pk=pk).first()
        except:
            return JsonResponse({"error"}, status=404)
        # 2. 接受客户端提交的修改数据
        data = {
            "name": "张三",
            "age": 8,
            "sex": True,
            "description": "fjkladjfl"
        }
        # 3. 修改操作中的实例化序列化器对象
        serializer = StudentSerializer(instance=student, data=data)
        # 4. 验证数据
        serializer.is_valid(raise_exception=True)
        # 5. 入库
        serializer.save()
        # 6. 返回结果
        return JsonResponse(serializer.data, status=201)
```

in serializers:

```py
from rest_framework import serializers
from .models import Students

class StudentSerializer(serializers.Serializer):
    """学生信息序列化器"""

    # 1. 转换的字段声明
    # 字段=serializers.字段类型（选项=选项值，）
    name = serializers.CharField()
    sex = serializers.BooleanField()
    age = serializers.IntegerField()
    description = serializers.CharField()
    
    def create(self, validated_data):
        """
        添加数据
        方法名固定为create，固定参数validated_data就是验证成功以后的结果
        """
        student = Students.objects.create(**validated_data)
        return student

    def update(self, instance, validated_data):
        """
        更新数据
        方法名固定为update，固定参数instance就是数据库中的数据对象，
        固定参数validated_data就是验证成功以后的结果
        """
        instance.name = validated_data['name']
        instance.sex = validated_data['sex']
        instance.age = validated_data['age']
        instance.description = validated_data['description']
        instance.save()  # 调用模型对象的save方法。和视图中的Serializer.save()不是同一个
        return instance

```

附加说明：

- 对序列化器进行save()保存时，可以额外传递数据，这些数据在create()和update()中的validated_data参数获取到

```py
# request.user 是Django中记录当前登录用户的模型对象
serializer.save(owner=request.user)  # 可以在save中，传递一些不需要验证的数据到模型里面
```

- 默认序列化器必须传递所有required的字段，否则抛出异常。但我们可以使用partial参数来运行部分字段更新。

```py
# update name with partial data
serializer = StudentsSerializer(student, data={'name': 'xml'}, partial=True)
```

## 模型类序列化器

modelserializer与常规的Serializer相同，但额外提供了：

- 基于模型类自动生成一系列字段
- 基于模型类自动为Serializer生成validators，比如unique_together
- 包含默认的create()h和update()的实现（不用自己写，除非要重写）

比如创建一个StudentModelSerializer

in models:

```py
from django.db import models


class Students(models.Model):
    name = models.CharField(max_length=100)
    sex = models.BooleanField()
    age = models.IntegerField()
    description = models.CharField(max_length=200)
```

in serializers:

```py
class StudentModelSerializer(serializers.ModelSerializer):
    """学生信息序列化器"""
    # 1。 转换的字段声明
    # 字段名 = 字段类型(选项=选项值，)
    # 2. 如果当前序列化器继承的是ModelSerializer，则需要声明调用的模型信息
    # class Meta:
    #     model = 模型  # 必填
    #     fields = 字段列表  # 必填，可以是字符串、列表、元组
    #     read_only_fields = []  # 选填，只读字段列表，表示设置这里的字段只会在序列化阶段采用
    #     extra_kwargs = {  # 选填，字段额外选项声明
    #         "字段名": {
    #             "选项名": 选项值
    #         }
    #      }
    class Meta:
        model = Students
        fields = "__all__"
            # ["id", "name", "sex", "age", "description"]
        extra_kwargs = {  # 验证条件
            "age": {
                "min_value": 8,
                "max_value": 60,
                "error_messages": {
                    "min_value": "年龄不能小于8岁",
                    "max_value": "年龄不能大于60岁",
                },
            },

        }

    # 3。 验证代码的对象方法

    # 4. 模型操作的方法

```

in views:

```py
class StudentView(View):
    def get(self, request):
        """反序列化采用字段选项来验证数据，验证成功后更新数据入库"""
        data = [
            {"name": "张三", "sex": True, "age": 18, "description": "fjkladjfl"},
            {"name": "李四", "sex": True, "age": 20, "description": "fjkladjfl"},
            {"name": "王五", "sex": True, "age": 22, "description": "fjkladjfl"},
        ]
        serializer = StudentModelSerializer(data=data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()  # ModelSerializer自带create
        return JsonResponse(serializer.data, status=201, safe=False)
```

区别

什么时候声明的序列化器要继承序列化器基类Serializer，什么时间继承模型序列化器modelSerializer？

看数据是否从数据库中获取，是则用modelSerializer，不是则用Serializer

- 继承序列化器基类Serializer
  - 字段声明
  - 验证
  - 添加/保存数据功能
- 承模型序列化器modelSerializer
  - 字段声明[可选]
  - Meta声明
  - 验证
  - 添加/保存数据功能[可选]

## 序列化器嵌套

在序列化器使用过程中，一般一个序列化器对应一个模型数据。往往因为模型之间会存在外键关联，所以一般在输出数据时不仅要获取当前模型的数据，其他模型的数据也需要同时返回，这种情况下，我们可以通过序列化器嵌套调用的方式帮我们把当前模型数据进行转换以外还可以同时转换外键对应的模型数据。

默认情况下，模型经过序列化器的数据转换，对于外键的信息，仅仅把数据库里面的外键id返回

```py
class AchievementModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = '__all__'


class StudentModelSerializer(serializers.ModelSerializer):
    s_achievement = AchievementModelSerializer(many=True)  # s_achievement就是模型中声明的外键字段，非外键字段不能指定序列化器对象
    class Meta:
        model = Student
        fields = '__all__'
```

注意：自己没有的字段才用外键，自己有的直接用自己的字段名，且此时返回的是一个字典信息，不用many=True。

在多对一或一对一的序列化器嵌套中，通过**source选项**，直接通过外键指定返回某个字段数据。注：要对自己有的字段使用。

```py
class CourseModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = '__all__'


class AchievementModelSerializer(serializers.ModelSerializer):
    course = serializers.CharField(source='course.name')

    class Meta:
        model = Achievement
        fields = '__all__'
        # depth = 0


class StudentModelSerializer(serializers.ModelSerializer):
    s_achievement = AchievementModelSerializer(many=True)
    
    class Meta:
        model = Student
        fields = ['id', 'name', 'age', 'sex', 's_achievement']
```

in models:

```py
class Student(models.Model):
    name = models.CharField(max_length=100, verbose_name="姓名")
    age = models.IntegerField(verbose_name="年龄")
    sex = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Course(models.Model):
    name = models.CharField(max_length=100, verbose_name="课程名称")
    teacher = models.ForeignKey('Teacher', on_delete=models.CASCADE, related_name='course', db_constraint=False)

    class Meta:
        db_table = 'sch_course'

    def __str__(self):
        return self.name


class Teacher(models.Model):
    name = models.CharField(max_length=100, verbose_name="教师姓名")
    sex = models.BooleanField(default=True)

    class Meta:
        db_table = 'sch_teacher'

    def __str__(self):
        return self.name


class Achievement(models.Model):
    score = models.DecimalField(default=0, max_digits=4, decimal_places=1, verbose_name="成绩")
    student = models.ForeignKey('Student', on_delete=models.CASCADE, related_name='s_achievement', db_constraint=False)
    course = models.ForeignKey('Course', on_delete=models.CASCADE, related_name='c_achievement', db_constraint=False)
    create_dtime = models.DateTimeField(auto_created=datetime.now)

    class Meta:
        db_table = 'sch_achievement'

    def __str__(self):
        return self.course
```



直接深度属性：

```py
class AchievementModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = '__all__'
        depth = 1  # 展开一层


class StudentModelSerializer(serializers.ModelSerializer):
    s_achievement = AchievementModelSerializer(many=True)
    class Meta:
        model = Student
        fields = '__all__'
```



# HTTP响应

drf除了在数据序列化部分简写代码以外，还在视图中提供了简写操作。所以在Django原有的django.views.View类基础上，drf封装了多个视图子类出来提供给我们使用。

drf提供的视图的主要作用：

- 控制序列化器的执行（检验、保存、转换数据）
- 控制数据库查询的执行
- 调用请求类和响应类（这两个类也是有drf帮我们再次扩展了一些功能类）

**内容协商**：在客户端和服务端之间的数据通信的过程中，给予协议增加数据格式的声明，方便对端理解本端发送的数据格式个期望返回的数据格式。

<img src="/python/DRF/DRF.assets/image-20240226210036203-753.webp" srcset="/python/DRF/DRF.assets/image-20240226210036203-753.webp 1x" width="753" height="203" data-full-src="/python/DRF/DRF.assets/image-20240226210036203.png" alt="image-20240226210036203" style="zoom:100%;"  loading="lazy" decoding="async" />

## Request

rest framework传入视图的request对象不再是Django默认的HttpRequest对象，而是rest framework提供的扩展了HttpRequest类的Request类的对象。

rest framework 提供了parser解析器，在接受到请求后会自动根据content-type指明的请求数据类型（如JSON、表单等）将请求数据进行parse解析，解析为类字典[QueryDict]对象保存到Request对象中。

<u>Request对象的数据是自动根据前端发送数据的格式进行解析之后的结果。</u>

常用属性：

(1) .data

 `request.data`返回解析之后的请求体数据。类似Django中标准的`request.POST`和`request.FILES`属性，但提供如下特性：

- 包含了解析之后的文件和非文件数据
- 包含了对POST、PUT、PATCH请求方式解析后的数据
- 利用了rest framework的parser解析器，不仅支持表单类型数据，也支持JSON数据

(2) .query_params

`request.query_params`与Django标准的`request.GET`相同，只是更换了更正确的名称而已

(3) request._request

获取Django封装的request对象

示例：

新建功能`python manage.py startapp req`，然后注册

in req.views:

```py
from rest_framework.views import APIView
from rest_framework.response import Response


class StudentApiView(APIView):
    def get(self, request):
        print(request)  # <rest_framework.request.Request: GET '/req/students/'>
        # 是属于drf单独声明的请求处理对象，与Django提供的HttpRequest不是同一个，甚至没有继承关系
        print(request._request)  # <WSGIRequest: GET '/req/students/'> --> Django的
        return Response({"msg": "Hello World!"})

    def post(self, request):
        print(request.data)  # 接收的数据已经被parse解析器转换成字典数据了
        print(request.query_params)  # 查询的是url问号后数据
        return Response({"msg": "Hello World! post"})

    def put(self, request):
        return Response({"msg": "Hello World! put"})

    def delete(self, request):
        return Response({"msg": "Hello World! delete"})
'''
{'name': 'xml'}
<QueryDict: {'password': ['123456']}>
'''
```

<img src="/python/DRF/DRF.assets/image-20240226224949224-880.webp" srcset="/python/DRF/DRF.assets/image-20240226224949224-880.webp 1x, /python/DRF/DRF.assets/image-20240226224949224-1626.webp 2x" width="880" height="527" data-full-src="/python/DRF/DRF.assets/image-20240226224949224.png" alt="image-20240226224949224" style="zoom:80%;"  loading="lazy" decoding="async" />

## Response

rest framework提供了一个响应类`Response`，使用该类构造响应对象时，响应的具体数据内容会被转换（renderer渲染器）成符合前端需求的类型。

rest framework提供了`Renderer`渲染器，用来根据请求头中的accept（接受数据类型声明）来自动转换响应数据到对应格式。如果前端请求中未进行accept声明，则会采用content-type方式处理响应数据，我们可以通过配置来修改默认响应格式。

构造方式

```py
Response(data, status=None, template_name=None, headers=None, content_type=None)
```

drf的响应处理类和请求处理类不一样，Response就是Django的HttoResponse响应处理类的子类。

data数据不要是render处理后的数据，只需传递Python的内建类型数据即可，rest framework会使用renderer渲染器处理data。

data不能是复杂结构的数据，如Django的模型类对象，对于这样的数据我们可以使用Serializer序列化器处理后再传递给data参数。

参数说明：

- `data`：为响应准备的序列化处理后的数据

- `status`：状态码，默认200

  ```py
  from rest_framework.response import Response
  from rest_framework import status
  return Response({"msg":"ok"}, status=status.HTTP_201_CREATED)
  ```

- `template_name`：模版名称，使用`htmlrenderer`时需指明

- `headers`：用于存放响应头信息的字典

- `content_type`：响应数据的content-type，通常此参数无需传递，rest framework会根据前端所需类型数据来设置该参数。

# 视图

Django rest framework提供的视图的主要作用：

- 控制序列化器的执行（检验、保存、转换数据）
- 控制数据库模型的操作

## 普通视图

rest framework提供了众多的通用视图基类与扩展类，以简化视图的编写。

### apiview基本视图类

`rest_framework.views.APIView`

`APIView`是rest framework提供的所有视图的基类，继承自Django的`view`父类。

两者不同之处：

- 传入到视图的方法中的是rest framework的`Request`对象，而不是Django的`HttpRequest`对象
- 视图方法可以返回rest framework的`Response`对象，视图会为响应数据设置符合前端期望要求的格式
- 任何`APIException`异常都会被捕获到，并处理成合适格式的信息返回给客户端
  - Django的view中所有异常全部以HTML格式显示
  - drf的APIView或其子类会自动根据客户端的accept进行错误信息的格式转换

- 重新声明了一个新的as_view方法并在dispatch()进行路由分发前，会对请求的客户端进行身份认证、权限认证、流量控制。

APIView除了继承了view原有的属性方法外，还新增了类属性：

- authentication_classes列表或元组，身份认证类
- permission_classes列表或元组，权限检查类
- throttle_classes列表或元组，流量控制类

在APIView中仍以常规的类视图定义方法来实现get()、post()或者其他请求方式的方法。

<u>获取所有数据和添加数据</u>

新建功能`python manage.py startapp demo`，注册

in demo.serializers:

```py
from rest_framework import serializers
from sers.models import Students


class StudentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Students
        fields = "__all__"
```

in demo.views:

```py
from rest_framework.views import APIView
from rest_framework.response import Response
from sers.models import Students
from .serializers import StudentModelSerializer
from rest_framework import status


class StudentAPIView(APIView):
    def get(self, request):
        """获取所有学生信息"""
        # 1. 从数据库中读取学生列表信息
        student_list = Students.objects.all()
        # 2。 实例化序列化器，获取序列化对象
        serializer = StudentModelSerializer(instance=student_list, many=True)
        # 3. 转换数据并返回给客户端
        return Response(serializer.data, status=200)

    def post(self, request):
        """添加一条数据"""
        # 1. 获取客户端提交的数据，实例化序列化器，获取序列化对象
        serializer = StudentModelSerializer(data=request.data)
        # 2. 反序列化（验证数据，存到数据库）
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # 3. 返回新增的模型数据给客户端
        return Response(serializer.data, status=status.HTTP_201_CREATED)
```

<u>查看一条数据、更新一条数据、删除一条数据</u>

in demo.urls:

```py
from django.urls import path, re_path
from .views import StudentAPIView
from .views import StudentInfoAPIView

urlpatterns = [
    path('students/', StudentAPIView.as_view()),
    re_path('students/(?P<pk>\d+)/$', StudentInfoAPIView.as_view()),
    # 正则表达式，(?<名称>d+)
]
```

in demo.views:

```py
class StudentInfoAPIView(APIView):
    def get(self, request, pk):
        """获取一条数据"""
        # 1. 使用pk作为条件，获取模型对象
        try:
            student = Students.objects.get(pk=pk)
        except Students.DoesNotExist:
            return Response({"message": "学生不存在"}, status=status.HTTP_404_NOT_FOUND)
        # 2. 实例化序列化器，获取序列化对象
        serializer = StudentModelSerializer(instance=student)
        # 3. 返回给客户端
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        """更新一条数据"""
        # 1. 使用pk作为条件，获取模型对象
        try:
            student = Students.objects.get(pk=pk)
        except Students.DoesNotExist:
            return Response({"message": "学生不存在"}, status=status.HTTP_404_NOT_FOUND)
        # 2. 获取客户端提交的数据
        serializer = StudentModelSerializer(instance=student, data=request.data)
        # 3. 反序列化（验证数据，存到数据库）
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # 4. 返回结果
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, pk):
        """删除一条数据"""
        # 1. 使用pk作为条件，获取要删除的数据并删除
        try:
            student = Students.objects.get(pk=pk).delete()
        except Students.DoesNotExist:
            return Response({"message": "学生不存在"}, status=status.HTTP_404_NOT_FOUND)
        # 2. 返回结果
        return Response({"message": "删除成功"}, status=status.HTTP_204_NO_CONTENT)
```

### GenericAPIView通用视图类

通用视图类主要作用就是把独特的代码抽取出来，让视图方法中的代码更加通用，方便把通用代码进行简写。

```py
rest_framework.generics.GenericAPIView
```

继承自APIView，主要增加了操作序列化器和数据库查询的方法，作用是为了下面Mixin扩展类的执行提供方法支持。通常在使用时可搭配一个或多个Mixin扩展类。

<u>提供的关于序列化器使用的属性与方法</u>

- 属性：`serializer_class`指明视图使用的序列化器

- 方法：

  - `get_serializer_class(self)`

    当出现一个视图类中调用多个序列化器时，可以通过条件判断在get_serializer_class方法中通过返回不同的序列化器类名就可以让视图方法执行不同的序列化器对象。

  - `get_serializer(self, args, *kwargs)`

    返回序列化器对象，主要用来提供给Mixin扩展类使用，如果我们在视图中想要获取序列化器对象，也可以直接调用此方法。注意，该方法在提供序列化器对象的时候会向序列化器对象的context属性补充三个数据：request、format、view，这三个数据对象可以在定义序列化器时使用

    - Request当前视图的请求对象
    - view当前请求的类视图对象
    - format当前请求期望返回的数据格式

<u>提供的关于数据库查询的属性和方法</u>

- 属性：`queryset`指明使用的数据查询集

- 方法：

  - `get_queryset(self)`

    返回使用使用的查询集，主用来提供给Mixin扩展类使用，是列表视图与详情视图获取数据的基础，默认返回`queryset`属性，可以重写

  - `get_object(self)`

    返回详情视图所需的模型类数据对象，主要用来提供给Mixin扩展类使用，在视图中可以调用该方法获取详情信息的模型类对象，不存在则返回404。该方法会默认使用APIView提供的check_object_permission方法检查当前对象是否有权限被访问。

<u>其他可以设置的属性</u>

- `pagination_class`指明分页控制类
- `filter_backends`指明数据过滤控制后端

in urls:

```py
from django.urls import path, re_path
from .views import StudentGenericAPIView
from .views import StudentInfoGenericAPIView

urlpatterns = [
    path('students2/', StudentGenericAPIView.as_view()),
    re_path('students2/(?P<pk>\d+)/$', StudentInfoGenericAPIView.as_view()),
]
```

in views:

```py
from rest_framework.response import Response
from sers.models import Students
from .serializers import StudentModelSerializer
from rest_framework import status
from rest_framework.generics import GenericAPIView


class StudentGenericAPIView(GenericAPIView):
    queryset = Students.objects.all()
    serializer_class = StudentModelSerializer

    def get(self, request):
        """获取所有学生信息"""
        # 1. 从数据库中读取模型列表信息
        queryset = self.get_queryset()  # GenericAPIView提供get_queryset()
        # 2。 实例化序列化器，获取序列化对象
        serializer = self.get_serializer(instance=queryset, many=True)
        # 3. 转换数据并返回给客户端
        return Response(serializer.data)

    def post(self, request):  # post无变化
        """添加一个数据"""
        # 1. 获取客户端提交的数据，实例化序列化器，获取序列化对象
        serializer = StudentModelSerializer(data=request.data)
        # 2. 反序列化（验证数据，存到数据库）
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # 3. 返回新增的模型数据给客户端
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class StudentInfoGenericAPIView(GenericAPIView):
    queryset = Students.objects.all()
    serializer_class = StudentModelSerializer

    def get(self, request, pk):
        """获取一条数据"""
        # 1. 使用pk作为条件，获取模型对象
        instance = self.get_object()  # 源码中含有pk
        '''等价于        
        try:
            student = Students.objects.get(pk=pk)
        except Students.DoesNotExist:
            return Response({"message": "学生不存在"}, status=status.HTTP_404_NOT_FOUND)
        '''
        # 2. 序列化
        serializer = self.get_serializer(instance=instance)
        # 3. 返回给客户端
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        """添加一条数据"""
        # 1. 使用pk作为条件，获取模型对象
        instance = self.get_object()
        # 2. 获取客户端提交的数据
        serializer = StudentModelSerializer(instance=instance, data=request.data)
        #       # 3. 反序列化（验证数据，存到数据库）
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # 4. 返回结果
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, pk):
        """删除一条数据"""
        self.get_object().delete()
        return Response({"message": "删除成功"}, status=status.HTTP_204_NO_CONTENT)

```

### 视图控制类

也叫混入类，作用：

提供了几种后端视图（对数据资源进行增删改查）处理流程的实现，如果需要编写的视图属于这五种，则视图可以通过继承相应的扩展类来复用代码。

这五个扩展类需要搭配GenericAPIView通用视图基类，因为五个扩展类的实现需要调用GenericAPIView提供的序列化器与数据查询的方法。

1. ListModelMixin

   列表视图扩展类，提供`list(request, *args, **kwargs)`方法快速实现列表视图，返回200状态码。该Mixin的list方法会对数据进行过滤和分页。

2. CreateModelMixin

   创建视图扩展类，提供`create(request, *args, **kwargs)`方法快速实现创建资源的视图，成功返回201状态码，数据验证失败返回400错误。

3. RetrieveModelMixin

   详情视图扩展类，提供`retrieve(request, *args, **kwargs)`方法，可以快速实现返回一个存在的数据对象。存在返回200，否则404。

4. UpdateModelMixin

   更新视图扩展类，提供`update(request, *args, **kwargs)`方法，可以快速实现更新一个存在的数据对象。同时也提供`partial_update(request, *args, **kwargs)`方法实现局部更新。成功返回200，验证数据失败返回400。

5. DestroyModelMixin

   删除视图扩展类，提供`destroy(request, *args, **kwargs)`方法， 可以快速实现删除一个存在的数据对象。成功返回204，不存在返回404。

in urls:

```py
from django.urls import path, re_path
from .views import StudentMixinView, StudentInfoMixinView


urlpatterns = [
    path('students3/', StudentMixinView.as_view()),
    re_path('students3/(?P<pk>\d+)/$', StudentInfoMixinView.as_view()),
]
```

in views:

```py
from sers.models import Students
from .serializers import StudentModelSerializer
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin


class StudentMixinView(GenericAPIView, CreateModelMixin, ListModelMixin):
    queryset = Students.objects.all()
    serializer_class = StudentModelSerializer

    def get(self, request):
        return self.list(request)

    def post(self, request):
        return self.create(request)


class StudentInfoMixinView(GenericAPIView, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = Students.objects.all()
    serializer_class = StudentModelSerializer

    def get(self, request, pk):
        return self.retrieve(request, pk)

    def put(self, request, pk):
        return self.update(request, pk)

    def delete(self, request, pk):
        return self.destroy(request, pk)

```

### 视图子类

之前的接口代码还可以继续更加精简，drf在使用GenericAPIView和Mixins进行组合后，还提供了视图子类（提供各种的视图方法调用Mixin操作）。

视图子类：

```py
ListAPIView = GenericAPIView + ListModelMixin	      获取多条数据的视图方法
CreateAPIView = GenericAPIView + CreateModelMixin      添加一条数据的视图方法
RetrieveAPIView = GenericAPIView + RetrieveModelMixin  获取一条数据的视图方法
UpdateAPIView = GenericAPIView + UpdateModelMixin      更新一条数据的视图方法
DestroyAPIView = GenericAPIView + DestroyModelMixin    删除一条数据的视图方法
```

组合视图类：

```py
ListCreateAPIView = ListAPIView + ListAPIView
RetrieveUpdateAPIView = RetrieveAPIView + UpdateAPIView
RetrieveDestroyAPIView = RetrieveAPIView + DestroyAPIView
RetrieveUpdateDestroyAPIView = RetrieveAPIView + UpdateAPIView + DestroyAPIView
```

直接导包继承即可

```py
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.generics import ListCreateAPIView


class StudentView(ListCreateAPIView):
    queryset = Students.objects.all()
    serializer_class = StudentModelSerializer


class StudentInfoView(RetrieveAPIView, UpdateAPIView, DestroyAPIView):
    queryset = Students.objects.all()
    serializer_class = StudentModelSerializer
```

上面的接口在实现过程中也存在代码重复情况，如果合并成一个接口类，则需要考虑两个问题：

- 路由的合并问题
- get方法重复问题

drf提供了一个视图集可以解决

## 视图集ViewSet

使用ViewSet，可以将一系列视图相关的代码逻辑和相关的HTTP请求动作封装到一个类中：

- list()提供一组数据
- retrieve()提供单个数据
- create()创建数据
- update()保存数据
- destroy()删除数据

ViewSet视图集类不再限制视图方法名只允许get()、post()等这种情况了，而是实现允许开发者根据自己的需要定义自定义方法名，例如list()、create()等，然后经过路由中使用HTTP和这些视图方法名进行绑定调用。视图集只在使用as_view()方法的时候，才会将action动作与具体请求方法对应上。

```
ViewSet				--> 基本视图集  解决APIView中的代码重复问题
GenericViewSet       --> 通用视图集  解决APIView中的代码重复问题，同时让代码更通用
```

### **ViewSet**

in urls:

```py
from django.urls import path, re_path
from .views import StudentViewSet


urlpatterns = [
    # 视图集
    path('students5/', StudentViewSet.as_view({
        'get': 'get_list',  # 视图类方法，可以是原来的HTTP请求动作，也可以是自定义的方法名
        'post': 'post',
    })),
    re_path('students5/(?P<pk>\d+)/$', StudentViewSet.as_view({
        'get': 'get_one',
        'put': 'update',
        'delete': 'delete',
    })),
]
```

in views:

```py
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from sers.models import Students
from .serializers import StudentModelSerializer


class StudentViewSet(ViewSet):
    def get_list(self, request):
        """获取所有学生信息"""
        student_list = Students.objects.all()
        serializer = StudentModelSerializer(instance=student_list, many=True)
        return Response(serializer.data, status=200)

    def post(self, request):
        """添加一条数据"""
        serializer = StudentModelSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get_one(self, request, pk):
        """获取一条数据"""
        try:
            student = Students.objects.get(pk=pk)
        except Students.DoesNotExist:
            return Response({"message": "学生不存在"}, status=status.HTTP_404_NOT_FOUND)
        serializer = StudentModelSerializer(instance=student)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk):
        """更新一条数据"""
        try:
            student = Students.objects.get(pk=pk)
        except Students.DoesNotExist:
            return Response({"message": "学生不存在"}, status=status.HTTP_404_NOT_FOUND)
        serializer = StudentModelSerializer(instance=student, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, pk):
        """删除一条数据"""
        try:
            student = Students.objects.get(pk=pk).delete()
        except Students.DoesNotExist:
            return Response({"message": "学生不存在"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"message": "删除成功"}, status=status.HTTP_204_NO_CONTENT)
```

### **GenericViewSet**

in urls:

```py
from django.urls import path, re_path
from .views import StudentGenericViewSet


urlpatterns = [
    path('students6/', StudentGenericViewSet.as_view({
        'get': 'list',  # 视图类方法，可以是原来的HTTP请求动作，也可以是自定义的方法名
        'post': 'post',
    })),
    re_path('students6/(?P<pk>\d+)/$', StudentGenericViewSet.as_view({
        'get': 'get_one',
        'put': 'update',
        'delete': 'delete',
    })),
]
```

in views:

```py
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework import status
from sers.models import Students
from .serializers import StudentModelSerializer


class StudentGenericViewSet(GenericViewSet):
    queryset = Students.objects.all()
    serializer_class = StudentModelSerializer

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(instance=queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = StudentModelSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get_one(self, request, pk):
        instance = self.get_object()
        serializer = self.get_serializer(instance=instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk):
        instance = self.get_object()
        serializer = StudentModelSerializer(instance=instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, pk):
        self.get_object().delete()
        return Response({"message": "删除成功"}, status=status.HTTP_204_NO_CONTENT)
```

### GenericViewSet+混入类

```py
class StudentGenericViewSet(GenericViewSet, ListAPIView, CreateAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView):
    queryset = Students.objects.all()
    serializer_class = StudentModelSerializer
```

上面接口类继承的父类太多了，我们可以继续合并视图集父类让视图继承

`ReadOnlyNodelViewSet = mixins.RetrieveModelMixin + mixins.ListModelMixin + GenericViewSet` --> 获取（一条或多条）数据

```py
from rest_framework.viewsets import ReadOnlyModelViewSet
class Student2GenericViewSet(ReadOnlyNodelViewSet, CreateAPIView, UpdateAPIView, DestroyAPIView):
    queryset = Students.objects.all()
    serializer_class = StudentModelSerializer
```

`ModelViewSet`实现5个API接口

```py
from rest_framework.viewsets import ModelViewSet
class Student3GenericViewSet(ModelViewSet):
    queryset = Students.objects.all()
    serializer_class = StudentModelSerializer
```

终极最简版本

# 路由Routers

对于视图集ViewSet，除了可以手动指明请求方式与action之间的对应关系外，还可以用Routers来帮助我们快速实现路由信息。如果非视图集，不需要使用路由集Routers。

rest framework提供了两个Router类，使用方式一致，多一个或少一个根目录url地址而已。

- SimpleRouter
- DefaultRouter

in urls:

```py
from rest_framework.routers import DefaultRouter, SimpleRouter
from .views import StudentModelViewSet

# 1. 实例化路由类
router = DefaultRouter()  # 或 router = SimpleRouter()
# 2. 给路由去注册视图集
router.register('students7', StudentModelViewSet, basename='students7')
# 3. 把生成的路由列表和urlpatterns进行拼接
urlpatterns += router.urls
```

## 视图集中附加action的声明

在视图集中，如果想要让Routers自动帮我们为自定义的动作生成路由信息，需要使用`rest_framework.decorators.action`装饰器。

以action装饰器装饰的方法名会作为action动作名，与list、retrieve等同。

action装饰器可以接受两个参数：

- methods：声明该action对应的请求方式，列表传递
- detail：声明该action的路径是否与单一资源对应
  - True表示路径格式为`xxx/<pk>/action方法名/`
  - False表示路径格式为`xxx/action方法名/`

- url_path：声明该action的路由尾缀。

```py
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action


class StudentModelViewSet(ModelViewSet):
    queryset = Students.objects.all()
    serializer_class = StudentModelSerializer

    @action(methods=["get"], detail=False, url_path="loginn")
    def login(self, request):
        return Response({"message": "登录成功"})
```

# 认证组件

认证组件中需要使用登录功能，所以我们使用Django内置的admin站点并创建一个管理员。

终端：`python manage.py createsuperuser`

settings中改成中文：`LANGUAGE_CODE = 'en-us'` --> `LANGUAGE_CODE = 'zh-hans'`

**认证Authentication**

可以在配置文件中配置全局默认的认证方案

常见的认证方式：cookie、session、token

外部库中`/site-packages/rest_framework/settings.py`默认配置文件

```py
'DEFAULT_AUTHENTICATION_CLASSES': [
    'rest_framework.authentication.SessionAuthentication',
    'rest_framework.authentication.BasicAuthentication'
],
```

in views:

```py
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response


class ExampleView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]

    def get(self, request):
        return Response({"msg": "ok"})
```

**自定义认证**：

在主文件夹中创建authentication.py:

```py
from rest_framework.authentication import BaseAuthentication
from django.contrib.auth import get_user_model


class CustomAuthentication(BaseAuthentication):
    """
    自定义认证方式
    """

    def authenticate(self, request):
        user = request.query_params.get('user')
        password = request.query_params.get('password')
        if user != 'root' or password != 'Xiao6666':
            return None

    # get_user model 获取当前系统中用户对应的用户模型类
        user = get_user_model().object.first()
        return (user, None)  # 按照固定的返回格式填写（用户模型对象，None）
```

in views:

```py
from rest_framework.views import APIView
from rest_framework.response import Response
from mydrf.authentication import CustomAuthentication

class ExampleView(APIView):
    authentication_classes = [CustomAuthentication]

    def get(self, request):
        print(request.user)
        if request.user.id:
            print("success")
        else:
            print("fail")
        return Response({"msg": "ok"})
```

地址栏：`[Example – Django REST framework](http://localhost:8000/opt/example/?user=root&pwd=...)`

**全局认证：**

settings配置：

```py
"""drf配置信息必须全部写在REST_FRAMEWORK配置项中"""
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'mydrf.authentication.CustomAuthentication',  # 自定义认证
        'rest_framework.authentication.SessionAuthentication',  # session认证
        'rest_framework.authentication.BasicAuthentication'  # 基本认证
    ],
}
```

在个别类中关闭：

```py
authentication_classes = []
```

# 权限Permissions

权限控制可以限制用户对于视图的访问和对于具有模型对象的访问

- 在执行视图的as_view()方法的despatch()方法前，会先进行视图访问权限的判断
- 在通过get_object()获取具体模型对象时，会进行模型对象访问权限的判断

使用

可以在配置文件settings中**全局**设置默认的权限管理类

```py
REST_FRAMEWORK = {
    ...  # 认证
    'DEFAULT_PERMISSION_CLASSES': [
        # 大部分企业的内部站点不允许其他人随意访问，都会默认全局设置
        # 针对login页面，可以在登录视图的视图类中设置permission_class=[]
        'rest_framework.permission.IsAuthenticated',
    ]
}
```

如果未指明，则采用如下默认配置rest_framework/settings.py

```py
'DEFAULT_PERMISSION_CLASSES': [
    'rest_framework.permission.AllowAny',
]
```

也可以在具体的视图中通过permission_classes属性来进行**局部**设置

```py
from django.contrib.auth.models import AnonymousUser
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from mydrf.authentication import CustomAuthentication 
from rest_framework.permission import AllowAny, IsAuthenticated

class HomeAPIView(APIView):
    # authentication_class = [CustomAuthentication, ]
    # permissin_classes = [AllowAny]  # 如果项目中大部分视图接口不允许直接访问，则可以全局配置权限认证，仅在部分不需要认证的视图类中加上AllowAny既可
    permission_classes = [IsAuthenticated]  # 如果项目中大部分视图接口允许直接访问，则可以不要权限认证的全局配置，仅在需要认证权限的视图下局部配置IsAuthenticated既可
    def get(self, request):
        """单独设置认证方式"""
        print(request.user)  # 在中间件AuthenticationMiddleware中完成用户身份识别的，如果没有登录request.user值为AnonymousUser
        if request.user.id is None:
            return Response("未登录用户：游客")
        else: return Response(f"已登录用户：{request.user}")
```

提供的权限

- AllowAny：运行所有用户，默认权限
- IsAuthenticated：仅通过登录认证的用户
- IsAdminUser：仅管理员用户
- IsAuthenticatedOreadOnly：已经登录认证的用户可以对数据进行增删改操作，没有登录认证的只能查看数据

**自定义权限**

需要继承rest_framework.permission.BasePermission父类，并实现以下两个任何一个方法或全部

- `.has_permission(self, request, view)`：是否可以访问视图，view表示当前视图对象
- `.has_object_permission(self, request, view, obj)`：是否可以访问模型对象，view表示当前视图，obj为模型数据对象

当主文件下创建一个权限文件mydrf.permission.py中声明自定义权限类：

```py
from rest_framework.permissions import BasePermission
class IsXiaoMingPermission(BasePermission):
    """自定义权限，可用于全局或局部配置"""
    def has_permission(self, request, view):
        """
        视图权限，返回结果True表示允许访问视图类
        request:本次客户端提交的请求对象
        view：本次客户端访问的视图类
        """
        # 写在自己要实现认证的代码过程
        # user = request.query_params.get("user")  # 为True表示放行
        # return user == "xiaoming"
        return True
    
    def has_object_permission(self, request, view, obj):
        """
        模型权限，写了视图权限一般就不用写这个了
        返回结果为True表示允许操作模型对象
        """
        from school.models import Student
        if isinstance(obj, Student):
            # 限制只有小明才能操作Student模型
            user = request.query_params.get("user")
            return user == "xiaoming"
        else:
            #操作其他模型，直接放行
            return True
```

<u>与认证的区别</u>

认证主要的作用就是识别客户端的访问者身份，但是不能拦截客户端的访问。

权限是基于认证来实现的，可以针对不同身份的用户进行拦截。

# 限流Throttling

可以对接口访问的频次进行限制，以减轻服务器压力，或实现特定的业务。一般用于付费购买次数，投票等场景使用。

基本使用

在配置文件中，使用`DEFAULT_THROTTLE_CLASSES`和`DEFAULT_THROTTLE_RATES`进行**全局**配置

```py
REST_FRAMEWORK = {
    # 限制全局配置
    # 'DEFAULT_THROTTLE_CLASSES':[
    #     # 限制配置类
    #     'rest_framework.throttling.AnonRateThrottle', # 为认证用户[未登录]
    #   'rest_framework.throttling.UserRateThrottle', # 已认证用户[已登录]
    #] 
    'DEFAULT_THROTTLE_RATES':[
        # 频率配置
        'anon': '2/day', # 针对游客的访问频率进行限制，实际上，drf只识别首字母，但为了提高代码的维护性，建议写完整单词
        'user': '5/day', # 针对会员的访问频率进行限制
    ]
}
```

`DEFAULT_THROTTLE_RATES`可以使用second,minute,hour,day来指明周期

也可以在具体的视图中通过throttle_classes属性来**局部**配置

```py
from rest_framework.throttling import UserRateThrottle
class Student2ModelViewSet(ModelViewSet):
    queryset = Student.objects
    serializer_class = StudentModelSerializer
    # 限流局部配置[这里需要配合在全局配置中的DEFAULT_THROTTLE_RATES来设置频率]
    throttle_classes = [UserRateThrottle]
```

可选限流类

- AnonRateThrottle：限制所有匿名未认证用户，使用ip（结合设备信息）区分用户，使用`DEFAULT_THROTTLE_RATES['anon']`来设置频次
- UserRateThrottle：限制认证用户，使用User模型的id主键来区分，使用`DEFAULT_THROTTLE_RATES['user']`来设置频次
- ScopedRateThrottle（自定义）限制用户对于每个视图的访问频次，使用ip或user id

```py
REST_FRAMEWORK = {
    # 限制全局配置
    'DEFAULT_THROTTLE_CLASSES':[
        # 限制配置类
        # 'rest_framework.throttling.AnonRateThrottle',
        # 'rest_framework.throttling.UserRateThrottle', 
        'rest_framework.throttling.ScopedRateThrottle', # 基于自定义的命名空间来先限流
    ] 
    'DEFAULT_THROTTLE_RATES':[
        'anon': '2/day',
        'user': '5/day', 
        'member': '3/d',
        'vip': '3/h',
        'vvip': '3/m',
    ]
}
```

in views:

```py
class Demo1APIView(APIView):
	'''自定义限流'''
    permission_classes = [IsAuthenticated]
    throttle_scope = 'member'
    def get(self, request):
        return Response({'msg': 'ok'})
    
class Demo2APIView(APIView):
	'''自定义限流'''
    permission_classes = [IsAuthenticated]
    throttle_scope = 'vip'
    def get(self, request):
        return Response({'msg': 'ok'}) 
    
 class Demo3APIView(APIView):
	'''自定义限流'''
    permission_classes = [IsAuthenticated]
    throttle_scope = 'vvip'
    def get(self, request):
        return Response({'msg': 'ok'})   
```

# 过滤

对于列表数据可能需要根据字段进行过滤，添加Django-filter扩展来增强支持

`pip install django-filter`，需要注册`'django_filters'`

在配置文件中增加过滤器类的**全局**设置

```py
'''drf配置信息必须全部写在REST_FRAMEWORK配置项中'''
REST_FRAMEWORK = {
    ...
    'DEFAULT_FILTER_BACKENDS': [
        'django_filter.rest_framework.DjangoFilterBackend'
    ],
}
```

在视图类中添加类属性filter_fields，指定可以过滤的字段

```py
class HomeAPIView
	queryset = Student.objects.all()
    serializer_class = StudentModelSerializer
    filter_fields = ['sex', 'classmate']
    # list方法中进行调用，调用了GenericAPIView中声明的filter_queryset方法，
    
# 单个字段过滤
# http://127.0.0.1:8000/opt/s4/?classmate=502
# http://127.0.0.1:8000/opt/s4/?sex=1
# 多个字段过滤
# http://127.0.0.1:8000/opt/s4/?classmate=502&sex=2
```

**局部**配置，直接在视图中，指定当前视图类中调用的过滤器类

```py
from rest_framework.viewsets import ModelViewSet
from students.models import Student
from students.serializers import StudentModelSerializer
from django_filters.rest_framework import DjangoFilterBackend

class HomeAPIView(ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentModelSerializer
    # 局部
    filter_backends = [DjangoFilterBackend, ]
    filter_fields = ['sex', 'classmate']
```

# 排序Ordering

对于列表数据，rest framework提供了OrderingFilter过滤器来帮助我们快速指明数据按照指定字段进行排序。

使用方法：

在类视图中设置filter_backends，使用`rest_framework.filters.OrderingFilter`过滤器，rest framework会在请求的查询字符串参数中检查是否包含了ordering参数，如果是，则按照ordering参数指明的排序字段对数据集进行排序。

前端可以传递的ordering参数的可以选字段需要再ordering_fields中指明。

配置文件：

```py
REST_FRAMEWORK = {
    ...
    # 过滤查询，全局配置
    # 过滤和排序使用了一个公用的配置项，所以两个组件要么一起全局配置，要么一起局部配置
    'DEFAULT_FILTER_BACKENDS': [
        'django_filter.rest_framework.DjangoFilterBackend', # 过滤
        'rest_framework.filters.OrderingFilter', # 排序
    ],
}
```

视图中：

```py
class HomeAPIView(ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentModelSerializer

    filter_fields = ['sex', 'classmate']
    ordering_fields = ['id', 'age']
    
# 127.0.0.1:8000/books/?ordering=-age   # -id表示倒序
```

一起局部配置：

```py
from rest_framework.viewsets import ModelViewSet
from students.models import Student
from students.serializers import StudentModelSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

class HomeAPIView(ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentModelSerializer
    # 局部
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filter_fields = ['sex', 'classmate']
    ordering_fields = ['id', 'age']
```

# 分页Pagination

因为Django默认提供的分页器只要使用于前后端不分离的业务场景，rest framework也提供了分页支持。

可以在配置文件中设置**全局**(很少用)的分页方式：

```py
REST_FRAMEWORK = {
    # 分页，全局配置
    # 页码分页器，  ？page=页码&page_size=单页数据量
    # 'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    # 偏移量分页器，  ？limit=单页数据量&offset=数据开始下标
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 10 # 每页数目，如果不设置则没有进行分配
}
```

如果在settings.py配置文件中，设置了全局分页，那么在drf中凡是调用了`ListModelMixin的list()`，都会自定分页。如果项目中出现大量需要分页的数据，只有少数部分的不需要，则可以在少部分的视图类中关闭分页功能--> `pagination_class = None`。

视图类在使用过分页以后，务必在表写queryset属性时，模型.objects后面调用结果，如：`Student.objects.all()`

**局部**

可以通过自定义Pagination类，来为视图添加不同分页行为，在视图中通过`pagination_class`属性来指明。

```py
from rest_framework.generics import ListAPIView
from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination

class DemoAPIView(ListAPIView):
	queryset = Student.objects.all()
    serializer_class = StudentModelSerializer
    
    # 局部配置分页功能
    pagination_class = LimitOffsetPagination  # 仍需在配置文件中保留'PAGE_SIZE': 10
```

方法二，自定义分页器，创建paginations.py:

```py
class StudentPageNumberPagination(PageNumberPagination):
	page_query_param = 'page'  # 查询字符串中代表页码的变量名
    page_size_query_param = 'size'  # 查询字符串中代表每一页数据的变量名
    page_size = 10  # 每一页的数据量
    max_page_size = 50  # 允许客户端通过查询字符串调整的最大单页数据量
```

视图中：

```py
from .paginations import StudentPageNumberPagination
class DemoAPIView(ListAPIView):
	queryset = Student.objects.all()
    serializer_class = StudentModelSerializer
    pagination_class = StudentPageNumberPagination 
```

# 异常处理Exceptions

rest framework本身在APIView提供了异常处理，但是仅针对drf内部现有的接口开发相关的异常进行格式处理，但在开发中我们还会使用到各种的数据或者进行各种网络请求，这些都有可能导致出现异常，这些异常在drf中是没有进行处理的，所以就会冒泡Django，Django会进行组织错误信息，作为HTML页面返回给客户端，所在前后端分离项目中，可能js无法理解或者无法接受到这种数据，甚至导致js出现错误的情况。因此为了避免出现这种情况，我们可以自定义一个属于自己的异常处理函数，对于drf无法处理的异常，我们自己编写异常处理代码逻辑。

针对于现有的drf异常处理进行额外添加属于开发者自己的逻辑代码，一般我们编写的异常处理函数会写一个公共的目录下或者主应用下。这里主应用下直接创建一个excepitions.py：

```py
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
# 针对MySQL、MongoDB、Redis、第三方数据接口
def custom_exception_handler(exc, contexts):
    """
    自定义异常函数
    exc：异常实例对象，发生异常时实例化出来
    context：字典，异常发生时Python解释器收集执行上下文信息，即Python解释器在执行代码时保存在内存中的变量、函数、类、对象、模块等一系列信息组成的环境信息
    """
    # 先让drf把自己能处理的异常先处理完成
    response = exception_handler(exc, context)
    # 返回值是None,则当前发生的异常drf无法处理
    if response is None:
        """当前发生的异常drf没用进行处理"""
        if isinstance(exc, ZeroDivisionError):
            response = Response({'detail': exc.detail})
    return response
```

最后在配置文件中添加：

```py
'EXCEPTION_HANDLER': 'mydrf.exceptions.custom_exception_handler'
```

rest framework定义的异常：

<img src="/python/DRF/DRF.assets/image-20240302102732412-749.webp" srcset="/python/DRF/DRF.assets/image-20240302102732412-749.webp 1x" width="749" height="469" data-full-src="/python/DRF/DRF.assets/image-20240302102732412.png" alt="image-20240302102732412" style="zoom:80%;"  loading="lazy" decoding="async" />

# 自动生成接口文档

rest framework 可以自动帮我们生成接口文档，接口文档以网页的方式呈现，自动接口文档生成的是继承自APIView及其子类的视图。

需要`coreapi`库的支持：`pip install coreapi`

设置接口文档访问路径，在总路由中添加文档路径

文档路由对应的视图配置为`rest_framework.documentation.include_docs_urls`

参数title为接口文档网站的标题。

总路由：

```py
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    ...
    path('docs/', include_docs_urls(title="站点页面标题"))
]
```

settings.py:

```py
'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.AutoSchema'
```

方法二：

`pip install drf-yasg`  在配置文件中直接注册`drf_yasg`

总路由：

```py
from django.urls import path, include
from rest_framework.documentation import include_docs_urls

# yasg的视图配置类，用于生成api
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
schema_view = get_schema_view(
	openapi.Info(
    	title='drf接口文档',       # 必传
        default_version='v1.0,0',  #必传
        desciption='描述信息',
        terms_of_service='',
        contact=openapi.Contact(email='2303479606@qq.com'),
        license=openapi.License(name='协议版本')
    ),
    public=True,  # 允许所有人访问，和下面互斥
    # permission_classes=(rest_framework.permission.AllowAny)  # 权限类
)
urlpatterns = [
    ...
    path('doc/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger'),
]
```

