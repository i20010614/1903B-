/<template>
  <div class="search">
    <div class="tops">
      <div class="top_search">
        <p>
          <span>文件名称:</span><input v-model="originalname" placeholder="请输入文件名称">
        </p>
        <p>
          <span>文件类型:</span><input v-model="type" placeholder="请输入文件类型">
        </p>
      </div>
      <div class="tops_btn">
        <p>
          <button class="btn_search" @click="search()">搜索</button>
          <button @click="reset()">重置</button>
        </p>
      </div>
    </div>
    <div class="bottoms">
      <div
        v-for="(item, index) in fileall"
        :key="index"
        class="card"
        @click="btn(item)"
      >
        <div class="card_top">
          <img :src="item.url" alt="">
        </div>
        <div class="card_bottom">
          <p>{{ item.originalname }}</p>
          <p>{{ item.createAt | formatDate }}</p>
        </div>
      </div>
      <div class="fenye">
        <el-pagination
          layout="prev, pager, next"
          :total="filecount"
          :page-size="pageSize"
          @perv-click="pervs"
          @next-click="nexts"
          @current-change="currentpage"
        />
      </div>
    </div>
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <div class="heads">
        <span>文件信息</span>
        <span @click="close()">X</span>
      </div>
      <div class="bodys">
        <div class="bodys_img">
          <img :src="item.url" alt="">
        </div>
        <p>文件名称:{{ item.originalname }}</p>
        <p>储存路径:{{ item.creatat }}{{ item.originalname }}</p>
        <p>
          <span>文件类型:{{ item.type }}</span><span>{{ Math.ceil(item.size / (1 * 1024 * 1024)) }}kb</span>
        </p>
        <div class="box">
          访问链接:{{ `https://wipi.oss-cn-shanghai.aliyuncs.com`
          }}{{ item.createAt | formatDate }}{{ item.originalname }}
        </div>
      </div>
      <div class="foots">
        <span @click="del(item.id)">删除</span>
        <span @click="close()">关闭</span>
      </div>
    </el-drawer>
    <Footer />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      originalname: '',
      type: '',
      page: 1,
      pageSize: 10,
      drawer: false,
      item: {}
    }
  },
  computed: {
    ...mapState({
      fileall: (state) => state.file.fileall,
      filecount: (state) => state.file.filecount
    })
  },
  created() {
    this.getfile({ page: this.page, pageSize: this.pageSize })
  },
  methods: {
    ...mapActions({
      getfile: 'file/getfile',
      getdelfile: 'file/getdelfile'
    }),
    // 点击重置
    reset() {
      this.originalname = ''
      this.type = ''
    },
    // 点击搜索
    search() {
      this.getfile({
        page: this.page,
        pageSize: this.pageSize,
        originalname: this.originalname,
        type: this.type
      })
    },
    // 点击右边弹出
    btn(item) {
      this.item = item
      this.drawer = !this.drawer
    },
    // 点击x关闭右侧弹框
    close() {
      this.drawer = false
    },
    // 点击右侧删除
    async del(id) {
      await this.getdelfile(id)
      await this.getfile({ page: this.page, pageSize: this.pageSize })
      this.drawer = false
    },
    // 点击上一页
    pervs() {
      if (this.page <= 1) {
        this.page = 1
      }
      this.page -= 1
      this.getfile({ page: this.page, pageSize: this.pageSize })
    },
    // 点击下一页
    nexts() {
      if (this.page >= this.searchcount) {
        this.page = this.searchcount
      }
      this.page += 1
      this.getfile({ page: this.page, pageSize: this.pageSize })
    },
    // 点击当前页
    currentpage(val) {
      this.page = val
      this.getfile({ page: this.page, pageSize: this.pageSize })
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.tops {
  width: 100%;
  height: 128px;
  padding: 20px;
  background: #fff;
  margin-bottom: 20px;
}
.top_search {
  width: 100%;
  display: flex;
  p {
    display: flex;
    width: 25%;
    height: 40px;
    padding: 0 10px;
    > span {
      width: 60px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 14px;
    }
    > input {
      height: 36px;
      padding: 4px 11px;
    }
  }
}
.tops_btn {
  float: right;
  button {
    width: 65px;
    height: 32px;
    margin-right: 10px;
    text-align: center;
    line-height: 32px;
    border: solid 1px #ccc;
    border-radius: 3px;
  }
  .btn_search {
    background: #0188fb;
    color: #fff;
  }
}
.bottoms {
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  .card {
    width: 20%;
    height: 286px;
  }
  .card:hover {
    box-shadow: 0 0 9px 3px #999;
  }
  .card_top {
    width: 100%;
    height: 180px;
    padding: 0 5px;
    > img {
      width: 100%;
      height: 180px;
    }
  }
  .card_bottom {
    height: 95px;
    width: 100%;
    padding: 15px;
    > p {
      width: 100%;
      height: 23px;
      margin: 0 0 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.heads {
  width: 100%;
  height: 55px;
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  > span {
    margin: 0 15px;
  }
}
.bodys {
  width: 100%;
  height: 829px;
  > p {
    width: 100%;
    height: 29px;
    padding: 0 15px;
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.bodys_img {
  width: 100%;
  height: 360px;
  padding: 15px;
  margin-bottom: 40px;
  > img {
    width: 100%;
    height: 360px;
  }
}
.foots {
  width: 100%;
  height: 53px;
  border-top: solid 1px #eee;
  padding-top: 15px;
  > span {
    width: 64px;
    height: 32px;
    border: solid 1px #eee;
    margin-right: 10px;
    float: right;
    text-align: center;
    line-height: 32px;
  }
}
.fenye {
  width: 100%;
  margin: 0 auto;
  background: #fff;
}
.el-pagination {
  display: flex;
  justify-content: center;
}
.box {
  width: 90%;
  margin: 0 5%;
  border: solid 1px #ccc;
  height: 50px;
  display: inline-block;
  line-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
