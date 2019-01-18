---
title: Devtools老司机养成-第四篇-Sources
categories:
    - Devtools老司机养成系列文章 # 一级分类
tags:
    - Devtools
date: 2019-01-27
description: 上一篇，熟悉了Devtools的灵魂人物-Console面板。今天这一篇，一起来发掘Sources面板的全部潜能
toc: 1
---

# Sources 源代码面板

在源代码面板中可以设置**断点**来调试 JavaScript ，比 console.log()调试更快速高效

也可以通过 Workspaces（工作区）连接本地文件来使用开发者工具的**实时编辑器**

![0](../images/devtools/200.png)

## 断点类型&如何添加

1. 行断点：代码运行到当前行之前暂停执行
    ```
    在源代码添加debugger关键字
    或者
    点击Sources面板中的源代码的行号
    ```
2. 条件行断点：当满足条件时才会出发该断点
    ```
    右击Sources面板中的源代码的行号
    选择“Add conditional breakpoint”
    ```
    ![0](../images/devtools/201.GIF)
3. DOM 断点
    ```
    即Elements面板提及过的三种DOM断点：
    - 节点属性断点
    - 节点删除断点
    - 子树变更断点
    ```
    ![0](../images/devtools/202.GIF)
4. XHR/Fetch 断点
    ```
    在页面发出XHR或Fetch请求前加断点
    ```
    ![0](../images/devtools/203.GIF)
5. Event Listener 事件监听断点
    ```
    可以在所有类型的事件函数被出发前加断点
    ```
    ![0](../images/devtools/204.png)
6. Exception 异常断点

    ![0](../images/devtools/205.png)

7. Function 函数断点

    ```
    把想加断点的函数名作为参数，调用debug()函数，既可以在每次执行该函数前暂停执行代码
    ```

    ![0](../images/devtools/206.gif)

## 单步调试

-   函数调用堆栈

![0](../images/devtools/209.png)

-   全局变量 Global 局部变量 Local 闭包 Closure

![0](../images/devtools/210.png)

-   step over next function
-   step into next function
-   step out current function

![0](../images/devtools/207.png)

-   long resume

![0](../images/devtools/211.png)

-   Continue to here：继续执行至此行

![0](../images/devtools/207.gif)

-   Restart Frame：重新执行函数调用堆栈中的某一帧

![0](../images/devtools/208.gif)

## BlackBox

-   BlackBox 的用途：

    “BlackBox Script”可以在调试中忽略某些脚本(此处的 BlackBox 为动词)，在 Call Stack 堆栈中会将其隐藏，单步调试时也不会步入脚本中的任何函数

    ```
    function animate() {
    prepare();
    lib.doFancyStuff(); // A
    render();
    }
    ```

    例如以上代码的 A 行，调用的是第三方库的 doFancyStuff 函数

    如果我确认该第三方库没有 bug

    就可以 BlackBox 整个第三方库的 js 脚本，在调试中跳过这些代码的执行

-   三种添加 BlackBox 的方法：

1. 在源代码窗格右键，选择"BlackBox Script"
   ![0](../images/devtools/212.gif)

2. 在 Call Stack 中右键某一帧，选择"BlackBox Script"
   ![0](../images/devtools/211.gif)

3. 在设置中的 Blackboxing 面板添加**正则表达式**匹配**文件名**

    ![0](../images/devtools/213.gif)

# 相关

-   本文作者：ScarSu
-   本文原文链接：xxx
-   本文基于最新版 chrome 浏览器总结,大多数特性也适用于其他主流浏览器
-   本文目的：新手入门 & 给已经了解 Devtools 的人建立完善的知识结构
-   参考 1：官方文档 https://developers.google.com/web/tools/chrome-devtools/
-   参考 2：来自作者 Tomek Sułkowski 在 medium 的系列文章 https://medium.com/@tomsu
