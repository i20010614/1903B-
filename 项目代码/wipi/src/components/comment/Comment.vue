<template>
    <div class="comment">
        <comment-input></comment-input>
        <comment-list></comment-list>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import CommentList from "./CommentList.vue";
import CommentInput from "./CommentInput.vue";
export default {
    methods: {
        ...mapActions({
            getAllComment: "comment/getAllComment",
            addComment: "comment/addComment",
        }),
        handleSubmit() {
            this.addComment({
                content: this.conText,
                email: "1712299803@qq.com",
                hostId: "7d656dea-3b60-433a-848e-caf01081173d",
                name: "jason",
                url: "/page/2231123",
            });
            this.getAllComment();
        },
    },
    components: {
        CommentList,
        CommentInput,
    },
};
</script>

<style lang="scss" scoped>
.comment {
    width: 100%;
    max-width: 768px;
    height: auto;
    background-color: var(--bg-second);
    margin-top: 5px;
    margin: 0 auto;
    .input {
        width: 100%;
        height: 170px;
        display: flex;
        .input_left {
            width: 50px;
            height: 100%;
            text-align: center;
            > span {
                width: 28px;
                height: 28px;
                line-height: 28px;
                text-align: center;
                display: inline-block;
                background: #eee;
                border-radius: 50%;
                margin-top: 10px;
            }
        }
        .input_right {
            flex: 1;
            .input_right_top {
                width: 100%;
                height: 110px;
                > textarea {
                    width: 90%;
                    height: 98px;
                    margin: 0 5%;
                    padding-left: 5px;
                    padding-top: 5px;
                    margin-top: 10px;
                }
            }
            .input_right_bottom {
                height: 60px;
                > p {
                    width: 90%;
                    height: 100%;
                    margin: 0 5%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    > .btn {
                        width: 50px;
                        height: 30px;
                        border: solid 1px #000;
                        text-align: center;
                        line-height: 30px;
                    }
                }
            }
        }
    }
}
</style>