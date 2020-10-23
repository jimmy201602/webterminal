<template>
<div class="login_page">
  <!--
     作者：offline
     时间：2020-01-03
     描述：头部
   -->
  <div class="header">
    <div id="logo"><img src="../assets/logo.png" width="192" height="30"></div>
    <div class="lag_select">
      <a href="#"><img src="../assets/ch.png" width="38" height="19">CH</a>
      <a href="#"><img src="../assets/en.png" width="38" height="19">EN</a>
    </div>
  </div>
  <!--
       作者：offline
       时间：2020-01-03
       描述：登录表单内容
     -->
  <div class="content">
<!--    <img src="../assets/title.png" width="312" height="74" style="position: center;">-->
    <div style="font-size: large;width: 312px;height: 44px;position: center;margin-left: 50px">{{$t('Welcome come back')}}!</div>
    <ul class="form_list">
      <form action="" method="post">
        <li class="tips01" v-show="tips" style="font-size: small">{{$t('Please the input correct username or password')}}!</li>
        <li><input class="txt_bag" type="text" :placeholder="$t('Username/Email')" v-model="username"></li>
        <li>
          <input class="txt_bag" type="password" :placeholder="$t('Please input your password')" v-model="password">
          <div class="auto_login">
            <a class="reset-password" @click="forgetPassword">{{$t('Forgotten Password')}}</a>
            <input id="color-input" class="chat-button-location-radio-input" type="checkbox" name="color-input" v-model="remember_password" />
            <label for="color-input"></label><span>{{$t('Remember me')}}</span>
          </div>
        </li>
        <li><input class="login_btn" type="button" :value="$t('Login')" @click="Login"></li>
      </form>
    </ul>
  </div>
  <div id="footer-bg">&nbsp;</div>
  <q-dialog
    v-model="showmodal"
    full-width
    full-height
    :maximized="true"
    draggable="true"
  >
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <div style="margin:0px;padding:0px;overflow:hidden">
          <iframe
            :src="resetpasswordaddress"
            frameborder="0"
            allowfullscreen
            style="overflow:hidden;height:92vh;width:100%;"
          ></iframe>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</div>
</template>
<script>
let resetpasswordaddress = ''
if (process.env.NODE_ENV === 'production') {
  resetpasswordaddress = '/common/password-reset/'
} else {
  resetpasswordaddress = 'http://127.0.0.1:8000/common/password-reset/'
}
import * as auth from '../lib/auth'
export default {
  name: 'Login',
  watch: {
    username (val, valueold) {
      if (val) {
        this.tips = false
      }
    },
    password (val, valueold) {
      if (val) {
        this.tips = false
      }
    }
  },
  data () {
    return {
      remember_password: false,
      tips: false,
      username: null,
      password: null,
      showmodal: false,
      resetpasswordaddress: resetpasswordaddress
    }
  },
  methods: {
    forgetPassword () {
      this.showmodal = true
    },
    Login () {
      const that = this
      if (that.username && that.password) {
        this.$axios.post('/api/token/', {
          username: that.username,
          password: that.password
        }).then(res => {
          that.$store.commit('Login', res.data)
          // add rediret handle
          if (this.$route.query && this.$route.query.redirect) {
            that.$store.commit('SetUserInfo', { username: 'Jimmy', avatar: 'https://cdn.quasar.dev/img/boy-avatar.png', role: 'Developer', redirect: this.$route.query.redirect })
          } else {
            that.$store.commit('SetUserInfo', { username: 'Jimmy', avatar: 'https://cdn.quasar.dev/img/boy-avatar.png', role: 'Developer', redirect: null })
          }
        }).catch(() => {
          that.tips = true
          auth.removeToken()
        })
      } else {
        that.tips = true
      }
    }
  }
}
</script>
<style scoped>
  @import "../css/login.css";
</style>
