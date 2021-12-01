<template>
  <div class="tag">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>添加标签</span>
            </div>
            <div class="text item">
              <el-input
                v-model="label"
                placeholder="输入标签名称"
                clearable
              />
              <el-input
                v-model="value"
                placeholder="输入标签值（请输入英文，作为路由使用）"
                clearable
              />
              <el-button type="primary" @click="handleSave">{{
                flag ? "修改" : "保存"
              }}</el-button>
              <el-button
                v-show="flag"
                type="info"
                @click="handleBack"
              >返回添加</el-button>
              <el-button
                v-show="flag"
                type="danger"
                @click="handleDel"
              >删除</el-button>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple-light">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>所有标签</span>
            </div>
            <div class="con">
              <li
                v-for="(item, index) in tagList"
                :key="index"
                @click="handleTag(item)"
              >
                {{ item.label }}
              </li>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <Footer />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      label: '',
      value: '',
      flag: false,
      id: null
    }
  },
  methods: {
    ...mapActions({
      addTag: 'tag/addTag',
      reqTaglist: 'tag/reqTaglist',
      editTag: 'tag/editTag',
      delTag: 'tag/delTag'
    }),
    async handleSave() {
      if (this.flag) {
        await this.editTag({
          id: this.id,
          label: this.label,
          value: this.value
        })
      } else {
        await this.addTag({
          label: this.label,
          value: this.value
        })
      }
      this.reqTaglist()
    },
    handleBack() {
      this.label = null
      this.value = null
      this.flag = false
    },
    handleTag(info) {
      this.flag = true
      this.id = info.id
      this.label = info.label
      this.value = info.value
    },
    async handleDel() {
      await this.delTag(this.id)
      this.label = null
      this.value = null
      this.reqTaglist()
    }
  },
  created() {
    this.reqTaglist()
  },
  computed: {
    ...mapState({
      tagList: (state) => state.tag.tagList
    })
  },
  mounted() {
    console.log(this.tagList)
  }
}
</script>

<style lang='scss' scoped>
.con {
    display: flex;
    flex-wrap: wrap;
    li {
        text-align: center;
        padding: 8px 12px;
        margin: 5px;
        border-radius: 3px;
        border: 1px solid #ccc;
        list-style: none;
        cursor: pointer;
        transition: all .2s ease-in-out;
        &:hover {
            background-color: #4299e1;
            color: #fff;
        }
    }
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
.text {
    font-size: 14px;
    line-height: 62px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both;
}
</style>
