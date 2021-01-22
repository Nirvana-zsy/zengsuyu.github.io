---
title: 【ML11】使用预训练模型 图片分类
categories:
    - 10技术 | 前端机器学习 # 一级分类
tags:
date: 2020-04-26
description: Javascript玩转机器学习11
toc: 1
top: 0
---

<!-- ![先看一下简单训练的预测效果](/images/ai/001.gif) -->

## 预训练模型是什么
- 预先训练好的模型，无需训练，即可预测
- 在Tensorflow.js中可以调用Web格式的模型文件

## MobileNet模型
- 一种卷积神经网络模型,能识别1000种物体图片
- 模型文件小，响应速度块，准确度略低

#### 引入模型文件
- 为资源启动本地静态资源服务器(文件位于本地代码仓库/data下)
```
hs data --cors
```

- 引入资源
```
const MOBILENET_MODEL_PATH = 'http://127.0.0.1:8080/mobilenet/web_model/model.json';
```

- 引入物体类型
```
import { IMAGENET_CLASSES } from './imagenet_classes';
```

#### 用tfjs加载模型
```javascript
//用tf的loadLayersModel加载模型
const model = await tf.loadLayersModel(MOBILENET_MODEL_PATH);
```

#### 前端输入带预测数据
- html
```html
<script src="script.js"></script>
<input type="file" onchange="predict(this.files[0])">
```

#### 使用模型进行预测

```javascript
// ./util.js
export function file2img(f) {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(f);
        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.width = 224;
            img.height = 224;
            img.onload = () => resolve(img);
        };
    });
}

// ./script.js

window.predict = async (file) => {
    //从文件转换为htmlElement
    const img = await file2img(file);
    document.body.appendChild(img);
    const pred = tf.tidy(() => {	//tidy优化webGl内存
        const input = tf.browser.fromPixels(img)	//转换为tensor
            .toFloat()	//整数转为浮点数
            .sub(255 / 2)	//归一化
            .div(255 / 2)
            .reshape([1, 224, 224, 3]);	//一个图片的格式
        return model.predict(input);	//预测
    });

    const index = pred.argMax(1).dataSync()[0];

    // setTimeout 0 使ui不被脚本阻塞
        setTimeout(() => {
            alert(`预测结果：${IMAGENET_CLASSES[index]}`);
        }, 0);
    };
```

![预测效果](/images/ai/61.png)
---
[代码仓库](https://github.com/scarsu/js-ml.git)