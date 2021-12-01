<template>
    <div class="commentList">
        <comment-item
            v-for="(item, index) in commentList"
            :key="index"
            :item="item"
        >
        </comment-item>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CommentItem from "./CommentItem.vue";
export default {
    methods: {
        ...mapActions({
            getAllComment: "comment/getAllComment",
        }),
    },
    computed: {
        ...mapState({
            commentList: (state) => state.comment.commentList,
        }),
    },
    components: {
        CommentItem,
    },
    mounted() {
        this.getAllComment();
    },
};
</script>

<style scoped>
.commentList {
    margin-top: 10px;
    background-color: var(--bg-second);
}
</style>