---
title: ML15 Python与Js模型互转
categories:
    - 03 TensorFlow|机器学习系列 # 一级分类
tags:
date: 2020-04-30
description: Javascript玩转机器学习15
toc: 1
top: 0
---
## Python模型
- 通过 Python版 Tensorflow/ Keras生成模型
- 类型包括： Tensorflow Saved Model、 Keras HDF5mode等
- 获取：开源网站下载/算法同事提供

## Javascript模型
- 可以在 TensorflowJs中运行的模型
- 类型包括： tijs layers model， tojs graph model等
- 获取：开源网站/通过TFJS生成/由 Python模型转化而来

## 为什么要互转
-  Python to JavaScript： JavaScript模型可以在浏览器中运行
-  JavaScript to Python：少见，为了在更多平台运行
-  JavaScript to JavaScript：分片/量化/加速

## TensorFlow.js Converter
- 命令行转换器
- 依赖Python-3.6.8（可以使用Anaconda工具创建环境
- 在命令行指定输入输出的路径和模型格式即可
- [地址](https://github.com/tensorflow/tfjs/tree/master/tfjs-converter)


## JavaScript：分片/量化/加速
- 分片：将模型切分，提升加载速度
- 量化：通过牺牲一部分精度，压缩模型的大小
- 加速：将模型转换为tfjs_graph_model格式可以加速模型

---
[代码仓库](https://github.com/scarsu/js-ml.git)