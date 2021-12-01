import { fetchList, delArticle, fetchItem } from '@/api/article'

const state = {
  articleList: [],
  articleItem: null
}
const mutations = {
  update(state, info) {
    for (const key in info) {
      state[key] = info[key]
    }
  }
}

const actions = {
  async fetchList({ commit }, info) {
    const result = await fetchList(info)
    console.log('fetchList', result.data[0])
    commit('update', { articleList: result.data[0] })
  },
  async delArticle({ commit }, id) {
    const result = await delArticle(id)
    console.log('delArticle', result)
  },
  async fetchItem({ commit }, id) {
    const result = await fetchItem(id)
    console.log('fetchItem', result.data)
    commit('update', { articleItem: result.data })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
