<template>
    <div class="navbar navbar-default topnav">
        <div class="container">
            <div class="navbar-header">
                <!-- toogle方法控制显示/隐藏 -->
                <button type="button" class="navbar-toggle" @click="toggleNav">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a href="/" class="navbar-brand">
                    <span class="title">{{ logo.title }}</span>
                    <img :src="logo.src" :alt="logo.title">
                </a>
            </div>

            <div id="top-navbar-collapse" :class="['collapse', 'navbar-collapse', {in: showCollapedNav}]">
                <ul class="nav navbar-nav">
                <li v-for="(item, index) in navList" :key="index" :class="{active: index == activeNavIndex}">
                    <a href="#" @click="changeNavIndex(index)">{{ item }}</a>
                </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TheHeader',
    data() {
        return {
            logo: {
                src: `${this.uploadsUrl}sites/ByvFbNlQYVwhvTyBgLdqitchoacDNznN.jpg`,
                title: 'vue-blog'
            },
            navList: ['社区', '头条', '问答', '教程'],   // 定义导航列表
            activeNavIndex: 0,                         // 当前被选中的导航的下标
            showCollapedNav: false,
        }
    },
    beforeCreate() {
        this.uploadsUrl = 'https://vuejscaffcdn.phphub.org/uploads/'
    },
    methods: {
        changeNavIndex(index) {
            this.activeNavIndex = index
        },

        toggleNav() {
            this.showCollapedNav = ! this.showCollapedNav
        }
    }
}
</script>

<style scoped>
    .title {
        display: none;
    }
    .navbar-default .navbar-nav > .active > a {background-color: rgba(0,0,0,.03)}
</style>