---
title: Devtools 老司机养成 - 第五篇- Network 面板
categories:
    - 02 Debug|Devtools进阶系列 # 一级分类
tags:
date: 2020-03-22
description: chrome最重要之二的Network面板，给后端小哥甩锅？实锤都在这里...
toc: 1
top: 0
---

## 概览

![network.png](https://i.loli.net/2019/04/22/5cbd4f884b14c.png)

-   默认情况下，只要 DevTools 处于打开状态，DevTools 就会在 Network 面板中记录所有网络请求。
-   左上红点按钮：停止记录网络请求
-   第二个按钮：清空请求记录
-   录像按钮：页面加载时捕获屏幕截图
-   过滤按钮：显示/隐藏 过滤条件行
-   View 中的两个按钮：第一个是切换请求列表中每行的显示样式（大小请求行），第二个是显示/隐藏瀑布图
-   Group By Frame：是否根据不同的 frame 分类显示请求
-   Preserve Log：保存显示跨页面的加载请求
-   Disable Cache：禁用浏览器缓存，模拟新用户打开页面的体验
-   Offline 是模拟断网离线的状态，其后的下拉框可以选择模拟其他网络状况，比如 2G,3G

## 筛选请求

-   filter 文本框中可输入请求的属性 对 请求进行过滤，多个属性用空格分隔
-   支持过滤的属性：
    -   domain。 仅显示来自指定域的资源。 可以使用通配符字符 (`*`) 纳入多个域。 例如，\*.com 将显示来自以 .com 结尾的所有域名的资源。 DevTools 会使用其遇到的所有域填充自动填充下拉菜单。
    -   has-response-header。 显示包含指定 HTTP 响应标头的资源。 DevTools 会使用其遇到的所有响应标头填充自动填充下拉菜单。
    -   is。 使用 is:running 可以查找 WebSocket 资源。
    -   larger-than。 显示大于指定大小的资源（以字节为单位）。 将值设为 1000 等同于设置为 1k。
    -   method。 显示通过指定 HTTP 方法类型检索的资源。 DevTools 会使用其遇到的所有 HTTP 方法填充下拉菜单。
    -   mime-type。 显示指定 MIME 类型的资源。 DevTools 会使用其遇到的所有 MIME 类型填充下拉菜单。
    -   mixed-content。 显示所有混合内容资源 (mixed-content:all)，或者仅显示当前显示的资源 (mixed-content:displayed)。
    -   scheme。 显示通过未保护 HTTP (scheme:http) 或受保护 HTTPS (scheme:https) 检索的资源。
    -   set-cookie-domain。 显示具有 Set-Cookie 标头并且 Domain 属性与指定值匹配的资源。 DevTools 会使用其遇到的所有 Cookie 域填充自动填充下拉菜单。
    -   set-cookie-name。 显示具有 Set-Cookie 标头并且名称与指定值匹配的资源。 DevTools 会使用其遇到的所有 Cookie 名称填充自动填充下拉菜单。
    -   set-cookie-value。 显示具有 Set-Cookie 标头并且值与指定值匹配的资源。 DevTools 会使用其遇到的所有 Cookie 值填充自动填充下拉菜单。
    -   status-code。 仅显示 HTTP 状态代码与指定代码匹配的资源。 DevTools 会使用其遇到的所有状态代码填充自动填充下拉菜单。
-   例如：mime-type:image/gif larger-than:1K 显示大于一千字节的所有 GIF
-   `Hide Data URLs`：隐藏 [data 类型的 url](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)

## 瀑布图

-   瀑布图按时间线展示所有请求
-   可以用鼠标拖动选中一段时间，只查看改时间线内的请求
-   瀑布图中有两条竖线，一条蓝色，代表[DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event)事件发生的事件，一条红色代表[load](https://developer.mozilla.org/zh-CN/docs/Web/Events/load)事件发生的时间点

## 分析请求/请求列表

-   重播请求：右键点击 Requests 表格中的请求 -> `Replay XHR`
-   讲请求复制为 Fetch 代码 -> `Copy As Fetch`
-   手动清除浏览器缓存：右键点击 Requests 表格中的任意位置 -> 选择 `Clear Browser Cache`
-   手动清除浏览器 Cookie：右键点击 Requests 表格中的任意位置 -> 选择 `Clear Browser Cookies`
-   自定义列表中展示的列

![network2.png](https://i.loli.net/2019/04/22/5cbd553d024cc.png)

-   请求行排序，默认按照瀑布图 start time 升序排序，即请求发起的时间点：

![networkOrder.png](https://i.loli.net/2019/04/22/5cbd63427ece0.png)

-   每条请求，可以看到网络请求以及被清华求资源的全部信息：
    -   请求的一般信息：url、HTTP 方法(GET POST 等)、状态码、ip 地址
    -   请求相关：请求头、Initiator、Priority
    -   响应相关：响应头、响应内容
-   Initiator：请求的来源/发起者。parser：一般来自解析器解析到的 html 页面内的请求；script：来自脚本文件的请求。鼠标悬浮到 Initiator 列中的文件名上，可以看到发起当前请求的堆栈轨迹，点击文件名，可以定位到直接发起请求的代码
-   两个 size：在 size 列中，有两个数值，上面的较小值代表下载到的资源的大小，下面的较大值是资源解压后的大小。（例如 在 Content-Encoding 中可以看到的 gzip 和 br）

-   按住`shift`鼠标悬浮在请求行上，变绿色的行是当前行的发起者，红色的行是当前行的依赖项。

![initiator.png](https://i.loli.net/2019/04/22/5cbd9945dd05b.png)

-   Priority：High,Highest,Low。根据时间线中的蓝线和红线（DOMContentLoaded 和 load），以及请求的优先级，可以从结果的角度观察浏览器的加载流程。

## Websocket

-   在 network 的 filter 条件后，选择`ws`类型的请求，即可看到所有 Websocket 请求
-   在请求详情的 Message 栏中，可以看到 wensocket 全双工通信中客户端接收和发送的信息

![networkWebsocket.png](https://i.loli.net/2019/04/22/5cbdbe96a4597.png)

## Color Code：瀑布图中的几种颜色与代码

![colorCode.png](https://i.loli.net/2019/04/22/5cbdc5acaff77.png)

-   Queueing 排队，请求未发出，正在等待。 浏览器在以下情况下对请求排队：
    -   存在更高优先级的请求。
    -   此源已打开六个 TCP 连接，达到限值。 仅适用于 HTTP/1.0 和 HTTP/1.1（在 HTTP1 下浏览器一次最允许 6 个 TCP 连接，超出 6 个，就要 queue 排队)(优化 web 性能->避免 queue->合并资源请求）
    -   浏览器正在短暂分配磁盘缓存中的空间
-   Stalled/Blocking 停滞/阻塞，请求仍未发出。请求可能会因 Queueing 中描述的任何原因而停止。
-   DNS Lookup dns 查找，浏览器正在解析请求的 IP 地址，每次有指向新 domian 的请求时，会有 dns 查找的时间消耗。
-   Proxy negotiation 代理协商。 浏览器正在与代理服务器协商请求。
-   initial connection/connecting 正在初始化连接 或 正在连接，包含 tcp 的三次握手的时间
-   SSL 完成 SLL 握手所需要的时间
-   Request sent/senting 正在发送请求，发请求所占的时间，通常只有几分之一毫秒。
-   ServiceWorker Preparation。 浏览器正在启动 Service Worker。
-   Request to ServiceWorker。 正在将请求发送到 Service Worker。
-   Waiting (TTFB)。 浏览器正在等待响应的第一个字节。 TTFB 表示 Time To First Byte（至第一字节的时间）。 此时间包括 1 次往返延迟时间及服务器准备响应所用的时间。
-   Content Download。 浏览器正在接收响应。
-   Receiving Push。 浏览器正在通过 HTTP/2 服务器推送接收此响应的数据。
-   Reading Push。 浏览器正在读取之前收到的本地数据。

## 相关附注

### DOMContentLoaded 和 load 事件

-   DOMContentLoaded — 浏览器已经完全加载了 HTML，DOM 树已经构建完毕，但是像是 `<img>` 和样式表等外部资源可能并没有下载完毕。
-   load — 浏览器已经加载了所有的资源（图像，样式表等）。
-   beforeunload/unload -- 当用户离开页面的时候触发。
-   [更多](https://developer.mozilla.org/zh-CN/docs/Web/Events/DOMContentLoaded)

### data URLs

-   即前缀为 data: 协议的的 URL，其允许内容创建者向文档中嵌入小文件，例如浏览器 API canvas 支持的 base64 编码格式图片，[更多相关](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)
