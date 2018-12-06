---
title: Fullpage.js
categories:
    - js # 一级分类
tags:
    - js
    - FullPage.js
date: 2018-04-19
description: fullPage.js 是一个基于 jQuery 的插件。
toc: 1
---

## 主要功能有：

-   支持鼠标滚动
-   支持前进后退和键盘控制
-   多个回调函数
-   支持手机、平板触摸事件
-   支持 CSS3 动画
-   支持窗口缩放
-   窗口缩放时自动调整
-   可设置滚动宽度、背景颜色、滚动速度、 循环选项、回调、文本对齐方式等等

## 兼容性

    jQuery 兼容:
    兼容 jQuery 1.7+。

    浏览器兼容:
    IE8+ ✔	Chrome ✔	Firefox ✔	Opera ✔	Safari ✔

## 引入文件

```
<link rel="stylesheet" href="css/jquery.fullPage.css">
<script src="js/jquery.fullPage.js"></script>
<script src="js/jquery.min.js"></script>
<!-- jquery.easings.min.js 用于 easing 参数，也可以使用完整的 jQuery UI 代替，如果不需要设置 easing 参数，可去掉改文件 -->
<script src="js/jquery.easings.min.js"></script>
<!-- 如果 scrollOverflow 设置为 true，则需要引入 jquery.slimscroll.min.js，一般情况下不需要 -->
<script src="js/jquery.slimscroll.min.js"></script>
```

## HTML

```
	<div id="dowebok">
	    <div class="section">
	        <h3>第一屏</h3>
	    </div>
	    <div class="section">
	        <h3>第二屏</h3>
	    </div>
	    <div class="section">
	        <h3>第三屏</h3>
	    </div>
	    <div class="section">
	        <h3>第四屏</h3>
	    </div>
	</div>
	每个 section 代表一屏，默认显示“第一屏”，如果要指定加载页面时显示的“屏幕”，可以在对应的 section 加上 class=”active”，如：

	<div class="section active">第三屏</div>

	同时，可以在 section 内加入 slide，如：

	<div id="dowebok">
	    <div class="section">第一屏</div>
	    <div class="section">第二屏</div>
	    <div class="section">
	        <div class="slide">第三屏的第一屏</div>
	        <div class="slide">第三屏的第二屏</div>
	        <div class="slide">第三屏的第三屏</div>
	        <div class="slide">第三屏的第四屏</div>
	    </div>
	    <div class="section">第四屏</div>
	</div>

### JavaScript
``
	$(function(){
	    $('#dowebok').fullpage();
	});
```

## 详细配置见官方文档

[Fullpage.js-Github](https://github.com/alvarotrigo/fullPage.js/tree/master/lang/chinese#fullpagejs)

---

    皮不动了...
