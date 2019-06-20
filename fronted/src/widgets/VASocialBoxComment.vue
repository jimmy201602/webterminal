<template>
  <div class="box-comment">
    <!-- User image -->
    <img class="img-circle img-sm" :src="profileImage" alt="User Image">

    <div class="comment-text">
          <span class="username">
            {{ name }}
            <span class="text-muted pull-right">{{ parseDate }}</span>
          </span><!-- /.username -->
      {{ text }}
    </div>
    <!-- /.comment-text -->
  </div>
</template>

<script>
export default {
  name: 'SocialBoxComment',
  props: {
    name: {
      type: String
    },
    profileImage: {
      type: String
    },
    date: {
      type: Date
    },
    text: {
      type: String
    }
  },
  computed: {
    parseDate () {
      // TODO: 시간 파싱 개발해야 합니다.
      return this.date.toDateString()
    }
  },
  created () {

  }
}
</script>
