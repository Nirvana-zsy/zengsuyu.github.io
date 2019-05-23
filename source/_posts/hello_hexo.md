---
title: 【置顶】本博客搭建指南[ Hexo + Netlify ] # 文章标题
categories:
    - daily # 一级分类
    - blog # 一级分类
tags:
    - daily
    - blog
comments: true #开启评论
date: 2099-12-12
description: 免费 高效 自动部署 markdown友好。
toc: 0
top: 1
---

## 搭建工具

#### 1. [Hexo](https://hexo.io) - 快速、简洁且高效的博客框架
- Node.js 所带来的超快生成速度，让上百个页面在几秒内瞬间完成渲染。
- Hexo 支持 GitHub Flavored Markdown 的所有功能，甚至可以整合 Octopress 的大多数插件。
- Hexo 拥有强大的插件系统，安装插件可以让 Hexo 支持 Jade, CoffeeScript。


#### 2. [Netlify](https://www.netlify.com/) - 自动化构建、部署、持续集成，自动化HTTPS
1. 配置代码仓库
2. 添加构建设置
3. 自动部署

## 为什么选择这两个工具

1. `Markdown赛高`：习惯于 markdown 输出内容，一直以来都是用 md 来写笔记存在有道云，简单纯净更适合技术文档。
2. `提交代码 自动构建部署`：每次写完笔记只需要把 md 文件丢在项目路径里，然后提交代码到github，就会触发Netlify自动构建部署，快速更新，只关注于笔记本身。
3. `自定义域名 无需服务器 HTTPS`：不需要买服务器，可以使用Netlify的子域名，也可以自己买域名配置(例如我的scarsu.com和doc.scarsu.com这两个域名，都是托管在NetlifyDNS服务器上，与我在github上的博客和gitbook量，之际)。
4. `可定制`：hexo默认/hexo主题中又很多可配置项，另外主题的源码是用pug模板写的，前端er易于上手更改

## 相关配置

- Hexo 主题：[Maupassant Theme](https://github.com/tufu9441/maupassant-hexo/)

---

     免费 高效 自动部署 markdown友好。
