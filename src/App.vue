<template>

  <v-progress-linear
  <v-btn color="success" @click="start = true">Start</v-btn>
      v-bind:style="style"
      :color="activeColor"
      :height=30
      v-model="value"
      :active="show"
      :indeterminate="query"
      :query="true"
    ></v-progress-linear>
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

  methods: {
    queryAndIndeterminate() {
      this.query = true
      this.show = true
      this.value = 100
      this.activeColor = "green"
      this.start = true

      setTimeout(() => {
        this.query = false

        this.interval = setInterval(() => {
          if (this.value === 70) {
            this.activeColor = "lime"
          }
          if (this.value === 40) {
            this.activeColor = "orange"
          }
          if (this.value === 15) {
            this.activeColor = "red"
          }
          if (this.value === 0) {
            clearInterval(this.interval)
            this.show = false
            this.start = false
            return setTimeout(this.queryAndIndeterminate, 1000)
          }
          if(this.start === true){
            this.value -= 0.25
          }
        }, 50)
      }, 2500)
      }
    }
  }
</script>