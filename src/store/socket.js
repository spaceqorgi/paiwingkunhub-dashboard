import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isConnected: false,
    socketMessage: ''
  },

  mutations: {
    SOCKET_CONNECT(state) {
      state.isConnected = true
    },

    SOCKET_DISCONNECT(state) {
      state.isConnected = false
    },

    SOCKET_TEST(state, message) {
      state.socketMessage = message
    }
  }
})
