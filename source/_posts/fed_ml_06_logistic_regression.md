---
title: ML06 逻辑回归训练
categories:
    - 12 MachineLearning # 一级分类
tags:
date: 2020-01-06
description: Javascript玩转机器学习06
toc: 1
top: 0
---

## 逻辑回归简介
- 解决分类问题，输出一个概率[0,1]

![image](/images/ai/30.png)

## 加载二分类数据集
- 使用脚本生成二分类数据集


```
//利用脚本生成400组二分类数据
  const data = getData(400);
  console.log(data);
```

- 数据结构如图：

![image](/images/ai/31.png)

- 可视化二分类数据集(散点图)


```
//可视化为散点图
  tfvis.render.scatterplot(
    {name:'二分类逻辑回归 训练数据'},
    {
      values:[
        data.filter(p=>p.label === 1),
        data.filter(p=>p.label === 0),
      ]
    }
  )
```

- 可视化效果：

![image](/images/ai/32.png)


## 定义模型结构:带有激活函数的单个神经元
- 初始化一个sequential神经网络模型


```
//添加一个sequential神经网络模型
  const model = tf.sequential();
```


- 为模型添加层，设计层的神经元个数、inputShape、激活函数(`model.add`)


```
//为模型添加一个 dense全链接层（点乘 偏置 激活函数 适合用于二分类回归）
  model.add(tf.layers.dense({
    units:1,  //神经元个数
    inputShape:[2], //输入的tensor的shape：长度为2的一维数组
    activation:'sigmoid', //sigmoid这种激活函数的曲线y值范围始终在[0,1]
  }));
```


## 对数损失函数 Log Loss
- 利用`wiki.fast.ai`人工智能教学网站，理解[对数损失函数](http://wiki.fast.ai/index.php/Log_Loss)
- 对数损失函数:用于测量预测值在[0,1]的分类模型的性能
- 如下图为：标签为1的预测值的对数损失函数曲线，预测越接近真实值1，损失越小，越接近0 ，损失越大：

![image](/images/ai/33.png)

## 用TFJS API设置损失函数为：LogLoss(`model.compile`)


```
//设置损失函数为：LogLoss 对数损失函数
  model.compile({loss:tf.losses.logLoss});
```

## 设置超参数，训练模型(`model.fit`)


```
//设置超参数 训练模型
  await model.fit(inputs, labels,{
    batchSize:40,
    epochs:50,
    callbacks:tfvis.show.fitCallbacks(
      {name:'训练过程'},
      ['loss']
    )
  })
```

- 训练过程截图：

![image](/images/ai/34.png)

## 预测
- 编写前端界面输入待预测数据
- 使用训练好的模型进行预测(`model.predict`)


```html
<form action="" onsubmit="predict(this);return false;">
  x: <input type="text" name="x">
  y: <input type="text" name="y">
  <button type="submit">预测</button>
</form>
```


```js
window.predict = (form)=>{
    const pred = model.predict(tf.tensor([[form.x.value * 1,form.y.value * 1]]));
    alert(`预测结果：${pred.dataSync()[0]}`);
  }
```

- 输入2，2    预测结果：

![image](/images/ai/35.png)





