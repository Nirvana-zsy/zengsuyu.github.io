---
title: Devtools 老司机养成 - 第一篇Devtools介绍
categories:
    - 08 调试Devtools进阶系列 # 一级分类
tags:
date: 2020-02-23
description: 前端开发调试第一利器，关于devtools的信息，都在这里
toc: 1
top: 0
---

## 相关

-   本文作者：[ScarSu](www.scarsu.com)
-   本文基于 chrome 浏览器版本 73.0.3683.103（正式版本）总结
-   本文目的：关于【devtools 能做什么】建立完善的知识结构，至于怎么做，请查阅官方文档；工具类知识需要实践，建议阅读本文时打开 [sample](https://masteringdevtools.com/)和 devtools 操作一遍
-   参考 1：[google developers 官方文档](https://developers.google.com/web/tools/chrome-devtools/)
-   参考 2：来自作者 Jon Kuoerman 在 FrontEndMaster 的 [Mastering Chrome Developer Tools v2 课程](https://frontendmasters.com/courses/chrome-dev-tools-v2)
-   参考 3：来自 作者 Tomek Sułkowski 在 medium 的[系列文章](https://medium.com/@tomsu)
-   [Devtools脑图.png](https://i.loli.net/2019/04/19/5cb95639a9f73.png)

## web devtool 历史

-   view-source + alert 调试法
-   [Live DOM Viewer](https://software.hixie.ch/utilities/js/live-dom-viewer/)
-   [Firebug](https://getfirebug.com/)

## Chrome相关介绍
#### Chromium
    是谷歌的开源项目，由开源社区维护。
    
    国产的所有 “双核浏览器”，都是基于 Chromium 开发的，甚至 Chrome 也是基于它。
    
    我们下载的 Chromium 浏览器都是其源码未经修改的直接编译版本。
    
    Chromium 的内核版本比 Chrome 明显领先，新的技术都是先在 Chromium 上应用。
    
    几乎每天都在进行更新;
    
#### Chrome
    基于 Chromium，但是它是闭源的！
    所以有这样的一种说法：谷歌把核心技术都保留在了之家的 Chrome 中。
    
    支持了一些商业的收费插件，这些是不会出现在开源软件中的： H.264编码、mp3编码
    
    Chrome 内置了 Flash，Chromium 需要额外安装
    
    据说?在网页渲染方面 Chrome 也悄悄有一些特别的优化。
    
    集成了更多的谷歌服务（RanBinNuan），同时也有更多的限制，比如目前使用 Chrome 需要一定手段才能安装非商店的扩展，一旦被发现还会永远禁用，但 Chromium 就没有这些限制！
    
#### Dev Canary Stable Beta
    是Chrome的四个版本
    
    Stable 稳定版（几月一次更新）
    Beta 测试版（1 月一次更新）
    Dev 开发者版（1 星期一次更新）
    Canary 金丝雀版（脚步几乎同步 Chromium，天天更新）图标采用了特别的土豪金版神奇宝贝球。
    
    新版发布速度递增
    新功能数量递增
    稳定性递减

## Chrome Devtools 界面概览

![000devtoolsAll.png](https://i.loli.net/2019/04/19/5cb955bed88ce.png)

## Tips and Tricks

-   快捷键：ctrl shift p：执行命令
-   快捷键：ctrl p：打开文件
-   快捷键：esc：显示/隐藏 drawer(第二行面板
-   快捷键：ctrl shift c：选择元素
-   more -> focus debugee：切换至正在被调试的页面
-   more -> more tools：全部面板
-   无痕模式打开网页 —> 更纯净的调试环境，无扩展代码干扰
-   实验性功能：

```
    打开url     chrome://flags/
    搜索dev
    打开Experimental Extension APIs开关
    在settings中找到experiments可以找到相关实验性功能
    shift按七次，显示隐藏的实验性功能（比如terminal
```

-   金丝雀版 chrome - [Canary - 开发者专用的每日更新版](https://www.google.cn/chrome/canary/)
-   开发者版 chrome - [Canary - 开发者专用的每周更新版](https://www.google.cn/chrome/dev/)
