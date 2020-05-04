---
title: ML03【Tensor-张量】简介
categories:
    - 12 MachineLearning # 一级分类
tags:
date: 2019-12-29
description: Javascript玩转机器学习03
toc: 1
top: 0
---

## 什么是Tensor
- **张量**
- 是向量和矩阵向更高维度的推广
- 相当于多维数组

### 0维张量
![0维张量](/images/ai/05.png)

![rankType描述维度](/images/ai/06.png)

### 1维张量
![1维张量](/images/ai/07.png)

![shape描述每个维度上数组长度](/images/ai/08.png)

### 2维张量
![每一维度数组长度均为2的2维张量](/images/ai/09.png)

![size描述张量的元素数量](/images/ai/10.png)

### 2 维张量
![2维张量](/images/ai/11.png)

![每一维度数组长度均为1的2维张量](/images/ai/12.png)


### 3维张量
![3维张量](/images/ai/13.png)

![shape描述了三个维度的数组长度均为1](/images/ai/14.png)


## Tensor和机器学习有什么关系？
- Tensor符合神经网络的数据结构
- 神经网络每一层要存N维数据
- N层的For循环运算

## Tensor的运算 十分符合 神经网络的运算
- eg.用TensorFlow.js提供的**点乘dotAPI**能够简化复杂的for循环运算：

![传统for循环运算张量 vs dot运算张量](/images/ai/15.png)

![点乘结果与for循环结果一致](/images/ai/16.png)


---
[代码仓库](https://github.com/scarsu/js-ml.git)