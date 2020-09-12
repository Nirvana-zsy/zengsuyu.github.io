## 文章必须包含以下开头
```
---
title: xxx # 文章标题
categories: 
- Android # 一级分类
- Android Studio # 二级分类
tags: 
- Android
- Android Studio
comments: true #开启评论
date: 2018-07-19
---
```

## /themes/next主题配置


## _config.yml配置hexo


## 依次执行如下命令来发布博客：
```
    $ hexo clean #清除缓存 网页正常情况下可以忽略此条命令
    $ hexo g #生成静态网页
    $ hexo d #开始部署
    或
    一行命令实现博客的部署clean,generate,deploy
    $ hexo clean && hexo g && hexo d
```

## 创建分类页面
$ hexo new page categories

## 创建标签页面
$ hexo new page "tags"

## 启动本地预览服务
$ hexo server

## 生成静态网页文件
$ hexo generate

## 部署到远程
$ hexo deploy