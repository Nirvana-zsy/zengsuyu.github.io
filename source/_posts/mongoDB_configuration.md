---
title: MongoDB配置
categories:
    - 10 DataBase
tags:
date: 2018-03-06
description: MongoDB被我选来做毕设的数据库，在此记录配置过程。
toc: 1
top: 0
---

## 官网下载安装

    （我版本3.0.15
    [官网下载地址](https://www.mongodb.com/download-center?jmp=nav)

## 安装路径

    将C:\Program Files\MongoDB\Server\3.0\bin(windows下的默认路径)添加到环境变量
    即可在任何位置使用
    mongo   使用数据库
    mongod  开机
    mongoimport  导入数据

## 新建

    C:\data\db路径作为数据库

## 开机 cmd 命令：

    mongod --dbpath c:\data\db
    （保持该cmd窗口才能正常运行mongodb）
    （其他数据操作另外开cmd）
    --dbpath是选择数据库文档所在文件夹
    即，mongodb中数据库有物理文件

## use

    use 数据库名字
    使用一个数据库
    如果想新建数据库，也是use。use一个不存在的，就是新建。

## 查看当前所在数据库

    db

## 插入数据

    数据库中不能直接插入数据，
    只能往集合(collections)中插入数据
    db.userid.insert({"id":"zengsuyu","password":"123456789"});
    此处的userid就是集合

## 删除当前所在的数据库

    db.dropDatabase();

## 导入外部 json 数据

    用sublime在外部写好json数据库的形式，然后导入数据库：
    -db 数据库名（选择数据库
    --collection 集合名（ 选择集合
    --drop （把集合清空
    --file json文件名（选择要导入的json文件

## 查找数据:

    db.集合名.find() （列出所有数据
    db.集合名.find({"key":"value"})  (精确匹配key为value值的数据
    db.集合名.find().sort("")  （升降排序

## mongoose

    不用直接操作数据库，操作对象，对象自动持久

-   连接 Mongo 数据库

```
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/geekChat');//；连接数据库
```

-   监听 open 事件

```
db.once('open', function (callback) {
    console.log("数据库成功连接");
});
```

-   创建类

```
//创建了一个模型。猫的模型。所有的猫，都有名字，是字符串。“类”。
var Cat = mongoose.model('Cat', { name: String });
//实例化一只猫
var kitty = new Cat({ name: 'Zildjian' });
//调用这只猫的save方法，保存这只猫
kitty.save(function (err) {
  console.log('喵喵喵');
});
```

-   创建模型

```
var Schema = mongoose.Schema;
var userScheMa = new Schema({
    name: String,
    password: String
}); //  定义了一个新的模型，但是此模式还未和users集合有关联
exports.user = db.model('user', userScheMa); //  与users集合关联

ref 数据表关联
```

---

    这次不皮了
