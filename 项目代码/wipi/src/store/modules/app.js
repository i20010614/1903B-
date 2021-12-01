// App页面切换动态组件
const state = {
  newItem: null,
};

const mutations = {
  changeItem(state, info) {
    state.newItem = info;
  },
};

export default {
  namespaced: true,
  state,
  mutations
}

