<template>
  <div class="q-pa-md">
    <q-table
      title="Log"
      :data="data"
      :columns="columns"
      :filter="filter"
      color="primary"
      row-key="name"
      :loading="loading"
    >
      <template v-slot:top="props">
        <q-space />
        <q-input
          borderless
          dense
          debounce="300"
          :placeholder="$t('Search')"
          v-model="filter"
          filled
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
          <q-th align="center">action</q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
          <q-td auto-width>
            <q-btn
              dense
              round
              flat
              color="grey"
              icon="fa fa-play-circle"
              @click="playLog(props)"
              :title="$t('log.play_log')"
              v-show="props.row.is_finished && props.row.tag === 'ssh'"
            ></q-btn>
            <q-btn
              dense
              round
              flat
              color="grey"
              icon="fa fa-play-circle"
              @click="playGuacamoleLog(props)"
              :title="$t('log.play_log')"
              v-show="props.row.is_finished && props.row.tag !== 'ssh' && !props.row.commercial_version"
            ></q-btn>
            <q-btn
              dense
              round
              flat
              color="grey"
              icon="fa fa-play-circle"
              @click="playRdpLog(props)"
              :title="$t('log.play_log')"
              v-show="props.row.is_finished && props.row.commercial_version"
            ></q-btn>
            <q-btn
              dense
              round
              flat
              color="grey"
              icon="fa fa-eye"
              @click="monitorSession(props)"
              v-show="!props.row.is_finished && !props.row.commercial_version"
              :title="$t('log.monitor')"
            ></q-btn>
            <q-btn
              dense
              round
              flat
              color="grey"
              icon="fa fa-eye"
              @click="monitorRdpSession(props)"
              v-show="!props.row.is_finished && props.row.commercial_version"
              :title="$t('log.monitor')"
            ></q-btn>
            <q-btn
              dense
              round
              flat
              color="grey"
              icon="fa fa-stop-circle"
              @click="sessionKill(props)"
              v-show="!props.row.is_finished && !props.row.commercial_version"
              :title="$t('log.stop')"
            ></q-btn>
            <q-btn
              dense
              round
              flat
              color="grey"
              icon="fa fa-terminal"
              @click="getCommands(props)"
              :title="$t('log.commands')"
              v-show="props.row.is_finished && props.row.tag === 'ssh'"
            ></q-btn>
          </q-td>
        </q-tr>
      </template>

      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>
    <q-dialog
      v-model="logplayermodal"
      full-width
      full-height
      :maximized="true"
      draggable="true"
    >
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            {{ $t("username") }}: {{ log_obj.user.username }}
            {{ $t("server address") }}: {{ log_obj.server.ip }}
            {{ $t("start date") }}: {{ log_obj.start_time }}
            {{ $t("end date") }}: {{ log_obj.end_time }}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section style="background-color: black">
          <div style="margin:0px;padding:0px;overflow:hidden;">
            <iframe
              v-if="show_ssh_player"
              :src="player_address"
              frameborder="0"
              allowfullscreen
              style="overflow:hidden;height:92vh;width:100%;"
            ></iframe>
            <div
              v-for="(item, index) in commands_list"
              :key="index"
              v-show="show_ssh_commands"
            >
              {{ item.datetime }}: {{ item.command }}
            </div>
            <terminal-monitor :id="sshmonitorchannel" v-if="show_ssh_monitor_player"></terminal-monitor>
            <guacamole-monitor :username="username" :password="password" :loginuser="loginuser" :serverid="serverid" :channel="guacamole_channel" v-if="show_guacamole_monitor_player"></guacamole-monitor>
            <q-media-player
              v-if="show_rdp_player"
              :sources="sources"
              background-color="black"
              type="video"
              style="overflow:hidden;height:92vh;width:100%;text-align: center;"
            >
            </q-media-player>
            <q-img
              v-if="show_rdp_monitor"
              :src="imageurl"
              style="height: 768px; max-width: 1024px; display: block; margin-left: auto; margin-right: auto;"
              :ratio="1"
              basic
            >
              <template v-slot:error>
                <div class="absolute-full flex flex-center bg-black text-white">
                  {{$t('Session has been ended!')}}
                </div>
              </template>
            </q-img>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import TerminalMonitor from 'components/TerminalMonitor'
import GuacamoleMonitor from 'components/GuacamoleMonitor'
export default {
  components: {
    TerminalMonitor,
    GuacamoleMonitor
  },
  name: 'Log',
  data () {
    return {
      columns: [
        {
          name: 'username',
          align: 'center',
          label: this.$t('log.table.columns.username.label'),
          field: function (row) {
            if (row.user && row.user.username) {
              return row.user.username
            } else {
              return ''
            }
          },
          sortable: true
        },
        {
          name: 'servername',
          align: 'center',
          label: this.$t('log.table.columns.servername.label'),
          field: function (row) {
            if (row.server && row.server.hostname) {
              return row.server.hostname
            } else {
              return ''
            }
          },
          sortable: true
        },
        {
          name: 'ip',
          align: 'center',
          label: this.$t('log.table.columns.ip.label'),
          field: function (row) {
            if (row.server && row.server.ip) {
              return row.server.ip
            } else {
              return ''
            }
          },
          sortable: true
        },
        {
          name: 'start_time',
          align: 'center',
          label: this.$t('log.table.columns.start_time.label'),
          field: 'start_time',
          sortable: true
        },
        {
          name: 'is_finished',
          align: 'center',
          label: this.$t('log.table.columns.is_finished.label'),
          field: 'is_finished',
          sortable: true
        }
      ],
      data: [],
      filter: '',
      loading: false,
      logplayermodal: false,
      player_address: null,
      show_ssh_player: false,
      show_rdp_player: false,
      show_rdp_monitor: false,
      show_ssh_commands: false,
      show_guacamole_monitor_player: false,
      commands_list: [],
      log_obj: {
        user: { username: null },
        server: { ip: null },
        start_time: null,
        end_time: null
      },
      sshmonitorchannel: null,
      show_ssh_monitor_player: false,
      username: null,
      password: null,
      serverid: null,
      loginuser: null,
      guacamole_channel: null,
      sources: [],
      imageurl: null
    }
  },
  methods: {
    sessionKill (props) {
      console.log(props)
      const that = this
      const channel = props.row.channel
      if (props.row.tag === 'ssh') {
        this.$axios
          .post('/common/api/sshterminalkill/', { channel_name: channel })
          .then(res => {
            if (res.data.status) {
              that.$q.notify({
                type: 'positive',
                multiline: true,
                message: res.data.message,
                timeout: 2000,
                position: 'top'
              })
              that.fetchData()
            } else {
              that.$q.notify({
                type: 'negative',
                multiline: true,
                message: res.data.message,
                timeout: 2000,
                position: 'top'
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    playLog (props) {
      this.logplayermodal = true
      this.show_ssh_player = true
      this.show_ssh_commands = false
      this.show_ssh_monitor_player = false
      this.show_rdp_player = false
      this.show_rdp_monitor = false
      if (process.env.NODE_ENV === 'production') {
        this.player_address = `/sshlogplay/${props.row.id}/`
      } else {
        this.player_address = `http://127.0.0.1:8000/sshlogplay/${props.row.id}/`
      }
      this.show_guacamole_monitor_player = false
      this.log_obj = props.row
    },
    playRdpLog (props) {
      this.logplayermodal = true
      this.show_rdp_player = true
      this.show_ssh_commands = false
      this.show_ssh_monitor_player = false
      this.show_ssh_player = false
      this.show_guacamole_monitor_player = false
      this.show_rdp_monitor = false
      if (process.env.NODE_ENV === 'production') {
        this.sources = [
          {
            src: `/media/${props.row.channel}-000000.mp4`,
            type: 'video/mp4'
          }
        ]
      } else {
        this.sources = [
          {
            src: `http://127.0.0.1:8000/media/${props.row.channel}-000000.mp4`,
            type: 'video/mp4'
          }
        ]
      }
      this.log_obj = props.row
    },
    monitorSession (props) {
      this.log_obj = props.row
      console.log(props.row)
      if (props.row.tag === 'ssh') {
        this.logplayermodal = true
        this.show_ssh_commands = false
        this.show_ssh_monitor_player = true
        this.show_ssh_player = false
        this.sshmonitorchannel = props.row.log
        this.show_guacamole_monitor_player = false
        this.show_rdp_player = false
        this.show_rdp_monitor = false
      } else {
        this.serverid = props.row.server.id
        this.loginuser = props.row.loginuser
        this.guacamole_channel = props.row.gucamole_client_id
        this.show_rdp_player = false
        this.show_rdp_monitor = false
        this.getDynamicUserPassword(props.row.server.id, props.row.loginuser)
      }
    },
    monitorRdpSession (props) {
      this.logplayermodal = true
      const that = this
      const timer = ms => new Promise((resolve, reject) => setTimeout(resolve, ms))
      async function loop () {
        while (that.logplayermodal) {
          await timer(50)
          that.$axios.get(`/common/api/getlastimage/${props.row.channel}/`).then(res => {
            console.log(res.data.image)
            if (process.env.NODE_ENV === 'production') {
              that.imageurl = `/common/api/getimage/${res.data.image}/`
            } else {
              that.imageurl = `http://127.0.0.1:8000/common/api/getimage/${res.data.image}/`
            }
            that.show_ssh_player = false
            that.show_rdp_player = false
            that.show_rdp_monitor = true
          })
        }
      }
      loop()
    },
    showGuacamoleMonitor () {
      this.logplayermodal = true
      this.show_ssh_commands = false
      this.show_ssh_monitor_player = false
      this.show_ssh_player = false
      this.show_guacamole_monitor_player = true
      this.show_rdp_player = false
      this.show_rdp_monitor = false
    },
    getDynamicUserPassword (serverid, loginuser) {
      const that = this
      this.$axios.post('/common/api/getdynamicpassword/', { serverid: serverid, username: loginuser }).then(res => {
        const username = res.data.data.username
        const password = res.data.data.password
        that.username = username
        that.password = password
        that.dynamicUserPasswordAuth(username, password)
      }).catch(err => {
        console.log(err)
      })
    },
    dynamicUserPasswordAuth (username, password) {
      const that = this
      this.$axios.post('/common/api/dynamicpasswordauth/', { username: username, password: password }).then(res => {
        that.showGuacamoleMonitor()
      })
    },
    playGuacamoleLog (props) {
      const date = new Date(props.row.start_time)
      const month = date.getMonth() + 1
      const day = date.getDate()
      this.logplayermodal = true
      this.show_ssh_player = true
      this.show_ssh_commands = false
      this.show_ssh_monitor_player = false
      this.show_guacamole_monitor_player = false
      this.show_rdp_player = false
      this.show_rdp_monitor = false
      if (process.env.NODE_ENV === 'production') {
        this.player_address = `/sessionlogplay/?media=${date.getFullYear()}-${month}-${day}/${props.row.channel}`
      } else {
        this.player_address = `http://127.0.0.1:8000/sessionlogplay/?media=${date.getFullYear()}-${month}-${day}/${props.row.channel}`
      }
      this.log_obj = props.row
    },
    getCommands (props) {
      this.log_obj = props.row
      this.show_ssh_player = false
      this.show_ssh_commands = true
      this.show_ssh_monitor_player = false
      this.show_guacamole_monitor_player = false
      this.show_rdp_player = false
      this.show_rdp_monitor = false
      this.fetchCommandsData({ id: props.row.id })
    },
    fetchData () {
      const that = this
      that.loading = true
      this.$axios
        .get('/common/api/logs/')
        .then(res => {
          that.data = res.data
          that.loading = false
        })
        .catch(err => {
          console.log(err)
          that.loading = false
        })
    },
    fetchCommandsData (data) {
      const that = this
      this.$axios.post('/common/api/commandsloglistapi/', data).then(res => {
        if (res.data.status) {
          this.logplayermodal = true
          that.commands_list = res.data.data
        } else {
          that.$q.notify({
            type: 'negative',
            multiline: true,
            message: res.data.message,
            timeout: 2000,
            position: 'top'
          })
        }
      })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style scoped></style>
