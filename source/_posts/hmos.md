---
title: 【Harmony OS】作为前端技术人，体验刚开源的鸿蒙OS
categories:
    - 10技术 | JS # 一级分类
tags:
date: 2020-09-12
description: 鸿蒙OS中的轻量级响应式前端框架
toc: 1
top: 0
img: https://scarsu.oss-cn-shanghai.aliyuncs.com/picgo20201211124024.png
---

![](/images/hmos/000.png)

华为2020开发者大会在9月10号如约而至

从2019年大会鸿蒙发布后，很多人的目光都聚焦在了鸿蒙OS的开源计划上，“PPT系统”的声音不绝于耳

今天发布会之前，吃瓜的我无意间在gitee上看到了这个横幅👇，我知道，终于它来了

![HDC2020](/images/hmos/001.png)

截至到我发稿前，开源仓库已经有了2k+ star

![鸿蒙OS即将开源](/images/hmos/002.png)

并且提供了看起来比较完善的中文文档

![鸿蒙OS开源](/images/hmos/003.png)

同时发布了一款配套的IDE **「DevEco Studio」**，注册开发者即可下载

![鸿蒙OS - DevEco Studio](/images/hmos/004.png)

## 前端er上手体验

作为一个前端技术人，比较令我兴奋的是，鸿蒙OS有一套基于**前端技术栈**的UI开发框架

![鸿蒙OS - JS框架](/images/hmos/005.png)

于是我上手体验了一下，下面简单介绍一下步骤。

安装IDE之后，创建项目，这里我选择了一个TV设备的项目模板

![鸿蒙OS](/images/hmos/006.png)

做一些简单的配置

![鸿蒙OS](/images/hmos/007.png)

然后会自动打包构建出一个demo项目，并且在IDE内提供了远程模拟设备

![鸿蒙OS](/images/hmos/008.png)

选取合适的模拟设备后，就可以运行项目了，得到的效果是这样的

![鸿蒙OS](/images/hmos/009.png)

## 代码

效果图这样的一个电视页面，用到了 **hml+css+js** 三部分代码

hml：

```html
<div class="container">
    <div class="tv_box">
        <div class="title_box">
            <text class="title">{{title}}</text>
            <text class="title">酥鱼TVtest</text>
            <button type="circle" icon="{{icon_src}}" class="setting_box" onfocus="iconFocusFunc"
                    onblur="iconBlurFunc"></button>
        </div>
        <tabs class="tab_box">
            <tab-bar mode="scrollable" class="bar_box">
                <block for="[1,2,3,4,5,6,7,8,9]">
                    <text class="tab_text">{{$t('strings.tab')}}
                    </text>
                </block>
            </tab-bar>
            <tab-content>
                <block for="[1,2,3,4,5,6,7,8,9]">
                    <div class="content_box">
                        <list class="content_img">
                            <block for="[1,2,3,4]">
                                <list-item type="listItem" class="list_img">
                                    <image focusable="true" class="tab_img" src="/common/img-large.png"></image>
                                </list-item>
                            </block>
                        </list>
                        ...
                    </div>
                </block>
            </tab-content>
        </tabs>
    </div>
</div>

```

js:

```javascript
import app from '@system.app';
export default {
    data: {
        title: "",
        subtitle: "",
        icon_src: "/common/plus.png",
        appName: app.getInfo().appName
    },
    onInit() {
        this.title = this.appName;
        this.subtitle = this.$t('strings.subtitle');
    },
    iconFocusFunc: function () {
        this.icon_src = "/common/plus-black.png";
    },
    iconBlurFunc: function () {
        this.icon_src = "/common/plus-white.png";
    }
}
```

css:

```css
.container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #000000;
}

.title_box {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 60px;
}

.title {
    font-size: 36px;
    color: rgba(255, 255, 255, 0.9);
    margin-left: 48px;
}
...

```

## JS架构和源码

鸿蒙的 JS 框架 **ace_lite_jsfwk**,官方介绍是“轻量级 JS 核心开发框架”

<!-- ![架构图](https://gitee.com/openharmony/docs/raw/master/readme/figures/js-framework.png) -->
![鸿蒙OS 前端框架 架构图](/images/hmos/012.png)

> 提供了一套跨平台的类web应用开发框架，通过Toolkit将开发者编写的**HML、CSS和JS** 文件编译打包成**JS Bundle**，然后再将JS Bundle**解析运行成C++ native UI的View 组件**进行渲染。通过支持三方开发者使用声明式的API进行应用开发，以数据驱动视图变化，避免了大量的视图操作，大大降低了应用开发难度，提升开发者开发体验。

源码的地址在：[https://openharmony.gitee.com/openharmony/ace_lite_jsfwk](https://openharmony.gitee.com/openharmony/ace_lite_jsfwk)

其中JS的核心代码，主要在以下几个文件

```bash
runtime-core\src\core\index.js
runtime-core\src\observer\
                    |----observer.js
                    |----subject.js
                    |----utils.js
runtime-core\src\profiler\index.js
```

也提供了一些测试用例：

![鸿蒙OS](/images/hmos/010.png)

从源码看，实现了一个轻量的响应式MVVM系统，使用了 vue2 同样的属性劫持技术，即 `Object.defineProperty` API。

## 总结

整体体验下来，感觉开发过程还是很丝滑的，api和开发模式很有vue的味道，应该存在借鉴。对于vue技术栈的前端er来说应该很好上手

![鸿蒙OS](/images/hmos/011.png)

自从去年的贸易战到后来的疫情，国际局势日趋复杂，鸿蒙OS的开源，对于国家和国内技术行业都有非凡的意义

单从前端行业的角度来看，鸿蒙OS的发布，给前端技术人提供了web之外，扩展向物联网行业的，更广的发挥空间和更多的应用场景

值得前端技术人向国内鸿蒙开源社区，提供更多的关注，注入更多的技术力量

## 资源

- [鸿蒙OS开源地址](https://openharmony.gitee.com/openharmony)
- [鸿蒙OS IDE下载](https://developer.harmonyos.com/cn/develop/deveco-studio#download)
- [鸿蒙OS开发者文档](https://gitee.com/openharmony/docs)
- [鸿蒙OS前端js框架文档](https://developer.harmonyos.com/cn/docs/documentation/js-framework-file-0000000000611396)
- [鸿蒙OS前端js框架源码](https://openharmony.gitee.com/openharmony/ace_lite_jsfwk)
