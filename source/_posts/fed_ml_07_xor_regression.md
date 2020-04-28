---
title: ML07 XOR回归训练：多层神经网络
categories:
    - 12 MachineLearning # 一级分类
tags:
date: 2020-01-07
description: Javascript玩转机器学习07
toc: 1
top: 0
---

## XOR 异或逻辑回归
- 不是线性问题
- 需要多层神经网络+激活函数来解决

![image](/images/ai/36.png)


## [Google Playground网站](http://playground.tensorflow.org/)
- 用TFJS写的 可视化学习机器学习的网站



![image](/images/ai/37.png)


## 加载XOR数据集

```
//调脚本接口生成模拟数据
const data = getData(400);
console.log(data);
```

- 模拟数据 数据结构：
![image](/images/ai/38.png)


```
//可视化
tfvis.render.scatterplot(
    { name: "XOR训练数据" },
    {
        values: [
            data.filter(p => p.label === 1),
            data.filter(p => p.label === 0)
        ]
    }
);
```

- 可视化结果

![image](/images/ai/39.png)

## 定义模型结构：多层神经网络
- 初始化一个神经网络模型
- 为模型添加两个层：隐藏层+输出层
- 设计层的激活函数、inputShape、神经元个数


```
//初始化一个 sequential model
    const mdoel = tf.sequential();

    //添加一个隐藏层（全连接层）
    mdoel.add(
        tf.layers.dense({
            units: 4,
            inputShape: [2], //只有第一层需要设置inputShape
            activition: "relu"
        })
    );

    //添加一个输出层（全连接层）
    model.add(
        tf.layers.dense({
            units: 1,
            activition: "sigmoid" //需要输出[0,1]之间的概率所以选sigmoid
        })
    );
```
- 定义模型的损失函数和优化器


```
//定义模型的损失函数和优化器
model.compile({
    loss: tf.losses.logLoss,
    optimizer: tf.train.adam(0.1)
});
```


## 训练模型并预测
- 训练数据转换为tensor

```
//训练数据转换为tensor
const inputs = tf.tensor(data.map(p => [p.x, p.y]));
const labels = tf.tensor(data.map(p => p.label));
```


- 训练模型并可视化训练过程

```
//训练
await model.fit(inputs, labels, {
    epochs: 10,
    callbacks: tfvis.show.fitCallbacks({ name: "XOR训练过程" }, ["loss"])
});
```

- 训练过程
![image](/images/ai/40.png)


- 进行预测

```
//预测
window.predict = form => {
    const pred = model.predict(
        tf.tensor([[form.x.value * 1, form.y.value * 1]])
    );
    alert(`预测结果：${pred.dataSync()[0]}`);
};
```

- 预测结果

![image](/images/ai/41.png)



---
[代码仓库](https://github.com/scarsu/js-ml.git)


