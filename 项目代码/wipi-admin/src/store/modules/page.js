import { getPage } from '../../api/page'

const state = {
  PageList: [],
  page: 1,
  pageSize: 12

}

const mutations = {
  update(state, info) {
    for (const key in info) {
      state[key] = info[key]
    }
  }
}

const actions = {
  getPage({ commit, state }, info) {
    const { page, pageSize, PageList } = state
    console.log({ page, pageSize })
    getPage({ page, pageSize }).then(res => {
      commit('update', { PageList: res.data })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

