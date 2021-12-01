<template>
  <div class="poster">
    <div class="posterMange">
      <div class="from">
        <div class="fromTop">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="文件名称">
              <el-input
                v-model="formInline.user"
                placeholder="请输入文件名称"
              />
            </el-form-item>
          </el-form>
        </div>
        <div class="fromBut">
          <el-form>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">搜索</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="list" style="min-height:300px">
        <!-- <div class="content">
          <div class="item" v-for="item in posterList" :key="item.id">
            <div class="items">
              <img :src="item.cover" alt="" />
              <div class="desc">
                <p>{{ item.summary }}</p>
                <p>{{ item.title }}</p>
              </div>
            </div>
          </div>
        </div> -->
        <!-- <div class="page">
          <el-pagination
            :current-page="1"
            :page-sizes="[8, 12, 24, 36]"
            :page-size="pageSize"
            layout="total, prev, pager, next, sizes, jumper"
            :total="pageCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div> -->
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
      formInline: {
        user: '',
        region: ''
      },
      page: 1,
      pageSize: 12
    }
  },
  computed: {
    ...mapState({
      pageCount: (state) => state.poster.pageCount,
      posterList: (state) => state.poster.posterList
    })
  },
  methods: {

    ...mapActions({
      getPoster: 'poster/getPoster'
    }),
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.page = val
      console.log(`当前页: ${val}`)
    },
    onSubmit() {
      console.log('submit!')
    },
    resetForm() {
      // 重置
      console.log('这是重置')
    }
  },
  created() {
    this.getPoster({ page: this.page, pageSize: this.pageSize })
  }
}
</script>

<style lang="scss" scoped>
.poster {
  padding: 24px;
  background-color: #eff2f5;
}
.posterMange {
  box-sizing: border-box;
}
.from {
  padding: 24px 12px;
  margin-bottom: 16px;
  background: #fff;
}
.fromBut {
  display: flex;
  justify-content: flex-end;
}

.list {
  background: rgb(255, 255, 255);
  padding: 24px 12px;
}
.content {
  display: flex;
  flex-wrap: wrap;
}
.item {
  width: 25%;
  padding: 0 8px;
}
.items {
  border: 1px solid #f0f0f0;
}
img {
  width: 100%;
  height: 120px;
}
.desc {
  padding: 24px;
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.page{
    margin-top: 1.5rem;
    text-align: right;
}
@media (max-width: 768px) {
  .item {
    width: 50%;
  }
}
</style>
