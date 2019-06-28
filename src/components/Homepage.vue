<template>
  <div>
    <HeaderPage :playerName="playerName"></HeaderPage>
    <v-container>
    <v-text-field v-model="playerName" id="text-input-style" label="Name" placeholder="Insert Name Here" required box></v-text-field></v-container>
    <Room :playerName="playerName"></Room>
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
  }
}
</script>

<style>
  .flex-card{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .flex-card:hover {
    background-color: #41B883;
    color: white;
  }

  #join-room-button {
    background-color: #B71C1C;
  }

  #join-room-button:hover {
    background-color: #871515;
    cursor: pointer;
  }
</style>
