import { getRecommend } from "../../services";
const state = {
  recommendList: []
}
const mutations = {
  update(state, payload) {
    for (let key in payload) {
      state[key] = payload[key];
    }
  }
}
const actions = {
  async getRecommend({ commit }) {
    const result = await getRecommend();
    commit('update', { recommendList: result });
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}