<template>
  <v-app>
    <v-content>
      <Homepage v-if="!roomId" @setRoomId="setRoomId"></Homepage>
      <Game v-if="roomId" @setRoomId="setRoomId" :roomId="roomId"></Game>
    </v-content>
  </v-app>

</template>

<script>
import Homepage from '@/components/Homepage.vue'
import Game from '@/components/Game.vue'

export default {
  components: {
    Homepage,
    Game
  },
  data () {
    return {
      roomId: null
    }
  },
  methods: {
    setRoomId (id) {
      this.roomId = id
    }
  },
  created () {
    this.roomId = localStorage.getItem('roomId')
  }
}
</script>
