---
title: 关于字体图标的那些事
categories:
    - 10技术 | CSS # 一级分类
tags:
date: 2020-02-09
description: 不要再用图片当icon了拜托~
toc: 1
top: 0
---

# 矢量图标 & 字体图标

### 前言
```
用了iconfont

用mac的UI再也不吐槽你页面的图标放大后有点糊了...

PM再也不会嫌弃你画的页面图片太大，太占load time了...

你也不用因为一个hover状态，就写一段换图片src的逻辑了...

```

### iconfont是什么
- 矢量图标
- 矢量图片(UI) -> 转换成字体文件(工具) -> 定义font-face(前端)

### iconfont优点
- 体积小（用到的图标越多性价比越高）
- 样式便于控制，与字体一样可以调节font-size，color，阴影，旋转，透明度，且兼容低版本浏览器

### 阿里巴巴iconfont
- 设计师上传svg矢量图

![设计师上传svg矢量图](https://www.scarsu.com/images/gitbook/web_font03.png)

- 前端下载代码，解压后目录结构：
![iconfont目录结构](https://www.scarsu.com/images/gitbook/web_font04.png)

### 前端引用iconfont主流方式：
1. Unicode
    - 兼容性最好，支持 IE6+，及所有现代浏览器。
    - 支持按字体的方式去动态调整图标大小，颜色等等。
    - 但是因为是字体，所以不支持多色。
    ```css
    /*第一步：自定义@font-face，引用字体文件*/
    @font-face {
        font-family: 'iconfont';
        src: url('iconfont.eot');
        src: url('iconfont.eot?#iefix') format('embedded-opentype'),
            url('iconfont.woff2') format('woff2'),
            url('iconfont.woff') format('woff'),
            url('iconfont.ttf') format('truetype'),
            url('iconfont.svg#iconfont') format('svg');
    }
    /*第二步：定义使用 iconfont 的样式*/
    .iconfont {
        font-family: "iconfont" !important;
        font-size: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    /*第三步：挑选相应图标并获取unicode编码，应用于页面*/
    <span class="iconfont">&#x33;</span>
    ```

2. font-class（使用最多）
    - unicode变体，解决了unicode编码语义不明确的问题，书写更直观。可以很容易分辨这个 icon 是什么，著名的**FontAwesome**即使用该方式
    - 兼容性良好，支持 IE8+，及所有现代浏览器。
    - 因为使用 class 来定义图标，所以当要替换图标时，只需要修改 class 里面的 Unicode 引用。
    - 本质上还是字体，所以多色图标还是不支持的。
    ```css
    /*第一步：自定义@font-face，引用字体文件*/
    @font-face {
        font-family: 'iconfont';
        src: url('iconfont.eot');
        src: url('iconfont.eot?#iefix') format('embedded-opentype'),
            url('iconfont.woff2') format('woff2'),
            url('iconfont.woff') format('woff'),
            url('iconfont.ttf') format('truetype'),
            url('iconfont.svg#iconfont') format('svg');
    }
    /*第二步：定义iconfont样式*/
    .iconfont {
        font-family: "iconfont" !important;
        font-size: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    /*第三步：定义每个icon unicode 样式类*/
    .icon-gouwuche:before {
        content: "\e669";
    }
    ```
    ```html
    <!-- 第四步：引入1，2步的css -->
    <link rel="stylesheet" href="./iconfont.css">
    <!-- 第五步：挑选相应图标并使用定义的类名，应用于页面： -->
    <span class="iconfont icon-xxx"></span>
    ```


3. Symbol
    - 本质是svg，支持多色。
    - 较新的使用方式，兼容性较差，支持 IE9+，及现代浏览器。
    - 通过一些技巧，支持像字体那样，通过 font-size, color 来调整样式。
    - 浏览器渲染 SVG 的性能一般，还不如 png。
    ```html
    <!-- 第一步：引入js代码 -->
    <script src="./iconfont.js"></script>
    ```
    ```css
    /* 第二步：加入通用css样式（引入一次即可） */
    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
    ```
    ```html
    <!-- 第三步：挑选相应图标并获取类名，应用于页面： -->
    <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xxx"></use>
    </svg>
    ```