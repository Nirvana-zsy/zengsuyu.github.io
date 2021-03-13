---
title: 前端图标的那些事
categories:
    - 10技术 | CSS # 一级分类
tags:
date: 2021-03-13
description: 更新svg-symbol
toc: 1
top: 0
---

- 初次发布于2020-02-19
- 第二次编辑于2021-03-13，更新svg-symbol
---

## 前言
```
用了矢量图标

用mac的UI再也不吐槽你页面的图标放大后有点糊了...

PM再也不会嫌弃你画的页面图片太大，太占load time了...

你也不用因为一个hover状态，就写一段换图片src的逻辑了...

```

## 矢量图标
- 不会因为放大/缩小而导致图标变模糊，即可以任意定义尺寸的icon。
- 在现代前端项目中，除了任意定义尺寸，对图标的要求还有定义颜色等等

## 字体图标
- 以字体的形式定义的图标，可以像字体一样定义尺寸,颜色
- 优点：体积小（用到的图标越多性价比越高）；样式便于控制，与字体一样可以调节font-size，color，阴影，旋转，透明度，且兼容低版本浏览器
- 主流的字体图标库:fontAwesome,阿里的iconfont
- 使用方法：矢量图片(UI) -> 转换成字体文件(工具) -> 定义font-face(前端)
- 设计师上传svg矢量图

![设计师上传svg矢量图](https://www.scarsu.com/images/gitbook/web_font03.png)

- 前端下载代码，解压后目录结构：

![iconfont目录结构](https://www.scarsu.com/images/gitbook/web_font04.png)

- 缺点：需要UI合作；图标变更需要重新生成字体文件，定义font-face
- 前端引用iconfont主流方式：
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

## icon最佳实践：svg图标
- 除了字体图标，现代前端项目中使用更多的是Svg图标
- `<svg>`及其一系列元素，用于矢量图像的结构、绘制与布局
- `<symbol>元素`，是可复用的svg图像，用来定义一个图形模板对象，它可以用一个`<use>`元素实例化。
```xml
<svg>
  <!-- symbol定义模板（symbol本身不会显示图像 -->
  <symbol id="sym01" viewBox="0 0 150 110">
    <circle cx="50" cy="50" r="40" stroke-width="8" stroke="red" fill="red"/>
    <circle cx="90" cy="60" r="40" stroke-width="8" stroke="green" fill="white"/>
  </symbol>

  <!-- 使用use元素才能实例化 -->
  <use xlink:href="#sym01"
      x="0" y="0" width="100" height="50"/>
  <use xlink:href="#sym01"
      x="0" y="50" width="75" height="38"/>
  <use xlink:href="#sym01"
      x="0" y="100" width="50" height="25"/>
</svg>
```
- `symbolId`:在`<use>`元素的`xlink:href`属性需要指向symbol元素的id
- 优点：
  1. svg图标拥有字体图标的各种优点此外
  2. svg不需要UI转成字体、定义font-face，只需要原始的svg代码，即可使用。
  3. 通过现代前端工具整合，svg图标变更时，只需要变更单个svg文件，耦合度低

## svg symbol应用于现代前端框架
- 创建svg目录，存放一个svg文件，例如`@/assets/svg/test.svg`
- 在webpack中配置`svg-sprite-loader`，匹配上述的svg文件，并将其symbolId配置为svg文件名,详情参考[`svg-sprite-loader`文档](https://www.npmjs.com/package/svg-sprite-loader#configuration)
```js
// 以下为vue cli4的配置
module.exports = {
	chainWebpack(config){
	  // 1. 将./src/assets/svg排除在vue的默认webpack配置的svg规则之外
	  config.module.rule('svg')
	    .exclude.add(resolve('./src/assets/svg'))
	  // 2. 添加一条icons规则
	  config.module.rule('icons')
	    .test(/\.svg$/) // 匹配svg后缀的文件
	    .include.add(resolve('./src/assets/svg')).end()  // 添加规则生效的路径
	    .use('svg-sprite-loader') // 使用svg-sprite-loader插件
	    .loader('svg-sprite-loader')  // 加载svg-sprite-loader插件
	      .options({symbolId: 'icon-[name]'}) // name:文件名，此处的symbolId即svg的xlink:href属性，xlink:href="#icon-文件名"
	}
...
}
```
- 在vue模板中即可直接使用
```
// text.vue
<template>
  ...
  <svg :class="svgClass" v-on="$listeners">
    <use xlink:href="#icon-test"></use>
  </svg>
  ...
</template>

import '@/assets/svg/test.svg';
...
```
- 更进一步的封装：不需要每个icon都import;`<svg-icon>`组件;

1. 通过webpack上下文，将svg文件作为固定上下文，即可避免手动import，用到了webpack中的[require.context api](https://webpack.js.org/guides/dependency-management/#requirecontext)
```js
// @/assets/svg/index.js
// 使用 webpack提供的require.context()指定svg为固定上下文
function importAll (r) {
  r.keys().forEach(r)
}
importAll(require.context('@/assets/svg', false, /\.svg$/))
```

2. 在main.js中引入上述js文件
```js
import '@/assets/svg/index.js' // svg上下文
```

3. 封装icon组件
```vue
<template>
  <svg :class="svgClass" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    // iconClass要和svg的文件名一致
    iconClass: {
      type: String,
      required: true
    },
    // className可以用来定制样式
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.iconClass}`
    },
    svgClass () {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
```

4. 在main.js中注册全局组件
```
import SvgIcon from '@/components/common/SvgIcon.vue'
Vue.component('SvgIcon', SvgIcon)
```

5. 使用
```
<svg-icon iconClass="test"></svg-icon>
```
