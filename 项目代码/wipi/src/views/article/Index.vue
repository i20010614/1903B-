<template>
    <div>
        <div class="left">
            <router-view />
        </div>
        <Right :articleList="articleList" :tagList="tagList" />
    </div>
</template>

<script>
import Right from "@/components/rightall/Right.vue";
// import Carousel from "@/components/carousel/Carousel.vue";
import { mapState, mapActions } from "vuex";

export default {
    components: { Right },
    computed: {
        ...mapState({
            articleList: (state) => state.article.articleList,
            tagList: (state) => state.tag.tagList,
        }),
    },
    methods: {
        ...mapActions({
            getArticleList: "article/getArticleList",
            getTagList: "tag/getTagList",
        }),
    },
    created() {
        this.getArticleList();
        this.getTagList();
    },
};
</script>

<style>
</style>