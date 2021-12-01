import { getmail, getdelmail } from '@/api/mail'
const state = {
  mailall: [],
  mailcount: 0
}
const mutations = {
  update(state, payload) {
    for (const key in payload) {
      state[key] = payload[key]
    }
  },
  count(state, payload) {
    state.mailcount = payload
  }
}
const actions = {
  async getmail({ commit }, { page, pageSize, from, to, subject }) {
    const options = {
      from,
      to,
      subject
    }
    const result = await getmail({ page, pageSize, options })
    if (result) {
      commit('update', { mailall: result.data[0] })
      commit('count', result.data[1])
    }
  },
  async getdelmail({ commit }, id) {
    await getdelmail(id)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
