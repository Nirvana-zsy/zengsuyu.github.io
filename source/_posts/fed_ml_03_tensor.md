---
title: 03【Tensor-张量】简介
categories:
    - 12 MachineLearning # 一级分类
tags:
date: 2019-12-31
description: Javascript玩转机器学习03
toc: 1
top: 0
---

## 什么是Tensor
- **张量**
- 是向量和矩阵向更高维度的推广
- 相当于多维数组

### 0维
![image](/images/ai/05.png)

![image](/images/ai/06.png)

### 1维
![image](/images/ai/07.png)

![image](/images/ai/08.png)

### 2维
![image](/images/ai/09.png)

![image](/images/ai/10.png)

### 2 维
![image](/images/ai/11.png)

![image](/images/ai/12.png)


### 3维
![image](/images/ai/13.png)

![image](/images/ai/14.png)


## Tensor和机器学习有什么关系？
- 符合神经网络的数据结构
- 神经网络每一层要存N维数据
- N层的For循环运算

## Tensor的运算 十分符合 神经网络的运算
- eg.用TensorFlow.js提供的**点乘dotAPI**能够简化复杂的for循环运算：

![image](/images/ai/15.png)

![image](/images/ai/16.png)