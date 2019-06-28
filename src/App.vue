<template>
  <v-app>
    <v-content>
      <Homepage></Homepage>
      <Game></Game>
    </v-content>
  </v-app>
</template>

<script>
import Homepage from '@/components/Homepage.vue'
import Game from '@/components/Game.vue'
import db from '../config/connectionDb'

export default {
  name: 'App',
  components: {
    Homepage,
    Game
  },
  data () {
    return {
      //
    }
  }
}
</script>
