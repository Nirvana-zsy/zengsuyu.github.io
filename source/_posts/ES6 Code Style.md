---
title: ES6编程风格&最佳实践
categories:
    - 10技术 | 前端 # 一级分类
tags:
    - ES
date: 2019-11-06
description: 遵守一定的规范和统一的风格写代码，是程序猿的基本素养😺
toc: 1
top: 0
---

## 块级作用域
- `let`完全取代`var`
- let和const**优先const**:
  - 函数式编程思想，运算不改变值，只是新建值
  - 防止了无意间修改变量值所导致的错误
  - 有利于将来的分布式运算
  - JavaScript 编译器会对const进行优化，所以多使用const，有利于提高程序的运行效率

## 字符串
- 静态一律用单引号/反引号
- 动态使用反引号
- **不使用双引号**

## 解构赋值
- 从数组取值给变量时，优先用**数组解构**
- 函数参数是对象属性，优先用**对象解构**
- 函数有多个返回值时，优先用**对象解构**

## 对象
- 单行定义的对象，最后一个成员不以逗号结尾；多行定义的对象，最后一个成员要以逗号结尾
- 对象尽量静态化，一旦定义就不要随意添加属性。非要加，就用 **Object.assign** 方法
- 对象有动态属性名：用属性名表达式 **[表达式]** 
- 对象的属性和方法，尽量用**简洁表达式**，易于书写和描述

## 数组
- 拷贝数组：用 **...** 扩展运算符
- 类数组对象转数组：用**Array.from**方法

## 函数
- 立即执行函数：用箭头函数
- 匿名函数：用箭头函数
- 简单的、单行的、不会复用的函数：用箭头函数
- 用箭头函数取代**Function.prototype.bind**
- 不再用 `_this/that/self/sf`去绑定this
- 不在函数体内用 **arguments**变量，用**rest运算符**`...`代替
- 用**默认值语法**设置函数参数

## Map和Object
- 只有模拟现实世界的对象时，采用`Object`
- 只需要`key:value`数据结构时，就用`Map`

## Class和prototype
- 尽量用Class取代需要prototype的操作，更易书写和便于理解
- 用`extends`实现继承，更简单，不会使instanceof运算有风险

## Module
- Module语法使ES的标准写法
- 用import代替require
- 用export代替module.exports
- 如果模块只有一个输出值，就用default,否则别用
- export default和export不要混合使用
- 模块输出的函数，函数名首字母应该用小写

## 使用ESLint
- 安装 ESLint
- 安装 Airbnb 等语法规则，以及 import、a11y、react 等插件
- 在项目的根目录下新建一个`.eslintrc`文件，配置 ESLint
