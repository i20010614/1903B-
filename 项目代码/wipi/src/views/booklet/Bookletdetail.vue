<template>
  <div class="bookletdetail">
    <div class="left">
      <p class="detailtitle">
        知识小册&nbsp;/&nbsp;Web&nbsp;{{ bookdetail.title }}
      </p>
      <b class="title">{{ bookdetail.summary }}</b>
      <div class="leftbody">
        <img :src="bookdetail.cover" alt="" />
        <p>
          <b>{{ bookdetail.title }}</b>
        </p>
        <p>{{ bookdetail.summary }}</p>
        <p>2339 次阅读·2021-07-24 13:11:21</p>
        <button @click="btndetailchild(bookdetail.id, bookdetail.children)">
          开始阅读
        </button>
        <div class="network">
          <p v-for="(item, index) in bookdetail.children" :key="index" @click="btn(index)">
            <span>{{ item.title }}</span
            ><b>2021-07-24 13:11:21</b>
          </p>
        </div>
      </div>
    </div>
    <div class="right">
      <p><b>其他知识笔记</b></p>
      <div
        v-for="(item, index) in knowList.slice(ind+1, ind+5)"
        :key="index"
        class="bottom_right"
        @click.stop="btnleft(item.id)"
      >
        <p>
          <span
            ><b>{{ item.title }}</b></span
          >
          <span>8天前</span>
        </p>
        <div class="item">
          <div>
            <p id="act">{{ item.summary }}</p>
            <p>
              <span @click="erwei()">
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="share-alt"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M752 664c-28.5 0-54.8 10-75.4 26.7L469.4 540.8a160.68 160.68 0 000-57.6l207.2-149.9C697.2 350 723.5 360 752 360c66.2 0 120-53.8 120-120s-53.8-120-120-120-120 53.8-120 120c0 11.6 1.6 22.7 4.7 33.3L439.9 415.8C410.7 377.1 364.3 352 312 352c-88.4 0-160 71.6-160 160s71.6 160 160 160c52.3 0 98.7-25.1 127.9-63.8l196.8 142.5c-3.1 10.6-4.7 21.8-4.7 33.3 0 66.2 53.8 120 120 120s120-53.8 120-120-53.8-120-120-120zm0-476c28.7 0 52 23.3 52 52s-23.3 52-52 52-52-23.3-52-52 23.3-52 52-52zM312 600c-48.5 0-88-39.5-88-88s39.5-88 88-88 88 39.5 88 88-39.5 88-88 88zm440 236c-28.7 0-52-23.3-52-52s23.3-52 52-52 52 23.3 52 52-23.3 52-52 52z"
                  ></path></svg
                >&nbsp;分享</span
              >
              <span>
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="eye"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"
                  ></path>
                </svg>
                &nbsp;35
              </span>
            </p>
          </div>
          <img :src="item.cover" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import share from "../../components/share/index";
export default {
  computed: {
    ...mapState({
      bookdetail: (state) => state.booklet.bookdetail,
      knowList: (state) => state.booklet.knowList,
      bookdetailchild: (state) => state.booklet.bookdetailchild,
      ind:(state)=>state.booklet.ind
    }),
  },
  methods: {
    ...mapActions({
      getKnowledge: "booklet/getKnowledge",
      getdetailchildren: "booklet/getdetailchildren",
      getdetail: "booklet/getdetail",
      getdetailchild: "booklet/getdetailchild",
    }),
    ...mapMutations({
      btndite: "booklet/btndite",
    }),
    //点击跳二级详情
    btndetailchild(id, childs) {
      let child = childs[0].id;
      this.$router.push(`/Bookletdetail/${id}/${child}`);
    },
    //点击分享
    erwei() {
      share(this.bookdetail);
    },
    //点击右侧切换左侧内容
    btnleft(id) {
      this.$route.params.id=id
      this.getdetail(id);
    },
    //点击左下跳详情
    btn(index){
       this.$router.push(`/Bookletdetail/${this.$route.params.id}/${index}`);
    }
  },
  created() {
    this.getKnowledge();
  },
  mounted() {
    this.getdetail(this.$route.params.id);
  },
};
</script>

<style lang="scss">
.title {
  font-size: 17px;
  height: 40px;
  background: #e7eaee;
  display: block;
}
.detailtitle {
  height: 30px;
  font-size: 12px;
  background: #e7eaee;
  display: block;
}
.leftbody {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    width: 90%;
    height: 265px;
    margin: 25px 5%;
  }
  > p {
    text-align: center;
    width: 100%;
    height: 26px;
    margin: 13px 0 0;
    color: rgb(182, 182, 182);
    > b {
      color: #000;
      font-size: 16px;
      height: 22px;
    }
  }
  > button {
    width: 88px;
    height: 32px;
    border: none;
    color: #fff;
    background: red;
    text-align: center;
    line-height: 32px;
    margin-top: 10px;
  }
  .network {
    height: auto;
    width: 100%;
    > p {
      width: 100%;
      height: 33px;
      line-height: 33px;
      display: inline-block;
      margin-top: 5px;
      margin-left: 20px;
      color: rgb(182, 182, 182);
      font-size: 13px;
      > b {
        float: right;
        margin-right: 20px;
        color: #fff;
      }
      > b:hover {
        color: red;
      }
    }
    > p:hover > b {
      color: red;
      background: #eee;
    }
    > p:hover {
      color: red;
      background: #eee;
    }
  }
}
.right {
  background: #fff;
  > p {
    width: 100%;
    height: 40px;
    background: #e7eaee;
    padding-top: 30px;
  }
  .bottom_right {
    > p {
      width: 100%;
      height: 24px;
      line-height: 24px;
      margin: 10px;
      > span {
        margin: 0 5px;
      }
    }
    > div {
      width: 100%;
      height: 110px;
      display: flex;
      border-bottom: 1px #ccc solid;
      > img {
        width: 80px;
        height: 80px;
      }
      > div {
        margin-left: 10px;
        flex: 1;
        > p {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 25px;
          line-height: 40px;
          > span {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
#act {
  display: inline-block;
  height: auto;
}
</style>