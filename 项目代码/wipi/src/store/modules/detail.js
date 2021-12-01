// 引入详情数据请求
import { getDetailList } from "../../services";

const state = {
  detailList: {}
}
const mutations = {
  update(state, payload) {
    for (let key in payload) {
      state[key] = payload[key];
    }
  }
}
const actions = {
  async getDetailList({ commit }, payload) {
    const result = await getDetailList(payload);
    commit('update', { detailList: result });
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
