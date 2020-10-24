<template>
  <div class="q-pa-md">
    <q-table
      :title="$t('group.Group')"
      :data="data"
      :columns="columns"
      :filter="filter"
      color="primary"
      row-key="name"
      :loading="loading"
    >

      <template v-slot:top="props">
        <q-btn color="primary" :label="$t('group.new')" @click="AddNewGroup" no-caps></q-btn>
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
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn dense round flat color="grey"  icon="edit" @click="editRow(props)"></q-btn>
          <q-btn dense round flat color="grey"  icon="delete" @click="deleteRow(props)"></q-btn>
        </q-td>
      </template>

      <template v-slot:body-cell-servers="props">
        <q-td :props="props">
          <a v-for="(server,index) in props.row.servers" :key="index">
            {{server.name}}
            <br>
          </a>
        </q-td>
      </template>

      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>

    </q-table>

    <q-dialog v-model="creategroupmodal" full-width full-height :maximized="true">
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
                  :label="$t('Group name')"
                  :hint="$t('Group name')"
                  lazy-rules
                  :rules="[ val => val && val.length > 1 || $t('Please type group name at least 2 characters')]"
                />

                <div>
                  {{$t('group.Servers')}}
                  <div v-for="(line, index) in servers" :key="index" class="row">
                    <div class="col-lg-6">
                      <q-select
                        use-input
                        input-debounce="0"
                        v-model="line.server"
                        :label="$t('group.Server')"
                        :options="servers_list"
                        @filter="filterFn"
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
                        <q-btn round @click="removeServer(index)" icon="delete" />
                        <q-btn round v-if="index + 1 === servers.length" @click="addServer" icon="add" />
                      </div>
                    </div>
                  </div>
                </div>

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
  </div>
</template>

<script>
let serverList = []
const serverListMap = Object()
export default {
  name: 'Group',
  watch: {
    servers () {
      this.blockRemoval = this.servers.length <= 1
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
    }
  },
  data () {
    return {
      columns: [
        { name: 'name', align: 'center', label: this.$t('group.table.columns.name.label'), field: 'name', sortable: true },
        { name: 'servers', align: 'center', label: this.$t('group.table.columns.servers.label'), field: 'servers', sortable: true },
        { name: 'action', align: 'center', label: this.$t('action'), field: '', sortable: true }
      ],
      data: [],
      creategroupmodal: false,
      servers: [],
      name: null,
      servers_list: serverList,
      filter: '',
      loading: false,
      create: true,
      create_title: this.$t('group.create_group'),
      update_title: this.$t('group.update_group'),
      id: null
    }
  },
  methods: {
    editRow (props) {
      // do something
      this.create = false
      this.onReset()
      this.id = props.row.id
      const that = this
      this.servers = []
      this.servers.push({
        server: null
      })
      props.row.servers.map(server => {
        serverList.map(value => {
          if (value.value === server.id) {
            that.servers.unshift({
              server: {
                label: value.label,
                value: server.id
              }
            })
          }
        })
      })
      this.name = props.row.name
      this.creategroupmodal = true
    },
    deleteRow (props) {
      // do something
      this.$q.dialog({
        title: this.$t('Confirm'),
        message: `${this.$t('group.delete_group', { name: props.row.name })} ?`,
        cancel: true,
        persistent: true,
        ok: {
          push: true,
          color: 'negative'
        }
      }).onOk(() => {
        this.deleteGroup(props.row.id, props.row.name)
      })
    },
    AddNewGroup () {
      this.create = true
      this.onReset()
      this.creategroupmodal = true
    },
    onSubmit () {
      const data = Object()
      data.name = this.name
      const serversTmp = []
      this.servers.map(value => {
        if (value.server) {
          serversTmp.push(value.server.value)
        }
      })
      data.servers = serversTmp
      if (this.create === true) {
        this.createGroup(data)
      } else {
        this.updateGroup(this.id, data)
      }
    },

    onReset () {
      this.name = null
      this.servers = []
      this.servers.push({
        server: null
      })
    },
    filterFn (val, update) {
      update(() => {
        if (val === '') {
          this.servers_list = serverList
        } else {
          const needle = val.toLowerCase()
          this.servers_list = serverList.filter(
            v => v.label.toLowerCase().indexOf(needle) > -1
          )
        }
      })
    },
    addServer () {
      const checkEmptyLines = this.servers.filter(line => line.number === null)
      if (checkEmptyLines.length >= 1 && this.servers.length > 0) {

      } else {
        this.servers.push({
          server: null
        })
      }
    },
    removeServer (lineId) {
      if (!this.blockRemoval) {
        this.servers.splice(lineId, 1)
      }
    },
    fetchServerData () {
      const that = this
      that.loading = true
      serverList = []
      this.$axios.get('/common/api/serverinfo/').then(res => {
        res.data.map(val => {
          serverList.push({
            label: `${val.name} ${val.hostname} ${val.ip}`,
            value: val.id
          })
          serverListMap[val.id] = {
            name: val.name,
            id: val.id
          }
        })
        that.loading = false
      }).catch(err => {
        console.log(err)
        that.loading = false
      })
    },
    fetchdata () {
      const that = this
      this.$axios.get('/common/api/servergroupwithserverinfo/').then(res => {
        that.data = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    deleteGroup (id, name) {
      const that = this
      this.$axios.delete(`/common/api/servergroup/${id}/`).then(res => {
        that.$q.notify({
          type: 'positive',
          textColor: 'grey-10',
          multiLine: true,
          message: `${that.$t('group.delete_group_success', { name: name })} !`,
          timeout: 2000,
          position: 'top'
        })
        this.fetchServerData()
        this.fetchdata()
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
        that.creategroupmodal = false
        this.fetchServerData()
        this.fetchdata()
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
    updateGroup (id, data) {
      const that = this
      this.$axios.patch(`/common/api/servergroup/${id}/`, data).then(res => {
        that.$q.notify({
          type: 'positive',
          textColor: 'grey-10',
          multiLine: true,
          message: `${that.$t('group.update_group_success', { name: data.name })} !`,
          timeout: 2000,
          position: 'top'
        })
        that.creategroupmodal = false
        that.fetchdata()
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
    }
  },
  mounted () {
    this.addServer()
  },
  created () {
    this.fetchServerData()
    this.fetchdata()
  }
}
</script>

<style scoped>

</style>
