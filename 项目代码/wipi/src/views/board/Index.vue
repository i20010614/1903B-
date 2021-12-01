<template>
    <div class="board">
        <div class="msgborad">
            <div class="heads">评论</div>
            <Comment></Comment>
        </div>
        <Recommend :recommendList="articleList" />
    </div>
</template>
<script>
import Recommend from "../../components/recommend/Recommend.vue";
import Comment from "../../components/comment/Comment";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
    components: {
        Comment,
        Recommend,
    },
    computed: {
        ...mapState({
            articleList: (state) => state.article.articleList,
        }),
    },
    methods: {
        ...mapActions({
            getArticleList: "article/getArticleList",
        }),
        ...mapMutations({
            changeItem: "app/changeItem",
        }),
        godetail(id) {
            this.$router.push(`/detail/${id}`);
        },
    },
    created() {
        this.getArticleList();
    },
    mounted() {
        this.changeItem("MessageBoard");
    },
    destroyed () {
      this.changeItem('null');
    }
};
</script>

<style lang="scss" scoped>
div {
    flex-direction: column;
}
.msgborad {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .heads {
        width: 100%;
        height: 50px;
        text-align: center;
        line-height: 50px;
    }
}
</style>
