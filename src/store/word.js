import { instance } from "../service/axios.js"

export default {
    namespaced: true,
    state: {
        listWords: [],
    },
    mutations: {
        updateListWord: (state, newListWord) => {
                state.listWords = newListWord
        },
    },
    actions: {
        async getListWords({ commit }) {
            try {
                const newListWord = await instance.get("/api/words/");
                await commit("updateListWord", newListWord.data)
            } catch (error) {
                console.log(error)
            }
        },
        async addWord(state, payload) {
            try {
                await instance.post("/api/words/", payload);
            } catch (error) {
                console.log(error);
            }
        },
    },
    getters: {
    }
}