<template>
  <div >
    <q-card>
      <q-card-section>
        <div v-for="(line, index) in lines" :key="index" class="row">
          <div class="col-lg-6">
            <div class="row">
              <div class="col-2">
                <q-select
                  v-model="line.countryCode"
                  label="Country Code"
                  :options="countryPhoneCodes"
                />
              </div>
              <div class="col-10">
                <q-input
                  v-model="line.number"
                  label="Phone Number"
                  placeholder="5551234567"
                  type="tel"
                  value=""
                />
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <q-select
              v-model="line.phoneUsageType"
              label="Type of Usage"
              :options="phoneUsageTypes"
            />
          </div>

          <div class="col-lg-2">
            <div class="block float-right">
              <q-btn round @click="removeLine(index)" icon="delete" />
              <q-btn round v-if="index + 1 === lines.length" @click="addLine" icon="playlist-plus" />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

  </div>
</template>

<script>
export default {
  name: 'PhoneNumberLine',
  data () {
    return {
      lines: [],
      blockRemoval: true,
      phoneUsageTypes: [
        {
          label: 'Home', value: 'home'
        }, {
          label: 'Work', value: 'work'
        }, {
          label: 'Mobile', value: 'mobile'
        }, {
          label: 'Fax', value: 'fax'
        }
      ],
      countryPhoneCodes: [
        {
          label: '+90',
          value: '+90'
        }, {
          label: '+1',
          value: '+1'
        }
      ]
    }
  },
  watch: {
    lines () {
      this.blockRemoval = this.lines.length <= 1
    }
  },
  methods: {
    addLine () {
      const checkEmptyLines = this.lines.filter(line => line.number === null)
      if (checkEmptyLines.length >= 1 && this.lines.length > 0) {
        return
      }
      this.lines.push({
        countryCode: null,
        number: null,
        phoneUsageType: null
      })
      console.log(this.lines)
    },
    removeLine (lineId) {
      if (!this.blockRemoval) {
        this.lines.splice(lineId, 1)
      }
    }
  },
  mounted () {
    this.addLine()
    this.lines.push({
      countryCode: { label: '+90', value: '+90' },
      number: 11111111111,
      phoneUsageType: { label: 'Fax', value: 'fax' }
    })
  }
}
</script>
