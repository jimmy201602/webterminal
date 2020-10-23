<template>
  <div>
    <div :id="id" style="background-color: black"></div>
  </div>
</template>
<script>
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  name: 'MonitorTerminal',
  data () {
    return {
      term: null,
      ws: null
    }
  },
  methods: { },
  created () {
  },
  mounted () {
    const term = new Terminal({
      cursorBlink: false,
      bellStyle: 'sound',
      theme: 'black',
      fullscreenWin: true
    })
    this.term = term
    const terminalContainer = document.getElementById(this.id)
    terminalContainer.style.height = window.innerHeight + 'px'
    term.open(terminalContainer)
    term.focus()
    const WsScheme = window.location.protocol === 'https:' ? 'wss' : 'ws'
    let WsPath = ''
    if (process.env.NODE_ENV === 'production') {
      WsPath = `${WsScheme}://${window.location.hostname}:${window.location.port}/monitor?channel=${this.id}`
    } else {
      WsPath = `${WsScheme}://${window.location.hostname}:8000/monitor?channel=${this.id}`
    }
    const ws = new WebSocket(WsPath)
    const that = this
    ws.onopen = function (event) {
      term._initialized = true
      that.ws = ws
    }
    ws.onmessage = function (message) {
      var data = JSON.parse(message.data)
      term.resize(data[1], data[2])
      term.write(data[0])
    }
    ws.onclose = function () {
      that.ws = null
    }
  },
  beforeDestroy () {
    console.log('destory')
  },
  components: {}
}
</script>
