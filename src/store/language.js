import { instance } from '../service/axios.js'

export default {
  namespaced: true,
  state: {
    listLanguages: [],
  },
  mutations: {
    updateListLanguage: (state, newListLanguage) => {
      state.listLanguages = newListLanguage
    },
  },
  actions: {
    async getListLanguages({ commit }) {
      try {
        const newListLanguage = await instance.get('/api/languages/')
        newListLanguage.data.sort((a, b) => a.id - b.id)
        await commit('updateListLanguage', newListLanguage.data)
      } catch (error) {
        console.log(error)
      }
    },
    async addLanguage(state, payload) {
      try {
        await instance.post('/api/languages/', payload)
      } catch (error) {
        try {
          this.$store.dispatch('store_account/login_query_refresh')
        } catch (error) {
          this.$store.dispatch('store_account/disconnect')
        }
      }
    },
  },
  getters: {},
}
