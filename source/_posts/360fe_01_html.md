---
title: 360FED课程——HTML
categories:
    - 04 HTML # 一级分类
tags:
    - 360fed
date: 2018-09-02
description: 这么穷为什么还花钱买HTML学？
toc: 1
top: 0
---

# 1. 前端做什么

用 web 标准技术 html css js svg http 等

做界面与交互

功能+美观+无障碍+安全+兼容+性能+体验

# 2. 知识图谱/技术栈

## 2.1. 语言

-   js
-   html
-   css
-   php

## 2.2. 行业标准

-   DOM
-   ES2018
-   HTTP
-   JSON
-   XML

## 2.3. 框架

-   React.js
-   Angular.js
-   jQuery
-   Vue.js
-   lodash

## 2.4. 兼容性

-   IE 等浏览器
-   CSS3 新特性
-   HTML5 新特性
-   ES2018
-   移动端

## 2.5. 编程思想

-   函数式编程
-   面向对象
-   设计模式

## 2.6. 调试

-   浏览器
-   Fiddler http

## 2.7. 工程化

-   npm
-   webpack
-   postcss

## 2.8. 安全性

-   XSS
-   CSRF
-   加密解密
-   编解码

## 2.9. 性能

-   优化规则
-   开发者工具
-   浏览器原理

## 2.10. 团队协作

-   git/svn
-   编码规范/eslint
-   文档管理

## 2.11. 交互设计

# 3. 前端边界

node、electron、react native、webRTC、WebGL、WEBAssembly

# 4. HTML

## 4.1. doctype

-   指定文档使用的标准和版本；
-   浏览器根据 doctype 决定使用哪种渲染模式；
-   没写会以怪异模式渲染（盒模型不同等待）
-   渲染模式

## 4.2. 语义化

-   元素、属性、属性值都有特定含义，应该遵循语义来写 HTML
-   可读性、可维护性、搜索引擎优化、无障碍性

## 4.3. 标签

### 4.3.1. flow 流式元素：

-   heading 标题
-   sectioning 章节
-   phrasing 段落内容 p h
-   Embedded 嵌入式内容 audio canvas
-   interactive 可交互性内容 button a
-   metadata 元数据元素 base link meta noscript script style title

### 4.3.2. 看规范

## 4.4. HTML 扩展

### 4.4.1. meta 标签（增加元数据

```HTML
<!-- 编码 -->
<meta charset="utf-8">

<!-- 指定http header -->
<meta http-equiv="Content-Security-Policy" content="script-src 'self'">

<!-- seo优化 -->
<meta name="keywords" content="关键词">
<meta name="description" content="页面介绍">

<!-- 移动设备的viewport 初始缩放比例，视口宽度 -->
<meta name="viewport" content="initial-scale=1">

<!-- 关闭IOS电话号码识别 -->
<meta name="format-detection" content="telphone=no">

<!-- 360等双核浏览器 指定渲染内核 -->
<meta name="renderer" content="webkit">

<!-- 指定IE渲染模式 -->
<meta name="X-UA-Compatibla" content="IE=Edge">
```

### 4.4.2. data-\*属性（规范内-自定义的属性）

```HTML
  datasetAPI
    <el data-id=""/>
    el.dataset.id
```

### 4.4.3. link

-   rel 属性（relation 关系，外部资源与当前页面的关系）

```html
<!-- 引入css -->
<link rel="stylesheet" href="" />

<!--
    浏览器性能优化：dns预解析rel=dns-prefetch、资源预加载rel=prefetch、预渲染 rel=prerender
-->
<link rel="dns-prefetch" href="" /> <link rel="prefetch" href="" />
<link rel="prerender" href="" />

<!-- favicon：rel=icon -->
<link rel="icon" type="image/png" href="" />

<!-- RSS：rel=alternate -->
<link rel="alternate" type="application/rss+xml" href="" />
```

### 4.4.4. JSON-LD

LD：linkdata 链接的数据 (直接在页面嵌 json 数据)

```js
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "Person",
  "name": "John Doe",
  "jobTitle": "Graduate research assistant",
  "affiliation": "University of Dreams",
  "additionalName": "Johnny",
  "url": "http://www.example.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1234 Peach Drive",
    "addressLocality": "Wonderland",
    "addressRegion": "Georgia"
  }
}
//  应用例如分享页面时的数据
//  搜索引擎能识别等等
//  分享链接带有一些标题图片等信息
</script>
```

## 4.5. Web 无障碍/Accessibility

-   一些 Web 开发者规范：
    -   WCAG2.0
    -   ARIA
-   提升无障碍性
    -   img alt
    -   noscript
    -   input 和 label 对应
    -   图片验证码与语音验证码
    -   文字背景对比度
    -   键盘可操作（tab modal focus）

## 4.6. 工具

-   [W3C Validator（检查 html 合法性）](http://validator.w3.org/)
-   emmet（插件）
-   markdown（适合写文档）

## 4.7. 参考链接

-   [HTML: The Living Standard](https://html.spec.whatwg.org/dev/)
-   [Activating Browser Modes with Doctype](https://hsivonen.fi/doctype/)
-   [Accessibility](https://www.w3.org/standards/webdesign/accessibility)
-   Web Content Accessibility Guidelines 2.0
-   [HTML5 Doctor: Semantics](http://html5doctor.com/element-index/)

## 全局属性

### class id style

### title

（兼容性最好的 tooltip😂）

### tabindex

tab 键控制次序

### lang

语言代码（利于语义化机器理解）（语言代码参考手册http://www.runoob.com/tags/html-language-codes.html）

### dir

文本方向（rtl ltr auto）

### accesskey

元素的键盘访问快捷键（例值为'h'则不同浏览器不同 OS 有不同的操作方式，例 chrome 是 alt + 'h'）

## （HTML5 全局属性）

### data-\*属性

属性名不要包含大写字母，在 data- 后必须至少有一个字符。
该属性可以是任何字符串

```
el.getAttribute("data-xx")
```

### hidden

不需要属性值，隐藏元素，原理是 display:none

### contenteditable

元素是否可编辑

### contextmenu

（说是目前只有 firefox 支持，亲测没效果

```
<p contextmenu="mymenu"></p>
<menu id="mymenu">
    <command label="xxx" onclick="fn()"/>
    <command label="xxx" onclick="fn()"/>
</menu>
```

### draggable：(与 HTML5drag 结合用)

```javascript

<div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
<p id="drag1" draggable="true" ondragstart="drag(event)">这是一段可移动的段落。可把该段落拖入上下的矩形。</p>
<div id="div2" ondrop="drop(event)" ondragover="allowDrop(event)"></div>

function allowDrop(ev){
	ev.preventDefault();
}
function drag(ev){
	ev.dataTransfer.setData("Text",ev.target.id);
}
function drop(ev){
	var data=ev.dataTransfer.getData("Text");
	ev.target.appendChild(document.getElementById(data));
	ev.preventDefault();
}

```

### dropzone 属性:

规定当被拖动的数据在拖放到元素上时，是否被复制### 动或链接,无浏览器支持

### sppelcheck：

对元素的文本进行拼写检查

### translate 属性：

规定元素内容是否要翻译，=yes|no

# 遗留

表单元素 属性 datalist select 下拉多选 input 的 multiple 属性 button 的 type 属性默认值
video 不能嵌套 img
p 不能嵌套 div
figure dfn cite 标签

---

    “因为你永远不知道你不知道的有多少”
