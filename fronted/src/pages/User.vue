<template>
  <div class="q-pa-md">
    <q-table
      :title="$t('user.User')"
      :data="data"
      :columns="columns"
      row-key="name"
      :filter="filter"
      color="primary"
      :loading="loading"
    >

      <template v-slot:top="props">
        <q-btn color="primary" :label="$t('user.new')" @click="AddNewUser" no-caps></q-btn>
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
          <q-th align="center">{{$t('action')}}</q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
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
      </template>

      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>

    </q-table>

    <q-dialog v-model="createusermodal" full-width full-height :maximized="true">
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
                  :label="$t('user.user_name')"
                  :readonly="!create"
                  lazy-rules
                  :rules="[ val => val && val.length > 2 || $t('Please type user name at least 2 characters')]"
                />

                <q-input
                  v-model="password"
                  :label="$t('User password')"
                  type="password"
                  lazy-rules
                  :rules="[ val => val && val.length >= 8 || $t('Please type your password at least 8 characters')]"
                >
                  <template v-slot:hint>
                    <p style="font-size: 13px;text-align: left">{{$t('password strength')}}</p>
                    <div style="float:left;width: 100%;margin-left: -32% " class="fixed-left">
                      <password v-model="password" :strength-meter-only="true"/>
                    </div>
                  </template>
                </q-input>

                <q-input
                  v-model="password_verify"
                  :label="$t('Verify your password')"
                  type="password"
                  lazy-rules
                  :rules="[ val => val && val.length >= 8 || $t('Please retype your password at least 8 characters')]"
                  :error="!isValid"
                  :error-message="$t('Password and verify password must equal')"
                />

                <q-input
                  v-model="email"
                  :label="$t('Email address')"
                  type="email"
                  :readonly="!create"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || $t('Please input your email address')]"
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
  </div>
</template>

<script>
import Password from 'vue-password-strength-meter'
export default {
  name: 'User',
  components: {
    Password
  },
  watch: {
    createusermodal (val, oldval) {
      if (!this.create !== true) {
        this.onReset()
      }
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
    isValid () {
      return this.password === this.password_verify
    }
  },
  data () {
    return {
      columns: [
        { name: 'username', align: 'center', label: this.$t('user.table.columns.username.label'), field: 'username', sortable: true },
        { name: 'email', align: 'center', label: this.$t('user.table.columns.email.label'), field: 'email', sortable: true }
      ],
      filter: '',
      data: [],
      name: null,
      password: null,
      password_verify: null,
      email: null,
      create: true,
      id: null,
      createusermodal: false,
      create_title: this.$t('user.create_user'),
      update_title: this.$t('user.update_user'),
      loading: false
    }
  },
  methods: {
    editRow (props) {
      // this.noti()
      // do something
      this.create = false
      this.name = props.row.username
      this.email = props.row.email
      this.id = props.row.id
      this.createusermodal = true
    },
    deleteRow (props) {
      this.$q.dialog({
        title: this.$t('Confirm'),
        message: `${this.$t('user.delete_user', { username: props.row.username })} ?`,
        cancel: true,
        persistent: true,
        ok: {
          push: true,
          color: 'negative'
        }
      }).onOk(() => {
        this.deleteUser(`${props.row.id}`, `${props.row.username}`)
      })
    },
    AddNewUser () {
      this.create = true
      this.createusermodal = true
    },
    onSubmit () {
      if (this.password_verify !== this.password) {
        this.$q.notify({
          type: 'negative',
          color: 'red-5',
          textColor: 'white',
          multiLine: true,
          message: `${this.$t('user.password_validation')}`,
          timeout: 5000,
          position: 'top'
        })
        return
      }
      if (this.create) {
        this.createUser({
          username: this.name,
          password: this.password,
          password1: this.password_verify,
          email: this.email
        })
      } else {
        this.updateUser(this.id)
      }
    },

    onReset () {
      this.name = null
      this.email = null
      this.password = null
      this.password_verify = null
    },
    fetchdata () {
      const that = this
      that.loading = true
      this.$axios.get('/common/api/users/').then(res => {
        that.data = res.data
        that.loading = false
      }).catch(err => {
        console.log(err)
        that.loading = false
      })
    },
    deleteUser (id, username) {
      const that = this
      this.$axios.delete(`/common/api/users/${id}/`).then(res => {
        that.$q.notify({
          type: 'positive',
          textColor: 'grey-10',
          multiLine: true,
          message: `${that.$t('user.delete_user_success', { username: username })} !`,
          timeout: 2000,
          position: 'top'
        })
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
    },
    updateUser (id) {
      const that = this
      this.$axios.patch(`/common/api/users/${id}/`, { password: that.password, password1: that.password_verify }).then(res => {
        that.$q.notify({
          type: 'positive',
          textColor: 'grey-10',
          multiLine: true,
          message: `${that.$t('user.update_user_success', { username: that.name })} !`,
          timeout: 2000,
          position: 'top'
        })
        that.createusermodal = false
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
    },
    createUser (data) {
      const that = this
      this.$axios.post('/common/api/users/', data).then(res => {
        that.$q.notify({
          type: 'positive',
          textColor: 'grey-10',
          multiLine: true,
          message: `${that.$t('user.create_user_success', { username: data.username })} !`,
          timeout: 2000,
          position: 'top'
        })
        that.createusermodal = false
        that.fetchdata()
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
  created () {
    this.fetchdata()
  }
}
</script>

<style scoped>

</style>
