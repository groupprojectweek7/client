<template>
  <v-container>
    <v-carousel>
      <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
    </v-carousel>
    <h2 style="text-align: center;   font-weight: bold" class="my-3 display-3">Welcome to Typing Battle</h2>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      items: [{
        src: 'https://radikalportal.no/wp-content/uploads/2018/03/Keyboard-warrior.jpg'
      },
      {
        src: 'https://www.techadvisor.co.uk/cmsdata/features/3651757/how_to_type_faster_thumb800.jpg'
      },
      {
        src: 'https://previews.123rf.com/images/maxpro/maxpro0904/maxpro090400002/4595510-fast-typing-on-laptop-keyboard.jpg'
      },
      {
        src: 'https://i.ytimg.com/vi/QnFV5Lt4lq8/maxresdefault.jpg'
      }
      ]
    }
  }
}
</script>

<style>
  #text-input-style {
    font-size: 1.5rem;
  }
</style>
