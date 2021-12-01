import { getKnowledge, getdetail } from "../../services";
const state = {
  knowList: [],
  bookdetail: {},
  bookdetailchild: {},
  ind:0
}
const mutations = {
  update(state, payload) {
    for (let key in payload) {
      state[key] = payload[key];
    }
  },
  bookdetaillist(state, payload) {
    for (let key in payload) {
      state[key] = payload[key];
    }
  },
  btnindex(state,payload){
      state.ind=payload
  },
  getdetailchildren(state) {
    state.bookdetailchild = state.bookdetail.children
  },
}
const actions = {
  async getKnowledge({ commit }) {
    const result = await getKnowledge();
    commit('update', { knowList: result[0] });
  },
  async getdetail({ commit }, info) {
    const result = await getdetail(info);
    commit('bookdetaillist', { bookdetail: result });
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}