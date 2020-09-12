
# scarsu.com

[中文](./readme.md) | English

## Repo Introduce

- For：[ScarSu's Blog - www.scarsu.com](https://www.scarsu.com)
- Build Tool：[hexo](https://hexo.io) + [netlify](https://www.netlify.com/)
- [Detail Intro](https://www.scarsu.com/hello_hexo/)

## Repo Local Build Step

```bash
#clone to local
git clone https://github.com/scarsu/ScarSuHexo_Netlify.git
#global install hexo
npm install hexo -g
#install dependencies
npm install
#build and generate
hexo d -g
#run local server
hexo s
```

## Repo Directory Structure

```bash
.
├── _config.yml    #website config
├── package.json    #npm package info
├── scaffolds   #template folder
├── public   #Generated static resource folder (need to be added to file .gignore）
├── node_modules   #node_modules
├── source      #resource folder
|   ├── _posts     #markdown posts folder（daily update）
|   ├── _xx      #all folder start with ‘_’ will be ignored by HEXO complier
|   └── xx      #normal folder which are access in website
└── themes      #theme
    └── maupassant     #theme Maupassant folder
            ├── languages      #multi language folder
            ├── layout      #layout files
            ├── source      #theme resource
            └── _config.yml      #theme config

```

## hexo

### hexo layout

|layout | directory |
|--- | --- |
|post | source/_posts|
|page | source|
|draft | source/_drafts|

### create new page

```bash
hexo new [layout] <title>
```

`[layout]`: post/draft/page
