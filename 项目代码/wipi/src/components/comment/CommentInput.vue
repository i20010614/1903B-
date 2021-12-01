<template>
  <div class="commentTop">
    <div class="input">
      <div class="input_left">
        <span
          class="ant-avatar ant-avatar-circle ant-avatar-icon"
          style="width: 28px; height: 28px; line-height: 28px; font-size: 14px"
          ><span role="img" aria-label="user" class="anticon anticon-user"
            ><svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="user"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"
              ></path></svg></span
        ></span>
      </div>
      <div class="input_right">
        <div class="input_right_top">
          <textarea
            name=""
            id=""
            cols="30"
            rows="8"
            placeholder="请输入评论内容 (支持Markdown)"
            v-model="conText"
          ></textarea>
        </div>
        <div class="input_right_bottom">
          <p>
            <span
              ><svg viewBox="0 0 1024 1024" width="18px" height="18px">
                <path
                  d="M288.92672 400.45568c0 30.80192 24.97024 55.77216 55.77216 55.77216s55.77216-24.97024 55.77216-55.77216c0-30.7968-24.97024-55.76704-55.77216-55.76704s-55.77216 24.97024-55.77216 55.76704z m334.60224 0c0 30.80192 24.97024 55.77216 55.77216 55.77216s55.77216-24.97024 55.77216-55.77216c0-30.7968-24.97024-55.76704-55.77216-55.76704s-55.77216 24.97024-55.77216 55.76704z m-111.5392 362.4704c-78.05952 0-156.13952-39.08096-200.75008-100.3776-16.77312-22.31296-27.84256-50.15552-39.08096-72.45824-5.53472-16.77312 5.5296-33.4592 16.77312-39.08096 16.77312-5.53472 27.84256 5.53472 33.46432 16.768 5.53472 22.30784 16.77312 39.08608 27.84256 55.77728 44.61568 55.76704 100.38272 83.69664 161.664 83.69664 61.30176 0 122.7008-27.84256 156.16-78.07488 11.15136-16.77824 22.30784-38.99904 27.84256-55.77728 5.62176-16.768 22.30784-22.30272 33.4592-16.768 16.768 5.53472 22.30784 22.30272 16.768 33.4592-5.61152 27.84256-22.2976 50.14528-39.08096 72.45824-38.912 61.37856-116.98176 100.3776-195.06176 100.3776z m0 194.51392C268.4928 957.44 66.56 755.52256 66.56 511.99488 66.56 268.48256 268.4928 66.56 511.98976 66.56 755.50208 66.56 957.44 268.48256 957.44 511.99488 957.44 755.52256 755.50208 957.44 511.98976 957.44z m0-831.45728c-213.78048 0-386.00192 172.21632-386.00192 386.01216 0 213.8112 172.22144 386.0224 386.00192 386.0224 213.80096 0 386.0224-172.2112 386.0224-386.0224 0-213.79584-172.22144-386.01216-386.0224-386.01216z"
                  fill="currentColor"
                ></path></svg
              >
              <el-popover
                placement="bottom"
                width="200"
                trigger="click"
              >
              <div class="express">
                  <span
                    @click="changeEmojis(item)"
                    v-for="(item, key) in emojis"
                    :key="key"
                  >
                    {{ item }}
                  </span>
                </div>
                <span slot="reference">表情</span>
              </el-popover>
            </span>
            <span>
              <slot></slot>
              <el-button type="primary" @click="handleSubmit">发布</el-button>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emojis } from "../../utils/emojis";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      emojis,
      show: false,
      conText: "",
    };
  },
  props: {
    id: {
      type: String,
      default: null,
    },
    handleShow: {
      type: Function,
    },
  },
  computed: {
    ...mapState({
      commentList: (state) => state.comment.commentList,
    }),
  },
  methods: {
    ...mapActions({
      addComment: "comment/addComment",
      getAllComment: "comment/getAllComment",
    }),
    handleSubmit() {
      console.log('submit');
      this.addComment({
        content: this.conText,
        email: "1712299803@qq.com",
        hostId: "7d656dea-3b60-433a-848e-caf01081173d",
        name: "jason",
        url: "/page/2231123",
        parentCommentId: this.id,
      });
      this.getAllComment();
      this.handleShow && this.handleShow();
    },
    changeEmojis(val) {
      this.conText += val;
    },
  },
};
</script>

<style lang="scss" scoped>
.commentTop {
  background-color: #fff;
  // transition: all 1s;
  // @keyframes animation_right_top {
  //   0% {
  //     transform: scaleY(0.1);
  //   }
  //   100% {
  //     transform: scaleY(1);
  //   }
  // }
  animation: animation_right_top 1s ease 1;
  transform-origin: 100% 0%;

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
        }
      }
    }
  }
}
</style>
