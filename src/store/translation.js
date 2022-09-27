import { instance } from '../service/axios.js'

export default {
  namespaced: true,
  state: {
    listTranslations: [],
    word_source: null,
  },
  mutations: {
    updateListTranslations: (state, newListTranslation) => {
      state.listTranslations = newListTranslation
    },
    SET_WORD_SOURCE: (state, word) => {
      state.word_source = word;
    }
  },
  actions: {
    async getListTranslations({ commit }) {
      try {
        const newListTranslation = await instance.get('/translations/')
        // newListTranslation.data.map(item => item.complete_name = item.firstname + " " + item.lastname )
        await commit('updateListTranslations', newListTranslation.data)
      } catch (error) {
        console.log(error)
      }
    },
    async findTranslation({ commit }, payload) {
      try {
        const newListTranslation = await instance.get('/translations/')
        // newListTranslation.data.map(item => item.complete_name = item.firstname + " " + item.lastname )
        await commit('updateListTranslations', newListTranslation.data)
      } catch (error) {
        console.log(error)
      }
    },
    async addInstructor(state, payload) {
      try {
        await instance.post('/translations/', payload)
      } catch (error) {
        console.log(error)
      }
    },
    async setWordSource({ commit }, word) {
      commit("SET_WORD_SOURCE", word);
    },
  },
  getters: {
    word_source: (state) => state.word_source,
  },
}
