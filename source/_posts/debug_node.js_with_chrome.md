---
title: 用chrome调试node.js服务端代码
categories:
    - 08 调试Devtools进阶系列 # 一级分类
tags:
date: 2018-07-30
description: 不然你想用什么调试？
toc: 1
top: 0
---

### 开启调试命令

```
node --inspect app.js

//在第一行就停下来等待调试,也可以使用
node --inspect-brk app.js
```

### debugger 地址

```
//运行开启调试命令后，能看到类似如下的输出：
Debugger listening on ws://127.0.0.1:9229/4dc825ec-a204-46f8-8edc-4afadc8da61a
For help see https://nodejs.org/en/docs/inspector
```

### 在 chrome 中打开 debugger

```
在Chrome中打开chrome://inspect/#devices
点击inspect进入调试界面
```

### debugger 端口

inspect 调试默认监听 9229 端口,可以通过下面的参数指定端口

```
--inspect=9222
```

---

    用VSC、用webstorm啊
    对不起我懒(～﹃～)~zZ
