---
title: 结合Event Loop谈谈对Vue中nextTick的理解
categories:
    - 10技术 | JavaScript # 一级分类
tags:
date: 2020-06-10
description: tick这个词到底时什么意思😯？
toc: 1
top: 0
---
## 带着问题看这篇文章
- tick这个单词有点抽象,应该怎么理解?
- 通过nextTick包装的回调,到底何时执行?
- nextTick存在的意义是什么?

## event loop 中任务执行顺序

1. 同步代码执行，直至调用栈清空
2. microtask：调用栈清空后，优先执行**所有**的microtask，如果有新的microtask，**继续执行新microtask，**直至microtask queue清空（**微任务**）
3. task queue：执行task queue第一个任务，后续的task暂不处理（**宏任务**）
4. 每当调用栈清空后，重复2-3步骤

（关于 Event Loop的细节,我写过一篇很详细的总结[试图解释清楚Javascript Event Loop](https://www.scarsu.com/event_loop/)。）

## 微任务与宏任务
根据event loop的执行机制,微任务的调度优先级比宏任务高.

微任务异步API:Promise.then,MutationObserver

宏任务异步API:setTimeout,MessageChannel,postMessage,setImmediate

## Vue中nextTick的实现

vue中的 nextTick 实现在 util 模块的单个文件中，代码总共100多行：

```javascript
// src\core\util\next-tick.js

import { noop } from 'shared/util'
import { handleError } from './error'
import { isIE, isIOS, isNative } from './env'

const callbacks = []
let pending = false

function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

let timerFunc

// nextTick行为利用了微任务队列，微任务队列可以通过原生Promise.then或MutationObserver访问到。 
// MutationObserver具有更广泛的支持，但是在iOS> = 9.3.3中的UIWebView中，在触摸事件处理程序中触发时会发生错误。触发几次后，它将完全停止工作
// 因此，如果原生Promise可用，优先使用Promise：

if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    // 在有问题的UIWebViews中，会出现奇怪的状态：微任务队列中有回调但是不被清空，直到浏览器有其他任务，例如处理计时器
    // 因此此处使用一个空计时器，来强制触发微任务队列执行
    if (isIOS) setTimeout(noop)
  }
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // setImmediate,宏任务,但是相比 setTimeout 是个更好的选择
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  // setTimeout 0 宏任务
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```

源码中, `Vue.nextTick/vm.$nextTick` 的具体逻辑：

- 定义一个 `callbacks` 数组，用于存储 nextTick 接口传来的回调函数们
- 定义一个 `flushCallbacks`  方法，用于遍历执行 callbacks 数组中的所有回调函数
- 调用 `timerFunc` 方法，将 flushCallbacks  方法作为回调任务，添加到异步队列
- timerFunc由环境决定，**微任务**优先，宏任务作为折衷方案， `Promise.then > MutationObserver > setImmediate > setTimeout 0` 

**一句话总结**：将回调作为异步任务，添加到(微/宏)任务队列，在当前调用栈清空后再执行。

## 对nextTick这个词的理解

对于**tick**我的理解是:`每次从调用栈开始有函数帧，直到调用栈被清空为止的过程`，这个过程可能是：

- 页面初始加载时**同步脚本执行**的过程
- 也可能是任何一个**异步任务回调执行**的过程

对于**nextTick(cb)**：回调函数cb不在当前调用栈执行期间立即执行，而是被立即添加在任务队列中，在当前调用栈清空后执行。

使用nextTick的目的：必须等待当前调用栈的后续代码执行完，才能执行回调，例如这种情况:回调函数中,需要依赖上一个调用栈操作后的某些状态。

**举个例子：**

画一个 echarts 图表，希望根据数据的长度来动态调整图表的宽度


```
..
<template>
	<div id="chart" :style='{width:chartWidth,height:"200px"}' 
</template>

...
this.chartWidth = getWidthByData(data)
this.nextTick(()=>{
	let chart= echarts.init(document.getElementById('chart'))
	chart.setOption({...})  //echarts渲染
})
```
宽度属性chartWidth存在vue data中，由于vue data是`响应式`的，变更data值后，div#chart的宽度并不是立即变更的，中间存在一系列过程：

- chartWidth 属性上的 descriptor `setter` 向其依赖的(vue组件的`renderWatcher`)发布更新
- watcher 的更新也是一个**异步**过程（queueWatcher，通过nextTick来调度）

因此在chartWidth变更后，对应的dom宽度不是立即更新的，此时如果立即执行echarts的渲染工作，会导致echarts不能按照最新宽度来渲染。