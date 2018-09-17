---
title: Animate.css
categories: 
- css # 一级分类
tags: 
- css
date: 2018-02-01
description: Animate.css是一个来自国外的 CSS3 动画库。
---
## 功能
- 它预设了抖动（shake）
- 闪烁（flash）
- 弹跳（bounce）
- 翻转（flip）
- 旋转（rotateIn/rotateOut）
- 淡入淡出（fadeIn/fadeOut）
- 等多达 60 多种动画效果

## 浏览器兼容：
	只兼容支持 CSS3 animate 属性的浏览器，
	分别是：IE10+、Firefox、Chrome、Opera、Safari。

## 引入文件
	<link rel="stylesheet" href="animate.min.css">

## 官网
	[Animate.css](https://daneden.github.io/animate.css/)
	
	[Github](https://github.com/daneden/animate.css)
	
## 使用
```
	<h1 class="animated infinite bounce delay-2s">Example</h1>
```
* 首先给元素加上animated类
* 第二个infinate使动画无限播放，可选
* 第三个bounce是具体的动画效果名称，[全部动效演示](https://daneden.github.io/animate.css/)
* 第四个delay-2s是动效延迟播放2s，可选

## 通过 Js,Jq 给元素添加 class：
```
	$(function(){
    	$('#dowebok').addClass('animated bounce');
	});
```

## 更改animate.css的默认设置：
```
	#dowebok {
	    animate-duration: 2s;    //动画持续时间
	    animate-delay: 1s;    //动画延迟时间
	    animate-iteration-count: 2;    //动画执行次数
	}
	//兼容各种浏览器代码，需要添加各浏览器前缀：
	#dowebok{
          -webkit-animation-duration: 3s;
          -webkit-animation-delay: 4s;
          -webkit-animation-iteration-count: 5;

          -moz-animation-duration: 3s;
          -moz-animation-delay: 4s;
          -moz-animation-iteration-count: 5;

          -o-animation-duration: 3s;
          -o-animation-delay: 4s;
          -0-animation-iteration-count: 5;

          -ms-animation-duration: 3s;
          -ms-animation-delay: 4s;
          -ms-animation-iteration-count:5;

          animation-duration: 3s;
          animation-delay: 4s;
          animation-iteration-count: 5;
	}
```
## 动画结束触发函数：
```js
	$(".test").click(function(){
          $(this).addClass('animated fadeOut');
	});
	var animateEnd=(function(el){
	    var animations={
	        animation:'animationend',
	        OAnimation:'oAnimationEnd',
	        MozAnimation:'mozAnimationEnd'
	        WebktiAnimation:'webkitAnimationEnd'
	    }
	    for(var i in animations){
	        if(el.style[i]!==undefined){
	            return animations[i]
	        }
	    }
	})(document.createElement('div'));//通过任意元素检测浏览器内核类型
	$('.test').one(animateEnd, doSomething);
	//$.one():为元素的特定事件绑定一个一次性的事件处理函数。
```

## 将以上过程整合为Jq扩展函数
```
jq自定义函数
$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = (function (el) {
            var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            };
            for (var t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        })(document.createElement('div'));
        this.addClass('animated ' + animationName).one(animationEnd, function () {
            //某些动画效果执行完后元素不可见又需要这个元素（实际遇过这个问题）
            //eg.淡出、向左滑动等等，
	        //可能需要将 class 删除
            $(this).removeClass('animated ' + animationName);
            if (typeof callback === 'function') callback();
        });
        return this;
    },
});
$('#yourElement').animateCss('bounce');
$('#yourElement').animateCss('bounce', function () {
    // 事件结束触发的函数
});
```

---
    为什么不自己写动画？
    别人比你写的好啊小辣鸡。