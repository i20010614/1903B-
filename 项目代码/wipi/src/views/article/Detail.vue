<template>
    <Spring>
        <div class="det">
            <div class="left">
                <image-viewer>
                    <high-light>
                        <div class="left_detail">
                            <div class="left_img">
                                <img :src="detailList.cover" />
                            </div>
                            <h1>{{ detailList.title }}</h1>
                            <div class="time">
                                {{ detailList.createAt | formatDate }} • 阅读量
                                {{ detailList.views }}
                            </div>
                            <div id="con" v-html="detailList.html"></div>
                        </div>
                    </high-light>
                </image-viewer>
                <div id="pl">
                    <p class="pone">评论</p>
                    <CommentInput :id="$route.params.id"></CommentInput>
                </div>
                <Recommend :recommendList="articleList" />
            </div>
            <Catalog />
            <Frame :detailList="detailList" :flag="flag" @setLike="likes" />
        </div>
    </Spring>
</template>

<script>
// 引入detail仓库的state和action
import { mapState, mapActions } from "vuex";
// import right from "../../components/rightall/Right.vue";
import Recommend from "../../components/recommend/Recommend.vue";
import HighLight from "../../components/highLight/HighLight.vue";
import ImageViewer from "../../components/imageViewer/ImageViewer.vue";
import Catalog from "../../components/catalog/CataLog.vue";
import Frame from "../../components/frame/Frame.vue";
import CommentInput from "../../components/comment/CommentInput.vue";
import Spring from "../../components/spring/Spring.vue";

export default {
    data() {
        return {
            flag: false,
            dom: [],
        };
    },
    computed: {
        ...mapState({
            detailList: (state) => state.detail.detailList,
            articleList: (state) => state.article.articleList,
            tagList: (state) => state.tag.tagList,
        }),
    },
    components: {
        // right,
        Recommend,
        HighLight,
        ImageViewer,
        Frame,
        Catalog,
        CommentInput,
        Spring,
    },
    watch: {
        $route: function () {
            const { id } = this.$route.params;
            this.getDetailList({ id });
        },
    },
    methods: {
        ...mapActions({
            getDetailList: "detail/getDetailList",
            getArticleList: "article/getArticleList",
            getTagList: "tag/getTagList",
            getAllComment: "comment/getAllComment",
        }),
        likes() {
            this.flag = !this.flag;
            if (this.flag) {
                this.detailList.likes++;
            } else {
                this.detailList.likes--;
            }
        },
    },
    created() {
        const { id } = this.$route.params;
        this.getDetailList({ id });
        this.getArticleList();
    },
};
</script>

<style lang='scss'>
.det{
    display: flex;
}
#pl {
    border-bottom: 1px solid #e5e6eb;
    background-color: var(--bg-body);
}
#pl p.pone {
    padding-top: 16px;
    margin-bottom: 16px;
    color: var(--main-text-color);
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.06em;
}
</style>