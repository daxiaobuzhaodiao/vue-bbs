# vue-bbs

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# 笔记
- 单文件组件的文件名，应该始终以单词大写开头（PascalCase），或者始终以横线（kebab-case）连接。推荐使用大写开头的方式。
- 像 src 或 alt ... 都是 HTML 特性，不能使用 Mustache(双大括号：{{  }}) 语法，而要使用 v-bind 指令，:src 是 v-bind:src 的缩写
- 在 style 标签内 ~ 指向 node_modules 目录
  在 style 标签内 $fa-font-path 是 font-awesome 的一个变量，用于制定字体路径
- 在 style 标签内 $icon-font-path 是 bootstrap-sass 的一个变量，用于指定字体路径
- 在使用 import 引入模块时，我们使用了 @ 符号，该别名指向的是 src 目录，你可以从 webpack 配置文件 build/webpack.base.conf.js 找到其定义
- 局部指令
    - 新建 `src/directives/title.js`
    - 在任意组件中引入指令 `import title from '@/directives/title'`, `directives: {title}`
    - `v-title=""` 使用指令
- 路由
    - 新建 src/router/index.js
    - src/main.js 引入路由文件
- 
     