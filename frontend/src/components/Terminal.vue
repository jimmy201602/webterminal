<template>
  <div>
    <q-tabs
      v-show="showtab"
      v-model="selected"
      align="left"
      active-color="primary"
      stretch
      no-caps
      dense
    >
      <q-tab key="ssh" v-model="selected"
             name="ssh" @click="selected = 'ssh'"
      >
        <div>
          SSH
        </div>
      </q-tab>
      <q-tab key="sftp" v-model="selected"
             name="sftp" @click="selected = 'sftp'"
      >
        <div>
          SFTP
        </div>
      </q-tab>
    </q-tabs>
    <q-tab-panels v-model="selected" animated class="fit" keep-alive>
      <q-tab-panel name="ssh" key="ssh" keep-alive>
        <div :id="id"></div>
        <q-page-sticky position="right" :offset="fabPos" v-show="showtoolbar">
          <q-fab
            v-model="toolbar"
            glossy
            icon="add"
            direction="up"
            color="primary"
            :disable="draggingFab"
            v-touch-pan.prevent.mouse="moveFab"
          >
            <q-fab-action square color="primary" :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'" @click="$q.fullscreen.toggle()" :disable="draggingFab" />
            <q-fab-action square @click="onClick('folder')" color="primary" icon="folder" :disable="draggingFab" />
<!--            <q-fab-action square @click="onClick('refresh')" color="primary" icon="refresh" :disable="draggingFab" />-->
<!--            <q-fab-action square @click="onClick('settings')" color="primary" icon="settings" :disable="draggingFab" />-->
          </q-fab>
        </q-page-sticky>
      </q-tab-panel>
      <q-tab-panel name="sftp" key="sftp" keep-alive>
        <keep-alive>
          <iframe
            :src="sftpaddress"
            frameborder="0"
            allowfullscreen
            style="width: 100%;"
            v-bind:height="height"/>
        </keep-alive>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
<script>
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'
// import * as fullscreen from 'xterm-addon-fullscreen'
// import "xterm/lib/addons/fullscreen/fullscreen.css";
/* And for typescript, see: https://webpack.js.org/guides/typescript/ */

export default {
  props: {
    id: {
      type: String,
      required: true
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
    showtoolbar: {
      type: Boolean,
      required: false,
      default: true
    },
    ip: {
      type: String,
      required: false,
      default: null
    },
    commandid: {
      type: Number,
      required: false,
      default: null
    }
  },
  name: 'Terminal',
  data () {
    return {
      fabPos: [0, 18],
      draggingFab: false,
      fiton: null,
      term: null,
      ws: null,
      toolbar: true,
      selected: 'ssh',
      showtab: false,
      height: window.innerHeight,
      sftpaddress: null
    }
  },
  methods: {
    onClick (event) {
      console.log('Clicked on a fab action', event)
      if (event === 'folder') {
        this.showtab = !this.showtab
        if (this.selected === 'sftp') {
          this.selected = 'sftp'
        } else {
          this.selected = 'ssh'
        }
      }
    },
    moveFab (ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true

      this.fabPos = [
        this.fabPos[0] - ev.delta.x,
        this.fabPos[1] - ev.delta.y
      ]
    },
    onWindowResize () {
      console.log('resize')
      // bug need to be fixed
      try {
        if (!this.showtoolbar) {
          document.getElementById(this.id).style.height = '180px'
        } else {
          document.getElementById(this.id).style.height = window.innerHeight - 94 + 'px'
        }
        this.fiton.fit()
        if (this.ws) {
          console.log('send resize')
          this.term.scrollToBottom()
          this.ws.send(JSON.stringify(['set_size', this.term.cols, this.term.rows, this.term.cols, this.term.rows]))
        }
      } catch (e) {
        // console.log(e)
      }
    }
  },
  created () {
  },
  mounted () {
    if (process.env.NODE_ENV === 'production') {
      this.sftpaddress = `/elfinder/?url=/elfinder/yawd-connector/sftp/${this.serverid}/${this.loginuser}/?webterminal-token-access=${localStorage.getItem('webterminal-token-access')}`
    } else {
      this.sftpaddress = `http://127.0.0.1:8000/elfinder/?url=/elfinder/yawd-connector/sftp/${this.serverid}/${this.loginuser}/?webterminal-token-access=${localStorage.getItem('webterminal-token-access')}`
    }
    // let self = this
    const term = new Terminal({
      cursorBlink: true,
      bellStyle: 'sound',
      theme: 'black',
      fullscreenWin: true
    })
    this.term = term
    const terminalContainer = document.getElementById(this.id)
    if (!this.showtoolbar) {
      terminalContainer.style.height = '180px'
    } else {
      terminalContainer.style.height = window.innerHeight - 104 + 'px'
    }
    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)
    term.open(terminalContainer)
    this.fiton = fitAddon
    this.fiton.fit() // first resizing
    term.focus()
    // term.on('resize', this.onWindowResize)
    window.addEventListener('resize', this.onWindowResize)
    const WsScheme = window.location.protocol === 'https:' ? 'wss' : 'ws'
    let WsPath = ''
    let websocketpath = 'ws'
    if (this.ip) {
      websocketpath = 'execute'
    }
    if (process.env.NODE_ENV === 'production') {
      WsPath = `${WsScheme}://${window.location.hostname}:${window.location.port}/${websocketpath}?username=${this.username}&password=${this.password}&width=${term.cols}&height=${term.rows}&ip=${this.ip}&commandid=${this.commandid}`
    } else {
      WsPath = `${WsScheme}://${window.location.hostname}:8000/${websocketpath}?username=${this.username}&password=${this.password}&width=${term.cols}&height=${term.rows}&ip=${this.ip}&commandid=${this.commandid}`
    }
    const ws = new WebSocket(WsPath)
    const attachAddon = new AttachAddon(ws)
    const that = this
    ws.onopen = function (event) {
      // term.onTitleChange(function (string) {
      //   document.title = string
      // })
      term.loadAddon(attachAddon)
      term._initialized = true
      that.ws = ws
    }
    ws.onclose = function () {
      that.ws = null
    }
  },
  beforeDestroy () {
    console.log('destory')
    window.removeEventListener('resize', this.onWindowResize)
    // this.off('resize', this.onWindowResize)
  },
  components: {}
}
</script>
