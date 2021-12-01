<template>
  <div class="know">
    <div class="knowledge">
      <div class="from">
        <div class="fromTop">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="名称">
              <el-input
                v-model="formInline.user"
                placeholder="请输入知识库名称"
              />
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="formInline.region">
                <el-option value="publish" label="已发布" />
                <el-option value="draft" label="草稿" />
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
          <el-form>
            <el-button
              type="primary"
              style="margin-left: 16px"
              @click="setDrawer"
            >
              +新建
            </el-button>
            <!-- 新建弹框 -->
            <el-drawer
              title="我是标题"
              :visible.sync="drawer"
              :with-header="false"
              size="600px"
            >
              <div class="element-header">
                <div class="div">新建知识库</div>
                <span @click="drawer = false">X</span>
              </div>
              <div class="element-bottom">
                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="名称">
                    <el-input v-model="form.name" />
                  </el-form-item>
                  <el-form-item label="描述">
                    <el-input v-model="form.desc" type="textarea" />
                  </el-form-item>
                  <el-form-item label="评论">
                    <el-switch v-model="form.delivery" />
                  </el-form-item>
                  <el-form-item label="封面">
                    <el-upload
                      class="upload-demo"
                      drag
                      action="https://jsonplaceholder.typicode.com/posts/"
                      multiple
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      @change="file"
                    >
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      <i class="el-icon-upload" />
                      <div class="el-upload__text">
                        <p>点击选择文件或将文件拖到此处</p>
                      </div>
                    </el-upload>
                  </el-form-item>
                  <el-form-item>
                    <el-input v-model="form.url" />
                  </el-form-item>
                  <el-form-item>
                    <span class="xz">选择文件</span>
                  </el-form-item>
                  <div class="element-footer">
                    <el-button @click="drawer = false">取消</el-button>
                    <el-button
                      type="primary"
                      :disabled="form.disabled"
                      @click="onSubmit"
                    >创建</el-button>
                  </div>
                </el-form>
              </div>
            </el-drawer>
          </el-form>
        </div>
        <div class="content">
          <div class="contentItem">
            <div v-for="item in knowledgeList" :key="item.id" class="item">
              <div class="items">
                <img :src="item.cover" alt="">
                <div class="desc">
                  <p>{{ item.title }}</p>
                  <p>{{ item.summary }}</p>
                </div>
                <div class="icons">
                  <ul>
                    <li>
                      <span><i class="el-icon-edit" /></span>
                    </li>
                    <li>
                      <span
                        @click="edit(item.id, item.status)"
                      ><i
                        :class="
                          item.status === 'publish'
                            ? 'el-icon-download'
                            : 'el-icon-upload2'
                        "
                      /></span>
                    </li>
                    <li>
                      <span
                        @click="setFile(item)"
                      ><i
                        class="el-icon-setting"
                      /></span>
                    </li>
                    <li>
                      <span
                        @click="Delete(item.id)"
                      ><i
                        class="el-icon-delete"
                      /></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
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
      imageUrl: 'https://bwcreation.oss-cn-beijing.aliyuncs.com/2021-11-29/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20211109153956.jpg',
      visible: false,
      form: {
        name: '',
        desc: '',
        url: '',
        delivery: false,
        disabled: true
      },
      formInline: {
        user: '',
        region: ''
      },
      page: 1,
      pageSize: 8,
      drawer: false
    }
  },
  computed: {
    ...mapState({
      pageCount: (state) => state.knowledge.pageCount,
      knowledgeList: (state) => state.knowledge.knowledgeList
    })
  },
  methods: {
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    ...mapActions({
      getKnowledge: 'knowledge/getKnowledge',
      deleteKnowledge: 'knowledge/deleteKnowledge',
      patchKnowledge: 'knowledge/patchKnowledge',
      getFile: 'knowledge/getFile'
    }),
    handleSizeChange(val) {
      this.pageSize = val
      this.getKnowledge({ page: this.page, pageSize: this.pageSize })
    },
    handleCurrentChange(val) {
      this.page = val
      this.getKnowledge({ page: this.page, pageSize: this.pageSize })
    },
    onSubmit() {
      console.log('submit!')
    },
    resetForm() {
      // 重置
      this.formInline.user = ''
      this.formInline.region = ''
    },
    setDisabled() {
      this.form.display = false
    },
    onSearch() {
      // 搜索
      this.getKnowledge({
        page: this.page,
        pageSize: this.pageSize,
        title: this.formInline.user,
        status: this.formInline.region
      })
    },
    async edit(id, status) {
      // 草稿,已发布
      // console.log({id,status});
      await this.patchKnowledge({ id, status })
      await this.getKnowledge({ page: this.page, pageSize: this.pageSize })
    },
    setFile(item) {
      // 回显
      this.drawer = true
      this.form.name = item.title
      this.form.desc = item.summary
      this.form.delivery = item.isCommentable
      this.form.url = item.cover
      this.imageUrl = item.cover
    },
    setDrawer() {
      this.drawer = true
      this.form.name = ''
      this.form.desc = ''
      this.form.delivery = false
      this.form.url = ''
      this.imageUrl = ''
    },
    async Delete(id) {
      // 删除
      await this.deleteKnowledge({ id })
      await this.getKnowledge({ page: this.page, pageSize: this.pageSize })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    file() {
      console.log(this)
    }
  },
  watch: {
    form: {
      deep: true,
      // immediate: true,
      handler(newVal, oldVal) {
        if (newVal.name === '') {
          this.form.disabled = true
        } else {
          this.form.disabled = false
        }
      }
    }
  },
  created() {
    this.getKnowledge({ page: this.page, pageSize: this.pageSize })
    // this.getKnowledge();
  }
}
</script>

<style lang="scss" scoped>
* {
  list-style: none;
}
.know {
  padding: 24px;
  background-color: #eff2f5;
}
.knowledge {
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
  justify-content: flex-end;
  margin-bottom: 16px;
}
.contentItem {
  display: flex;
  flex-wrap: wrap;
  margin-left: -8px;
  margin-right: -8px;
}
.item {
  width: 25%;
  padding: 0 8px;
}
.items {
  border: 1px solid #f0f0f0;
  margin-bottom: 16px;
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
.icons {
  ul {
    border-top: 1px solid #f0f0f0;
    height: 46px;
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
    li {
      flex: 1;
      text-align: center;
    }
    li:first-child {
      border-right: 1px solid #f0f0f0;
    }
    li:nth-child(2) {
      border-right: 1px solid #f0f0f0;
    }
    li:nth-child(3) {
      border-right: 1px solid #f0f0f0;
    }
  }
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
.element-header {
  width: 100%;
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
}
.xz {
  padding: 8px 15px;
  border: 1px solid #d9d9d9;
}
.element-footer {
  padding: 10px 0 0 0;
  border-top: 1px solid #dcdfe6;
  display: flex;
  justify-content: flex-end;
}
.avatar{
  line-height: auto;
}
</style>
