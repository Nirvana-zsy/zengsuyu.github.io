[ScarSuHexoBlog](https://scarsu.github.io)

```

npm install hexo -g #安装  
npm update hexo -g #升级  
hexo init #初始化

hexo p == hexo publish
hexo g == hexo generate#生成
hexo s == hexo server #启动服务预览
hexo d == hexo deploy#部署

hexo server #Hexo 会监视文件变动并自动更新，您无须重启服务器。
hexo server -s #静态模式
hexo server -p 5000 #更改端口
hexo server -i 192.168.1.1 #自定义 IP
hexo clean #清除缓存 网页正常情况下可以忽略此条命令
hexo g #生成静态网页
hexo d #开始部署

一下两个命令的作用是相同的
hexo generate --deploy
hexo deploy --generate
```