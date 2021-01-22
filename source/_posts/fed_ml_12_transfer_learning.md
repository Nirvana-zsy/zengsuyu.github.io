---
title: 【ML12】基于迁移学习的图片分类-商标识别
categories:
    - 10技术 | 前端机器学习 # 一级分类
tags:
date: 2020-04-27
description: Javascript玩转机器学习12
toc: 1
top: 0
---

## 迁移学习
- **是什么**：把已训练好的模型参数迁移到新的模型来帮助新模型训练
- **为什么**：深度学习模型参数多，从头训练成本高
- **怎么做**：删除原始模型的最后一层，基于此截断模型的输出训练一个新的（通常相当浅的）模型



## 加载商标训练数据并可视化
- 商标训练素材
![训练素材](/images/ai/63.png)

- 在本地为素材建立静态http服务器
```
hs data --cors
```

- 编写JS脚本加载训练图片及其标签
```html
// index.html
<script src="script.js"></script>
<input type="file" onchange="predict(this.files[0])">
<button onclick="download()">下载模型</button>
```
```javascript
// data.js
const loadImg =(src)=>{
  return new Promise(resolve=>{
    const img = document.createElement('img')
    img.crossOrigin = 'anonymous'
    img.src = src
    img.width = 224   //以mobileNet为截断模型，其接收图片尺寸为224
    img.height = 224
    img.onload=()=>reslove(img)
  })
}

// 返回Promise
export const getInputs = async()=>{
  const loadImgs = []
  const labels = []
  for(let i=0;i<30;i+=1){
    ['android','apple','windows'].forEach(label=>{
      const imgP = loadImg(`http://127.0.0.1:8080/brand/train/${label}-${index}.jpg`)
      loadImgs.push(imgP)
      labels.push([
        label === 'android' ? 1 :0,
        label === 'apple' ? 1 :0,
        label === 'windows' ? 1 :0,
      ])
    })
  }
  const inputs = await Promise.all(loadImgs)
  return{ 
    inputs, labels
  }
}
```


```javascript
// script.js
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import { getInputs } from './data';
import { img2x, file2img } from './utils';

const MOBILENET_MODEL_PATH = 'http://127.0.0.1:8080/mobilenet/web_model/model.json';
const NUM_CLASSES = 3;
const BRAND_CLASSES = ['android', 'apple', 'windows'];

window.onload = async () => {
    const { inputs, labels } = await getInputs();
    // console.log([inputs,labels])

    //将加载的图片素材可视化
    const surface = tfvis.visor().surface({ name: '输入示例', styles: { height: 250 } });
    inputs.forEach(img => {
        surface.drawArea.appendChild(img);
    });
};
```

- 可视化训练图片：
![可视化训练图片](/images/ai/64.png)

## 加载预训练好的模型Mobilenet
```javascript
//加载预训练好的模型Mobilenet
const mobilenet = await tf.loadLayersModel(MOBILENET_MODEL_PATH);

//mobilenet的方法，给出其神经网络的概览
mobilenet.summary();
```


![mobilenet模型概览](/images/ai/65.png)



## 定义截断模型
```javascript
//获取中间层
const layer = mobilenet.getLayer('conv_pw_13_relu');

//定义一个截断模型truncatedMobilenet
const truncatedMobilenet = tf.model({
    inputs: mobilenet.inputs,
    outputs: layer.output
});
```

## 定义双层的迁移模型
```javascript

//定义一个模型
const model = tf.sequential();

//添加一个flatten层（将截断模型提取的高维特征提取成一维向量，这一层没有参数，起转换作用
model.add(tf.layers.flatten({
    inputShape: layer.outputShape.slice(1)
}));

//添加一个全链接层：用于训练我们的商标图片
model.add(tf.layers.dense({
    units: 10,
    activation: 'relu'
}));

//添加一个全链接层：用于做多分类
model.add(tf.layers.dense({
    units: NUM_CLASSES,
    activation: 'softmax'
}));

//设置损失函数：分类交叉熵损失函数，优化器为adam
model.compile({ loss: 'categoricalCrossentropy', optimizer: tf.train.adam() });

```

## 先用截断模型训练数据，转为可以用于迁移模型的数据
```javascript
//训练数据 先经过截断模型，转为可以用于迁移模型的数据
const { xs, ys } = tf.tidy(() => {
    const xs = tf.concat(inputs.map(imgEl => truncatedMobilenet.predict(img2x(imgEl))));
    const ys = tf.tensor(labels);
    return { xs, ys };
});
```

## 训练迁移模型
```javascript
//训练迁移模型
await model.fit(xs, ys, {
    epochs: 20,
    callbacks: tfvis.show.fitCallbacks(
        { name: '训练效果' },
        ['loss'],
        { callbacks: ['onEpochEnd'] }
    )
});
```

![迁移模型训练效率高](/images/ai/66.png)

## 预测
```javascript
window.predict = async (file) => {
    const img = await file2img(file);
    document.body.appendChild(img);
    const pred = tf.tidy(() => {
        const x = img2x(img);
        const input = truncatedMobilenet.predict(x);
        return model.predict(input);
    });

    const index = pred.argMax(1).dataSync()[0];
    setTimeout(() => {
        alert(`预测结果：${BRAND_CLASSES[index]}`);
    }, 0);
};
```


![预测效果](/images/ai/002.gif)

## 模型的保存和加载

- 保存：把训练好的模型保存成文件或者 local storage变量

```
window.download = async () => {
    await model.save('downloads://model');
};
```
- 加载：从文件或者 local storage中加载模型
- 原因：无需重复训练，便于复用到其他应用中


---
[代码仓库](https://github.com/scarsu/js-ml.git)