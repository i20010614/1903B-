<template>
  <div class="comment">
    <div class="commentMange">
      <div class="from">
        <div class="fromTop">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="称呼">
              <el-input v-model="formInline.user" placeholder="请输入称呼" />
            </el-form-item>
            <el-form-item label="Email">
              <el-input
                v-model="formInline.email"
                placeholder="请输入联系方式"
              />
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="formInline.region">
                <el-option value="1" label="已通过" />
                <el-option value="0" label="未通过" />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="fromBut">
          <el-form>
            <el-form-item>
              <el-button type="primary" @click="onSearch">搜索</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="list">
        <div class="listTop">
          <div class="listTopLeft">
            <div v-show="multipleSelection.length > 0" class="leftItem">
              <el-button plain @click="onHandleClick">通过</el-button>
              <el-button plain @click="onRefuseClick">拒绝</el-button>
              <el-button plain @click="onDeleteClick">删除</el-button>
            </div>
          </div>
          <div class="listTopRight">
            <el-button
              type="text"
              @click="comment"
            ><i
              class="el-icon-refresh-right"
            /></el-button>
          </div>
        </div>
        <div class="content">
          <el-table
            :data="commentList"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="40" />
            <el-table-column fixed prop="" label="状态" width="150">
              <template slot-scope="scope">
                <span><span :class="scope.row.pass ? 'green' : 'origin'" />{{
                  scope.row.pass ? "已通过" : "未通过"
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="称呼" width="140" />
            <el-table-column prop="email" label="联系方式" width="180" />
            <el-table-column prop="content" label="原始内容" width="140">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <span style="margin-left: 10px">{{ scope.row.content }}</span>
                  <div slot="reference" class="name-wrapper">
                    <el-tag
                      size="medium"
                    ><span style="margin-left: 10px">查看内容</span></el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="" label="HTML内容" width="140">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <span style="margin-left: 10px" v-html="scope.row.html" />
                  <div slot="reference" class="name-wrapper">
                    <el-tag
                      size="medium"
                    ><span style="margin-left: 10px">查看内容</span></el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop=""
              show-overflow-tooltip
              label="管理文章"
              width="120"
            >
              <template><span>文章</span></template>
            </el-table-column>
            <el-table-column prop="" label="创建时间" width="200">
              <template
                slot-scope="scope"
              ><span>{{ scope.row.createAt | spliceTime }}</span></template>
            </el-table-column>
            <el-table-column prop="" label="父级评论" width="140">
              <template><span>无</span></template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="160">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="handleClick(scope.row)"
                >通过</el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="refuseClick(scope.row)"
                >拒绝</el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="open(scope.row)"
                >回复</el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="deleteClick(scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page">
          <el-pagination
            :current-page="1"
            :page-sizes="[8, 12, 24, 36]"
            :page-size="pageSize"
            layout="total, prev, pager, next, sizes, jumper"
            :total="pageCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
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
        email: '',
        region: ''
      },
      page: 1,
      pageSize: 12,
      multipleSelection: []
    }
  },
  computed: {
    ...mapState({
      pageCount: (state) => state.comment.pageCount,
      commentList: (state) => state.comment.commentList
    })
  },
  methods: {
    onHandleClick() {
      this.multipleSelection.forEach((item) => {
        return this.handleClick(item)
      })
    },
    onRefuseClick() {
      this.multipleSelection.forEach((item) => {
        return this.refuseClick(item)
      })
    },
    onDeleteClick() {
      this.multipleSelection.forEach((item) => {
        return this.deleteClick(item)
      })
    },
    comment() {
      this.getComment({ page: this.page, pageSize: this.pageSize })
    },
    open(row) {
      this.$prompt('回复评论', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的回复是: ' + value
          })
          this.commentChildren({
            content: value,
            createByAdmin: true,
            email: row.email,
            hostId: row.hostId,
            name: row.name,
            parentCommentId: row.parentCommentId,
            replyUserEmail: row.replyUserEmail,
            replyUserName: row.replyUserName,
            url: row.url
          })
          setTimeout(() => {
            this.getComment({ page: this.page, pageSize: this.pageSize })
          }, 2000)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
    },
    async handleClick(row) {
      // 通过
      await this.passComment({ id: row.id, pass: true })
      await this.getComment({
        page: this.page,
        pageSize: this.pageSize,
        name: this.formInline.user,
        email: this.formInline.email,
        pass: this.formInline.region
      })
    },
    async refuseClick(row) {
      await this.passComment({ id: row.id, pass: false })
      await this.getComment({
        page: this.page,
        pageSize: this.pageSize,
        name: this.formInline.user,
        email: this.formInline.email,
        pass: this.formInline.region
      })
    },
    async deleteClick(row) {
      await this.deleteComment({ id: row.id })
      await this.getComment({
        page: this.page,
        pageSize: this.pageSize,
        name: this.formInline.user,
        email: this.formInline.email,
        pass: this.formInline.region
      })
    },
    ...mapActions({
      getComment: 'comment/getComment',
      passComment: 'comment/passComment',
      deleteComment: 'comment/deleteComment',
      commentChildren: 'comment/commentChildren'
    }),
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getComment({
        page: this.page,
        pageSize: this.pageSize,
        name: this.formInline.user,
        email: this.formInline.email,
        pass: this.formInline.region
      })
    },
    handleCurrentChange(val) {
      this.page = val
      this.getComment({
        page: this.page,
        pageSize: this.pageSize,
        name: this.formInline.user,
        email: this.formInline.email,
        pass: this.formInline.region
      })
      // console.log(`当前页: ${val}`)
    },
    onSearch() {
      this.getComment({
        page: this.page,
        pageSize: this.pageSize,
        name: this.formInline.user,
        email: this.formInline.email,
        pass: this.formInline.region
      })
    },
    resetForm() {
      // 重置
      this.formInline.user = ''
      this.formInline.email = ''
      this.formInline.region = ''
    },
    handleSelectionChange(val) {
      // 多选框
      this.multipleSelection = val
      console.log(val, this.multipleSelection)
    }
  },
  created() {
    this.getComment({ page: this.page, pageSize: this.pageSize })
  },
  mounted() {
    console.log(this.commentList)
  }
}
</script>

<style lang="scss" scoped>
.comment {
  padding: 24px;
  background-color: #eff2f5;
}
.commentMange {
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
.listTop {
  display: flex;
  justify-content: space-between;
  margin-bottom: 22px;
  .el-icon-refresh-right {
    color: #000;
    font-size: 16px;
  }
}
.content {
  display: flex;
  flex-wrap: wrap;
}

.page {
  margin-top: 1.5rem;
  text-align: right;
}
@media (max-width: 768px) {
  .item {
    width: 50%;
  }
}
.green {
  display: inline-block;
  width: 6px;
  height: 6px;
  // color:green;
  border-radius: 50%;
  background-color: #52c41a;
  margin: 0 2px;
}
.origin {
  display: inline-block;
  width: 6px;
  height: 6px;
  // color: orange;
  border-radius: 50%;
  background-color: #faad14;
  margin: 0 2px;
}
.el-form-item {
  margin-bottom: 0;
}
</style>
