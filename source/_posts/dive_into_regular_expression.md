---
title: 正则自检清单
categories:
    - 03 JavaScript # 一级分类
tags:
date: 2020-05-06
description: 正则是程序员必备的效率生产力知识~
toc: 1
top: 0
---
## 正则原型`test`方法
```javascript
let myString = "Hello, World!";
let myRegex = /Hello/;
let result = myRegex.test(myString);
```

## 或操作符`|`
```javascript
let waldoIsHiding = "Somewhere Waldo is hiding in this text.";
let waldoRegex = /Waldo/;
let result = waldoRegex.test(waldoIsHiding);
```

## 正则标志
- 标志`i`：忽略大小写
- 标志`g`：全局匹配（多次匹配）

## 字符串原型方法：`match`
- 在字符串上使用`.match()`方法将返回一个数组，其中包含它匹配的字符串及其捕获组。
```javascript
"Hello, World!".match(/Hello/);
// Returns ["Hello"]
```

## 通配符：`.`（点）

## 字符集匹配：`[]`
```javascript
let vowelRegex = /[aeiou]/gi; 
let result = quoteSample.match(vowelRegex); 
```

## 字符集 连字符：`-` 字符范围
```javascript
let quoteSample = "The quick brown fox jumps over the lazy dog.";
let alphabetRegex = /[a-z]/gi; 
let result = quoteSample.match(alphabetRegex); 
```

## 否定字符集：`^`
- /[^1-9]/g  匹配所有非数字字符

## `+*?^$`
- +：一次或多次
- *：0次或多次
- ？：0次或1次
- 字符串开头：^
- 字符串结尾：$

## 贪婪匹配 & 惰性匹配
- 贪婪匹配：正则默认贪婪匹配，匹配满足表达式的最长部分
- 惰性匹配：匹配满足表达式的最小部分：加？
```javascript
let text = "<h1>Winter is coming</h1>";
let myRegex = /<.*?1>/; 
let result = text.match(myRegex);
console.log(result)
```

## 字符集
- `\w` : [A-Za-z0-9_]   数字字母下划线
- `\W`: [^A-Za-z0-9_]   反匹配模式
- `\d`:  [0-9]  数字
- `\D`:  [^0-9] 非数字
- `\s`:  [\r\t\f\n\v]  空格 回车 制表符 换行 换页
- `\S`:  [^\r\t\f\n\v]


## 匹配的数量上下限
- `{m,n}`最少m个，最多n个
- `{m}`指定m个
- `{m,}`最少m个
- `{,n}`最多n个


## 先行断言：在字符串中向前查找的匹配模式。
- `正向先行断言`：会查看并确保搜索匹配模式中的元素存在，但实际上并不匹配。
- 用法是(`?=`...)，其中...就是需要存在但不会被匹配的部分。
- `负向先行断言`：会查看并确保搜索匹配模式中的元素不存在。
- 用法是(`?!`...)，其中...是你希望不存在的匹配模式。如果负向先行断言部分不存在，将返回匹配模式的其余部分。


例子：
- 3 到 6 个字符且至少包含一个数字：
```javascript
let password = "abc123";
let checkPass = /(?=\w{3,6})(?=\D*\d)/;
checkPass.test(password); // Returns true
```
- 至少5个字符且有连续两个数字的密码：
```javascript
let sampleWord = "astronaut";
let pwRegex = /(?=\w{5,})(?=\D*\d{2}\D*)/;
let result = pwRegex.test(sampleWord);
```




## 捕获组：重用子字符串
- 用`（）`来表示捕获组，匹配第一次出现的子字符串
- 用` \n`来表示第n个捕获组，n是数字，表示第n个捕获组
```javascript
let repeatStr = "regex regex";
let repeatRegex = /(\w+)\s\1/;
repeatRegex.test(repeatStr); // Returns true
repeatStr.match(repeatRegex); // Returns ["regex regex", "regex"]
```


## 字符串原型方法replace：捕获组 搜索/替换
- `.replace()`的输入首先是你想要搜索的正则表达式匹配模式，
- 第二个参数是用于替换匹配的字符串或用于执行某些操作的函数。
- 第二个参数中，可以用`$n`访问替换字符串中的捕获组（即用括号括起来的组）
- 其中n表示`第n个捕获组`

- 例子:
```javascript
"Code Camp".replace(/(\w+)\s(\w+)/, '$2 $1');
// Returns "Camp Code"
```
- 去除字符串两端的空格
```javascript
let hello = "   Hello, World!  ";
let wsRegex = /^\s+(\S.*\S)\s+$/; 
let result = hello.replace(wsRegex,"$1");
```

