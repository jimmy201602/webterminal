<template>
  <div class="q-pa-md">
    <q-tabs
      v-show="otp_switch"
      v-model="selected"
      align="left"
      active-color="primary"
      stretch
      no-caps
      dense
    >
      <q-tab key="setting" v-model="selected"
             name="setting" @click="selected = 'setting'"
      >
        <div>
          {{$t('Setting')}}
        </div>
      </q-tab>
      <q-tab key="mfa" v-model="selected"
             name="mfa" @click="selected = 'mfa'"
      >
        <div>
          {{$t('MFA')}}
        </div>
      </q-tab>
    </q-tabs>
    <q-tab-panels v-model="selected" animated class="fit" keep-alive>
      <q-tab-panel name="setting" key="setting" keep-alive>
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >

            <div class="q-gutter-sm">
              <q-toggle v-model="webterminal_detect" :label="$t('settings.helper_swith')" />
            </div>
            <div class="q-gutter-sm">
              <q-toggle v-model="otp_switch" :label="$t('settings.mfa')" />
            </div>
            <div class="q-gutter-sm">
              <q-toggle v-model="use_tz" :label="$t('settings.use_timezone')" />
            </div>
            <div class="q-gutter-md row">
              <q-select
                style="width: 40%"
                filled
                v-model="timezone"
                use-input
                input-debounce="0"
                :label="$t('settings.timezone')"
                :options="timezonelist"
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
            <div>
              <q-btn :label="$t('Submit')" type="submit" color="primary"/>
              <q-btn :label="$t('Reset')" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>
      </q-tab-panel>
      <q-tab-panel name="mfa" key="mfa" v-show="otp_switch" keep-alive>
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
      </q-tab-panel>
    </q-tab-panels>
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
import * as auth from 'src/lib/auth'

let timezonelist = []
export default {
  name: 'Setting',
  data () {
    return {
      webterminal_detect: false,
      otp_switch: false,
      timezone: null,
      use_tz: false,
      timezonelist: timezonelist,
      selected: 'setting',
      qrcode: null,
      message: null,
      mfacode: null,
      showDownloadLink: false
    }
  },

  methods: {
    onSubmit () {
      this.updateSettings({
        timezone: this.timezone,
        webterminal_detect: this.webterminal_detect,
        otp_switch: this.otp_switch,
        use_tz: this.use_tz
      })
    },
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
            auth.removeToken()
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
            this.$router.push({
              name: 'login'
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
    onReset () {
      this.webterminal_detect = false
      this.otp_switch = false
      this.timezone = null
      this.use_tz = false
    },
    filterFn (val, update) {
      update(() => {
        console.log(val)
        if (val === '') {
          this.timezonelist = timezonelist
        } else {
          const needle = val.toLowerCase()
          this.timezonelist = timezonelist.filter(v => v.toLowerCase().indexOf(needle) > -1)
        }
      })
    },
    fetchtimezonelist () {
      const that = this
      that.loading = true
      timezonelist = []
      this.$axios.get('/common/api/timezonelist/').then(res => {
        that.timezonelist = res.data
        timezonelist = res.data
        that.loading = false
      }).catch(err => {
        console.log(err)
        that.loading = false
      })
    },
    fetchdata () {
      const that = this
      that.loading = true
      this.$axios.get('/common/api/settingslist/').then(res => {
        that.webterminal_detect = res.data.webterminal_detect
        that.otp_switch = res.data.otp_switch
        that.use_tz = res.data.use_tz
        that.timezone = res.data.timezone
        that.loading = false
      }).catch(err => {
        console.log(err)
        that.loading = false
      })
    },
    updateSettings (data) {
      const that = this
      this.$axios.patch('/common/api/settings/', data).then(res => {
        that.$q.notify({
          type: 'positive',
          textColor: 'grey-10',
          multiLine: true,
          message: that.$t('settings.update_settings_success'),
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
    },
    showGa () {
      this.showDownloadLink = true
    }
  },
  created () {
    this.fetchtimezonelist()
    this.fetchdata()
    const that = this
    this.$axios.post('/common/api/mfaqrcode/').then(response => {
      if (response.data.status) {
        that.qrcode = `data:image/svg+xml;base64,${response.data.data}`
      } else {
        that.message = response.data.message
      }
    })
  }
}
</script>

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
