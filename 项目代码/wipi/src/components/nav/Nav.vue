<template>
  <div class="nav">
    <el-dialog title="文章搜索" :visible.sync="dialogVisible" width="760px" 
    :append-to-body="true">
      <div class="el-inp">
        <input type="text" placeholder="输入关键字，搜索文章" v-model="list" />
        <button @click="getNavSearch()">
          <i class="el-icon-search"></i>
        </button>
      </div>

      <ul class="ullSuo">
        <li
          v-for="(item, index) in data == undefined ? Tips : data"
          :key="index"
        >
          <p v-if="item.title == '暂无数据'">
            {{ item.title }}
          </p>
          <span v-else-if="item.title" class="act" @click="NavJump(item.id)">
            {{ item.title }}
          </span>
        </li>
      </ul>
    </el-dialog>
    <div class="logo">
      <span>
        <img
          src="https://wipi.oss-cn-shanghai.aliyuncs.com/2021-02-20/wipi-logo.png"
          alt=""
        />
      </span>
    </div>
    <div :class="{ head: true, active: showMenu }">
      <ul>
        <li>
          <router-link to="/article">{{ $t("message.article") }}</router-link>
        </li>
        <li>
          <router-link to="/file">{{ $t("message.archives") }}</router-link>
        </li>
        <li>
          <router-link to="/booklet">{{ $t("message.knowledge") }}</router-link>
        </li>
        <li>
          <router-link to="/board">{{ $t("message.board") }}</router-link>
        </li>
        <li>
          <router-link to="/about">{{ $t("message.about") }}</router-link>
        </li>
        <li class="icons">
          <button class="btn">{{ $t("message.login") }}</button>
        </li>
        <li class="icons">
          <!-- 放大镜 -->
          <div>
            <el-button
              type="text"
              @click="dialogVisible = true"
              style="color: var(--main-text-color);"
            >
              <span
                role="img"
                aria-label="search"
                style="cursor: pointer;"
                tabindex="-1"
                class="anticon anticon-search"
                ><svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="search"
                  width="24"
                  height="24"
                  id="fdj"
                  fill="currentColor"
                  aria-hidden="true"
                  
                >
                  <path
                    d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"
                  ></path></svg
              ></span>
            </el-button>
          </div>
        </li>
        <li class="icons">
          <!-- 主题切换 -->
          <svg
            @click="changeIsWhite"
            v-if="isWhite"
            class="sun"
            style="width: 24px; height: 24px"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M3.55,18.54L4.96,19.95L6.76,18.16L5.34,16.74M11,22.45C11.32,22.45 13,22.45 13,22.45V19.5H11M12,5.5A6,6 0 0,0 6,11.5A6,6 0 0,0 12,17.5A6,6 0 0,0 18,11.5C18,8.18 15.31,5.5 12,5.5M20,12.5H23V10.5H20M17.24,18.16L19.04,19.95L20.45,18.54L18.66,16.74M20.45,4.46L19.04,3.05L17.24,4.84L18.66,6.26M13,0.55H11V3.5H13M4,10.5H1V12.5H4M6.76,4.84L4.96,3.05L3.55,4.46L5.34,6.26L6.76,4.84Z"
            ></path>
          </svg>
          <svg
            @click="changeIsWhite"
            v-else
            class="moon"
            style="width: 24px; height: 24px"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z"
            ></path>
          </svg>
        </li>
        <li class="icons">
          <!-- 中英文切换 -->
          <div class="translate">
            <svg
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
            >
              <path
                d="M547.797333 638.208l-104.405333-103.168 1.237333-1.28a720.170667 720.170667 0 0 0 152.490667-268.373333h120.448V183.082667h-287.744V100.906667H347.605333v82.218666H59.818667V265.386667h459.178666a648.234667 648.234667 0 0 1-130.304 219.946666 643.242667 643.242667 0 0 1-94.976-137.728H211.541333a722.048 722.048 0 0 0 122.453334 187.434667l-209.194667 206.378667 58.368 58.368 205.525333-205.525334 127.872 127.829334 31.232-83.84m231.424-208.426667h-82.218666l-184.96 493.312h82.218666l46.037334-123.306667h195.242666l46.464 123.306667h82.218667l-185.002667-493.312m-107.690666 287.744l66.56-178.005333 66.602666 178.005333z"
                fill="currentColor"
              ></path>
            </svg>
            <div class="other_box">
              <p class="change-lang" @click="changeLangCh()">English</p>
              <p class="change-lang" @click="changeLangEn()">Chinese</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div
      :class="{ strick: true, active: showMenu }"
      @click="showMenu = !showMenu"
    >
      <div class="clickItem"></div>
      <div class="clickItem"></div>
      <div class="clickItem"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: "zh-CN",
      changeLang: "English",
      isWhite: true,
      dialogVisible: false,
      showMenu: false,
      Tips: [{ title: "暂无数据" }], //提示暂无数据
      list: "", //获取 inp 的值
      data: undefined, //筛选的数据
    };
  },
  props: {
    articleList: {
      type: Array,
      required: true,
    },
  },
  methods: {
    //搜索
    changeLangCh() {
      this.changeLang = "Chinese";
      this.lang = "en-US";
      this.$i18n.locale = this.lang;
    },
    getNavSearch() {
      if (this.list === "") {
        return this.data = undefined;
      } else {
        this.data = this.articleList.filter((item) => {
          if (item.title.includes(this.list)) {
            return item;
          }else{
            this.data=undefined;
          }
        });
      }
    },
    //跳转详情
    NavJump(id){
        this.dialogVisible=!this.dialogVisible
        this.$router.push(`/detail/${id}`)
    },
    changeLangEn() {
      this.changeLang = "切换English";
      if (this.lang === "zh-CN") {
        this.lang = "en-US";
        this.$i18n.locale = this.lang;
      } else {
        this.lang = "zh-CN";
        this.$i18n.locale = this.lang;
      }
    },
    // 改变日夜间状态
    changeIsWhite() {
      this.isWhite = !this.isWhite;
      if (this.isWhite) {
        this.$body.className = null;
      } else {
        this.$body.className = "dark";
      }
    },
  },
  mounted() {
    let body = document.querySelector("body");
    this.$body = body;
  },
};
</script>

<style scoped lang="scss">
.nav {
  display: flex;
  align-items: center;
}

.logo {
  display: inline-flex;
  align-items: center;
  height: 64px;
  margin-right: 4rem;
  color: var(--main-text-color);
  line-height: 64px;
  text-align: left;
}
.logo span {
  display: flex;
  align-items: center;
  height: 36px;
}
.logo span img {
  width: 100%;
  height: 100%;
}
.strick {
  position: absolute;
  right: 15px;
  display: none;
}
.head {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  color: var(--main-text-color);
  font-size: 16px;
}
.head ul {
  position: relative;
  width: 100%;
}
.head ul li {
  display: inline-flex;
  padding: 0 12px;
  vertical-align: middle;
  line-height: 64px;
}
.icons {
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  float: right;
  font-size: 24px;
  div {
    display: flex;
    align-items: center;
  }
}
.translate {
  position: relative;
  line-height: 64px;
  .other_box {
    display: none;
    position: absolute;
    z-index: 999;
    top: 24px;
    left: 10px;
    width: 70px;
    height: 61px;
    line-height: 30px;
    font-size: 16px;
    text-align: center;
    background-color: var(--bg-second);
  }
  &:hover .other_box {
    display: block;
    p:hover {
      background-color: red;
    }
  }
}

.strick {
  position: absolute;
  right: 15px;
  display: none;
}
.clickItem {
  width: 25px;
  height: 4px;
  border-radius: var(--border-radius);
  background-color: var(--primary-color);
  opacity: 1;
  transition: all 0.25s ease-in-out 0s;
}
@media (max-width: 768px) {
  .nav {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
  }
  .nav .head.active {
    position: absolute;
    top: 64px;
    left: 0;
    width: 100%;
    background: var(--bg-second);
    color: var(--main-text-color);
    display: block;
    z-index: 888;
    border-bottom: 1px solid #eee;
  }
  .nav .head.active ul {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .nav .head.active ul li {
    justify-content: center;
    line-height: 48px;
  }
  .nav .head.active ul li.icons {
    line-height: 48px;
  }
  .nav .head {
    display: none;
  }
  .nav .strick {
    display: block;
  }
  .nav .strick .clickItem:nth-child(2) {
    margin: 5px 0;
  }
  .strick.active {
    div:nth-child(1) {
      transform: translateY(9px) rotate(45deg);
    }
    div:nth-child(3) {
      transform: translateY(-9px) rotate(-45deg);
    }
    div:nth-child(2) {
      opacity: 0;
    }
  }
}
.el-inp {
  display: flex;
}

.el-inp > input {
  width: 696px;
  height: 33px;
  outline: red;
}

.el-inp > input:focus{
    outline: 0;
    border: 1px solid red;
    box-shadow: 0px 0px 3px 0px red;
}

.el-inp > button {
  width: 40px;
  height: 40px;
  background-color: #fff;
  border: 1px solid #000;
}
.el-inp > button:hover{
    border: 1px solid red;
}
.ullSuo {
  width: 100%;
  height: 100%;
}
.ullSuo > li {
  width: 100%;
  height: 49px;
}
.ullSuo > li > p {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ullSuo > li > span {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  font-weight: 600;
}
.act:hover {
  background-color: #eee;
}
*.App .nav .icons .el-button .el-button--text #fdj{
  background-color: var(--bg-second);
}
.btn{
  width: 64px;
   height: 32px;
   line-height: 32px;
   text-align: center;
   border: solid rgb(230, 221, 221) solid;
   background: #fff;
}
.btn:hover{
   border: solid 1px red;
   color: red;
}
</style>
