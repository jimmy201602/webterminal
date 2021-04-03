<template>
  <q-layout view="lhh LpR lff" container class="shadow-2 rounded-borders">
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
  </q-layout>
</template>
<script>
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'
// import * as fullscreen from 'xterm-addon-fullscreen'
// import "xterm/lib/addons/fullscreen/fullscreen.css";
/* And for typescript, see: https://webpack.js.org/guides/typescript/ */
import { Zmodem, AddonZmodem } from '../lib/zmodem'

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
      sftpaddress: null,
      attachAddon: null,
      zsession: null
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
    saveToDisk (xfer, buffer) {
      return Zmodem.Browser
        .save_to_disk(buffer, xfer.get_details().name)
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
    },
    onOfferReceive  (xfer) {
      xfer.skip()
      this.$q.notify({
        type: 'negative',
        textColor: 'grey-10',
        multiLine: true,
        message: this.$t('Due to the low performance, please use web sftp function instead!'),
        timeout: 5000,
        position: 'top'
      })
      this.$q.notify({
        type: 'negative',
        textColor: 'grey-10',
        multiLine: true,
        message: this.$t('SSH serssion has been aborted, Please recreate a new fressh session!'),
        timeout: 5000,
        position: 'top'
      })
    },
    onZmodemEnd () {
      this.attachAddon = new AttachAddon(this.ws)
      this.term.loadAddon(this.attachAddon)
      this.term.focus()
      this.term.write('\r\n')
    },
    onZmodemEndSend () {
      this.zsession && this.zsession.close && this.zsession.close()
      this.onZmodemEnd()
    },
    onZmodemCatch (e) {
      console.log(e)
      this.onZmodemEnd()
    },
    onReceiveZmodemSession () {
      //  * zmodem transfer
      //  * then run rz to send from your browser or
      //  * sz <file> to send from the remote peer.
      this.zsession.on('offer', this.onOfferReceive)
      this.zsession.start()
      return new Promise((resolve) => {
        this.zsession.on('session_end', resolve)
      }).then(this.onZmodemEnd).catch(this.onZmodemCatch)
    },
    onzmodemRetract () {
      console.log('zmodemRetract')
    },
    onZmodemDetect (detection) {
      this.attachAddon.dispose()
      this.term.blur()
      const zsession = detection.confirm()
      this.zsession = zsession
      if (zsession.type === 'receive') {
        this.onReceiveZmodemSession()
      } else {
        console.log('upload')
        // this.onSendZmodemSession()
        this.onZmodemEnd()
        this.onZmodemEndSend()
        this.$q.notify({
          type: 'negative',
          textColor: 'grey-10',
          multiLine: true,
          message: this.$t('Due to the low performance, please use web sftp function instead!'),
          timeout: 5000,
          position: 'top'
        })
        this.$q.notify({
          type: 'negative',
          textColor: 'grey-10',
          multiLine: true,
          message: this.$t('SSH serssion has been aborted, Please recreate a new fressh session!'),
          timeout: 5000,
          position: 'top'
        })
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
      terminalContainer.style.height = window.innerHeight - 136 + 'px'
    }
    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)
    term.open(terminalContainer)
    this.fiton = fitAddon
    this.fiton.fit() // first resizing
    term.focus()
    const zmodem = new AddonZmodem()
    term.loadAddon(zmodem)
    // console.log(zmodem)
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
    term.zmodemAttach(ws, {
      noTerminalWriteOutsideSession: true
    }, this)
    this.attachAddon = new AttachAddon(ws, undefined, 'utf-8')
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
