import {
  getPoster
} from '@/api/poster'
const state = {
  pageCount: 0,
  posterList: []
}

const mutations = {
  update(state, payload) {
    for (const key in payload) {
      state[key] = payload[key]
    }
  }
}

const actions = {
  async getPoster({
    commit
  }, payload = {}) {
    console.log('payload...', payload)
    const {
      page, pageSize
    } = payload
    const result = await getPoster(page, pageSize)
    console.log('result...', result)
    if (result.data) {
      commit('update', {
        pageCount: result.data[1],
        posterList: result.data[0]
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
