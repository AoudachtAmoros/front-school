import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    admin : null,
    baseUrl :'http://localhost:3000'
  },
  mutations: {
    setAdmin (state, payload) {
      state.admin = payload
    }
  },
  actions: {
    setAdmin ({commit}, payload) {
      commit('setAdmin',payload)
    }
  }
})