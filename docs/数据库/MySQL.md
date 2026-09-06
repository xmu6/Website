---
title: MySQL
date: 2026-09-06 08:00:00
categories:
  - 数据库
tags:
  - MySQL
  - SQL
coverImg: /covers/mysql.webp
permalink: /database/kjdwe
---

# DDL

## 创建表/修改结构

- `show databases;`…… 查看所有数据库
- `create database;`…… 创建数据库
- `use mydb1;`…… 切换数据库
- `drop database;`…… 删除数据库

## 创建表格式

```mysql
create table 表名(
	字段1 类型(宽度) [约束条件] [commen '字段说明']
	...
);

例：
create table student(
	sid int,
	name varchar(20),
	birth date,
);
```

## 字段数值类型

[MySQL 数据类型 | 菜鸟教程 (runoob.com)](https://www.runoob.com/mysql/mysql-data-types.html)

| 区别     | Char                   | Varchar                    |
| -------- | ---------------------- | -------------------------- |
| 存储方式 | 定长                   | 变长                       |
| 存储空间 | 固定                   | 可变                       |
| 性能     | 较好                   | 较差                       |
| 适用场景 | 长度固定且需要频繁比较 | 长度不固定且不需要频繁比较 |

## 表结构的常用操作

- `show tables;`…… 查看所有表
- `show create table 表名;`…… 查看表创建语句
- `desc 表名;`…… 查看表结构
- `drop table 表名;`…… 删除表
- `alter table 表名 add/drop 列名 类型（长度）;`…… 添加/删除字段
- `alter table 表名 change 旧列名 新列名 类型（长度）;`…… 修改字段
- `rename table 旧表名 to 新表名;`…… 改名

# DML

数据增删改

- 数据插入：` insert into 表(列名1,列名2,…) values(值1,值2,…), (值1,值2,…),… (值1,值2,…);`  (若不指定列，则对所有列)
- 数据修改：`update 表名 set 字段名=值, 字段名=值… where 条件;`  （若不加where，则对所有）
- 数据删除：`delete from 表名 [where 条件];`  /  `truncate 表名;`(清空)

| 区别     | DELETE                               | TRUNCATE                 |
| -------- | ------------------------------------ | ------------------------ |
| 删除方式 | 逐行删除                             | 一次性删除               |
| 执行速度 | 慢                                   | 快                       |
| 影响     | 可根据条件删除部分数据，不影响表结构 | 删除所有数据，重置自增列 |
| 事务     | 支持                                 | 不支持                   |

# 约束

- **主键约束**：一个列或多个列的组合，其值能唯一标识表中的每一行，<u>不允许重复和出现空值</u>。

  - 创建时添加：

    ```mysql
    create table 表名(
    	...
    	<字段名> <数据类型>  primary key,
    	...
    );
    or
    create table 表名(
    	...
    	primary key(字段1，字段2，...)
    );
    ```

  - 后来添加

    `alter table 表名 add primary key(字段1,字段2,….);`

  - 删除主键

    `alter table 表名 drop primary key;`

- **自增长约束**：默认情况下，auto_increment的初始值是1，每增加一条记录字段值自动加1。只能有一个字段使用auto_increment约束，且该字段必须有唯一索引（即为主键或主键的一部分）。非空，约束的字段只能是整数型类，达到上限就失效。

  - 创建

    ```mysql
    create table user(
    	id int primary key auto_increment,
    );
    ```

  - 更改

    ```mysql
    create tabel user(
    	id int primary key auto_increment,
    ) auto_increment=100;
    or
    alter table user auto_increment=100
    ```

- **非空约束**：字段的值不为空

  - 添加：`<字段名> <数据类型> not null;`    or    `alter table 表名 modify 字段 类型 not null;`
  - 删除：`alter table 表名 modify 字段 类型;`

- **唯一约束**：字段的值不能重复出现（SQL中null与任何值包括自己不同）

  - 创建：`<字段名> <数据类型> unique;`   or   `alter table 表名 add constraint 约束名 unique(列);`
  - 删除：`alter table 表名 drop 字段 unique_pn;`

- **默认约束**：（若给值，默认失效）

  - 创建：`<字段名> <数据类型> default <默认值>;`   or    `alter table 表名 modify 字段 类型 default 默认值;`
  - 删除：`alter table 表名 modify 字段 类型 default null;`

# DQL

查询

```mysql
selet [all|distinct] <目标列的表达式1> [别名], <目标列的表达式2> [别名],...
from <表名或视图名> [别名],<表名或视图名> [别名],...
[where<条件表达式>] [group by <列名>] [having <条件表达式>] [order by <列名> [asc|desc]] [limit<数字或列表>];
```

- 简单查询

  - 查询所有：`select * from 表名;`
  - 指定列：`select 列1,列2,…from 表名;`
  - 起别名（用于多表查询）：`select * from 表名 (as) 别名;`  or  `select 列名 as 别名;`→as可省略
  - 指定列去重：`select distinct 列名 from 表名;`
  - 运算查询：`select 列名1,..,f(列名2) 别名from 表名;`
  - 运算符：[MySQL 运算符 | 菜鸟教程 (runoob.com)](https://www.runoob.com/mysql/mysql-operator.html)

  注：like模糊匹配：like “%x”→以x结尾；%x%→x在中间；x%→x在开头。若查询前面几个，用下划线\_来占一个位置。_x%→第二个为x。求最值时若有null，不会进行比较，直接输出null。

- 排序查询：

  ```mysql
  select 字段1,字段2,...from 表名 order by 字段名[asc|desc];
  # asc升序，desc降序，不写默认升序
  ```

- 分组查询：

  ```mysql
  select 字段1,字段2,...from 表名 group by 分组字段 having 分组条件;
  ```

- 分页查询：

  ```mysql
  select 字段1,字段2,...from 表名 limit n
  select 字段1,字段2,...from 表名 limit m, n
  # m:表示从第几条索引开始，计算：（当前页-1）*每页显示条数，即不要前m条
  # n:表示查询多少条数据
  ```

- 聚合查询：对列的计算

  - COUNT：统计数据集中非空值的个数。
  - SUM：计算数据集中所有值的总和。
  - AVG：计算数据集中所有值的平均值。
  - MAX：返回数据集中最大的值。
  - MIN：返回数据集中最小的值

- **顺序**：from--where--group by--count-- having-- select--order by--limit

# 多表操作

## 外键约束

多表关系的约束手段，常与主键一起使用。

`foreign key 字段名 references 主表名 主键列`  or  `alter table 表名 add foreign key 列名 references 主表名 主键列`

```mysql
CREATE TABLE 订单 (
  订单ID INT PRIMARY KEY AUTO_INCREMENT,
  客户ID INT,
  FOREIGN KEY (客户ID) REFERENCES 客户 (客户ID)
);

CREATE TABLE 客户 (
  客户ID INT PRIMARY KEY AUTO_INCREMENT,
  姓名 VARCHAR(255),
  ...
);

# 多对多，需添加中间表
CREATE TABLE 订单商品 (
  订单ID INT,
  商品ID INT,
  数量 INT,
  PRIMARY KEY (订单ID, 商品ID),
  FOREIGN KEY (订单ID) REFERENCES 订单 (订单ID),
  FOREIGN KEY (商品ID) REFERENCES 商品 (商品ID)
);

CREATE TABLE 订单 (
  订单ID INT PRIMARY KEY AUTO_INCREMENT,
  客户ID INT,
  ...
);

CREATE TABLE 商品 (
  商品ID INT PRIMARY KEY AUTO_INCREMENT,
  名称 VARCHAR(255),
  ...
);
```

删除外键：`alter table 表名 drop foreign key <外键约束名>;`

注意：添加数据时必须先给主表添加数据；主表的数据被从表依赖时不能删除。

# 多表联合查询

- 交叉连接查询：返回被连接的两个表所有数据行的笛卡尔积，易产生冗余的数据，需后期进行条件筛选。

  `select * from 表1,表2,...;`

- 内连接查询：求多张表的交集。

  `select * from A inner join B on 条件;`

- 外连接查询：outer可省略

  - 左外连接：`select * from A left outer join B on 条件;`
  - 右外连接：`select * from A right outer join B on 条件;`
  - 满外连接：`select * from A full outer join B on 条件;`

  多张表时：

  ```mysql
  select * from A left join B on 条件1 left join C on 条件2;
  ```

- 子查询：在一个完整的查询语句中嵌套若干个不同功能额的小查询

  ```mysql
  SELECT * FROM 订单 WHERE 客户ID IN (
    SELECT 客户ID FROM 客户 WHERE 国家 = '中国'
  );
  
  SELECT 订单ID,
         (SELECT 姓名 FROM 客户 WHERE 客户ID = 订单.客户ID) 
         AS 客户姓名 FROM 订单;
         
  -- with的使用
  with subquery_name1 as (subquery_body1),
          subquery_name2 as (subquery_body2)
  
  select * from subquery_name1 a, subquery_name2 b
  where a.col = b.col
  ...
  ```

# 函数

[MySQL常用函数大全（总结篇）_mysql函数-CSDN博客](https://blog.csdn.net/zeng_ll/article/details/87706409)

## 窗口函数

```mysql
SELECT
    column_name,
    window_function(column_name) OVER (
        PARTITION BY partition_column
        ORDER BY order_column
        [window_frame]
    ) AS window_column_name
FROM table_name;
```

- `window_function`: 要使用的开窗函数。
- `OVER`: 关键字，用于指定窗口定义。
- `PARTITION BY`: 关键字，用于指定分区列。
- `ORDER BY`: 关键字，用于指定排序列。
- `window_frame`: 可选，用于指定窗口范围。
- `window_column_name`: 窗口函数的别名。

**序号函数**：row_number()/rank()/dense_rank()，分组排序并添加序号

```mysql
select dname, ename, salary, row_number() over (
	partition by dname
    order by salary
) as rn from employee;
```

<img src="/mysql/MySQL.assets/image-20240315195214855-844.webp" srcset="/mysql/MySQL.assets/image-20240315195214855-844.webp 1x" width="844" height="435" data-full-src="/mysql/MySQL.assets/image-20240315195214855.png" alt="image-20240315195214855" style="zoom:80%;"  loading="lazy" decoding="async" />

三种对应分别为：（大，大，小）→（1,2,3）；（大，大，小）→（1,1,3）；（大，大，小）→（1,1,2）；

# 视图

一个虚拟表，本质是根据SQL语句获得动态的数据集，并为其命名。视图中的数据依赖于原表中的数据。作用：简化代码，可以把重复使用的查询封装成视图重复使用；隐藏数据。

`CREATE VIEW view_name AS SELECT column_list FROM table_name;`

```mysql
CREATE VIEW vw_employees AS SELECT employee_name, department_name, salary FROM employees;
SELECT * FROM vw_employees;
```

- 视图不存储数据，而表存储数据。
- 视图可以包含计算表达式和聚合函数，而表不能。
- 视图可以控制用户对数据的访问权限，而表不能。

# 存储过程

SQL语言层面的代码封装与重用（看成函数）

```mysql
delimiter 自定义符号
create procedure 存储名([in,out,inout] 参数名 数据类型...)
begin
	sql语句
end 自定义符号
delimiter;
```

调用：`call 存储名()`

传参：in / out(类似return);Inout：既可以使用传入变量的值也可以修改变量的值，还能传出

```mysql
delimiter $$
create procedure proc(in emp int, out out_name varchar(20))
begin
	select name into out_name from emp where emp.empno=empno;
end $$
delimiter;
call proc(1001,@o_name);
select @o_name;
```

## 流程控制

[Mysql高手系列 - 第18篇：mysql流程控制语句详解（高手进阶） - 路人甲Java - 博客园 (cnblogs.com)](https://www.cnblogs.com/itsoku123/p/11640021.html)

# 触发器

MySQL为行级触发器，变几行就触发几次

- 触发器的这种特性可以协助应用在数据库端确保数据的完整性,日志记录,数据校验等操作。 
- 使用别名 OLD 和NEW 来引用触发器中发生变化的记录内容,这与其他的数据库是相似的。现在触发器还只支持行级触发,不支持语句级触发。

创建只有一个执行语句的触发器

```mysql
create trigger 触发器名 before|after 触发事件 on 表名 for each row 
执行语句;
```

创建有多个执行语句的触发器

```mysql
create trigger 触发器名 before|after 触发事件 on 表名 for each row 
begin
	执行语句
end;
```

MySQL中定义了NEW和OLD，用来表示触发器的所在表中，触发了触发器的那一行数据，来引用触发器中发生变化的记录内容

<img src="/mysql/MySQL.assets/image-20240315202237154-880.webp" srcset="/mysql/MySQL.assets/image-20240315202237154-880.webp 1x, /mysql/MySQL.assets/image-20240315202237154-1015.webp 2x" width="880" height="328" data-full-src="/mysql/MySQL.assets/image-20240315202237154.png" alt="image-20240315202237154" style="zoom:80%;"  loading="lazy" decoding="async" />

```mysql
create trigger tri after insert on user for each row
insert into user_logs values(Null,now(),concat('有新用户添加：',NEW.uid,NEW,username,NEW.password));

insert into user(4,'张三','123456');
```

注意：

- MySQL中触发器不能对本表进行操作，以免递归循环触发。
- 尽量少用触发器，会降低效率。
- 触发器是针对每一行的，对增删改非常频繁的表上不要使用触发器，会非常消耗资源。

# 索引

**概述**

MySQL 索引是一种数据结构，用于加快数据库查询的速度和性能。索引通过存储指向数据行的指针来实现，可以帮助数据库快速找到特定数据。

**类型**

MySQL 支持多种索引类型，包括：

- B+树索引: 最常用的索引类型，支持快速查找、范围查询和排序。
- 哈希索引**:** 支持快速查找，但仅适用于哈希值相同的行。
- 全文索引: 支持全文搜索，可用于搜索文本数据中的关键字。

**作用**

- 提高查询速度：索引可以帮助数据库快速找到特定数据，从而提高查询速度。
- 优化数据排序：索引可以用于优化数据排序，避免全表扫描。
- 提高数据更新效率：某些情况下，索引可以提高数据更新效率。

**操作**

- 创建：`CREATE INDEX index_name ON table_name (column_name);`
- 修改：`alter table tablename add index indexname(age);`
- 查看索引：`show index from 表名;`
- 删除：`drop index 索引名 on 表名;`   or   `alter table 表名 drop index 索引名;`

**分类**

<img src="/mysql/MySQL.assets/image-20240315203933192-865.webp" srcset="/mysql/MySQL.assets/image-20240315203933192-865.webp 1x" width="865" height="483" data-full-src="/mysql/MySQL.assets/image-20240315203933192.png" alt="image-20240315203933192" style="zoom:67%;"  loading="lazy" decoding="async" />

**具体**

[一文搞懂MySQL索引（清晰明了）-CSDN博客](https://blog.csdn.net/wangfeijiu/article/details/113409719)

**优缺点**

- 优点
  - 大大加快数据的查询速度。
  - 使用分组和排序进行数据查询时，可以显著减少查询时分组和排序的时间。
  - 创建唯一索引能够保证数据库表中每一行数据的唯一性。
  - 在实现数据的参考完整性方面，可以加速表和表之间的连接。
- 缺点
  - 创建和维护索引需要消耗时间，并且随着数据量的增加，时间也会增加。
  - 索引要占磁盘空间。
  - 对表中数据进行增删改时，索引也要动态维护，降低了维护速度。

**注意**

- 更新频繁的列不应设置索引
- 数据量小的表不要使用索引
- 重复数据多的字段不要使用索引
- 首先考虑对where和order by涉及的列建立索引

**MySQL使用B+树作为索引结构，主要有以下几个原因**：

1. 查询效率高

​	B+树是一种平衡多叉树，其特点是所有叶子节点的深度相同，且所有数据都存储在叶子节点中。这种结构使得B+树的查询效率非常高，通常只需要几次磁盘I/O操作就可以找到目标数据。

2. 插入和删除效率高

​	B+树的插入和删除操作都是在叶子节点进行的，且只需要对少量节点进行调整，因此效率非常高。

3. 支持范围查询

​	B+树的叶子节点之间通过指针连接，因此支持范围查询。例如，如果要查询所有年龄在18到30岁之间的用户，可以使用B+树的范围查询功能快速找到所有符合条件的数据。

4. 存储空间利用率高

​	B+树的每个节点都可以存储多个数据，因此存储空间利用率较高。

5. 易于实现

​	B+树的实现相对简单，易于维护。

# 存储引擎

默认innodb，支持事务、行级锁和外键约束

创建表时指定引擎：`create table tablename (id int,name varchar(20)) engine = MyISAM;`

# 事务

- 在MySQL中的事务是由存储引擎实现的，在MySQL中只有Innodb才支持事务。
- 事务处理可以用来维护数据库的完整性，保证成批的SQL语句要么全部执行，要么全部不执行。
- 事务用来管理DDL/DML/DCL操作，如insert，update，delete语句默认是自动提交的。

```mysql
START TRANSACTION;

UPDATE accounts
SET balance = balance - 100
WHERE account_id = 1;

UPDATE accounts
SET balance = balance + 100
WHERE account_id = 2;

-- 提交事务
COMMIT;
-- 回滚事务
rollback;
```

**特性**

- 原子性：事务是一个不可分割的整体，事务开始后的所有操作，要么全部完成，要么全部不完成。
- 一致性：系统从一个正确的状态，迁移到另一个正确的状态。
- 隔离性：每个事务的对象对其他事务的操作对象互相分离，事务提交前对其他事务不可见。
- 持久性：事务一旦提交，则其结果是永久性的。

**隔离级别**

- 读未提交：一个事务可以读取另一个未提交事务的数据，最低级别，会造成脏读。

- 读已提交：一个事务要等另一个事务提交后才能读取数据，会造成不可重复读。

- 可重复读：开始读取数据（事务开启）时，不再允许修改操作，可避免脏读、不可重复读，会造成幻读。

- 串行：最高的隔离级别，事务顺序执行，但效率第，比较消耗数据库性能。

  MySQL默认隔离级别是可重复读。

注：幻读和不可重复读有些类似，但是幻读强调的是集合的增减，而不是单条数据的更新。

# 锁

计算机协调多个进程或线程并发访问某一资源的机制（避免争抢），innodb只有在通过索引条件检索数据时使用行级锁，否则使用表锁。

分类：

- 从对数据操作的粒度分：
  - 表锁：操作时会锁定整个表。
  - 行锁：锁定当前行。
- 从对数据操作的类型分：
  - 读锁（共享锁）：针对同一份数据，多个读操作可以同时进行而不会互相影响。
  - 写锁（排它锁）：当前操作没有完成之前，会阻断其他写锁盒读锁。

innodb都支持

- 表级锁：开销小，加锁快，不会出现死锁；锁定粒度大，发生锁冲突的概率最高，并发度最低。
- 行级锁：开销大，加锁慢，会出现死锁；锁定粒度小，发生锁冲突的概率最低，并发度最高。

可以通过下列语句加共享锁或排它锁：

```mysql
select * from tablename where...lock in share mode;
select * from tablename where...for update;
```

乐观锁是对于数据冲突保持一种乐观态度，操作数据时不会对操作的数据进行加锁（这使得多个任务可以并行的对数据进行操作），只有到数据提交的时候才通过一种机制来验证数据是否存在冲突；；；悲观锁是基于一种悲观的态度类来防止一切数据冲突，它是以一种预防的姿态在修改数据之前把数据锁住，然后再对数据进行读写。

## MySQL死锁

MySQL死锁是指两个或多个事务相互等待对方释放锁资源，导致所有事务都无法继续执行的情况。

**原因**

MySQL死锁的发生通常是由于以下原因：

- 多个事务并发访问同一资源: 当多个事务同时访问同一资源时，就有可能发生死锁。
- 事务请求锁的顺序不一致: 如果两个事务请求锁的顺序不一致，也有可能发生死锁。

**解决方法**

可以采取以下措施来解决 MySQL 死锁：

- **设置事务超时时间:** 可以为每个事务设置一个超时时间，如果事务在超时时间内无法完成，则会被自动回滚，从而避免死锁。
- **避免嵌套事务:** 嵌套事务可能会增加死锁发生的概率，因此应尽量避免使用嵌套事务。
- **使用合理的锁粒度:** 使用较小的锁粒度可以减少死锁发生的概率。
- **优化数据库结构:** 可以通过优化数据库结构来减少锁竞争。

**MySQL 如何处理死锁**

MySQL 会定期检查是否存在死锁，如果发现死锁，则会选择其中一个事务进行回滚，以释放锁资源，让其他事务能够继续执行。

# 日志

（永久修改需要进到安装目录里修改my.ini文件）

- **错误日志:** 记录数据库启动、运行过程中出现的错误信息。
- **查询日志:** 记录所有执行过的SQL语句，包括SELECT、INSERT、UPDATE、DELETE等。
- **慢查询日志:** 记录执行时间超过指定阈值的查询语句。
- **二进制日志:** 记录数据库所有变更操作，用于主从复制。
- **事务日志:** 记录数据库事务的变更信息，用于数据库恢复。

查询日志（默认不开启）

开启：`set global general_log=1;`

慢查询日志（默认不开启）

开启：`slow_query_log_file=slow_query.log;`

# 优化

- 查询统计信息（_*7）

  ```mysql
  -- 查看当前回话SQL执行类型的统计信息
  show session status like 'Com_______';
  -- 查看全局（从上次启动至今）
  show global status like 'Com_______';
  -- 查看针对innodb引擎的统计信息
  show status like 'Innodb_rows_%';
  ```

- 定位低效率SQL

  慢日志

  ```mysql
  -- 查看慢日志配置信息
  show variables like '%slow_query_log%';
  -- 开启慢日志查询
  set global slow_query_log=1;
  -- 查看慢日志记录SQL的最低阈值时间，默认>=10秒算慢查询
  show variables like '%long_query_time%';
  -- 修改long_query_time的值
  set long_query_time = 5;
  ```

- 正在执行的SQL语句`show processlist`

  <img src="/mysql/MySQL.assets/image-20240315213843736-880.webp" srcset="/mysql/MySQL.assets/image-20240315213843736-880.webp 1x, /mysql/MySQL.assets/image-20240315213843736-1004.webp 2x" width="880" height="422" data-full-src="/mysql/MySQL.assets/image-20240315213843736.png" alt="image-20240315213843736" style="zoom:80%;"  loading="lazy" decoding="async" />

- 查询执行计划：explain 语句；

  <img src="/mysql/MySQL.assets/image-20240315213936875-880.webp" srcset="/mysql/MySQL.assets/image-20240315213936875-880.webp 1x, /mysql/MySQL.assets/image-20240315213936875-984.webp 2x" alt="image-20240315213936875" width="880" height="386" loading="lazy" decoding="async" data-full-src="/mysql/MySQL.assets/image-20240315213936875.png">

  id相同表示加载表的顺序是从上到下；id不同，id越大，优先级越高，越先执行

  <img src="/mysql/MySQL.assets/image-20240315214026112-880.webp" srcset="/mysql/MySQL.assets/image-20240315214026112-880.webp 1x, /mysql/MySQL.assets/image-20240315214026112-984.webp 2x" width="880" height="281" data-full-src="/mysql/MySQL.assets/image-20240315214026112.png" alt="image-20240315214026112" style="zoom:80%;"  loading="lazy" decoding="async" />

  <img src="/mysql/MySQL.assets/image-20240315214032473-880.webp" srcset="/mysql/MySQL.assets/image-20240315214032473-880.webp 1x, /mysql/MySQL.assets/image-20240315214032473-890.webp 2x" width="880" height="391" data-full-src="/mysql/MySQL.assets/image-20240315214032473.png" alt="image-20240315214032473" style="zoom:80%;"  loading="lazy" decoding="async" />

  <img src="/mysql/MySQL.assets/image-20240315214111151-880.webp" srcset="/mysql/MySQL.assets/image-20240315214111151-880.webp 1x, /mysql/MySQL.assets/image-20240315214111151-951.webp 2x" width="880" height="185" data-full-src="/mysql/MySQL.assets/image-20240315214111151.png" alt="image-20240315214111151" style="zoom:80%;"  loading="lazy" decoding="async" />

- 索引优化（避免索引失效）

  以下是一些常见的索引失效场景:

  - **查询条件不包含索引列:** 如果查询条件不包含索引列，则无法使用索引进行查询，导致全表扫描。
  - **索引列上进行运算:** 如果在索引列上进行运算，例如加减乘除、函数运算等，则会导致索引失效。
  - **使用不等于、like等条件:** 如果查询条件使用不等于、like等条件，则会导致索引失效。
  - **使用or连接条件:** 如果查询条件使用or连接条件，则会导致索引失效。
  - **数据类型不匹配:** 如果查询条件中的数据类型与索引列的数据类型不匹配，则会导致索引失效。

  为了避免索引失效，可以采取以下措施:

  - **合理设计索引:** 根据查询需求合理设计索引，尽量使用覆盖索引。
  - **避免在索引列上进行运算:** 尽量避免在索引列上进行运算，如果需要进行运算，可以考虑使用函数索引。
  - **使用等值、in、between等条件:** 尽量使用等值、in、between等条件进行查询，避免使用不等于、like等条件。
  - **避免使用or连接条件:** 尽量避免使用or连接条件，如果需要使用or连接条件，可以考虑使用索引合并。
  - **确保数据类型匹配:** 确保查询条件中的数据类型与索引列的数据类型匹配。
