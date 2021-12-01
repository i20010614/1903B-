/<template>
  <div class="search">
    <div class="tops">
      <div class="top_search">
        <p>
          <span>发件人:</span><input v-model="from" placeholder="请输入发件人">
        </p>
        <p>
          <span>收件人:</span><input v-model="to" placeholder="请输入收件人">
        </p>
        <p>
          <span>主题:</span><input v-model="subject" placeholder="请输入主题">
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
      <el-table :data="mailall" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="from" label="发件人" fit />
        <el-table-column prop="to" label="收件人" fit />
        <el-table-column prop="subject" label="主题" fit />
        <el-table-column prop="" label="搜索时间" fit>
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
    </div>
    <div class="fenye">
      <el-pagination
        layout="prev, pager, next"
        :total="mailcount"
        :page-size="pageSize"
        @perv-click="pervs"
        @next-click="nexts"
        @current-change="currentpage"
      />
    </div>
    <Footer />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      from: '',
      to: '',
      subject: '',
      page: 1,
      pageSize: 12
    }
  },
  computed: {
    ...mapState({
      mailall: (state) => state.mail.mailall,
      mailcount: (state) => state.mail.mailcount
    })
  },
  created() {
    this.getmail({ page: 1, pageSize: 12 })
  },
  methods: {
    ...mapActions({
      getmail: 'mail/getmail',
      getdelmail: 'mail/getdelmail'
    }),
    // 查找
    search() {
      this.getmail({
        page: this.page,
        pageSize: this.pageSize,
        from: this.from,
        to: this.to,
        subject: this.subject
      })
    },
    // 点击删除
    handleDelete(row) {
      this.getdelmail(row.id)
      this.getmail({ page: this.page, pageSize: this.pageSize })
    },
    // 点击上一页
    pervs() {
      if (this.page <= 1) {
        this.page = 1
      }
      this.page -= 1
      this.getmail({ page: this.page, pageSize: this.pageSize })
    },
    // 点击下一页
    nexts() {
      if (this.page >= this.mailcount) {
        this.page = this.mailcount
      }
      this.page += 1
      this.getmail({ page: this.page, pageSize: this.pageSize })
    },
    // 点击当前页
    currentpage(val) {
      this.page = val
      this.getmail({ page: this.page, pageSize: this.pageSize })
    },
    // 点击重置
    reset() {
      this.from = ''
      this.to = ''
      this.subject = ''
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
