---
title: Python 基础
date: 2026-09-06 08:00:00
categories:
  - Python
tags:
  - Python
  - 基础
  - 语法
coverImg: /covers/python.webp
permalink: /python/a1b2c
---

# 常用

- 类型转换：`int()，str()，float()`  

- 交换：`a, b = b, a `

- Print默认换行，加入`end=''`，取消换行。直接换行：`print()` 

- 快捷键 

  - 移动当前行：`Shift+alt+上\下 `
  - 同时操作多列：`Alt+Shift+ctrl+左键` 

- 大小写：

  - 所有字母大写：`s.upper()`
  - 所有字母小写：`s.lower()`
  - 将字符串的第一个字母变成大写，其余字母变为小写：`s.capitalize()`
  - 非字母后的第一个字母将转换为大写字母：`s.title()`

- 随机数

  <img src="/python/Python基础/Python基础.assets/image-20240205181656445.png" alt="image-20240205181656445" style="zoom:80%;" />

- 进制：

  <img src="/python/Python基础/Python基础.assets/image-20240205190531175-865.webp" srcset="/python/Python基础/Python基础.assets/image-20240205190531175-865.webp 1x" width="865" height="223" data-full-src="/python/Python基础/Python基础.assets/image-20240205190531175.png" alt="image-20240205190531175" style="zoom:70%;"  loading="lazy" decoding="async" />

  

- 打包

  <img src="/python/Python基础/Python基础.assets/image-20240205191204355-397.webp" srcset="/python/Python基础/Python基础.assets/image-20240205191204355-397.webp 1x" width="397" height="284" data-full-src="/python/Python基础/Python基础.assets/image-20240205191204355.png" alt="image-20240205191204355" style="zoom:80%;"  loading="lazy" decoding="async" />

  查看依赖包：terminal中输入`pip freeze > requirements.txt`

  多文件：`pyinstaller -D xxx.py -n 名字`

  单文件：`pyinstaller -F xxx.py -n 名字`

  若打包的程序中含有路径，获取路径：`sys.argv`

  <img src="/python/Python基础/Python基础.assets/image-20240205191416654-544.webp" srcset="/python/Python基础/Python基础.assets/image-20240205191416654-544.webp 1x" alt="image-20240205191416654" width="544" height="161" loading="lazy" decoding="async" data-full-src="/python/Python基础/Python基础.assets/image-20240205191416654.png">

# 输入输出

- 解除引号的效用：使用转义字符`\`
- 拼接：`+`
- 四舍五入：`%m.nf `；<!--m宽度，n精度-->
- 输入：`input()`语句可以在输入内容前输出提示内容，如`input('你的名字：')`，<u>类型默认字符串</u>
- 输出：快速写法<img src="/python/Python基础/Python基础.assets/image-20240205193003683-841.webp" srcset="/python/Python基础/Python基础.assets/image-20240205193003683-841.webp 1x" width="841" height="34" data-full-src="/python/Python基础/Python基础.assets/image-20240205193003683.png" alt="image-20240205193003683" style="zoom:60%;"  loading="lazy" decoding="async" />

# 判断循环语句

- `if`  缩进表示归属

  <img src="/python/Python基础/Python基础.assets/image-20240205193241728-325.webp" srcset="/python/Python基础/Python基础.assets/image-20240205193241728-325.webp 1x" width="325" height="338" data-full-src="/python/Python基础/Python基础.assets/image-20240205193241728.png" alt="image-20240205193241728" style="zoom:80%;"  loading="lazy" decoding="async" />

- `while`

  ![image-20240205193350959](/python/Python基础/Python基础.assets/image-20240205193350959.png)

- `for`

  `range`语句：左闭右开；步长step的数字序列：`range(num1, num2, step)`

- 跳过退出

  <img src="/python/Python基础/Python基础.assets/image-20240205193610547-320.webp" srcset="/python/Python基础/Python基础.assets/image-20240205193610547-320.webp 1x" width="320" height="210" data-full-src="/python/Python基础/Python基础.assets/image-20240205193610547.png" alt="image-20240205193610547" style="zoom:80%;"  loading="lazy" decoding="async" /><img src="/python/Python基础/Python基础.assets/image-20240205194454169.png" alt="image-20240205194454169" style="zoom:80%;" />

# 数据容器

## 列表

- `[元素1,元素2,…]`，元素类型无限制，下表索引从左向右从0开始，从右向左从-1开始。
- <img src="/python/Python基础/Python基础.assets/image-20240205193949099-845.webp" srcset="/python/Python基础/Python基础.assets/image-20240205193949099-845.webp 1x" width="845" height="374" data-full-src="/python/Python基础/Python基础.assets/image-20240205193949099.png" alt="image-20240205193949099" style="zoom:80%;"  loading="lazy" decoding="async" />
- 修改特定位置的值：列表[下标]=值
- 插入元素：列表.insert(下标,元素)
- 追加元素（尾部）：列表.append(元素)；列表.extend(其他数据容器)
- 反转：列表.reverse()
- sort方法：<img src="/python/Python基础/Python基础.assets/image-20240205194336918-875.webp" srcset="/python/Python基础/Python基础.assets/image-20240205194336918-875.webp 1x" width="875" height="72" data-full-src="/python/Python基础/Python基础.assets/image-20240205194336918.png" alt="image-20240205194336918" style="zoom:67%;"  loading="lazy" decoding="async" />

## 元组

- <u>不可被修改的</u>（但可对元组中的列表进行修改）：`(元素,元素,…)`；定义的单个元组:（元素，）
- 取出数据：`tuple[]`
- 查找：`t.index()`
- 统计：`t.count()`
- 总数：`len()`

## 字符串

- 字符的容器（无法修改）
- <img src="/python/Python基础/Python基础.assets/image-20240205194752821-711.webp" srcset="/python/Python基础/Python基础.assets/image-20240205194752821-711.webp 1x" width="711" height="282" data-full-src="/python/Python基础/Python基础.assets/image-20240205194752821.png" alt="image-20240205194752821" style="zoom:80%;"  loading="lazy" decoding="async" />
- 查找find 方法：<img src="/python/Python基础/Python基础.assets/image-20240205194901391-358.webp" srcset="/python/Python基础/Python基础.assets/image-20240205194901391-358.webp 1x" width="358" height="350" data-full-src="/python/Python基础/Python基础.assets/image-20240205194901391.png" alt="image-20240205194901391" style="zoom:70%;"  loading="lazy" decoding="async" />
- 切片：（列表、元组、字符串都可）序列[起始下标:结束下标:步长]，不包括结束下标，步长不写默认1，起始结束不写默认首尾，还可反向取

## 集合

- 无序（不支持下标索引），不支持重复：{元素1,元素2,…}
- <img src="/python/Python基础/Python基础.assets/image-20240205195052114-723.webp" srcset="/python/Python基础/Python基础.assets/image-20240205195052114-723.webp 1x" width="723" height="411" data-full-src="/python/Python基础/Python基础.assets/image-20240205195052114.png" alt="image-20240205195052114" style="zoom:80%;"  loading="lazy" decoding="async" />

## 字典

- `{key:value, key:value, …key:value}`键值对，key不能重复
- <img src="/python/Python基础/Python基础.assets/image-20240205195148246-628.webp" srcset="/python/Python基础/Python基础.assets/image-20240205195148246-628.webp 1x" width="628" height="224" data-full-src="/python/Python基础/Python基础.assets/image-20240205195148246.png" alt="image-20240205195148246" style="zoom:80%;"  loading="lazy" decoding="async" />
- 拓展<img src="/python/Python基础/Python基础.assets/image-20240205195237710-642.webp" srcset="/python/Python基础/Python基础.assets/image-20240205195237710-642.webp 1x" width="642" height="204" data-full-src="/python/Python基础/Python基础.assets/image-20240205195237710.png" alt="image-20240205195237710" style="zoom:60%;"  loading="lazy" decoding="async" />

## 数据容器的通用操作

- <img src="/python/Python基础/Python基础.assets/image-20240205195344499-702.webp" srcset="/python/Python基础/Python基础.assets/image-20240205195344499-702.webp 1x" width="702" height="322" data-full-src="/python/Python基础/Python基础.assets/image-20240205195344499.png" alt="image-20240205195344499" style="zoom:80%;"  loading="lazy" decoding="async" />
- 排序：对内容排序，放入列表中。正向：sorted(序列)；反向：sorted(列表,reverse=Ture)，不改变原值

# 函数

- 函数多返回值：`def f(): … return m,n`调用时通过两个变量接收

- 多种传参方式

  - 位置参数：同C
  - 关键字参数：通过“键=值”的形式传递参数（位置关键字混用时位置放前面）
  - 缺省（默认）参数：`def f(x,y=m):…,f(x)`,y传什么是什么，不传y时默认y=m，默认参数必须写在最后
  - 不定长参数：用于不确定传多少个参数时
    - 位置不定长：`def f(*args):…`内容元组；
    - 关键字不定长：`def f(**kwargs):…`键值对传入，内容字典

- 匿名函数：函数也可作为参数传入，是计算逻辑的传递

  Lambda匿名函数：lambda 传入参数:函数体(一行代码)→只可临时使用一次，只能写一行代码，一般作为传入参数使用

- Map函数：`map(function,[c,d])`将数组带入函数运算，返回迭代器

# 文件操作

- 文件编码：一种规则集合，记录了内容和二进制间进行相互转换的逻辑，一般用UTF-8

- 操作：<img src="/python/Python基础/Python基础.assets/image-20240205200403259-847.webp" srcset="/python/Python基础/Python基础.assets/image-20240205200403259-847.webp 1x" width="847" height="256" data-full-src="/python/Python基础/Python基础.assets/image-20240205200403259.png" alt="image-20240205200403259" style="zoom:50%;"  loading="lazy" decoding="async" />

- 打开创建<img src="/python/Python基础/Python基础.assets/image-20240205200444194-770.webp" srcset="/python/Python基础/Python基础.assets/image-20240205200444194-770.webp 1x" width="770" height="309" data-full-src="/python/Python基础/Python基础.assets/image-20240205200444194.png" alt="image-20240205200444194" style="zoom:50%;"  loading="lazy" decoding="async" />

  mode模式：‘r’——只读模式，指针在开头，默认模式；‘w’——打开一个文件只用于写入，若原本存在，则删除原内容并从头开始编辑，若不存在则创建新文件；‘a’——用于追加，若原存在则新的内容将写入已有内容后，若不存在则创建新文件进行写入

- 读取：第二次读取将从第一次读取结束的地方开始读（看成有个指针）

- 其他操作：
  - 按字节移动光标：`f.seek(num)`注意中文编码不同的话字节不同
  - 返回光标位置：`f.tell()`
  - 把文件从内存强制刷入硬盘：`f.flush()`
  - 混合模式（又读又写，读写光标独立）：<img src="/python/Python基础/Python基础.assets/image-20240205200810398-862.webp" srcset="/python/Python基础/Python基础.assets/image-20240205200810398-862.webp 1x" width="862" height="140" data-full-src="/python/Python基础/Python基础.assets/image-20240205200810398.png" alt="image-20240205200810398" style="zoom:50%;"  loading="lazy" decoding="async" />
  - 文件替换：<img src="/python/Python基础/Python基础.assets/image-20240205200855066.png" alt="image-20240205200855066" style="zoom:100%;" />

# 异常模块包

- 异常<img src="/python/Python基础/Python基础.assets/image-20240205201215667.png" alt="image-20240205201215667" style="zoom:80%;" /><img src="/python/Python基础/Python基础.assets/image-20240205201224787-338.webp" srcset="/python/Python基础/Python基础.assets/image-20240205201224787-338.webp 1x" alt="image-20240205201224787" width="338" height="86" loading="lazy" decoding="async" data-full-src="/python/Python基础/Python基础.assets/image-20240205201224787.png">

  异常具有传递性，例如函数的嵌套

- 模块

  若想导入模块时不输出模块中的测试语句，则在测试语句前些：`if _ _name_ _=='_ _main_ _':`

  若一个文件中有\_\_all\_\_变量，当使用`from xxx import *`导入时，只能导入这个列表中的元素：`_ _all_ _=['函数名',…]`

- 包：一个文件夹，有`_init_.py`（其中可写`_ _all_ _=[''函数名'',…]`）就是包，没有就是文件夹

  <img src="/python/Python基础/Python基础.assets/image-20240205201743253-814.webp" srcset="/python/Python基础/Python基础.assets/image-20240205201743253-814.webp 1x" width="814" height="242" data-full-src="/python/Python基础/Python基础.assets/image-20240205201743253.png" alt="image-20240205201743253" style="zoom:80%;"  loading="lazy" decoding="async" />

