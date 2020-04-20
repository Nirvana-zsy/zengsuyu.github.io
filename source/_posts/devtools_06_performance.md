---
title: Devtools 老司机养成 - 第六篇 Performance 性能面板
categories:
    - 08 调试 # 一级分类
tags:
date: 2020-03-29
description: 中高级前端都应该懂的性能分析&优化，都在Performance面板
toc: 1
top: 0
---


## 概览

-   performance 面板可以用于分析`运行时性能`(运行时强调的是与页面加载性能相区分)
-   以隐身模式打开网页 （隐身模式可确保 Chrome 以干净的状态运行。例如，排除扩展对性能测量的影响
-   [Janky Animation demo ：性能测试 demo](https://googlechrome.github.io/devtools-samples/jank/)
-   视图 overview：

![performance.png](https://i.loli.net/2019/04/23/5cbf1d586fe21.png)

## RAIL 模型

-   [RAIL 模型](https://developers.google.com/web/fundamentals/performance/rail)是一种性能模型，定义了四个维度的性能分析指标
-   `Response`：在`100 毫秒`以内响应（例如从点按到绘制）
-   `Animation`： 每秒生成 60 帧，每个帧的工作（从 JS 到绘制）完成时间小于 16 毫秒,达到人眼顺滑（例如滚动 拖动都是动画类型）（因为浏览器需要花费时间将新帧绘制到屏幕上，只有 `10 毫秒`来执行代码）
-   `Idle`：利用空闲时间完成推迟的工作（要实现第一条 response 在 100ms 内响应，Main 主线程 JS 工作应该小于 `50ms`，剩余的时间将主线程的控制从 js 返回给浏览器执行其像素管道、对用户输入作出反应等，因此最佳实践是将 js 的工作分成不大于 50 毫秒的块,如果用户开始交互，优先级最高的事项是响应用户。
-   `Load`：在 `1000 毫秒`以内呈现内容（无需完整加载，启用渐进式渲染，将非必需的加载推迟到空闲时间段

-   通过 performance 面板，可以得到这四个维度的分析数据

## 控制区

![](https://i.loli.net/2019/05/01/5cc9642fa35b5.png)

-   点击`录制按钮`或者`开始录制并刷新页面按钮`,可以在控制区下方得到全部性能分析结果
-   其中除了最下方的详细信息窗格以外，分析结果都是以时间为轴
-   可以在 overview 窗格拖动鼠标，选择某段时间的分析结果
-   滚动鼠标滚轮，缩放/移动选中事件
-   在火焰图窗格，按住`shift`，滚动鼠标滚轮，可以上下
-   在火焰图窗格，也可以直接左右拖动图表
-   或者用`W A S D`按键控制缩放移动
-   `Disable JavaScript samples`默认情况，在`Main`主线程的火焰图中，会详细记录 js 函数之间的调用栈，可以开启此选项禁用调用栈记录
-   `Enable advanced paint instrumentation`启用高级绘图工具，可以在分析结果的`Frames`中的每一帧的详细结果中看到`Layer`选项卡，其中有选中帧的详细图层信息；也可以在`Main`主线程火焰图中选中绿色的`Paint`事件，在最底部详细信息的`Paint Profile`选项卡中，看到详细的页面绘制过程分析
-   `Collect garbage`控制器最右的垃圾桶图标，是强制执行垃圾回收，对于监控内存比较有用

## FPS 图表 - Frames Per Seconds

![](https://i.loli.net/2019/05/05/5ccee0f3335be.png)

-   FPS 图表中，绿色代表帧率高低，参考`RAIL`模型，帧率>=60 时，用户能体验的顺滑的网页
-   红色出现 代表有掉帧情况

## CPU 图表

![](https://i.loli.net/2019/05/05/5ccee13cd4479.png)

-   CPU 图表中，不同的颜色代表不同事件对 CPU 的占用，颜色信息如图

![](https://i.loli.net/2019/05/05/5ccee05903554.png)

-   当 CPU 长时间被占满，就是当前网页性能需要优化的信号

## SCREENSHOTS

-   鼠标在`FPS,CPU,NET`图表悬浮时，会展示出鼠标对应时间点的网页截屏，左右移动鼠标可以看到网页变化的重播效果

![](https://i.loli.net/2019/05/05/5ccee37b9a4b3.gif)

## HEAP

![](https://i.loli.net/2019/05/05/5ccee6f4b968d.png)

-   在 HEAP 图表中可以看到 JS 内存占用情况，与下方的 memory 窗格中的`JS Heap`相对应
-   在 Memory 窗格还可以看到 Document 文档、Nodes DOM 节点、监听器、GPU 内存的习份内存统计

## Frames

-   点击三角箭头展开`Frames`区域，鼠标悬浮/点击绿色方块，可以看到该特定帧的帧率和渲染耗时，当 FPS 低于 60，表明当前帧的渲染效率较低

![](https://i.loli.net/2019/05/05/5ccee92a52b29.png)

## FPS 仪表工具

-   通过`more -> more tools -> Rendering` 或者 `ctrl+shift+p -> rendering` 打开`Rendering`面板

![](https://i.loli.net/2019/05/05/5ccee9d226d2e.png)

-   启用`FPS meter`，即可看到的页面实时帧率

![](https://i.loli.net/2019/05/05/5cceeb3144e12.gif)

## Mian

-   点击三角箭头展开`Main`区域，可以看到主线程上事件的`火焰图`
-   x 轴是时间，每一块代表一个事件，y 轴代表堆栈，事件的上下堆叠，代表上层事件引发/调用了下层事件

![](https://i.loli.net/2019/05/05/5cceec8b11f7f.png)

-   通过调用堆栈，可以找出导致低性能的事件及其源码位置
-   当事件块出现红色三角，可以点击三角查看该事件的性能相关警告信息，并定位到引起警告的代码

![](https://i.loli.net/2019/05/05/5cceef6801439.png)

![](https://i.loli.net/2019/05/05/5ccef1a7c2c2a.gif)

-   点击`Animation Frame Fired`事件，可以在最下方`Summary`窗格查看触发动画事件的详细信息，点击`Initiator`后的`reveal`链接，会高亮到引起动画事件的事件

![](https://i.loli.net/2019/05/05/5ccef012a3dba.gif)

## 性能相关扩展

-   [网页性能-性能模型/加载/渲染/审计/优化](https://developers.google.com/web/fundamentals/performance/why-performance-matters/)
-   [the-anatomy-of-a-frame - 一个帧的剖析](https://aerotwist.com/blog/the-anatomy-of-a-frame/)
-   [常见的时间线事件参考](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/performance-reference)

## 浏览器并发请求数
- 现象：
    同一时间针对同一域名下的请求有一定数量限制。超过限制数目的请求会被阻塞。

- 原因：
    基于端口数量和线程切换开销的考虑，浏览器不可能无限量的并发请求。

- 导致：
    有大量请求的站点，响应较慢，因为并发请求会被阻塞。

-   ![不同浏览器的限制数](https://i.loli.net/2019/07/29/5d3e56236ee0b54748.png)

- 解决方法：
  1. 用不同域名（hash domain，cookie free）
    例如知乎的图片都是放在zhiimg.com域名下获取的。
    cookie free是指，例如知乎主站zhihu.com域名下有很多cookie，换成zhihuimg.com请求图片时，就不会把zhihu上的cookie发过去，减小所需带宽。

  2. 减少请求数
  雪碧图
  合并压缩css/js（另一个原因是为了减少重绘）
  利用Cache-Control等缓存静态资源，在更新静态资源时使用不同url或文件名带上版本
  懒加载，出现再加载