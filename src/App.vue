<template>
  <v-app>
    <v-content>
      <Homepage v-if="!roomId" @setRoomId="setRoomId"></Homepage>
      <Game v-if="roomId"></Game>
    </v-content>
  </v-app>

</template>

<script>
export default {
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
