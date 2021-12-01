/<template>
  <div id="booklet">
    <div class="left">
      <div
        v-for="(item, index) in knowList"
        :key="index"
        @click.stop="btndetail(item.id,index)"
      >
        <p>
          <span
            ><b>{{ item.title }}</b></span
          >
          <span>8天前</span>
        </p>
        <div>
          <div>
            <p class="acts">{{ item.summary }}</p>
            <p>
              <span @click.stop="erwei(item)">
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
    <Right :articleList="articleList" :tagList="tagList" />
  </div>
</template>

<script>
import Right from "@/components/rightall/Right.vue";
import { mapState, mapActions,mapMutations } from "vuex";
import share from "../../components/share/index";
export default {
  //右侧组件
  components: { Right },
  computed: {
    ...mapState({
      articleList: (state) => state.article.articleList,
      knowList: (state) => state.booklet.knowList,
      tagList: (state) => state.tag.tagList,
    }),
  },
  methods: {
    ...mapActions({
      getKnowledge: "booklet/getKnowledge",
      getArticleList: "article/getArticleList",
      getTagList: "tag/getTagList",
    }),
    ...mapMutations({
       btnindex:"booklet/btnindex"
    }),
    //跳详情
    btndetail(id,index) {
      this.$router.push("/Bookletdetail/" + id);
      this.btnindex(index)
    },
    //分享
    erwei(item) {
      share(item);
    },
  },
  created() {
    this.getArticleList();
    this.getKnowledge();
    this.getTagList();
  },
};
</script>

<style lang="scss" scoped>
#booklet {
  width: 100%;
  .left {
    > div {
      width: 100%;
      height: 168px;
      border-bottom: solid 1px #eee;
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
        height: 112px;
        display: flex;
        align-items: center;
        justify-content: center;
        > img {
          width: 190px;
          height: 100px;
          margin: 0 10px;
        }
        > div {
          flex: 1;
          > p {
            line-height: 24px;
            margin: 13px 0 0;
            line-height: 40px;
            margin-left: 15px;
            > span {
              margin-right: 35px;
            }
          }
        }
      }
    }
  }
}
.acts:hover {
  color: red;
}
</style>
