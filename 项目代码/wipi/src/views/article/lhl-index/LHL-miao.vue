<template>
  <div class="all">
    <div class="screen">
      <div class="screen-top">
        <h1>苗海涛</h1>
        <span>分类文章</span>
      </div>
      <div class="scteen-lower">
        共搜索到<span>{{ Lhlobj.length }}</span
        >篇
      </div>
    </div>

    <div class="navigation">
      <router-link to="/article/lhl-all">所有</router-link>
      <router-link to="/article/lhl-back-end">aaa12</router-link>
      <router-link to="/article/lhl-front-end">PS</router-link>
      <router-link to="/article/lhl-miao">苗海涛</router-link>
      <router-link to="/article/lhl-age">123</router-link>
    </div>
    <ul class="lhl-ull">
      <li v-for="item in Lhlobj" :key="item.id">
        <div class="lhl-head">
          <h3 class="ate" @click="handleDetail(item.id)">{{ item.title }}</h3>
          <span>8天前</span>
          <span v-if="item.category">
            {{ item.category.label }}
          </span>
        </div>
        <div class="lhl-capacity">
          <div class="lhl-img">
            <span>{{ item.summary }}</span>
            <p><img :src="item.cover" alt="" /></p>
          </div>
          <p class="lhl-pattern">
            <span> ♡ {{ item.likes }}</span>
            <span><i class="el-icon-view"></i>{{ item.views }}</span>
            <span><i class="el-icon-share"></i> 分享</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      Lhlobj: "",
    };
  },
  computed: {
    ...mapState({
      articleList: (state) => state.article.articleList,
    }),
    newList() {
      return this.articleList.filter((item) => item.category === "苗海涛");
    },
  },
  mounted() {
    let joi = this.articleList.filter((item) => {
      return item.category && item.category.label === "苗海涛";
    });
    this.Lhlobj = joi;
  },
  methods: {
    ...mapActions({
      getArticleList: "article/getArticleList",
    }),
    handleDetail(id) {
      this.$router.push(`/detail/${id}`);
    },
    Jump(id) {
      this.$router.push(`/detail/${id}`);
    },
  },
  created() {
    this.getArticleList();
  },
};
</script>

<style>
.navigation {
  padding: 1rem;
  background-color: #fff;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-second);
}
.navigation > a {
  margin-left: 20px;
}
.all {
  background-color: var(--border-color);
}
.screen {
  width: 100%;
  height: 90px;
  background-color: #fff;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-second);
}
.screen-top {
  display: flex;
  align-items: center;
  justify-content: center;
}
.screen-top > h1 {
  font-size: 1.5rem;
  color: var(--primary-color);
}
.scteen-lower > span {
  font-size: 1.1rem;
  color: var(--primary-color);
}
.lhl-ull{
  background-color: var(--bg-second);
}
</style>