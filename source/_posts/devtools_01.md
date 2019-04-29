---
title: Devtools老司机养成-第一篇-介绍
categories:
    - Devtools老司机养成系列文章 # 一级分类
tags:
    - Devtools
date: 2019-01-06
description: 为了提高前端Debug效率，最近补全了Devtools的知识，决定把笔记分享出来，今天第一篇，介绍一下这次分享的相关计划和内容。
toc: 1
---

# Devtools 老司机养成-第一篇-介绍

## 相关

-   本文作者：ScarSu
-   [全系列文链接](https://www.scarsu.com/categories/devtools%E8%80%81%E5%8F%B8%E6%9C%BA%E5%85%BB%E6%88%90%E7%B3%BB%E5%88%97%E6%96%87%E7%AB%A0/)
-   本文基于 chrome 浏览器版本 73.0.3683.103（正式版本）总结
-   本文目的：建立完善的知识结构关于【devtools 能做什么】，至于怎么做，请查阅官方文档
-   参考 1：[google developers 官方文档](https://developers.google.com/web/tools/chrome-devtools/)
-   参考 2：来自作者 Jon Kuoerman 在 FrontEndMaster 的 [Mastering Chrome Developer Tools v2 课程](https://frontendmasters.com/courses/chrome-dev-tools-v2)
-   参考 3：来自 作者 Tomek Sułkowski 在 medium 的[系列文章](https://medium.com/@tomsu)
-   [脑图.xmind]()
-   [脑图.png](https://i.loli.net/2019/04/19/5cb95639a9f73.png)

## 系列文章目录

-   [Elements 元素面板]()
-   [Console 控制台面板]()
-   [Sources 源代码面板]()
-   [Network]()
-   [Device Mode 响应式调试]()
-   [Performance]()
-   [Application]()
-   [Memory]()
-   [Security]()
-   [Audits]()
-   [Javascript Profiler]()
-   [Animations 动画调试]()
-   [Changes]()
-   [Layers]()
-   [Network conditions]()
-   [Performance monitor]()
-   [Quick Source]()
-   [Remote devices]()
-   [Rendering 渲染]()
-   [Request blocking]()
-   [Sensors]()
-   [Settings]()
-   [常用快捷键 & Tips]()

## Chrome Devtools 简介

### web devtool 历史

-   view-source alert
-   live dom viewer
-   firebug

### 界面概览

![000devtoolsAll.png](https://i.loli.net/2019/04/19/5cb955bed88ce.png)

### Tips and tricks

-   快捷键：ctrl shift p：执行命令
-   快捷键：ctrl p：打开文件
-   快捷键：esc：显示/隐藏 drawer(第二行面板
-   快捷键：ctrl shift c：选择元素
-   more -> focus debugee：切换至正在被调试的页面
-   more -> more tools：全部面板
-   实验性功能：

```
    打开url     chrome://flags/
    搜索dev
    打开Experimental Extension APIs开关
    在settings中找到experiments可以找到相关实验性功能
    shift按七次，显示隐藏的实验性功能（比如terminal
```

<small>注：每更新一部分，会添加相应的文章连接，如果链接点不开，说明还没更新</small>
