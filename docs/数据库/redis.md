---
title: Redis
date: 2026-09-06 08:00:00
categories:
  - 数据库
tags:
  - Redis
  - NoSQL
  - 缓存
coverImg: /covers/redis.webp
permalink: /database/uul53
---

# 基础

- 远程字典服务，支持网络，基于内存，可选持久性的键值对存储数据库，是 NoSql 数据库。

- Redis 提供的数据类型主要分为5种自有类型和1种自定义类型，这5种自有类型包括：String类型、哈希类型、列表类型、集合类型、顺序集合类型

```
redis={
"name":"xiao",
"age":"23",
"scores":[98,98,79,],
"info":{"gender":"male","tel":"110"},
"set":{1,2,3},
"zset":{1,2,3,}
}
```

- Redis的应用场景包括：

  - 缓存系统（“热点”数据：高频读、低频写）：缓存用户信息，优惠过期时间、验证码过期时间、session、token等
  - 计数器：帖子的浏览量，视频播放次数，评论次数，点赞次数等
  - 消息队列，秒杀系统
  - 社交网络：粉丝、共同好友，兴趣爱好
  - 排行榜（有序集合）
  - 发布订阅，粉丝关注，消息通知

- Redis的配置文件中，默认有0~15之间16个数据库，默认操作的就是0号数据库

  `select <数据库ID>`：切换数据库

# 5个基本数据类型

## 字符串

`set key value`：设置键、值，不用引号，自动识别为字符串

`setnx key value`：一个键设一次值，用处：分布式锁

`setex key time value`：设置有效时间（秒），用处：优惠券、验证码

`get key`查询键值

`mset key1 value1 key2 value2...`/`mget key1 key2...`批量设置和查询

`append key value`：追加（单个数据上限512M）

`incr（decr） key`：自增自减（前提value是数字字符串）

`strlen key`：获取字符串长度

比特流操作<img src="/redis/redis.assets/image-20240212170044959.png" alt="image-20240212170044959"  />

例：a→97→01100001比特操作变为01100010→98→b。用处：签到系统

## 列表

子成员类型为String

- 添加成员

  `lpush key value1 value2...`在左侧（前）添加一条或多条数据

  `rpush key value1 value2...`在右侧（后）添加一条或多条数据

  `linsert key before 指定元素 value`在指定元素的左边（前）插入一个数据

  `linsert key after 指定元素 value`在指定元素的右边（后）插入一个数据

- 移除并获取成员

  `lpop key`第一个成员出列

  `rpop key`最后一个成员出列

  `lrem key count value`，count表示删除数量，value表示要删除的成员。该命令默认将列表从左侧前count个value的元素移除

  - count==0，删除所有值为value的成员
  - count > 0，删除从左侧开始的前count个value成员
  - count < 0，删除从右侧开始的前count个value成员

`lindex key index`:索引查值

`lset key Index value`：按索引修改值

`lrange key start stop`：切片（两端都闭）

`llen key`：列表长度

## 哈希

```
key:{
field1: value1,
field2: value2,
field3: value3,
}
```

`hset key field value`：设置值(可多个)

获取值：

- `hget key field`，获取单个值
- `hgetall key`，获取所有值
- `hmget key field1 field2`，获取多个值

`hdel key field`：删除

`hexist key field`：是否存在

`hkeys/hvals`：所有键/值

## 集合

去重无序

`sadd key member1 member2...`：添加

`smembers key`：查看所有元素

`scard keys`：个数

`spop key [count=1]`：随机抽取并删除

`srem key member...`：删除指定元素

集合运算：

- 交集：`sinter key1 key2`
- 并集：`sunion key1 key2`
- 差集：`sdiff key1 key2`，（这个与顺序有关）

## 有序集合

有序集合（score/value）去重并根据score的权重从小到大排序

`zadd key score1 member1 scoore2 member2...`：添加成员

获取指定区间的值：

- `zrangebyscore key min max`：按score进行从低往高排序获取指定score区间
- `zrevrangebyscore key max min`：按score进行从高往低排序获取指定score区间
- `zrange key start stop`：按score进行从低往高排序获取指定索引区间
- `zrevrange key start stop`：按score进行从高往低排序获取指定索引区间

`zrange key`：从低到高全部成员

`zcard key`：集合长度

`zscore key member`：查看权重

`zrank key member`：某成员从小到大的排名

`zrevrank key member`：某成员从大到小的排名

`zcount key min max`：获取score在指定区间的成员数量

`zincrby key increament member`：增加权重

`zpopmin key [count]`：删除指定数量的成员，从最低score开始删

`zpopmax key [count]`：删除指定数量的成员，从最高score开始删

## key操作

查看：

- `keys *a*`：查看名称中包含a的键
- `keys a*`：查看以a开头的键
- `keys *a`：查看以a结尾的键

`keys *`：所有键

`exist key`：是否存在

`type key`：键值类型

`del key1 key2...`：删除键

`flushall`：清除键

`ttl key`：查看键有效期<img src="/redis/redis.assets/image-20240212174053224.png" alt="image-20240212174053224" style="zoom:80%;" />

`expire key time`：设置有效期

`rename oldkey newkey`：重命名

# python操作

## 连接Redis

```py
import redis
# 方式一
r = redis.Redis(host='127.0.0.1', port = 6379)
r.set("name", "xml")

# 方式二 连接池 推荐
pool = redis.ConnectionPool(host='127.0.0.1', port=6379, db=0)
r = redis.Redis(connection_pool=pool)
r.set("age", 21)
```

什么使用连接池？
	首先Redis也是一种数据库，它基于C/S模式，因此如果需要使用必须建立连接，C/S模式本身就是一种远程通信的交互模式，因此Redis服务器可以单独作为一个数据库服务器来独立存在。假设Redis服务器与客户端分处在异地，虽然基于内存的Redis数据库有着超高的性能，但是底层的网络通信却占用了一次数据请求的大量时间，因为<u>每次数据交互都需要先建立连接</u>，假设一次数据交互总共用时30ms，超高性能的Redis数据库处理数据所花的时间可能不到1ms，也即是说前期的连接占用了29ms，**连接池则可以实现在客户端建立多个链接并且不释放**，当需要使用连接的时候通过一定的算法获取已经建立的连接，使用完了以后则还给连接池，这就免去了数据库连接所占用的时间。

## 操作

### 字符串

```py
# 不允许对已经存在的键设置值
ret = r.setnx("name", "xiao")  
print(ret)  # False
# 设置键有效期
r.setex("score", 10, 2)
# 自增自减
r.set("age", 2)
r.incrby("age", 100)
print(r.get("age"))  # b'102'
```

### 哈希

```py
# 设置 hash
r.hset("info", "name", "xiao")
print(r.hget("info", "name"))  # b'xiao'
# 设置多个
r.hset("info", "gender", "male", {"age": 3, "hobby": "shit"})
print(r.hgetall("info"))  # {b'name': b'xiao', b'gender': b'male', b'age': b'3', b'hobby': b'shit'}
```

### 列表

```py
# 设置list
r.rpush("fen", 100, 90, 88)
r.rpush("fen", 70)
r.lpush("fen", 60)
print(r.lrange("fen", 0, -1))  # [b'60', b'100', b'90', b'88', b'70']
# 中间插入
r.linsert("fen", "after", "100", "-1")
print(r.lrange("fen", 0, -1))  # [b'60', b'100', b'-1', b'90', b'88', b'70']
r.linsert("fen", "before", "100", "-2")
print(r.lrange("fen", 0, -1))  # [b'60', b'-2', b'100', b'-1', b'90', b'88', b'70']
# 删除取值
print(r.lpop("fen"))  # b'60'
print(r.rpop("fen"))  # b'70'
print(r.lrange("fen", 0, -1))  # [b'-2', b'100', b'-1', b'90', b'88']
# 索引取值
print(r.lindex("fen", 0))  # b'-2'
```

### 集合

```py
# 集合添加元素
r.sadd("name_l", 'xml', 'zjy', 'pym')
print(r.smembers("name_l"))  # {b'pym', b'xml', b'zjy'}
# 从集合中随机取num个数
print(r.srandmember("name_l", 2))  # [b'xml', b'pym']
# 删除集合中的元素
r.srem("name_l", "xml")
```

### 有序集合

```py
# 在有序集合中添加元素
r.zadd("score_l", {"zjy": 80, "xml": 90, "pym": 70})
# 打印出score_l有序集合中的所有元素
print(r.zrange("score_l", 0, -1))  # [b'pym', b'zjy', b'xml']
# 打印出score_l有序集合中的所有元素及其分数
print(r.zrange("score_l", 0, -1, withscores=True))  # [(b'pym', 70.0), (b'zjy', 80.0), (b'xml', 90.0)]
print(r.zrevrange("score_l", 0, -1, withscores=True))  # [(b'xml', 90.0), (b'zjy', 80.0), (b'pym', 70.0)]
# 删除有序集合中的元素
print(r.zrem("score_l", "zjy"))  # 1
```

### key操作

```py
r.delete("fen")
print(r.exists("fen"))  # 0
print(r.keys("*"))  # [b'score', b'score_l', b'name', b'name_l', b'info', b'age']
r.expire("name", 10)
```







