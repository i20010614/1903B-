/*
 * @Author: WangXinLe
 * @Date: 2021-11-25 14:15:32
 * @Last Modified by: WangXinLe
 * @Last Modified time: 2021-11-26 13:48:08
 */

import { addCategory, editCategory, delCategory, getCategoryList } from '@/api/classify'

const state = {
  categoryList: []
}

const mutations = {
  update(state, info) {
    for (const key in info) {
      state[key] = info[key]
    }
  }
}

const actions = {
  async addCategory({ commit }, info) {
    const result = await addCategory(info)
    console.log('addCategory', result)
  },
  async getCategoryList({ commit }) {
    const result = await getCategoryList()
    console.log('getCategoryList', result.data)
    commit('update', { categoryList: result.data })
  },
  async editCategory({ commit }, data) {
    const result = await editCategory(data)
    console.log('editCategory', result)
  },
  async delCategory({ commit }, id) {
    const result = await delCategory(id)
    console.log('delCategory', result)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
