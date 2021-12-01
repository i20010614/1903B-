/<template>
  <div class="search">
    <div class="tops">
      <div class="top_search">
        <p>
          <span>类型:</span><input v-model="type" placeholder="请输入搜索类型">
        </p>
        <p>
          <span>搜索词:</span><input v-model="keyword" placeholder="请输入搜索词">
        </p>
        <p>
          <span>搜索量:</span><input v-model="count" placeholder="请输入搜索量">
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
      <el-table :data="searchall" style="width: 100%">
        <el-table-column type="selection" fit />
        <el-table-column prop="keyword" label="搜索词" fit />
        <el-table-column prop="count" label="搜索量" fit />
        <el-table-column prop="createAt" label="搜索时间" fit>
          <template slot-scope="scope"><span>{{ scope.row.createAt|spliceTime }}</span></template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              class="btn"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="fenye">
        <el-pagination
          layout="prev, pager, next"
          :total="searchcount"
          :page-size="pageSize"
          @perv-click="pervs"
          @next-click="nexts"
          @current-change="currentpage"
        />
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      type: '',
      keyword: '',
      count: '',
      page: 1,
      pageSize: 12
    }
  },
  computed: {
    ...mapState({
      searchall: (state) => state.search.searchall,
      searchcount: (state) => state.search.searchcount
    })
  },
  created() {
    this.getsearch({ page: 1, pageSize: 12 })
  },
  methods: {
    ...mapActions({
      getsearch: 'search/getsearch',
      getdelsearch: 'search/getdelsearch'
    }),
    // 查找
    search() {
      this.getsearch({
        page: this.page,
        pageSize: this.pageSize,
        type: this.type,
        keyword: this.keyword,
        count: this.count
      })
    },
    // 点击删除
    handleDelete(row) {
      this.getdelsearch(row.id)
      this.getsearch({ page: this.page, pageSize: this.pageSize })
    },
    // 点击上一页
    pervs() {
      if (this.page <= 1) {
        this.page = 1
      }
      this.page -= 1
      this.getsearch({ page: this.page, pageSize: this.pageSize })
    },
    // 点击下一页
    nexts() {
      if (this.page >= this.searchcount) {
        this.page = this.searchcount
      }
      this.page += 1
      this.getsearch({ page: this.page, pageSize: this.pageSize })
    },
    // 点击当前页
    currentpage(val) {
      this.page = val
      this.getsearch({ page: this.page, pageSize: this.pageSize })
    },
    // 点击重置
    reset() {
      this.type = ''
      this.keyword = ''
      this.count = ''
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
  height: 861px;
  padding: 20px;
  background: #fff;
}
.btn {
  color: rgb(15, 192, 247);
  background: #fff;
  border: none;
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
</style>
