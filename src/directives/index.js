import Vue from 'vue'
import validator from './validator'

// validator    是对象， 其中使用了三个钩子函数
// bind         只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
// inserted     被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
// unbind       只调用一次，指令与元素解绑时调用。
Vue.directive('validator', validator)