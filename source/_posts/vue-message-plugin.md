---
title: Vue消息插件开发 & npm发布
categories:
    - 10技术 | JavaScript # 一级分类
tags:
date: 2020-05-14
description: 手写一个基于 Vue.js 的消息插件，按照 ElementUI / message的接口实现
toc: 1
top: 0
---

## vue-message-plugin
- 一个基于 Vue.js 的消息插件，按照 ElementUI / message的接口实现
- [插件地址](https://www.npmjs.com/package/vue-message-plugin)
- [源码地址](https://github.com/scarsu/vue-message-plugin)

![vue-message-plugin预览](/images/vue-message-plugin.gif)

## 源码目录结构

![vue-message-plugin源码目录结构](/images/vue-message-plugin.png)


## package.json配置

```jsx
{
  "name": "vue-message-plugin",
  "version": "1.0.0",
  "description": "A message plugin based on Vue.js which works like ElementUI/Message.",
  "author": "scarsu <scarsu001@gmail.com>",
  "private": false,//用于公开发布
  "license": "MIT",
  "main": "dist/vue-message-plugin.js",//npm引用入口
  "repository": {//仓库
    "type": "git",
    "url": "https://www.github.com/scarsu/vue-message-plugin"
  },
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server --open --hot",
    "build": "cross-env NODE_ENV=production webpack --progress --hide-modules"
  },
  "dependencies": {
    "vue": "^2.5.2"
  },
  "keywords": [
    "vue",
    "toast",
    "code",
    "vue plugin",
    "message",
    "vue-message-plugin"
  ],
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-env": "^1.6.0",
    "babel-preset-stage-3": "^6.24.1",
    "cross-env": "^5.0.5",
    "css-loader": "^0.28.7",
    "file-loader": "^1.1.4",
    "html-webpack-plugin": "^2.30.1",
    "vue-loader": "^13.0.5",
    "vue-template-compiler": "^2.4.4",
    "webpack": "^3.6.0",
    "webpack-dev-server": "^2.9.1"
  },
  "engines": {
    "node": ">= 6.0.0",
    "npm": ">= 3.0.0"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}
```

## 主应用 vue安装插件

```jsx
import Vue from 'vue'
import App from './App'
import Message from './lib'

Vue.config.productionTip = false
Vue.use(Message)//Vue.use用于安装插件，插件中必须包含install方法，必须在创建根实例前安装插件
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
```

## Message/index.js

```jsx
import Message from './src/main.js'
export default Message
```

## Message/src/main.js

```jsx
/*
 * 参数 说明 类型 可选值 默认值
 * message 消息文字 string / VNode — —
 * type 主题 string success/warning/info/error info
 * dangerouslyUseHTMLString 是否将 message 属性作为 HTML 片段处理 boolean — false
 * customClass 自定义类名 string — —
 * duration 显示时间, 毫秒。设为 0 则不会自动关闭 number — 3000
 * showClose 是否显示关闭按钮 boolean — false
 * center 文字是否居中 boolean — false
 * onClose 关闭时的回调函数, 参数为被关闭的 message 实例 function — —
 * offset Message 距离窗口顶部的偏移量 number — 20
 *
 * 调用 Message 或 this.$msg 会返回当前 Message 的实例。如果需要手动关闭实例，可以调用它的 close 方法。
 *
 * 方法名 说明
 * close 关闭当前的 Message
 */
import message from './main.vue'
import {isVNode} from '@/utils'

//用于export的对象
const Message = {}

let instances = []
let seed = 0
const types = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error'
}

//Vue插件必须包含install方法
Message.install = function (Vue) {
  const Message = Vue.component('message', message)

  Vue.prototype.$message = function (opt) {
    // 参数处理
    if (typeof opt === 'string' || isVNode(opt)) {
      opt = {message: opt}
    }
    opt.id = 'id' + seed++
    opt.type = types[opt.type] || types.info
    opt.userOnClose = opt.onClose

    // message组件实例
    let instance = new Message({
      data: opt//将配置选项传入给实例的data
    })

		//处理VNode类型message（使用$slots插槽分发数据
    if (isVNode(instance.message)) {
      instance.$slots.default = [instance.message]
      instance.message = ''
    }

		//挂载dom  并 实例的dom加入body中
    instance.$mount()
    document.body.append(instance.$el)

    // close方法
    instance.close = function () {
      this.show = false
      if (this.userOnClose) this.userOnClose()
    }

    // 显示
    instance.show = true

		// 定时隐藏
    let duration = opt.duration || 3000
    instance.timer = setTimeout(() => {
      instance.close()
    }, duration)

    instances.push(instance)

    // 返回message组件实例
    return instance
  }
}
export default Message
```

## isVNode方法

```jsx
function isVNode (node) {
	//通过VNode必包含的属性componentOptions来判断
  return !!node && typeof node === 'object' && node.hasOwnProperty('componentOptions')
}
```

## Message/src/main.vue

```jsx
<!--
 * 参数 说明 类型 可选值 默认值
 * message 消息文字 string / VNode — —
 * type 主题 string success/warning/info/error info
 * dangerouslyUseHTMLString 是否将 message 属性作为 HTML 片段处理 boolean — false
 * customClass 自定义类名 string — —
 * duration 显示时间, 毫秒。设为 0 则不会自动关闭 number — 3000
 * showClose 是否显示关闭按钮 boolean — false
 * center 文字是否居中 boolean — false
 * onClose 关闭时的回调函数, 参数为被关闭的 message 实例 function — —
 * offset Message 距离窗口顶部的偏移量 number — 20
 *
 * 调用 Message 或 this.$msg 会返回当前 Message 的实例。如果需要手动关闭实例，可以调用它的 close 方法。
 *
 * 方法名 说明
 * close 关闭当前的 Message
-->
<template>
  <transition name="message-fade">
      <div
        :class="[
          'message',
          `message-${type}`,
          center?'is-center':'',
          customClass]"
          :style="positionStyle"
          @mouseenter=stopTimer
          @mouseleave=startTimer
          v-if="show">
        <slot>//插槽分发v-html数据
            <span v-if="message && !dangerouslyUseHTMLString">{{message}}</span>
            <div v-else v-html="message"></div>
        </slot>
        <i v-if="showClose" @click="closeMsg" class="message-close-btn">x</i>
      </div>
  </transition>
</template>

<script>
export default{
  components: {},
  data () {  //message组件默认数据
    return {
      message: '',
      type: 'info',
      dangerouslyUseHTMLString: false,
      customClass: '',
      showClose: false,
      center: false,
      onClose: null,
      offset: 20,
      show: false,
      timer: null
    }
  },
  computed: {
    positionStyle () {
      return `margin-top:${this.offset}px`
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    closeMsg () {
      this.close()
    },
    startTimer () {
      const _this = this
      this.timer = setTimeout(() => {
        _this.close()
      }, _this.duration)
    },
    stopTimer () {
      clearTimeout(this.timer)
      this.timer = null
    }
  }
}
</script>
<style scoped>
.message{
  position: relative;
  margin-top: 15vh;
  width: 30%;
  margin: 0 auto;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,.3);
  box-sizing: border-box;
  min-width: 200px;
  padding: 20px 40px;
  border-radius: 10px;
}
.is-center{
  text-align: center;
}
.message-success{
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  color: #67c23a;
}
.message-info{
  background-color: #edf2fc;
  border-color: #909399;
  color: #909399;
}
.message-warning{
  background-color: #fdf6ec;
  border-color: #faecd8;
  color: #e6a23c;
}
.message-error{
  background-color: #fef0f0;
  border-color: #fde2e2;
  color: #f56c6c;
}
.message-fade-enter-active,
.message-fade-leave-active {
  transition: all 0.1s ease-out;
}
.message-fade-enter-to {
  opacity: 1;
  transform: scale(1.2);
}
.message-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.message-close-btn{
  position: absolute;
  right: 10px;
  top: 3px;
  cursor: pointer;
}
</style>
```

## webpack配置

```jsx
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
  entry: './src/main.js', //定义webpack的入口文件
  output: { //定义webpack的输出
    path: path.resolve(__dirname, './dist'),  //输出路径
    filename: 'vue-message-plugin.js',  //输出文件名
    libraryTarget: 'umd', //把写的library打包成umd文件，把库暴露给当前使用的模块定义系统，同时适用commonJs 模块，AMD模块，也可以导出到 global 下的变量，library指定模块名或变量名
    library: 'vue-message-plugin',  //以库的形式导出入口文件
    umdNamedDefine: true //在 UMD 库中使用命名的 AMD 模块
  },
  module: { //module选项决定了如何处理项目中的不同类型的模块
    rules: [  //array,创建模块时，匹配请求的规则数组。这些规则能够修改模块的创建方式。这些规则能够对模块(module)应用 loader，或者修改解析器(parser)。
      {
        test: /\.css$/, //rule条件：resource，请求文件的绝对路径。它已经根据 resolve 规则解析。（Rule.resource.test 的简写
        use: [  //应用于模块的 UseEntries 列表。每个入口(entry)指定使用一个 loader。
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {}
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {  //resolve选项能设置模块如何被解析
    alias: {  //定义 import 或 require 的别名，来确保模块引入变得更简单
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    },
    extensions: ['*', '.js', '.vue', '.json'] //自动解析确定的扩展。能够使用户在引入模块时不带扩展
  },
  devServer: {
    historyApiFallback: true, //当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    noInfo: true, //启用 noInfo 后，「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。
    overlay: true,  //出现编译器错误或警告时，在浏览器中显示全屏覆盖。
    open: true, //自动打开浏览器
    port: 3100, //设置端口
    hot: true //启用热更新
  },
  performance: {
    hints: false  //关闭提示
  },
  devtool: '#eval-source-map' //原始源代码生成 source map
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'//原始源代码生成 source map
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}else if(process.env.NODE_ENV === 'development'){
  module.exports.devtool = '#eval-source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({  //插件：允许在编译时(compile time)配置的全局常量
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({ //可以控制项目中 UglifyJS 的版本
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({ //用于从 webpack 1 迁移到 webpack 2
      minimize: true
    }),
    new HtmlWebpackPlugin({ //简单创建 HTML 文件，用于服务器访问
      filename: 'index.html',
      template: 'index.html',
      inject: true  //注入打包的文件
    })
  ])
}
```