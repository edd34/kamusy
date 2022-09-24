import { instance } from '../service/axios.js'
import { decode_jwt } from '../service/jwt.js'
import { fromUnixTime } from 'date-fns'
import router from '../router'

export default {
  namespaced: true,
  state: {
    token: {
      access: null,
      refresh: null,
    },
    is_connected: false,
  },
  mutations: {
    setToken: (state, token) => {
      state.token.access = token.access
      state.token.refresh = token.refresh
      localStorage.token_access = token.access
      localStorage.token_refresh = token.refresh
      state.is_connected = true
    },
    loadToken: (state) => {
      if (localStorage.token_access && localStorage.token_refresh) {
        state.token.access = localStorage.token_access
        state.token.refresh = localStorage.token_refresh
        state.is_connected = true
      } else {
        state.token.access = null
        state.token.refresh = null
        state.is_connected = false
      }
    },
    resetToken: (state) => {
      state.token.access = null
      state.token.refresh = null
      localStorage.removeItem('token_access')
      localStorage.removeItem('token_refresh')
      state.is_connected = false
    },
    check: (state, data) => {
      console.log(data);
    }
  },
  actions: {
    async login_query_token({ commit }, payload) {
      try {
        const token = await instance.post('/api/token/', {
          email: payload.email,
          password: payload.password,
        })
        await commit('setToken', token.data)
        router.replace('/');
        return true
      } catch (error) {
        await commit('resetToken')
      }
      return false
    },
    async login_query_refresh({ commit }, payload) {
      try {
        const token = await instance.post('/api/token/refresh/', {
          refresh: state.token.refresh,
        })
        await commit('setToken', token.data)
      } catch (error) {
        await commit('resetToken')
      }
    },
    async disconnect({ commit }) {
      await commit('resetToken')
    },
    async load_token({ commit }) {
      await commit('loadToken')
    },
    async create_token({ commit }, infoUser) {
      try { 
        const token = await instance.post('/api/sign-ign/', infoUser)
        return true
      } catch (error) {
        //
      }
      return false
    },
  },
  getters: {
    exp: (state) => {
      const result = decode_jwt(state.token.access)
      return result.exp
    },
    exp_str: (state) => {
      const result = decode_jwt(state.token.access)
      const exp_date = fromUnixTime(result.exp)
      return exp_date.toString()
    },
    refresh_exp: (state) => {
      const result = decode_jwt(state.token.refresh)
      return result.exp
    },
    refresh_exp_str: (state) => {
      const result = decode_jwt(state.token.refresh)
      const exp_date = fromUnixTime(result.exp)
      return exp_date
    },
    is_connected: (state) => state.is_connected,
    access_token: (state) => state.token.access,
    refresh_token: (state) => state.token.refresh,
  },
}
