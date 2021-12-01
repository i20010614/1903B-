<template>
  <iframe
    id="bdIframe"
    style="width: 100%; height: 100%"
    :src="bdTokenUrl"
    frameborder="0"
  />
</template>

<script>
export default {
  name: 'Turnoverfamily',
  data() {
    return {
      bdTokenUrl: 'https://jasonandjay.com/1903B/wangxinle/wipi/'
    }
  },
  created() {
    this.getUrl()
    this.$nextTick(() => {
      this.getCode()
    })
  },
  mounted() {
    /**
         * iframe-宽高自适应显示
         */
    const oIframe = document.getElementById('bdIframe')
    // const deviceWidth = document.documentElement.clientWidth;
    // const deviceHeight = document.documentElement.clientHeight;
    oIframe.style.width = 375 + 'px' // 数字是页面布局宽度差值
    oIframe.style.height = 600 + 'px' // 数字是页面布局高度差
  },
  methods: {
    /**
         * 获取-外部接口信息
         */
    getUrl() {
      const that = this
      const bdUrl = { queryurl: this.$paths.bdpath + '/locate' }
      this.$api.getBdToken(bdUrl, function(res) {
        that.bdTokenUrl = res.data.data
      })
    }
  }
}
</script>

<style>
</style>
