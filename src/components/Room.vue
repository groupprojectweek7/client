<template>
  <v-layout>

    <v-container grid-list-md text-xs-center>
      <v-layout style="background-color: #34495E" class="py-5 px-5" row wrap>
        <v-flex xs6>
          <v-card id="join-room-button" class="flex-card" height="200" @click="addPlayerToRoom('sJGQdlCtCSKqNjUrpINk')">
            <h2 class="px-0 display-3" style="font-weight: bold; color:#ddd"> Join Party</h2>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import db from '../../config/connectionDb'
import {
  log
} from 'util'

export default {
  props: ['playerName'],
  data () {
    return {
      players: [],
      showJoinModal: false,
      playerAmount: 0
    }
  },
  methods: {
    addPlayerToRoom (val) {
      if (this.playerName[0] === ' ' || this.playerName.length === 0) {
        // swal nama harus isi
        return ''
      }

      db.collection('rooms').doc(val).get()
        .then((doc) => {
          if (doc.data().user1.length === 0) {
            this.$store.commit('setUsername', {id: 1, name: this.playerName})
            return db.collection('rooms').doc(val).update({
              user1: this.playerName
            })
          } else if (doc.data().user2.length === 0) {
            this.$store.commit('setUsername', {id: 2, name: this.playerName})
            return db.collection('rooms').doc(val).update({
              user2: this.playerName
            })
          }
        })
        .then(() => {
          console.log('Document successfully updated!')
        }).catch(function (error) {
          console.error('Error removing document: ', error)
        })

      this.$store.state.selectedRoomData.id = val
      this.$store.commit('setCurrentpage', 'game')
    }
  },
  created () {
    db.collection('rooms').doc(this.$store.state.selectedRoomData.id)
      .onSnapshot((doc) => {
        let roomData = {
          id: doc.id,
          ...doc.data()
        }
        this.$store.commit('setSelectedRoomData', roomData)
      })
  }
}
</script>

<style scoped>
  .flex-card {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #41B883;
    color: white;
  }

  .flex-card:hover {
    background-color: #2a7553;
    cursor: pointer;
    color: white;
  }
</style>
