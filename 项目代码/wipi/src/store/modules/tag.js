import { getTagList } from "../../services";
const state = {
  tagList: []
}
const mutations = {
  update(state, payload) {
    for (let key in payload) {
      state[key] = payload[key];
    }
  }
}
const actions = {
  async getTagList({ commit }) {
    const result = await getTagList();
    commit('update', { tagList: result });
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}