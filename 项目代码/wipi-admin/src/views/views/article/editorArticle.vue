<template>
  <div class="editor">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark row_one">
          <div class="ant-page-header-heading-left">
            <div class="ant-page-header-back">
              <div
                role="button"
                tabindex="0"
                class="ant-page-header-back-button"
                aria-label="返回"
                style="
                                    border: 0px;
                                    background: transparent;
                                    padding: 0px;
                                    line-height: inherit;
                                    display: inline-block;
                                "
              >
                <button
                  type="button"
                  class="ant-btn ant-btn-sm ant-btn-icon-only"
                >
                  <span
                    role="img"
                    aria-label="close"
                    class="anticon anticon-close"
                  ><svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="close"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
                    /></svg></span>
                </button>
              </div>
            </div>
            <span
              v-if="articleItem"
              class="ant-page-header-heading-title"
            ><input
              placeholder="请输入文章标题"
              type="text"
              class="ant-input"
              :value="articleItem.title"
              style="width: 300px"
            ></span>
          </div>
          <div class="headerbox">
            <el-button type="primary">发布</el-button>
            <button class="btn" @click="drawer = true">
              <span
                role="img"
                aria-label="ellipsis"
                class="anticon anticon-ellipsis"
              ><svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="ellipsis"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z"
                /></svg></span>
            </button>
            <el-drawer
              title="文章设置"
              :visible.sync="drawer"
              :direction="direction"
              :before-close="handleClose"
            >
              <span>我来啦!</span>
            </el-drawer>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18">
        <div class="content">
          <mavon-editor
            v-if="articleItem"
            v-model="articleItem.content"
            style="height: 100%; width: 100%"
          />
        </div>
      </el-col>
      <el-col :span="6" class="rightFlag">
        <h2>大纲 <span>X</span></h2>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  data() {
    return {
      content: '', // 双向绑定
      editorOption: {}, // 默认
      result: null,
      lisDom: [],
      drawer: false,
      direction: 'rtl',
      num: 0
    }
  },
  computed: {
    ...mapState({
      articleItem: (state) => state.article.articleItem
    }),
    editor() {
      return this.$refs.myQuillEditor.quill
    }
    // geneTOC() {
    //   console.log('articleItem...', this.articleItem)
    //   if (this.articleItem.content) {
    //     const fragement = document.createFragment()
    //     fragement.innerHTML = fragement
    //     console.log('fragment...', fragement)
    //   }
    // }
  },
  watch: {
    articleItem() {
      console.log('articleItem...', this.articleItem)
      if (this.articleItem.content) {
        // let fragement = document.createDocumentFragment();
        // fragement.innerHTML = this.articleItem.html;
        // console.log("fragment...", fragement);
        let hs = []
        const lis = document.querySelectorAll('.v-show-content>h3')
        hs = lis
        console.log(hs)
        // for (let i = 1; i < 7; i++) {
        //     let lis = document.querySelectorAll(`h${i}`);
        //     hs = [...hs, ...lis];
        // }
        // console.log("hs", hs);
      }
    }
  },
  created() {
    this.getItem()
  },
  mounted() {
    console.log('123213')
    this.$nextTick(function() {})
  },
  methods: {
    ...mapActions({
      fetchItem: 'article/fetchItem'
    }),
    getItem() {
      const { id } = this.$route.params
      this.fetchItem(id)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    }
  },
  components: {
    mavonEditor
  }
}
</script>

<style scoped lang='scss'>
.red {
    color: #f00;
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
.ant-page-header-heading-left {
    display: flex;
    align-items: center;
    margin: 4px 0;
    overflow: hidden;
}
.ant-input {
    border: none;
    border-bottom: 1px solid #000;
    margin-left: 10px;
    padding-left: 10px;
    outline: none;
}
.btn {
    border: none;
    background-color: #fff;
    color: #0188fb;
    cursor: pointer;
}
.grid-content {
    border-radius: 4px;
    min-height: 50px;
    border-bottom: 1px solid rgb(235, 237, 240);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
}
.row_one {
    background-color: #fff;
}
.ant-page-header-heading {
    display: flex;
    justify-content: space-between;
}
</style>
