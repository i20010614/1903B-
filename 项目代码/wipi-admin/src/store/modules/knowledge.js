import {
  getKnowledge,
  deleteKnowledge,
  patchKnowledge,
  getFile
} from '@/api/knowledge'
const state = {
  pageCount: 0,
  knowledgeList: []
}

const mutations = {
  update(state, payload) {
    for (const key in payload) {
      state[key] = payload[key]
    }
  }
}
// 获取数据
const actions = {
  async getKnowledge({
    commit
  }, payload = {}) {
    console.log('payload...', payload)
    const {
      page,
      pageSize,
      ...options
    } = payload
    const result = await getKnowledge(page, pageSize, options)
    console.log('result...', result)
    if (result.data) {
      commit('update', {
        pageCount: result.data[1],
        knowledgeList: result.data[0]
      })
    }
  },
  // 删除
  async deleteKnowledge({
    commit
  }, payload = {}) {
    console.log('payload...', payload)
    const {
      id
    } = payload
    await deleteKnowledge(id)
  },
  // 回显
  // 草稿
  async patchKnowledge({
    commit
  }, payload = {}) {
    console.log('payload...', payload)
    const {
      id,
      ...options
    } = payload
    await patchKnowledge(id, options)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
