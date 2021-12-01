import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

// 引入自模块
import article from './modules/article';
import detail from './modules/detail';
import booklet from './modules/booklet';
import recommend from "./modules/recommend";
import tag from "./modules/tag";
import app from './modules/app';
import createPersistedState from 'vuex-persistedstate'
import comment from './modules/comment'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    article,
    detail,
    booklet,
    recommend,
    tag,
    app,
    comment
  },
  plugins: [createLogger(),createPersistedState()]
})
