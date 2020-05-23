---
title: ML02 TensorFlow.js简介
categories:
    - 03 TensorFlow|机器学习系列 # 一级分类
tags:
date: 2019-12-26
description: Javascript玩转机器学习02
toc: 1
top: 0
---

## TensorFlow.js是什么
- js实现的机器学库
- 可以在node.js/浏览器环境中使用机器学习技术，这意味着有更好的实时性和交互性
- 著名的TensorFlow是用Python实现的

## TensorFlow.js能干什么
- 运行现有的模型（算法工程师已经训练好的模型）
- 重新训练现有模型
- 使用javascript开发机器学习模型

## demo
- [tfjs的各种例子](https://github.com/tensorflow/tfjs-examples)

## 在浏览器安装tfjs
- 新建一个html，script标签引入

`<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script>`

- npm包安装，用import引入，用parcel/webpack构建

`npm i @tensorflow/tfjs`

## 在Node.JS安装tfjs
- 安装带有原生C++绑定的TensorFlow.js(推荐，底层是C++，速度快，但是安装麻烦)
- 安装纯Javascript版本，性能较差

- 使用require方式引用之前npm安装的`@tensorflow/tfjs`，直接用node运行当前js，一样可以在node中使用到tfjs，但是会提示：

```
============================
Hi there. 
Looks like you are running TensorFlow.js in Node.js. 
To speed things up dramatically, install our node backend, whi
ch binds to TensorFlow C++, by running npm i @tensorflow/tfjs-node, or npm i @tensorflow/tfjs-node-gpu if you have CUDA. Then call require('@tensorflow/tfjs-node'); (-gpu suffix for CUDA) at the start of your program. Visit https://github.com/tensorflow/tfjs-node for more details.
============================
```

- 因此要使用`npm i @tensorflow/tfjs-node`命令来安装后端版本tfjs，但是直接安装会报错，要先安装以下依赖：`npm i node-gyp windows-build-tools@4.0.0 -g`

- `node-gyp`是node和计算机底层交互时经常要用到的包，在windows直接安装这个包也需要一些依赖，例如安装visual studio、python，因此`windows-build-tools@4.0.0`这个包就是用来解决其依赖问题的。

- 安装完后端版本tfjs`@tensorflow/tfjs-node`后，即可直接通过require引入使用

---
[代码仓库](https://github.com/scarsu/js-ml.git)