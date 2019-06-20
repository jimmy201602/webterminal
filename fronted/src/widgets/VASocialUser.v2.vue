<template>
  <!-- Widget: user widget style 1 -->
  <div class="box box-widget widget-user-2">
    <!-- Add the bg color to the header using any of the bg-* classes -->
    <div class="widget-user-header bg-yellow">
      <div class="widget-user-image">
        <img class="img-circle" :src="profileImage" alt="User Avatar">
      </div>
      <!-- /.widget-user-image -->
      <h3 class="widget-user-username">{{ name }}</h3>
      <h5 class="widget-user-desc">{{ description }}</h5>
    </div>
    <div class="box-footer no-padding">
      <ul class="nav nav-stacked">
        <li v-for="item in list"><a href="#">{{ item.name }} <span class="pull-right badge" :class="item.badge.theme">{{ item.badge.count }}</span></a></li>
      </ul>
    </div>
  </div>
  <!-- /.widget-user -->
</template>

<script>
export default {
  name: 'va-social-user-v2',
  props: {
    name: {
      type: String
    },
    description: {
      type: String
    },
    profileImage: {
      type: String
    },
    list: {
      type: Array
    }
  },
  created () {

  }
}
</script>
