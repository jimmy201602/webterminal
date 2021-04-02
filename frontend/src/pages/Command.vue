<template>
  <div class="q-pa-md">
    <q-table
      :title="$t('command.Command')"
      :data="data"
      :columns="columns"
      row-key="name"
      :loading="loading"
      :filter="filter"
    >

      <template v-slot:top="props">
        <q-btn color="primary" :label="$t('command.new')" @click="AddNewCommand" no-caps></q-btn>
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

      <template v-slot:body-cell-groups="props">
        <q-td :props="props">
          <a v-for="(group,index) in props.row.groups" :key="index">
            {{group.name}}
            <br>
          </a>
        </q-td>
      </template>

      <template v-slot:body-cell-commands="props">
        <q-td :props="props">
          <a v-for="(command,index) in props.row.commands" :key="index">
            {{command}}
            <br>
          </a>
        </q-td>
      </template>

      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>

    </q-table>

    <q-dialog v-model="createcommandmodal" full-width full-height :maximized="true">
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
                  :label="$t('command.table.columns.name.name')"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || $t('Please type name at least 2 characters')]"
                />

                <div>
                  {{$t('command.Groups')}}
                  <div v-for="(line, index) in groups" :key="index" class="row">
                    <div class="col-lg-6">
                      <q-select
                        use-input
                        input-debounce="0"
                        v-model="line.group"
                        :label="$t('command.Group')"
                        :options="groups_list"
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
                        <q-btn round @click="removeGroup(index)" icon="delete" />
                        <q-btn round v-if="index + 1 === groups.length" @click="addGroup" icon="add" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  {{$t('command.Commands')}}
                  <div v-for="(line, index) in commands" :key="index" class="row">
                    <div class="col-lg-6">
                      <q-input
                        v-model="line.command"
                        :label="$t('Command name')"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || $t('Please type command name at least 2 characters')]"
                      />
                    </div>

                    <div class="col-lg-1">
                      <div class="block float-left">
                        <q-btn round @click="removeCommand(index)" icon="delete" />
                        <q-btn round v-if="index + 1 === commands.length" @click="addCommand" icon="add" />
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
let groupsList = []
export default {
  name: 'Command',
  watch: {
    groups () {
      this.blockRemoval = this.groups.length <= 1
    },
    commands () {
      this.blockCommandsRemoval = this.commands.length <= 1
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
        { name: 'name', align: 'center', label: this.$t('command.table.columns.name.label'), field: 'name', sortable: true },
        { name: 'groups', align: 'center', label: this.$t('command.table.columns.groups.label'), field: 'groups', sortable: true },
        { name: 'commands', align: 'center', label: this.$t('command.table.columns.commands.label'), field: 'commands', sortable: true },
        { name: 'action', align: 'center', label: this.$t('action'), field: '', sortable: true }
      ],
      data: [],
      createcommandmodal: false,

      name: null,
      groups: [],
      commands: [],
      groups_list: groupsList,
      blockRemoval: true,
      blockCommandsRemoval: true,
      loading: false,
      filter: null,
      create: true,
      id: null,
      create_title: this.$t('command.create_command'),
      update_title: this.$t('command.update_command')
    }
  },
  methods: {
    editRow (props) {
      this.onReset()
      this.id = props.row.id
      this.create = false
      this.name = props.row.name
      this.commands = []
      props.row.commands.map(value => {
        this.commands.push({
          command: value
        })
      })
      this.groups = []
      props.row.groups.map(value => {
        this.groups.push({
          group: {
            label: value.name,
            value: value.id
          }
        })
      })
      this.createcommandmodal = true
    },
    deleteRow (props) {
      // do something
      this.$q.dialog({
        title: this.$t('Confirm'),
        message: `${this.$t('command.delete_command', { name: props.row.name })} ?`,
        cancel: true,
        persistent: true,
        ok: {
          push: true,
          color: 'negative'
        }
      }).onOk(() => {
        this.deleteCommand(props.row.id, props.row.name)
      })
    },
    AddNewCommand () {
      this.onReset()
      this.createcommandmodal = true
      this.create = true
    },
    onSubmit () {
      const data = Object()
      data.name = this.name
      data.groups = []
      data.commands = []
      this.groups.map(value => {
        if (value.group && value.group.value) {
          data.groups.push(value.group.value)
        }
      })
      this.commands.map(value => {
        if (value.command) {
          data.commands.push(value.command)
        }
      })
      data.commands = JSON.stringify(data.commands)
      if (this.create) {
        this.createCommand(data)
      } else {
        this.updateCommand(this.id, data)
      }
    },

    onReset () {
      this.name = null
      this.groups = []
      this.groups.push({
        group: null
      })
      this.commands = []
      this.commands.push({
        command: null
      })
    },
    filterFn (val, update) {
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
    addGroup () {
      const checkEmptyLines = this.groups.filter(line => line.number === null)
      if (checkEmptyLines.length >= 1 && this.groups.length > 0) {
        return
      }
      this.groups.push({
        group: null
      })
    },
    removeGroup (lineId) {
      if (!this.blockRemoval) {
        this.groups.splice(lineId, 1)
      }
    },
    addCommand () {
      const checkEmptyLines = this.commands.filter(line => line.number === null)
      if (checkEmptyLines.length >= 1 && this.commands.length > 0) {
        return
      }
      this.commands.push({
        command: null
      })
    },
    removeCommand (lineId) {
      if (!this.blockCommandsRemoval) {
        this.commands.splice(lineId, 1)
      }
    },
    fetchdata () {
      const that = this
      that.loading = true
      this.data = []
      this.$axios.get('/common/api/commandssequencegroups/').then(res => {
        res.data.map(value => {
          value.commands = JSON.parse(value.commands)
          that.data.push(value)
        })
        that.loading = false
      }).catch(err => {
        console.log(err)
        that.loading = false
      })
    },
    fetchGroup () {
      const that = this
      this.$axios.get('/common/api/servergroup/').then(res => {
        that.groups_list = []
        groupsList = []
        res.data.map(val => {
          that.groups_list.push({
            label: `${val.name}`,
            value: val.id
          })
          groupsList.push({
            label: `${val.name}`,
            value: val.id
          })
        })
      }).catch(err => {
        console.log(err)
      })
    },
    createCommand (data) {
      const that = this
      this.$axios.post('/common/api/commandssequence/', data).then(res => {
        that.$q.notify({
          type: 'positive',
          textColor: 'grey-10',
          multiLine: true,
          message: `${that.$t('command.create_command_success', { name: data.name })} !`,
          timeout: 2000,
          position: 'top'
        })
        that.createcommandmodal = false
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
    updateCommand (id, data) {
      const that = this
      this.$axios.patch(`/common/api/commandssequence/${id}/`, data).then(res => {
        that.$q.notify({
          type: 'positive',
          textColor: 'grey-10',
          multiLine: true,
          message: `${that.$t('command.update_command_success', { name: data.name })} !`,
          timeout: 2000,
          position: 'top'
        })
        that.createcommandmodal = false
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
    deleteCommand (id, name) {
      const that = this
      this.$axios.delete(`/common/api/commandssequence/${id}/`).then(res => {
        that.$q.notify({
          type: 'positive',
          textColor: 'grey-10',
          multiLine: true,
          message: `${that.$t('command.delete_command_success', { name: name })} !`,
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
    }
  },
  mounted () {
    this.addGroup()
    this.addCommand()
  },
  created () {
    this.fetchdata()
    this.fetchGroup()
  }
}
</script>

<style scoped>

</style>
