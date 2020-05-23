---
title: 函数式编程
categories:
    - 06 JavaScript # 一级分类
tags:
date: 2020-05-08
description: 改变引发错误，最小化改变
toc: 1
top: 0
---

## 函数式编程

- 函数式编程是一种解决方案简单，功能独立，对作用域外没有任何副作用的**编程范式**。
- `INPUT -> PROCESS -> OUTPUT`
- 函数式编程是一种基于函数计算的软件开发方法。
- 像数学一样，函数在编程中通过输入产生输出。
- 可以通过多种方式组合基本功能来构建越来越复杂的程序。
- 函数式编程式将程序分成小的、可测试的部分

## 函数式编程原则

### 功能独立,显式声明依赖关系

不依赖程序状态或全局变量，**只依赖于传递给它们的参数进行计算**

如果函数依赖于一个变量或对象，那么将该变量或对象作为参数直接传递到函数中。

1. 不要更改变量或对象——创建新变量和对象，并在需要时从函数返回它们。
2. 声明函数参数——**函数内的任何计算仅取决于参数，而不取决于任何全局对象或变量**。

### 有限的副作用

可以严格地限制函数外部对状态的更改导致的状态变化

在变量，数组或对象上调用一个函数，这个函数可能会改变对象中的变量或其他东西。
函数式编程的核心原则之一是不改变任何东西，**变化会导致错误**。
如果一个函数不改变传入的参数、全局变量等数据，那么它造成问题的可能性就会小很多。

在函数式编程中，改变或变更叫做**mutation**

这种改变的结果叫做“副作用”（**side effect**

理想情况下，函数应该是不会产生任何副作用的纯函数（**pure function**

### 纯函数

同一个输入永远能得到同一个输出

### 限制更改程序状态

避免更改保存数据的全局对象

## 不改变原数组的 数组方法：

### concat 连接数组

### slice 提取数组一部分（代替splice从数组删除元素

### map 迭代数组返回新数组（callback return 新元素

### filter 迭代数组返回新数组（callback return true/false

### reduce 是 JavaScript 所有数组操作中最通用的方法。

几乎可以用reduce方法解决所有数组处理问题。
filter和map方法不支持对数组中两个不同元素的交互。举个例子，如果你想把数组中的元素拿来比较或者相加，用filter和map是做不到的。
reduce方法允许更通用的数组处理方式，而且filter和map方法都可以当作是reduce的特殊实现。
reduce(acc，cur，idx，arr)

### sort排序 会改变原数组：利用concat([])返回新数组排序

```jsx
var globalArray = [5, 6, 3, 2, 9];
function nonMutatingSort(arr) {
  return arr.concat([]).sort((a,b)=>a-b)
}
nonMutatingSort(globalArray);
```

### every方法，检查数组每个元素都通过检验，返回boolean

### some方法，检查数组有元素通过检验，返回boolean

## 不改变String的方法:

### split

### toUpperCase

### trim

### +-运算

## 函数柯里化

arity是函数所需的形参的数量。函数Currying意思是把接受多个arity的函数变换成接受单一arity的函数。

重构函数让它接收一个参数，然后返回接收下一个参数的函数，依此类推。

```jsx
//Un-curried function
function unCurried(x, y) {
  return x + y;
}

// 柯里化函数
function curried(x) {
  return function(y) {
    return x + y;
  }
}
curried(1)(2) // 返回 3
```

柯里化在不能一次为函数提供所有参数情况下很有用。因为它可以将每个函数的调用保存到一个变量中，该变量将保存返回的函数引用，该引用在下一个参数可用时接受该参数。下面是使用curried函数的例子：

```jsx
// Call a curried function in parts:
var funcForY = curried(1);
console.log(funcForY(2)); // 打印 3
```

**partial application**的意思是一次对一个函数应用几个参数，然后返回另一个应用更多参数的函数。

```jsx
//Impartial function
function impartial(x, y, z) {
  return x + y + z;
}
var partialFn = impartial.bind(this, 1, 2);
partialFn(10); // 返回 13
```