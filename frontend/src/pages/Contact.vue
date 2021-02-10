<template>
  <q-layout view="lHh lpr lFf">
    <q-page-container>
      <q-page>
      <div class="row" id="id_about_us">
        <div class="col-md-12 col-lg-12 col-xs-12 col-sm-12">
          <h5 class="text-center">{{$t('Contact Us')}}
            <br>
            <span
              class="text-center text-grey text-h6">{{$t('Email')}}: <q-btn flat no-caps size="lg" type="a" href="mailto:zhengge2012@gmail.com">zhengge2012@gmail.com</q-btn></span>
          </h5>
        </div>
      </div>
        <q-toolbar class="flex flex-center text-white" >
          <div class="q-pa-sm q-gutter-sm">
            <q-btn round type="a" href="https://github.com/jimmy201602/webterminal"
                   :style="'background:'+ theme_color +'; color: white !important;'" icon="fab fa-github" />
            <q-btn round type="a" href="mailto:zhengge2012@gmail.com"
                   :style="'background:'+ theme_color +'; color: white !important;'" icon="email" />
          </div>
        </q-toolbar>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'Contact',
  data () {
    return {
      theme_color: 'rgb(0, 163, 82)'
    }
  }
}
</script>
