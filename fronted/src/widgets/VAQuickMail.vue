<template>

  <!-- quick email widget -->
  <div class="box box-info">
    <div class="box-header">
      <i class="fa fa-envelope"></i>

      <h3 class="box-title">Quick Email</h3>
      <!-- tools box -->
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" data-widget="remove" data-toggle="tooltip" title="Remove">
          <i class="fa fa-times"></i></button>
      </div>
      <!-- /. tools -->
    </div>
    <div class="box-body">
      <form action="#" method="post">
        <div class="form-group">
          <input type="email" class="form-control" name="emailto" placeholder="Email to:">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" name="subject" placeholder="Subject">
        </div>
        <div>
          <textarea class="textarea" placeholder="Message" style="width: 100%; height: 125px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>
        </div>
      </form>
    </div>
    <div class="box-footer clearfix">
      <button type="button" class="pull-right btn btn-default" id="sendEmail">Send
        <i class="fa fa-arrow-circle-right"></i></button>
    </div>
  </div>

</template>

<script>

export default {
  name: 'QuickMail',
  mounted () {
    // bootstrap WYSIHTML5 - text editor
    $('.textarea').wysihtml5()
  }
}

</script>
