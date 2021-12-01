<template>
  <div class="viewManage">
    <div class="viewManage_top">
      <el-tabs v-model="activeName" :tab-position="tabposition">
        <el-tab-pane label="系统设置" name="first">
          <div class="viewManage_right">
            <div v-for="(item, index) in bt" :key="index" class="seo-top">
              <div>{{ item.a }}</div>
              <div class="seo-top-div" style="display:flex">
                <input v-model="item.b" class="inp" type="text" :placeholder="'请输入' + item.a">
                <el-button type="text" @click="drawer = true">
                  <span v-show="item.flag" class="ant-input-group-addon">
                    <span
                      role="img"
                      aria-label="file-image"
                      tabindex="-1"
                      class="anticon anticon-file-image"
                    >
                      <svg
                        viewBox="64 64 896 896"
                        focusable="false"
                        data-icon="file-image"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          d="M553.1 509.1l-77.8 99.2-41.1-52.4a8 8 0 00-12.6 0l-99.8 127.2a7.98 7.98 0 006.3 12.9H696c6.7 0 10.4-7.7 6.3-12.9l-136.5-174a8.1 8.1 0 00-12.7 0zM360 442a40 40 0 1080 0 40 40 0 10-80 0zm494.6-153.4L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z"
                        />
                      </svg>
                    </span>
                  </span>
                </el-button>
                <el-drawer :visible.sync="drawer" size="500px">
                  <div>
                    上传文件
                  </div>
                </el-drawer>
              </div>
            </div>
            <div class="seo-top-d">
              <div class="information">页脚信息</div>
              <div>
                <el-input
                  v-model="textarea"
                  type="textarea"
                  :rows="6"
                  placeholder="请输入内容"
                />
              </div>
            </div>
          </div>
          <el-button type="primary">保存</el-button>
        </el-tab-pane>
        <el-tab-pane label="国际化设置" name="second">
          <div style="margin-bottom: 20px">
            <el-button size="small" @click="addTab(editableTabsValue)"> 添加 </el-button>
          </div>
          <el-tabs
            v-model="editableTabsValue"
            type="card"
            closable
            @tab-remove="removeTab"
          >
            <el-tab-pane
              v-for="(item, index) in editableTabs"
              :key="index"
              :label="item.title"
              :name="item.name"
            >
              <JsonEditor />
            </el-tab-pane>
          </el-tabs>
          <el-button type="primary">保存</el-button>
        </el-tab-pane>
        <el-tab-pane label="SEO设置" name="third">
          <div class="viewManage_right">
            <div class="seo-top">
              <div>关键字</div>
              <div>
                <input v-model="keyword" class="inp" type="text" name="">
              </div>
            </div>
            <div class="seo-top-d">
              <div class="information">描述信息</div>
              <div>
                <el-input
                  v-model="textarea"
                  type="textarea"
                  :rows="6"
                  placeholder="请输入内容"
                />
              </div>
            </div>
          </div>
          <el-button type="primary">保存</el-button>
        </el-tab-pane>
        <el-tab-pane label="数据统计" name="fourth">
          <div class="viewManage_right">
            <div class="seo-top">
              <div>百度统计</div>
              <div class="seo-top-div">
                <input class="inp" type="text" placeholder="请输入百度统计 Id">
              </div>
            </div>
            <div class="seo-top">
              <div>谷歌分析</div>
              <div class="seo-top-div">
                <input class="inp" type="text" placeholder="请输入谷歌分析 Id">
              </div>
            </div>
            <el-button type="primary">保存</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="OSS设置" name="oss">
          <div class="viewManage_right">
            <div class="explain">
              <h3>说明</h3>
              <p>
                请在编辑器中输入您的 oss 配置，并添加 type 字段区分
                {"type":"aliyun","accessKeyld":"","accessKeySecret":"","bucket":"","https":true,"region":""}
              </p>
            </div>
            <JsonEditor />
            <el-button type="primary">保存</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="SMTP服务" name="smtp">
          <div class="viewManage_right">
            <div v-for="(item, index) in smtp" :key="index" class="seo-top">
              <div>{{ item.a }}</div>
              <div class="seo-top-div">
                <input class="inp" type="text" :placeholder="item.b">
              </div>
            </div>
            <el-button type="primary">保存</el-button>
            <el-button plain>测试</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <Footer />
  </div>
</template>

<script>
import JsonEditor from '@/components/JsonEditor/index.vue'
import Footer from '@/components/Footer/index.vue'
export default {
  components: { Footer, JsonEditor },
  data() {
    return {
      drawer: false,
      i18n: '{}',
      editableTabsValue: '1',
      editableTabs: [
        {
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        },
        {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }
      ],
      tabIndex: 2,
      activeName: 'first',
      tabposition: 'left',
      keyword:
        'JavaScript,TypeScript,Vue.js,微信小程序,React.js,正则表达式,WebGL,Webpack,Docker,MVVM,nginx,java',
      textarea:
        '“小楼又清风”是 fantasticit（https://github.com/fantasticit）的个人小站。本站的文章包括：前端、后端等方面的内容，也包括一些个人读书笔记。',
      bt: [
        { a: '系统地址', b: 'https://blog.wipi.tech/', flag: false },
        { a: '后台地址', b: 'https://admin.blog.wipi.tech/', flag: false },
        { a: '系统标题', b: '小楼又清风', flag: false },
        { a: '全局背景', flag: false },
        {
          a: 'Logo',
          b:
            "<img height='36' src='https://wipi.oss-cn-shanghai.aliyuncs.com/2021-02-20/wipi-logo.png' alt='logo'>",
          flag: true
        },
        {
          a: 'Favicon',
          b: 'https://wipi.oss-cn-shanghai.aliyuncs.com/2021-02-20/wipi-favicon.png',
          flag: true
        }
      ],
      smtp: [
        { a: 'SMTP 地址', b: '请输入 SMTP' },
        { a: 'SMTP 端口（强制使用 SSL 连接）', c: '请输入 SMTP 端口' },
        { a: 'SMTP 用户', b: '请输入 SMTP 用户' },
        { a: 'SMTP 密码', b: '请输入SMTP', c: '也可能是授权码' },
        { a: 'SMTP 发件人', b: '请输入正确的邮箱地址' }
      ]
    }
  },
  methods: {
    addTab(targetName) {
      const newTabName = ++this.tabIndex + ''
      this.editableTabs.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content'
      })
      this.editableTabsValue = newTabName
    },
    removeTab(targetName) {
      const tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }

      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName)
    }
  }
}
</script>

<style scoped>
.explain {
  border: 1px solid rgb(122, 206, 255);
  padding: 0 0 0 15px;
  background: rgb(230, 247, 255);
  margin: 0px 0 15px 0;
}
.el-tabs__content {
  overflow-y: auto;
}
.list {
  /* display: inline-block; */
  width: 64px;
  padding: 0;
  margin: 0;
  font-size: 15px;
  float: left;
}
.el-textarea__inner {
  width: 100%;
  padding: 0;
}
.list > li {
  width: 64px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: rgb(35, 120, 161);
}
.el-textarea {
  width: 590px;
  float: left;
  font-size: 15px;
}
.seo-top-d {
  height: 200px;
}
.seo-top-div {
  width: 595px;
  margin: 9px 1px 1px 1px;
  line-height: 24.4px;
  border: 1px solid #ccc;
}
.ant-input-group-addon {
  display: inline-block;
  width: 44.4px;
  height: 24px;
  border-left: 1px solid #ccc;
  padding: 4px 3px 0px 3px;
  text-align: center;
}
.information {
  margin: 0 0 16px 0;
}
.seo-top {
  padding: 0 0 8px 0;
  margin: 0 0 24px 0;
}
.inp {
  width: 538px;
  border: none;
  outline-style: none;
  margin: 0 0 0 10px;
}
ul {
  list-style: none;
}
.viewManage {
  background: rgb(239, 242, 245);
}
.viewManage_top {
  padding: 16px;
  background: #fff;
  margin: 24px;
}
.viewManage_right {
  padding: 16px;
  min-height: 360px;
}
</style>
