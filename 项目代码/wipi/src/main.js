import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import i18n from "./i18n/index";
import 'element-ui/lib/theme-chalk/index.css';
import '@/scss/common.scss';
import * as filters from './filters';
import 'viewerjs/dist/viewer.css';
import '@/utils/time.js'

// 添加过滤器
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

Vue.use(ElementUI);
Vue.directive('slicetext', {
  bind: function (el, binding) {
    let con = binding.value.slice(0, 1);
    el.innerHTML = con;
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
  i18n: i18n,
}).$mount('#app')
