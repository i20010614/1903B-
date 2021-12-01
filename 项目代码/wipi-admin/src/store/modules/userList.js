import { getsearch, userupdate } from '@/api/userList'
const state = {
  searchall: [],
  searchcount: 0,
  update: []
}
const mutations = {
  update(state, payload) {
    for (const key in payload) {
      state[key] = payload[key]
    }
  },
  count(state, payload) {
    state.searchcount = payload
  },
  counts(state, payload) {
    state.update = payload
  }
}
const actions = {
  async getsearch({ commit }, info) {
    const result = await getsearch(info)
    if (result) {
      commit('update', { searchall: result.data[0] })
      commit('count', result.data[1])
    }
  },
  async userupdate({ commit }, { ...item }) {
    const result = await userupdate(item)
    console.log(result)
    if (result) {
      commit('counts', result.data)
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
