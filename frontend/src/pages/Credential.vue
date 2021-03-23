<template>
  <div class="q-pa-md">
    <q-table
      :title="$t('credential.Credential')"
      :data="data"
      :columns="columns"
      row-key="name"
      :filter="filter"
      :loading="loading"
    >
      <template v-slot:top="props">
        <q-btn
          color="primary"
          :label="$t('credential.new')"
          @click="AddNewCredential"
          no-caps
        ></q-btn>
        <q-space />
        <q-input
          borderless
          dense
          debounce="300"
          :placeholder="$t('Search')"
          color="primary"
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
          <q-th align="center">{{ $t("action") }}</q-th>
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
              icon="edit"
              @click="editRow(props)"
            ></q-btn>
            <q-btn
              dense
              round
              flat
              color="grey"
              icon="delete"
              @click="deleteRow(props)"
            ></q-btn>
          </q-td>
        </q-tr>
      </template>

      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>

    <q-dialog
      v-model="createcredentialmodal"
      full-width
      full-height
      :maximized="true"
    >
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ modaltitle }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="q-pa-md">
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
              <q-input
                v-model="name"
                :label="$t('Credential name')"
                :hint="$t('Credential name')"
                lazy-rules
                :rules="[
                  val =>
                    (val && val.length > 0) ||
                    $t('Please type your credential name')
                ]"
              />

              <q-select
                v-model="protocol"
                use-input
                input-debounce="0"
                :label="$t('Protocol')"
                :options="options"
                @filter="filterFn"
                aria-required="true"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-input
                v-model="username"
                :label="$t('User name')"
                :hint="$t('User name')"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please input user name'
                ]"
              />

              <q-toggle
                v-model="usekey"
                :label="$t('Use ssh key')"
                v-show="usekey_show"
              />

              <q-select
                v-model="security"
                v-show="protocol === 'rdp'"
                use-input
                input-debounce="0"
                :label="$t('Security')"
                :options="security_options"
                @filter="filterSecurityFn"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-input
                v-show="key_show"
                v-model="key"
                :label="$t('User Key')"
                :hint="$t('User Key')"
                type="textarea"
                :rules="[ValidateKey]"
              />

              <q-toggle
                v-model="usekeypassword"
                :label="$t('Use key password')"
                v-show="use_key_paword_show"
              />

              <q-input
                v-show="password_show"
                v-model="password"
                :label="password_label"
                :hint="password_label"
                type="password"
                :rules="[ValidatePassword]"
              />

              <q-input
                type="number"
                v-model="port"
                :label="$t('Port')"
                lazy-rules
                :rules="[
                  val =>
                    (val !== null && val !== '') ||
                    $t('Please type a valid port value'),
                  val => val <= 65535 || $t('Please type a valid port value')
                ]"
              />

              <q-input
                v-show="width_show"
                type="number"
                v-model="width"
                :label="$t('Width')"
                lazy-rules
                :rules="[
                  val =>
                    (val !== null && val !== '') ||
                    $t('Please type a valid width value'),
                  val => val >= 0 || $t('Please type a valid width value')
                ]"
              />

              <q-input
                v-show="height_show"
                type="number"
                v-model="height"
                :label="$t('Height')"
                lazy-rules
                :rules="[
                  val =>
                    (val !== null && val !== '') ||
                    $t('Please type a valid height value'),
                  val => val >= 0 || $t('Please type a valid height value')
                ]"
              />

              <q-input
                v-show="protocol === 'rdp'"
                type="number"
                v-model="dpi"
                :label="$t('Dpi')"
                lazy-rules
                :rules="[
                  val =>
                    (val !== null && val !== '') ||
                    $t('Please type a valid dpi value'),
                  val => val <= 100 || $t('Please type a valid dpi value')
                ]"
              />

              <q-toggle v-model="useproxy" :label="$t('Use proxy')" />

              <q-input
                v-show="useproxy_show"
                v-model="proxy_server"
                :label="$t('Proxy server ip')"
                :hint="$t('Proxy server ip')"
                :rules="[ValidateProxyServer]"
              />

              <q-input
                v-show="useproxy_show"
                type="number"
                v-model="proxy_port"
                :label="$t('Proxy server port')"
                :rules="[ValidateProxyPort]"
              />

              <q-input
                v-show="useproxy_show"
                v-model="proxy_password"
                :label="$t('Proxy password')"
                :hint="$t('Proxy password')"
                type="password"
                :rules="[ValidateProxyPassword]"
              />

              <div>
                <q-btn :label="$t('Submit')" type="submit" color="primary" />
                <q-btn
                  :label="$t('Reset')"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                />
              </div>
            </q-form>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
const stringOptions = ['ssh', 'telnet', 'vnc', 'rdp']
const securityOptions = ['rdp', 'nla', 'tls', 'any']
export default {
  name: 'Credential',
  data () {
    return {
      columns: [
        {
          name: 'name',
          align: 'center',
          label: this.$t('credential.table.columns.name.label'),
          field: 'name',
          sortable: true
        },
        {
          name: 'username',
          align: 'center',
          label: this.$t('credential.table.columns.username.label'),
          field: 'username',
          sortable: true
        },
        {
          name: 'protocol',
          align: 'center',
          label: this.$t('credential.table.columns.protocol.label'),
          field: 'protocol',
          sortable: true
        },
        {
          name: 'port',
          align: 'center',
          label: this.$t('credential.table.columns.port.label'),
          field: 'port',
          sortable: true
        }
      ],
      data: [],
      createcredentialmodal: false,

      name: null,
      width: 1024,
      height: 768,
      dpi: 96,
      username: null,
      password: null,
      key: null,
      usekey: false,
      usekeypassword: false,
      protocol: 'ssh',
      port: 22,
      useproxy: false,
      proxy_server: null,
      proxy_port: null,
      proxy_password: null,
      security: 'any',

      useproxy_show: false,
      width_show: false,
      height_show: false,
      options: stringOptions,
      security_options: securityOptions,
      filter: '',
      loading: false,
      create: true,
      id: null,
      create_title: this.$t('credential.create_credential'),
      update_title: this.$t('credential.update_credential')
    }
  },
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
    },
    key_show: function () {
      if (this.protocol === 'ssh' && this.usekey) {
        return true
      }
      return false
    },
    usekey_show: function () {
      if (this.protocol === 'ssh') {
        return true
      }
      return false
    },
    use_key_paword_show: function () {
      if (this.protocol === 'ssh' && this.usekey) {
        return true
      }
      return false
    },
    password_show: function () {
      if (this.protocol === 'ssh') {
        if (!this.usekey) {
          return true
        } else {
          if (this.usekeypassword) {
            return true
          }
          return false
        }
      } else {
        return true
      }
    },
    password_label: function () {
      if (this.protocol === 'ssh' && this.usekey) {
        return this.$t('Auth key password')
      }
      return this.$t('User password')
    }
  },
  watch: {
    useproxy (value) {
      if (value) {
        this.useproxy_show = true
      } else {
        this.useproxy_show = false
      }
    },
    protocol (value) {
      if (this.create === true) {
        if (value === 'ssh') {
          this.port = 22
          this.width_show = false
          this.height_show = false
        } else if (value === 'telnet') {
          this.port = 23
          this.width_show = false
          this.height_show = false
        } else if (value === 'rdp') {
          this.port = 3389
          this.width_show = true
          this.height_show = true
        } else if (value === 'vnc') {
          // vnc
          this.port = 5901
          this.width_show = true
          this.height_show = true
        } else {
          // null to default
          this.width_show = false
          this.height_show = false
        }
      }
    }
  },
  methods: {
    ValidatePassword (val) {
      if (!this.usekey) {
        return new Promise((resolve, reject) => {
          resolve(!!val || this.$t('Please type your password'))
        })
      }
    },
    ValidateKey (val) {
      if (this.usekey) {
        return new Promise((resolve, reject) => {
          resolve(!!val || this.$t('Please type your key'))
        })
      }
    },
    ValidateProxyServer (val) {
      if (this.useproxy) {
        return new Promise((resolve, reject) => {
          resolve(!!val || this.$t('Please type your server ip'))
        })
      }
    },
    ValidateProxyPort (val) {
      if (this.useproxy) {
        return new Promise((resolve, reject) => {
          resolve(val <= 65535 || this.$t('Please type a valid proxy port'))
        })
      }
    },
    ValidateProxyPassword (val) {
      if (this.useproxy) {
        return new Promise((resolve, reject) => {
          resolve(!!val || this.$t('Please type your proxy password'))
        })
      }
    },
    editRow (props) {
      this.onReset()
      this.id = props.row.id
      this.create = false
      this.createcredentialmodal = true
      this.name = props.row.name
      this.width = props.row.width
      this.height = props.row.height
      this.dpi = props.row.dpi
      this.username = props.row.username
      this.password = props.row.password
      this.key = props.row.key
      if (props.row.protocol === 'ssh-password') {
        this.protocol = 'ssh'
      }
      if (props.row.protocol === 'ssh-key') {
        this.protocol = 'ssh'
        this.usekey = true
      }
      if (props.row.protocol === 'ssh-key-with-password') {
        this.protocol = 'ssh'
        this.usekey = true
        this.usekeypassword = true
      }
      if (props.row.protocol === 'vnc') {
        this.protocol = 'vnc'
        this.usekey = false
      }
      if (props.row.protocol === 'rdp') {
        this.protocol = 'rdp'
        this.usekey = false
      }
      if (props.row.protocol === 'telnet') {
        this.protocol = 'telnet'
        this.usekey = false
      }
      if (
        props.row.proxy_server ||
        props.row.proxy_port ||
        props.row.proxy_password
      ) {
        this.useproxy = true
      }
      this.port = props.row.port
      this.useproxy = props.row.useproxy
      this.proxy_server = props.row.proxy_server
      this.proxy_port = props.row.proxy_port
      this.proxy_password = props.row.proxy_password
      this.security = props.row.security
    },
    deleteRow (props) {
      this.$q
        .dialog({
          title: this.$t('Confirm'),
          message: `${this.$t('credential.delete_credential', {
            name: props.row.name
          })} ?`,
          cancel: true,
          persistent: true,
          ok: {
            push: true,
            color: 'negative'
          }
        })
        .onOk(() => {
          this.deleteCredential(props.row.id, props.row.name)
        })
    },
    AddNewCredential () {
      this.create = true
      this.onReset()
      this.createcredentialmodal = true
    },
    onSubmit () {
      const data = Object()
      data.name = this.name
      data.username = this.username
      data.port = this.port
      if (this.protocol === 'ssh') {
        if (this.usekey) {
          if (this.usekeypassword) {
            data.protocol = 'ssh-key-with-password'
            data.password = this.password
          } else {
            data.protocol = 'ssh-key'
          }
          data.key = this.key
        } else {
          data.protocol = 'ssh-password'
          data.password = this.password
        }
      } else if (this.protocol === 'telnet') {
        data.protocol = this.protocol
        data.password = this.password
      } else {
        data.width = this.width
        data.height = this.height
        data.dpi = this.dpi
        data.protocol = this.protocol
        data.password = this.password
        if (this.protocol === 'rdp') {
          data.security = this.security
        }
      }
      if (this.useproxy) {
        data.proxy_password = this.proxy_password
        data.proxy_port = this.proxy_port
        data.proxy_server = this.proxy_server
      }
      if (this.create) {
        this.createCredential(data)
      } else {
        this.updateCredential(this.id, data)
      }
    },
    onReset () {
      this.name = null
      this.username = null
      this.width = 1024
      this.height = 768
      this.dpi = 96
      this.password = null
      this.usekey = false
      this.key = null
      this.port = 22
      this.useproxy_show = false
      this.useproxy = false
      this.proxy_password = null
      this.proxy_server = null
      this.proxy_password = null
      this.proxy_port = null
      this.security = 'any'
      this.protocol = 'ssh'
      this.usekeypassword = false
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.options = stringOptions

          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options = stringOptions.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    filterSecurityFn (val, update) {
      if (val === '') {
        update(() => {
          this.security_options = securityOptions
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.security_options = securityOptions.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    fetchData () {
      const that = this
      this.$axios
        .get('/common/api/credential/')
        .then(res => {
          that.data = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    createCredential (data) {
      const that = this
      this.$axios
        .post('/common/api/credential/', data)
        .then(res => {
          that.$q.notify({
            type: 'positive',
            textColor: 'grey-10',
            multiLine: true,
            message: `${that.$t('credential.create_credential_success', {
              name: data.name
            })} !`,
            timeout: 2000,
            position: 'top'
          })
          that.createcredentialmodal = false
          that.fetchData()
        })
        .catch(err => {
          console.log(err)
          const messages = []
          if (err.response.data instanceof Object === true) {
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
    deleteCredential (id, name) {
      const that = this
      this.$axios
        .delete(`/common/api/credential/${id}/`)
        .then(res => {
          that.$q.notify({
            type: 'positive',
            textColor: 'grey-10',
            multiLine: true,
            message: `${that.$t('credential.delete_credential_success', {
              name: name
            })} !`,
            timeout: 2000,
            position: 'top'
          })
          that.fetchData()
        })
        .catch(err => {
          console.log(err)
          const messages = []
          if (err.response.data instanceof Object === true) {
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
    updateCredential (id, data) {
      const that = this
      this.$axios
        .patch(`/common/api/credential/${id}/`, data)
        .then(res => {
          that.$q.notify({
            type: 'positive',
            textColor: 'grey-10',
            multiLine: true,
            message: `${that.$t('credential.update_credential_success', {
              name: that.name
            })} !`,
            timeout: 2000,
            position: 'top'
          })
          that.createcredentialmodal = false
          that.fetchData()
        })
        .catch(err => {
          console.log(err)
          const messages = []
          if (err.response.data instanceof Object === true) {
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
  components: {
    // formio: Form
  },
  created () {
    this.fetchData()
  }
}
</script>

<style scoped>
</style>
