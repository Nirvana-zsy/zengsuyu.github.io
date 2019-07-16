---
title: PC端 WEB性能测试方案初稿
categories:
    - performance # 一级分类
tags:
    - performance
date: 2019-07-01
description: 前端性能测试初探
toc: 1
top: 0
---

# 测试目的
通过主要功能页面的前端性能测试，从前端分析引起页面响应缓慢的原因，并根据优化建议对其进行优化，提升前端性能，从而达到提升系统整体性能的目的。

# 测试范围
主要对用户常用的页面进行测试，至少包括：登陆页、首页、主要功能页。

# 测试指标

- RAIL模型（Response animation idle load）
- 【PLT-PageLoadTime】页面加载时长-几乎代表了用户等待页面可用的时间
- 【AFT-Above-the-fold Time】首屏加载时长
- 【DOM Tree】解析 DOM 树结构的时间
- 【TTFB- Time To First Byte】读取页面第一个字节的时间-理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？
- 【First Paint】首次渲染时长
- 【First Contnentful Paint】首次内容渲染时长
- 【First Meaningful Paint】首次有效渲染时长
- 【First Interactive】首次可交互时长
- 【First CPU Idle】首次CPU空闲时长
- 【Redirect】重定向的时间
- 【DNS】DNS 查询时间，DNS 缓存时间
- 【onload】执行 onload 回调函数的时间
- 【unload】卸载页面的时间
- 【TCP Connect】TCP 建立连接完成握手的时间

# 测试方案
1. 合成监控/静态测试（Synthetic Monitoring，SYN）
    - 使用Google LightHouse测试
    - 使用Yslow测试

2. 真实用户监控（Real User Monitoring，RUM）
    - 通过 Performance API 取测试环境的真实性能数据

# 测试结果分析
[...数据报表]
[...数据图表]

# 优化方案
- 重定向优化
- DNS优化
- TCP请求优化
- HTTP请求优化
- 渲染优化
- 代码逻辑优化
- DOM结构优化
- 资源优化

# 优化结果
[...对比分析]