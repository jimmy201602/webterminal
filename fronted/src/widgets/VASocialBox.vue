<template>
  <!-- Box Comment -->
    <div class="box box-widget">
      <div class="box-header with-border">
        <div class="user-block">
          <img class="img-circle" :src="profileImage" alt="User Image">
          <span class="username"><a href="#">{{ name }}</a></span>
          <span class="description">{{ description }}</span>
        </div>
        <!-- /.user-block -->
        <div class="box-tools">
          <button type="button" class="btn btn-box-tool" data-toggle="tooltip" :title="readTooltipTitle">
            <i class="fa fa-circle-o"></i></button>
          <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
          </button>
          <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
        </div>
        <!-- /.box-tools -->
      </div>
      <!-- /.box-header -->
      <div class="box-body">
        <img v-for="image in images" class="img-responsive pad" :src="image" alt="Photo">

        <p>{{ text }}</p>

        <!-- Attachment -->
        <div class="attachment-block clearfix" v-for="attachment in attachments">
          <img class="attachment-img" :src="attachment.image" alt="Attachment Image">

          <div class="attachment-pushed">
            <h4 class="attachment-heading"><a :href="attachment.url">{{attachment.title}}</a></h4>

            <div class="attachment-text">
              {{ attachment.text }}<a href="#">more</a>
            </div>
            <!-- /.attachment-text -->
          </div>
          <!-- /.attachment-pushed -->
        </div>
        <!-- /.attachment-block -->

        <!-- <button type="button" class="btn btn-default btn-xs"><i class="fa fa-share"></i> Share</button> -->
        <button v-for="button in buttons" type="button" class="btn btn-default btn-xs" @click="button.onClick"><i :class="button.theme"></i> {{ button.name }}</button>
        <span class="pull-right text-muted">{{ likeCount }} likes - {{ commentCount }} comments</span>
      </div>
      <!-- /.box-body -->
      <div class="box-footer box-comments">
        <va-social-box-comment v-for="comment in comments"
          :name="comment.name"
          :profileImage="comment.profileImage"
          :text="comment.text"
          :date="comment.date"
        ></va-social-box-comment>
      </div>
      <!-- /.box-footer -->
      <div class="box-footer">
        <form action="#" method="post">
          <img class="img-responsive img-circle img-sm" :src="profileImage" alt="Alt Text">
          <!-- .img-push is used to add margin to elements next to floating images -->
          <div class="img-push">
            <input type="text" class="form-control input-sm" :placeholder="placeholder">
          </div>
        </form>
      </div>
      <!-- /.box-footer -->
    </div>
    <!-- /.box -->
</template>

<script>
import VASocialBoxComment from './VASocialBoxComment.vue'

export default {
  name: 'va-social-box',
  props: {
    profileImage: {
      type: String
    },
    name: {
      type: String
    },
    description: {
      type: String
    },
    readTooltipTitle: {
      type: String,
      default: 'Mark as read'
    },
    images: {
      type: Array
    },
    text: {
      type: String
    },
    buttons: {
      type: Array
    },
    likeCount: {
      type: Number
    },
    commentCount: {
      type: Number
    },
    comments: {
      type: Array
    },
    placeholder: {
      type: String,
      default: 'Press enter to post comment'
    },
    attachments: {
      type: Array
    }
  },
  created () {

  },
  components: {
    'va-social-box-comment': VASocialBoxComment
  }
}

</script>
