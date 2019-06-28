<template>
  <v-layout>

    <v-container grid-list-md text-xs-center>
      <v-btn color="success" class="button-add-party" @click="addParty">Add Party</v-btn>
      <v-layout class="py-3 px-3 my-3 join-party-container" v-for="room in this.arrRoomData" :key="room.id" row wrap>
        <v-flex xs6>
          <v-card id="join-room-button" class="flex-card" height="100" @click="addPlayerToRoom(room.id)">
            <h2 class="px-0 display-3" style="font-weight: bold; color:#ddd">Join Party</h2>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
  import Swal from 'sweetalert2'
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
        arrRoomData: [],
        showJoinModal: false,
        playerAmount: 0
      }
    },
    methods: {
      addPlayerToRoom(val) {
        if (this.playerName[0] == ' ' || this.playerName.length == 0) {
          Swal.fire(
            'Name cannot be empty',
            'Continue',
            'error'
          )
          return ''
        }

        localStorage.setItem('roomId', this.roomData.id)
        this.$emit('setRoomId', val)

        if (this.roomData.user1.length == 0) {
          db.collection('rooms').doc(val).update({
            user1: this.playerName
          }).then(() => {
            console.log('Document successfully updated!')
          }).catch(function (error) {
            console.error('Error removing document: ', error)
          })
        } else if (this.roomData.user2.length == 0) {
          db.collection('rooms').doc(val).update({
            user2: this.playerName
          }).then(() => {
            console.log('Document successfully updated!')
          }).catch(function (error) {
            console.error('Error removing document: ', error)
          })
        }
      },
      addParty() {
        let obj = {
          dictionaryApi: [],
          statusStart: true,
          finishedUser1: [],
          finishedUser2: [],
          user1: '',
          user2: ''
        };

        db.collection("rooms").add(obj)
          .then(function (docRef) {
            Swal.fire(
              'Party added',
              'Let us plaayyy',
              'success'
            )
            console.log("Document written with ID: ", docRef.id);
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
      }
    },
    created() {
      db.collection('rooms')
        .onSnapshot((querySnapshot) => {
          this.arrRoomData = [];
          querySnapshot.docs.forEach((element) => {
            if (element.data().user1.length == 0 || element.data().user2.length == 0) {
              this.arrRoomData.push({
                id: element.id,
                ...element.data()
              });
            }
          });
          // console.log(this.arrRoomData);
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

  .join-party-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #34495E;
  }

  .button-add-party {
    height: 50px;
    width: 200px;
    font-size: 2rem;
    font-weight: bold;
  }
</style>
