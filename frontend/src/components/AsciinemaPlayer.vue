<template>
  <figure :id="id"></figure>
</template>

<script>
export default {
  name: 'AsciinemaPlayer',
  props: ['id'],
  data () {
    return {
      source: 'https://asciinema.org/js/asciinema-player-e90dd959bf7df7e1608c08ac419fca67.js',
      ascid: `asciinema-${this.id}`
    }
  },
  mounted () {
    // Can't use script tags directly apparently
    const asciiscript = document.createElement('script')
    asciiscript.setAttribute('src', this.source)
    asciiscript.setAttribute('id', this.ascid)
    document.getElementById(this.id).appendChild(asciiscript)
    const player = document.createElement('asciinema-player')
    player.setAttribute('src', 'https://asciinema.org/a/28307.cast')
    document.getElementById(this.id).appendChild(player)
  },
  beforeDestroy () {
    console.log(11111111111)
    document.getElementById(this.id).remove()
  }
}
</script>

<style scoped>
  /*@import "~asciinema-player/resources/public/css/asciinema-player.css";*/
</style>
