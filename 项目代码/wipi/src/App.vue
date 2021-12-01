<template>
    <div class="App">
        <header :class="flag ? 'active' : ''">
            <Nav :articleList="articleList" />
        </header>
        <div :class="flag ? 'rel' : ''"></div>
        <keep-alive>
            <component :is="newItem"></component>
        </keep-alive>
        <main>
            <div>
                <div class="container">
                    <router-view></router-view>
                </div>
            </div>
            <Copyright v-if="this.$router.history.current.name === 'Detail'" />
            <Copyright v-if="this.$router.history.current.name === 'board'" />
            <Copyright v-if="this.$router.history.current.name === 'About'" />
            <Copyright v-if="this.$router.history.current.path === '/Bookletdetail/71f67691-465b-44b6-9927-ae94d45802e5/390dd168-fe5b-432f-a448-555c8551f41d'" />
        </main>
        <Backtop />
    </div>
</template>

<script>
// 引入导航栏组件
import Nav from "./components/nav/Nav.vue";
import Copyright from "./components/copyright/Copyright.vue";
// 引入关于页面上半部分 组件
import AboutTop from "./components/aboutTop/About.vue";
// 引入留言板页面上半部分布局
import MessageBoard from "./components/messageBoard/MessageBoard.vue";
import Backtop from "./components/Backtop/Backtop.vue";
import { mapState } from "vuex";
export default {
    name: "ThemeBody",
    data() {
        return {
            body_now: null,
            flag: false,
        };
    },
    computed: {
        ...mapState({
            newItem: (state) => state.app.newItem,
            bookletbottom:(state)=>state.app.bookletbottom,
            articleList: (state) => state.article.articleList,
        }),
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll, true);
    },
    methods: {
        handleScroll() {
            // 页面滚动距顶部距离
            var scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            var scroll = scrollTop - this.i;
            this.i = scrollTop;
            if (scroll < 0) {
                this.flag = true;
            } else {
                this.flag = false;
            }
        },
        change: function (type) {
            if (type == 1) {
                document
                    .getElementById("style")
                    .setAttribute("href", "../static/css/one.css");
                localStorage.setItem("style", "../static/css/one.css");
            } else if (type == 2) {
                document
                    .getElementById("style")
                    .setAttribute("href", "../static/css/two.css");
                localStorage.setItem("style", "../static/css/two.css");
            }
        },
    },
    components: {
        Nav,
        Copyright,
        AboutTop,
        MessageBoard,
        Backtop,
    },
};
</script>
<style lang="scss" scoped>
.active {
    transition: all 1s;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 10;
    background-color: var(--bg-second);
}
.rel {
    position: relative;
    top: 0;
    width: 100%;
    height: 64px;
    background-color: var(--bg-body);
}
header {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
}
main {
    background-color: var(--bg-body);
    min-height: calc(100vh - 64px);
}
main > div {
    display: flex;
    align-items: center;
    justify-content: center;
}
.msgborad_top {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 151px;
    // background: #fff;
    background-color: var(--bg-second);
    text-align: center;
    border-top: 1px #eee solid;
    > h2 {
        width: 100%;
        height: 48px;
        margin-top: 15px;
        line-height: 48px;
        font-size: 26px;
    }
    > p {
        width: 100%;
        height: 20px;
        margin: 8px 0;
    }
}
</style>

