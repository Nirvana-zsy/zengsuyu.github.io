---
title: Devtools 老司机养成 - 番外篇 - Devtools中的”VM“
categories:
    - 08 调试Devtools进阶系列 # 一级分类
tags:
date: 2020-04-06
description: 为什么经常有脚本的“文件名”是"[VM](XXXX "？？
toc: 1
top: 0
---

## 引言

What are those strange and mysterious scripts titled "[VM](XXXX " and where do they come from?

## what's vm(xxxx)

[VM](scriptId) has no special meaning. It's a dummy name to help us to distinguish code which are not directly tied to a file name, such as code created using eval and friends.

为了标识不能和具体文件直接关联的脚本的虚拟名称，并不是真正的文件，例如 eval 方法所执行的脚本、匿名函数，脚本会被抛入Chrome调试器虚拟机中
