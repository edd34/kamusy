import { instance } from "../service/axios.js"

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
                const newListLanguage = await instance.get("/languages/");
                newListLanguage.data.map(item => item.complete_name = item.firstname + " " + item.lastname )
                await commit("updateListLanguage", newListLanguage.data)
            } catch (error) {
                console.log(error)
            }
        },
        async addLanguage(state, payload) {
            try {
                await instance.post("/languages/", payload);
            } catch (error) {
                console.log(error);
            }
        },
    },
    getters: {
    }
}