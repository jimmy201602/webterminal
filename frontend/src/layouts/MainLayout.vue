<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
<!--          <q-img-->
<!--            src="../assets/logo.png"-->
<!--            style="background-color: #0b2631;width: 192px;height: 30px"-->
<!--          />-->
          <q-toolbar-title shrink class="text-weight-bold">
            Webterminal
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="primary" :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
                 @click="$q.fullscreen.toggle()"
                 v-if="$q.screen.gt.sm">
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="message" v-if="$q.screen.gt.sm">
            <q-tooltip>Messages</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              {{ message_count}}
            </q-badge>
            <q-menu
            >
              <q-list style="min-width: 100px">
                <messages></messages>
                <q-card class="text-center no-shadow no-border">
                  <q-btn label="View All" style="max-width: 120px !important;" flat dense
                         class="text-indigo-8"></q-btn>
                </q-card>
              </q-list>
            </q-menu>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img :src="userInfo.avatar">
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
            <q-menu>
              <q-list style="min-width: 100px">

                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar>
                      <img :src="userInfo.avatar">
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label lines="1">{{userInfo.username}}</q-item-label>
                    <q-item-label caption lines="4">
                      <span class="text-weight-bold">{{userInfo.role}}</span>
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator inset="item" />
                <q-item clickable v-close-popup>
                  <q-item-section>My Profile</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section @click="Logout">Log Out</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
      :width="240"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item v-for="link in links1" :key="link.text" v-ripple clickable :to="{ name: link.name }" active-class="my-menu-link" :active="linked === link.icon " @click="linked = link.icon">
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t(link.text) }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" v-show="links2.length > 0"/>

          <q-item v-for="link in links2" :key="link.text" v-ripple clickable active-class="my-menu-link" :to="{ name: link.name }" :active="linked === link.icon " @click="linked = link.icon">
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t(link.text) }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-mt-md q-mb-xs" v-show="links3.length > 0"/>

          <q-item v-for="link in links3" :key="link.text" v-ripple clickable active-class="my-menu-link" :to="{ name: link.name }" :active="linked === link.icon " @click="linked = link.icon">
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t(link.text) }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-mt-md q-mb-lg" />

          <div class="q-px-md text-grey-9">
            <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
              <a
                v-for="button in buttons1"
                :key="button.text"
                class="YL__drawer-footer-link"
                :href="'/#/'+button.name"
              >
                {{ button.text }}
              </a>
            </div>
          </div>
          <div class="q-py-md q-px-md text-grey-9">
            <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
              <a
                v-for="button in buttons2"
                :key="button.text"
                class="YL__drawer-footer-link"
                :href="'/#/'+button.name"
              >
                {{ button.text }}
              </a>
            </div>
          </div>
          <div class="q-py-md q-px-md text-grey-9">
            <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
              © 2021 Webterminal
            </div>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import { fabYoutube } from '@quasar/extras/fontawesome-v5'
import Messages from './Messages'
export default {
  name: 'MyLayout',
  data () {
    return {
      linked: '',
      leftDrawerOpen: false,
      links1: [],
      links2: [],
      links3: [],
      buttons1: [
        { text: 'About', name: 'about' },
        // { text: 'Copyright', name: '' },
        { text: 'Contact us', name: 'contact' }
        // { text: 'Creators', name: '' }
      ],
      buttons2: [
        // { text: 'Privacy', name: '' },
        // { text: 'Test new features', name: '' }
      ],
      message_count: 0
    }
  },
  mounted () {
    // this.fabYoutube = fabYoutube
    // add dynamic permission control
    this.links1 = [
      { icon: 'home', text: 'Webterminal', name: 'home' },
      { icon: 'play_arrow', text: 'Command execution', name: 'play_arrow' },
      { icon: 'playlist_play', text: 'Batch command execution', name: 'playlist_play' }
    ]
    this.links2 = [
      { icon: 'format_list_numbered', text: 'Credential', name: 'credential' },
      { icon: 'devices', text: 'Server', name: 'server' },
      { icon: 'group_work', text: 'Group', name: 'group' },
      { icon: 'list_alt', text: 'Commands', name: 'command' }
    ]
    this.links3 = [
      { icon: 'view_list', text: 'Audit', name: 'log' },
      { icon: 'account_box', text: 'User', name: 'user' },
      { icon: 'lock', text: 'Permission', name: 'permission' },
      { icon: 'settings', text: 'Settings', name: 'setting' }
    ]
    this.getMenuList()
  },
  components: {
    Messages
  },
  computed: {
    userInfo () {
      const info = localStorage.getItem('userinfo')
      if (info) {
        return JSON.parse(info)
      } else {
        // return a default value to avoid error
        return {
          username: 'Anonymous',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          role: 'Developer'
        }
      }
    }
  },
  methods: {
    Logout () {
      this.$store.dispatch('Logout')
    },
    getMenuList () {
      const that = this
      this.$axios.get('/permission/api/getmenulist/').then(res => {
        that.links1 = res.data.links1
        that.links2 = res.data.links2
        that.links3 = res.data.links3
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="sass">
  .YL
    &__toolbar-input-container
      min-width: 100px
      width: 55%
    &__toolbar-input-btn
      border-radius: 0
      border-style: solid
      border-width: 1px 1px 1px 0
      border-color: rgba(0,0,0,.24)
      max-width: 60px
      width: 100%
    &__drawer-footer-link
      color: inherit
      text-decoration: none
      font-weight: 500
      font-size: .75rem
      &:hover
        color: #000
  .my-menu-link
    color: white
    background: #ccc
</style>
