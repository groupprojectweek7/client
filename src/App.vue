<template>
  <v-app>
    <v-content>
      <Homepage v-if="$store.state.currentPage === 'homepage'"></Homepage>
      <Game v-if="$store.state.currentPage === 'game'"></Game>
    </v-content>
  </v-app>

</template>

<script>
import Homepage from '@/components/Homepage.vue'
import Game from '@/components/Game.vue'
import db from '../config/connectionDb'

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
  watch: {
    '$store.state.selectedRoomData' () {
      this.roomId = this.$store.state.selectedRoomData.id
    }
  },
  created () {
    // this.roomId = localStorage.getItem('roomId')
    db.collection('rooms').doc('sJGQdlCtCSKqNjUrpINk')
      .onSnapshot((doc) => {
        console.log('ada perubahan', doc.data())
        this.$store.state.selectedRoomData = {
          id: doc.id,
          ...doc.data()
        }
      })
  }
}
</script>
