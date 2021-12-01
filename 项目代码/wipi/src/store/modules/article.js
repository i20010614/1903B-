import { getArticleList , getArticleDetail} from '@/services'
const state = {
    articleList: [],
    articleDetail: {}
}

const mutations = {
    update(state, payload) {
        for (let key in payload) {
            state[key] = payload[key];
        }
    },
}

const actions = {
    async getArticleList({ commit }) {
        let result = await getArticleList();
        if (result) {
            commit('update', { articleList: result[0] });
        }
    },
    async getArticleDetail({commit}, payload){
        let result = await getArticleDetail(payload);
        if (result){
            commit('update', {
                articleDetail: result
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