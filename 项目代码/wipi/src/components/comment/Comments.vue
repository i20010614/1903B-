<template>
    <div class="commentList">
        <div
            class="_1f7ebMJKow4NcuDVTBnvOc _3G7_JYLS4EIxTgILiJm_A5"
            v-for="(item, index) in list"
            :key="index"
        >
            <div>
                <header>
                    <span
                        class="ant-avatar ant-avatar-circle"
                        style="
                            width: 32px;
                            height: 32px;
                            line-height: 32px;
                            font-size: 18px;
                            background-color: rgb(245, 34, 45);
                        "
                        ><span
                            class="ant-avatar-string"
                            style="
                                line-height: 32px;
                                transform: scale(1) translateX(-50%);
                            "
                            v-slicetext="item.name"
                        ></span></span
                    ><span class="_3xprCsLyoqZkArtvYiuAJU"
                        ><strong
                            >{{ item.name }} 回复 {{ userName }}</strong
                        ></span
                    >
                </header>
                <main style="padding: 12px 0px 12px 40px">
                    <div>
                        <p>{{ item.content }}</p>
                    </div>
                </main>
                <footer style="padding-left: 40px">
                    <div class="_14zvEeg141WRt1wf5S37nf">
                        <span>{{ item.userAgent }}</span>
                        <time v-time="item.createAt"></time>
                        <span
                            class="_2Mfm5YZlUu-Qe7c9dPeV7w"
                            @click="handleShow"
                        >
                            <span
                                role="img"
                                aria-label="message"
                                class="anticon anticon-message"
                                style="margin-right: 4px"
                            >
                                <svg
                                    viewBox="64 64 896 896"
                                    focusable="false"
                                    data-icon="message"
                                    width="1em"
                                    height="1em"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M464 512a48 48 0 1096 0 48 48 0 10-96 0zm200 0a48 48 0 1096 0 48 48 0 10-96 0zm-400 0a48 48 0 1096 0 48 48 0 10-96 0zm661.2-173.6c-22.6-53.7-55-101.9-96.3-143.3a444.35 444.35 0 00-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9a445.35 445.35 0 00-142 96.5c-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9A449.4 449.4 0 00112 714v152a46 46 0 0046 46h152.1A449.4 449.4 0 00510 960h2.1c59.9 0 118-11.6 172.7-34.3a444.48 444.48 0 00142.8-95.2c41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z"
                                    ></path>
                                </svg> </span
                            >回复</span
                        >
                    </div>
                    <comment-input v-show="show" :id="item.id">
                        <el-button type="primary" @click="handleShow"
                            >收起</el-button
                        >
                    </comment-input>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
import CommentInput from "./CommentInput.vue";
import { mapActions, mapState } from "vuex";
export default {
    data() {
        return {
            show: false,
        };
    },
    props: {
        id: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
        },
    },
    methods: {
        ...mapActions({
            getAllComment: "comment/getAllComment",
        }),
        handleShow() {
            this.show = !this.show;
        },
    },
    computed: {
        ...mapState({
            commentList: (state) => state.comment.commentList,
        }),
        list() {
            let result = this.commentList.filter(
                (item) => this.id == item.parentCommentId
            );
            return result;
        },
    },
    created() {
        this.getAllComment();
    },
    components: {
        CommentInput,
    },
};
</script>

<style scoped>
._1f7ebMJKow4NcuDVTBnvOc._3G7_JYLS4EIxTgILiJm_A5 {
    padding: 0 16px;
    background-color: var(--bg-second);
    margin-top: 10px;
    background-color: var(--bg-body);
    transition: all 2s;
}
._1f7ebMJKow4NcuDVTBnvOc._3G7_JYLS4EIxTgILiJm_A5 > div {
    padding: 16px 0;
    border-top: 1px solid var(--border-color);
    /* background-color: gold; */
}
._1f7ebMJKow4NcuDVTBnvOc._3G7_JYLS4EIxTgILiJm_A5 > div header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid #fff;
}
.ant-avatar {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-variant: tabular-nums;
    list-style: none;
    font-feature-settings: "tnum";
    position: relative;
    display: inline-block;
    overflow: hidden;
    color: #fff;
    white-space: nowrap;
    text-align: center;
    vertical-align: middle;
    background: #ccc;
    border-radius: 50%;
}
._1f7ebMJKow4NcuDVTBnvOc > div > header ._3xprCsLyoqZkArtvYiuAJU {
    color: var(--main-text-color);
    padding: 0 8px;
}
._1f7ebMJKow4NcuDVTBnvOc > div > main {
    font-size: 0.9rem;
}
._1f7ebMJKow4NcuDVTBnvOc > div > footer {
    font-size: 0.8rem;
}
._1f7ebMJKow4NcuDVTBnvOc > div > footer ._14zvEeg141WRt1wf5S37nf {
    color: var(--disable-text-color);
}
._1f7ebMJKow4NcuDVTBnvOc > div > footer ._2Mfm5YZlUu-Qe7c9dPeV7w {
    cursor: pointer;
    margin-left: 8px;
}
._1O35zVnb5a9JPB4JmcESvC {
    margin-top: 8px;
    padding: 4px 12px 12px;
    background-color: var(--bg-body);
}
._1O35zVnb5a9JPB4JmcESvC ._38SpXbKJ7U4Rn6pidTwNQa {
    color: var(--second-text-color);
    padding-top: 12px;
    text-align: center;
    border-top: 1px solid var(--border-color);
    cursor: pointer;
}
</style>