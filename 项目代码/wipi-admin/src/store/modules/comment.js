import {
  getComment,
  passComment,
  deleteComment,
  commentChildren
} from '@/api/comment'
import { options } from 'runjs'
const state = {
  pageCount: 0,
  commentList: []
}

const mutations = {
  update(state, payload) {
    for (const key in payload) {
      state[key] = payload[key]
    }
  }
}

const actions = {
  async getComment({
    commit
  }, payload = {}) {
    console.log('payload...', payload)
    const {
      page, pageSize, ...options
    } = payload
    const result = await getComment(page, pageSize, options)
    console.log('result...', result)
    if (result.data) {
      commit('update', {
        pageCount: result.data[1],
        commentList: result.data[0]
      })
    }
  },
  // 通过,拒绝
  async passComment({ commit }, payload = {}) {
    console.log('payload...', payload)
    const {
      id, ...options
    } = payload
    console.log(id, options)
    await passComment(id, options)
  },
  // 删除
  async deleteComment({ commit }, payload = {}) {
    console.log('payload...', payload)
    const {
      id
    } = payload
    await deleteComment(id)
  },
  // 回复评论
  async commentChildren({ commit }, payload = {}) {
    console.log('payload...', payload)
    await commentChildren(payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
