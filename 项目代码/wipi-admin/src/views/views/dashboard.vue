<template>
  <div class="dashboard">
    <div id="myChart" :style="{ width: '100%', height: '300px' }" />

    <div class="dashboard-nav">
      <h4>快速导航</h4>
      <p>
        <router-link to="/artilce/index">文章管理</router-link>
        <router-link to="/comment/index">评论管理</router-link>
        <router-link to="/file/index">文集管理</router-link>
        <router-link to="/user/index">用户管理</router-link>
        <router-link to="/view/index">访问管理</router-link>
        <router-link to="/setting/index">系统管理</router-link>
      </p>
    </div>

    <div class="dashboard-art">
      <div>
        <h4>最新文章</h4>
        <p><router-link to="/artilce/index">文章管理</router-link></p>
      </div>
      <ul>
        <li v-for="item in articleList" :key="item.id">
          <img :src="item.cover" alt="">
          <p>{{ item.title }}</p>
        </li>
      </ul>
    </div>

    <div class="dashboard-comment">
      <div>
        <h4>最新评论</h4>
        <p><router-link to="/comment/index">评论管理</router-link></p>
      </div>

      <ul>
        <li v-for="item in commentList" :key="item.id">
          <div class="dashboard-comment-liet">
            {{ item.name }}
            在
            <el-popover
              placement="top-start"
              title="标题"
              trigger="hover"
              :content="item"
            >
              <el-button
                slot="reference"
                style="text-align: center; border: none; color: #0188fb"
              >文章</el-button>
            </el-popover>
            评论
            <el-popover
              placement="top-start"
              title="评论详情-原始内容"
              trigger="hover"
              :content="item.content"
            >
              <el-button
                slot="reference"
                color="#0188fb"
                style="text-align: center; border: none; color: #0188fb"
              >查看类容</el-button>
            </el-popover>
          </div>
          <div class="dashboard-comment-right">
            <span>通过</span>
            <span>拒绝</span>
            <span>回复</span>
            <span>删除</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    ...mapState({
      // 文章
      articleList: (state) => state.article.articleList,
      // 评论
      commentList: (state) => state.comment.commentList
    })
  },
  methods: {
    ...mapActions({
      fetchList: 'article/fetchList',
      getComment: 'comment/getComment'
    }),
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      })
    }
  },
  mounted() {
    this.drawLine()
    this.fetchList({ page: 1, pageSize: 12 })
  },
  created() {
    this.getComment({ page: this.page, pageSize: this.pageSize })
  }
}
</script>

<style lang="scss" scope>
* {
  padding: 0;
  margin: 0;
  list-style: none;
}
#myChart {
  background-color: #fff;
  margin-bottom: 20px;
  width: 100%;
}
.dashboard {
  width: 100%;
  height: 100%;
}
.dashboard-nav {
  width: 100%;
  height: 140px;
  background-color: #fff;
  margin-bottom: 20px;
}
.dashboard-nav > h4 {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  padding: 0 24px;
}

.dashboard-nav > p {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.dashboard-art {
  width: 100%;
  min-height: 200px;
  background-color: #fff;
}
.dashboard-art > ul > li:hover {
  box-shadow: 0px 0px 5px 0px;
}

.dashboard-art > div {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}
.dashboard-art > ul {
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-wrap: wrap;
}
.dashboard-art > ul > li {
  width: 33%;
  height: 200px;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.dashboard-art > ul img {
  width: 240px;
  max-height: 110px;
}
.dashboard-comment {
  width: 100%;
  min-height: 200px;
  margin-top: 20px;
  background-color: #fff;
}
.dashboard-comment > div {
  width: 100%;
  height: 55px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.dashboard-comment>ul{
  width: 100%;
  height: 100%;
}
.dashboard-comment>ul>li{
  width: 95%;
  height: 50px;
  margin: 0 auto;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.dashboard-comment-right{
  cursor:pointer;
  display: flex;
}
.dashboard-comment-right>span{
  color: #0188fb;
  padding: 0 10px;
  border-right: solid 1px #eee;
}
</style>
