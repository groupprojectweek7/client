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
