<template>
    <div class="spring">
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
        >
            <span v-if="flag">支付金额 {{ list.totalAmount }}</span>
            <p v-else>密码：<input type="text" placeholder="请输入密码" /></p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">{{
                    btnCon
                }}</el-button>
            </span>
        </el-dialog>
        <slot></slot>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            flag: false,
            dialogVisible: false,
            title: null,
            btnCon: null,
        };
    },
    computed: {
        ...mapState({
            list: (state) => state.detail.detailList,
        }),
    },
    methods: {
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then(() => {
                    done();
                })
        },
    },
    mounted() {
        if (this.list.totalAmount != null && this.list.totalAmount > 0) {
            this.title = "确认一下收费信息";
            this.btnCon = "立即支付";
            this.dialogVisible = true;
            this.flag = true;
        } else {
            this.dialogVisible = false;
        }
        if (this.list.needPassword) {
            this.title = "文章受保护，请输入访问密码";
            this.btnCon = "确认";
            this.dialogVisible = true;
            this.flag = false;
        }
    },
};
</script>

<style scoped>
</style>