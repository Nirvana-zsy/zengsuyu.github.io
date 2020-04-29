---
title: ML01 机器学习&神经网络简介
categories:
    - 12 MachineLearning # 一级分类
tags:
date: 2019-12-25
description: Javascript玩转机器学习01
toc: 1
top: 0
---
## 大纲
- 理论知识：机器学习、神经网络、 Tensorflow. js
- 经典案例：线性回归、逻辑回归、XOR、IRS、手写数字识
别、商标识别、语音识别
- 神经网络模型：从单个神经元到深度神经网络
- 神经网络模型算法：MSE/Log/ Cross Entropy
Sigmoid/Relu/Softmax， SGD/Adam
- 炼丹最佳实践：归化、欠（过）拟合、可视化、度量
- 模型的迁移学习、保存、加载、转换

## 为什么要学机器学习
可以做一些很酷的事情,tensorflow.js官网列出了一些已经训练好的，开箱即用的[模型](https://www.tensorflow.org/js/models)

例如，[BodyPix](https://github.com/tensorflow/tfjs-models/tree/master/body-pix)：实时分割人的身体和身体部位

![body-pix](/images/ai/000.gif)

[图像分类](https://github.com/tensorflow/tfjs-models/tree/master/mobilenet),
[文本恶意检测](https://github.com/tensorflow/tfjs-models/tree/master/toxicity),
[语音指令识别](https://github.com/tensorflow/tfjs-models/tree/master/speech-commands),
[...](https://www.tensorflow.org/js/models)


## 机器学习是什么
```
数据 + 经验 -> 优化算法
```
- 对能**通过经验自动改进算法**的研究
- 用**数据**或者以往的**经验**，来优化计算机程序的性能标准

## 机器学习例子：线性回归
- 只包括一个自变量和一个因变量，且二者的关系可用一条直线近似表示，这种回归分析称为一元线性回归分析。

![线性回归](/images/ai/01.png)

- 如果回归分析中包括两个或两个以上的自变量，且因变量和自变量之间是线性关系，则称为多元线性回归分析。

![多元线性回归](/images/ai/02.png)

## 机器学习例子：逻辑回归
- 输入连续的（多个）值，输出0-1之间的概率，可以用于解决分类/是非判断问题

![逻辑回归](/images/ai/03.png)

- 例子：图片分类、语音助手

![逻辑回归：图片分类](/images/ai/04.png)


## 为什么要用机器学习
- 有些问题无法用编写代码规则的方法来解决，例如图片识别。
- 获取数据比编写规则更容易
- GPU等计算能力显著提升（上世纪神经网络就已发明，但是受限于计算机计算能力，得不到发展


## 机器学习如何运作
- 神经网络
- 决策树、支持向量机、贝叶斯分类器、强化学习

## 什么是神经网络
- 人工神经网络
- 一种运算模型（输入输出的映射）
- 由大量的节点（神经元）之间相互连接构成

<!-- eg. 相亲
![image](http://note.youdao.com/yws/res/26525/FDAB01287A58444E9C6205F65EE8A164) -->

- 神经网路包括：一个输入层，若干隐藏层，一个输出层。
- 每条线的权重可能不同

## 神经元、权重、偏置、激活函数
- 每个神经元里都存储着若干**权重wight**、**偏置bias**和一个**激活函数activation**
- 输入**权重 + 偏置**，经过**激活函数**得到**输出**
- **激活函数**：用于添加**非线性**变换


## 神经网络的训练是什么？
- 给大量输入输出，算出神经网络里所有神经元的**权重、偏置**，然后给定新的输入，可以算出新的输出

## 机器学习中的术语
- **==特征==**：输入
- **==标签==**：输出
- **训练集**：大量输入输出


## 如何训练
1. 初始化：随便生成一些**weight**，**bias**
2. 计算**损失**：给定特征，计算出标签，得到其与真实标签的差距
3. 优化：微调**weight**和**bias**，使损失变小

## 前向传播
- 将训练数据的**特征（输入）**送入网络，得到**标签（输出）**

## 反向传播
- 计算**损失**并优化

## 如何计算损失
**损失函数**：均方误差、对数损失、交叉熵...

（了解损失函数原理即可，可以从第三方库调用。eg.TensorFlow.js）

## 如何优化
**优化器**：随即梯度下降**SGD**、**Adam**

（了解损失函数原理即可，可以从第三方库调用。eg.TensorFlow.js）



---
[代码仓库](https://github.com/scarsu/js-ml.git)