---
title: 用jenkins搭建前端CI流程
categories:
    - 10技术 | 前端
date: 2020-12-05
description: 用jenkins搭建前端CI流程
toc: 1
top: 0
---

https://www.jianshu.com/p/d6a6ecb31bd1?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation

https://zhuanlan.zhihu.com/p/26701038

https://www.mdnice.com/?outId=c0b5493e4e2442edaa81ac31020a3022

```
登录配置，ssh，ftp

装docker，docker compose

(装数据库，redis，配docker)

装nginx(/home/docker-compose/nginx)）（/etc/nginx/nginx.conf）(/root/project/NotionX/dist)
配置nginx代理 /etc/nginx/nginx.conf
nginx status页面账户 nginx/nginx
重启nginx服务 service nginx restart

阿里云ecs配置防火墙（开启http端口）

安装nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
安装node
nvm install v10.15.0
nvm use v10.15.0


装jenkins（v2.7.3）
root用户登录
yum install -y java
wget http://pkg.jenkins-ci.org/redhat-stable/jenkins-2.7.3-1.1.noarch.rpm
rpm -ivh jenkins-2.7.3-1.1.noarch.rpm
修改配置 vi /etc/sysconfig/jenkins
vi /etc/sysconfig/jenkins 
JENKINS_PORT="8081" 保存
阿里云ecs防火墙添加 自定义tcp 8081端口
启动重启service jenkins start/stop/restart
打开网页 IP:8081
查看密码：cat /var/lib/jenkins/secrets/initialAdminPassword
ea5e853eab5e4b62bbf5a50daa9151ce
安装推荐插件，等待
创建管理员账户 jenkins 域9.大名


查看环境变量
echo $PATH
/root/.nvm/versions/node/v12.16.1/bin:/sbin:/bin:/usr/sbin:/usr/bin



网易云服务
cd /srv
添加服务要调用的shell脚本文件
sudo vi  netcloudmusic.sh 
```
#!/bin/sh
npx @nondanee/unblockneteasemusic -s -p 8080
```

cd /etc/systemd/system
添加自定义服务
sudo vi  netcloudmusic.service
```
[Unit]
Description=netcloudmusic

[Service]
ExecStart=/bin/sh /srv/netcloudmusic.sh #启动脚本
Restart=no
User=root
Group=root
Environment=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/.nvm/versions/node/v12.16.1/bin

[Install]
WantedBy=multi-user.target
```
给执行权限 chmod +x netcloudmusic.service
启动 systemctl start netcloudmusic
查看状态 systemctl status netcloudmusic.service
更改 service文件后重新加载systemctl daemon-reload
重启 systemctl restart netcloudmusic




jenkins自动构建github-scarsu.com
jenkins安装github插件/node插件
jenkins配置环境变量
	执行echo $PATH
	得到环境变量（/home/admin/.nvm/versions/node/v10.15.0/bin:/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/admin/.local/bin:/home/admin/bin
	jenkins-系统管理-系统配置-全局属性-环境变量
	添加一条
		PATH
		/home/admin/.nvm/versions/node/v10.15.0/bin:/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/admin/.local/bin:/home/admin/bin
jenkin创建一个项目 类型github,填上自己的项目仓库地址。
可以选择丢弃旧的构建，这样不会占空间。
策略选择Log Rotation 不知道是什么，但是只能选这个。
源码管理：选git,填仓库地址,验证，配置自己github的账户密码
Branches to build ：填写需要监听的仓库分支。如：*/master
构建触发器：选择GitHub hook trigger for GITScm polling。
构建环境 选择provide node，选择已经安装（在系统工具中安装）的某版本node
执行shell。填写需要执行的命令。这个时候命令行的目录是仓库里最新源码所在的目录。
```
# 依赖
npm install
npm install hexo-cli -g
# 打包
hexo g
# 转移
sudo cp -R ./public/* /var/www/scarsu
```
jenkins用户添加sudo权限
	chmod u+w /etc/sudoers
	vi /etc/sudoers
	添加一行jenkins ALL=NOPASSWD:ALL
配置github，仓库-settings-webhook-add hook
	Payload URL：http://scarsu.cn:8081/github-webhook/（jenkins地址/github-webhook）(结尾一定要加/，浪费我一下午时间！！)
	content-type：json
	trigger：just push
	Actice：check
配置jenkins 系统配置-Github-高级选项-为 Github 指定另外一个 Hook URL，填写为http://scarsu.cn:8081/github-webhook/，保存
回到jenkins，立即构建：success
代码仓库push测试，构建成功




jenkins自动构建github-notionx
```