import Vue from 'vue'
import Vuex from 'vuex'
import ls from '../utils/localStorage'
import router from '../router/index'

Vue.use(Vuex)

const state = {
    // 用户信息，初始值从本地 localStorage 获取
    user: ls.getItem('user')
}

const mutations = {
    // UPDATE_USER 是事件类型名称，大小不是必须的，后期可以使用常量代替事件类型，
    // 参数 state 是当前仓库的 state， user 是用传入的参数，如果是多个参数则应该使用一个对象
    UPDATE_USER(state, user) {
        // 改变 user 的值
        state.user = user
        // 将改变后的值存入 localStorage
        ls.setItem('user', user)
    }
}

const actions = {
    login({commit}, user) {
        // 登陆时有传用户信息，就更新下用户信息
        if(user) commit ('UPDATE_USER', user)
        // 跳转到首页
        router.push('/')
    }
}

const store = new Vuex.Store({
    state,
    mutations,
    actions
})

export default store

// 使用 new Vuex.Store 创建了一个新的 store（仓库）实例，其配置项说明：
// state：共享的状态，我们不能直接更改状态，但是可以像 store.state.user 这样访问一个状态；
// mutations：更改状态的方法，我们可以在这里更改状态，调用方法是像 store.commit('UPDATE_USER', user) 这样提交一个事件类型，这里不能包含异步操作；
// actions：类似于 mutations，但我们不在这里直接更改状态，而是提交前面的 mutation，调用方法是像 store.dispatch('login') 这样分发一个事件，这里可以包含异步操作；