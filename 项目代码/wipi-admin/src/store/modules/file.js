import { getfile, getdelfile } from '@/api/file'
const state = {
  fileall: [],
  filecount: 0
}
const mutations = {
  update(state, payload) {
    for (const key in payload) {
      state[key] = payload[key]
    }
  },
  count(state, payload) {
    state.filecount = payload
  }
}
const actions = {
  async getfile({ commit }, { page, pageSize, originalname, type }) {
    const options = {
      originalname,
      type
    }
    const result = await getfile({ page, pageSize, options })
    console.log(result, '....')
    if (result) {
      commit('update', { fileall: result.data[0] })
      commit('count', result.data[1])
    }
  },
  async getdelfile({ commit }, id) {
    await getdelfile(id)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
