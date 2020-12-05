
# scarsu.com

中文 | [English](./readme_en.md)

## 本仓库介绍

- 本仓库是：[ScarSu的个人博客-www.scarsu.com](https://www.scarsu.com)
- 搭建工具：[hexo](https://hexo.io)
- 部署工具：[netlify](https://www.netlify.com/) 或者 服务器+jenkins+nginx
- [详细介绍](https://www.scarsu.com/hello_hexo/)

## 本仓库本地搭建步骤

```bash
#克隆仓库到本地
git clone https://github.com/scarsu/ScarSuHexo_Netlify.git
#全局安装hexo
npm install hexo -g
#安装相关依赖
npm install
#构建打包
hexo d -g
#运行本地服务器
hexo s
```

## 本仓库目录结构

```bash
.
├── _config.yml    #网站配置
├── package.json    #npm包信息
├── scaffolds   #模板文件夹
├── public   #生成的静态资源文件夹（需要添加到.gitignore文件中）
├── node_modules   #项目依赖的node模块（需要添加到.gitignore文件中）
├── source      #资源文件夹
|   ├── _posts     #markdown文档文件夹（日常更新md文章存放路径）
|   ├── _xx      #所有_开头的文件夹会被编译器忽略
|   └── xx      #不会被编译器识别的普通文件夹 但是会直接打包的资源目录 （可访问）
└── themes      #主题
    └── maupassant     #maupassant主题包
            ├── languages      #多语言文件
            ├── layout      #布局模板文件
            ├── source      #主题资源
            └── _config.yml      #主题配置

```

## hexo

### hexo layout

|布局 | 路径|
|--- | --- |
|post | source/_posts|
|page | source|
|draft | source/_drafts|

### 创新新页面

```bash
hexo new [layout] <title>
```

`[layout]`: post/draft/page

`<title>`: 标题
