<template>
  <div>
      <terminal :id="tab.id" :loginuser="tab.loginuser" :username="tab.username" :serverid="tab.serverid" :password="tab.password" ref="terminal" v-if="tab.protocol === 'ssh'" style="overflow:hidden;height:100vh;width:100%;"></terminal>
      <guacamole-client :username="tab.username" :password="tab.password" :loginuser="tab.loginuser" :serverid="tab.serverid" v-if="tab.protocol === 'rdp' || tab.protocol === 'vnc' || tab.protocol === 'telnet'" ref="guacamole" style="overflow:hidden;height:89vh;width:100%;"></guacamole-client>
  </div>
</template>

<script>
import Terminal from '../components/Terminal'
import GuacamoleClient from '../components/GuacamoleClient'
import { QSpinnerFacebook } from 'quasar'
export default {
  name: 'WebTerminal',
  data () {
    return {
      tab: {},
      can_login_usernames: []
    }
  },
  methods: {
    makeid (length) {
      var result = ''
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      var charactersLength = characters.length
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      return result
    },
    update (target) {
      console.log('update target', target)
      const serverid = parseInt(target)
      const RandomId = this.makeid(10)
      this.loginToWebterminal(serverid, { id: RandomId, serverid: serverid, username: '', password: '', loginuser: '' })
    },
    loginToWebterminal (serverid, tabobj) {
      this.getLoginUserName(serverid, tabobj)
    },
    getLoginUserName (serverid, tabobj) {
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
          console.log('choose the login user name')
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
              that.getDynamicUserPassword(serverid, loginuser, tabobj)
            } else {
              that.selected = this.old_selected
            }
          }).onCancel(() => {
            that.selected = this.old_selected
          }).onDismiss(() => {
            that.selected = this.old_selected
          })
        } else if (usernames.length === 1) {
          that.getDynamicUserPassword(serverid, usernames[0], tabobj)
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
    getDynamicUserPassword (serverid, loginuser, tabobj) {
      const that = this
      this.$axios.post('/common/api/getdynamicpassword/', { serverid: serverid, username: loginuser }).then(res => {
        tabobj.username = res.data.data.username
        tabobj.password = res.data.data.password
        tabobj.protocol = res.data.data.protocol
        tabobj.loginuser = loginuser
        if (res.data.data.protocol !== 'ssh') {
          that.dynamicUserPasswordAuth(tabobj)
        } else {
          that.tab = tabobj
        }
      }).catch(err => {
        console.log(err)
      })
    },
    dynamicUserPasswordAuth (tabobj) {
      const that = this
      this.$axios.post('/common/api/dynamicpasswordauth/', { username: tabobj.username, password: tabobj.password }).then(res => {
        that.tab = tabobj
      })
    }
  },
  components: {
    Terminal,
    GuacamoleClient
  },
  created () {
    console.log(this.$route.params.id)
    this.$q.loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: 'green',
      spinnerSize: 140,
      backgroundColor: 'purple',
      message: 'Try to connect the <b>server</b>.<br/><span class="text-primary">Hang on...</span>',
      messageColor: 'black'
    })
    const that = this
    this.can_login_usernames = []
    this.$axios.get('/permission/api/getserverlisttree/').then(res => {
      that.can_login_usernames = res.data.can_login_usernames
    }).then(() => {
      if (that.$route.params.id) {
        that.$q.loading.hide()
        that.update(that.$route.params.id)
      } else {
        that.update(null)
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>

</style>
