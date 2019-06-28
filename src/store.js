import Vue from 'vue'
import Vuex from 'vuex'
import db from '../config/connectionDb'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedRoomData: {
      id: '',
      dictionaryApi: [],
      statusStart: true,
      finishedUser1: [],
      finishedUser2: [],
      user1: '',
      user2: ''
    },
    currentPage: 'homepage'
  },
  mutations: {
    setSelectedRoomData (state, payload) {
      console.log('masuk ek selectedroom data', payload)
      state.selectedRoomData = payload
    },
    setCurrentpage (state, payload) {
      state.currentPage = payload
    },
    setPlayerName (state, payload) {
      console.log('masuk set player names')
      if (payload.id === 1) {
        state.user1 = payload.name
      } else if (payload.id === 2) {
        state.user2 = payload.name
      }
    }
  },
  actions: {
    getDataRoom (state) {
      db.collection('rooms').doc(state.selectedRoomData.id)
        .onSnapshot((doc) => {
          state.selectedRoomData = {
            id: doc.id,
            ...doc.data()
          }
        })
    }
  }
})
