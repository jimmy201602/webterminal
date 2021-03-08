<template>
  <div class="q-pa-md">
    <q-table
      :title="$t('server.Server')"
      :data="data"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :filter="filter"
    >

      <template v-slot:top="props">
        <q-btn color="primary" :label="$t('server.new')" @click="AddNewServer" no-caps></q-btn>
        <q-space/>
        <q-input borderless dense debounce="300" :placeholder="$t('Search')" v-model="filter" filled>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          flat round dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
          <q-th align="center">{{$t('action')}}</q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn size="sm" color="grey" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" v-show="props.row.type"/>
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
          <q-td auto-width>
            <q-btn dense round flat color="grey"  icon="edit" @click="editRow(props)"></q-btn>
            <q-btn dense round flat color="grey"  icon="delete" @click="deleteRow(props)"></q-btn>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%" v-show="props.row.type">
            <div class="text-left">
              <div class="q-gutter-md row items-start">

                <!-- notice "basic" prop (which disables default animation) -->
                <q-img
                  v-show="props.row.type === 'ssh' || props.row.type === 'ssh-vnc'"
                  src="../assets/securecrt.gif"
                  style="width: 80px"
                  :ratio="1"
                  basic
                  spinner-color="white"
                  class="rounded-borders"
                  @click="clickRow(props,'ssh')"
                  @contextmenu.stop.prevent="settingsRow(props,'ssh')"
                >
                  <div class="absolute-bottom text-center text-italic">
                    ssh
                  </div>
                </q-img>
                <q-img
                  v-show="props.row.type === 'ssh' || props.row.type === 'ssh-vnc'"
                  src="../assets/filezilla.gif"
                  style="width: 80px"
                  :ratio="1"
                  basic
                  spinner-color="white"
                  class="rounded-borders"
                  @click="clickRow(props,'sftp')"
                  @contextmenu.stop.prevent="settingsRow(props,'sftp')"
                >
                  <div class="absolute-bottom text-center text-italic">
                    sftp
                  </div>
                </q-img>
                <q-img
                  v-show="props.row.type === 'ssh' || props.row.type === 'ssh-vnc'"
                  src="../assets/terminal.gif"
                  style="width: 80px"
                  :ratio="1"
                  basic
                  spinner-color="white"
                  class="rounded-borders"
                  @click="clickRow(props,'webssh')"
                  @contextmenu.stop.prevent="settingsRow(props,'ssh')"
                >
                  <div class="absolute-bottom text-center text-italic">
                    webssh
                  </div>
                </q-img>

                <!-- notice "basic" prop (which disables default animation) -->
                <q-img
                  v-show="props.row.type === 'rdp'"
                  src="../assets/mstsc.gif"
                  style="width: 80px"
                  :ratio="1"
                  basic
                  spinner-color="white"
                  class="rounded-borders"
                  @click="clickRow(props,'rdp')"
                  @contextmenu.stop.prevent="settingsRow(props,'rdp')"
                >
                  <div class="absolute-bottom text-center text-italic">
                    mstsc
                  </div>
                </q-img>
                <q-img
                  v-show="props.row.type === 'rdp'"
                  src="../assets/webrdp.gif"
                  style="width: 80px"
                  :ratio="1"
                  basic
                  spinner-color="white"
                  class="rounded-borders"
                  @click="clickRow(props,'webrdp')"
                  @contextmenu.stop.prevent="settingsRow(props,'rdp')"
                >
                  <div class="absolute-bottom text-center text-italic">
                    webrdp
                  </div>
                </q-img>

                <!-- notice "basic" prop (which disables default animation) -->
                <q-img
                  v-show="props.row.type === 'vnc' || props.row.type === 'ssh-vnc'"
                  src="../assets/vnc.gif"
                  style="width: 80px"
                  :ratio="1"
                  basic
                  spinner-color="white"
                  class="rounded-borders"
                  @click="clickRow(props,'vnc')"
                  @contextmenu.stop.prevent="settingsRow(props,'vnc')"
                >
                  <div class="absolute-bottom text-center text-italic">
                    vnc
                  </div>
                </q-img>
                <q-img
                  v-show="props.row.type === 'vnc' || props.row.type === 'ssh-vnc'"
                  src="../assets/webrdp.gif"
                  style="width: 80px"
                  :ratio="1"
                  basic
                  spinner-color="white"
                  class="rounded-borders"
                  @click="clickRow(props,'webvnc')"
                  @contextmenu.stop.prevent="settingsRow(props,'vnc')"
                >
                  <div class="absolute-bottom text-center text-italic">
                    webvnc
                  </div>
                </q-img>

                <!-- notice "basic" prop (which disables default animation) -->
                <q-img
                  v-show="props.row.type === 'telnet'"
                  src="../assets/securecrt.gif"
                  style="width: 80px"
                  :ratio="1"
                  basic
                  spinner-color="white"
                  class="rounded-borders"
                  @click="clickRow(props,'telnet')"
                  @contextmenu.stop.prevent="settingsRow(props,'telnet')"
                >
                  <div class="absolute-bottom text-center text-italic">
                    telnet
                  </div>
                </q-img>
                <q-img
                  v-show="props.row.type === 'telnet'"
                  src="../assets/terminal.gif"
                  style="width: 80px"
                  :ratio="1"
                  basic
                  spinner-color="white"
                  class="rounded-borders"
                  @click="clickRow(props,'webtelnet')"
                  @contextmenu.stop.prevent="settingsRow(props,'telnet')"
                >
                  <div class="absolute-bottom text-center text-italic">
                    webtelnet
                  </div>
                </q-img>

              </div>
            </div>
          </q-td>
        </q-tr>
      </template>

      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>

    </q-table>

    <q-dialog v-model="createservermodal" full-width full-height :maximized="true">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{modaltitle}}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div>
            <div class="q-pa-md">

              <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
              >
                <q-input
                  v-model="name"
                  :label="$t('server.table.columns.name.name')"
                  :hint="$t('server.table.columns.name.name')"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Server alias name']"
                />

                <q-input
                  v-model="hostname"
                  :label="$t('server.table.columns.hostname.name')"
                  :hint="$t('server.table.columns.hostname.label')"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || $t('Please type server name at least 2 characters')]"
                />

                <q-input
                  v-model="ip"
                  :label="$t('server.table.columns.ip.name')"
                  :hint="$t('server.table.columns.ip.label')"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || $t('Please type a valid ip address')]"
                />

                <div>
                  {{$t('server.Credential')}}
                  <div v-for="(line, index) in lines" :key="index" class="row">
                    <div class="col-lg-6">
                      <q-select
                        use-input
                        input-debounce="0"
                        v-model="line.credential"
                        :label="$t('server.Credential')"
                        :options="credentials_list"
                        @filter="filterCredential"
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </div>

                    <div class="col-lg-1">
                      <div class="block float-left">
                        <q-btn round @click="removeLine(index)" icon="delete" />
                        <q-btn round v-if="index + 1 === lines.length" @click="addLine" icon="add" />
                      </div>
                    </div>
                  </div>
                </div>

                <q-select
                  v-model="groups"
                  use-input
                  use-chips
                  multiple
                  :label="$t('server.Groups')"
                  :hint="$t('Group will be used to control permission')"
                  input-debounce="0"
                  @new-value="createNewTag"
                  :options="groups_list"
                  @filter="filterGroups"
                />

                <div>
                  <q-btn :label="$t('Submit')" type="submit" color="primary"/>
                  <q-btn :label="$t('Reset')" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
              </q-form>

            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="downloadLink" persistent transition-show="flip-down" transition-hide="flip-up" position="top">
      <q-card>
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
            {{$t('You haven\'t install webterminal helper,please download and install it.')}}
          <q-list>
            <q-item
              @click.native="downloadWebterminalHelper('Windows')"
              clickable
            >
              <q-item-section avatar>
                <q-icon color="primary" name="fab fa-windows" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Windows</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              @click.native="downloadWebterminalHelper('Mac')"
              clickable
            >
              <q-item-section avatar>
                <q-icon color="primary" name="fab fa-apple" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Mac</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              @click.native="downloadWebterminalHelper('Linux')"
              clickable
            >
              <q-item-section avatar>
                <q-icon color="primary" name="fab fa-linux" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Linux</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              @click.native="downloadWebterminalHelper('Ubuntu')"
              clickable
            >
              <q-item-section avatar>
                <q-icon color="primary" name="fab fa-ubuntu" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Ubuntu</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
let groupsList = []
let credentialList = []
let serverGroupMap = Object()
import customProtocolCheck from 'custom-protocol-check'
import { openURL } from 'quasar'

export default {
  name: 'Server',
  computed: {
    modaltitle: {
      get: function () {
        if (this.create) {
          return this.create_title
        } else {
          return this.update_title
        }
      },
      set: function (value) {
        this.modaltitle = value
      }
    }
  },
  watch: {
    lines () {
      this.blockRemoval = this.lines.length <= 1
    }
  },
  data () {
    return {
      columns: [
        { name: 'name', align: 'center', label: this.$t('server.table.columns.name.label'), field: 'name', sortable: true },
        { name: 'hostname', align: 'center', label: this.$t('server.table.columns.hostname.label'), field: 'hostname', sortable: true },
        { name: 'ip', align: 'center', label: this.$t('server.table.columns.ip.label'), field: 'ip', sortable: true }
      ],
      data: [],
      name: null,
      hostname: null,
      createservermodal: false,

      groups: null,
      lines: [],
      ip: '',
      groups_list: [],
      blockRemoval: true,
      credentials_list: [],
      loading: false,
      filter: '',
      create: true,
      create_title: this.$t('server.create_server'),
      update_title: this.$t('server.update_server'),
      id: null,
      default_user_config_id: null,
      downloadLink: false,
      can_login_usernames: [],
      protocol: ''
    }
  },
  methods: {
    getLoginUserName (serverid) {
      const that = this
      this.$axios.get(`/common/api/serverinfowithcredential/${serverid}/`).then(res => {
        let usernames = []
        res.data.credentials.map(val => {
          if (that.can_login_usernames.indexOf(val.username) !== -1) {
            usernames.push(val.username)
          }
        })
        usernames = [...new Set(usernames)]
        if (usernames.length > 1) {
          const items = []
          usernames = Array.from(usernames)
          usernames.map(item => {
            items.push({
              label: item,
              value: item
            })
          })
          that.$q.dialog({
            title: '',
            message: 'Choose your default connect user:',
            options: {
              type: 'radio',
              model: '',
              // inline: true,
              items: items
            },
            cancel: true,
            persistent: true
          }).onOk(loginuser => {
            if (loginuser !== '') {
              that.getDynamicUserPassword(serverid, loginuser)
            }
          })
        } else if (usernames.length === 1) {
          that.getDynamicUserPassword(serverid, usernames[0])
        } else {
          that.$q.notify({
            position: 'top',
            progress: true,
            message: that.$t('No user can login !'),
            color: 'negative',
            multiLine: true
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getDynamicUserPassword (serverid, loginuser) {
      const that = this
      const tabobj = {}
      this.$axios.post('/common/api/getdynamicpassword/', { serverid: serverid, username: loginuser }).then(res => {
        tabobj.username = res.data.data.username
        tabobj.password = res.data.data.password
        tabobj.protocol = res.data.data.protocol
        tabobj.loginuser = loginuser
        if (res.data.data.protocol !== 'ssh') {
          that.dynamicUserPasswordAuth(tabobj)
        } else {
          // that.tab = tabobj
          // console.log(tabobj)
          this.openWebterminalHelperToConnectServer(tabobj)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    dynamicUserPasswordAuth (tabobj) {
      // const that = this
      this.$axios.post('/common/api/dynamicpasswordauth/', { username: tabobj.username, password: tabobj.password }).then(res => {
        // that.tab = tabobj
        // console.log(tabobj)
        this.openWebterminalHelperToConnectServer(tabobj)
      })
    },
    openWebterminalHelperToConnectServer (tabobj) {
      // console.log(tabobj)
      const that = this
      var serverAddress = window.location.hostname
      const protocol = this.protocol
      let serverRemotePort = ''
      if (tabobj.protocol === 'ssh' || tabobj.protocol === 'sftp') {
        serverRemotePort = 2100
      } else {
        serverRemotePort = 3389
      }
      var username = tabobj.username
      var tempPass = tabobj.password
      var protocolPath = 'wssh://' + protocol + '#' + serverAddress + '#' + serverRemotePort + '#' + username + '#' + tempPass
      customProtocolCheck(
        protocolPath,
        () => {
          that.$q.notify({
            type: 'negative',
            color: 'red-5',
            textColor: 'white',
            multiLine: true,
            message: 'Custom protocol not found.',
            timeout: 5000,
            position: 'top-right'
          })
          that.downloadLink = true
        },
        () => {
        }, 3000
      )
    },
    getDownloadWebterminalHelperLink () {
      const baseUrl = 'https://github.com/jimmy201602/webterminal/raw/master/helper/Webterminal%20Helper'
      return {
        Windows: `${baseUrl}.exe`,
        Mac: `${baseUrl}.dmg`,
        Linux: `${baseUrl}.tar.bz2`,
        Ubuntu: `${baseUrl}.deb`
      }
    },
    downloadWebterminalHelper (platform) {
      const systemPlatform = this.getPlatform()
      if (systemPlatform === 'Other' || systemPlatform === 'Unix') {
        this.$q.notify({
          type: 'positive',
          textColor: 'grey-10',
          multiLine: true,
          message: `${this.$t('Not supported system.')}`,
          timeout: 2000,
          position: 'top'
        })
        return
      }
      const linkObj = this.getDownloadWebterminalHelperLink()
      openURL(linkObj[platform])
    },
    onSubmit () {
      const data = Object()
      data.name = this.name
      data.hostname = this.hostname
      data.groups = []
      data.ip = this.ip
      data.credentials = []
      this.lines.map(value => {
        if (value.credential && value.credential.value) {
          data.credentials.push(value.credential.value)
        }
      })
      if (this.create) {
        this.createServer(data)
      } else {
        this.updateServer(this.id, data)
      }
    },

    onReset () {
      this.name = null
      this.hostname = null
      this.lines = []
      this.lines.push({
        credential: null
      })
      this.groups = []
      this.ip = null
    },
    editRow (props) {
      // this.noti()
      this.create = false
      this.onReset()
      this.createservermodal = true
      this.fetchCredential()
      this.fetchGroup()
      this.id = props.row.id
      this.ip = props.row.ip
      this.name = props.row.name
      this.hostname = props.row.hostname
      const that = this
      props.row.credentials.map(credential => {
        credentialList.map(value => {
          if (value.value === credential) {
            that.lines.unshift({
              credential: {
                label: value.label,
                value: credential
              }
            })
          }
        })
      })
      this.groups = []
      if (serverGroupMap[this.id]) {
        serverGroupMap[this.id].map(groupId => {
          groupsList.map(value => {
            if (value.value === groupId) {
              that.groups.push(value)
            }
          })
        })
      }
    },
    deleteRow (props) {
      // do something
      this.$q.dialog({
        title: this.$t('Confirm'),
        message: `${this.$t('server.delete_server', { name: props.row.name })} ?`,
        cancel: true,
        persistent: true,
        ok: {
          push: true,
          color: 'negative'
        }
      }).onOk(() => {
        this.deleteServer(props.row.id, props.row.name)
      })
    },
    clickRow (props, protocol) {
      // console.log(props, protocol)
      if (protocol.startsWith('web')) {
        window.open(`/#/webterminal/${props.row.id}/`, '', 'scrollbars=no,location=no,status=no,toolbar=no,menubar=no,width=1600,height=900')
      } else {
        this.getLoginUserName(props.row.id)
        this.protocol = protocol
      }
    },
    settingsRow (props, protocol) {
      this.SettingDefaultUser(props, protocol)
    },
    AddNewServer () {
      this.create = true
      this.createservermodal = true
      this.fetchCredential()
      this.fetchGroup()
    },
    SettingDefaultUser (props, protocol) {
      const items = []
      props.row.credentialsmap.map(value => {
        // to handle ssh protocol
        if (value.protocol === 'ssh-password' || value.protocol === 'ssh-key' || value.protocol === 'ssh-key-with-password') {
          if (protocol === 'ssh' || protocol === 'sftp') {
            items.push({ label: value.username, value: value.username })
          }
        }
        // to filter other protocol
        if (value.protocol === protocol) {
          items.push({ label: value.username, value: value.username })
        }
      })
      items.push({
        label: 'any',
        value: 'any'
      })
      // modify default user
      const that = this
      this.default_user_config_id = null
      this.$axios.get('/common/api/defaultusersettingsquery/', { params: { query: props.row.id } }).then(res => {
        let model = ''
        if (res.data.length > 0) {
          model = res.data[0].username
          that.default_user_config_id = res.data[0].id
        }
        that.$q.dialog({
          title: 'Settings',
          message: 'Choose your default connect user:',
          options: {
            type: 'radio',
            model: model,
            // inline: true,
            items: items
          },
          cancel: true,
          persistent: true
        }).onOk(username => {
          // add default user function call api
          if (that.default_user_config_id !== null) {
            // update default user settings
            that.updateDefutUserSettings(that.default_user_config_id, { username: username })
          } else {
            // create new default user
            that.createDefutUserSettings({ server: props.row.id, username: username })
          }
        })
      }).catch(err => {
        console.log(err)
      })
    },

    addLine () {
      const checkEmptyLines = this.lines.filter(line => line.number === null)
      if (checkEmptyLines.length >= 1 && this.lines.length > 0) {
        return
      }
      this.lines.push({
        credential: null
      })
    },
    removeLine (lineId) {
      if (!this.blockRemoval) {
        this.lines.splice(lineId, 1)
      }
    },
    filterCredential (val, update) {
      update(() => {
        if (val === '') {
          this.credentials_list = credentialList
        } else {
          const needle = val.toLowerCase()
          this.credentials_list = credentialList.filter(
            v => v.label.toLowerCase().indexOf(needle) > -1
          )
        }
      })
    },
    filterGroups (val, update) {
      update(() => {
        if (val === '') {
          this.groups_list = groupsList
        } else {
          const needle = val.toLowerCase()
          this.groups_list = groupsList.filter(
            v => v.label.toLowerCase().indexOf(needle) > -1
          )
        }
      })
    },
    createNewTag (val, done) {
      const stringOptions = []
      groupsList.map(value => {
        stringOptions.push(value.label)
      })
      if (val.length > 2) {
        if (!stringOptions.includes(val)) {
          done(val, 'add-unique')
        }
      }
    },
    fetchdata () {
      const that = this
      that.loading = true
      this.data = []
      this.$axios.get('/common/api/serverinfowithcredential/').then(res => {
        res.data.map(value => {
          let type = 'unknow'
          const credentials = []
          value.credentials.map(cre => {
            if (cre.protocol === 'ssh-password' || cre.protocol === 'ssh-key' || cre.protocol === 'ssh-key-with-password') {
              if (type === 'vnc') {
                type = 'ssh-vnc'
              } else {
                type = 'ssh'
              }
            } else if (cre.protocol === 'vnc') {
              if (type === 'ssh') {
                type = 'ssh-vnc'
              } else {
                type = 'vnc'
              }
            } else if (cre.protocol === 'rdp') {
              type = 'rdp'
            } else if (cre.protocol === 'telnet') {
              // if (type === 'ssh') {
              //   type = 'ssh-telnet'
              // } else if (type === 'ssh-vnc') {
              //   type = 'ssh-vnc-telnet'
              // } else if (type === 'ssh-vnc') {
              //   type = 'ssh-vnc-telnet'
              // } else if (type === 'rdp') {
              //   type = 'rdp-telnet'
              // } else {
              //   type = 'telnet'
              // }
              type = 'telnet'
            }
            credentials.push(cre.id)
          })
          value.type = type
          value.credentialsmap = value.credentials
          delete value.credentials
          value.credentials = credentials
          that.data.push(value)
        })
        // that.data = res.data
        that.loading = false
      }).catch(err => {
        console.log(err)
        that.loading = false
      })
    },
    deleteServer (id, name) {
      const that = this
      this.$axios.delete(`/common/api/serverinfo/${id}/`).then(res => {
        that.$q.notify({
          type: 'positive',
          textColor: 'grey-10',
          multiLine: true,
          message: `${that.$t('server.delete_server_success', { name: name })} !`,
          timeout: 2000,
          position: 'top'
        })
        this.fetchdata()
      }).catch(err => {
        console.log(err)
        const messages = []
        if (err.response && err.response.data) {
          if ((err.response.data instanceof Object) === true) {
            Object.keys(err.response.data).map(key => {
              if (key === 'non_field_errors') {
                messages.push(`${err.response.data[key]}`)
              } else {
                messages.push(`${key}: ${err.response.data[key]}`)
              }
            })
          }
        }

        messages.map(message => {
          that.$q.notify({
            type: 'negative',
            color: 'red-5',
            textColor: 'white',
            multiLine: true,
            message: message,
            timeout: 5000,
            position: 'top'
          })
        })
      })
    },
    fetchCredential () {
      const that = this
      this.$axios.get('/common/api/credential/').then(res => {
        that.credentials_list = []
        credentialList = []
        res.data.map(val => {
          that.credentials_list.push({
            label: `${val.name} ${val.username} ${val.protocol}`,
            value: val.id
          })
          credentialList.push({
            label: `${val.name} ${val.username} ${val.protocol}`,
            value: val.id
          })
        })
      }).catch(err => {
        console.log(err)
      })
    },
    fetchGroup () {
      const that = this
      this.$axios.get('/common/api/servergroup/').then(res => {
        that.groups_list = []
        groupsList = []
        serverGroupMap = Object()
        res.data.map(val => {
          that.groups_list.push({
            label: `${val.name}`,
            value: val.id
          })
          groupsList.push({
            label: `${val.name}`,
            value: val.id
          })
          val.servers.map(server => {
            if (serverGroupMap[server]) {
              serverGroupMap[server].push(val.id)
            } else {
              serverGroupMap[server] = [val.id]
            }
          })
        })
      }).catch(err => {
        console.log(err)
      })
    },
    createGroup (data) {
      const that = this
      this.$axios.post('/common/api/servergroup/', data).then(res => {
        that.$q.notify({
          type: 'positive',
          textColor: 'grey-10',
          multiLine: true,
          message: `${that.$t('group.create_group_success', { name: data.name })} !`,
          timeout: 2000,
          position: 'top'
        })
      }).catch(err => {
        const messages = []
        if ((err.response.data instanceof Object) === true) {
          Object.keys(err.response.data).map(key => {
            if (key === 'non_field_errors') {
              messages.push(`${err.response.data[key]}`)
            } else {
              messages.push(`${key}: ${err.response.data[key]}`)
            }
          })
        }
        messages.map(message => {
          that.$q.notify({
            type: 'negative',
            color: 'red-5',
            textColor: 'white',
            multiLine: true,
            message: message,
            timeout: 5000,
            position: 'top'
          })
        })
      })
    },
    createDefutUserSettings (data) {
      const that = this
      this.$axios.post('/common/api/defaultusersettings/', data).then(res => {
        that.$q.notify({
          type: 'positive',
          textColor: 'grey-10',
          multiLine: true,
          message: `${that.$t('defaultusersettings.create_defaultusersettings_success', { name: data.username })} !`,
          timeout: 2000,
          position: 'top'
        })
      }).catch(err => {
        const messages = []
        if ((err.response.data instanceof Object) === true) {
          Object.keys(err.response.data).map(key => {
            if (key === 'non_field_errors') {
              messages.push(`${err.response.data[key]}`)
            } else {
              messages.push(`${key}: ${err.response.data[key]}`)
            }
          })
        }
        messages.map(message => {
          that.$q.notify({
            type: 'negative',
            color: 'red-5',
            textColor: 'white',
            multiLine: true,
            message: message,
            timeout: 5000,
            position: 'top'
          })
        })
      })
    },
    updateDefutUserSettings (id, data) {
      const that = this
      this.$axios.patch(`/common/api/defaultusersettings/${id}/`, data).then(res => {
      }).then(res => {
        that.$q.notify({
          type: 'positive',
          textColor: 'grey-10',
          multiLine: true,
          message: `${that.$t('defaultusersettings.update_defaultusersettings_success', { name: data.username })} !`,
          timeout: 2000,
          position: 'top'
        })
      }).catch(err => {
        const messages = []
        if ((err.response.data instanceof Object) === true) {
          Object.keys(err.response.data).map(key => {
            if (key === 'non_field_errors') {
              messages.push(`${err.response.data[key]}`)
            } else {
              messages.push(`${key}: ${err.response.data[key]}`)
            }
          })
        }
        messages.map(message => {
          that.$q.notify({
            type: 'negative',
            color: 'red-5',
            textColor: 'white',
            multiLine: true,
            message: message,
            timeout: 5000,
            position: 'top'
          })
        })
      })
    },
    UpdateGroupInfoById (id, serverid) {
      const that = this
      this.$axios.get(`/common/api/servergroup/${id}/`).then(res => {
        const serversNew = res.data.servers
        serversNew.push(serverid)
        that.updateGroup(id, { servers: serversNew })
      }).catch(err => {
        console.log(err)
      })
    },
    updateGroup (id, data) {
      const that = this
      this.$axios.patch(`/common/api/servergroup/${id}/`, data).then(res => {
      }).catch(err => {
        console.log(err)
        const messages = []
        if ((err.response.data instanceof Object) === true) {
          Object.keys(err.response.data).map(key => {
            if (key === 'non_field_errors') {
              messages.push(`${err.response.data[key]}`)
            } else {
              messages.push(`${key}: ${err.response.data[key]}`)
            }
          })
        }
        messages.map(message => {
          that.$q.notify({
            type: 'negative',
            color: 'red-5',
            textColor: 'white',
            multiLine: true,
            message: message,
            timeout: 5000,
            position: 'top'
          })
        })
      })
    },
    createServer (data) {
      const that = this
      this.$axios.post('/common/api/serverinfo/', data).then(res => {
        that.$q.notify({
          type: 'positive',
          textColor: 'grey-10',
          multiLine: true,
          message: `${that.$t('server.create_server_success', { name: data.name })} !`,
          timeout: 2000,
          position: 'top'
        })
        that.createservermodal = false
        this.fetchdata()
        // add new server to new group or add new server to exist group
        this.groups.map(value => {
          if (value.value) {
            that.UpdateGroupInfoById(value.value, res.data.id)
          } else {
            that.createGroup({ name: value, servers: [res.data.id] })
          }
        })
      }).catch(err => {
        const messages = []
        if ((err.response.data instanceof Object) === true) {
          Object.keys(err.response.data).map(key => {
            if (key === 'non_field_errors') {
              messages.push(`${err.response.data[key]}`)
            } else {
              messages.push(`${key}: ${err.response.data[key]}`)
            }
          })
        }
        messages.map(message => {
          that.$q.notify({
            type: 'negative',
            color: 'red-5',
            textColor: 'white',
            multiLine: true,
            message: message,
            timeout: 5000,
            position: 'top'
          })
        })
      })
    },
    getPlatform () {
      var isWin = (navigator.platform === 'Win32') || (navigator.platform === 'Windows')
      var isMac = (navigator.platform === 'Mac68K') || (navigator.platform === 'MacPPC') || (navigator.platform === 'Macintosh') || (navigator.platform === 'MacIntel')
      if (isMac) return 'Mac'
      var isUnix = (navigator.platform === 'X11') && !isWin && !isMac
      if (isUnix) return 'Unix'
      var isLinux = (String(navigator.platform).indexOf('Linux') > -1)
      if (isLinux) return 'Linux'
      if (isWin) return 'Windows'
      // if (isWin) {
      //   var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
      //   if (isWin2K) return "Win2000";
      //   var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
      //   if (isWinXP) return "WinXP";
      //   var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
      //   if (isWin2003) return "Win2003";
      //   var isWinVista= sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
      //   if (isWinVista) return "WinVista";
      //   var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
      //   if (isWin7) return "Win7";
      //   var isWin10 = sUserAgent.indexOf("Windows NT 10") > -1 || sUserAgent.indexOf("Windows 10") > -1;
      //   if (isWin10) return "Win10";
      // }
      return 'Other'
    },
    detectWebterminalHelperIsInstalled () {
      const that = this
      this.$axios.get('/common/api/settingslist/').then(res => {
        if (res.data.webterminal_detect) {
          const data = { identify: 'get' }
          that.detectHelperIsInstalled(data)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    detectHelperIsInstalled (data) {
      const that = this
      this.$axios.post('/common/webterminalhelperdetect/', data).then(res => {
        const id = res.data.message
        const serverProtocol = window.location.protocol
        const serverHost = window.location.host
        const apiPath = '/common/webterminalhelperdetectcallback/'
        const sshProtocolTestPath = `wssh://test#${serverProtocol}//${serverHost}${apiPath}#${id}`
        customProtocolCheck(
          sshProtocolTestPath,
          () => {
            console.log('Custom protocol not found.')
            that.$q.notify({
              type: 'negative',
              color: 'red-5',
              textColor: 'white',
              multiLine: true,
              message: 'Custom protocol not found.',
              timeout: 5000,
              position: 'top-right'
            })
            that.downloadLink = true
          },
          () => {
            console.log('Custom protocol found and opened the file successfully.')
            that.$q.notify({
              type: 'negative',
              color: 'red-5',
              textColor: 'white',
              multiLine: true,
              message: 'Custom protocol found and opened the file successfully.',
              timeout: 5000,
              position: 'top'
            })
          }, 3000
        )
      }).catch(() => {
      })
    },
    updateServer (id, data) {
      const that = this
      this.$axios.patch(`/common/api/serverinfo/${id}/`, data).then(res => {
        that.$q.notify({
          type: 'positive',
          textColor: 'grey-10',
          multiLine: true,
          message: `${that.$t('server.update_server_success', { name: data.name })} !`,
          timeout: 2000,
          position: 'top'
        })
        that.createservermodal = false
        this.fetchdata()
        // add new server to new group or add new server to exist group
        this.groups.map(value => {
          if (value.value) {
            that.UpdateGroupInfoById(value.value, res.data.id)
          } else {
            that.createGroup({ name: value, servers: [res.data.id] })
          }
        })
      }).catch(err => {
        const messages = []
        if ((err.response.data instanceof Object) === true) {
          Object.keys(err.response.data).map(key => {
            if (key === 'non_field_errors') {
              messages.push(`${err.response.data[key]}`)
            } else {
              messages.push(`${key}: ${err.response.data[key]}`)
            }
          })
        }
        messages.map(message => {
          that.$q.notify({
            type: 'negative',
            color: 'red-5',
            textColor: 'white',
            multiLine: true,
            message: message,
            timeout: 5000,
            position: 'top'
          })
        })
      })
    }
  },
  mounted () {
    this.detectWebterminalHelperIsInstalled()
    this.addLine()
  },
  created () {
    this.fetchdata()
    this.fetchCredential()
    const that = this
    this.$axios.get('/permission/api/getserverlisttree/').then(res => {
      that.can_login_usernames = res.data.can_login_usernames
    })
  }
}
</script>

<style scoped>

</style>
