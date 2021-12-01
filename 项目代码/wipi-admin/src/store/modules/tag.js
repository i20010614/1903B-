/*
 * @Author: WangXinLe
 * @Date: 2021-11-25 14:15:32
 * @Last Modified by: WangXinLe
 * @Last Modified time: 2021-11-25 19:51:04
 */

import { addTag, delTag, editTag, reqTaglist } from '@/api/tag'

const state = {
  tagList: []
}

const mutations = {
  update(state, info) {
    for (const key in info) {
      state[key] = info[key]
    }
  }
}

const actions = {
  async addTag({ commit }, info) {
    const result = await addTag(info)
    console.log('addTag', result)
  },
  async reqTaglist({ commit }) {
    const result = await reqTaglist()
    console.log('reqtagList', result.data)
    commit('update', { tagList: result.data })
  },
  async editTag({ commit }, data) {
    const result = await editTag(data)
    console.log('edit_tag', result)
  },
  async delTag({ commit }, id) {
    const result = await delTag(id)
    console.log('result_delTag', result)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
