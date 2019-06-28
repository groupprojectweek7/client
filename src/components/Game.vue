<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-layout align-center justify-center>
          <h1>Player1 :</h1>
        </v-layout>
      </v-flex>
      <v-flex xs12>
        <v-progress-linear
          color="error"
          height="20"
          :value="score1 / wordApi.length * 100"
        ></v-progress-linear>
      </v-flex>
      <v-flex xs12>
        <v-layout align-center justify-center>
          <h1>Player2 :</h1>
        </v-layout>
      </v-flex>
      <v-flex xs12>
        <v-progress-linear
          color="error"
          height="20"
          :value="score2 / wordApi.length * 100"
        ></v-progress-linear>
      </v-flex>
    </v-layout>
    <!-- Player One -->
    <v-layout row wrap>
      <v-flex xs6>
        <v-layout row wrap>
          <v-flex xs12>
            <v-layout align-center justify-center>
              <p>Score:</p>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-layout align-center justify-center>
              <h1>{{ score1 }}</h1>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-layout algin-center justify-center>
              <p>Type This Word</p>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-layout algin-center justify-center>
              <h1>{{ currentWord1 }}</h1>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-layout algin-center justify-center>
              <p>Your input :</p>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-layout algin-center justify-center>
              <h1 class="red--text">{{ inputType1 }}</h1>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-form>
              <v-flex xs10>
                <v-text-field
                  v-model="inputType1"
                  label="Regular"
                  clearable
                ></v-text-field>
              </v-flex>
            </v-form>
          </v-flex>
        </v-layout>
        <v-layout row>
          Player 1
        </v-layout>
      </v-flex>
      <!-- Player 2 -->
      <v-flex xs6>
        <v-layout row wrap>
          <v-flex xs12>
            <v-layout align-center justify-center>
              <p>Score:</p>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-layout align-center justify-center>
              <h1>{{ score2 }}</h1>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-layout algin-center justify-center>
              <p>Type This Word</p>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-layout algin-center justify-center>
              <h1>{{ currentWord2 }}</h1>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-layout algin-center justify-center>
              <p>Your input :</p>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-layout algin-center justify-center>
              <h1 class="red--text">{{ inputType2 }}</h1>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-form>
              <v-flex xs10>
                <v-text-field
                  v-model="inputType2"
                  label="Regular"
                  clearable
                ></v-text-field>
              </v-flex>
            </v-form>
          </v-flex>
        </v-layout>
        <v-layout row>
          Player 2
        </v-layout>
      </v-flex>
      <v-flex xs12>
        <v-btn color="red" large dark @click="startGame()">Start Game</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
import db from '../../config/connectionDb'
import { setInterval } from 'timers'

export default {
  data () {
    return {
      boxX: 0,
      boxY: 0,
      inputType1: '',
      inputType2: '',
      score1: 0,
      score2: 0,
      wordApi: [],
      wordPlayer1: [],
      wordPlayer2: [],
      currentWord1: '',
      currentWord2: '',
      showWinner: false,
      runTime: 100,
      roomData: [],
      roomId: '5xJVZvv9KvHfYuoamF4C'
    }
  },
  watch: {
    score1 () {
      if (this.score1 === this.wordApi.length || (this.score1 > this.score2 && this.runTime === 0)) {
        console.log('yang menang adalah player1')
        this.clearRoom()
        Swal.fire(
          'Player 1 Win!',
          'Back to homepage',
          'success'
        )
      }
    },

    score2 () {
      if (this.score2 === this.wordApi.length || (this.score2 > this.score1 && this.runTime === 0)) {
        console.log('yang menang adalah player1')
        this.clearRoom()
        Swal.fire(
          'Player 2 Win!',
          'Back to homepage',
          'success'
        )
      }
    },

    inputType1 () {
      if (this.inputType1 === this.wordApi[this.score1]) {
        this.wordPlayer1.push(this.wordApi[this.score1])
        let sendData = {
          finishedUser1: this.wordPlayer1
        }
        db.collection('rooms').doc(this.roomId).update(sendData)
          .then(() => {
            this.inputType1 = ''
            this.setCurrentWord(1)
          })
          .catch(function (error) {
            console.error('Error writing document: ', error)
          })
      }
    },
    inputType2 () {
      if (this.inputType2 === this.wordApi[this.score2]) {
        this.wordPlayer2.push(this.wordApi[this.score2])
        let sendData = {
          finishedUser2: this.wordPlayer2
        }
        db.collection('rooms').doc(this.roomId).update(sendData)
          .then(() => {
            this.inputType2 = ''
            this.setCurrentWord(2)
          })
          .catch(function (error) {
            console.error('Error writing document: ', error)
          })
      }
    }
  },
  methods: {
    calcPosition () {
      return {
        top: (Math.random(0, 230)) + 'px',
        left: (Math.random(0, 210)) + 'px'
      }
    },
    clearRoom () {
      let sendData = {
        dictionaryApi: [],
        finishedUser1: [],
        finishedUser2: [],
        statusStart: false
      }
      db.collection('rooms').doc(this.roomId).set(sendData)
        .then(() => {
          this.wordApi = []
          this.finishedUser1 = []
          this.finishedUser2 = []
          this.score1 = 0
          this.score2 = 0
          console.log('Success clear Room!')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    },
    setCurrentWord (val) {
      if (val === 1) {
        this.currentWord1 = this.wordApi[this.score1]
      } else if (val === 2) {
        this.currentWord2 = this.wordApi[this.score2]
      }
    },
    startGame () {
      axios({
        method: 'get',
        url: 'https://random-word-api.herokuapp.com//word?key=4KSHTCFV&number=3'
      })
        .then(({ data }) => {
          let sendData = {
            dictionaryApi: data,
            statusStart: true,
            finishedUser1: [],
            finishedUser2: []
          }
          return db.collection('rooms').doc(this.roomId).update(sendData)
        })
        .then(() => {
          this.score1 = 0
          this.score2 = 0
          this.setCurrentWord(1)
          this.setCurrentWord(2)
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    }
  },
  created () {
    db.collection('rooms').doc(this.roomId)
      .onSnapshot((doc) => {
        console.log('masuk created berapa kali')
        this.wordApi = doc.data().dictionaryApi
        this.wordPlayer1 = doc.data().finishedUser1
        this.wordPlayer2 = doc.data().finishedUser2
        this.score1 = this.wordPlayer1.length
        this.score2 = this.wordPlayer2.length
        this.setCurrentWord(1)
        this.setCurrentWord(2)
      })
  },
  mounted () {
    console.log('masuk berapa kali')
    setInterval(() => {
      this.calcPosition()
    }, 100)
  }
}
</script>

<style>
#box-words {
  width: 100%;
  height: 300px;
}
.box {
  position: fixed;
  width: 100px;
  height: 100px;
  background: #54E365;
}
</style>
