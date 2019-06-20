<template>
  <div class="direct-chat-msg" :class="isMine?'':'right'">
    <div class="direct-chat-info clearfix">
      <span class="direct-chat-name" :class="isMine?'pull-right':'pull-left'">{{ name }}</span>
      <span class="direct-chat-timestamp pull-right" :class="isMine?'pull-left':'pull-right'">{{ parseDate }}</span>
    </div>
    <!-- /.direct-chat-info -->
    <img class="direct-chat-img" :src="profileImage" alt="message user image"><!-- /.direct-chat-img -->
    <div class="direct-chat-text">
      {{ message }}
    </div>
    <!-- /.direct-chat-text -->
  </div>
</template>

<script>
export default {
  name: 'DirectChatItem',
  props: {
    name: {
      type: String
    },
    date: {
      type: Date
    },
    profileImage: {
      type: String
    },
    message: {
      type: String
    },
    isMine: {
      type: Boolean
    }
  },
  computed: {
    parseDate () {
      return this.date
    }
  },
  created () {

  }
}
</script>
