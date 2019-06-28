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
        value: 0,
      query: false,
      show: true,
      interval: 0,
      activeColor:"green",
      start: false,
    }
  },

  mounted () {
    this.queryAndIndeterminate()
  },

  beforeDestroy () {
    clearInterval(this.interval)
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
</script>