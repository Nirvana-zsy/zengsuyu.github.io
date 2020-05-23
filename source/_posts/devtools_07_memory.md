---
title: Devtools 老司机养成 - 第七篇- Memory 内存
categories:
    - 02 Debug|Devtools进阶系列 # 一级分类
tags:
date: 2020-04-05
description: 你开的网页会卡吗？来Memory面板了解一下内存分析&内存泄漏
toc: 1
top: 0
---

## 内存 && 内存泄露

内存占用：

1. allocate 分配内存(eg 声明变量
2. 使用内存
3. release 释放内存

内存泄漏：

-   `内存泄露-Memory Leak`：内存被占用后无法被 release，且无法被垃圾回收器回收
-   内存泄漏会引起性能问题，且时间越久越严重，因为被占用且无法回收的内存只会增加不会减少
-   `垃圾回收-Garbage Collect-GC`：浏览器收回内存。 浏览器决定何时进行垃圾回收。 回收期间，所有脚本执行都将暂停。因此，如果浏览器经常进行垃圾回收，脚本执行就会被频繁暂停

## 造成内存泄露常见原因

-   `fogotten timer`被遗忘的计时器：例如调用 setInterval()方法一定要加结束条件
-   `Dettached HTMLElement`分离的 dom 节点：在 dom 被移除后，dom 变量仍然存在

## 内存监控 1-Task manager 任务管理器

-   chorme 浏览器 -> task manager 任务管理器工具中，可以监控每个 tab 页的 js 内存占用大小

![](https://i.loli.net/2019/05/07/5cd194ba3a655.png)

-   `Memory` 列表示原生内存。DOM 节点存储在原生内存中。 如果此值正在增大，则说明正在创建 DOM 节点。
-   `JavaScript Memory`列表示 JS 堆。此列包含两个值。 实际大小表示页面上的对象正在使用的内存量。 如果此数字在增大，要么是正在创建新对象，要么是现有对象正在增长。

## 内存监控 2-Devtools Performance 面板

-   在`Performance`面板记录性能时，勾选`memory`即可在分析结果中看到 memory 占用情况

![](https://i.loli.net/2019/05/05/5ccee6f4b968d.png)

```js
//示例1:正常的内存占用与GC

var x = [];

function grow() {
    for (var i = 0; i < 10000; i++) {
        document.body.appendChild(document.createElement("div"));
    }
    x.push(new Array(1000000).join("x"));
}

setInterval(grow, 100);
```

![](https://i.loli.net/2019/05/07/5cd19db41fbbc.png)

```js
//示例2:不可被GC的内存泄漏

function grow() {
    // for (var i = 0; i < 10000; i++) {
    //     document.body.appendChild(document.createElement("div"));
    // }
    // x.push(new Array(1000000).join("x"));
    var ul = document.createElement("ul");
    for (var i = 0; i < 10; i++) {
        var li = document.createElement("li");
        ul.appendChild(li);
    }
    detachedTree = ul;
}

setInterval(grow, 1000);
```

![](https://i.loli.net/2019/05/07/5cd1a62aa1bfd.png)

## 内存监控 3-Devtools Memory 面板

![](https://i.loli.net/2019/05/07/5cd18fa5d8489.png)

-   如上图所示，在右侧三种内存分析模式选择一种后，即可点击左上角`record`开始记录内存

1.  `Heap snapshot`堆快照，记录当前时间点内存中页面 js 对象和 dom 节点的分配情况
2.  `Allocation instrumentation on timeline`按时间轴记录内存，可以选记录内存分配调用栈(可以帮助定位到具体分配内存的源码)
3.  `Allocation sampling`使用抽样方法记录内存分配。具有最小的性能开销，可用于长时间运行的操作。提供了由 JavaScript 执行堆栈细分的良好近似分配。

-   左上角的垃圾桶图标`Collect garbage`是强制执行一次垃圾回收，内存监控的最佳实践是在监控内存前执行一次强制垃圾回收

-   利用上述示例 2 代码，执行时间线 Memory 分析：

![](https://i.loli.net/2019/05/07/5cd1a7db0cfe0.png)

## 扩展

-   [内存相关术语](https://developers.google.com/web/tools/chrome-devtools/memory-problems/memory-101)
-   [深入内存分析](https://developers.google.com/web/tools/chrome-devtools/memory-problems/heap-snapshots)
