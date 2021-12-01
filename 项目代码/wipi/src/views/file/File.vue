<template>
    <div id="file">
        <div class="left">
            <div class="_31uY1VinxiwKyG_XZXFpv">
                <div class="_1tJ6zWK6o_q8KafBWysrmZ">
                    <p><span>归档</span></p>
                    <p>
                        共计 <span>{{ articleList.length }}</span> 篇
                    </p>
                </div>
                <div class="GIf9xHwpzxlxHcDyE8sCn">
                    <h2>2021</h2>
                    <div class="_172XrbegThYDU7WfEHTUpM">
                        <h3>November</h3>
                        <ul>
                            <li v-for="item in articleList" :key="item.id">
                                <span class="OTAyqb_MWljCg91UnBG5u"
                                    >11-04</span
                                >
                                <span
                                    class="JxUmPoeJKqnfS58GvD3vz"
                                    @click="godetail(item.id)"
                                    >{{ item.title }}</span
                                >
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <Right :articleList="articleList" :tagList="tagList" />
    </div>
</template>

<script>
import Right from "@/components/rightall/Right.vue";
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
        godetail(id) {
            this.$router.push(`/detail/${id}`);
        },
    },
    created() {
        this.getArticleList();
        this.getTagList();
    },
};
</script>

<style></style>
