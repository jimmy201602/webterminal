<template>
  <!-- Chat box -->
  <div class="box box-success">
    <div class="box-header">
      <i class="fa fa-comments-o"></i>

      <h3 class="box-title">Chat</h3>

      <div class="box-tools pull-right" data-toggle="tooltip" title="Status">
        <div class="btn-group" data-toggle="btn-toggle">
          <button type="button" class="btn btn-default btn-sm active"><i class="fa fa-square text-green"></i>
          </button>
          <button type="button" class="btn btn-default btn-sm"><i class="fa fa-square text-red"></i></button>
        </div>
      </div>
    </div>
    <div class="box-body chat id-chat-box">
      <!-- chat item -->
      <div class="item">
        <img src="~admin-lte/dist/img/user4-128x128.jpg" alt="user image" class="online">

        <p class="message">
          <a href="#" class="name">
            <small class="text-muted pull-right"><i class="fa fa-clock-o"></i> 2:15</small>
            Mike Doe
          </a>
          I would like to meet you to discuss the latest news about
          the arrival of the new theme. They say it is going to be one the
          best themes on the market
        </p>
        <div class="attachment">
          <h4>Attachments:</h4>

          <p class="filename">
            Theme-thumbnail-image.jpg
          </p>

          <div class="pull-right">
            <button type="button" class="btn btn-primary btn-sm btn-flat">Open</button>
          </div>
        </div>
        <!-- /.attachment -->
      </div>
      <!-- /.item -->
      <!-- chat item -->
      <div class="item">
        <img src="~admin-lte/dist/img/user3-128x128.jpg" alt="user image" class="offline">

        <p class="message">
          <a href="#" class="name">
            <small class="text-muted pull-right"><i class="fa fa-clock-o"></i> 5:15</small>
            Alexander Pierce
          </a>
          I would like to meet you to discuss the latest news about
          the arrival of the new theme. They say it is going to be one the
          best themes on the market
        </p>
      </div>
      <!-- /.item -->
      <!-- chat item -->
      <div class="item">
        <img src="~admin-lte/dist/img/user2-160x160.jpg" alt="user image" class="offline">

        <p class="message">
          <a href="#" class="name">
            <small class="text-muted pull-right"><i class="fa fa-clock-o"></i> 5:30</small>
            Susan Doe
          </a>
          I would like to meet you to discuss the latest news about
          the arrival of the new theme. They say it is going to be one the
          best themes on the market
        </p>
      </div>
      <!-- /.item -->
    </div>
    <!-- /.chat -->
    <div class="box-footer">
      <div class="input-group">
        <input class="form-control" placeholder="Type message...">

        <div class="input-group-btn">
          <button type="button" class="btn btn-success"><i class="fa fa-plus"></i></button>
        </div>
      </div>
    </div>
  </div>
  <!-- /.box (chat box) -->
</template>

<script>
export default {
  name: 'ChatBox',
  mounted () {
    var chatBoxElement = this.$el.querySelector('.id-chat-box')
    $(chatBoxElement).slimScroll({
      height: '250px'
    })
  }
}
</script>
