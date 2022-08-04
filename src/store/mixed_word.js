import { instance } from '../service/axios.js'

export default {
    namespaced: true,
    state: {
        listWord: [],
    },
    mutations: {
        updateListWord: (state, newListWord) => {
            state.listWord = newListWord
        },
    },
    actions: {
        async getlistWord({ commit }) {
            try {
                const newListWord = await instance.get('/api/mixed_word/')
                // newListWord.data.map(item => item.complete_name = item.firstname + " " + item.lastname )
                await commit('updatelistWord', newListWord.data)
            } catch (error) {
                console.log(error)
            }
        },
    },
    getters: {},
}
