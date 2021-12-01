<template>
  <div class="carousel">
    <div class="block">
      <el-carousel height="300px">
        <el-carousel-item>
          <div class="text" @click="handledetail">
            <h2>使用preact 优化 next.js 构建体积</h2>
            <p class="carousel_item">大约1个月前 · 868次阅读</p>
          </div>
          <div class="mask"></div>
          <div class="carousel_box1"></div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="text" @click="handledetail">
            <h2>计算机工作原理</h2>
            <p class="carousel_item">6个月前 · 3377次阅读</p>
          </div>
          <div class="mask"></div>
          <div class="carousel_box2"></div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="text" @click="handledetail">
            <h2>互联网工作原理</h2>
            <p class="carousel_item">6个月前 · 2816次阅读</p>
          </div>
          <div class="mask"></div>
          <div class="carousel_box3"></div>
        </el-carousel-item>
      </el-carousel>
      <div class="empty"></div>
    </div>
  </div>
</template>
<script>
import "./carousel.css";
export default {
  methods: {
    handledetail() {
      this.$router.push("/detail/1213");
    },
  },
};
</script>
