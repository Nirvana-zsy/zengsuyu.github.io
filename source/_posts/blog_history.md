---
title: 博客折腾记录 # 文章标题
categories:
    - 00 ScarSu # 一级分类
tags:
comments: true #开启评论
date: 2000-01-01
description: 每日一折腾，不折腾难受。
toc: 0
---

## 主题 & 个性化样式

#### 1. Hexo 主题：[Maupassant Theme](https://github.com/tufu9441/maupassant-hexo/)
挑主题的时候一眼就看上了这个主题，简约直白X冷淡

#### 2. 个性化样式：根据自己的口味，在主题的基础上更改了布局和样式
以主题的pug模板，source中sass样式文件等资源味为基础，根据个人喜欢DIY即可。

有需要可以去[我的博客仓库](https://github.com/scarsu/ScarSuHexo_Netlify.git)自取。

#### 3. 一些参考：
[hexo官网](https://hexo.io/)

[pug模板语言文档](https://pugjs.org/api/getting-started.html)

[sass文档](https://www.sass.hk/)

## 配置腾讯公益404页面
1.  在博客代码仓库的/source/404/路径下，新建index.md
```md
---
title: 404 Not Found：该页无法显示
toc: false
comments: false
permalink: /404
description: 腾讯404公益页面
---

<!DOCTYPE html>
<html>
    <head>
         <meta charset="UTF-8" />
         <title>404</title>                                                
    </head>
    <body>
         <script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" homePageName="返回首页" homePageUrl="https://www.scarsu.com"></script>
	</body>
</html>

```

2. 重新构建打包更新即可看到效果，如输入一个不存在的路由会出现公益404页面：[https://www.scarsu.com/qqq](https://www.scarsu.com/qqq)，直接输入/404路由也会出[https://www.scarsu.com/404](https://www.scarsu.com/qqq)

3. 可能会出现本地构建时找不到/404页面的现象，此时可以直接打包到服务器测试。

## 博客评论控件

#### **Gitment**
[gitment repo](https://github.com/imsun/gitment)

去[Github Auth Applications](https://github.com/settings/applications/new)为你的网站注册一个应用：
```
Application name: 应用名
Homepage URL: 你的网站地址 #eg. https://www.scarsu.com
Application description: 描述
Authorization callback URL: 你的网站地址 #如 https://www.scarsu.com
```

博客配置：
```yaml
# Gitment
# Introduction: https://imsun.net/posts/gitment-introduction/
gitment:
    enable: true ## If you want to use Gitment comment system please set the value to true.
    owner: github用户名 ## Your GitHub ID, 直接用GitHub用户名就可以
    repo: repo地址 ## The repository to store your comments, make sure you're the repo's owner, 要存储评论内容的仓库名，可以与博客下的仓库，也可以新建一个仓库专门存储评论内容的
    client_id: 刚才申请的ClientID ## GitHub client ID
    client_secret: 刚才申请的ClientSecret ## GitHub client secret
```

本地安装gitment，并在项目中添加依赖：
```
npm i --save gitment

```

- **Disqus**[需要Q，已经弃用-20191212]
在disqus官网注册账户，在主题配置文件中开启disqus评论控件:
```yaml
# Comment 评论相关
disqus: uaername ## Disqus评论 Your disqus_shortname, e.g. username
```

## SEO
#### 神马搜索站长平台 https://zhanzhang.sm.cn/


#### 百度链接提交工具 https://ziyuan.baidu.com/linksubmit/url
百度链接提交工具使用说明
> 1. 链接提交工具是网站主动向百度搜索推送数据的工具，本工具可缩短爬虫发现网站链接时间，网站时效性内容建议使用链接提交工具，实时向搜索推送数据。本工具可加快爬虫抓取速度，无法解决网站内容是否收录问题
> 2. 百度搜索资源平台为站长提供链接提交通道，您可以提交想被百度收录的链接，百度搜索引擎会按照标准处理，但不保证一定能够收录您提交的链接

如：我提交自己的www.scarsu.com和doc.scarsu.com后，在百度首页搜索scarsu，即可在前几条结果看到我的站点如图：

![scarsu seo](/images/blog/scarsu-baidu.jpg)

---
以下待更新

## 博客计时
![博客计时](/images/blog/blog-counter.gifs)

## Gitbook

## Google Adsense广告

## categories分类排序

## 返回顶部控件




---

     “不疯魔 不成活”
