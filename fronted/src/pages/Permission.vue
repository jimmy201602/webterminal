<template>
  <div class="q-pa-md">
    <q-table
      :title="$t('permission.Permission')"
      :data="data"
      :columns="columns"
      row-key="name"
      :filter="filter"
      color="primary"
      :loading="loading"
    >

      <template v-slot:top="props">
        <q-btn color="primary" :label="$t('permission.new')" @click="AddNewPermission" no-caps></q-btn>
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

      <template v-slot:body-cell-user="props">
        <q-td :props="props">
            {{props.row.user.username}}
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

      <template v-slot:body-cell-permissions="props">
        <q-td :props="props">
          <a v-for="permission in props.row.permissions" :key="permission.id">
            {{$t(permission.name)}}
            <br>
          </a>
        </q-td>
      </template>

      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>

    </q-table>
    <q-dialog v-model="createpermissionmodal" full-width full-height :maximized="true">
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

                <q-select
                  v-model="user"
                  option-value="value"
                  use-input
                  use-chips
                  emit-value
                  map-options
                  :label="$t('permission.Users')"
                  input-debounce="0"
                  :options="users_list"
                  @filter="filterUsers"/>

                <div>
                  {{$t('permission.Groups')}}
                  <div v-for="(line, index) in groups" :key="index" class="row">
                    <div class="col-lg-6">
                      <q-select
                        use-input
                        input-debounce="0"
                        v-model="line.group"
                        :label="$t('permission.Group')"
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

                <div>
                  {{$t('permission.Permissions')}}
                  <q-list no-border v-show="false">
                    <template v-for="(item,index) in permissiontree">
                      <q-item :key="index">
                        <q-slide-item style="min-width:100px">
                          <q-item-label>
                            <q-chip color="info">
                              {{$t(item.Name)}}
                            </q-chip>
                          </q-item-label>
                        </q-slide-item>
                        <div>
                          <q-checkbox v-for="value in item.values" :key="value.name" v-model="item.selectedValues" :val="value" :label="$t(value.Name)" style="min-width:150px" />
                        </div>
                      </q-item>
                    </template>
                  </q-list>
                </div>

                <q-tree class="col-12 col-sm-6"
                        :nodes="permissiontree"
                        node-key="label"
                        :tick-strategy="tickStrategy"
                        :ticked.sync="ticked"
                        :expanded.sync="expanded"
                        default-expand-all
                >
                  <template v-slot:default-header="prop">
                    <div class="row items-center">
                      <div class="text-default">{{ prop.node.text }}</div>
                    </div>
                  </template>
                </q-tree>

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
let usersList = []
let credentialList = []
let permissionTree = Object()
export default {
  name: 'Permission',
  watch: {
    groups () {
      this.blockRemoval = this.groups.length <= 1
    },
    lines () {
      this.blockRemoval = this.lines.length <= 1
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
        { name: 'user', align: 'center', label: 'username', field: 'user', sortable: true },
        { name: 'permissions', align: 'center', label: 'permissions', field: 'permissions', sortable: true },
        { name: 'groups', align: 'center', label: 'groups', field: 'groups', sortable: true },
        { name: 'action', align: 'center', label: 'action', field: '', sortable: true }
      ],
      data: [],
      createpermissionmodal: false,
      create: true,
      id: null,
      create_title: this.$t('permission.create_permission'),
      update_title: this.$t('permission.update_permission'),
      groups: [],
      groups_list: groupsList,
      permissiontree: [],
      checkedProperties: [],
      skus: [],
      loading: false,
      filter: null,
      credentials_list: [],
      lines: [],

      ticked: [],
      expanded: [],
      tickStrategy: 'leaf-filtered',
      users_list: [],
      user: null
    }
  },
  methods: {
    editRow (props) {
      this.onReset()
      this.create = false
      this.id = props.row.id
      const that = this
      props.row.groups.map(value => {
        that.groups.unshift({
          group: {
            label: value.name,
            value: value.id
          }
        })
      })
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
      this.user = props.row.user.id
      props.row.permissions.map(value => {
        that.ticked.push(value.name)
      })
      this.createpermissionmodal = true
    },
    deleteRow (props) {
      // do something
      this.$q.dialog({
        title: this.$t('Confirm'),
        message: `${this.$t('permission.delete_permission', { name: props.row.user.username })} ?`,
        cancel: true,
        persistent: true,
        ok: {
          push: true,
          color: 'negative'
        }
      }).onOk(() => {
        this.deletePermission(props.row.id, props.row.username)
      })
    },
    AddNewPermission () {
      this.create = true
      this.createpermissionmodal = true
      this.onReset()
    },
    onSubmit () {
      const permissionslist = []
      this.ticked.map(value => {
        if (typeof (value) === 'string' || value instanceof String) {
          permissionslist.push(permissionTree[value])
        }
      })
      const groupslist = []
      this.groups.map(value => {
        if (value.group && value.group.value) {
          groupslist.push(value.group.value)
        }
      })
      var data = Object()
      data.permissions = permissionslist
      data.user = this.user
      data.groups = groupslist
      let username = ''
      usersList.map(value => {
        if (value.value === this.user) {
          username = value.label
        }
      })
      data.credentials = []
      this.lines.map(value => {
        if (value.credential && value.credential.value) {
          data.credentials.push(value.credential.value)
        }
      })
      data.name = username
      if (this.create) {
        this.createPermission(data)
      } else {
        this.updatePermission(this.id, data)
      }
    },

    onReset () {
      this.permissions = []
      this.user = null
      this.groups = []
      this.groups.push({
        group: null
      })
      this.lines = []
      this.lines.push({
        credential: null
      })
      this.expanded = []
      this.ticked = []
    },
    fetchdata () {
      const that = this
      that.loading = true
      this.$axios.get('/permission/api/permissionwithinfo/').then(res => {
        that.data = res.data
        that.loading = false
      }).catch(err => {
        console.log(err)
        that.loading = false
      })
    },
    fetchpermissiontree () {
      const that = this
      that.loading = true
      this.$axios.get('/permission/api/permissiontree/').then(res => {
        that.permissiontree = res.data.permissiontree
        permissionTree = res.data.permissiontreemap
      }).catch(err => {
        console.log(err)
      })
    },
    deletePermission (id, name) {
      const that = this
      this.$axios.delete(`/permission/api/permission/${id}/`).then(res => {
        that.$q.notify({
          type: 'positive',
          textColor: 'grey-10',
          multiLine: true,
          message: `${that.$t('permission.delete_permission_success', { name: name })} !`,
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
    filterUsers (val, update) {
      update(() => {
        if (val === '') {
          this.users_list = usersList
        } else {
          const needle = val.toLowerCase()
          this.users_list = usersList.filter(
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
    fetchusers () {
      const that = this
      that.loading = true
      this.$axios.get('/common/api/users/').then(res => {
        that.users_list = []
        usersList = []
        res.data.map(value => {
          that.users_list.push({ label: value.username, value: value.id })
          usersList.push({ label: value.username, value: value.id })
        })
        that.loading = false
      }).catch(err => {
        console.log(err)
        that.loading = false
      })
    },
    createPermission (data) {
      const that = this
      this.$axios.post('/permission/api/permission/', data).then(res => {
        that.$q.notify({
          type: 'positive',
          textColor: 'grey-10',
          multiLine: true,
          message: `${that.$t('permission.create_permission_success', { name: data.name })} !`,
          timeout: 2000,
          position: 'top'
        })
        that.createpermissionmodal = false
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
    updatePermission (id, data) {
      const that = this
      this.$axios.patch(`/permission/api/permission/${id}/`, data).then(res => {
        that.$q.notify({
          type: 'positive',
          textColor: 'grey-10',
          multiLine: true,
          message: `${that.$t('permission.update_permission_success', { name: data.name })} !`,
          timeout: 2000,
          position: 'top'
        })
        that.createpermissionmodal = false
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
    fetchCredential () {
      const that = this
      this.$axios.get('/common/api/credential/').then(res => {
        that.credentials_list = []
        credentialList = []
        res.data.map(val => {
          that.credentials_list.push({
            label: `${val.username}`,
            value: val.id
          })
          credentialList.push({
            label: `${val.username}`,
            value: val.id
          })
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
    }
  },
  created () {
    this.fetchdata()
    this.fetchGroup()
    this.fetchpermissiontree()
    this.fetchusers()
    this.fetchCredential()
  },
  mounted () {
    this.addGroup()
  }
}
</script>

<style scoped>

</style>
