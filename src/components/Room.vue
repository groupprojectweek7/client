<template>
  <v-layout>

    <v-container grid-list-md text-xs-center>
      <v-layout style="background-color: #34495E" class="py-5 px-5" row wrap>
        <v-flex xs6>
          <v-card id="join-room-button" class="flex-card" height="200" @click="addPlayerToRoom('FbAhLuiZM9HmdLjhAvgu')">
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
    data() {
      return {
        players: [],
        roomData: {},
        showJoinModal: false,
        playerAmount: 0
      }
    },
    methods: {
      addPlayerToRoom(val) {
        if (this.playerName[0] == ' ' || this.playerName.length == 0) {
          // swal nama harus isi
          return ''
        }
        db.collection('rooms').doc(val)
          .onSnapshot((doc) => {
            this.roomData = {
              id: doc.id,
              ...doc.data(),
            }

            localStorage.setItem('roomId', this.roomData.id);

            if (this.roomData.user1.length == 0) {
              db.collection("rooms").doc(val).update({
                user1: this.playerName
              }).then(() => {
                console.log("Document successfully updated!");
              }).catch(function (error) {
                console.error("Error removing document: ", error);
              });
            } else if (this.roomData.user2.length == 0) {
              db.collection("rooms").doc(val).update({
                user2: this.playerName
              }).then(() => {
                console.log("Document successfully updated!");
              }).catch(function (error) {
                console.error("Error removing document: ", error);
              });
            }
            this.$emit('setRoomId', val);
          })

      }
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
