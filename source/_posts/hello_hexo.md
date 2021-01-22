---
title: 本博客搭建指南[ Hexo + Netlify ] # 文章标题
categories:
    - 01关于 # 一级分类
tags:
comments: true #开启评论
date: 2018-01-01
description: 免费 高效 自动部署 markdown友好。
toc: 0
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
3. `自定义域名 无需服务器 HTTPS`：不需要买服务器，可以使用Netlify的子域名，也可以自己买域名配置(例如我的scarsu.com和doc.scarsu.com这两个域名，都是托管在NetlifyDNS服务器上，与我在github上的博客仓库和gitbook仓库关联即可)。
4. `可定制`：hexo默认/hexo主题中又很多可配置项，另外主题的源码是用pug模板写的，前端er易于上手更改
5. 作为参考，`vuejs.org`官方文档构建的解决方案也是hexo+netlify

## 相关配置

- Hexo 主题：[Maupassant Theme](https://github.com/tufu9441/maupassant-hexo/)
- 本博客代码仓库地址 [github scarsu/ScarSuHexo_Netlify](https://github.com/scarsu/ScarSuHexo_Netlify)


## 本地搭建步骤：
```bash
#克隆代码仓库到本地
git clone https://github.com/scarsu/ScarSuHexo_Netlify.git
#全局安装hexo
npm install hexo -g 
#安装相关依赖
npm install 
#构建打包
hexo d -g 
#运行本地服务器
hexo s 
```


## 本站git仓库目录结构
```bash
.
├── _config.yml    #网站配置
├── package.json    #npm包信息
├── scaffolds   #模板文件夹
├── public   #生成的静态资源文件夹（需要添加到.gitignore文件中）
├── node_modules   #项目依赖的node模块（需要添加到.gitignore文件中）
├── source      #资源文件夹
|   ├── _posts     #markown文档文件夹（日常更新md文章存放路径）
|   ├── _xx      #所有_开头的文件夹会被编译器忽略
|   └── xx      #不会被编译器识别的普通文件夹 但是会直接打包的资源目录 （可访问）
└── themes      #主题
    └── maupassant     #maupassant主题包
            ├── languages      #多语言文件
            ├── layout      #布局模板文件
            ├── source      #主题资源
            └── _config.yml      #主题配置

```



---

     免费 高效 自动部署 markdown友好。
