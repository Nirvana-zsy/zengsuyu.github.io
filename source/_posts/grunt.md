---
title: Grunt 学习总结
categories:
    - 06 构建工具 # 一级分类
tags:
date: 2019-06-01
description: 自动化 压缩（minification）、编译、单元测试、linting等
toc: 1
top: 0
---

# 是什么 & 用途 & 场景
grunt本身是一种自动化任务处理工具，它是一个工具框架，有很多插件扩展它的功能。

通过丰富的grunt插件可以实现以下功能：
- jshint代码检查
- 代码合并
- 代码压缩--js/css/html都可以
- SASS/LESS编译css
- watch监听---文件发生改变自动执行任务

# 相关
- [官方github](https://github.com/gruntjs)
- [官方网址（文档）](https://gruntjs.com/)
- [中文文档](http://www.gruntjs.net/)
- [插件列表](https://gruntjs.com/plugins)

# 环境
grunt依赖Nodejs和npm环境

使用npm安装全局grunt-cli命令行工具：`npm install -g grunt-cli`

# demo
1. 需求

假设你手上有一个项目，叫gruntlearn，项目文件中你的源码存储在src目录下，包含四个模块的js文件，还没编译的scss文件，html文件，图片文件：

![demo src 目录结构](/images/grunt/grunt01.png)

现在你想用grunt，自动给你的源代码执行几个任务：
- 将images/html和复制到 发布文件夹build下
- 用jshint检查js语法
- 合并四个js文件（分别合并，因为a,b用于不同的页面）
- 编译scss文件
- 压缩合并后的js文件，存储到build下
- 调试：新建一个本地服务器监听文件改变自动刷新HTML文件

2. 搭建环境

- 在命令行里打开到gruntlearn的目录下，执行`npm init`
- 安装 grunt 和 grunt-cli
```bash
npm install grunt-cli --global
npm install grunt --save-dev
```

- 在项目中安装grunt和相关插件,根据第1步中的需求，需要用到一下插件：
    - 复制文件：grunt-contrib-copy
    - 合并文件：grunt-contrib-concat
    - 语法检查：grunt-contrib-jshint
    - Scss 编译：grunt-contrib-sass
    - 压缩文件：grunt-contrib-uglify
    - 监听文件变动：grunt-contrib-watch
    - 建立本地服务器：grunt-contrib-connect
- 安装插件：
```bash
npm install --save-dev grunt-contrib-copy grunt-contrib-concat grunt-contrib-jshint grunt-contrib-sass grunt-contrib-uglify grunt-contrib-watch grunt-contrib-connect
```
- 创建gruntfile.js文件，代码结构：
![gruntfile.js 代码结构](/images/grunt/grunt02.png)

- 根据demo需求配置gruntfile：
```js
//wrapper函数
module.exports = function(grunt) {

    //你可以像普通的js文件一样添加自己的代码
    var sassStyle = 'expanded';

    //1.配置任务 tasks--根据插件的文档来定义任务
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //将html和图片从src复制到build
        copy: { //task
            html: { //target
                files: [
                    { expand: true, cwd: './src/html', src: '*', dest: './build/html/' }
                ]
            },
            images: { //target
                files: [
                    { expand: true, cwd: './src/images', src: '*', dest: './build/images/' }
                ]
            }
        },
        //合并js
        concat: {
            /* options: {
                separator: ';',//合并分隔符
            }, */
            dist: {
                files: { //文件路径
                    './src/js/a.all.js': ['./src/js/a.1.js', './src/js/a.2.js'],
                    './src/js/b.all.js': ['./src/js/b.1.js', './src/js/b.2.js']
                }
            },
        },
        //task:编译sass
        sass: {
            output: { //target
                options: { //target options
                    style: sassStyle
                },
                files: {
                    './build/css/style.css': './src/scss/style.scss' //'目标文件':'源文件'
                }
            }
        },
        //代码检查
        jshint: {
            all: ['./src/js/a.all.js', './src/js/b.all.js']
        },
        //压缩
        uglify: {
            uglifyjs: {
                files: {
                    './build/js/a.min.js': ['./src/js/a.all.js'],
                    './build/js/b.min.js': ['./src/js/b.all.js']
                }
            }
        },
        //监听
        watch: {
            scripts: {
                files: ['./src/js/a.1.js', './src/js/a.2.js', './src/js/b.1.js', '/src/js/b.2.js'],
                tasks: ['concat', 'jshint', 'uglify']
            },
            sass: {
                files: ['./src/scss/style.scss'],
                tasks: ['sass']
            },
            livereload: {
                options: {
                    liverelload: '<%= connect.options.livereload %>'
                },
                files: [
                    './src/html/index.html',
                    './src/scss/style.scss',
                    './src/js/a.1.js',
                    './src/js/a.2.js',
                    './src/js/b.1.js',
                    './src/js/b.2.js'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                open: true,
                livareload: 35729,
                //change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            server: {
                options: {
                    port: 9001,
                    base: './'
                }
            }
        }
    });

    //2.加载插件
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    //3.注册任务
    grunt.registerTask('copyhtml', ['copy:html']); //可以用task：target的方法分别注册
    grunt.registerTask('concatjs', ['concat']); //也可以只用task名称注册，默认执行task下全部target
    grunt.registerTask('outputcss', ['sass']);
    grunt.registerTask('watchit', ['concat', 'sass', 'jshint', 'uglify', 'connect', 'watch']);
    grunt.registerTask('default', ['copy', 'concat', 'sass', 'jshint', 'uglify']);
}
```

- 执行定义好的命令`grunt default`：
![执行命令](/images/grunt/grunt03.png)

- 执行后的项目目录结构：
![执行后目录结构](/images/grunt/grunt04.png)
