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
            <q-input ref="filter" dense outlined square v-model="filter" :placeholder="searchPlaceholder"
                     @focus="onSearchFocus" @blur="onSearchBlur" class="bg-white col"/>
            <q-btn color="grey-3" text-color="grey-8" icon="search" unelevated @click="resetFilter"/>
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
          <q-toolbar class="shadow-2 rounded-borders">
            <q-tabs
              v-model="selected"
              align="left"
              @input="updatetab"
              active-color="primary"
              stretch
              no-caps
              shrink
              dense
            >
              <q-tab v-for="tab in tabs" :key="tab.id" v-model="selected"
                     :name="tab.name" @click="selected = tab.name"
              >
                <div>
                  {{ tab.name }}
                  <q-btn
                    all-pointer-events
                    round
                    dense
                    class="z-max q-ml-sm"
                    size="xs"
                    color="negative"
                    icon="close"
                    @click.stop="removeTab(tab.name)"
                  />
                </div>
              </q-tab>
            </q-tabs>
            <q-space></q-space>
            <q-btn-dropdown no-caps class="no-margin no-border-radius no-box-shadow no-outline"
                            :label="$t('more') + '...'" auto-close stretch flat v-show="tabs.length >= 5">
              <q-list>
                <q-item clickable v-close-popup v-for="tab in tabs" :key="tab.id" @click="selected = tab.name">
                  <q-item-section>
                    <q-item-label>{{ tab.name }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-toolbar>
        </div>
        <q-tab-panels v-model="selected" animated class="fit" keep-alive>
          <q-tab-panel name="help" key="help" keep-alive>
            <q-img
              src="../assets/help1.gif"
            />
          </q-tab-panel>
          <q-tab-panel v-for="tab in tabs" :name="tab.name" :key="tab.id" class="no-padding" keep-alive>
            <terminal :ip="tab.ip" :commandid="tab.commandid" :id="tab.id" :loginuser="tab.loginuser"
                      :username="tab.username" :serverid="tab.serverid" :password="tab.password" ref="terminal"
                      v-if="tab.protocol === 'ssh'" style="overflow:hidden;height:100vh;width:100%;"></terminal>
          </q-tab-panel>
        </q-tab-panels>

      </template>
    </q-splitter>
  </div>
</template>

<script>
import Terminal from 'components/Terminal'

export default {
  name: 'CommandExecute',
  data () {
    return {
      searchFocused: false,
      splitterModel: 15,
      selected: '',
      filter: '',
      tabs: [{ name: 'help', id: 'help', OriTarget: 'help', CurrentIndex: 0 }],
      tabsdict: { help: 'help' },
      tree: [],
      tree_map: {},
      can_login_usernames: [],
      selectednode: []
    }
  },
  watch: {
    selected: function (newFolder, oldFolder) {
      if (newFolder === null) {
        this.selected = oldFolder
      }
      // resize the tab window when tab change
      if (newFolder !== 'help') {
        const that = this
        if (this.$refs.terminal) {
          this.$refs.terminal.map(function (term) {
            if (term.id === that.tabsdict[that.selected]) {
              term.onWindowResize()
            }
          })
        }
      }
    },
    splitterModel: function (new1, old) {
      this.ResizeTerminalWindow()
    }
  },
  methods: {
    tickedNode: function (target) {
      const that = this
      target.map(function (value) {
        const tempTabs = that.tabs.filter(function (el, index) {
          return el.originalValue === value
        })
        if (tempTabs.length === 1) {
          console.log('exist')
        } else {
          that.update(value)
        }
      })
      this.tabs.map(function (value) {
        const tempTabs = that.tabs.filter(function (el, index) {
          return !target.includes(el.originalValue) && el.id !== 'help'
        })
        if (tempTabs.length === 1) {
          that.removeTab(tempTabs[0].name)
        }
      })
    },
    ResizeTerminalWindow: function () {
      const that = this
      if (this.selected !== 'help') {
        // when splitter width change then resize the terminal to fit
        this.$refs.terminal.map(function (term) {
          if (term.id === that.tabsdict[that.selected]) {
            term.onWindowResize()
          }
        })
      }
    },
    removeTab: function (name) {
      if (name !== 'help') {
        const Id = this.tabsdict[name]
        let index = -1
        const tempTabs = this.tabs.filter(function (el, index) {
          return el.id === Id
        })
        if (tempTabs.length === 1) {
          index = this.selectednode.indexOf(tempTabs[0].originalValue)
        }
        delete this.tabsdict[name]
        if (index > -1) {
          this.selectednode.splice(index, 1)
        }
        let IndexId = -1
        this.tabs.map(function (el, index) {
          if (el.name === name) {
            IndexId = index
          }
        })
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

        this.tabs = this.tabs.filter(function (el, index) {
          return el.name !== name
        })
        this.selected = 'help'
        if (this.tabs[IndexId - 1]) {
          this.selected = this.tabs[IndexId - 1].name
        }
        try {
          if (window.document.getElementById(Id)) {
            window.document.getElementById(Id).remove()
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        this.$q.notify({
          position: 'top',
          progress: true,
          message: 'You can\'t remove help tab!',
          color: 'warning',
          multiLine: true
        })
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
      // if the target is null then alert user re click the tree
      // generate unique key reflect
      if (target === null) {
        this.$q.notify({
          position: 'top',
          progress: true,
          message: 'Please re click the node, It can\'t be null !',
          color: 'warning',
          multiLine: true
        })
        this.selected = null
        return
      }
      const serverid = parseInt(target.split('_')[0])
      const originalTarget = target
      // add a friendly tab name
      const RandomId = this.makeid(10)
      // this.tabs.push()
      // this.selected = target
      this.loginToWebterminal(serverid, originalTarget, {
        name: target,
        id: RandomId,
        serverid: serverid,
        OriTarget: this.tree_map[serverid],
        CurrentIndex: 0,
        username: '',
        password: '',
        loginuser: ''
      })
    },
    updatetab (value) {
      // console.log(value)
    },
    fetchData () {
      const that = this
      this.can_login_usernames = []
      this.$axios.get('/permission/api/getcommandlisttree/').then(res => {
        that.tree = res.data.tree
        that.tree_map = res.data.tree_map
        that.can_login_usernames = res.data.can_login_usernames
      }).then(() => {
        that.$refs.servertree.expandAll()
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
      const targetKey = target
      this.$axios.post('/common/api/getdynamicpassword/', { serverid: serverid, username: loginuser }).then(res => {
        target = this.tree_map[serverid]
        const OriTarget = target
        let CurrentIndex = 0
        let CurrentIndexArray = []
        this.tabs.map((item) => {
          if (item.OriTarget === target) {
            CurrentIndexArray.push(item.CurrentIndex)
          }
        })
        CurrentIndexArray = CurrentIndexArray.sort(function (a, b) {
          return a - b
        })
        if (CurrentIndexArray.length > 1) {
          CurrentIndex = CurrentIndexArray[CurrentIndexArray.length - 1] + 1
          if (CurrentIndex === 0) {
            // eslint-disable-next-line no-self-assign
            target = target
          } else {
            target = target + ' (' + CurrentIndex + ')'
          }
        } else {
          if (CurrentIndexArray.length === 1) {
            target = target + ' (' + CurrentIndex + ')'
          } else {
            target = OriTarget
          }
        }
        that.tabsdict[target] = tabobj.id
        tabobj.username = res.data.data.username
        tabobj.password = res.data.data.password
        tabobj.protocol = res.data.data.protocol
        tabobj.loginuser = loginuser
        tabobj.ip = res.data.data.ip
        tabobj.originalValue = targetKey
        tabobj.name = target
        tabobj.CurrentIndex = CurrentIndex
        if (that.$refs.servertree.getNodeByKey(targetKey)) {
          tabobj.commandid = that.$refs.servertree.getNodeByKey(targetKey).commandid
        }
        that.tabs.push(tabobj)
        that.selected = tabobj.name
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
  created () {
    if (this.tabs.length > 0 && this.selected !== null) {
      this.selected = 'help'
    }
    this.fetchData()
  },
  components: {
    Terminal
  }
}
</script>

<style scoped>

</style>
