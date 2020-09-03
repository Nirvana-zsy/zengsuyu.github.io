---
title: Vue3响应式原理
categories:
    - 10技术 | JavaScript # 一级分类
tags:
date: 2020-07-24
description: vue2 & vue3 响应式原理对比，手写mini版vue3响应式代码
toc: 1
top: 0
---
## 关于Vue3

话说，Vue3已经进行到rc4版本了，4月份beta发布的时候前端圈红红火火，不知道大家开始学了没

整理了一些资源，现在开始学习应该还不算晚[狗头]

- [vue-next仓库](https://github.com/vuejs/vue-next)
- [20200723 Vue3 官方发布的beta文档](https://v3.vuejs.org/)
- [Vue3 Roadmap & FAQ](https://github.com/vuejs/vue/projects/6)
- [Vue3仓库已经合并的780多个PR](https://github.com/vuejs/vue-next/pulls?q=is%3Apr+is%3Amerged)
- [尤大在Vue Mastery的Vue3课：Vue 3 Deep Dive with Evan You](https://www.vuemastery.com/courses/vue3-deep-dive-with-evan-you/vue3-overview)
- [202007 尤大在前端会客厅节目关于Vue3的访谈](https://www.bilibili.com/video/BV1qC4y18721)
- [202005 The process: Making Vue 3](https://increment.com/frontend/making-vue-3/)
- [202004 尤大 - 聊聊 Vue.js 3.0 Beta 官方直播](https://www.bilibili.com/video/BV1Tg4y1z7FH)
- [2018 VueConf 杭州 尤大关于Vue3的演讲视频](https://www.bilibili.com/video/BV1Et41197L4)

## vue2 响应式原理回顾

- 对象响应化：遍历每个key，通过 `Object.defineProperty` API定义getter，setter

```jsx
// 伪代码
function observe(){
	if(typeof obj !='object' || obj == null){
		return
	}
	if(Array.isArray(obj)){
		Object.setPrototypeOf(obj,arrayProto)
	}else{
    const keys = Object.keys()
    for(let i=0;i<keys.length;i++){
      const key = keys[i]
      defineReactive(obj,key,obj[key])
    }
	}
}
function defineReactive(target, key, val){
  observe(val)
  Object.defineProperty(obj, key, {
    get(){
      // 依赖收集
      dep.depend()
      return val
    },
    set(newVal){
      if(newVal !== val){
        observe(newVal)
        val = newVal
        // 通知更新
        dep.notify()
      }
    }
  })
}
```

- 数组响应化：覆盖数组的原型方法，增加通知变更的逻辑

```jsx
// 伪代码
const originalProto = Array.prototype
const arrayProto = Object.create(originalProto)
['push','pop','shift','unshift','splice','reverse','sort'].forEach(key=>{
	arrayProto[key] = function(){
		originalProto[key].apply(this.arguments)
		notifyUpdate()
	}
})
```

## vue2响应式痛点

- 递归，消耗大
- 新增/删除属性，需要额外实现单独的API
- 数组，需要额外实现
- Map Set Class等数据类型，无法响应式
- 修改语法有限制

## vue3响应式方案

使用ES6的 **[`Proxy`](https://es6.ruanyifeng.com/#docs/proxy)** 进行数据响应化，解决上述Vue2所有痛点

Proxy可以在目标对象上加一层拦截/代理，外界对目标对象的操作，都会经过这层拦截

相比 `Object.defineProperty` ，Proxy支持的对象操作十分全面：get、set、has、deleteProperty、ownKeys、defineProperty......等等

```jsx
// reactive 伪代码
function reactice(obj){
  return new Proxy(obj,{
    get(target, key, receiver){
      const ret = Reflect.get(target, key, receiver)
      return isObject(ret) ? reactice(ret) : ret
    },
    set(target, key, val, receiver){
      const ret = Reflect.set(target, key, val, receiver)
      return ret
    },
    deleteProperty(target, key){
      const ret = Reflect.deleteProperty(target, key)
      return ret
    },
  })
}
```

## 响应式原理

![vue3响应式原理图](/images/vue3/reactive.png)

- 通过 **`effect`**  声明依赖响应式数据的函数cb ( 例如视图渲染函数render函数)，并执行cb函数，执行过程中，会触发响应式数据 `getter`
- 在响应式数据 `getter`中进行 `track`依赖收集：建立 **数据&cb** 的映射关系存储于 `targetMap`
- 当变更响应式数据时，触发 `trigger` **，**根据 `targetMap` 找到关联的cb执行
- 映射关系 `targetMap` 结构：

```jsx
targetMap: WeakMap{ 
	target:Map{ 
		key: Set[cb1,cb2...] 
	}
}
```

## 手写vue3响应式

大致结构

```jsx
// mini-vue3.js

/* 建立响应式数据 */
function reactice(obj){}

/* 声明响应函数cb(依赖响应式数据) */
function effect(cb){}

/* 依赖收集：建立 数据&cb 映射关系 */
function track(target,key){}

/* 触发更新：根据映射关系，执行cb */
function trigger(target,key){}
```

### reactive

```jsx
/* 建立响应式数据 */
function reactive(obj){
  // Proxy:http://es6.ruanyifeng.com/#docs/proxy
  // Proxy相当于在对象外层加拦截
  // Proxy递归是惰性的,需要添加递归的逻辑
  
  // Reflect:http://es6.ruanyifeng.com/#docs/reflect
  // Reflect:用于执行对象默认操作，更规范、更友好,可以理解成操作对象的合集
  // Proxy和Object的方法Reflect都有对应
  if(!isObject(obj)) return obj
  const observed = new Proxy(obj,{
    get(target, key, receiver){
      const ret = Reflect.get(target, key, receiver)
      console.log('getter '+ret)
      // 跟踪 收集依赖
      track(target, key)
      return reactive(ret)
    },
    set(target, key, val, receiver){
      const ret = Reflect.set(target, key, val, receiver)
      console.log('setter '+key+':'+val + '=>' + ret)
      // 触发更新
      trigger(target, key)
      return ret
    },
    deleteProperty(target, key){
      const ret = Reflect.deleteProperty(target, key)
      console.log('delete '+key+':'+ret)
      // 触发更新
      trigger(target, key)
      return ret
    },
  })
  return observed
}
```

### effect

```jsx
/* 声明响应函数cb */
const effectStack = []
function effect(cb){

  // 对函数进行高阶封装
  const rxEffect = function(){
    // 1.捕获异常
    // 2.fn出栈入栈
    // 3.执行fn
    try{
      effectStack.push(rxEffect)
      return cb()
    }finally{
      effectStack.pop()
    }
  }

  // 最初要执行一次,进行最初的依赖收集
  rxEffect()

  return rxEffect
}
```

### track

```jsx
/* 依赖收集：建立 数据&cb 映射关系 */
const targetMap = new WeakMap()
function track(target,key){
  // 存入映射关系
  const effectFn = effectStack[effectStack.length - 1]  // 拿出栈顶函数
  if(effectFn){
    let depsMap = targetMap.get(target)
    if(!depsMap){
      depsMap = new Map()
      targetMap.set(target, depsMap)
    }
    let deps = depsMap.get(key)
    if(!deps){
      deps = new Set()
      depsMap.set(key, deps)
    }
    deps.add(effectFn)
  }
}
```

### trigger

```jsx
/* 触发更新：根据映射关系，执行cb */
function trigger(target, key){
  const depsMap = targetMap.get(target)
  if(depsMap){
    const deps = depsMap.get(key)
    if(deps){
      deps.forEach(effect=>effect())
    }
  }
}
```

### 测试demo

```jsx
<!-- test.html -->
<div id="app">
 {{msg}}
</div>

<script src="./mini-vue3.js"></script>

<script>
  // 定义一个响应式数据
  const state = reactive({
    msg:'message'
  })

  // 定义一个使用到响应式数据的 dom更新函数
	function updateDom(){
		document.getElementById('app').innerText = state.msg
	}

	// 用effect声明更新函数
  effect(updateDom)

  // 定时变更响应式数据
  setInterval(()=>{
    state.msg = 'message' + Math.random()
  },1000)
</script>
```

效果：

![](/images/vue3/demo.png)


如果想获取上述代码，放在了这个[仓库:mini-vue3-reactive](https://github.com/scarsu/mini-vue3-reactive)