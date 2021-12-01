<template>
  <div class="page">
    <div class="page-top">
      <div class="page-inp">
        <span>名称:
          <el-input
            v-model="input"
            placeholder="请输入内容"
            style="width: 177px; height: 30px"
          /></span>
        <span>路径:
          <el-input
            v-model="input"
            placeholder="请输入内容"
            style="width: 177px; height: 30px"
          /></span>
        <span>
          状态:
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </span>
      </div>
      <div class="push-bun">
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </div>
    </div>

    <div class="page-tun">
      <el-table :data="PageList[0]" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="from" label="发件人" fit />
        <el-table-column prop="to" label="收件人" fit />
        <el-table-column prop="subject" label="主题" fit />
        <el-table-column prop="createAt" label="搜索时间" fit />
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
          :total="mailcount"
          :page-size="pageSize"
          @perv-click="pervs"
          @next-click="nexts"
          @current-change="currentpage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '已发布'
        },
        {
          value: '选项2',
          label: '草稿'
        }
      ],
      value: ''
    }
  },
  computed: {
    ...mapState({
      // 页面管理
      PageList: (state) => state.page.PageList
    })
  },
  methods: {
    ...mapActions({
      getPage: 'page/getPage'
    })
  },
  mounted() {},
  created() {
    this.getPage()
  }
}
</script>

<style>
.page-top {
  width: 100%;
  height: 150px;
  background-color: #fff;
}
.page-inp {
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
}
.page-inp > span {
  margin-left: 40px;
}
.push-bun {
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.push-bun > button {
  margin-right: 20px;
}
</style>
