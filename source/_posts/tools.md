---
title: 一些前端常用工具库～
categories:
    - 07 工具库 # 一级分类
tags:
date: 2018-01-01
description: 分享一些用的顺手的前端效率工具～
toc: 1
---
#### http-server 本地快速静态资源服务器
- npm 全局安装
- 执行`hs`命令
- 即可在terminal当前路径创建一个本地http静态资源服务器，方便调试

#### nrm npm快速切换国内源
- npm全局安装nrm
- `nrm ls`命令列出当前可使用的国内npm源，eg. taobao
- `nrm use xx`即可切换到某一源

#### nvm 快速切换node版本
- nvm官网安装
- `nvm list`列出当前机器已经安装的node版本
- `nvm install vxx`安装某一版本node
- `nvm use`切换到某一版本node

#### parcel 极简配置版**webpack**
- npm全局安装parcel`npm i parcel-bundler -g`
- `parcel setup/index.html`即可创建一个本地服务器,并构建打包当前html的依赖
