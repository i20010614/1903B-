import {
  getsearch,
  getdelsearch
} from '@/api/search'
const state = {
  searchall: [],
  searchcount: 0
}
const mutations = {
  update(state, payload) {
    for (const key in payload) {
      state[key] = payload[key]
    }
  },
  count(state, payload) {
    state.searchcount = payload
  }
}
const actions = {
  async getsearch({
    commit
  }, {
    page,
    pageSize,
    type,
    keyword,
    count
  }) {
    const options = {
      type,
      keyword,
      count
    }
    const result = await getsearch(page, pageSize, options)
    if (result) {
      commit('update', {
        searchall: result.data[0]
      })
      commit('count', result.data[1])
    }
  },
  async getdelsearch({
    commit
  }, id) {
    await getdelsearch(id)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
