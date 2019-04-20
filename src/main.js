// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App' // 引入 App.vue 根组件
import router from './router/index'   // 引入路由配置文件返回的对象, 这里的 index 可以省略不写

Vue.config.productionTip = false  // 设置 false 阻止 vue 在启动时生成生产提示

// eslint 配置，允许 new 一个实例后不赋值，我们没有使用 eslint ，如果有则下一步的注释不可缺少
/* eslint-disable no-new */

new Vue({
  el: '#app',             // 在 index.html 中可以找到 #app 的 DOM 元素
  router,                 // 注入路由对象  router: router 的简写
  components: { App },    // 这个 App 就是 开头第二行 import 的 App ；  是{ App: App } 的缩写
  template: '<App/>'      // 和上一步的 App 相对应
})
