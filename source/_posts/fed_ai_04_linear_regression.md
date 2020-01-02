---
title: 线性回归训练
categories:
    - 03 AI # 一级分类
tags:
date: 2019-0102
description: Javascript玩转机器学习04
toc: 1
top: 0
---

## 是什么
- 一种统计分析方法
- 用于确定两种(或以上)变量间相互依赖的**定量关系**
- eg.身高体重预测(两种变量)、房价预测(多变量)


## 操作步骤
- 准备、可视化：训练数据
- 用TensorFlow.js的API构建一个简单的神经网络
- 训练模型 并 预测

## 前置条件
- 最新版本chrome
- 代码编辑器（eg.VSCODE
- 基础的前端、神经网络知识

## 准备、可视化：训练数据（实操）
- 准备线性回归训练数据
- 使用tfvis可视化训练数据


```html
<!-- linear-regression/index.html-->
<script src="script.js"></script>
```
```js
// linear-regression/script.js
import * as tfvis from "@tensorflow/tfjs-vis";

window.onload = () => {
  const xs = [1, 2, 3, 4]; //input
  const ys = [1, 3, 5, 7]; //output

  tfvis.render.scatterplot(
    { name: "线性回归训练数据" },
    { values: xs.map((x, i) => ({x, y:ys[i]})) },
    {xAxisDomain:[0,5],yAxisDomain:[0,9]}
  );
};

```

```
-- bash
parcel li*/*.html
```

![image](/images/ai/17.png)