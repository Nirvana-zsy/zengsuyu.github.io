---
title: Devtools 老司机养成 - 第二篇-Elements 面板
categories:
    - 10技术 | 前端Debug老司机 # 一级分类
tags:
date: 2020-03-01
description: 样式顺手调，DOM实时改～
toc: 1
top: 0
---

## 界面概览

使用 Chrome DevTools 的 Elements 面板检查和实时编辑页面的 HTML 与 CSS

![Elements 面板](https://i.loli.net/2019/07/29/5d3e521d6fbde79541.png)

## Inspect Mode

快捷键 ctrl shift c/点击面板左上角的按钮，进入元素选择模式
![inspect](https://i.loli.net/2019/04/19/5cb9cb351d6a2.png)

在新版本 chrome 中，选择元素时会显示更多元素信息
![inspect](https://i.loli.net/2019/04/19/5cb9ca97739bb.png)

## Device Mode 设备模式

-   模拟不同尺寸移动端设备下，网页的表现。
-   是自适应网页调试利器。
-   内置/可配置既有设备属性，例如 iphone/ipad
-   支持调试媒体查询 media-query。

![deviceMode](https://i.loli.net/2019/04/19/5cb9cc03d400a.png)

## DOM 树

在元素面板左侧是当前页的 DOM 树
![0](https://i.loli.net/2019/07/29/5d3e52339265738563.png)

在 DOM 树中你可以：

-   直接增/删/改/复制/拖放移动 DOM 元素，查看实时效果(非持久化)
-   添加元素断点(节点移除断点，属性变更断点，子树变更断点)
-   模拟元素 focus/hover/actice 等状态
-   选中元素后通过右键“Scroll into view”突出显示当前元素在页面的位置
-   按快捷键**h**来快速隐藏/显示元素当前元素及其后代元素(原理是 visibility 设为 hidden,不影响其他元素,不引起重绘)
-   按住 alt 键 点击 dom 元素前的箭头：全部折叠/展开当前元素及其后代元素

    ![0](https://i.loli.net/2019/07/29/5d3e52c51ed0570682.png)

## Styles

在面板右侧 Styles 窗格中：

-   会显示节点的各级样式
-   每级样式的来源
-   每条样式属性是否命中
-   可以直接增/删/改元素样式，查看实时效果(非持久化)

![0](https://i.loli.net/2019/07/29/5d3e524d5a48a76988.png)

## color picker

![](https://i.loli.net/2019/05/13/5cd95d7a5c09c98927.png)

-   在样式窗格中，devtools 给所有颜色属性值前添加了 color picker 工具
-   按住 shift 点击色块，快速切换颜色格式 rgb/hsl/hex

![](https://i.loli.net/2019/05/13/5cd95e1abea2793787.png)

-   page colors：color picker 中会列出页面所有的颜色
-   material colors：color picker 中会列出 google 设计推荐色系

## Computed

在 Styles 右侧的 Computed 窗格中可以查看：

-   元素的盒模型(双击值可编辑)
-   元素所有样式的**计算后最终值**(即最终实际应用到元素的值)
-   点开每一条最终值，可以看到所有该条样式的规则，以及代码来源
-   勾选**show all**选项，会同时列出元素**继承 / 默认**样式

![0](https://i.loli.net/2019/07/29/5d3e525f4f2a311954.png)

## Event Listeners

-   在 Event Listeners 窗格中，可以看到元素的事件监听器
-   例如"load","DOMContentLoaded","click"等，以及每个事件对应的事件处理函数

![0](https://i.loli.net/2019/07/29/5d3e52728065d88131.png)

在源代码中加 **行 debugger 断点**，或者**debug(函数)断点**(Sources 面板会提及这两种断点)，是需要代码维护成本的，有时候还会忘记删除；

或者你想调试别人开发的 你不拥有源码的 网页；

这些时候可以利用 Event Listeners 窗格快速定位当前元素被绑定的所有的**事件函数代码**并调试。

## DOM Breakpoints

在面板右侧 DOM Breakpoints 中，可以查看**元素断点**

![0](https://i.loli.net/2019/07/29/5d3e5282c491d43866.png)

相应的在左侧 DOM 树右键点击元素，可以给元素添加断点

元素断点有三种类型：属性变更，子树变更，节点删除

例如添加“node removal”断点，就会在 有代码移除当前节点时，在当前行代码执行前暂停执行，并自动转换到 Sources 面板，以便做进一步调试
![0](https://i.loli.net/2019/07/29/5d3e529117f6c69468.png)

## Properties

Properties 面板会列出元素 DOM 底层相关属性
![0](https://i.loli.net/2019/07/29/5d3e52b143cc424671.png)

## Accessibility(可访问性)

-   在辅助功能树中查看元素的位置(可访问性树/无障碍树是 DOM 树的子集。它只包含来自 DOM 树的元素，这些元素可以展示在屏幕阅读器中页面的内容。
-   查看元素的 ARIA 属性(ARIA 属性确保屏幕阅读器具有所需的所有信息，以便正确表示页面的内容。
-   查看元素的计算辅助功能属性(某些辅助功能属性由浏览器动态计算。可以在“ 辅助功能”窗格的“ 计算属性”部分中查看这些属性

![accessibility.png](https://i.loli.net/2019/04/21/5cbc83e1561e4.png)
