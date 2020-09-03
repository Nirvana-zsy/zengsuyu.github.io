---
title: ML14 声控轮播图 - 语音识别迁移学习
categories:
    - 10技术 | 前端机器学习 # 一级分类
tags:
date: 2020-04-29
description: Javascript玩转机器学习14
toc: 1
top: 0
---
## 在浏览器中收集中文语音训练数据
- html

```html
<script src="script.js"></script>
<button onclick="collect(this)">上一张</button>
<button onclick="collect(this)">下一张</button>
<button onclick="collect(this)">背景噪音</button>
<button onclick="save()">保存</button>
<pre id="count"></pre>
<button onclick="train()">训练</button>
<br><br>
监听开关：<input type="checkbox" onchange="toggle(this.checked)">
```

- js
```javascript
import * as speechCommands from '@tensorflow-models/speech-commands';
import * as tfvis from '@tensorflow/tfjs-vis';

const MODEL_PATH = 'http://127.0.0.1:8080';
let transferRecognizer;

window.onload = async () => {
    const recognizer = speechCommands.create(
        'BROWSER_FFT',  //浏览器的傅里叶变换(将声音转为声谱数据
        null,
        MODEL_PATH + '/speech/model.json',
        MODEL_PATH + '/speech/metadata.json'
    );
    await recognizer.ensureModelLoaded();

    //使用createTransfer接口创建迁移模型
    transferRecognizer = recognizer.createTransfer('轮播图');
};

window.collect = async (btn) => {
    btn.disabled = true;
    const label = btn.innerText;
    //用collectExample接口收集语音数据，传入语音命令名称，背景音名称是固定的_background_noise_
    await transferRecognizer.collectExample(
        label === '背景噪音' ? '_background_noise_' : label
    );
    btn.disabled = false;

    //将收集的数据可视化
    document.querySelector('#count').innerHTML = JSON.stringify(transferRecognizer.countExamples(), null, 2);
};
```



## 语音训练数据的保存
```javascript
window.save = () => {
    //用serializeExamples接口将收集的样例数据序列化
    const arrayBuffer = transferRecognizer.serializeExamples();
    const blob = new Blob([arrayBuffer]);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'data.bin';
    link.click();
};
```

## 加载数据，用speech commands包行迁移学习，训练

```javascript
window.onload = async () => {
    const recognizer = speechCommands.create(
        'BROWSER_FFT',
        null,
        MODEL_PATH + '/speech/model.json',
        MODEL_PATH + '/speech/metadata.json',
    );
    await recognizer.ensureModelLoaded();
    transferRecognizer = recognizer.createTransfer('轮播图');
    
    //用fetch方法从本静态服务器拿到样例数据
    const res = await fetch(MODEL_PATH + '/slider/data.bin');
    //转为arrayBuffer格式
    const arrayBuffer = await res.arrayBuffer();
    //模型加载样例数据
    transferRecognizer.loadExamples(arrayBuffer);
    //模型训练
    await transferRecognizer.train({ epochs: 30 });
    console.log('done');
};
```

## 轮播图html

- html

```html
<script src="script.js"></script>
监听开关：<input type="checkbox" onchange="toggle(this.checked)">

<style>
    .slider {
        width: 600px;
        overflow: hidden;
        margin: 10px auto;
    }
    .slider > div{
        display: flex;
        align-items: center;
    }
</style>
<div class="slider">
    <div>
        <img src="https://cdn.pixabay.com/photo/2019/10/29/15/57/vancouver-4587302__480.jpg" alt="" width="600">
        <img src="https://cdn.pixabay.com/photo/2019/10/31/07/14/coffee-4591159__480.jpg" alt="" width="600">
        <img src="https://cdn.pixabay.com/photo/2019/11/01/11/08/landscape-4593909__480.jpg" alt="" width="600">
        <img src="https://cdn.pixabay.com/photo/2019/11/02/21/45/maple-leaf-4597501__480.jpg" alt="" width="600">
        <img src="https://cdn.pixabay.com/photo/2019/11/02/03/13/in-xinjiang-4595560__480.jpg" alt="" width="600">
        <img src="https://cdn.pixabay.com/photo/2019/11/01/22/45/reschensee-4595385__480.jpg" alt="" width="600">
    </div>
</div>
```

## 监听&控制轮播

```javascript
await transferRecognizer.listen(result => {
    const { scores } = result;
    const labels = transferRecognizer.wordLabels();
    const index = scores.indexOf(Math.max(...scores));
    window.play(labels[index]);
}, {
    overlapFactor: 0,
    probabilityThreshold: 0.5
});

window.play = (label) => {
    const div = document.querySelector('.slider>div');
    if (label === '上一张') {
        if (curIndex === 0) { return; }
        curIndex -= 1;
    } else {
        if (curIndex === document.querySelectorAll('img').length - 1) { return; }
        curIndex += 1;
    }
    div.style.transition = "transform 1s"
    div.style.transform = `translateX(-${100 * curIndex}%)`;
};
```


---
[代码仓库](https://github.com/scarsu/js-ml.git)