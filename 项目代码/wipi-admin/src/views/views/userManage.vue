<template>
  <div class="user">
    <div class="user_up">
      <div class="up_box">
        <div class="up_box_two">
          <span>账户：</span>
          <span class="up_box_inp">
            <el-input v-model="name" placeholder="请输入用户账号" />
          </span>
        </div>
        <div class="up_box_two">
          <span>邮箱：</span>
          <span class="up_box_inp">
            <el-input v-model="email" placeholder="请输入账号邮箱" />
          </span>
        </div>
        <div class="up_box_two">
          <span>角色：</span>
          <el-select v-model="role">
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="up_box_two">
          <span>状态：</span>
          <el-select v-model="status">
            <el-option
              v-for="item in states"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="user_but">
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </div>
    <div class="user_down">
      <ul>
        <li>
          <div><input type="checkbox"></div>
          <div>用户</div>
          <div>邮箱</div>
          <div>角色</div>
          <div>状态</div>
          <div>注册日期</div>
          <div>操作</div>
        </li>
      </ul>
      <ul>
        <li v-for="(item, index) in searchall" :key="index">
          <div><input type="checkbox"></div>
          <div>{{ item.name }}</div>
          <div>{{ item.email }}</div>
          <div>{{ item.role === "admin" ? "管理员" : "访客" }}</div>
          <div>
            <span :class="item.status === 'active' ? 'green' : 'yellow'" />{{
              item.status === "active" ? "可用" : "已锁定"
            }}
          </div>
          <div>{{ item.createAt }}</div>
          <div>
            <span @click="disable(item)">{{
              item.status === "active" ? "禁用" : "启用"
            }}</span>
            <div class="zhong" />
            <span class="yes">{{ item.role === "damin" ? "解除授权" : "授权" }}</span>
          </div>
        </li>
      </ul>
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
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      role: '',
      status: '',
      page: 1,
      pageSize: 8,
      active: 'active',
      locked: 'locked',
      name: '', // 用户账号
      email: null, // 邮箱
      roles: [
        {
          value: 'admin',
          label: '管理员'
        },
        {
          value: 'visitor',
          label: '访客'
        }
      ],
      states: [
        {
          value: 'active',
          label: '可用'
        },
        {
          value: 'locked',
          label: '已锁定'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      searchall: (state) => state.userList.searchall,
      searchcount: (state) => state.userList.searchcount,
      update: (state) => state.userList.update
    })
  },
  created() {
    this.getsearch({ page: 1, pageSize: 8 })
  },
  methods: {
    ...mapActions({
      getsearch: 'userList/getsearch',
      userupdate: 'userList/userupdate'
    }),
    ...mapMutations({
      searchitem: 'userList/searchitem'
    }),
    // 禁用启用
    disable(item) {
      // request.post("/api/user/update",{
      //   avatar:item.avatar,
      //   createAt:item.createAt,
      //   email:item.email,
      //   id:item.id,
      //   name:item.name,
      //   role:item.role,
      //   status:"locked",
      //   updateAt:item.updateAt,
      // }).then(ok => {
      //     console.log(ok.data);
      // })
      this.userupdate({
        avatar: item.avatar,
        createAt: item.createAt,
        email: item.email,
        id: item.id,
        name: item.name,
        role: item.role,
        status: item.status, // active  locked
        updateAt: item.updateAt
      })
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
      this.name = ''
      this.email = null
      this.role = ''
      this.status = ''
      this.page = 1
      this.pageSize = 8
    },
    // 搜索
    search() {
      if (this.name || this.email || this.role || this.status) {
        this.getsearch({
          page: this.page,
          pageSize: this.pageSize,
          name: this.name,
          role: this.role,
          status: this.status,
          email: this.email
        })
      } else {
        this.getsearch({ page: this.page, pageSize: this.pageSize })
      }
    }
  }
}
</script>

<style scoped>
.green {
  width: 6px;
  height: 6px;
  background: rgb(82, 196, 26);
  display: inline-block;
  margin: 0px 7px 3px 0;
  border-radius: 15px;
}
.yellow {
  width: 6px;
  height: 6px;
  background: rgb(250, 173, 20);
  display: inline-block;
  margin: 0px 7px 3px 0;
  border-radius: 15px;
}
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
ul > li > div:nth-child(7) > span {
  display: inline-block;
  min-width: 35px;
  color: rgb(24, 144, 255);
  text-align: center;
}
ul > li > div:nth-child(6) {
  display: inline-block;
  width: 230px;
}
ul > li > div:nth-child(5) {
  display: inline-block;
  width: 120px;
}
ul > li > div:nth-child(4) {
  display: inline-block;
  width: 100px;
}
ul > li > div:nth-child(1) {
  display: inline-block;
  width: 40px;
}
ul > li > div {
  display: inline-block;
  padding: 0 10px;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
ul > li {
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgb(217, 217, 217);
  display: flex;
  justify-content: space-evenly;
}
ul {
  width: 100%;
  list-style: none;
  display: inline-block;
  font-size: 15px;
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
  height: 80px;
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
  height: 80px;
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
