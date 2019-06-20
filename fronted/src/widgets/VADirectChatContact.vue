<template>
  <li>
    <a href="#">
      <img class="contacts-list-img" :src="profileImage" alt="User Image">

      <div class="contacts-list-info">
            <span class="contacts-list-name">
              {{ name }}
              <small class="contacts-list-date pull-right">{{ parseDate }}</small>
            </span>
        <span class="contacts-list-msg">{{ latestMessage }}</span>
      </div>
      <!-- /.contacts-list-info -->
    </a>
  </li>
</template>

<script>
export default {
  name: 'DirectChatContact',
  props: {
    name: {
      type: String
    },
    profileImage: {
      type: String
    },
    latestDate: {
      type: Date
    },
    latestMessage: {
      type: String
    }
  },
  computed: {
    parseDate () {
      // TODO: 시간 파싱 개발해야 합니다.
      return this.latestDate.toDateString()
    }
  },
  created () {

  }
}
</script>
