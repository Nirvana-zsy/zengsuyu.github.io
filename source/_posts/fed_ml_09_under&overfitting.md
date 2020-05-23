---
title: ML09 欠拟合&过拟合
categories:
    - 03 TensorFlow|机器学习系列 # 一级分类
tags:
date: 2020-04-24
description: Javascript玩转机器学习09
toc: 1
top: 0
---

## 欠拟合
- 数据过于复杂，但是神经网络模型过于简单

![underFitting](/images/ai/47.png)

- 无论训练多久，训练损失始终降不下去

![underFitting](/images/ai/46.png)

## 过拟合
- 模型过于复杂，把训练集噪声数据都拟合进去

![overFitting](/images/ai/48.png)

- 过拟合损失曲线，红色代表验证集，蓝色代表训练集

![overFitting](/images/ai/49.png)

![overFitting](/images/ai/50.png)


## 实操模拟 欠拟合&过拟合
- 加载带有噪音的二分类数据集（训练集与验证集）
- 使用不同神经网络演示 过拟合&欠拟合
- 过拟合应对法：早停法、权重衰减、丢弃法

## 加载带有噪音的二分类数据集（训练集与验证集）
#### 脚本原理
生成正态分布(高斯分布)的样本数据
```javascript
  function normalRandom(mean = 0, variance = 1) {
    let v1, v2, s;
    do {
      v1 = 2 * Math.random() - 1;
      v2 = 2 * Math.random() - 1;
      s = v1 * v1 + v2 * v2;
    } while (s > 1);
  
    let result = Math.sqrt(-2 * Math.log(s) / s) * v1;
    return mean + Math.sqrt(variance) * result;
  }
```
正态分布两边低的数据看作噪音数据，中间高的数据视为正常数据

通过调整方差 调整噪音量

#### 用脚本生成带有噪音的二分类数据集
```javascript
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import { getData } from './data';

window.onload = async () => {
    const data = getData(200, 3);

}
```
#### 可视化数据集
```javascript

    tfvis.render.scatterplot(
        { name: '训练数据' },
        {
            values: [
                data.filter(p => p.label === 1),
                data.filter(p => p.label === 0),
            ]
        }
    );
```


![可视化结果](/images/ai/51.png)


## 使用不同神经网络演示 过拟合
```javascript
const data = getData(200, 2);

tfvis.render.scatterplot(
    { name: '训练数据' },
    {
        values: [
            data.filter(p => p.label === 1),
            data.filter(p => p.label === 0),
        ]
    }
);

const model = tf.sequential();

//第一层隐藏层
model.add(tf.layers.dense({
    units: 10,
    inputShape: [2],  //长度为2的一维数组
    activation: "tanh",
}));

//输出层
model.add(tf.layers.dense({
    units: 1,
    activation: 'sigmoid'
}));

//设置损失函数&优化器
model.compile({
    loss: tf.losses.logLoss,
    optimizer: tf.train.adam(0.1)
});

const inputs = tf.tensor(data.map(p => [p.x, p.y]));
const labels = tf.tensor(data.map(p => p.label));

await model.fit(inputs, labels, {
    validationSplit: 0.2,
    epochs: 200,
    callbacks: tfvis.show.fitCallbacks(
        { name: '训练效果' },
        ['loss', 'val_loss'],
        { callbacks: ['onEpochEnd'] }
    )
});

```

![过拟合训练结果](/images/ai/52.png)

## 过拟合应对法：早停法
在训练出现过拟合时及时手动停止训练

## 过拟合应对法：权重衰减法(设置L2正则化
将过于复杂的模型权重降低
```javascript
model.add(tf.layers.dense({
    units: 10,
    inputShape: [2],  //长度为2的一维数组
    activation: "tanh",
    kernelRegularizer: tf.regularizers.l2({ l2: 1 })  //设置权重衰减
}));
```

![权重衰减法训练结果](/images/ai/54.png)

## 过拟合应对法：丢弃法
在隐藏层和输出层之间添加一个丢弃层
```javascript
//添加丢弃层，降低训练集复杂度
model.add(tf.layers.dropout({ rate: 0.9 }));
```


![丢弃法训练结果](/images/ai/53.png)


---
[代码仓库](https://github.com/scarsu/js-ml.git)