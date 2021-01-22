---
title: 【css变量】css自定义属性
categories:
    - 10技术 | CSS
tags:
date: 2020-09-25
description: 原生js控制css变量、Vue3响应式css变量
toc: 0
img: https://scarsu.oss-cn-shanghai.aliyuncs.com/picgo20201211224029.png
status: Done
---


## 资源

- [文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)
- [在线demo](https://codepen.io/zsy/pen/WNwPWxB)
- [vue3 css变量文档](https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-style-variables.md)


### 是什么

CSS自定义属性、CSS变量、级联变量，可以文档中重复使用的样式变量

## 声明

- 声明一个自定义属性，属性名需要以两个减号（--）开始
- 大小写敏感
- 属性值则可以是任何有效的CSS值。
- 和其他属性一样，自定义属性也是写在**规则集**之内的
- 例子🌰：

    ```css
    element {
      --main-bg-color: brown;
    }
    ```

- **规则集**所指定的选择器 定义了自定义属性的可见**作用域**
- 自定义属性具有**继承性**，受级联的约束，从其父级继承其值。
- **最佳实践**💁‍♀️：根伪类`:root`，相当于全局变量

    ```css
    :root {
      --main-bg-color: brown;
    }
    ```

## 使用变量

`color: var(--main-color);`

## 备用值 / 默认值

```jsx
// 正确做法
var(--my-var, red)
var(--my-var, var(--my-background, pink))

// 错误做法
var(--my-var, --my-background, pink)
```

## js更新变量

```jsx
// 获取一个 Dom 节点上的 CSS 变量
element.style.getPropertyValue("--my-var");

// 获取任意 Dom 节点上的 CSS 变量
getComputedStyle(element).getPropertyValue("--my-var");

// 修改一个 Dom 节点上的 CSS 变量
element.style.setProperty("--my-var", newValue);
```

## Vue3 响应式css变量

```jsx
<template>
  <div class="text">hello</div>
</template>

<script>
export default {
  data() {
    return {
      color: 'red'
    }
  }
}
</script>

<style vars="{ color }">
.text {
  color: var(--color);
}
</style>
```
