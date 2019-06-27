<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs6>
        <v-layout row>
          <v-container>
            Score: {{ score1 }}
          </v-container>
        </v-layout>
        <v-layout row>
          <v-container>
            kata API : {{ currentWord1 }}
          </v-container>
        </v-layout>
        <v-layout row>
          <v-container>
            Your input : {{ inputType1 }}
          </v-container>
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
        <v-layout row>
          <v-container>
            Score: {{ score2 }}
          </v-container>
        </v-layout>
        <v-layout row>
          <v-container>
            kata API : {{ currentWord2 }}
          </v-container>
        </v-layout>
        <v-layout row>
          <v-container>
            Your input : {{ inputType2 }}
          </v-container>
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
        <v-btn color="red" large dark @click="startGame()">Start Game</v-btn>
      <v-flex xs12>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      inputType1: '',
      inputType2: '',
      wordNumber1: 0,
      wordNumber2: 0,
      score1: 0,
      score2: 0,
      wordApi: [
        'Joko',
        'Budi',
        'Amir',
        'Anto',
        'Made',
        'Robby',
        'Mikel'
      ],
      wordPlayer1: [],
      wordPlayer2: [],
      currentWord1: '',
      currentWord2: '',
      showWinner: false,
      runTime: 100
    }
  },
  watch: {
    score1 () {
      if (this.score1 === this.wordApi.length || (this.score1 > this.score2 && this.runTime === 0)) {
        console.log('yang menang adalah player1')
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
        Swal.fire(
          'Player 2 Win!',
          'Back to homepage',
          'success'
        )
      }
    },

    inputType1 () {
      if (this.inputType1 === this.wordApi[this.wordNumber1]) {
        this.score1++
        this.wordNumber1++
        this.inputType1 = ''
        this.setCurrentWord(1)
      }
    },
    inputType2 () {
      if (this.inputType2 === this.wordApi[this.wordNumber2]) {
        this.score2++
        this.wordNumber2++
        this.inputType2 = ''
        this.setCurrentWord(2)
      }
    }
  },
  methods: {
    setCurrentWord (val) {
      if (val === 1) {
        this.currentWord1 = this.wordApi[this.wordNumber1]
      } else if (val === 2) {
        this.currentWord2 = this.wordApi[this.wordNumber2]
      }
    },
    startGame () {
      this.wordNumber1 = 0
      this.score1 = 0
      this.wordNumber2 = 0
      this.score2 = 0
      this.setCurrentWord(1)
      this.setCurrentWord(2)
    }
  }
}
</script>

<style>

</style>
