<template>
  <div id="bookdetailchild">
    <div class="left">
      <p class="navs">
        知识小册&nbsp;/&nbsp;Web&nbsp;性能指南&nbsp;/&nbsp;{{
          bookdetailchild[i].title
        }}
      </p>
      <h1>{{ bookdetailchild[i].title }}</h1>
      <p class="time">
        发布于{{ bookdetailchild[i].publishAt | formatDate }} • 阅读量 4386
      </p>
      <div class="childbody">
        <div v-html="bookdetailchild[i].html"></div>
      </div>
      <p class="time">
        发布于{{ bookdetailchild[i].publishAt | formatDate }}|
        版权信息：非商用-署名-自由转载
      </p>
      <div class="paging">
        <div v-if="i <1">
          <span @click="btnindex('+')">{{ bookdetailchild[i].title }}></span>
        </div>
        <div v-if="i === bookdetailchild.length-1">
          <span @click="btnindex('-')">&lt;{{ bookdetailchild[i].title }}</span>
        </div>
        <div v-if="i>0&&i<bookdetailchild.length-1">
          <span @click="btnindex('-')">&lt;{{ bookdetailchild[i - 1].title }}</span>
          <span @click="btnindex('+')">{{ bookdetailchild[i].title }}></span>
        </div>
      </div>
      <Commentinput></Commentinput>
      <Frame ></Frame>
    </div>
    <div class="right">
      <div ref="ceiling" class="right_box">
        <p class="navs"></p>
        <div class="right-top">
          <h3>web性能指南</h3>
          <div
            v-for="(item, index) in bookdetailchild"
            :key="item.id"
            @click="btnind(index)"
            :class="i === index ? 'act' : ''"
          >
            {{ item.title }}
          </div>
        </div>
        <div class="right_bottom">
          <h4>目录</h4>
          <div
            v-for="(item, index) in bookdetailchild &&
            JSON.parse(bookdetailchild[i].toc)"
            :key="item.id"
            @click="jump(index)"
            :class="num === index ? 'act' : ''"
            id="right_item"
          >
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import Commentinput from "../../components/comment/CommentInput";
import Frame from '../../components/frame/Frame'
export default {
  components: {
    Commentinput,
    Frame
  },
  data() {
    return {
      i: 0,
      num: 0,
    };
  },
  computed: {
    ...mapState({
      bookdetailchild: (state) => state.booklet.bookdetailchild,
    }),
  },
  methods: {
    ...mapMutations({
      getdetailchildren: "booklet/getdetailchildren",
    }),
    //tab切换
    btnind(index) {
      this.i = index;
    },
    //点击下一篇
    btnindex(type) {
      if (type == "+") {
        this.i++;
        if (this.i >= this.bookdetailchild[this.i].title.length) {
          this.i = 2;
        }
      } else {
        this.i--;
        if (this.i <= 0) {
          this.i = 0;
        }
      }
    },
    //楼层
    jump(index) {
      this.num = index;
      var inner = document.querySelectorAll(".childbody>div>h2");
      window.scrollTo(0, inner[index].offsetTop);
    },
    //右侧吸顶
    ceilings() {
      let h = document.documentElement.scrollTop;
      if (h > 110) {
        this.$refs.ceiling.style.cssText = `position:fixed;background:#fff;height:auto;width:290px`;
        this.$refs.ceiling.children[0].style.cssText = "background:#fff";
        this.$refs.ceiling.children[2].style.cssText = "background:#e7eaee";
      } else {
        this.$refs.ceiling.style.cssText = `background:#e7eaee;height:100%;`;
        this.$refs.ceiling.children[0].style.cssText = "background:#e7eaee";
      }
    },
    floor() {
      //楼层
      let that = this;
      let inner = document.querySelectorAll(".childbody>div>h2");
      let tops =
        Math.floor(document.documentElement.scrollTop) ||
        Math.floor(document.body.scrollTop);
      for (let i = 0; i < inner.length; i++) {
        if (inner[i].offsetTop <= tops + 5) {
          that.num = i;
        }
      }
    }
  },
  mounted() {
    this.i=this.$route.params.childid
    this.getdetailchildren();
    window.addEventListener("scroll", this.ceilings);
    window.addEventListener("scroll", this.floor);
  }
};
</script>
<style lang="scss" scoped>
.childhead {
  width: 100%;
  height: 38px;
}
.navs {
  height: 30px;
  font-size: 12px;
  background: #e7eaee;
  display: block;
  margin: 0;
  padding: 0;
}
.left {
  > h1 {
    width: 100%;
    height: 60px;
    display: inline-block;
    margin-bottom: 20px;
    font-size: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
  .time {
    width: 100%;
    height: 20px;
    margin-bottom: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.right {
  background: #e7eaee;
}
.right_box {
  position:static;
  background: #e7eaee;
  height: 100%;
}
.paging {
  height: 115px;
  margin: 20px 0 0;
  padding: 20px 0;
  > div {
    height: 74px;
    padding: 8px;
    border: solid 1px #ccc;
    margin: 0 5%;
    line-height: 74px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.paging > div:hover {
  border: solid 1px red;
}
.paging > div > span:hover {
  color: red;
}
</style>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.childbody {
  padding: 20px;
  div > h2 {
    width: 100%;
    height: 49px;
    font-size: 24px;
    margin: 35px 0 10px;
    padding: 0 0 12px;
    border-bottom: 1px #ccc solid;
    color: #000;
  }
  div > p {
    width: 100%;
    min-height: 26px;
    height: auto;
    margin: 22px 0;
  }
  div > ol,
  ul > li {
    width: 100%;
    min-height: 26px;
    height: auto;
    padding: 0 0 0 6px;
    margin-left: 20px;
  }
  img {
    width: 100%;
    height: 444px;
  }
}
.right-top {
  padding: 20px;
  background: #fff;
  > h3 {
    width: 100%;
    height: 22px;
    margin: 0 0 12px;
    font-weight: bold;
    display: inline-block;
  }
  > div {
    height: 32px;
    padding: 0 16px 0 12px;
  }
  > div:hover {
    color: red;
  }
}
.right_bottom {
  padding: 20px;
  > h3 {
    width: 100%;
    height: 22px;
    margin: 0 0 12px;
    font-weight: bold;
    display: inline-block;
  }
  > div {
    height: 32px;
    padding: 0 16px 0 12px;
  }
  > div:hover {
    color: red;
  }
  > h4 {
    height: 22px;
    margin: 0 0 12px;
    font-weight: bold;
  }
}
.act {
  color: red;
}
</style>