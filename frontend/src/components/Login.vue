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
        <li class="tips01" v-show="tips" style="font-size: small">{{$t('Please input the correct username or password')}}!</li>
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
  <q-dialog v-model="prompt">
    <q-card style="min-width: 400px;" dark>
      <q-form @submit.prevent="Login">
        <q-card-section class="text-center text-h6">{{ $t('Two Factor Token') }}</q-card-section>

        <q-card-section>
          <q-input
            autofocus
            outlined
            v-model="otp_token"
            dark
            :rules="[val => (val && val.length > 0) || $t('This field is required')]"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Submit" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
  <q-dialog
    v-model="mfasetting"
    full-width
    full-height
    :maximized="true"
  >
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ $t('Two Factor MFA setting') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <div class="q-pa-md">
          <q-list separator>
            <q-item>
              <p>{{ $t('If you set up 2 - Step Verification, you should install') }} <a href="javascript:" class="qr-modal" @click="showGa" style="color: #3DA8F5;">{{$t('Google Authenticator')}}</a>.</p>
            </q-item>
            <q-item>
              <q-item-section side>
                <q-avatar square style="width: 150px;height: auto">
                  <img
                    v-if="qrcode !== null"
                    :src="qrcode"
                    :ratio="1"
                    class="q-mt-md"
                    style="width: 150px"
                  />
                  <a v-if="qrcode === null" style="font-size: small">{{message}}</a>
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <div class="q-pa-md">
                  <div class="q-gutter-y-md column" style="max-width: 400px">
                    <q-input
                      outlined
                      v-model="mfacode"
                      :label="$t('Verify code')"
                    >
                      <template v-slot:after>
                        <q-btn color="primary" @click="bindMfa">{{ $t('Bind MFA') }}</q-btn>
                      </template>
                    </q-input>
                    <br/>
                    {{ $t('Scan the QR code on the left then you can obtain the verify code.') }}
                  </div>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="showDownloadLink">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ $t('Download Google Authenticator')}}</div>
      </q-card-section>

      <q-card-section class="q-pt-none" style="min-width: 420px">
        <div class="qr-image-goog-auth" ></div>
        <p class="qr-tip">{{ $t('Scan QR code to start download')}}</p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</div>
</template>
<script>
import { GetRememberMeToken, removeRememberMeToken, removeToken, SetRememberMeToken } from '../lib/auth'

let resetpasswordaddress = ''
if (process.env.NODE_ENV === 'production') {
  resetpasswordaddress = '/common/password-reset/'
} else {
  resetpasswordaddress = 'http://127.0.0.1:8000/common/password-reset/'
}
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
    },
    remember_password (val, valueold) {
      if (valueold === true) {
        removeRememberMeToken()
      } else {
        this.$q.notify({
          type: 'negative',
          color: 'red-5',
          textColor: 'white',
          multiLine: true,
          message: this.$t('For security concern, remember password function only last one day!'),
          timeout: 5000,
          position: 'top'
        })
      }
    }
  },
  data () {
    return {
      prompt: false,
      remember_password: false,
      tips: false,
      username: null,
      password: null,
      otp_token: null,
      showmodal: false,
      mfasetting: false,
      mfacode: null,
      qrcode: null,
      message: null,
      showDownloadLink: false,
      resetpasswordaddress: resetpasswordaddress
    }
  },
  computed: {
    remember_me_token: function () {
      return GetRememberMeToken()
    }
  },
  methods: {
    bindMfa () {
      if (!this.mfacode) {
        this.$q.notify({
          type: 'negative',
          color: 'red-5',
          textColor: 'white',
          multiLine: true,
          message: this.$t('Please input the mfa code!'),
          timeout: 5000,
          position: 'top'
        })
      } else {
        this.$axios.post('/common/api/bindmfa/', { verify_code: this.mfacode }).then(response => {
          if (response.data.status) {
            removeToken()
            this.mfasetting = false
            this.$q.notify({
              type: 'negative',
              color: 'red-5',
              textColor: 'white',
              multiLine: true,
              message: this.$t('Bind mfa success, please login the user again!'),
              timeout: 5000,
              position: 'top'
            })
          } else {
            this.$q.notify({
              type: 'negative',
              color: 'red-5',
              textColor: 'white',
              multiLine: true,
              message: this.$t('Bind mfa failed, please input a validate verify code!'),
              timeout: 5000,
              position: 'top'
            })
          }
        })
      }
    },
    showGa () {
      this.showDownloadLink = true
    },
    forgetPassword () {
      this.showmodal = true
    },
    getMfaCode () {
      const that = this
      this.$axios.post('/common/api/mfaqrcode/').then(response => {
        if (response.data.status) {
          that.qrcode = `data:image/svg+xml;base64,${response.data.data}`
        } else {
          that.message = response.data.message
        }
      })
    },
    Login () {
      const that = this
      if (that.username && that.password) {
        this.$axios.post('/api/token/', {
          username: that.username,
          password: that.password,
          otp_token: that.otp_token,
          remember_me: that.remember_password,
          remember_me_token: that.remember_me_token
        }).then(res => {
          that.$store.commit('Login', res.data)
          // add rediret handle
          if (res.data.detail === that.$t('redirect otp settings page')) {
            // redirect the page to mfa settings
            that.mfasetting = true
            that.getMfaCode()
            return
          }
          // set remember me token
          if (res.data.remember_me_token) {
            SetRememberMeToken(res.data.remember_me_token)
          }
          if (this.$route.query && this.$route.query.redirect !== 'login') {
            that.$store.commit('SetUserInfo', { username: res.data.username, avatar: 'https://cdn.quasar.dev/img/boy-avatar.png', role: 'Developer', redirect: this.$route.query.redirect })
          } else {
            that.$store.commit('SetUserInfo', { username: res.data.username, avatar: 'https://cdn.quasar.dev/img/boy-avatar.png', role: 'Developer', redirect: null })
          }
        }).catch(function (error) {
          if (error.response.data.detail === that.$t('no otp token') || error.response.data.detail === that.$t('error otop token')) {
            that.prompt = true
            if (error.response.data.detail === that.$t('error otop token')) {
              that.otp_token = null
            }
          } else {
            that.tips = true
            removeToken()
          }
        })
      } else {
        that.tips = true
      }
    }
  },
  created () {
    if (GetRememberMeToken()) {
      this.remember_password = true
      // from server get authenticate user and encrypted password
      this.password = GetRememberMeToken()
      this.$axios.post('/common/api/getrememberusername/', { remember_me_token: GetRememberMeToken() }).then((response) => {
        if (response.data.status) {
          this.username = response.data.username
        } else {
          this.$q.notify({
            type: 'negative',
            color: 'red-5',
            textColor: 'white',
            multiLine: true,
            message: this.$t(response.data.message),
            timeout: 5000,
            position: 'top'
          })
          this.username = null
          this.remember_password = false
          this.password = null
        }
      })
    }
  }
}
</script>
<style scoped>
  @import "../css/login.css";
</style>
<style lang="css" scoped>
.qr-tip{
  font-size: 14px;
  line-height: 80px;
  color: #383838;
  text-align: center;
}
.qr-image-goog-auth {
  background-image: url(../assets/google-authenticator.png);
  background-size: contain;
  width: 200px;
  height: 200px;
  margin: 10px auto;
  display: block;
}
</style>
