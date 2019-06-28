<template>
  <div>
    <HeaderPage :playerName="playerName"></HeaderPage>
    <v-container>
    <v-text-field v-model="playerName" id="text-input-style" label="Name" placeholder="Insert Name Here" required box></v-text-field></v-container>
    <Room :playerName="playerName" @setRoomId="setRoomId"></Room>
  </div>

</template>

<script>
import HeaderPage from './HeaderPage'
import Room from './Room'

export default {
  components: {
    HeaderPage,
    Room
  },
  data () {
    return {
      playerName: ''
    }
  },
  methods: {
    setRoomId(val) {
      this.$emit('setRoomId', val);
    }
  }
}
</script>

<style>

  #join-room-button {
    background-color: #B71C1C;
  }

  #join-room-button:hover {
    background-color: #871515;
    cursor: pointer;
  }
</style>
