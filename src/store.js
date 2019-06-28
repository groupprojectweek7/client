import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roomData: {}
  },
  mutations: {
    setRoomData (state, payload) {
      state.roomData = payload
    }
  },
  actions: {

  }
})
