import { instance } from "../service/axios.js"

export default {
    namespaced: true,
    state: {
        listTranslations: [],
    },
    mutations: {
        updateListTranslations: (state, newListTranslation) => {
                state.listTranslations = newListTranslation
        },
    },
    actions: {
        async getListTranslations({ commit }) {
            try {
                const newListTranslation = await instance.get("/translations/");
                // newListTranslation.data.map(item => item.complete_name = item.firstname + " " + item.lastname )
                await commit("updateListTranslations", newListTranslation.data)
            } catch (error) {
                console.log(error)
            }
        },
        async findTranslation({ commit }, payload) {
            try {
                console.log(payload)
                const newListTranslation = await instance.get("/translations/");
                // newListTranslation.data.map(item => item.complete_name = item.firstname + " " + item.lastname )
                await commit("updateListTranslations", newListTranslation.data)
            } catch (error) {
                console.log(error)
            }
        },
        async addInstructor(state, payload) {
            try {
                await instance.post("/translations/", payload);
            } catch (error) {
                console.log(error);
            }
        },
    },
    getters: {
    }
}