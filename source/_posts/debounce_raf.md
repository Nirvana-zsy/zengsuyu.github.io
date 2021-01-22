---
title: 【css-tricks译文】动画demo解释 防抖、节流、rAF
categories:
    - 10技术 | 前端性能
tags:
date: 2020-12-30
description: 这三种技术用于优化事件处理函数，都很有用，且各有区别，互相补充。
toc: 1
top: 0
status: Done
img: https://scarsu.oss-cn-shanghai.aliyuncs.com/picgo20201230185155.png
---

原文链接：[防抖与节流的区别](https://css-tricks.com/debouncing-throttling-explained-examples/)

译者注：为了文章更易理解，对原文略有改动

---

**防抖**与**节流**是两种相似（但不同）的技术，用于控制一定时间内函数的执行次数。

当我们为`DOM`事件添加事件处理函数时，防抖或节流函数十分有用。为什么呢？因为我们并不能控制`DOM`事件被触发的频率，而防抖和节流在事件和事件处理函数之间，为我们添加了一个控制层。

例如`scroll`事件，看这个demo：

<iframe height="265" style="width: 100%;" scrolling="no" title="Scroll events counter" src="https://codepen.io/dcorb/embed/PZOZgB?height=265&theme-id=dark&default-tab=css,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dcorb/pen/PZOZgB'>Scroll events counter</a> by Corbacho
  (<a href='https://codepen.io/dcorb'>@dcorb</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


当使用触控板，滚轮，或者滚动条滚动时，每秒钟可以轻易地触发30个事件。但是在我的测试中，在手机中缓慢滑动屏幕，每秒可以触发多达100个事件。你能确保你的事件处理函数在这种执行频率下正常工作吗？

2011年，Twitter网站上出现了一个问题：当你在向下滚动Twitter feed时，网页变得缓慢且无响应。John Resig发表了[一篇关于这个问题的博客](http://ejohn.org/blog/learning-from-twitter)，文章中解释了将消耗昂贵的函数直接附加到`scroll`事件上是多么的糟糕。

John建议的解决方案（当时是五年前）是在`onScroll`事件之外，每隔250ms运行一个循环。这样处理程序就不会与事件耦合。通过这个简单的技术，我们可以避免破坏用户体验。

现如今，有一些更复杂一些的处理事件的方法。让我给大家介绍一下`Debounce`、`Throttle`和`requestAnimationFrame`，以及相应的demo。

## **Debounce 防抖**

`Debounce` 防抖技术允许我们将多次连续的执行"分组"到一次单一的执行中。

![https://i0.wp.com/css-tricks.com/wp-content/uploads/2016/04/debounce.png](https://i0.wp.com/css-tricks.com/wp-content/uploads/2016/04/debounce.png)

想象一下这样的场景，你在电梯里，电梯门开始关闭，突然有另一个人想上电梯，电梯则不会运行，门会再次打开。然后又有一个人要上电梯，电梯再次延迟了它的运行（移动楼层），但优化了它的资源。

可以在下面的示例中，尝试在顶部的“Trigger area”中点击或移动：

<iframe height="265" style="width: 100%;" scrolling="no" title="Debounce. Trailing" src="https://codepen.io/dcorb/embed/KVxGqN?height=265&theme-id=dark&default-tab=css,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dcorb/pen/KVxGqN'>Debounce. Trailing</a> by Corbacho
  (<a href='https://codepen.io/dcorb'>@dcorb</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

在上面的示例中可以看到，`debounced`事件是如何代替一组连续快速触发事件的。但如果事件的触发有很大的时间间隔，则不会发生`debouncing`。（可以这样理解，如果一直有人要上电梯，电梯就不会运行，直到等待一定时间内无人上电梯，电梯就会开始运行，在上述的示例中，这个*等待时间*被设定为四个刻度，也就是400ms）

## l**eading / immediate 参数**

在上述的示例中，`debouncing`事件需要*等待*，直到事件在一定时间内停止触发，才会执行函数。这种场景与等电梯的场景吻合。

如果有另一种场景，需要在事件触发时，就立即执行函数，在快速连续触发的过程中，直到有一个暂停(满足*等待时间*)，才会再次执行函数。

这种需求，可以通过`leading`参数来实现：（在underscore.js中，这个参数的名称叫 `immediate` ）

![https://i2.wp.com/css-tricks.com/wp-content/uploads/2016/04/debounce-leading.png](https://i2.wp.com/css-tricks.com/wp-content/uploads/2016/04/debounce-leading.png)

“`leading`”防抖的demo：

<iframe height="265" style="width: 100%;" scrolling="no" title="Debounce. Leading" src="https://codepen.io/dcorb/embed/GZWqNV?height=265&theme-id=dark&default-tab=css,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dcorb/pen/GZWqNV'>Debounce. Leading</a> by Corbacho
  (<a href='https://codepen.io/dcorb'>@dcorb</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## **Debounce 实现**

我第一次看到debounce的Javascript实现是2009年，在[John Hann的这篇文章](http://unscriptable.com/2009/03/20/debouncing-javascript-methods/)中（他也是这个词的发明者）。

不久之后，Ben Alman创建了[一个jQuery插件](http://benalman.com/projects/jquery-throttle-debounce-plugin/)（不再维护），一年之后，Jeremy Ashkenas将其[添加到了underscore.js]()中。后来，它又被添加到Lodash中，成为undererscore的替代方案。

这3种实现内部有些不同，但它们的接口都差不多。

曾经有一段时间，在我于2013年发现`_.debounce`函数中的[一个bug]()之后，underscore采用了Lodash的`debounce` / `throttle`实现。从那时起，两种实现都有了长足的发展。

Lodash在其`_.debounce`和`_.throttle`函数中 [增加了](https://lodash.com/docs#debounce) 更多的功能。原来的`immediate` 标志被替换为`leading` 和`trailing` 选项。你可以选择启用一个，或者两个。默认情况下，只有`trailing` 被启用。（leading可以理解为，在一组连续触发事件的起始，就调用函数；而trailing，则是在一组连续触发事件的末尾，经过*等待时间*后，执行函数）

还有一个新的`maxWait`选项（目前只在Lodash中使用）在本文中没有涉及，但它可能非常有用。

实际上，在Lodash的源码种，`throttle`节流函数是用通过`_.debounce`和`maxWait`选项来定义的。

## **Debounce 实例**

### **Resize 实例**

当调整(桌面端)浏览器窗口的大小时，可能会触发许多的`resize`事件。

可以在下面的demo中看到：

<iframe height="265" style="width: 100%;" scrolling="no" title="Debounce Resize Event Example" src="https://codepen.io/dcorb/embed/XXPjpd?height=265&theme-id=dark&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dcorb/pen/XXPjpd'>Debounce Resize Event Example</a> by Corbacho
  (<a href='https://codepen.io/dcorb'>@dcorb</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

如你所见，上面的例子中，启用了默认的`trailing`选项，因为我们只关心用户停止resize后的最终值。

### 带有AJAX请求的自动填充输入框的输入事件

有一些场景例如等待用户停止输入后再验证其输入，反馈验证信息。这种场景下 `_.debounce`可以实现：只有当用户停止输入时才发送请求。

此时，`leading` 标志没有意义，因为我们需要等待至最后的输入。

<iframe height="265" style="width: 100%;" scrolling="no" title="Debouncing keystrokes Example" src="https://codepen.io/dcorb/embed/mVGVOL?height=265&theme-id=dark&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dcorb/pen/mVGVOL'>Debouncing keystrokes Example</a> by Corbacho
  (<a href='https://codepen.io/dcorb'>@dcorb</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 如何使用**debounce 和 throttle 以及 常见陷阱**

你可以自己写`debounce`/`throttle`函数，或者从一些随机的博客文章中复制它，但我的建议是直接使用 `underscore` 或 `Lodash`库。

如果你只需要`_.debounce`和`_.throttle`函数，你可以使用Lodash自定义构建器来输出一个自定义的2KB minified库。下面时构建命令：

```bash
npm i -g lodash-cli
lodash include = debounce, throttle
```

也就是说，大多数人都是通过webpack/browserify/rollup工具，使用模块化形式的`lodash/throttle`和`lodash/debounce`或`lodash.throttle`和`lodash.debounce`包。

一个常见的陷阱是，多次调用`_.debounce` 函数：

```
// WRONG
$(window).on('scroll', function() {
   _.debounce(doSomething, 300); 
});

// RIGHT
$(window).on('scroll', _.debounce(doSomething, 200));
```

在lodash 和 underscore.js中，为debounced饭都处理过的函数创建一个变量，可以调用私有方法 `debounced_version.cancel()`

```
var debounced_version = _.debounce(doSomething, 200);
$(window).on('scroll', debounced_version);

// If you need it
debounced_version.cancel();
```

## **Throttle 节流**

通过使用 `_.throttle`, 可以限制函数在 X 毫秒内，最多只能执行一次。

与`debouncing`的主要区别在于，节流保证了函数的定期执行，至少每X毫秒一次。

## **Throttling 实例**

### **无限滚动**

举一个很常见的例子，用户正在向下滚动你的无限滚动页面。你需要检查用户离底部有多远。如果用户在底部附近，我们应该通过Ajax请求更多的内容，并将其添加到页面中。

在这种场景下，`_.debounce`就不适用了，它只有在用户停止滚动时才会触发......而我们需要在用户到达底部之前开始获取内容。而`_.throttle`可以保证我们不断地检查用户离底部有多远。

<iframe height="265" style="width: 100%;" scrolling="no" title="Infinite scrolling throttled" src="https://codepen.io/dcorb/embed/eJLMxa?height=265&theme-id=dark&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dcorb/pen/eJLMxa'>Infinite scrolling throttled</a> by Corbacho
  (<a href='https://codepen.io/dcorb'>@dcorb</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## **requestAnimationFrame (rAF)**

`requestAnimationFrame` 是限制函数执行速度的另一种方式。

它相当于`_.throttle(dosomething, 16)`，但保真度要高很多，因为它是浏览器原生的API，拥有更好的准确性。

可以考虑使用`rAF` API，作为节流函数的替代品，以下是它的优缺点：

### 优点：

- 目标为60fps(即每秒60帧)，但是由浏览器内部机制决定如何安排渲染的最佳时间。
- 更简单和更标准的API，未来不会改变，更好维护。

### 缺点：

- rAFs的启用/取消是我们的责任，不像`debounce`或`throttle`，是内部管理的。
- 如果浏览器标签页未激活，它就不会被执行。（对于滚动、鼠标或键盘事件来说，这并不重要）。
- 虽然所有的现代浏览器都提供了RAF，但在IE9、Opera Mini和旧的Android中仍然不支持。仍然需要[polyfill](https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/) 。

根据经验来讲，如果我的JavaScript函数是 "绘画 "，或者会直接变更动画相关属性，我会使用`requestAnimationFrame`，以及在一切涉及重新计算元素位置的地方使用它。

如果要进行Ajax请求，或者决定是否添加/删除一个class（可能会触发CSS动画），我会考虑`_.debounce`或`_.throttle`，因为可以设置更低的执行速率（例如200ms，而不是16ms）。

### **rAF 实例**

这个demo灵感来自于 [Paul Lewis的文章](https://www.html5rocks.com/en/tutorials/speed/animations/), 文章做他详细解释了demo中的原理和逻辑。

我把`rAF`和  `16ms 的_.throttle` 放在一起进行了比较，结果是它们的性能相似。但是在更复杂的情况下，rAF可能性能会更高。

<iframe height="265" style="width: 100%;" scrolling="no" title="Scroll comparison requestAnimationFrame vs throttle" src="https://codepen.io/dcorb/embed/pgOKKw?height=265&theme-id=dark&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dcorb/pen/pgOKKw'>Scroll comparison requestAnimationFrame vs throttle</a> by Corbacho
  (<a href='https://codepen.io/dcorb'>@dcorb</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

我在headroom.js库里见到过`rAF`技术更高级的实例，其中的 [逻辑被解耦](https://github.com/WickyNilliams/headroom.js/blob/3282c23bc69b14f21bfbaf66704fa37b58e3241d/src/Debouncer.js) 并且被包装在了对象中。

## 总结

`debounce`防抖, `throttle` 节流和 `requestAnimationFrame` 可以用来优化事件处理函数，三种技术都很有用，且各有区别，互相补充：

- **debounce防抖:** 将快速连续的多次事件触发分组，归为一次执行。
- **throttle节流:** 确保每隔X 毫秒就有一次稳定的执行，例如每200ms检查一次用户滚动位置以触发一个CSS动画。
- **requestAnimationFrame:** 节流函数的16ms替代选择。更适用于在页面上重新计算/渲染元素的函数，能得到更平滑的动画。但是注意: IE9 不支持。