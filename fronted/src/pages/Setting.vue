<template>
  <div class="q-pa-md">

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
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script>
let timezonelist = []
export default {
  name: 'Setting',
  data () {
    return {
      webterminal_detect: false,
      otp_switch: false,
      timezone: null,
      use_tz: false,
      timezonelist: timezonelist
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
    }
  },
  created () {
    this.fetchtimezonelist()
    this.fetchdata()
  }
}
</script>

<style scoped>

</style>
