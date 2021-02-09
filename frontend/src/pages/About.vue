<template>
  <q-layout view="lHh lpr lFf">
    <q-page-container>
      <q-page>
      <div class="row" id="id_about_us">
        <div class="col-md-12 col-lg-12 col-xs-12 col-sm-12">
          <h5 class="text-center">{{$t('About Us')}}
            <br>
            <span
              class="text-center text-grey text-h6">{{$t('Our mission is to give everyone a full control platform to manage all your it asset.')}}</span>
          </h5>
        </div>
      </div>
      <div class="row text-center flex flex-center">
        <div class="col-md-12 col-lg-12 col-sx-12 col-sm-12 q-gutter-md flex flex-center">
          <div class="col-md-4 col-lg-4 col-sx-12 col-sm-12">
            <q-card @mouseover="hoverOver(1)" @mouseout="hoverOutTimeout(1)" style="border: none;" class="my-card text-center box-shadow" flat bordered>
              <q-img
                src="/statics/images/about_1.jpg"
              />

              <q-card-section>
                <div class="text-overline text-orange-9">Overline</div>
                <div :class="about_heading_1" :style="'color: ' + about_heading_color_1" class="about_heading_1 text-h6 q-mt-sm q-mb-xs">OFFICE PHILOSOPHY</div>
                <div class="text-caption text-grey-9">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-4 col-lg-4 col-sx-12 col-sm-12">
            <q-card @mouseover="hoverOver(2)" @mouseout="hoverOutTimeout(2)" :style="'color: ' + about_heading_color_2" style="border: none;" class="my-card text-center box-shadow" flat bordered>
              <q-img
                src="/statics/images/about_2.jpg"
              />

              <q-card-section>
                <div class="text-overline text-orange-9">Overline</div>
                <div :class="about_heading_2" :style="'color: ' + about_heading_color_2" class="text-h6 q-mt-sm q-mb-xs">OFFICE MISSION</div>
                <div class="text-caption text-grey-9">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-4 col-lg-4 col-sx-12 col-sm-12">
            <q-card @mouseover="hoverOver(3)" @mouseout="hoverOutTimeout(3)" style="border: none;" class="my-card text-center box-shadow" flat bordered>
              <q-img
                src="/statics/images/about_3.jpg"
              />

              <q-card-section>
                <div class="text-overline text-orange-9">Overline</div>
                <div :class="about_heading_3" :style="'color: ' + about_heading_color_3" class="text-h6 q-mt-sm q-mb-xs">OFFICE VALUE & RULES</div>
                <div class="text-caption text-grey-9">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua.
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      theme_color: '',
      about_heading_1: [],
      about_heading_2: [],
      about_heading_3: [],
      about_heading_color_1: '#424242',
      about_heading_color_2: '#424242',
      about_heading_color_3: '#424242'
    }
  },
  methods: {
    hoverOver: function (index) {
      this['about_heading_color_' + index] = this.theme_color
      this['about_heading_' + index] = ['animated', 'bounceIn']
    },
    hoverOutTimeout: function (index) {
      this['about_heading_color_' + index] = '#424242'
      setTimeout(() => {
        this['about_heading_' + index] = []
      }, 1000)
    }
  }
}
</script>

<style lang="sass" scoped>
    .my-header
      width: 200px
      top: 0
      height: 45px
      color: black
      background-color: rgba(255,255,255, 0.8)
      text-transform: uppercase
      text-align: center
      font-size: 17px
      margin: 20px 0 0 68px
      padding: 25px

    .my-text
      width: 100%
      top: 0
      height: 90px
      color: white
      text-align: center
      font-size: 15px
      margin: 79px 0 0 0
      padding: 20px
      line-height: normal
      font-family: Georgia, serif
      font-style: italic

    .box-shadow:hover
      box-shadow: 0 10px 13px -6px rgba(0, 0, 0, 0.2), 0 20px 31px 3px rgba(0, 0, 0, 0.14), 0 8px 38px 7px rgba(0, 0, 0, 0.12) !important;

    .my-card
      width: 350px
      max-width: 350px
      margin-top: 10px
</style>
