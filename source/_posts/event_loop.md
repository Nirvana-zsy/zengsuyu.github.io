---
title: 万字长文解释【Javascript Event Loop & 异步机制】
categories:
    - 06 JavaScript # 一级分类
tags:
date: 2020-06-08
description: 万字长文 + 动图 + 实例，解释清楚：Javascript Event Loop如何调度异步任务
toc: 1
top: 0
---
## 这篇文章解决的问题
- 我们写的各种回调什么时候执行？
- setTimeout(cb,0)和Promise.resolve().then(cb)哪个先执行？
- Javascript的单线程如何实现异步并发？
- Event Loop到底是如何调度任务？
- 如何利用RAF优化性能？
- 下面这段代码输出是什么？回答不对的请看完这篇文章~

```javascript
console.log(1);
setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3)
  });
});
new Promise((resolve, reject) => {
  console.log(4)
  resolve(5)
}).then((data) => {
  console.log(data);
})
setTimeout(() => {
  console.log(6);
})
console.log(7);

// 结果：1475236 
```

## 参考资料
- HTML规范： [https://www.w3.org/TR/html5/webappapis.html#event-loops](https://www.w3.org/TR/html5/webappapis.html#event-loops)
- NodeJS Event Loop 文档： [https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/#what-is-the-event-loop](https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/#what-is-the-event-loop)
- mdn相关文档：[https://developer.mozilla.org/zh-CN/docs/Glossary/Call_stack](https://developer.mozilla.org/zh-CN/docs/Glossary/Call_stack)
- Jake Archibald在JSConf.Asia的演讲视频【In The Loop】,很值得看： [https://www.youtube.com/watch?v=8aGhZQkoFbQ&feature=emb_title](https://www.youtube.com/watch?v=8aGhZQkoFbQ&feature=emb_title)
- Philip Roberts在JSConf的演讲视频【What the heck is the event loop anyway】,很值得看： [https://www.youtube.com/watch?v=8aGhZQkoFbQ&feature=emb_title](https://www.youtube.com/watch?v=8aGhZQkoFbQ&feature=emb_title)
- Philip Roberts做的Event Loop可视化网站： [http://latentflip.com/loupe/](http://latentflip.com/loupe/)
- [JS Runtime运行时 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)
<!-- - 博客： [https://segmentfault.com/a/1190000016278115?utm_source=tag-newest](https://segmentfault.com/a/1190000016278115?utm_source=tag-newest) -->
<!-- - 博客： [https://www.jianshu.com/p/d4b5170a5c94](https://www.jianshu.com/p/d4b5170a5c94) -->

## JS Runtime运行时


### call stack 调用栈

- 定义：调用栈是浏览器的JavaScript解释器追踪**函数执行流**的一种机制，函数调用形成了一个由若干帧组成的栈。（栈的特点是后进先出）
- 作用：通过调用栈，我们能够追踪：哪个函数正执行；执行的函数体中又调用了哪个函数；以及每一帧的上下文+作用域
- 机制：
    - 每调用一个函数，就把该函数添加进调用栈并执行
    - 如果正在调用的函数还调用了其他函数，把新函数也添加到调用栈中，立即执行
    - 执行完毕后，解释器会将函数清除出栈，继续执行当前执行环境下剩余的代码
    - 当分配的调用栈被占满时，会引发“**Stack Overflow堆栈溢出**”错误

### heap 堆

**堆**一大块内存区域（通常是非结构化的)，对象被分配在堆中

### task queue 队列

JS运行时包含了一个**消息队列**，每个消息队列关联着一个用于处理这个消息的回调函数。（队列的特点是先进先出）

1. 当调用栈为空时，event loop会消息队列中的下一个消息
2. 被处理的消息被移出队列，
3. 消息被作为参数调用与之关联的回调函数
4. 同时为该函数调用向调用栈添加一个新的栈帧
5. 调用栈再次为空时，event loop会重复1-4步骤

### Single Thread 单线程

- 单线程 = 单调用栈 = one thing at a time，不能并发，一次只能做一件事
- 为什么单线程能实现异步和并发？
- 因为单线程指的是js runtime
- 而浏览器和Node提供了API，使我们可以调用其他线程去做并发的异步任务，例如网络请求、DOM、setTimeout
非阻塞

### Non-blocking 非阻塞

- blocking：阻塞，是指浏览器在等待耗时长的代码(eg.网络请求,I/O)期间，不能处理任何其他事情，包括用户响应。
- 解决阻塞的方法：异步任务
- 异步任务怎么实现的？依赖的就是**异步API**和**event loop事件循环**
- JavaScript的事件循环模型与许多其他语言不同的一个非常有趣的特性是，它**永不阻塞**，所以当一个应用正等待一个异步任务时，它仍然可以处理其它事情，比如用户输入。
- 由于历史原因有一些**例外**，如 `alert` 或者`同步 XHR`，但应该尽量避免使用它们。注意，[例外的例外也是存在的](https://stackoverflow.com/questions/2734025/is-javascript-guaranteed-to-be-single-threaded/2734311#2734311)（但通常是实现错误而非其它原因）。

### **不被抢占**

每个消息被完整的执行后，其他消息才会被执行。

优点：当一个函数执行时，它不会被抢占，只有在它运行完毕后才会去运行其他代码，才能修改这个函数操作的数据。

缺点：当一个消息需要太长时间才能处理完，浏览器就无法处理用户交互,eg.滚动和点击，这也是性能较差的网页“卡顿现象”的原因。

因此良好的操作方式是：缩短单个消息处理时间，在可能的情况下尽量将一个消息裁剪成多个消息。以保证浏览器 `60 frames per second` 的流畅渲染，即每个消息处理时间 < 1000ms/60=16ms，

## Event Loop 事件循环

**event loop是一个执行模型，在不同的地方有不同的实现。浏览器和NodeJS基于不同的技术实现了各自的Event Loop。**

- 浏览器的Event Loop模型是在[html5的规范](https://www.w3.org/TR/html5/webappapis.html#event-loops)中明确定义的，具体的实现由浏览器厂商来做。
- NodeJS的Event Loop是基于libuv实现的。可以参考Node的[官方文档](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)以及libuv的[官方文档](http://docs.libuv.org/en/v1.x/design.html)。

### **浏览器EventLoop运行机制（不考虑micro task）**

- 所有同步任务都在**主线程**上执行，形成一个**call stack**调用栈
- 可以通过**浏览器API**调用 运行在其他线程的**异步任务**
- 主线程之外，存在一个待处理消息的**消息队列task queue**。每一个消息都关联着一个用以处理这个消息的回调函数。
- 当主线程调用栈中的所有同步任务执行完毕，系统就会读取task queue，取最先进的消息作为参数，将其关联的回调函数放入主线程调用栈中执行

### 原理图

![](/images/event-loop/Untitled%204.png)

### **添加消息**

- 浏览器中，如果一个事件有事件监听器，事件被触发后，一个消息就会被添加到消息队列中。
- 除了事件，浏览器提供的其他API，例如setTimeout、xhr等异步任务，都会在任务结束后向消息队列添加消息

### **setTimeout(fn,n)**

- `setTimeout` 中的第二个参数n是指 消息被加入消息队列的最小延迟
- 因此，不是保证回调在n毫秒内必须执行，而是保证回调在n毫秒之后被添加到消息队列，具体什么时候执行，取决于消息队列中待处理的消息 和 调用栈中已有的函数。
- **零延迟**：`setTimeout 0` 的作用：将回调立即放入消息队列，而不是0s内立即执行

### debug 一个 demo

```jsx
// demo
function bar(){
    debugger
    console.log('bar')
    foo()
}
function foo(){
    debugger
    console.log('foo')
    setTimeout(function(){
        debugger
        console.log('setTimeout')
    },1000)
}
(function all(){
    debugger
    console.log('anounymous')
    bar()
})()
```

![](/images/event-loop/Untitled.png)

![](/images/event-loop/Untitled%201.png)

![](/images/event-loop/Untitled%202.png)

![](/images/event-loop/Untitled%203.png)


### webWorker & 跨运行时通信

- 每个 **WebWorker** 、跨域的 **iframe 、**浏览器不同窗口都有各自的运行时，即都有各自的 call stack 、heap、queue。
- 不同的运行时，可以通过 `[postMessage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)` 方法来通信。

**postMessage：**

```javascript
// eg. 当一个窗口可以获得另一个窗口的引用时，例如targetWindow = window.opener

otherWindow.postMessage(message, targetOrigin, [transfer]);
```

otherWindow:其他窗口的引用：

- iframe的contentWindow
- 执行window.open返回的窗口对象
- 通过window.frames获取到的子frame窗口对象

message：要发送到其他窗口的数据，会被`[结构化克隆算法](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)`序列化

targetOrigin：用来指定哪些窗口能接收到消息事件

transfer：一串和message 同时传递的 [`Transferable`](https://developer.mozilla.org/zh-CN/docs/Web/API/Transferable) 对象. 这些对象的所有权将被转移给消息的接收方，而发送一方将不再保有所有权。

**结构化克隆算法：**

用于克隆复杂对象

不能克隆：Error、Symbol、Function对象、DOM节点

不能克隆：属性的描述符、RegExp对象的 lastIndex字段、原型链上的属性

**Transferable对象：**

一个抽象接口，代表可以在不同可执行上下文中传递的对象。（抽象：没有定义任何属性和方法）

不同执行上下文：例如主线程和webworker之间。

ArrayBuffer 、MessagePort 和 ImageBitmap 实现于此接口。

**接收消息：**

```jsx
window.addEventListener("message", receiveMessage, false);

function receiveMessage(event)
{
  // event.data：传递来的对象
  // event.origin：消息发送方窗口的origin
  // event.source：对消息发送窗口的引用
}
```

## UI Rendering Task

### 浏览器渲染 - Rendering Task步骤

- requestAnimationFrame
- style calculation计算样式
- layout计算布局
- paint渲染像素数据

### **render blocking 渲染阻塞**

具体来讲，如果js runtime的call stack一直不能清空，例如event loop将一个耗时的回调放进了call stack，会导致浏览器主线程被占用，无法执行render相关的工作，用户交互的事件也被添加在消息队列等待调用栈清空得不到执行，因此无法响应用户的操作，造成阻塞渲染的“卡顿”现象。

### 60FPS

在event loop处理消息队列时，我们提倡要缩短单个消息处理时间，在可能的情况下尽量将一个消息裁剪成多个消息，rendering  task可以在消息之间执行，以保证保证UI Rendering调用的频率能达到 `60 frames per second` （UI Rendering Task执行次数通常是每秒60次，但在大多数遵循W3C建议的浏览器中，回调函数执行次数通常与浏览器屏幕刷新次数相匹配。），即每次event loop处理消息执行回调所占用的时间 小于 16.67 毫秒。

demo1:

看下面这段代码，先 append 一个元素再设置display=none去隐藏这个元素，**不必担心**这个元素会闪现，因为这两行代码会在某一次event loop中执行，只有这两行代码执行完，并且清空了调用栈，才有可能执行下一次UI Render task

```jsx
document.body.appendChild(el)
el.style.display='none'
```

demo2:

下面这段代码，重复的显示隐藏一个元素，看起来开销很大，但其实在RenderingTask期间，只会取最终结果来渲染，

```jsx
button.addEventListener ('click,()=>{
box style. display='none';
	box style. display ='block';
	box style. display ='none';
	box style. display ='block';
	box style. display='none';
	box style. display ='block';
	box style. display ='none';
	box style. display ='block';
	box style. display ='none';
})
```

### requestAnimationFrame

- 简称RAF，是一个web api，要求浏览器在下一次重绘之前调用指定的回调函数，通常用于执行动画
- 通过RAF，使浏览器可以在单次回流和重绘中优化处理并发动画，每次UI刷新之前执行RAF，使动画帧率更高
- 当requestAnimationFrame() 运行在后台标签页或者隐藏的`<iframe>` 里时，requestAnimationFrame() 会被暂停调用以提升性能和电池寿命

demo1：requestAnimationFrame优化动画的一个例子

```jsx
// 使用RAF
function callback(){
	moveBoxForwardOnePixel();
	requestAnimationFrame(callback)
}
callback();

// 使用setTimeout
function callback(){
	moveBoxForwardOnePixel();
	setTimeout(callback,0)
}
```

效果：

![](/images/event-loop/preview.gif)

demo2：用RAF控制动画执行顺序，需求是box元素的水平位置变化：1000→500

```jsx
button addEventListener ('click,()=>{
	box.style.transform = 'translateX(1000px)'
	box.style.transition= 'tranform 1s ease-in-out'
	box.style.transform = 'translateX(500px)'
})

//由于上述代码会一起执行，
//因此渲染时，1000px会被忽略，浏览器会取500作为最终值，在下一帧渲染，
//因此上述代码的效果是：元素位移0->500

//换一种写法
button addEventListener ('click,()=>{
	box.style.transform = 'translateX(1000px)'
	box.style.transition= 'tranform 1s ease-in-out'
	
	requestAnimationFrame(()=>{
		box.style.transform = 'translateX(500px)'
	})
})
// 上述代码，1000的初始值是有效的，
//但是在下一次的rendering task期间，由于RAF先执行，因此500将1000覆盖
//最终渲染的效果还是元素位移：0->500

//如何令500在下下一次渲染再生效？嵌套调用RAF
button addEventListener ('click,()=>{
	box.style.transform = 'translateX(1000px)'
	
	requestAnimationFrame(()=>{
		requestAnimationFrame(()=>{
			box.style.transition= 'tranform 1s ease-in-out'
			box.style.transform = 'translateX(500px)'
		})
	})
})
```

## 可视化：event loop和rendering

### 理想的状态

![](/images/event-loop/Untitled%205.png)

### setTimeout的浪费

间隔调用setTimeout的效果：导致浪费

![](/images/event-loop/Untitled%206.png)

以前的动画仓库的处理方式：`setTimeout(animFrame, 1000/60)`

但是这种处理方式不稳定，可能会不准确，因为

![](/images/event-loop/Untitled%207.png)

![](/images/event-loop/Untitled%208.png)

### RAF的稳定有序状态

![](/images/event-loop/Untitled%209.png)

## Micro Task 微任务

**微任务，micro task，也叫jobs。**

### 微任务 异步类型

一些异步任务执行完成后，其**回调**会依次进入micro task queue，等待后续被调用，这些异步任务包括：

- **Promise.then**
- MutationObserver
- process.nextTick (Node独有)
- Object.observe

### 微任务阻塞浏览器

如果执行微任务期间，不停的有新的微任务，会导致浏览器阻塞

微任务的执行会因为JS堆栈的情况有所不同，根据调用栈是否清空去判断微任务是否会执行。看几个例子：

## ⭐event loop执行顺序(含micro task)

1. 同步代码执行，直至调用栈清空
2. micro task：调用栈清空后，优先执行**所有**的micro task，如果有新的micro task，**继续执行新micro task，**直至micro task queue清空
3. task queue：执行一个task，后续的task暂不处理
4. render task：执行完所有render task，新render task暂不处理

![](/images/event-loop/Untitled%2010.png)

![](/images/event-loop/event_loop.gif)

**test1：调用栈未清空，不执行micro task**

在控制台中执行一段代码，会当做同步代码来处理。listener1执行后，微任务队列+1，但是因为是同步执行的代码，所以会立即执行listener2，微任务队列+1，所以顺序是`listener1,listener2,microtsk1,microtask2`

![](/images/event-loop/Untitled%2011.png)

**test2:调用栈清空后，micro task 优先于 macro task执行**

同步执行两个setTimeout，会将 listener1和listener2加入到task queue，同步代码执行就结束。先执行listener1，将micro task1加入微任务队列，listener1执行完后，调用栈清空，即使这时候task queue还有listener2，也会先执行所有微任务，将所有微任务清空后，再执行listener2，因此输出顺序是 `listener1,microtsk1,listener2,microtask2`  

![](/images/event-loop/Untitled%2012.png)

**test3：同test2**

用户点击事件

由于点击事件会被添加到task queue，因此，这个 test3 的结果和 test2 结果相同

![](/images/event-loop/Untitled%2013.png)

**test4：同test1**

js调用click()事件

由于是在代码中手动执行click，所以会同步执行两个listener，因此test4和test1结构相同。

![](/images/event-loop/Untitled%2014.png)

**test5：micro 优先于 macro执行**

![](/images/event-loop/Untitled%2015.png)

**test6：综合实例**

```javascript
// 浏览器中执行
console.log(1);
setTimeout(() => {
  console.log(2);// callback2，setTimeout属于宏任务
  Promise.resolve().then(() => {
    console.log(3)// callback3，Promise.then属于微任务
  });
});
new Promise((resolve, reject) => {
  console.log(4)// 这里的代码是同步执行的
  resolve(5)
}).then((data) => {
  console.log(data);// callback5，Promise.then属于微任务
})
setTimeout(() => {
  console.log(6);// callback6，setTimeout属于宏任务
})
console.log(7);

// 结果：1475236 

// 逻辑：
147是同步执行，同步代码执行完后的queue：
	task queue：callback2，callback6
	micro task：callback5
此时调用栈已清空，优先执行微任务callback5，调用栈清空
再执行callback2，调用栈清空
此时的queue：
	task queue：callback6
	micro task：callback3
优先执行微任务callback3，调用栈清空
最后执行callback6
```

![](/images/event-loop/Untitled%2016.png)

**demo7：综合实例**

```javascript
console.log('main start');

setTimeout(() => {
		//cb1
    console.log('1');
    Promise.resolve().then(() => {
			//cb2
			console.log('2')
		});
}, 0);

Promise.resolve().then(() => {
		//cb3
    console.log('3');
    Promise.resolve().then(() => {
			//cb4
			console.log('4')
		});
});

console.log('main end');

//结果：
// main start，main end，3412

main start 和 main end同步执行，同步代码执行完后，调用栈清空，此时的queue：
	task queue：cb1
	micro queue：cb3
先执行微任务cb3，执行完后，调用栈清空，此时的queue：
	task queue：cb1
	micro queue：cb4
先执行微任务cb4，执行完后，调用栈清空，此时的queue：
	task queue：cb1
	micro queue：空
最后执行cb1，然后执行cb2
```

![](/images/event-loop/Untitled%2017.png)