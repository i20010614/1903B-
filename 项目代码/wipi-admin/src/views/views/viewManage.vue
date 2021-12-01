<template>
  <div class="user">
    <div class="user_up">
      <div class="up_box">
        <div class="up_box_two">
          <span>IP</span>
          <span class="up_box_inp">
            <el-input v-model="ip" placeholder="请输入 IP地址" />
          </span>
        </div>
        <div class="up_box_two">
          <span>UA：</span>
          <span class="up_box_inp">
            <el-input v-model="userAgent" placeholder="请输入 User Agent" />
          </span>
        </div>
        <div class="up_box_two">
          <span>URL：</span>
          <span class="up_box_inp">
            <el-input v-model="url" placeholder="请输入 URL" />
          </span>
        </div>
        <div class="up_box_two">
          <span>地址：</span>
          <span class="up_box_inp">
            <el-input v-model="address" placeholder="请输入地址" />
          </span>
        </div>
        <div class="up_box_two">
          <span>浏览器：</span>
          <span class="up_box_inp">
            <el-input v-model="browser" placeholder="请输入浏览器" />
          </span>
        </div>
        <div class="up_box_two">
          <span>内核：</span>
          <span class="up_box_inp">
            <el-input v-model="engine" placeholder="请输入内核" />
          </span>
        </div>
        <div class="up_box_two">
          <span>OS：</span>
          <span class="up_box_inp">
            <el-input v-model="os" placeholder="请输入操作系统" />
          </span>
        </div>
        <div class="up_box_two">
          <span>设备：</span>
          <span class="up_box_inp">
            <el-input v-model="device" placeholder="请输入设备" />
          </span>
        </div>
      </div>
      <div class="user_but">
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </div>
    <div class="user_down">
      <el-table :data="searchall" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column fixed prop="url" label="URL" width="200" />
        <el-table-column prop="ip" label="IP" width="150" />
        <el-table-column prop="browser" label="浏览器" width="200" />
        <el-table-column prop="engine" label="内核" width="120" />
        <el-table-column prop="os" label="操作系统" width="120" />
        <el-table-column prop="" label="设备" width="80" />
        <el-table-column prop="address" label="地址" width="160" />
        <el-table-column id="fwl" prop="count" label="访问量" width="80" />
        <el-table-column prop="createAt" label="访问时间" width="200" />
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="handleClick(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="total,prev, pager, next,sizes"
        :total="searchcount"
        :page-size="pageSize"
        :page-sizes="[8, 12, 24, 36]"
        @size-change="handleSizeChange"
        @perv-click="pervs"
        @next-click="nexts"
        @current-change="currentpage"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      state: '',
      page: 1,
      pageSize: 8,
      active: 'active',
      locked: 'locked',
      ip: '', // IP
      userAgent: '', // UA
      url: '', // URL
      address: '', // 地址
      browser: '', // 浏览器
      engine: '', // 内核
      os: '', // OS
      device: '' // 设备
    }
  },
  computed: {
    ...mapState({
      searchall: (state) => state.view.searchall,
      searchcount: (state) => state.view.searchcount
    })
  },
  created() {
    this.getsearch({ page: 1, pageSize: 8 })
  },
  methods: {
    ...mapActions({
      getsearch: 'view/getsearch',
      userupdate: 'view/userupdate',
      getdelsearch: 'view/getdelsearch'
    }),
    // 点击搜索
    search() {
      if (this.ip || this.userAgent || this.url || this.address || this.browser || this.engine || this.os || this.device) {
        this.getsearch({
          page: this.page,
          pageSize: this.pageSize,
          ip: this.ip,
          userAgent: this.userAgent,
          url: this.url,
          address: this.address,
          browser: this.browser,
          engine: this.engine,
          os: this.os,
          device: this.device
        })
      } else {
        this.getsearch({ page: this.page, pageSize: this.pageSize })
      }
    },
    // 点击删除
    async handleClick(row) {
      alert('点击确定将永久删除')
      await this.getdelsearch(row.id)
      await this.getsearch({ page: this.page, pageSize: this.pageSize })
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
    // 切换每页多少条数据
    handleSizeChange(val) {
      this.pageSize = val
      this.getsearch({ page: this.page, pageSize: this.pageSize })
    },
    // 重置
    reset() {
      this.ip = '' // ip
      this.userAgent = '' // userAgent
      this.url = '' // url
      this.address = '' // address
      this.browser = '' // browser
      this.engine = '' // engine
      this.os = '' // os
      this.device = '' // device
    }
  }
}
</script>

<style scoped>
.el-pagination {
  float: right;
  padding: 10px 0 0 0;
}
.zhong {
  display: inline-block;
  width: 1px;
  height: 20px;
  background: #ccc;
  margin: 6px 5px -3px 5px;
}
.user_down {
  width: 100%;
  min-height: 500px;
  background: #fff;
}
.user_but {
  float: right;
}
.el-input__inner {
  width: 200px;
}
.up_box_inp {
  padding: 0 11px;
  width: 200px;
}
.up_box_two {
  min-width: 200px;
  height: 65px;
  float: left;
  padding: 0 12px;
  line-height: 30px;
  margin: 0 0 0 20px;
}
.up_box_two > span {
  float: left;
}
.up_box {
  width: 100%;
  height: 130px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.user_up {
  width: 100%;
  height: 200px;
  padding: 24px 12px;
  margin: 0 0 20px 0;
  background: #fff;
}
.user {
  background: rgb(239, 242, 245);
}
</style>
