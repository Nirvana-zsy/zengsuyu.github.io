---
title: 古老神奇的<table>
categories: 
- html # 一级分类
tags: 
- table
- html
date: 2018-08-29
description: 凭什么table能兼容IE6？
---
# 结构
```html
<table>
  <caption>表格上方的居中标题</caption>
  <colgroup>
    <col span="2" style="">
    <col style="">
  </colgroup>
  <thead>
      <tr>
        <th>ISBN</th>
        <th>Title</th>
        <th>Price</th>
      </tr>
  </thead>
  <tody>
      <tr>
        <td>3476896</td>
        <td>My first HTML</td>
        <td>$53</td>
      </tr>
  </tbody>
  <tfoot>
      <tr>
        <td>3476896</td>
        <td>My first HTML</td>
        <td>$53</td>
      </tr>
  </tfoot>
</table>
```

# 标签
```
<caption>、<col>、<colgroup>、<thead>、<tfoot> 以及 <tbody> 
```

# `<caption>标题`
对齐方式：
- 用CSS属性 "text-align" 和 "caption-side"
- caption-side只有top和bootom两个，即位于表格上方或下方
- 用text-align来控制左右位置


无其他属性（HTML4.01的align属性被HTML5删除）

# `<colgroup>` 和 `<col>` ：对列进行组合
对列进行组合

span属性：定义横跨的列数,无span属性默认为1（类似于td的colspan属性）

无其他属性（表示样式的HTML4.01属性均被HTML5删除）

# `<thead> <tbody> <tfoot>`
无属性（样式属性被HTML5删除）

默认不会影响表格的样式布局

优点：
- 使浏览器有能力支持独立于表格表头和表格页脚的表格主体滚动。
- 当包含多个页面的长的表格被打印时，表格的表头和页脚可被打印在包含表格数据的每张页面上。
- 可以方便的定义 三部分 的样式

# `<table>`
属性：border=1或""   规定是否有边框

无其他属性（表示样式的HTML4.01属性均被HTML5删除）

# 表格行：`<tr>`
无属性（表示样式的HTML4.01属性均被HTML5删除）

# 单元格：`<td>` 和 `<th>`
差异
- th：文本粗体，居中
- td：文本普通，左对齐

属性
- colspan：横跨的列数
- rowspan：横跨的行数
- headers：header_id 单元格关联的一个或多个表头单元格
- 无其他属性（表示样式的HTML4.01属性均被HTML5删除）

自动居中
- 如果给td定义了尺寸，且子元素的尺寸小于td尺寸，子元素会自动垂直居中
- 居中后子元素与td的边距，不属于td的padding值，也不属于子元素的margin值
- IE6居中随便写，写不出来算我输

# CSS属性：border-collapse 
默认情况：单元格之间有间隔隔开，border-collapse:separate

一般不需要隔开：
```css
table{
    border-collapse:collapse;
}
```

---
    "你大爷还是你大爷"