---
title: AST系列
date: 2026-09-06 08:00:00
categories:
  - 爬虫
tags:
  - AST
  - 反混淆
  - JS逆向
coverImg: /covers/ast.webp
permalink: /crawler/njco8
---

## Ast系列篇

### 何为混淆？

混淆可以理解为是一种对js代码加密技术，主要用于隐藏代码的真实功能，以防止js代码被逆向工程师分析和修改。通过混淆，让代码变得复杂和难以理解，使得逆向工程师在调试工程中消耗大量的时间或者放弃，从而达到一种保护。混淆总的来说就是一种代码保护方案，将原始代码转换为可读性较差或者没有可读性的代码。

### 何为反混淆？

反混淆就是将混淆后的代码，还原成具有可读性代码，方便逆向工程师进行调试。

### 什么是Ast？

Ast翻译成中文就是“抽象语法树”的意思。它是一种用于表示js程序代码结构的树状数据结构，用于解析和表示js源代码的语法结构。

该树状结构是由一个又一个的节点组成，每个节点(Node) 表示源代码的一个语法元素，例如：变量声明，函数定义，循环语句等，而节点之间的关系表示了语法结构的层次和关联关系。

因此，AST可以看作是js源代码的一种抽象表示形式，它去除了源代码中的具体细节，只保留了语法结构和逻辑关系。

可以将正常代码通过在线AST在线网站（https://astexplorer.net/）进行转换为AST语法树：

![Snipaste_2024-06-11_08-57-44](/ast/imgs/Snipaste_2024-10-16_22-17-22.png)

#### Ast部分节点解释

- program: 包含整个源代码，不包含注释节点。

- type: 表示当前节点的类型
- start：表示当前节点的起始位置
- end：表示当前节点的末尾
- loc：表示当前节点所在的行列位置

  - loc中的start，表示节点所在起始的行列位置

  - loc中的end，表示节点所在末尾的行列位置

- sourceType：表示节点的源代码类型（js，python等），module表示为模块类型
- body：表示代码块的主体部分。通过解析Ast中的body节点，可以提取出代码块的主体部分，并进行相应的处理或分析。这对于理解代码逻辑、调试和维护代码非常有用。

  - body节点通常会包含一个type的子节点，该子节点表示body代码块中包含的节点类型，常用的节点类型有：
    - ExpressionStatement：表示一个表达式语句，用于执行某些操作或计算
    - IfStatement：表示一个条件语句，根据条件执行不同的代码块。
    - ReturnStatement：表示一个return语句，用于从函数中返回一个值。
    - ......
- comments：用于存储存储源代码中的注释信息

#### 前置准备

1. 具备一些javascript基础和nodejs基础
2. 已安装好nodejs运行环境

### babel介绍

Babel是一个广泛使用的JavaScript编译器，它的主要作用是将高版本的JavaScript代码转换为向后兼容的代码，以便能够在当前和旧版本的浏览器或其他环境中运行。

在反混淆中，Babel可以通过抽象语法树（AST）来解析和转换js代码。在这个过程中，Babel首先会将源代码解析成AST，然后对AST的节点进行转换，最后将转换后的AST生成为目标代码。具体过程如下：

1. **解析（Parsing）**：在这个阶段，Babel使用@babel/parser将源代码解析成AST。这一步涉及到词法分析和语法分析，最终将代码转换成AST形式。
2. **转换（Transformation）**：在转换阶段，Babel对AST的节点进行遍历，并根据需要应用一系列转换操作。这些操作可以是Babel内置的，也可以是来自插件的。转换过程中可能会对节点进行添加、删除或修改等操作。
3. **生成（Code Generation）**：这是Babel处理流程的最后一步，使用@babel/generator将修改后的AST转换回源代码。这个阶段生成的代码是经过转换后的版本，可以在不同的运行环境中兼容执行。

此外，Babel提供了一套丰富的API和工具，如@babel/traverse用于遍历AST节点，@babel/types提供类型检查和建设节点的方法等。通过这些工具，开发者可以创建自己的Babel插件来自定义转换过程。

总的来说，Babel是一个强大的代码转换工具，它通过操作AST来实现对JavaScript代码的转换和优化。这使得开发者可以使用最新的JavaScript特性编写代码，同时确保代码能够在不同的环境中运行。

#### babel环境安装

```js
安装命令：
npm i @babel/core --save-dev //Babel 编译器本身，提供了 babel 的编译 API；

npm i @babel/types //判断节点类型，构建新的AST节点等
npm i @babel/parser //将Javascript代码解析成AST语法树
npm i @babel/traverse //遍历，修改AST语法树的各个节点
npm i @babel/generator //将AST还原成Javascript代码
```

### Ast反混淆代码架构

以下是使用babel库来反混淆代码的模板 : 创建encode.js（混淆代码）和decode.js（反混淆代码）文件

```javascript
//AST核心组件的导入/加载

// fs模块 用于操作文件的读写
const fs = require("fs");
// @babel/parser 用于将JavaScript代码转换为ast树
const parser = require("@babel/parser");
// @babel/traverse 用于遍历各个节点的函数
const traverse = require("@babel/traverse").default;
// @babel/types 节点的类型判断及构造等操作
const types = require("@babel/types");
// @babel/generator 将处理完毕的AST转换成JavaScript源代码
const generator = require("@babel/generator").default;
 
// 混淆的js代码文件
const encode_file = "./encode.js"
// 反混淆的js代码文件
const decode_file = "./decode.js"
 
// 读取混淆的js文件
let jsCode = fs.readFileSync(encode_file, {encoding: "utf-8"});
// 将javascript代码转换为ast树
let ast = parser.parse(jsCode)
 
// todo 编写ast插件
const visitor = {
 
}
 
// 调用插件,处理混淆的代码
traverse(ast,visitor)
 
// 将处理后的ast转换为js代码(反混淆后的代码)
let {code} = generator(ast);
// 保存代码
fs.writeFile('decode.js', code, (err)=>{});
```

#### babel组件介绍

##### parser与generator 组件

- parser和generator这两个组件的作用是相反的。

- parser用于将js代码转换成ast，generator用于将ast转换成js代码

- parser将代码转换为ast：

  - let ast = parser.parse(参数一,参数二)
  - 参数一：混淆的js代码
  - 参数二：配置参数
    - sourceType: 默认是script，当解析的js代码中，含有 import，export 等关键字的时候需要指定sourceType为module，不然会报错

- generator将ast转换为代码：

  - let code = generator(参数一，参数二)
  - 参数一：ast语法树
  - 参数二：配置参数
    - retainLines：表示是否使用与源代码相同的行号，默认为false，也就是输出的是格式化后的代码
    - comments：表示是否保留注释，默认为true
    - compact：表示是否压缩代码，取值有minified和concise，minified压缩的最多，concise压缩的最少。

  ```js
  /*
   sourceType: 默认是script，当解析的js代码中，含有 import，export 等关键字的时候需要指定sourceType为module，不然会报错.
  */
  let ast = parser.parse(jsCode,{
      sourceType:"script"
  })
  
  // todo 编写ast插件
  const visitor = {
  
  }
  
  // 调用插件,处理混淆的代码
  traverse(ast,visitor)
  
  /*
  参数一：ast语法树
  参数二：配置参数
      retainLines：表示是否使用与源代码相同的行号，默认为false，也就是输出的是格式化后的代码
      comments：表示是否保留注释，默认为true
      compact：表示是否压缩代码，minified压缩的最多，concise压缩的最少。
  */
  let {code} = generator(ast,{
      retainLines:false,
      comments:true,
      compact:"concise"
  });
  // 保存代码
  fs.writeFile('decode.js', code, (err)=>{});
  ```

##### traverse 组件 与visitor

- traverse 用于遍历和转换抽象语法树（AST）的工具，转换语法树需要配置visitor使用
- visitor 是一个对象，里面可以定义一些方法，用来过滤节点
- visitor 示例代码：

```js
//encode.js
console.log('hello ast!');
var a = 10;
```

```js
//ast插件
const visitor = {
    ExpressionStatement(path){
        console.log("ast反混淆ing......")
    }
}
traverse(ast,visitor)
```

1. 在代码中首先声明了visitor对象，对象的名字可以任意取。

2. 在visitor对象中定义一个名为ExpressionStatement的方法，这个方法的名字是需要遍历的是节点类型。

3. traverse会遍历所有节点，当节点类型为 ExpressionStatement时，调用visitor中对应的方法。

4. 如果想要处理其他节点类型，那么可以继续在visitor中继续定义对应的方法

5. visitor 对象中的方法接收一个参数，traverse在遍历的时候会把当前节点的Path对象传给它，传进去的Path对象不是节点node

    ```
    path参数/对象
    
    - path参数，表示当前正在遍历的节点路径，**path** 包含有关节点相关信息的对象。
    - 通过 **path** 对象，可以访问和操作节点的属性和关系，**path** 对象中又提供提供了很多内置方法供我们使用。
    ```

6. 最后把visitor作为第二个参数传入traverse中，传给traverse的第一个参数是整个ast。
    traverse(ast,visitor) 的意思是，从头开始遍历ast中的所有节点，过滤出ExpressionStatement节点，执行相应的方法。在ast中如果有多个ExpressStatement就会输出对应的次数。

```js
//path常用属性
const visitor = {
    ExpressionStatement(path){
        console.log("ast反混淆ing......");
        console.log('当前节点对象:',path.node);
        console.log('节点对象类型：',path.type);
        console.log('节点源码：',path.toString());
    }
}
traverse(ast,visitor)
```

- enter与exit
  - 在遍历节点的过程中，实际上有两次机会来访问节点，enter表示进入节点时，exit表示退出节点时。可以在代码中编写遍历时进入要做的操作和退出时要做的操作。

```js
const visitor = {
    ExpressionStatement:{
        enter(path,state){
            console.log('开始学习ast')
        },
        exit(){
            console.log('结束学习ast')
        }
    }
}
traverse(ast,visitor)
```

- 一个函数同时处理两个节点

  - 可以把方法名用 **|** 连接起来组合成字符串的形式,这样就把同一个函数应用到多个节点

  ```js
  const visitor = {
      "ExpressionStatement|VariableDeclaration":{
          enter(path,state){
              console.log('开始学习ast')
          },
          exit(){
              console.log('结束学习ast')
          }
      }
  }
  traverse(ast,visitor)
  ```

- 多个函数处理一个节点：

  - 把多个函数应用于同一个节点。把函数赋值给enter或exit，将enter改为接收一个函数数组就行

  ```js
  //encode.js
  var a = 10;
  function func(){
      console.log('i am function!');
  }
  ```
  
  ```js
  function f1(){
      console.log('i am f1 of function')
  }
  function f2(){
      console.log('i am f2 of function')
  }
  const visitor = {
      "FunctionDeclaration":{
          enter:[f1,f2]
      }
  }
  traverse(ast,visitor)
  ```

##### 常用的节点类型

##### ![Snipaste_2024-10-15_21-49-28](/ast/imgs/Snipaste_2024-10-15_21-49-28.png)traverse 指定节点向下遍历

- traverse 可以指定在任意节点向下遍历,比如遍历到指定函数内部、while循环内部等。
- 例如，想要把代码中所有函数的第一个参数改为 x

```js
//encode.js
var a = 10;
function func1(param1,param2){
    console.log('i am function1!');
}
function func2(a1,a2){
    console.log('i am function2!');
}
```

```js
//ast插件B，用于修改函数参数名
const updateParamNameVisitor = {
    //Identifier表示被遍历节点的标识符，如果被遍历的节点为函数，则该为函数名
    Identifier(path){
        if(path.node.name === this.paramName){
            path.node.name = "x"
        }
    }
}
//ast插件，假设命名为插件A
const visitor = {
    //指定需要遍历的节点类型为函数
    FunctionDeclaration(path){
        //获取被遍历函数的第一个参数
        const paramName = path.node.params[0].name;
        //调用traverse对函数节点向下遍历，修改函数的第一个参数
        //此处path就特指了被遍历的函数节点的路径（调用插件B-》updateParamNameVisitor）
        path.traverse(updateParamNameVisitor,{
            paramName:paramName
        })
    }
}
// 调用插件A,处理js代码
traverse(ast,visitor)
```

##### types组件

types组件，主要用于判断节点类型

- 判断节点类型：例如，将js中所有标识符为a(变量名为a、函数名为a等)的节点，将其名字改为b。语法格式：types . is节点名称

```js
//encode.js

//忽略语法错误，重点测试ast功能
var a = 10;
function a(a,num2){
    return a + num2;
};
console.log(a());
```

```js
const visitor = {
    enter(path){
        //在js代码中定位到所有标识符为a(变量名为a、函数名为a等)的节点，将其名字改为b
        if(types.isIdentifier(path.node,{"name":"a"})){
            path.node.name = "b";
        }
    }
}
// 调用插件,处理js代码
traverse(ast,visitor)
```

#### 替换节点属性值

通过types组件将节点中的属性值替换为指定的属性值

示例：将当前VariableDeclarator节点下的init下的value属性的属性值替换为 123123

 ![Snipaste_2024-06-12_09-24-10](/ast/imgs/Snipaste_2024-06-12_09-24-10.png)

```js
// todo 编写ast插件
const visitor = {
    VariableDeclarator(path){
        //修改为数字类型
        path.node.init = types.numericLiteral(123123)
    }
}
traverse(ast,visitor)
```

#### 替换节点

replaceWith：该方法是节点替换节点。例如：将所有数字型变量值全部修改为123321

数字变量的节点类型NumericLiteral。

![Snipaste_2024-06-12_09-28-44](/ast/imgs/Snipaste_2024-06-12_09-28-44.png)

```js
// todo 编写ast插件
const visitor = {
    NumericLiteral(path){
        //修改为字符串类型	
        path.replaceWith(types.valueToNode("123321"))
    }
}
/*
* 替换后的代码:
    var a = "123321";
    var b = "123321";
* */
traverse(ast,visitor)
```

replaceWithSourceString：该方法是用字符串源码替换节点。例如：将123替换为一个函数

![Snipaste_2024-06-12_09-38-10](/ast/imgs/Snipaste_2024-06-12_09-38-10.png)

```js
// todo 编写ast插件
const visitor = {
    NumericLiteral(path){
        path.replaceWithSourceString(`function add(a,b){return a + b}`)
    }
}
traverse(ast,visitor)
/*
* 替换结果:
var a = function add(a, b) {
  return a + b;
};
* */
```

#### 删除节点

如果想ast遍历到当前某个没有用的节点时候进行删除可以使用，path.remove() 方法

```js
const visitor = {
    VariableDeclarator(path){
        path.remove();
   }
}
```

#### scope作用域

在AST(抽象语法树)中，scope表示一个代码块中变量和函数的作用域。scope决定了在给定位置访问那些标识符是合法的。所谓的标识符就是用于，标识变量、函数、属性和参数的名称。

scope提供了一些属性和方法，可以方便的查找标识符的作用域：

- 获取标识符的所有引用
- 修改标识符的所有引用
- 判断标识符是否为参数
- 判断标识符是否为常量，如果不是常量，也可以知道从哪里修改它

例如，有如下js代码，通过scope提供的属性和方法进行作用域的探究：

```js
const a = 1000;
let b = 2000;
let obj = {
    name:"AST-系统学习",
    add:function (a) {
        a = 400;
        b = 300;
        let e = 700;
        function demo(){
            let d = 600;
        }
        demo();
        return a + a + b + 1000 + this.name;
    }
}
//定义了一个obj 对象，在该对象中，编写了一个add函数，在add函数中又定义了一个 demo 函数。这种函数在AST中的类型为：FunctionDeclaration
```

##### scope.block

scope.block 属性可以获取标识符的作用域，返回的是Node对象。

- 定位标识符为变量对应的作用域

```js
// todo 编写ast插件
const visitor = {
    Identifier(path){
        if(path.node.name === "e"){
            var node = path.scope.block;//获取标识符为e的作用域
            //通过generator将e的作用域转换为代码
            var code = generator(node).code
            console.log(code)
            
        }
    }
}
traverse(ast,visitor)
```

- 定位标识符为函数对应的作用域

```js
const visitor = {
    //当遍历到节点为FunctionDeclaration时，将path.scope.block得到的Node对象转换为代码并输出
    FunctionDeclaration(path){
        var node = path.scope.block
        var code = generator(node).code
        console.log(code)
        /* 输出结果
            function demo() {
              let d = 600;
            }
        */
    }
}
traverse(ast,visitor)
```

问题：上述代码最后只输出了 demo 函数，并没有输出 demo 函数所在作用域的代码，遇到这种情况需要获取父级path作用域。

```js
const visitor = {
    FunctionDeclaration(path){
        //path.scope.parent 获取的是当前节点的父节点的作用域，然后在通过 block 获取标识符作用域
        var node = path.scope.parent.block
        var code = generator(node).code
        console.log(code)
    }
}
traverse(ast,visitor)
```

##### scope.dump

scope.dump 会得到自己向上的作用域与变量信息，先输出自己当前的作用域，再输出父级作用域，再输出父级的父级的作用域，直到顶级作用域。

```js
const visitor = {
    //当遍历到节点为FunctionDeclaration时，将path.scope.block得到的Node对象转换为代码并输出
    FunctionDeclaration(path){
        //获取demo函数名
        console.log("函数: ",path.node.id.name + "()")
        //输出demo函数所有上层作用域
        path.scope.dump()
    }
}
traverse(ast,visitor)
```

输出结果解释：

```
可以看到输出的结果：输出了三个作用域
	- 输出自己当前的作用域：FunctionDeclaration
	- 输出父级作用域：FunctionExpression
	- 输出父级的父级作用域：Program
输出内容解读：
	1.# 开头的是每一个作用域，上面输出的内容中一共有3个作用域
	2.- 开头的是每一个作用域的绑定(binding)，每一个binding都会包含其作用域内相关“标识符”的几个关键信息，分别是:constant，references，violations，kind
		- constant：表示是否为常量，true为常量，否false
		- references：表示被引用的次数
		- violations: 这表示在该函数声明中没有违反任何规则或约定。
    	- kind：表示声明类型
            - param 表示参数
            - hoistend 提升
            - var 变量
            - local 内部
            - ......
```

##### scope.getBinding

`path.scope.getBinding` 用于获取指定标识符在当前作用域中的绑定信息。这个方法通常在遍历 AST 时使用，以检查变量、函数等是否已经在当前作用域中定义。

```
绑定信息通常指的是变量、函数或类等标识符与其对应的值之间的关系。当你声明一个变量并给它赋值时，这个变量就被绑定到了特定的值。同样地，当你定义一个函数或类时，它们也被绑定到了相应的函数体或类定义。

path.scope.getBinding方法用于获取当前作用域中的绑定信息。这意味着它会返回一个对象，该对象包含了关于指定标识符的信息，例如它是否被声明、是否是全局的、是否是常量等。这些信息可以帮助你理解代码的结构以及标识符的使用情况。
```

假设我们有以下JavaScript代码：

```js
let x = 10;
function add(a, b) {
  return a + b;
}
console.log(add(x, 5));
```

在这个例子中，`x`是一个变量，它被绑定到了值`10`；`add`是一个函数，它被绑定到了函数体`{ return a + b; }`。如果我们在遍历过程中遇到一个标识符x，我们可以调用`path.scope.getBinding('x')`来获取它的绑定信息。这将返回一个对象，其中包含了关于`x`的信息，例如它的声明类型（可能是`'let'`或`'var'`），以及它在作用域中的引用情况等。通过这种方式，我们可以深入了解代码的结构和使用情况，这对于代码分析和转换工具非常有用。

```js
const visitor = {
     FunctionDeclaration(path){
        let binding = path.scope.getBinding("a")
        console.log(binding)
    }
}
traverse(ast,visitor)
```

<img src="/ast/imgs/Snipaste_2024-06-13_09-15-24.png" alt="Snipaste_2024-06-13_09-15-24" style="zoom:75%;" />

##### scope.traverse

- scope.traverse方法用于遍历当前作用域中的节点。
- 也可以使用binding中的scope遍历binding.scope.traverse()

```js
//将d的值修改为666999
const visitor = {
     FunctionDeclaration(path) {
         //获取标识符d的binding
         let binding = path.scope.getBinding('d'); //也可以用标识符e
         // binding.scope.block 表示在遍历时,在当前作用域中遍历
         binding.scope.traverse(binding.scope.block, {
             //遍历到变量类型的节点时，将d的值修改为666999
             VariableDeclarator(p) {
                 if (p.node.id.name === "d") {
                     p.node.init = types.numericLiteral(666999)
                 }
             }
         })
     }
}
traverse(ast,visitor)
```

### 练习

练习1：有如下代码：

```js
var b = 1 + 2;
var c = "coo" + "kie";
var a = 1+1,b = 2+2;
var c = 3;
var d = "1" + 1;
var e = 1 + '2';
```

将其还原成：(表达式节点遍历，然后提取表达式元素，进行计算后替换)

```js
var b = 3;
var c = "cookie";
var a = 2,b = 4;
var c = 3;
var d = "11";
var e = "12";
```

实现：

```js
const parse = require('@babel/parser')
const traverse = require('@babel/traverse').default
const types = require('@babel/types')
const generator = require("@babel/generator").default;
// JS 转 ast语法树
jscode = `var b = 1 + 2;
var c = "coo" + "kie";
var a = 1+1,b = 2+2;
var c = 3;
var d = "1" + 1;
var e = 1 + '2';
`
// 转换js代码为ast树结构
let ast = parse.parse(jscode);
// 用查找定位节点(ast结构树, 访问器对象)
traverse(ast, {
  //遍历表达式节点
  BinaryExpression(path) {
      // 取出表达式的各个元素：1 + 2
      var {left, operator, right} = path.node
      //console.log(left.value,operator,right.value)

      // 数字相加处理
      if (types.isNumericLiteral(left) && types.isNumericLiteral(right) && operator == "+" ) {
          value = left.value + right.value
          // console.log(value);
          // 会把原来的节点当中的原来的值进行替换
          path.replaceWith(types.valueToNode(value))
          // console.log(path.parentPath.node)
      }
      //字符串相加
      if (types.isStringLiteral(left) && types.isStringLiteral(right) && operator == "+") {
          value = left.value + right.value
          // console.log(value);
          // 会把原来的节点当中的原来的值进行替换
          path.replaceWith(types.valueToNode(value))
      }
      if (types.isStringLiteral(left) && types.isNumericLiteral(right) && operator
== "+" || types.isNumericLiteral(left) && types.isStringLiteral(right)) {
          value = left.value + right.value
          // console.log(value);
          // 会把原来的节点当中的原来的值进行替换
          path.replaceWith(types.valueToNode(value))
      }
  }
})
// 将ast还原成JavaScript代码
let {code} = generator(ast);
console.log(code)
```

练习2：

```
源代码：var arr = '3,4,0,5,1,2'['split'](',')
还原后：var arr = ["3", "4", "0", "5", "1", "2"]
```

```js
const parse = require('@babel/parser')
const traverse = require('@babel/traverse').default
const types = require('@babel/types')
const generator = require("@babel/generator").default;
// JS 转 ast语法树
jscode = `
var arr = '3,4,0,5,1,2'['split'](',')
`
// 转换js代码为ast树结构
let ast = parse.parse(jscode);
traverse(ast, {
    //遍历函数调用节点（split函数）
   CallExpression(path) {
        //获取函数调用节点的调用者callee和函数参数arguments
       let {callee, arguments} = path.node
       // 通过打印节点的树结构决定访问哪些属性
       //console.log(callee.object.value,arguments[0].value)
       let data = callee.object.value //获取split函数调用者
       let func = callee.property.value //获取函数名
       let arg = arguments[0].value //获取split函数参数
       var res = data[func](arg) //调用函数获取返回值
       //用于替换当前节点
       path.replaceWith(types.valueToNode(res))
  }
})
// 将ast还原成JavaScript代码
let {code} = generator(ast);
console.log(code)
```

练习3：编码类型还原

<img src="/ast/imgs/Snipaste_2024-10-16_09-31-49.png" alt="Snipaste_2024-10-16_09-31-49" style="zoom:50%;" />

通过检查`node.extra.raw`的值，我们可以确定这个数字字面量是以哪种编码类型表示的（如十六进制、八进制或二进制），然后根据需要将其转换为相应的十进制数值。

通过将`node.extra`设置为`undefined`，我们可以确保在后续的处理过程中，这个数字字面量被视为一个普通的十进制数，而不受其原始编码类型的干扰。

```js
//处理前：
var a = 0x25,b = 0b10001001,c = 0o123456,
d = "\x68\x65\x6c\x6c\x6f\x2c\x41\x53\x54",
e = "\u0068\u0065\u006c\u006c\u006f\u002c\u0041\u0053\u0054";

//处理后：
var a = 37,b = 137,c = 42798,d = "hello,AST",e = "hello,AST"
```

```js
const parse = require('@babel/parser')
const traverse = require('@babel/traverse').default
const types = require('@babel/types')
const generator = require("@babel/generator").default;
// JS 转 ast语法树
jscode = `
var a = 0x25,b = 0b10001001,c = 0o123456,
d = "\x68\x65\x6c\x6c\x6f\x2c\x41\x53\x54",
e = "\u0068\u0065\u006c\u006c\u006f\u002c\u0041\u0053\u0054";
`
let ast = parse.parse(jscode);
const visitor = {
  NumericLiteral({node}) {
      //如果节点存在extra属性且raw是以0o、0b或者0x开头的
      //i表示不区分大小写匹配，意味着在匹配时忽略字符的大小写差异。
      if (node.extra && /^0[obx]/i.test(node.extra.raw)) {
            //移除了数字字面量节点的编码类型信息。
            node.extra = undefined;
      }
  },
  StringLiteral({node}) {
      //如果节点存在extra属性且raw是以\u或者\x
      //g 表示全局匹配,意味着在整个字符串中查找所有匹配项，而不仅仅是找到第一个匹配就停止。
      if (node.extra && /\\[ux]/gi.test(node.extra.raw)) {
          //移除了数字字面量节点的编码类型信息。
          node.extra = undefined;
      }
  },
}
traverse(ast,visitor);
let {code} = generator(ast);
console.log(code);
```



### Ast反混淆实战

基于ast实现极验平台滑动验证时slide.js中的混淆代码。

极验：https://www.geetest.com/show

#### 字符解码

下列函数的函数名都是基于unicode编码后的字符串，通过ast对其进行字符解码

```js
Ze[$_DADR(91)] = {
    "\u0024\u005f\u0042\u004a\u0045\u0054": function (e, t) {
        var $_CECDo = PaLDJ.$_CS
            , $_CECC_ = ['$_CECGP'].concat($_CECDo)
            , $_CECEX = $_CECC_[1];
        $_CECC_.shift();
        var $_CECFB = $_CECC_[0];
    }
}
```

```js
function decrypt_str(ast){ //1.字符解码
    traverse(ast,{
        //遍历字符串节点和数字节点（数字编码or字符编码）
        'StringLiteral|NumericLiteral'(path){
            //删除节点中的extra属性
            delete path.node.extra.raw
            //或者：path.node.extra = undefined
        }
    })
    return ast
}
```

**复制slide.js文件所有内容到encode.js文件中，调用decrypt_str函数使用字符编码的反混淆**

#### Fiddler进行js文件替换

处理跨域问题：在Filters的Set Response Headers中添加

```
"Access-Control-Allow-Origin":"*"
```

![Snipaste_2024-06-12_16-33-54](/ast/imgs/Snipaste_2024-06-12_16-33-54.png)

注意：录入被替换的js链接前可以加上**EXACT:**

```js
EXACT:https://static.geetest.com/static/js/slide.7.9.2.js
```

然后，刷新一下网页，查看js文件是否已经被替换成你想替换的内容，并做相应的测试；刷新后fiddler替换js文件如果失败，可如下操作，网页端谷歌开发者工具勾选Network>Disable cache；以防浏览器里面有js源文件的缓存，可能导致fiddler替换js文件失败；
![Snipaste_2024-06-12_16-35-40](/ast/imgs/Snipaste_2024-06-12_16-35-40.png)

#### 重复引用赋值反混淆

```js
var $_BGHER = mwbxQ.$_Cg
          , $_BGHDC = ['$_BGHHI'].concat($_BGHER)  
          , $_BGHFG = $_BGHDC[1];  
$_BGHDC.shift();
var $_BGHGG = $_BGHDC[0];

//核心代码
var e = this[$_BGHER(37)];
```

查看分析上述代码的ast结构：

<img src="/ast/imgs/Snipaste_2024-06-13_15-29-25.png" alt="Snipaste_2024-06-13_15-29-25" style="zoom:75%;" />

上述代码分别对应了ast中三种不同类型的节点，分别是变量节点1，函数调用节点和变量节点2。

变量“节点1”的ast结构展开后：

<img src="/ast/imgs/Snipaste_2024-06-13_15-39-09.png" alt="Snipaste_2024-06-13_15-39-09" style="zoom:75%;" />

变量“节点2”的ast结构展开后：

<img src="/ast/imgs/Snipaste_2024-06-13_15-45-06.png" alt="Snipaste_2024-06-13_15-45-06" style="zoom:75%;" />

##### 前置知识点

- node.declarations：
  - 在AST中，node.declarations包含了当前节点下的所有声明语句。变量节点1中有3个声明语句。变量节点2中只有1个声明语句。
- node.declarations.length：
  - 表示的是当前节点中声明语句的数量。在上面需要反混淆的代码中，有两个VariableDeclaration类型节点，各自声明的数量是3和1。
- node.declarations[0].init：表示的是第一个声明语句中的声明的部分
- generator(node.declarations[0].init).code：使用生成器（generator）将第一个声明语句的声明转换为代码字符串。

```js
function func_replace(path) {
    const node = path.node;
    //将变量节点1（声明语句数量为3）中声明语句的数量和声明部分获取并显示
    if(node.declarations.length == 3){
        console.log('变量节点1中声明语句的数量为:'+node.declarations.length)
        console.log('变量节点1的第一个声明部分为:'+generator(node.declarations[0].init).code)
        console.log('变量节点1的第二个声明部分为:'+generator(node.declarations[1].init).code)
        console.log('变量节点1的第三个声明部分为:'+generator(node.declarations[2].init).code)
    } 
}
// 编写ast插件,然后调用插件
traverse(ast,{VariableDeclaration:func_replace,})
```

##### 实现步骤1

```js
//测试代码
var $_BGHER = mwbxQ.$_Cg
          , $_BGHDC = ['$_BGHHI'].concat($_BGHER)
          , $_BGHFG = $_BGHDC[1];
$_BGHDC.shift();
var $_BGHGG = $_BGHDC[0];

//核心代码
var e = this[$_BGHER(37)];
```



<img src="/ast/imgs/Snipaste_2024-06-13_16-16-58.png" alt="Snipaste_2024-06-13_16-16-58" style="zoom:55%;" />

```js
function func_replace(path){
    const node = path.node;
    //过滤变量节点声明语句数量不为3的节点（过滤变量节点2）
    if(node.declarations.length !== 3)return
    //过滤第一个声明部分不是"mwbxQ.$_Cg"的变量节点
    if(generator(node.declarations[0].init).code !== "mwbxQ.$_Cg")return
    //将变量节点1的第1个声明语句和第3个声明语句保存到node.declarations数组中的两个元素
    //至此，变量节点1只保留了2个声明部分，原来的第二个声明部分被省略了
    node.declarations = [node.declarations[0],node.declarations[2]]
    /*将数组中第0个元素表示的声明语句的声明部分赋值给第1个元素，也就是将变量节点1中的第一个声明语句的声明部分赋值给第三个声明语句的声明部分*/
    node.declarations[1].init = node.declarations[0].init
    //path.getNextSibling()用于获取当前节点的下一个同级节点（即兄弟节点）
    //将变量节点1的下一个节点（函数节点进行删除）
    path.getNextSibling().remove()
    //将数组中第0个元素（变量节点1）表示的声明部分赋值给变量节点1下一个节点的声明部分
    path.getNextSibling().node.declarations[0].init = node.declarations[0].init
}
// todo 编写ast插件
traverse(ast,{VariableDeclaration:func_replace,})
```

##### 实现步骤2

```js
//测试代码
var $_BGHER = mwbxQ.$_Cg
          , $_BGHDC = ['$_BGHHI'].concat($_BGHER)
          , $_BGHFG = $_BGHDC[1];
$_BGHDC.shift();
var $_BGHGG = $_BGHDC[0];

//核心代码
var e = this[$_BGHER(37)];
```



<img src="/ast/imgs/Snipaste_2024-06-13_19-29-44.png" alt="Snipaste_2024-06-13_19-29-44" style="zoom:55%;" />

```js
function func_replaces(path){
    const node = path.node
    const scope = path.scope
    //获取变量节点中所有声明语句的变量名（$_BGHER，$_BGHFG，$_BGHGG，mwbxQ.$_Cg，e）
    const leftName = node.id.name
    //过滤掉声明语句的声明部分不是"mwbxQ.$_Cg"的变量节点
    if(generator(node.init).code !== "mwbxQ.$_Cg")return
    //获取leftName表示变量名的作用域（仅在该作用域下处理相关操作）
    let binding_left = scope.getBinding(leftName)
    //如果leftName作用域中该变量path的引用节点数不为0（只有第一个变量节点被额外在最后一行引用了1次，剩下都为0）
    if(binding_left.referencePaths.length !== 0){
        //遍历所有引用第一个变量节点的path（上图中只额外引用了一次，真实js代码中会有更多次引用）
        //在第一个变量节点作用域下遍历其他几点
        binding_left.referencePaths.forEach(function (path){
            //创建了一个标识符节点，该节点表示的字符串为"mwbxQ"，将该节点作用与left_path常量
            const left_path = types.identifier("mwbxQ")
            const right_path = types.identifier("$_Cg")
            //创建了一个表达式节点，该节点表示的字符串为“mwbxQ.$_Cg”
            const replace_path = types.memberExpression(left_path,right_path);
            //path路径替换，因为path中包含了node对象，也可以理解为节点替换
            //所有引用第一个变量节点的标识符全部替换成“mwbxQ.$_Cg”
            path.replaceWithMultiple(replace_path)
        })
    }
    //删除值为“mwbxQ.$_Cg”对应的节点对象
    path.remove()
}
traverse(ast,{VariableDeclarator:func_replaces,})
```

#### 函数调用替换

将带数字参数的函数返回的字符串替换该函数的调用。

<img src="/ast/imgs/Snipaste_2024-06-13_19-49-14.png" alt="Snipaste_2024-06-13_19-49-14" style="zoom:75%;" />

此时，所有带数字的函数名都被上一步修改为了“mwbxQ.$_Cg”，因此，$\_BGHFG(517)就已经变为了mwbxQ.$\_Cg(517)。

找到函数定义部分并对其进行执行---在浏览器抓包工具中先定位到slide.js文件，定位到最上面，相关函数的定义部分如下：

```js
//该函数定义部分是slide.js文件中声明的第三个赋值节点表示的函数定义
mwbxQ.$_Cg = function() {
    return typeof mwbxQ.$_Au.$_DBGGJ === 'function' ? mwbxQ.$_Au.$_DBGGJ.apply(mwbxQ.$_Au, arguments) : mwbxQ.$_Au.$_DBGGJ;
}
```

<img src="/ast/imgs/Snipaste_2024-06-13_20-17-43.png" alt="Snipaste_2024-06-13_20-17-43" style="zoom:75%;" />

js测试代码：可以使用slide.js文件里所有的js源码。

```js
/*
	从slide.js中找到mwbxQ.$_Cg函数定义位置代码，将其进行执行。方便后期对该函数的直接调用。
	slide.js中代码比较多，但是发现该函数为自上而下第3个定义的函数，因此将js文件中前几个函数定义代码取出，对其统一进行执行即可。
*/
function func_decrypt_str(ast){
    //将一个空字符串解析成ast抽象树，此时body节点下是空的
    let newAst = parser.parse('')
    //将ast也就是slide.js代码的ast树body下的前5个节点（包含了mwbxQ.$_Cg函数和其他几个函数定义节点）取出赋值给newAst的body。取出的节点尽量多一点，满足函数的调用关系，可以为5,6,7,8,9都行。
    newAst.program.body = ast.program.body.slice(0,5)
    //将newAst转换为js代码
    let stringDecryptFunc = generator(newAst,{compact:true,}).code
    //执行转换后的js代码（表示将mwbxQ.$_Cg函数定义的代码执行了）
    eval(stringDecryptFunc)
    
    //获取解密函数的名字
    const stringDecryptFuncAst = ast.program.body[2]//定位到mwbxQ.$_Cg函数节点
    //提取出该函数函数名左侧部分（对象名）：mwbxQ
    const  DecryptLeftFuncName = stringDecryptFuncAst.expression.left.object.name
    //提取出该函数函数名右侧部分（属性名）：$_Cg
    const DecryptRightFuncName = stringDecryptFuncAst.expression.left.property.name
    
    //调用函数获取返回值替换到函数调用位置
    traverse(ast,{
        //定位CallExpression函数调用类型节点
        CallExpression(path){
            //进行一系列判断，目的是定位到名为mwbxQ.$_Cg的函数调用
            /*
            types.isMemberExpression(path.node.callee)用于判断 path.node.callee 是否为成员表达式的函数。callee为函数节点对象。
            */
            if(types.isMemberExpression(path.node.callee) &&
               //判断callee函数对象的对象名是否等于DecryptLeftFuncName
                path.node.callee.object.name &&
                path.node.callee.object.name === DecryptLeftFuncName &&
               //判断callee函数对象的属性名是否等于DecryptRightFuncName
                path.node.callee.property.name &&
                path.node.callee.property.name === DecryptRightFuncName){
                	//将函数调用结果替换函数调用
                    path.replaceWith(types.valueToNode(eval(path.toString())))
            }
        }
    })
    return ast
}
```

#### switch控制流处理

测试代码：每一个case依次执行

```js
//一个case的情况
function $_BBo(t) {
    var $_DAIAx = mwbxQ.$_DW()[0][13];
    for (; $_DAIAx !== mwbxQ.$_DW()[3][12]; ) {
        switch ($_DAIAx) {
            case mwbxQ.$_DW()[3][13]:
                return t[$_CJFt(30)] ? t[$_CJES(14)] : t;
                break;
        }
    }
}
//多个case情况
function re(t) {
    var $_DBFFL = mwbxQ.$_DW()[6][13];
    for (; $_DBFFL !== mwbxQ.$_DW()[6][11];) {
        switch ($_DBFFL) {
            case mwbxQ.$_DW()[9][13]:
                var e = this
                    , n = t[$_CJES(67)];
                e[$_CJFt(434)] = t[$_CJES(434)],
                    e[$_CJES(464)] = t,
                    $_DBFFL = mwbxQ.$_DW()[3][12];
                break;
            case mwbxQ.$_DW()[0][12]:
                var r = n[$_CJES(604)]
                    , i = $_CJES(602) + n[$_CJFt(661)];
                w && (i += $_CJFt(648))
                $_DBFFL = mwbxQ.$_DW()[9][11];
                break;
        }
    }
}
```

ast代码：

```js
function func_switch(path){
    /*
        下面node=path.node表示定位到测试代码中的函数定义节点
        node.body表示函数节点的函数体部分
        node.body.body表示函数体中的两个子节点（变量节点node.body.body[0] & for循环节点node.body.body[1]）
    */
    const node = path.node
    //如果node.body.body[0]节点存在并且节点类型为变量类型则向下执行代码
    if(!(node.body.body[0] && node.body.body[0].type === "VariableDeclaration"))return
    //如果node.body.body[0]节点存在且声明语句的数量为1则向下执行代码
    if(!(node.body.body[0].declarations && node.body.body[0].declarations.length === 1))return
    //如果switch节点下存在case子节点则向下执行代码
    if(!(node.body.body[1].body.body[0].cases[0]))return
    //如果case下面不存在可执行的代码块consequent则继续向下执行代码
    if(!(node.body.body[1].body.body[0].cases[0].consequent))return
    //定位到下标为0的case下面的代码块
    const consequent = node.body.body[1].body.body[0].cases[0].consequent
    //获取case下代码块的执行语句数量
    const consequent_length = consequent.length
    //获取case下倒数第二个执行语句
    const conseq_two = consequent[consequent_length-2]
    //如果只有一个case的情况下（忽略，看懂else就可以看懂if下的代码内容，直接看else，因为测试代码有2个case）
    if(node.body.body[1].body.body[0].cases.length === 1){
        if(conseq_two.type === "ExpressionStatement" &&
            conseq_two.expression &&
            conseq_two.expression.type === "AssignmentExpression" &&
            conseq_two.expression.right &&
            conseq_two.expression.right.type === "MemberExpression" &&
            conseq_two.expression.right.property &&
            conseq_two.expression.right.property.type === "NumericLiteral"){
            node.body.body = consequent.slice(0,-2)
        }else{
            node.body.body = consequent.slice(0,-1)
        }
    }else{ //有2个或多个case的情况
        var merge_array = [] //1.空数组，用来存储处理好的case语句
        //2.获取case的数量
        var case_length = node.body.body[1].body.body[0].cases.length
        //3.遍历每一个case
        node.body.body[1].body.body[0].cases.forEach(function (node){
            case_length -= 1  //4.case个数减去1，因为case节点下标是从0开始的
            //5.第一次循环case_length为1，因此该if不走，if会在第二次循环执行，用来处理第2个case。因此先看else语句的执行
            if(case_length === 0){
                //7.开始第二次循环，此时case_length被减了1值为0，因此执行该if语句
                //获取第二个case的执行语句数量（4个）
                const node_consequent_length = node.consequent.length
                //获取case的第三个执行语句
                const node_second = node.consequent[node_consequent_length - 2]
                //如果case第三个执行语句满足如下条则
                if(node_second.type === "ExpressionStatement" &&
                    node_second.expression &&
                    node_second.expression.type === "AssignmentExpression" &&
                    node_second.expression.right &&
                    node_second.expression.right.type === "MemberExpression" &&
                    node_second.expression.right.property &&
                    node_second.expression.right.property.type === "NumericLiteral"){
                    //则保留case语句的前3条存储到merge_array中
                    merge_array = merge_array.concat(node.consequent.slice(0,-2))
                }else{
                    merge_array = merge_array.concat(node.consequent.slice(0,-1))
                }
            }else{ //处理第一个case
                //6.保留第一个case中3条执行语句的第一条，存放在merge_aray数组中。
                    //即将开始第二次循环处理第2个case语句
                merge_array = merge_array.concat(node.consequent.slice(0,-2))
            }
        })
        //8.将整理好的merge_array替换函数体的两个子节点
            // node.body.body表示函数体中的两个子节点
        node.body.body = merge_array
    }
}
//执行ast插件
traverse(ast,{FunctionDeclaration: func_switch,})
```

#### 完整ast代码

```js
// fs模块 用于操作文件的读写
const fs = require("fs")

;
// @babel/parser 用于将JavaScript代码转换为ast树
const parser = require("@babel/parser");
// @babel/traverse 用于遍历各个节点的函数
const traverse = require("@babel/traverse").default;
// @babel/types 节点的类型判断及构造等操作
const types = require("@babel/types");
// @babel/generator 将处理完毕的AST转换成JavaScript源代码
const generator = require("@babel/generator").default;

// 混淆的js代码文件
const encode_file = "./encode.js"
// 反混淆的js代码文件
const decode_file = "./decode.js"

// 读取混淆的js文件
let jsCode = fs.readFileSync(encode_file, {encoding: "utf-8"});
// 将javascript代码转换为ast树
let ast = parser.parse(jsCode)

//ast反混淆插件编写
function decrypt_str(ast){ //1.字符解码
    traverse(ast,{
        //遍历字符串节点和数字节点(因为有科学计数法表示的数组)
        'StringLiteral|NumericLiteral'(path){
            //删除节点中的extra属性
            delete path.node.extra.raw
        }
    })
    return ast
}
function func_replace(path){
    const node = path.node;
    if(node.declarations.length !== 3)return
    if(generator(node.declarations[0].init).code !== "mwbxQ.$_Cg")return
    node.declarations = [node.declarations[0],node.declarations[2]]
    node.declarations[1].init = node.declarations[0].init
    path.getNextSibling().remove()
    path.getNextSibling().node.declarations[0].init = node.declarations[0].init
}
function func_replaces(path){
    const node = path.node
    const scope = path.scope
    const leftName = node.id.name
    if(generator(node.init).code !== "mwbxQ.$_Cg")return
    let binding_left = scope.getBinding(leftName)
    if(binding_left.referencePaths.length !== 0){
        binding_left.referencePaths.forEach(function (path){
            const left_path = types.identifier("mwbxQ")
            const right_path = types.identifier("$_Cg")
            const replace_path = types.memberExpression(left_path,right_path);
            path.replaceWithMultiple(replace_path)
        })
    }
    path.remove()
}
function func_decrypt_str(ast){
    //将解密代码执行
    let end = 5
    let newAst = parser.parse('')
    newAst.program.body = ast.program.body.slice(0,end)
    let stringDecryptFunc = generator(newAst,{compact:true,}).code
    eval(stringDecryptFunc)
    //获取解密函数的名字
    const stringDecryptFuncAst = ast.program.body[2]
    const  DecryptLeftFuncName = stringDecryptFuncAst.expression.left.object.name
    const DecryptRightFuncName = stringDecryptFuncAst.expression.left.property.name
    //调用解密函数的代码执行，将执行后的值替换调用解密函数的代码
    traverse(ast,{
        CallExpression(path){
            if(types.isMemberExpression(path.node.callee) &&
                path.node.callee.object.name &&
                path.node.callee.object.name === DecryptLeftFuncName &&
                path.node.callee.property.name &&
                path.node.callee.property.name === DecryptRightFuncName){
                    path.replaceWith(types.valueToNode(eval(path.toString())))
            }
        }
    })
    return ast
}
function func_switch(path){
    const node = path.node
    if(!(node.body.body[0] && node.body.body[0].type === "VariableDeclaration"))return
    if(!(node.body.body[0].declarations && node.body.body[0].declarations.length === 1))return
    if(!(node.body.body[1].body.body[0].cases[0]))return
    if(!(node.body.body[1].body.body[0].cases[0].consequent))return
    const consequent = node.body.body[1].body.body[0].cases[0].consequent
    const consequent_length = consequent.length
    const conseq_two = consequent[consequent_length-2]
    if(node.body.body[1].body.body[0].cases.length === 1){
        if(conseq_two.type === "ExpressionStatement" &&
            conseq_two.expression &&
            conseq_two.expression.type === "AssignmentExpression" &&
            conseq_two.expression.right &&
            conseq_two.expression.right.type === "MemberExpression" &&
            conseq_two.expression.right.property &&
            conseq_two.expression.right.property.type === "NumericLiteral"){
            node.body.body = consequent.slice(0,-2)
        }else{
            node.body.body = consequent.slice(0,-1)
        }
    }else{
        var merge_array = []
        var case_length = node.body.body[1].body.body[0].cases.length
        node.body.body[1].body.body[0].cases.forEach(function (node){
            case_length -= 1
            if(case_length === 0){
                const node_consequent_length = node.consequent.length
                const node_second = node.consequent[node_consequent_length - 2]
                if(node_second.type === "ExpressionStatement" &&
                    node_second.expression &&
                    node_second.expression.type === "AssignmentExpression" &&
                    node_second.expression.right &&
                    node_second.expression.right.type === "MemberExpression" &&
                    node_second.expression.right.property &&
                    node_second.expression.right.property.type === "NumericLiteral"){

                    merge_array = merge_array.concat(node.consequent.slice(0,-2))
                }else{
                    merge_array = merge_array.concat(node.consequent.slice(0,-1))
                }
            }else{
                merge_array = merge_array.concat(node.consequent.slice(0,-2))
            }
        })
        node.body.body = merge_array
    }
}
function delete_func(path){
    if(path + '' === "mwbxQ.$_DW()"){
        path.parentPath.parentPath.parentPath.parentPath.remove()
    }
}
//1.字符解码
decrypt_str(ast)
//2.重复引用赋值反混淆
traverse(ast,{VariableDeclaration:func_replace,})
traverse(ast,{VariableDeclarator:func_replaces,})
//3.带数字参数的函数返回字符串替换该函数的调用
func_decrypt_str(ast)
//4.switch控制流处理
traverse(ast,{FunctionDeclaration: func_switch,})
//5.删除无用函数(还有一些swith为空的代码进行删除)
traverse(ast,{CallExpression:delete_func,})
ast.program.body = ast.program.body.slice(5)

// const visitor = {}
// traverse(ast,visitor)

// 将处理后的ast转换为js代码(反混淆后的代码)
let {code} = generator(ast);
// 保存代码
fs.writeFile('decode.js', code, (err)=>{});
```



