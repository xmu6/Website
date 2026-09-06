---
title: Django3 入门
date: 2026-09-06 08:00:00
categories:
  - Python
tags:
  - Django
  - Web 开发
  - 后端
coverImg: /covers/python-django.webp
permalink: /python/p1q2r
---

# web框架底层

- CS架构：开发应用程序，qq、pycharm、网易云，开发客户端+服务端
- BS架构：浏览器、服务器，只开发服务端

基于Django开发的本质就是网站（web应用），电脑上浏览器本质上是socket实现网络通信。

- 协议：HTTP协议特点：无状态的短连接（一次请求和一次相应后断开连接）。应用：浏览器向服务器发送请求，就是按该协议。请求头+请求体。请求头和请求头间用\r\n\r\n;请求头间用\r\n

常见web框架：Django、flask、tornado、sanic、fastapi

<img src="/python/Django3/Django3.assets/image-20240206105904384-880.webp" srcset="/python/Django3/Django3.assets/image-20240206105904384-880.webp 1x, /python/Django3/Django3.assets/image-20240206105904384-1007.webp 2x" alt="image-20240206105904384" width="880" height="162" loading="lazy" decoding="async" data-full-src="/python/Django3/Django3.assets/image-20240206105904384.png">

- 各框架区别：①Django，内部提供了很多组件【相对大】；②其他，本身功能小+第三方组件【相对小】

   异步非阻塞：tornado、sanic、fastapi、Django（不好）

  同步：Django、flask

# 创建

- 命令行（服务器操作使用）

  - 创建![image-20240206110052532](/python/Django3/Django3.assets/image-20240206110052532.png)

    Python3.12中还需先`pip install setuptools`

  - 运行![image-20240206110104571](/python/Django3/Django3.assets/image-20240206110104571.png)

  - 虚拟环境：`pip install virtualenv`；`virtualenv 环境名 -–python=python3.9`<img src="/python/Django3/Django3.assets/image-20240206112424378.png" alt="image-20240206112424378" style="zoom:67%;" />

- pycharm

  - 创建（不推荐，除非默认下最新版Django）

    <img src="/python/Django3/Django3.assets/image-20240206110845704-673.webp" srcset="/python/Django3/Django3.assets/image-20240206110845704-673.webp 1x" alt="image-20240206110845704" width="673" height="488" loading="lazy" decoding="async" data-full-src="/python/Django3/Django3.assets/image-20240206110845704.png">

    最好创建好虚拟后再`pip install Django==3.2`再<img src="/python/Django3/Django3.assets/image-20240206110921080-444.webp" srcset="/python/Django3/Django3.assets/image-20240206110921080-444.webp 1x" width="444" height="31" data-full-src="/python/Django3/Django3.assets/image-20240206110921080.png" alt="image-20240206110921080" style="zoom:80%;"  loading="lazy" decoding="async" />

    再配置<img src="/python/Django3/Django3.assets/image-20240206111028247-507.webp" srcset="/python/Django3/Django3.assets/image-20240206111028247-507.webp 1x" alt="image-20240206111028247" width="507" height="325" loading="lazy" decoding="async" data-full-src="/python/Django3/Django3.assets/image-20240206111028247.png">

    改名后直接fix，再填根目录和settings就搞定

- APP创建

  `python manage.py startapp 名字`

  App（应用 ）概念

<img src="/python/Django3/Django3.assets/image-20240206111218997-790.webp" srcset="/python/Django3/Django3.assets/image-20240206111218997-790.webp 1x" width="790" height="181" data-full-src="/python/Django3/Django3.assets/image-20240206111218997.png" alt="image-20240206111218997" style="zoom:80%;"  loading="lazy" decoding="async" />

<img src="/python/Django3/Django3.assets/image-20240206111228553-567.webp" srcset="/python/Django3/Django3.assets/image-20240206111228553-567.webp 1x" alt="image-20240206111228553" width="567" height="287" loading="lazy" decoding="async" data-full-src="/python/Django3/Django3.assets/image-20240206111228553.png">

​	app创建建议

<img src="/python/Django3/Django3.assets/image-20240206111306080-369.webp" srcset="/python/Django3/Django3.assets/image-20240206111306080-369.webp 1x" alt="image-20240206111306080" width="369" height="210" loading="lazy" decoding="async" data-full-src="/python/Django3/Django3.assets/image-20240206111306080.png">

​	创建多个时用apps文件夹管理所有app：先创建好所有app文件夹

<img src="/python/Django3/Django3.assets/image-20240206111334722-430.webp" srcset="/python/Django3/Django3.assets/image-20240206111334722-430.webp 1x" alt="image-20240206111334722" width="430" height="226" loading="lazy" decoding="async" data-full-src="/python/Django3/Django3.assets/image-20240206111334722.png">

​	然后更改apps.py<img src="/python/Django3/Django3.assets/image-20240206111350606-477.webp" srcset="/python/Django3/Django3.assets/image-20240206111350606-477.webp 1x" alt="image-20240206111350606" width="477" height="74" loading="lazy" decoding="async" data-full-src="/python/Django3/Django3.assets/image-20240206111350606.png">

## 	注册app

在INSATLLED_APPS中

```py
INSTALLED_APPS = [
    # 注册app
    'apps.api.apps.ApiConfig'
    'apps.web.apps.WebConfig'
]
```



- 打开（别人）项目<img src="/python/Django3/Django3.assets/76f159f75aa12cce7d6e48716a19a3c8.png" alt="76f159f75aa12cce7d6e48716a19a3c8" style="zoom:60%;" />，下载依赖包

## 纯净版（注释部分完成瘦身）

```py
INSTALLED_APPS = [
    # 'django.contrib.admin',  # 登录界面
    # 'django.contrib.auth',  # 权限管理
    # 'django.contrib.contenttypes',  # 表结构设计
    # 'django.contrib.sessions',  # session表
    # 'django.contrib.messages',  # 传递信息
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    # 'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    # 'django.contrib.auth.middleware.AuthenticationMiddleware',
    # 'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'mysite3.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                # 'django.contrib.auth.context_processors.auth',
                # 'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```



# 基础知识点

## 路由系统

本质上：url与函数的对应关系

### 匹配

```py
urlpatterns = [
    path('news/<int:nid>/', views.news),
]
```

→localhost:8000/news/<u>6</u>/edit/

​	在views.py中定义函数：

```py
def news(request, nid):
    print(nid)
    return HttpResponse("news")
```



​	对于<>冒号前部，`int`：整数；`str`：字符串；`slug`：字母数字下划线横杠；`uuid`：uuid格式（随机生成字符串）；`path`：路径，可包含/

​	正则表达式写法（现在不常用）

```py
from django.urls import path
from apps.web import views
urlpatterns = [
    path('news/<int:nid>/', views.news),
    re_path(r'user/(\d+)/', views.users),
]
```

### 路由分发

应用场景：想要把某些URL前缀提取出来

- include分发

当功能过多时全部放在`urlpatterns = [path(...), ...]`中不便于整理，最好通过功能作用进行拆分。

```py
from django.urls import path, re_path, include
from apps.web import views
urlpatterns = [
    path('api/', include('apps.api.urls')),
    path('web/', include('apps.web.urls'))
    # path('news/<int:nid>/', views.news),
    # re_path(r'user/(\d+)/', views.users)
]
```

需要在用到的app中新建urls.py文件

in api.urls

```py
from django.urls import path
from apps.api import views
urlpatterns = [
    path('auth/', views.auth),
    path('login/', views.login)
]
```

in api.views

```py
from django.shortcuts import render, HttpResponse


# Create your views here.
def auth(request):
    return HttpResponse("Hello, world. You're at the")


def login(request):
    return HttpResponse("jinlai")
```

in web.urls

```py
from django.urls import path, re_path
from apps.web import views

urlpatterns = [
    path('news/<int:nid>/', views.news),
    re_path(r'user/(\d+)/', views.users)
]
```

in web.views

```py
from django.shortcuts import render, HttpResponse


def news(request, nid):
    print(nid)
    return HttpResponse("news")


def users(request, xid):
    print(xid)
    return HttpResponse("users")

```

- 手动分发

  <img src="/python/Django3/Django3.assets/9d96b621680432da8d48dd71af9962c4-846.webp" srcset="/python/Django3/Django3.assets/9d96b621680432da8d48dd71af9962c4-846.webp 1x" width="846" height="414" data-full-src="/python/Django3/Django3.assets/9d96b621680432da8d48dd71af9962c4.png" alt="9d96b621680432da8d48dd71af9962c4" style="zoom:60%;"  loading="lazy" decoding="async" />

- 路由分发的本质

  - url对应函数`path('user/add/', view.login),`

  - url对应元组`path('user/add/', (...)),`；`path('user/add/', include("..."))`

    include()返回值为元组→`([], None, None)`

    补充：动态导入模块<img src="/python/Django3/Django3.assets/ed830088aa35c057c29defd98f4bc30d-684.webp" srcset="/python/Django3/Django3.assets/ed830088aa35c057c29defd98f4bc30d-684.webp 1x" width="684" height="263" data-full-src="/python/Django3/Django3.assets/ed830088aa35c057c29defd98f4bc30d.png" alt="ed830088aa35c057c29defd98f4bc30d" style="zoom:60%;"  loading="lazy" decoding="async" />

  - include内部也可直接传元组，源码`def include(arg, namespace=None):pass`

    <img src="/python/Django3/Django3.assets/25509203d6a86b8719fc41cd0bbb4b10-719.webp" srcset="/python/Django3/Django3.assets/25509203d6a86b8719fc41cd0bbb4b10-719.webp 1x" width="719" height="198" data-full-src="/python/Django3/Django3.assets/25509203d6a86b8719fc41cd0bbb4b10.png" alt="25509203d6a86b8719fc41cd0bbb4b10" style="zoom:60%;"  loading="lazy" decoding="async" />

### name

给路由（对应关系）起个名字，在path的参数中

用处：跳转中反向生成url<img src="/python/Django3/Django3.assets/8e55458253f573986dd9db47ea6fbca2-697.webp" srcset="/python/Django3/Django3.assets/8e55458253f573986dd9db47ea6fbca2-697.webp 1x" width="697" height="136" data-full-src="/python/Django3/Django3.assets/8e55458253f573986dd9db47ea6fbca2.png" alt="8e55458253f573986dd9db47ea6fbca2" style="zoom:60%;"  loading="lazy" decoding="async" />

<img src="/python/Django3/Django3.assets/2d0a85d75e1e69e576bc04f717e84b1a-649.webp" srcset="/python/Django3/Django3.assets/2d0a85d75e1e69e576bc04f717e84b1a-649.webp 1x" width="649" height="152" data-full-src="/python/Django3/Django3.assets/2d0a85d75e1e69e576bc04f717e84b1a.png" alt="2d0a85d75e1e69e576bc04f717e84b1a" style="zoom:50%;"  loading="lazy" decoding="async" /><img src="/python/Django3/Django3.assets/fb2648073564f9de732204ae17caa72a-448.webp" srcset="/python/Django3/Django3.assets/fb2648073564f9de732204ae17caa72a-448.webp 1x" width="448" height="73" data-full-src="/python/Django3/Django3.assets/fb2648073564f9de732204ae17caa72a.png" alt="fb2648073564f9de732204ae17caa72a" style="zoom:60%;"  loading="lazy" decoding="async" />

有动态URL时<img src="/python/Django3/Django3.assets/02e7ede2dc339a3dc854d50aea657cb7-880.webp" srcset="/python/Django3/Django3.assets/02e7ede2dc339a3dc854d50aea657cb7-880.webp 1x, /python/Django3/Django3.assets/02e7ede2dc339a3dc854d50aea657cb7-1596.webp 2x" alt="02e7ede2dc339a3dc854d50aea657cb7" width="880" height="286" loading="lazy" decoding="async" data-full-src="/python/Django3/Django3.assets/02e7ede2dc339a3dc854d50aea657cb7.png">

<img src="/python/Django3/Django3.assets/9793d43fd06e85c544e9d31a74a52012-880.webp" srcset="/python/Django3/Django3.assets/9793d43fd06e85c544e9d31a74a52012-880.webp 1x, /python/Django3/Django3.assets/9793d43fd06e85c544e9d31a74a52012-1669.webp 2x" alt="9793d43fd06e85c544e9d31a74a52012" width="880" height="331" loading="lazy" decoding="async" data-full-src="/python/Django3/Django3.assets/9793d43fd06e85c544e9d31a74a52012.png">

### namespace

辅助name，防止协同开发时命名相同

主路由

```py
from django.urls import path, include
urlpatterns = [
    path('api/', include('apps.api.urls'), namespace="x1"),  # namespace
]
```

api/urls.py

```py
from django.urls import path
from apps.api import views
urlpatterns = [
    path('auth/', views.auth, name='auto'),
    path('login/', views.login, name='login')
]
app_name = "api"  # 注意：加了namespace后要在urls里设置app_name
```

以后反向生成时

```py
from django.urls import reverse
url = reverse("x1:login")  # /api/login/  需要将namespace写在前面
```

手动分发时<img src="/python/Django3/Django3.assets/fc27091c717a6b9d19fd7e3af3517b87-485.webp" srcset="/python/Django3/Django3.assets/fc27091c717a6b9d19fd7e3af3517b87-485.webp 1x" alt="fc27091c717a6b9d19fd7e3af3517b87" width="485" height="163" loading="lazy" decoding="async" data-full-src="/python/Django3/Django3.assets/fc27091c717a6b9d19fd7e3af3517b87.png">

## 视图

文件或文件夹（views），功能复杂时删除views.py，创建views文件夹

### request对象

 存放了浏览器发过来的所有内容，含有请求相关所有数据：

- 当前访问URL、请求方式、...
- Django额外添加的数据，如匹配的路由

在功能函数中获取request的内容：

```py
def login(request):

    # 1.当前url
    print(request.path_info)

    # 2.url传递的参数  ?后的内容
    print(request.GET)

    # 3.请求方式
    print(request.method)

    # 4.若post，传递请求体（原始数据格式）
    print(request.body)

    # 4.1 请求体+请求头  b'v1=123&v2=456' + content-type"application/x-www-form-urlencode
    print(request.POST)
    print(request.POST.get("v1"))
    print(request.POST.get("v2"))
    # 常登录时使用

    # 4.2 请求体+请求头  文件
    print(request.FILES)  # 文件格式  +multipart/form-data
    
    # 5.请求头
    print(request.headers)  
	
    # 5.1 cookie
    print(request.COOKIES)  # 自动切割成字典
    
    # 6.其他
    print(request.resolver_match)  # 路由对象
    
    return HttpResponse("success")
```

### 返回数据

- 字符串/字节/文本数据(图片验证码)：HttpResponse()

- JSON格式

```py
from django.http import JsonResponse
def login(request):
    data_dict = {"status": True, "data": [11, 22, 33]}
    return JsonResponse(data_dict)
```

- 重定向

`return redirect("https://www.baidu.com")`

重定向方式<img src="/python/Django3/Django3.assets/914cbc9e783d59bcc1788d17f065ae2f-880.webp" srcset="/python/Django3/Django3.assets/914cbc9e783d59bcc1788d17f065ae2f-880.webp 1x, /python/Django3/Django3.assets/914cbc9e783d59bcc1788d17f065ae2f-1669.webp 2x" width="880" height="456" data-full-src="/python/Django3/Django3.assets/914cbc9e783d59bcc1788d17f065ae2f.png" alt="914cbc9e783d59bcc1788d17f065ae2f" style="zoom: 40%;"  loading="lazy" decoding="async" />

- 渲染

  `return render(request, 'login.html')`

  - 对于html文件，默认先去settings里的TEMPLATES.DIRS中找，再按注册顺序去每个已注册的app中找他的templates目录
  - 渲染（替换）得到替换完成的字符串
  - 返回浏览器

- 响应头

<img src="/python/Django3/Django3.assets/bb3b2d412cfb7a336648eb129ac902ba-442.webp" srcset="/python/Django3/Django3.assets/bb3b2d412cfb7a336648eb129ac902ba-442.webp 1x" width="442" height="330" data-full-src="/python/Django3/Django3.assets/bb3b2d412cfb7a336648eb129ac902ba.png" alt="bb3b2d412cfb7a336648eb129ac902ba" style="zoom:60%;"  loading="lazy" decoding="async" />

### FBV和CBV

- FBV，视图用函数形式编写。（主流）

- CBV，视图用类的形式编写。

  给出类的例子：

  <img src="/python/Django3/Django3.assets/c96fbafa9d54ccad9dc4cc474e297d93-880.webp" srcset="/python/Django3/Django3.assets/c96fbafa9d54ccad9dc4cc474e297d93-880.webp 1x, /python/Django3/Django3.assets/c96fbafa9d54ccad9dc4cc474e297d93-909.webp 2x" alt="c96fbafa9d54ccad9dc4cc474e297d93" width="880" height="434" loading="lazy" decoding="async" data-full-src="/python/Django3/Django3.assets/c96fbafa9d54ccad9dc4cc474e297d93.png">

  本质上都是函数，源码：

  ```py
      @classonlymethod
      def as_view(cls, **initkwargs):
          """Main entry point for a request-response process."""
          for key in initkwargs:
              if key in cls.http_method_names:
                  raise TypeError(
                      'The method name %s is not accepted as a keyword argument '
                      'to %s().' % (key, cls.__name__)
                  )
              if not hasattr(cls, key):
                  raise TypeError("%s() received an invalid keyword %r. as_view "
                                  "only accepts arguments that are already "
                                  "attributes of the class." % (cls.__name__, key))
  
          def view(request, *args, **kwargs):
              self = cls(**initkwargs)   # 创建了UsersView的对象
              self.setup(request, *args, **kwargs)
              if not hasattr(self, 'request'):
                  raise AttributeError(
                      "%s instance has no 'request' attribute. Did you override "
                      "setup() and forget to call super()?" % cls.__name__
                  )
              return self.dispatch(request, *args, **kwargs)
          view.view_class = cls
          view.view_initkwargs = initkwargs
  
          # take name and docstring from class
          update_wrapper(view, cls, updated=())
  
          # and possible attributes set by decorators
          # like csrf_exempt from dispatch
          update_wrapper(view, cls.dispatch, assigned=())
          return view  # 返回函数
  ```

## 静态资源

- 开发需要：css、js、图片
  - `根目录的 /static/`
  - `已注册的app /static/ 文件夹下`
- 媒体文件：用户上传数据
  - `根目录的 /media/`

### 静态文件

- 寻找顺序：先根目录里的`/static/`，再已注册的app的 `/static/`

- 多app开发：各自app图片放在各自`/static/app名字/...`
- <img src="/python/Django3/Django3.assets/0bd90cbcf0ef1c14df2260b47a24c660-506.webp" srcset="/python/Django3/Django3.assets/0bd90cbcf0ef1c14df2260b47a24c660-506.webp 1x" width="506" height="755" data-full-src="/python/Django3/Django3.assets/0bd90cbcf0ef1c14df2260b47a24c660.png" alt="0bd90cbcf0ef1c14df2260b47a24c660" style="zoom:60%;"  loading="lazy" decoding="async" />

### 媒体文件

<img src="/python/Django3/Django3.assets/19ef67e5f6985b5a955b30d702a831b2-824.webp" srcset="/python/Django3/Django3.assets/19ef67e5f6985b5a955b30d702a831b2-824.webp 1x" alt="19ef67e5f6985b5a955b30d702a831b2" width="824" height="104" loading="lazy" decoding="async" data-full-src="/python/Django3/Django3.assets/19ef67e5f6985b5a955b30d702a831b2.png">

<img src="/python/Django3/Django3.assets/46b1acaeac47cbc12484252f088d86c7-367.webp" srcset="/python/Django3/Django3.assets/46b1acaeac47cbc12484252f088d86c7-367.webp 1x" width="367" height="377" data-full-src="/python/Django3/Django3.assets/46b1acaeac47cbc12484252f088d86c7.png" alt="46b1acaeac47cbc12484252f088d86c7" style="zoom:67%;"  loading="lazy" decoding="async" />

# 进阶知识点

## 模版

### 寻找html过程

在根目录（已注册app文件夹）中创建templates文件夹

<img src="/python/Django3/Django3.assets/c7a3a1b8fff095c3807d47a58752d56a-880.webp" srcset="/python/Django3/Django3.assets/c7a3a1b8fff095c3807d47a58752d56a-880.webp 1x, /python/Django3/Django3.assets/c7a3a1b8fff095c3807d47a58752d56a-949.webp 2x" width="880" height="512" data-full-src="/python/Django3/Django3.assets/c7a3a1b8fff095c3807d47a58752d56a.png" alt="c7a3a1b8fff095c3807d47a58752d56a" style="zoom:60%;"  loading="lazy" decoding="async" />

- 优先去项目根目录dirs > 每个已注册的app的 templates目录找。

- 选择：

  简单项目直接放根目录；复杂的项目放在各自的app 中，公共部分放在templates目录。（注：app的templates文件夹再嵌套一个app名文件夹，防止重名）

### 模版处理的本质

- 打开 app/index.html 文件，读取内容
- 渲染，得到一个渲染完成的文本
- 将文本返回给浏览器

### 常用语法

<img src="/python/Django3/Django3.assets/ab3591aa80b61ed1eedaaefb68b4020f-880.webp" srcset="/python/Django3/Django3.assets/ab3591aa80b61ed1eedaaefb68b4020f-880.webp 1x, /python/Django3/Django3.assets/ab3591aa80b61ed1eedaaefb68b4020f-1710.webp 2x" alt="ab3591aa80b61ed1eedaaefb68b4020f" width="880" height="313" loading="lazy" decoding="async" data-full-src="/python/Django3/Django3.assets/ab3591aa80b61ed1eedaaefb68b4020f.png">

<img src="/python/Django3/Django3.assets/d32865244a7ba95adffd4df3bf37adef-397.webp" srcset="/python/Django3/Django3.assets/d32865244a7ba95adffd4df3bf37adef-397.webp 1x" width="397" height="449" data-full-src="/python/Django3/Django3.assets/d32865244a7ba95adffd4df3bf37adef.png" alt="d32865244a7ba95adffd4df3bf37adef" style="zoom:60%;"  loading="lazy" decoding="async" />

- 自定义filter（此处创建jp.py）

  <img src="/python/Django3/Django3.assets/95c2deb341850db82e73f3c283623ce3-880.webp" srcset="/python/Django3/Django3.assets/95c2deb341850db82e73f3c283623ce3-880.webp 1x, /python/Django3/Django3.assets/95c2deb341850db82e73f3c283623ce3-1224.webp 2x" alt="95c2deb341850db82e73f3c283623ce3" width="880" height="213" loading="lazy" decoding="async" data-full-src="/python/Django3/Django3.assets/95c2deb341850db82e73f3c283623ce3.png">

- 自定义simple_tag

  <img src="/python/Django3/Django3.assets/47e194dd19fc3081959a04de6ad950f0-880.webp" srcset="/python/Django3/Django3.assets/47e194dd19fc3081959a04de6ad950f0-880.webp 1x, /python/Django3/Django3.assets/47e194dd19fc3081959a04de6ad950f0-1340.webp 2x" alt="47e194dd19fc3081959a04de6ad950f0" width="880" height="158" loading="lazy" decoding="async" data-full-src="/python/Django3/Django3.assets/47e194dd19fc3081959a04de6ad950f0.png">

- 自定义inclusion_tag

  <img src="/python/Django3/Django3.assets/a2605ec6e16905f64bf8bed09b01b45e-880.webp" srcset="/python/Django3/Django3.assets/a2605ec6e16905f64bf8bed09b01b45e-880.webp 1x, /python/Django3/Django3.assets/a2605ec6e16905f64bf8bed09b01b45e-1325.webp 2x" alt="a2605ec6e16905f64bf8bed09b01b45e" width="880" height="128" loading="lazy" decoding="async" data-full-src="/python/Django3/Django3.assets/a2605ec6e16905f64bf8bed09b01b45e.png">

- 三种自定义对比
  - filter--数据处理，参数1-2个；数据处理，if条件
  - simple_tag--参数不限制且返回文本信息
  - inclusion_tag--参数不限制且返回HTML片段

### 继承和母版

<img src="/python/Django3/Django3.assets/95acbb679d849efdbe89ca19082bdcef-613.webp" srcset="/python/Django3/Django3.assets/95acbb679d849efdbe89ca19082bdcef-613.webp 1x" width="613" height="619" data-full-src="/python/Django3/Django3.assets/95acbb679d849efdbe89ca19082bdcef.png" alt="95acbb679d849efdbe89ca19082bdcef" style="zoom:40%;"  loading="lazy" decoding="async" /><img src="/python/Django3/Django3.assets/121eaeead7b12a9f3b8d267b27445096-540.webp" srcset="/python/Django3/Django3.assets/121eaeead7b12a9f3b8d267b27445096-540.webp 1x" width="540" height="245" data-full-src="/python/Django3/Django3.assets/121eaeead7b12a9f3b8d267b27445096.png" alt="121eaeead7b12a9f3b8d267b27445096" style="zoom:60%;"  loading="lazy" decoding="async" />

## 中间件

<img src="/python/Django3/Django3.assets/ff0fc1b0bc2c8e237b88d70ec29cbf50-880.webp" srcset="/python/Django3/Django3.assets/ff0fc1b0bc2c8e237b88d70ec29cbf50-880.webp 1x, /python/Django3/Django3.assets/ff0fc1b0bc2c8e237b88d70ec29cbf50-1257.webp 2x" width="880" height="315" data-full-src="/python/Django3/Django3.assets/ff0fc1b0bc2c8e237b88d70ec29cbf50.png" alt="ff0fc1b0bc2c8e237b88d70ec29cbf50" style="zoom:80%;"  loading="lazy" decoding="async" />

- 类
- 定义方法
- 注册

原始方式：

```py
# 定义一个自定义中间件类
class MyMiddleware(object):
    # 初始化函数，参数get_response为下一个中间件或者视图函数
    def __init__(self, get_response):
        self.get_response = get_response

    # 调用函数，参数request为请求对象
    def __call__(self, request):
        # 打印"in"，表示中间件已进入
        print("in")
        # 调用get_response函数，获取响应对象
        response = self.get_response(request)
        # 打印"out"，表示中间件已退出
        print("out")
        # 返回响应对象
        return response
```

### 两个基础方法

分离

```py
from django.shortcuts import render, HttpResponse
class MyMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if hasattr(self, 'process_request'):
            response = self.process_request(request)

        response = response or self.get_response(request)

        if hasattr(self, 'process_response'):
            response = self.process_response(request, response)
        return response

    def process_request(self, request):
        print("in")
        request.xx = 123
        return HttpResponse("stop")

    def process_response(self, request, response):
        print('go')
        return HttpResponse('nobody')
```

继承MiddlewareMixin（推荐）

```py
from django.utils.deprecation import MiddlewareMixin 
# 定义一个自定义的中间件类，继承自MiddlewareMixin
class MyMiddleware(MiddlewareMixin):
    # 重写process_request方法，在请求进来时打印"in"
    def process_request(self, request):
        print("in")

    # 重写process_response方法，在响应出去时打印"out"
    def process_response(self, request, response):
        print("out")
```

Django内部默认执行call方法，传入参数。MiddlewareMixin内部部分源码：

```py
    def __call__(self, request):
        # Exit out to async mode, if needed
        if asyncio.iscoroutinefunction(self.get_response):
            return self.__acall__(request)
        response = None
        if hasattr(self, 'process_request'):
            response = self.process_request(request)
        response = response or self.get_response(request)
        if hasattr(self, 'process_response'):
            response = self.process_response(request, response)
        return response
```

`process_response`中都有return，返回的是view中return的对象，可在其中加入响应头等。

`process_request`中有return会直接返回，不会继续往下走，用于例如用户权限判断。

<img src="/python/Django3/Django3.assets/ea4517d2d34b324940caee2a04372179-880.webp" srcset="/python/Django3/Django3.assets/ea4517d2d34b324940caee2a04372179-880.webp 1x, /python/Django3/Django3.assets/ea4517d2d34b324940caee2a04372179-1274.webp 2x" width="880" height="306" data-full-src="/python/Django3/Django3.assets/ea4517d2d34b324940caee2a04372179.png" alt="ea4517d2d34b324940caee2a04372179" style="zoom: 50%;"  loading="lazy" decoding="async" />

### 第三个方法

疑问：执行`process_request`是否做路由匹配？`no`

`process_view`：匹配路由再后返回最开始的中间件，依次往后执行其中的`process_view`

<img src="/python/Django3/Django3.assets/18e5eec8b9791bd65ece950ffcf07cf0-880.webp" srcset="/python/Django3/Django3.assets/18e5eec8b9791bd65ece950ffcf07cf0-880.webp 1x, /python/Django3/Django3.assets/18e5eec8b9791bd65ece950ffcf07cf0-1256.webp 2x" width="880" height="312" data-full-src="/python/Django3/Django3.assets/18e5eec8b9791bd65ece950ffcf07cf0.png" alt="18e5eec8b9791bd65ece950ffcf07cf0" style="zoom: 50%;"  loading="lazy" decoding="async" />

`process_view`有返回值时

<img src="/python/Django3/Django3.assets/4fbe897d13b8787752e92fc5ee0c16fd-880.webp" srcset="/python/Django3/Django3.assets/4fbe897d13b8787752e92fc5ee0c16fd-880.webp 1x, /python/Django3/Django3.assets/4fbe897d13b8787752e92fc5ee0c16fd-1273.webp 2x" width="880" height="294" data-full-src="/python/Django3/Django3.assets/4fbe897d13b8787752e92fc5ee0c16fd.png" alt="4fbe897d13b8787752e92fc5ee0c16fd" style="zoom: 50%;"  loading="lazy" decoding="async" />

注：还有两个方法不常用

<img src="/python/Django3/Django3.assets/1e10104322e686496786fd193a74ea7e-880.webp" srcset="/python/Django3/Django3.assets/1e10104322e686496786fd193a74ea7e-880.webp 1x, /python/Django3/Django3.assets/1e10104322e686496786fd193a74ea7e-1066.webp 2x" width="880" height="313" data-full-src="/python/Django3/Django3.assets/1e10104322e686496786fd193a74ea7e.png" alt="1e10104322e686496786fd193a74ea7e" style="zoom: 50%;"  loading="lazy" decoding="async" />

应用场景

<img src="/python/Django3/Django3.assets/e490d9612cbb98725d74bd7da279c7ad-880.webp" srcset="/python/Django3/Django3.assets/e490d9612cbb98725d74bd7da279c7ad-880.webp 1x, /python/Django3/Django3.assets/e490d9612cbb98725d74bd7da279c7ad-1296.webp 2x" width="880" height="449" data-full-src="/python/Django3/Django3.assets/e490d9612cbb98725d74bd7da279c7ad.png" alt="e490d9612cbb98725d74bd7da279c7ad" style="zoom:60%;"  loading="lazy" decoding="async" />

## ORM

关系对象映射

```py
类 --> SQL --> 表
对象 --> SQL --> 数据
```

特点：开发效率高，执行效率低

<img src="/python/Django3/Django3.assets/7db922f01ee9953e46f788c6f7b5cd0b-880.webp" srcset="/python/Django3/Django3.assets/7db922f01ee9953e46f788c6f7b5cd0b-880.webp 1x, /python/Django3/Django3.assets/7db922f01ee9953e46f788c6f7b5cd0b-1760.webp 2x" width="880" height="306" data-full-src="/python/Django3/Django3.assets/7db922f01ee9953e46f788c6f7b5cd0b.png" alt="7db922f01ee9953e46f788c6f7b5cd0b" style="zoom:60%;"  loading="lazy" decoding="async" />

### 表结构

实现：创建表、修改表、删除表

在app中的models.py中按照规则编写类 ===> 表结构

#### 创建

- setting.py，连接数据库

  ```py
  DATABASES = {
      'default': {
          'ENGINE': 'django.db.backends.sqlite3',
          'NAME': BASE_DIR / 'db.sqlite3',
      }
  }  #  默认
  ```

- 注册app

- 编写类

  ```py
  from django.db import models
  
  
  class UserInfo(models.Model):
      name = models.CharField(max_length=100)
      email = models.EmailField()
      age = models.PositiveIntegerField()
  ```

- ***命令***，让Django根据models中类生成一个<u>对数据库操作的配置文件</u>，生成在migrations中

  ```
  python manage.py makemigrations
  ```

  <img src="/python/Django3/Django3.assets/109d4ca4455389e47d4daaa66f284535-880.webp" srcset="/python/Django3/Django3.assets/109d4ca4455389e47d4daaa66f284535-880.webp 1x, /python/Django3/Django3.assets/109d4ca4455389e47d4daaa66f284535-1668.webp 2x" alt="109d4ca4455389e47d4daaa66f284535" width="880" height="317" loading="lazy" decoding="async" data-full-src="/python/Django3/Django3.assets/109d4ca4455389e47d4daaa66f284535.png">

- ***命令***，读取已注册的每个app中的migrations目录，将配置文件转换成：生成表，修改表sql -> 连接数据库运行，同步数据库

  ```python
  python manage.py migrate
  ```


<img src="/python/Django3/Django3.assets/388e2dd9e74d3aff22c23105e06eaf24-590.webp" srcset="/python/Django3/Django3.assets/388e2dd9e74d3aff22c23105e06eaf24-590.webp 1x" width="590" height="732" data-full-src="/python/Django3/Django3.assets/388e2dd9e74d3aff22c23105e06eaf24.png" alt="388e2dd9e74d3aff22c23105e06eaf24" style="zoom:60%;"  loading="lazy" decoding="async" />

常见问题：千万不要手动修改表结构，<u>要保持数据库与ORM的类一致</u>。若要修改，在models中改后执行`python manage.py makemigrations`，该命令会自动检测到修改

#### 常见字段和参数

- `CharField(max_length=32)`

  这是一个字符类型的字段，用于存储<u>字符串</u>。`max_length` 参数指定了字符串的最大长度（必写）。这是Django中常用的一个字段类型，用于存储诸如姓名、标题、描述等较短的字符串。

- `IntegerField()`

  用于创建一个<u>整数</u>类型的字段。

- `DateField()` / `DateTimeField()`

  日期 / 时间

- `BooleanField()`

  布尔值，真假

- `DecimalField()`

  创建精确的浮点数类型字段

参数

- `verbose_name`：参数是该字段的描述，用于在Django管理界面中显示
- `default`：未传参时默认该值
- `null=True`：数据库允许为空
- `blank=True`：页面填写允许为空
- `db_index=True`：添加索引
- `unique=True`：唯一
- `choices=(("sh", "上海"), ("bj", "北京"))`：在数据库中存储只能是sh、bj（上海、北京一般用于页面显示中文）
- `auto_now=True`：当前时间
- `max_digits=10, decimal_places=2`：总共长度10位，小数部分2位

### 表关系

- 单表

- 一对多

<img src="/python/Django3/Django3.assets/116c3dffcb022f377c8afa7452bf3352-826.webp" srcset="/python/Django3/Django3.assets/116c3dffcb022f377c8afa7452bf3352-826.webp 1x" width="826" height="210" data-full-src="/python/Django3/Django3.assets/116c3dffcb022f377c8afa7452bf3352.png" alt="116c3dffcb022f377c8afa7452bf3352" style="zoom:40%;"  loading="lazy" decoding="async" />

```py
depart = models.Foreignkey(verbose_name="部门ID", to="Department", to_field="id", on_delete=models.CASCADE)
#  to - 关联表；to_field - 关联字段
```

删除行为：

 `on_delete=models.CASCADE`：当关联表中的数据被删除时，与之关联的外键数据也会被自动删除。

 `on_delete=models.SET_NULL`：当关联表中的数据被删除时，与之关联的外键数据会被设置为 `None`。

`on_delete=models.SET_DEFAULT`： 当关联表中的数据被删除时，与之关联的外键数据会被设置为默认值。默认值可以通过 `default` 参数进行设置。

- 多对多

<img src="/python/Django3/Django3.assets/59acfb032bd8369e90d506ca9e6b34d9-789.webp" srcset="/python/Django3/Django3.assets/59acfb032bd8369e90d506ca9e6b34d9-789.webp 1x" width="789" height="486" data-full-src="/python/Django3/Django3.assets/59acfb032bd8369e90d506ca9e6b34d9.png" alt="59acfb032bd8369e90d506ca9e6b34d9" style="zoom:40%;"  loading="lazy" decoding="async" />

用第三张表表示

```py
class Boy(models.Model):
    name = models.CharField(verbose_name="姓名")
    
class Girl(models.Model):
    name = models.CharField(verbose_name="姓名")
    
#  关系表
class BtoG(models.Model):
    bid = models.ForeignKey(verbose_name="男id", to="Boy", to_field="id", on_delete=models.CASCADE)
    gid = models.ForeignKey(verbose_name="女id", to="Girl", to_field="id", on_delete=models.CASCADE)
```

Django中的简便写法

```py
class Boy(models.Model):
    name = models.CharField(verbose_name="姓名")
    
class Girl(models.Model):
    name = models.CharField(verbose_name="姓名")
    
    relation = models.ManyToManyField(verbose_name="男女关系", to="Boy")
```

注：ManyToManyField生成的表字段只能id/bid/gid

- 一对一

  ```py
  class UserInof(models.Model):
      name = models.CharField(verbose_name="姓名", max_length=32)
      
  class Blog(models.Model):
      user = models.OneToOneField(to="UserInfo", on_delete=models.CASCADE)
      # <=> user = models.ForeignKey(to="UserInfo", on_delete=models.CASCADE, unique=True)
      blog = models.CharField(verbose_name="博客地址", max_length=255)
  ```

  

### 连接数据库(MySQL)

- 步骤

  - 安装MySQL，启动MySQL服务

  - 手动创建数据库

  - settings.py配置

    ```python
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'your_database_name',
            'USER': 'your_username',
            'PASSWORD': 'your_password',
            'HOST': 'your_host',
            'PORT': 'your_port',
        }
    }
    ```

  - 安装第三方组件 -- pymysql

    ```py
    项目根目录/项目名目录/__init__.py
    import pymysql
    pymysql.install_as_MySQLdb()
    ```

- 连接池

Django默认内置没有数据库连接池

```
pip install django-db-connection-pool
```

```py
DATABASES = {
    'default': {
        'ENGINE': 'dj_db_conn_pool.backends.mysql',
        'NAME': 'your_database_name',
        'USER': 'your_username',
        'PASSWORD': 'your_password',
        'HOST': 'your_host',
        'PORT': 'your_port',
        "POOL_OPTIONS": {
            'POOL_SIZE': 10,  # 最小
            'MAX_OVERFLOW': 10,  # 在最小连接的基础上还可以增加10个
            'RECYCLE': 24*60*60,  # 连接可以被重复用多久，超过会重新创建，-1表示永久
            'TIMEOUT': 30,  # 池中没有线程最多等待时间
        }
    }
}
```

在应用程序中，当我们需要与数据库进行交互时，通常需要先创建一个数据库连接，完成数据操作后，再关闭这个连接。然而，频繁地创建和关闭连接会大大降低应用程序的性能。

连接池在应用启动时，会预先创建一定数量的连接，并将这些连接存储在一个队列中。当应用程序需要与数据库进行交互时，它会从队列中获取一个空闲的连接，而不是创建一个新的连接。完成数据操作后，应用程序将连接返回到队列中，而不是关闭它。这样，连接就可以被其他需要与数据库交互的任务重复使用，从而减少了创建和关闭连接的开销。

- 多数据库（不常用）

  Django支持项目连接多个数据库

  ```py
  DATABASES = {
      'default': {...},
      'default2': {...},
  }
  ```

  用处：读写分离

  ```
  192.168.1.2			master	[写]
  					组件同步
  192.168.2.12		slave	[读]
  ```

  生成两份数据库

  ```
  python manage.py makemigrations
  python manage.py migrate --database=default
  python manage.py migrate --database=default2
  ```

  - <img src="/python/Django3/Django3.assets/ba9b15c77bc0cb698997767413e102dd-813.webp" srcset="/python/Django3/Django3.assets/ba9b15c77bc0cb698997767413e102dd-813.webp 1x" width="813" height="555" data-full-src="/python/Django3/Django3.assets/ba9b15c77bc0cb698997767413e102dd.png" alt="ba9b15c77bc0cb698997767413e102dd" style="zoom:50%;"  loading="lazy" decoding="async" />

- 分库

​	按app分库

```
python manage.py migrate app01 --database=default
# 将app01的表生成到默认数据库
```

- 读写操作<img src="/python/Django3/Django3.assets/ed27cf892e67360d00422f477f0dcb38-692.webp" srcset="/python/Django3/Django3.assets/ed27cf892e67360d00422f477f0dcb38-692.webp 1x" width="692" height="569" data-full-src="/python/Django3/Django3.assets/ed27cf892e67360d00422f477f0dcb38.png" alt="ed27cf892e67360d00422f477f0dcb38" style="zoom:60%;"  loading="lazy" decoding="async" />


- router<img src="/python/Django3/Django3.assets/8f3d9291ac8cd68c6e42eb3fe043f426-880.webp" srcset="/python/Django3/Django3.assets/8f3d9291ac8cd68c6e42eb3fe043f426-880.webp 1x, /python/Django3/Django3.assets/8f3d9291ac8cd68c6e42eb3fe043f426-1675.webp 2x" width="880" height="346" data-full-src="/python/Django3/Django3.assets/8f3d9291ac8cd68c6e42eb3fe043f426.png" alt="8f3d9291ac8cd68c6e42eb3fe043f426" style="zoom:80%;"  loading="lazy" decoding="async" />

- 注意事项：不要跨表关联，数据库支持，Django不支持

### 表数据的操作

将模块导入`import`到views中操作，写个函数，找到类，然后类.object.xxx()

例：

```py
from django.shortcuts import HttpResponse
from . import models  # 导入

def index(request):
    obj = models.UserInfo.objects.create(name='xml', age=22)
    print(obj, type(obj))  # UserInfo object (1), <class 'app01.models.UserInfo'>
    print(obj.id)  # 1
    print(obj.name)  # xml
    return HttpResponse("back")
```

注：

这里index同样需要路由匹配，

`models.UserInfo.objects.create(name='xml', age=22)`返回一个类对象。

#### 单表

- 添加

  ```py
  obj = models.UserInfo.objects.create(name='xml', age=22)
  # obj = models.UserInfo.objects.create(**{name: 'xml', age: 22})
  
  # 内存
  obj = model.UserInfo(name='xml', age=22)  # 也支持字典
  obj.age = 20
  obj.save()  # 从内存存入数据库
  ```

- 查询

  ```py
  data = models.UserInfo.objects.all()  # 查询全部
  # 对应SQL语句
  print(data.query)  # SELECT `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age` FROM `app01_userinfo`
  print(data)  # [obj1, obj2, ...]，返回的是QuerySet
  # <QuerySet [<UserInfo: UserInfo object (1)>, <UserInfo: UserInfo object (2)>, <UserInfo: UserInfo object (3)>]>
  for obj in data:
  	print(obj.name, obj.age)
  '''
  xml 22
  sb 20
  '''
  
  data = models.UserInfo.objects.filter(id__gt=0).values("name", "age")
  print(data)  # [{}, {}]
  # <QuerySet [{'name': 'xml', 'age': 22}, {'name': 'sb', 'age': 20}]>
  for item in data:
      print(item["name"], item["age"])
  '''
  xml 22
  sb 20
  '''
  
  data = models.UserInfo.objects.filter(id__gt=0).values_list("name", "age")
  print(data)  # [(), ()]
  # <QuerySet [('xml', 22), ('sb', 20)]>
  for item in data:
      print(item[0], item[1])
  '''
  xml 22
  sb 20
  '''
  
  data = models.UserInfo.objects.filter(name='xml')  # 过滤查询，也支持字典
  data = models.UserInfo.objects.exclude(name='xml')  # 不等于/排除
  # 注意：查看结果时需要for循环打印一遍
  # django特有写法，双下划线（逗号视为and）
  data = models.UserInfo.objects.filter(id__gt=1)  # where id > 1
  data = models.UserInfo.objects.filter(id__gte=1)  # where id >= 1
  data = models.UserInfo.objects.filter(id__lt=1)  # where id < 1
  data = models.UserInfo.objects.filter(id__in=[1, 2, 3])  # where in 
  data = models.UserInfo.objects.filter(id__contains="m")  # like binary %m%
  data = models.UserInfo.objects.filter(id__isnull=True)  # 为空
  data = models.UserInfo.objects.filter(id__startwith="x")  # like binary x%
  
  data = models.UserInfo.objects.filter(id__gt=0).first()  # 返回一个对象
  data = models.UserInfo.objects.filter(id__gt=0).exists()  # 是否存在，返回True/False
  
  data = models.UserInfo.objects.filter(id__gt=0).order_by("id")  # 排序
  data = models.UserInfo.objects.filter(id__gt=0).order_by("-id")  # 倒序
  ```

- 删除(先查询)

  ```py
  data = models.UserInfo.objects.filter(name="撒").delete()  # 过滤删除
  ```

- 改

  ```py
  data = models.UserInfo.objects.filter(id=2).update(name="sb")  # 也支持字典
  ```

#### 一对多

```py
# 创建
class Depart(models.Model):
    title = models.CharField(max_length=100)

    
class Admin(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    depart = models.ForeignKey(to="Depart", to_field="id", on_delete=models.CASCADE)
```

- 添加

  ```py
  models.Depart.objects.create(title="it部")
  models.Depart.objects.create(title="财务部")
  models.Depart.objects.create(title="市场部")
  models.Admin.objects.create(
  	username="xml",
  	password="123",
  	depart_id=1
      )
  models.Admin.objects.create(
  	username="sb",
  	password="663",
  	depart_id=2
      )
  models.Admin.objects.create(
  	username="fjl",
  	password="1993",
  	depart_id=3
      )
  models.Admin.objects.create(
  	username="xiaoming",
  	password="99999",
  	depart_id=1
      )
  ```

  <img src="/python/Django3/Django3.assets/26b95155233d35e7d91e4738012a90c3-493.webp" srcset="/python/Django3/Django3.assets/26b95155233d35e7d91e4738012a90c3-493.webp 1x" width="493" height="144" data-full-src="/python/Django3/Django3.assets/26b95155233d35e7d91e4738012a90c3.png" alt="26b95155233d35e7d91e4738012a90c3" style="zoom:70%;"  loading="lazy" decoding="async" />

- 删除

  ```py
  # 删Admin同单表，只考虑删Depart的情况
  models.Depart.objects.filter(id=1).delete()  # 根据Foreignkey的on_delet删除
  # 删除市场部的员工
  # 通过depart__title实现跨表
  q = models.Admin.objects.filter(depart__title="市场部") 
  print(q.query)
  '''
  SELECT `app01_admin`.`id`, `app01_admin`.`username`, `app01_admin`.`password`, `app01_admin`.`depart_id` FROM `app01_admin` INNER JOIN `app01_depart` ON (`app01_admin`.`depart_id` = `app01_depart`.`id`) WHERE `app01_depart`.`title` = 市场部
  '''
  ```

- 查询

  ```py
  # 通过values实现联表，在values中直接添加关联表的字段，（values_list）也可
  q = models.Admin.objects.filter(id__gt=0).values("id", "password", "username", "depart__title")
  for item in q:
  	print(item["id"], item["password"], item["username"], item["depart__title"])
  '''
  2 663 sb 财务部
  3 1993 fjl 市场部
  '''
  
  # 联表获取对象
  v = models.Admin.objects.filter(id__gt=0).select_related("depart")
  for obj in v:
      print(obj.username, obj.password, obj.depart_id, obj.depart.title)
  ```

- 更新

  ```py
  models.Admin.objects.filter(name="sb").update(depart_id=3)
  ```

  注意：更新删除在哪张表就只能对哪张表下手`models.表`，如下写法是错误的

  ```py
  models.Admin.objects.filter(name="sb").update(depart__title="装备部")  # 只有查询时depart__才能用
  ```

- 通过被依赖表查询

  ```py
  v = models.Depart.objects.all().values("id", "title", "admin__username")  # 通过表名跨表
  for i in v:
  	print(i)
  '''
  {'id': 1, 'title': 'it部', 'admin__username': 'xml'}
  {'id': 1, 'title': 'it部', 'admin__username': 'xiaoming'}
  {'id': 2, 'title': '财务部', 'admin__username': 'sb'}
  {'id': 3, 'title': '市场部', 'admin__username': 'fjl'}
  '''
  ```

- 对比

  ```py
  # 正向操作，有foreignkey时，通过foreignkey关联
  q = models.Admin.objects.filter(depart__title="市场部") 
  
  # 反向操作，无foreignkey，但有表与之关联时，通过表名关联
  v = models.Depart.objects.all().values("id", "title", "admin__username")
  ```

  注意：反向操作时若关联的表有两个外键，直接关联会报错，需在每个外键中加入参数`related_name="xxx"`，然后反向操作时直接关联`related_name`：

  ```py
  v = models.Depart.objects.all().values("id", "title", "xxx__username")
  ```


#### 多对多

创建

```py
class Boy(models.Model):
    name = models.CharField(verbose_name="姓名", max_length=100)


class Girl(models.Model):
    name = models.CharField(verbose_name="姓名", max_length=100)


#  关系表
class BtoG(models.Model):
    bid = models.ForeignKey(verbose_name="男id", to="Boy", to_field="id", on_delete=models.CASCADE)
    gid = models.ForeignKey(verbose_name="女id", to="Girl", to_field="id", on_delete=models.CASCADE)
    address = models.CharField(verbose_name="地址", max_length=100)
```

- 增

  ```py
  models.Boy.objects.create(name="张三")
  models.Boy.objects.create(name="李四")
  models.Boy.objects.create(name="王五")
  # 批量创建女生
  models.Girl.objects.bulk_create(
  	[models.Girl(name="小丽"), models.Girl(name="小芳"), models.Girl(name="小美")],
  	batch_size=2  # 一次提交两个
      )
  models.BtoG.objects.create(bid_id=1, gid_id=3, address="wc")
  models.BtoG.objects.create(bid_id=1, gid_id=2, address="下水道")
  models.BtoG.objects.create(bid_id=2, gid_id=2, address="厕所")
  models.BtoG.objects.create(bid_id=3, gid_id=3, address="法院")
  ```

- 查询

  ```py
  # 联表
  q = models.BtoG.objects.filter(bid__name="张三").select_related("gid")
  for item in q:
  	print(item.id, item.bid.name, item.gid.name, item.address)
  '''
  1 张三 小美 wc
  2 张三 小芳 下水道
  '''
  q = models.BtoG.objects.filter(bid__name="李四").values("bid__name", "gid__name", "address")
  for item in q:
      print(item)  # {'bid__name': '李四', 'gid__name': '小芳', 'address': '厕所'}
  ```

#### 一对一

- 查询

  ```py
  models.UserInfo.objects.filter(name="李四").values("name", "age", "blog")
  ```

## cookie

<img src="/python/Django3/Django3.assets/cda35c527435091f3b2897222c702641-880.webp" srcset="/python/Django3/Django3.assets/cda35c527435091f3b2897222c702641-880.webp 1x, /python/Django3/Django3.assets/cda35c527435091f3b2897222c702641-1387.webp 2x" width="880" height="248" data-full-src="/python/Django3/Django3.assets/cda35c527435091f3b2897222c702641.png" alt="cda35c527435091f3b2897222c702641" style="zoom:60%;"  loading="lazy" decoding="async" />

```py
def login(request):
    res = HttpResponse("...")
    res.set_cookie("v1", "123456", max_age=10, path='/', domain='xxx.com', secure=True, httponly=True)  
    # max_age=10：十秒超时（秒）
    # path='/'：当前网站所有URL访问时都会携带cookie
    # path='/lg'：有lg/前缀的url才会携带cookie
    # domain='xxx.com'：对应域名携带
    # secure=True：https协议
    # httponly=True：只允许网络获取，不能通过js代码获取
    return res


def home(request):
    print(request.COOKIES.get("v1"))  # 123456
    return HttpResponse("home")
```

## session

<img src="/python/Django3/Django3.assets/a6246bd067255c56471c4dcebba5a17c-880.webp" srcset="/python/Django3/Django3.assets/a6246bd067255c56471c4dcebba5a17c-880.webp 1x, /python/Django3/Django3.assets/a6246bd067255c56471c4dcebba5a17c-1389.webp 2x" width="880" height="295" data-full-src="/python/Django3/Django3.assets/a6246bd067255c56471c4dcebba5a17c.png" alt="a6246bd067255c56471c4dcebba5a17c" style="zoom:60%;"  loading="lazy" decoding="async" />

- 配置session(文件版)（注意解锁中间件的注释）

```py
SESSION_ENGINE = 'django.contrib.sessions.backends.file'  # 引擎（默认）
SESSION_FILE_PATH = 'XXX'  # 缓存文件路径，如果为None，则使用tempfile模块获取一个临时地址tempfile.gettempdir()

SESSION_COOKIE_NAME = 'sid'  # Session的cookie保存在浏览器上时的key，即：sessionid=随机字符串
SESSION_COOKIE_PATH = '/'  # Session的cookie保存的路径
SESSION_COOKIE_DOMAIN = None  # Session的cookie保存的域名
SESSION_COOKIE_SECURE = False  # 是否Https传输cookie
SESSION_COOKIE_HTTPONLY = True  # 是否Session的cookie只支持http传输
SESSION_COOKIE_AGE = 1209600  # Session的cookie失效日期（2周）

SESSION_EXPIRE_AT_BROWSER_CLOSE = False  # 是否关闭浏览器使得Session过期
SESSION_SAVE_EVERY_REQUEST = True  # 是否每次请求都保存Session，默认修改session时才保存
```

```py
def login(request):
    # 在session中设置值 + cookie中写入凭证
    request.session["user_info"] = "xml"
    return HttpResponse("login")


def home(request):
    # 读取session
    user_info = request.session.get("user_info")
    print(user_info)  # xml
    return HttpResponse("home")
```

- 配置session(数据库)（注意解锁app中的session注释）--存入表中：<img src="/python/Django3/Django3.assets/c05e93b01e705cd9f69c5e21cc866407-471.webp" srcset="/python/Django3/Django3.assets/c05e93b01e705cd9f69c5e21cc866407-471.webp 1x" width="471" height="68" data-full-src="/python/Django3/Django3.assets/c05e93b01e705cd9f69c5e21cc866407.png" alt="c05e93b01e705cd9f69c5e21cc866407" style="zoom:70%;"  loading="lazy" decoding="async" />

```py
SESSION_ENGINE = 'django.contrib.sessions.backends.db'  # 引擎（数据库）

SESSION_COOKIE_NAME = 'sid'  # Session的cookie保存在浏览器上时的key，即：sessionid=随机字符串
SESSION_COOKIE_PATH = '/'  # Session的cookie保存的路径
SESSION_COOKIE_DOMAIN = None  # Session的cookie保存的域名
SESSION_COOKIE_SECURE = False  # 是否Https传输cookie
SESSION_COOKIE_HTTPONLY = True  # 是否Session的cookie只支持http传输
SESSION_COOKIE_AGE = 1209600  # Session的cookie失效日期（2周）

SESSION_EXPIRE_AT_BROWSER_CLOSE = False  # 是否关闭浏览器使得Session过期
SESSION_SAVE_EVERY_REQUEST = True  # 是否每次请求都保存Session，默认修改session时才保存
```

- 配置Redis，`pip install django-redis`

```py
SESSION_ENGINE = 'django.contrib.sessions.backends.cache'  # 引擎
SESSION_CACHE_ALIAS = 'default'

SESSION_COOKIE_NAME = 'sid'  # Session的cookie保存在浏览器上时的key，即：sessionid=随机字符串
SESSION_COOKIE_PATH = '/'  # Session的cookie保存的路径
SESSION_COOKIE_DOMAIN = None  # Session的cookie保存的域名
SESSION_COOKIE_SECURE = False  # 是否Https传输cookie
SESSION_COOKIE_HTTPONLY = True  # 是否Session的cookie只支持http传输
SESSION_COOKIE_AGE = 1209600  # Session的cookie失效日期（2周）

SESSION_EXPIRE_AT_BROWSER_CLOSE = False  # 是否关闭浏览器使得Session过期
SESSION_SAVE_EVERY_REQUEST = True  # 是否每次请求都保存Session，默认修改session时才保存

# redis
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://127.0.0.1:6379",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            "CONNECTION_POOL_KWARGS": {"max_connections": 100},
            "PASSWORD": "123456",
        }
    }
}
```



