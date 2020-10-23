<template>
  <div class="viewport" ref="viewport">
    <div ref="display" class="display" >
    </div>
  </div>
</template>

<script>
import Guacamole from 'guacamole-common-js'
import GuacMouse from '../lib/GuacMouse'
import clipboard from '../lib/clipboard'
import GuacamoleStatus from 'src/lib/GuacamoleStatus'

Guacamole.Mouse = GuacMouse.mouse

let wsUrl = ''
let httpUrl = ''
const WsScheme = window.location.protocol === 'https:' ? 'wss' : 'ws'
if (process.env.NODE_ENV === 'production') {
  wsUrl = `${WsScheme}://${window.location.hostname}:${window.location.port}/websocket-tunnel`
  httpUrl = `${window.location.protocol}://${location.host}:${window.location.port}/tunnel`
} else {
  wsUrl = 'ws://127.0.0.1:4567/websocket-tunnel'
  httpUrl = `http://${location.host}/tunnel`
}

export default {
  props: {
    forceHttp: {
      type: Boolean,
      required: false,
      default: false
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    serverid: {
      type: Number,
      required: false
    },
    loginuser: {
      type: String,
      required: false
    },
    channel: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      height: window.innerHeight,
      connected: false,
      display: null,
      currentAdjustedHeight: null,
      client: null,
      keyboard: null,
      mouse: null,
      lastEvent: null,
      connectionState: GuacamoleStatus.IDLE,
      arguments: {},
      errorMessage: '',
      title: '',
      query: 'username=user&password=pass'
    }
  },
  watch: {
    connectionState (state) {
      if (state >= 5) {
        this.errorMessage = GuacamoleStatus[state].text
        this.title = GuacamoleStatus[state].name
      }
    }
  },
  name: 'GuacamoleMonitor',
  methods: {
    send (cmd) {
      if (!this.client) {
        return
      }
      for (const c of cmd.data) {
        this.client.sendKeyEvent(1, c.charCodeAt(0))
      }
    },
    copy (cmd) {
      if (!this.client) {
        return
      }
      clipboard.cache = {
        type: 'text/plain',
        data: cmd.data
      }
      clipboard.setRemoteClipboard(this.client)
    },
    handleMouseState (mouseState) {
      const scaledMouseState = Object.assign({}, mouseState, {
        x: mouseState.x / this.display.getScale(),
        y: mouseState.y / this.display.getScale()
      })
      this.client.sendMouseState(scaledMouseState)
    },
    resize () {
      const elm = this.$refs.viewport
      if (!elm || !elm.offsetWidth) {
        // resize is being called on the hidden window
        return
      }

      const pixelDensity = window.devicePixelRatio || 1
      const width = elm.clientWidth * pixelDensity
      const height = elm.clientHeight * pixelDensity
      if (this.display.getWidth() !== width || this.display.getHeight() !== height) {
        this.client.sendSize(width, height)
      }
      // setting timeout so display has time to get the correct size
      setTimeout(() => {
        const scale = Math.min(
          elm.clientWidth / Math.max(this.display.getWidth(), 1),
          elm.clientHeight / Math.max(this.display.getHeight(), 1)
        )
        this.display.scale(scale)
      }, 100)
    },
    connect (query) {
      let tunnel
      if (window.WebSocket && !this.forceHttp) {
        tunnel = new Guacamole.WebSocketTunnel(wsUrl)
      } else {
        tunnel = new Guacamole.HTTPTunnel(httpUrl, true)
      }

      if (this.client) {
        this.display.scale(0)
        this.uninstallKeyboard()
      }

      this.client = new Guacamole.Client(tunnel)
      clipboard.install(this.client)

      tunnel.onerror = status => {
        // eslint-disable-next-line no-console
        console.error(`Tunnel failed ${JSON.stringify(status)}`)
        this.connectionState = status.code
      }

      tunnel.onstatechange = state => {
        console.log('tunnel on state change', state)
        switch (state) {
          // Connection is being established
          case Guacamole.Tunnel.State.CONNECTING:
            this.connectionState = GuacamoleStatus.CONNECTING
            break

            // Connection is established / no longer unstable
          case Guacamole.Tunnel.State.OPEN:
            this.connectionState = GuacamoleStatus.CONNECTED
            break

            // Connection is established but misbehaving
          case Guacamole.Tunnel.State.UNSTABLE:
            // TODO
            break

            // Connection has closed
          case Guacamole.Tunnel.State.CLOSED:
            this.connectionState = GuacamoleStatus.DISCONNECTED
            break
        }
      }

      this.client.onstatechange = clientState => {
        console.log('client on state change', clientState)
        switch (clientState) {
          case 0:
            this.connectionState = GuacamoleStatus.IDLE
            break
          case 1:
            // connecting ignored for some reason?
            break
          case 2:
            this.connectionState = GuacamoleStatus.WAITING
            break
          case 3:
            this.connectionState = GuacamoleStatus.CONNECTED
            window.addEventListener('resize', this.resize)
            this.$refs.viewport.addEventListener('mouseenter', this.resize)

            clipboard.setRemoteClipboard(this.client)

            // eslint-disable-next-line no-fallthrough
          case 4:
          case 5:
            // disconnected, disconnecting
            break
        }
      }

      this.client.onerror = error => {
        console.log('client on error', error)
        this.client.disconnect()

        // eslint-disable-next-line no-console
        console.error(`Client error ${JSON.stringify(error)}`)
        this.connectionState = error.code
      }

      this.client.onsync = () => {
      }

      // Test for argument mutability whenever an argument value is received
      this.client.onargv = (stream, mimetype, name) => {
        if (mimetype !== 'text/plain') { return }

        const reader = new Guacamole.StringReader(stream)

        // Assemble received data into a single string
        let value = ''
        reader.ontext = text => {
          value += text
        }

        // Test mutability once stream is finished, storing the current value for the argument only if it is mutable
        reader.onend = () => {
          const stream = this.client.createArgumentValueStream('text/plain', name)
          stream.onack = status => {
            if (status.isError()) {
              // ignore reject
              return
            }
            this.arguments[name] = value
          }
        }
      }

      this.client.onclipboard = clipboard.onClipboard
      this.display = this.client.getDisplay()
      const displayElm = this.$refs.display
      displayElm.appendChild(this.display.getElement())
      displayElm.addEventListener('contextmenu', e => {
        e.stopPropagation()
        if (e.preventDefault) {
          e.preventDefault()
        }
        e.returnValue = false
      })
      this.client.connect(query)
      window.onunload = () => this.client.disconnect()

      this.mouse = new Guacamole.Mouse(displayElm)
      // Hide software cursor when mouse leaves display
      this.mouse.onmouseout = () => {
        if (!this.display) return
        this.display.showCursor(false)
      }

      // allows focusing on the display div so that keyboard doesn't always go to session
      displayElm.onclick = () => {
        displayElm.focus()
      }
      displayElm.onfocus = () => {
        displayElm.className = 'focus'
      }
      displayElm.onblur = () => {
        displayElm.className = ''
      }

      this.keyboard = new Guacamole.Keyboard(displayElm)
      this.installKeyboard()
      // this.mouse.onmousedown = this.mouse.onmouseup = this.mouse.onmousemove = this.handleMouseState
      setTimeout(() => {
        this.resize()
        displayElm.focus()
      }, 1000) // $nextTick wasn't enough
    },
    installKeyboard () {
      this.keyboard.onkeydown = keysym => {
        this.client.sendKeyEvent(1, keysym)
      }
      this.keyboard.onkeyup = keysym => {
        this.client.sendKeyEvent(0, keysym)
      }
    },
    uninstallKeyboard () {
      this.keyboard.onkeydown = this.keyboard.onkeyup = () => {}
    }
  },
  mounted () {
    if (this.query && !this.connected) {
      this.connected = true
      this.connect(`username=${this.username}&password=${this.password}&uuid=${this.channel}`)
      this.query = `username=${this.username}&password=${this.password}&uuid=${this.channel}`
    }
  },
  beforeDestroy () {
    if (this.client) {
      this.client.disconnect()
    }
  }
}
</script>

<style scoped>
  .display {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .viewport {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: black
  }
</style>
