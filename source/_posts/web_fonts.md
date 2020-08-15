---
title: 前端向UI指南-WEB中的字体
categories:
    - 05 CSS # 一级分类
tags:
date: 2020-02-02
description: UI小姐姐动不动就丢给你奇奇怪怪的字体和各种尺寸的图标？快把这些文章丢改她看
toc: 1
top: 0
---

# WEB中的字体

### 前言
```bash
某天，隔壁新来的漂亮UI小妹妹又优雅的丢给你一个压缩包，你满心欢喜的解压

才发现又是新页面的需求

然后你摸了摸光亮的脑门，捋了捋稀疏的鬓角，吭哧吭哧开始画页面...

咦？pingfangsc medium,pingfangsc bold,pingfangsc light...??
(同理可换成 sans serif，microsoft yahei)

常用windows的你傻傻分不清楚小妹妹选定的mac字体

这是同一个字体吗？font-weight还要写吗？不写的话win上显示就不一样了呀...

于是你只能再打开小妹妹的聊天面板，码下一大段话“不同系统默认字体不一样...巴拉巴拉...web安全字体...备选字体集...字体文件包”

然后在你的小本本上，画上第1025个圈圈，记录并预测下，到底还要跟多少UI做好字体交易...

虽然你会为跟小妹妹进行了一次深入性的技术沟通 而心情大好，但是

终将有一天，你的耐心会消耗殆尽，然后把这篇文章，丢到部门UI群

从那以后，UI小妹妹们...

...

给你授予了“最矫情的技术没有之一”的称号 并 丢了更多pingfangsc给你🐶

```

### WEB 安全字体
不同操作系统内置的字体是不同的，甚至差异很大，例如：
![OS字体差异图](https://www.scarsu.com/images/gitbook/web_font01.png)

win7和mac下，只有十种字体重合，Windows XP中甚至没有其中的Palatino 和Trebuchet MS字体.....

因此为了兼容性考虑，最安全的字体有：
- Arial
- Courier New
- Georgia
- Times New Roman
- Verdana
- ...
- 随着操作系统的发展更新，这个数据也不是最准确的，可选的可能比上面五个多一些，请以实际测试为准

### 备选字体组合

当不确定网页用户电脑上是否有某种字体时，可以使用字体组合，提供备选的字体：

```css
font-family:'Times New Roman', Times, serif
```

备选的意思可以参考备胎，就是：

当浏览器在系统中找不到第一种字体时，会自动去使用第二种，依次类推...


### 自定义字体

如果对某种不通用字体有刚需，可以使用自定义字体。

1. UI需要提供字体的woff和eot格式源文件（需要考虑文件太大会影响网页加载）
2. 前端需要在css中自定义@font-face（不用担心浏览器兼容性）

至于为什么是woff和eot：
```
TureTpe(.ttf)格式:
 .ttf字体是Windows和Mac系统的最常见的字体，是一种RAW格式，不为网站优化

OpenType(.otf)格式：
.otf字体被认为是一种原始的字体格式，其内置在TureType的基础上，所以也提供了更多的功能

Web Open Font Format(.woff)格式：
.woff字体是Web字体中最佳格式，他是一个开放的TrueType/OpenType的压缩版本，同时也支持元数据包的分离

Embedded Open Type(.eot)格式：
.eot字体是IE专用字体，可以从TrueType创建此格式字体

SVG(.svg)格式：
.svg字体是基于SVG字体渲染的一种格式

这就意味着在@font-face中我们至少需要.woff,.eot两种格式字体，甚至还需要.svg等字体达到更多种浏览版本的支持。
```

不同浏览器对不同字体文件格式的兼容性也不同：

![OS字体文件兼容性图](https://www.scarsu.com/images/gitbook/web_font02.png)

**总结来说：eot(供ie使用) + woff(供其他现代浏览器使用)是最佳组合，如果要兼容更多老版本浏览器/移动端浏览器可以加上ttf或svg）**

定义font-face语法：
```css
@font-face {
      font-family: <YourWebFontName自定义的字体名>;
      src: <source> [<format>][,<source> [<format>]]*;
      [font-weight: <weight>];
      [font-style: <style>];
}

/*source：字体文件路径*/
/*format：字体文件格式 eg. ttf,otf,woff,eot,svg...*/

/*示例*/
   @font-face {
	font-family: 'YourWebFontName';
	src: url('YourWebFontName.eot'); /* IE9兼容模式 */
	src: url('YourWebFontName.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
             url('YourWebFontName.woff') format('woff'), /* 现代浏览器 */
             url('YourWebFontName.ttf')  format('truetype'), /* Safari, Android, iOS */
             url('YourWebFontName.svg#YourWebFontName') format('svg'); /* 老版本 iOS */
   }
```


### 总结
1. UI最好就用最安全的几种通用字体 
2. 如果想用不通用的字体
    - 要么：提供备选字体
    - 要么：提供字体文件(eot+woff+[svg/ttf])，且要考虑选择字体源文件体积较小的字体