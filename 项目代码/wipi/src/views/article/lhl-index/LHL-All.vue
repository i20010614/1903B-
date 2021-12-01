<template>
  <div class="all">
    <Carousel />
    <div class="navigation">
      <router-link to="/article/lhl-all">所有</router-link>
      <router-link to="/article/lhl-back-end">aaa12</router-link>
      <router-link to="/article/lhl-front-end">PS</router-link>
      <router-link to="/article/lhl-miao">苗海涛</router-link>
      <router-link to="/article/lhl-age">123</router-link>
    </div>

    <ul class="lhl-ull">
      <li
        v-for="item in articleList"
        :key="item.id"
        @click="handleDetail(item.id)"
      >
        <div class="lhl-head">
          <h3 class="ate">{{ item.title }}</h3>
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
            <span @click.stop="shareArticle(item)"
              ><i class="el-icon-share"></i> 分享</span
            >
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import share from "@/components/share/index";
import Carousel from "../../../components/carousel/Carousel.vue";
export default {
  components: { Carousel },
  data() {
    return {
      Lhlobj: [],
    };
  },
  computed: {
    ...mapState({
      articleList: (state) => state.article.articleList,
    }),
  },
  mounted() {
    let joi = this.articleList.map((item) => {
      if (item.category) {
        return item.category.label;
      }
    });
    this.Lhlobj.push(joi);
  },
  methods: {
    ...mapActions({
      getArticleList: "article/getArticleList",
    }),
    handleDetail(id) {
      this.$router.push(`/detail/${id}`);
    },
    shareArticle(item) {
      share(item);
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
  background-color: var(--bg-second);
  border-bottom: 1px solid var(--border-color);
}
.navigation > a {
  margin-left: 20px;
  background-color: var(--bg-second);
}
.all {
  background-color: var(--border-color);
  background-color: var(--bg-second);
}
.lhl-ull{
  background-color: var(--bg-second);
}
</style>
