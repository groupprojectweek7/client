<template>
  <v-layout>

    <v-container grid-list-md text-xs-center>
      <v-layout style="background-color: #34495E" class="py-5 px-5" row wrap>
        <v-flex xs6>
          <v-card id="join-room-button" class="flex-card" height="200" @click="addPlayerToRoom">
            <h2 class="px-0 display-3" style="font-weight: bold; color:#ddd"> Join Room</h2>
          </v-card>
        </v-flex>
        <v-flex v-for="player in players" :key="player" xs3>
          <v-card class="flex-card" height="200" @click="undoPlay(player)">
            <h3 class="px-0 display-2" style="font-weight: bold">{{player}}</h3>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import JoinModal from './JoinModal'
import db from '../../config/connectionDb'
import {
  log
} from 'util'

export default {
  props: ['playerName'],
  components: {
    JoinModal
  },
  data () {
    return {
      players: [],
      roomData: {},
      showJoinModal: false,
      playerAmount: 0
    }
  },
  methods: {
    addPlayerToRoom () {
      if (this.playerName[0] == ' ' || this.playerName.length == 0) {
        // swal nama harus isi
        return ''
      }
      if (this.playerAmount < 1 && this.players.length < 2) {
        this.players.push(this.playerName)
        this.playerAmount++
        localStorage.setItem('name', this.playerName)
        if (this.roomData.user1.length == 0) {
          db.collection('rooms').doc('FbAhLuiZM9HmdLjhAvgu').update({
            user1: this.playerName
          }).then(() => {
            console.log('Document successfully updated!')
          }).catch(function (error) {
            this.dialog = false
            console.error('Error removing document: ', error)
          })
        } else if (this.roomData.user2.length == 0) {
          db.collection('rooms').doc('FbAhLuiZM9HmdLjhAvgu').update({
            user2: this.playerName
          }).then(() => {
            console.log('Document successfully updated!')
          }).catch(function (error) {
            this.dialog = false
            console.error('Error removing document: ', error)
          })
        } else {
          // swal room cannot be entered
        }
      }
    },
    undoPlay (name) {
      if (this.players[0] == name && localStorage.getItem('name') == name) {
        this.players.unshift()
        this.playerAmount--
        localStorage.clear()
        db.collection('rooms').doc('FbAhLuiZM9HmdLjhAvgu').update({
          user1: ''
        }).then(() => {
          console.log('Document successfully updated!')
        }).catch(function (error) {
          this.dialog = false
          console.error('Error removing document: ', error)
        })
      } else if (this.players[1] == name && localStorage.getItem('name') == name) {
        this.players.pop()
        this.playerAmount--
        localStorage.clear()
        db.collection('rooms').doc('FbAhLuiZM9HmdLjhAvgu').update({
          user2: ''
        }).then(() => {
          console.log('Document successfully updated!')
        }).catch(function (error) {
          this.dialog = false
          console.error('Error removing document: ', error)
        })
      }
    }
  },
  created () {
    db.collection('rooms').doc('FbAhLuiZM9HmdLjhAvgu')
      .onSnapshot((doc) => {
        this.players = []
        this.roomData = {
          ...doc.data()
        }
        let roomValue = Object.values(this.roomData)
        for (let i = 0; i < roomValue.length; i++) {
          if (roomValue[i].length != 0) {
            this.players.push(roomValue[i])
          }
        }
      })
  }
}
</script>

<style>
</style>
