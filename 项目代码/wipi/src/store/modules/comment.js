// 引入详情数据请求
import { getAllComment, addComment } from "../../services";

const state = {
  commentList: {}
}
const mutations = {
  update(state, payload) {
    for (let key in payload) {
      state[key] = payload[key];
    }
  }
}
const actions = {
  async addComment({commit},info) {
    let result = await addComment(info);
    console.log(result);
  },
  async getAllComment({ commit }) {
    let result = await getAllComment();
    commit('update', { commentList: result[0] });
    localStorage.setItem('commentList', result[0]);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
