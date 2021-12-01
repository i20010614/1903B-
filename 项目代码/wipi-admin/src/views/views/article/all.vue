<template>
  <div class="article">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="formInline.title" placeholder="审批人" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.status">
          <el-option label="已发布" value="publish" />
          <el-option label="草稿" value="draft" />
        </el-select>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="formInline.category">
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="warning" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-button type="primary" fix="right">新建</el-button>
      <el-button type="primary" :loading="loading" @click="handleLoading">{{ loading?"加载中":'点击加载' }}</el-button>
    </el-row>
    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="articleList"
      tooltip-effect="light"
      style="width: 100%"
      max-height="500"
      heitht="200"
      stripe
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        highlight-current-row="true"
        fixed
        type="selection"
        width="55"
      />
      <el-table-column prop="title" fixed label="标题" width="200" />
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          <el-badge
            v-if="scope.row.status === 'draft'"
            type="warning"
            is-dot
            class="item"
          >草稿</el-badge>
          <el-badge
            v-if="scope.row.status === 'publish'"
            type="success"
            is-dot
            class="item"
          >已发布</el-badge>
        </template>
      </el-table-column>
      <el-table-column label="分类" width="120">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.category"
            type="success"
            size="mini"
          >{{ scope.row.category.label }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="标签" width="200">
        <template slot-scope="scope">
          <el-button
            v-for="item in scope.row.tags"
            :key="item.id"
            type="primary"
            size="mini"
          >{{ item.label }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="views" label="阅读量" width="120">
        <template slot-scope="scope">
          <span class="green">{{ scope.row.views }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="likes" label="喜欢数" width="120">
        <template slot-scope="scope">
          <span class="pink">{{ scope.row.likes }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="发布时间" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.createAt | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="medium"
            @click.native.prevent="editArticle(scope.row.id)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="medium"
            @click.native.prevent="
              deleteRow(scope.$index, tableData)
            "
          >
            首焦推荐
          </el-button>
          <el-button
            type="text"
            size="medium"
            @click.native.prevent="
              deleteRow(scope.$index, tableData)
            "
          >
            查看访问
          </el-button>
          <el-button
            type="text"
            size="medium"
            @click.native.prevent="del(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Footer />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      formInline: {
        title: '',
        category: '',
        status: ''
      },
      multipleSelection: [],
      loading: false
    }
  },
  methods: {
    ...mapActions({
      getCategoryList: 'classify/getCategoryList',
      fetchList: 'article/fetchList',
      delArticle: 'article/delArticle'
    }),
    async handleLoading() {
      this.loading = true
      await this.fetchList({
        page: 1,
        pageSize: 12,
        ...this.formInline
      })
      this.loading = false
    },
    onSubmit() {
      console.log('submit!', this.formInline)
      this.fetchList({
        page: 1,
        pageSize: 12,
        ...this.formInline
      })
    },
    async del(id) {
      await this.delArticle(id)
      this.fetchList({
        page: 1,
        pageSize: 12
      })
    },
    async editArticle(id) {
      this.$router.push('/article/editor/' + id)
    },
    handleReset() {
      this.formInline = {
        title: null,
        category: null,
        status: null
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.classify.categoryList,
      articleList: (state) => state.article.articleList
    })
  },
  mounted() {
    this.getCategoryList()
    this.fetchList({
      page: 1,
      pageSize: 12
    })
    console.log(this.articleList)
  }
}
</script>

<style lang='scss'>
.green,
.pink {
    width: 20px;
    height: 20px;
    display: inline-block;
    border-radius: 50%;
    background-color: #52c41a;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
}
.pink {
    background-color: #eb2f96;
}
.item {
    margin-top: 10px;
    margin-right: 40px;
}
.form {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
