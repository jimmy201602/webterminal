<template>

  <!-- DIRECT CHAT -->
  <div class="box direct-chat" :class="[boxColor, directChatColor]">
    <div class="box-header with-border">
      <h3 class="box-title">Direct Chat</h3>

      <div class="box-tools pull-right">
        <span data-toggle="tooltip" title="3 New Messages" class="badge" :class="badgeColor">3</span>
        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
        </button>
        <button type="button" class="btn btn-box-tool" data-toggle="tooltip" title="Contacts" data-widget="chat-pane-toggle">
          <i class="fa fa-comments"></i></button>
        <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i>
        </button>
      </div>
    </div>
    <!-- /.box-header -->
    <div class="box-body">
      <!-- Conversations are loaded here -->
      <div class="direct-chat-messages">

        <va-direct-chat-item
          v-for="item in talkList"
          :key="item.name"
          :name="item.name"
          :date="item.date"
          :profileImage="item.profileImage"
          :message="item.message"
          :isMine="item.isMine"
        ></va-direct-chat-item>

      </div>
      <!--/.direct-chat-messages-->

      <!-- Contacts are loaded here -->
      <div class="direct-chat-contacts">
        <ul class="contacts-list">
          <va-direct-chat-contact v-for="contact in contacts"
            :key="contact.name"
            :name="contact.name"
            :profileImage="contact.profileImage"
            :latestDate="contact.latestDate"
            :latestMessage="contact.latestMessage"
          ></va-direct-chat-contact>
        </ul>
        <!-- /.contatcts-list -->
      </div>
      <!-- /.direct-chat-pane -->
    </div>
    <!-- /.box-body -->
    <div class="box-footer">
      <form action="#" method="post">
        <div class="input-group">
          <input type="text" name="message" :placeholder="placeholder" class="form-control">
              <span class="input-group-btn">
                <button type="button" class="btn btn-warning btn-flat">Send</button>
              </span>
        </div>
      </form>
    </div>
    <!-- /.box-footer-->
  </div>
  <!--/.direct-chat -->
</div>

</template>

<script>
import VADirectChatItem from './VADirectChatItem.vue'
import VADirectChatContact from './VADirectChatContact.vue'

export default {
  name: 'va-direct-chat',
  props: {
    theme: {
      type: String,
      default: 'primary'
    },
    talkList: {
      type: Array
    },
    contacts: {
      type: Array
    },
    title: {
      type: String
    },
    badgeCount: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: 'Type Message ...'
    }
  },
  computed: {
    badgeColor () {
      switch (this.theme) {
        case 'primary':
          return 'bg-light-blue'
        case 'success':
          return 'bg-green'
        case 'warning':
          return 'bg-yellow'
        case 'danger':
          return 'bg-red'
        default:
          return 'bg-light-blue'
      }
    },
    boxColor () {
      switch (this.theme) {
        case 'primary':
        case 'success':
        case 'warning':
        case 'danger':
          return `box-${this.theme}`
        default:
          return 'box-primary'
      }
    },
    directChatColor () {
      switch (this.theme) {
        case 'primary':
        case 'success':
        case 'warning':
        case 'danger':
          return `direct-chat-${this.theme}`
        default:
          return 'direct-chat-primary'
      }
    }
  },
  created () {

  },
  components: {
    'va-direct-chat-item': VADirectChatItem,
    'va-direct-chat-contact': VADirectChatContact
  }
}
</script>
