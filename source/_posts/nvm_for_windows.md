---
title: Node版本管理工具 nvm for windows
categories:
    - 11 工具 # 一级分类
tags:
date: 2018-09-29
description: node版本更新那么快，怎么才能在机子上多装几版node？还能一句命令切换？
toc: 1
top: 0
---

# nvm

只支持 linux 和 cent os

# nvm for windows

[https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)

# 安装

    0. 安装前卸载干净已经有的node
    1. 设置nvm安装路径（不能有空格，否则nvm use 报错）
    2. 设置node路径（当前使用的node的存放路径，会被添加到环境变量）

# 常用命令

```
nvm list -当前安装的node版本
nvm list available -可获取的版本
nvm install xx.xx.xx -安装某版本node
nvm use xx.xx.xx -使用某版本node
nvm uninstall xx.xx.xx -卸载某版本node
```

# 其他命令

```
nvm arch -查看当前系统位数
nvm on/off -打开/关闭nvm（好像并没有什么区别
nvm proxy [url] -设置代理下载地址
nvm root [path] -nvm安装路径
nvm node_mirror [url] -node下载库路径
nvm npm_mirror [url] -npm下载库路径
```

---

    “重点是node为什么更新那么快？”
