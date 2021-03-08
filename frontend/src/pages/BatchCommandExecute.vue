<template>
  <div>
    <q-splitter
      v-model="splitterModel"
      :limits="[10, 25]"
      class="fit"
    >
      <template v-slot:before>
        <div class="q-pa-md" style="overflow:hidden;height:100vh;width:100%;;overflow-y: auto;">
          <div class="row no-wrap">
            <q-input ref="filter" dense outlined square v-model="filter" :placeholder="searchPlaceholder" @focus="onSearchFocus"  @blur="onSearchBlur" class="bg-white col" />
            <q-btn color="grey-3" text-color="grey-8" icon="search" unelevated @click="resetFilter" />
          </div>
          <q-tree
            :nodes="tree"
            node-key="raw"
            selected-color="primary"
            :filter="filter"
            :ticked.sync="selectednode"
            :filter-method="filterServer"
            tick-strategy="leaf"
            label-key="label"
            ref="servertree"
            @update:ticked="tickedNode"
            default-expand-all
          />
        </div>
      </template>

      <template v-slot:after>
        <div class="q-pa-md">
          <div class="row q-col-gutter-x-xs q-col-gutter-y-lg">
            <div class="col-12">
              <q-select
                filled
                :value="command"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="options"
                @filter="filterFn"
                @input-value="setModel"
                aria-required="true"
                v-on:keyup.enter="execute"
              >

                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:after>
                  <q-btn round dense flat icon="play_arrow" title="execute" @click="execute"/>
                </template>
              </q-select>
            </div>
          </div>
          <div class="q-pa-md">
            <div class="row q-col-gutter-x-xs q-col-gutter-y-lg">
            <div v-for="tab in tabs" :key="tab.id" class="col-6" keep-alive>
                <q-bar dense class="bg-teal text-white">
                  <q-space ></q-space>
                  <q-btn dense flat icon="minimize"></q-btn>
                  <q-btn dense flat icon="crop_square"></q-btn>
                  <q-btn dense flat icon="close" @click.stop="closeWindow(tab.originalValue)"></q-btn>
                </q-bar>
                <terminal :showtoolbar="false" :id="tab.id" :loginuser="tab.loginuser" :username="tab.username" :serverid="tab.serverid" :password="tab.password" ref="terminal" style="overflow:hidden;height:200px;width:100%;"></terminal>
            </div>
            </div>
          </div>
        </div>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import Terminal from 'components/Terminal'

export default {
  name: 'BatchCommandExecute',
  data () {
    return {
      searchFocused: false,
      splitterModel: 15,
      filter: '',
      tabs: [],
      tree: [],
      can_login_usernames: [],
      selectednode: [],
      command: null,
      options: [],
      selectNodeKey: null
    }
  },
  watch: {
    splitterModel: function (new1, old) {
      this.ResizeTerminalWindow()
    }
  },
  methods: {
    tickedNode: function (target) {
      const that = this
      target.map(function (value) {
        const tempTabs = that.tabs.filter(function (el, index) { return el.originalValue === value })
        if (tempTabs.length === 1) {
          console.log('exist')
        } else {
          that.update(value)
        }
      })
      this.tabs.map(function (value) {
        const tempTabs = that.tabs.filter(function (el, index) { return !target.includes(el.originalValue) && el.id !== 'help' })
        if (tempTabs.length === 1) {
          that.closeWindow(tempTabs[0].originalValue)
        }
      })
    },
    execute () {
      const that = this
      if (this.$refs.terminal) {
        this.$refs.terminal.map(function (term) {
          if (term.ws) {
            term.ws.send(`${that.command}\n`)
          }
        })
      }
    },
    filterFn (val, update, abort) {
      update(() => {
        const cmd = val.toLocaleLowerCase()
        this.fetchAutoCompeleteCommandslist(cmd)
      })
    },
    setModel (val) {
      this.command = val
    },
    ResizeTerminalWindow: function () {
      if (this.$refs.terminal) {
        this.$refs.terminal.map(function (term) {
          term.onWindowResize()
        })
      }
    },
    closeWindow: function (id) {
      // console.log('Removing tab id', id)
      const tempTabs = this.tabs.filter(function (el, index) { return el.originalValue === id })
      // terminal element id
      let Id = null
      if (tempTabs.length === 1) {
        Id = tempTabs[0].id
      }
      let index = -1
      index = this.selectednode.indexOf(id)
      if (index > -1) {
        this.selectednode.splice(index, 1)
      }
      // close websocket
      if (this.$refs.terminal) {
        this.$refs.terminal.map(function (term) {
          if (term.id === Id) {
            if (term.ws) {
              term.ws.close()
            }
          }
        })
      }

      this.tabs = this.tabs.filter(function (el, index) { return el.originalValue !== id })
      try {
        if (window.document.getElementById(Id)) {
          window.document.getElementById(Id).remove()
        }
      } catch (e) {
        console.log(e)
      }
    },
    filterServer (node, filter) {
      const filt = filter.toLowerCase()
      return node.label && node.label.toLowerCase().indexOf(filt) > -1
    },

    resetFilter () {
      this.filter = ''
      this.$refs.filter.focus()
    },
    onSearchFocus () {
      this.searchFocused = true
    },
    onSearchBlur () {
      this.searchFocused = false
    },
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
      const serverid = parseInt(target.split('_')[0])
      const RandomId = this.makeid(10)
      this.loginToWebterminal(serverid, target, { name: target, id: RandomId, serverid: serverid, username: '', password: '', loginuser: '' })
    },
    fetchData () {
      const that = this
      this.can_login_usernames = []
      this.$axios.get('/permission/api/getlinuxserverlisttree/').then(res => {
        that.tree = res.data.tree
        that.can_login_usernames = res.data.can_login_usernames
      }).then(() => {
        that.$refs.servertree.expandAll()
      }).catch(err => {
        console.log(err)
      })
    },
    fetchAutoCompeleteCommandslist (cmd) {
      const that = this
      this.$axios.post('/common/api/commandautocompeleteapi/', { cmd: cmd }).then(res => {
        that.options = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    loginToWebterminal (serverid, target, tabobj) {
      this.getLoginUserName(serverid, target, tabobj)
    },
    getLoginUserName (serverid, target, tabobj) {
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
              that.getDynamicUserPassword(serverid, loginuser, target, tabobj)
            }
          }).onCancel(() => {
          // if cancel action happend then deselect the node
            let index = -1
            index = that.selectednode.indexOf(target)
            this.selectednode.splice(index, 1)
          })
        } else if (usernames.length === 1) {
          that.getDynamicUserPassword(serverid, usernames[0], target, tabobj)
        } else {
          console.log('no user can login')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getDynamicUserPassword (serverid, loginuser, target, tabobj) {
      const that = this
      this.$axios.post('/common/api/getdynamicpassword/', { serverid: serverid, username: loginuser }).then(res => {
        tabobj.username = res.data.data.username
        tabobj.password = res.data.data.password
        tabobj.protocol = res.data.data.protocol
        tabobj.loginuser = loginuser
        tabobj.originalValue = target
        if (res.data.data.protocol === 'ssh') {
          that.tabs.push(tabobj)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    searchPlaceholder () {
      return this.searchFocused === true
        ? 'Type to start searching...'
        : 'Search...'
    }
  },
  beforeDestroy () {
    if (this.$refs.terminal) {
      this.$refs.terminal.map(function (term) {
        if (term.ws) {
          term.ws.close()
        }
      })
    }
  },
  created () {
    this.fetchData()
    this.fetchAutoCompeleteCommandslist('')
  },
  components: {
    Terminal
  }
}
</script>

<style scoped>

</style>
