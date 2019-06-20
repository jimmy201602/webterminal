<template>

  <!-- TO DO List -->
  <div class="box box-primary">
    <div class="box-header">
      <i class="ion ion-clipboard"></i>

      <h3 class="box-title">To Do List</h3>

      <div class="box-tools pull-right">
        <ul class="pagination pagination-sm inline">
          <li><a href="#">&laquo;</a></li>
          <li><a href="#">1</a></li>
          <li><a href="#">2</a></li>
          <li><a href="#">3</a></li>
          <li><a href="#">&raquo;</a></li>
        </ul>
      </div>
    </div>
    <!-- /.box-header -->
    <div class="box-body">
      <ul class="todo-list">
        <li>
          <!-- drag handle -->
              <span class="handle">
                <i class="fa fa-ellipsis-v"></i>
                <i class="fa fa-ellipsis-v"></i>
              </span>
          <!-- checkbox -->
          <input type="checkbox" value="">
          <!-- todo text -->
          <span class="text">Design a nice theme</span>
          <!-- Emphasis label -->
          <small class="label label-danger"><i class="fa fa-clock-o"></i> 2 mins</small>
          <!-- General tools such as edit or delete-->
          <div class="tools">
            <i class="fa fa-edit"></i>
            <i class="fa fa-trash-o"></i>
          </div>
        </li>
        <li>
              <span class="handle">
                <i class="fa fa-ellipsis-v"></i>
                <i class="fa fa-ellipsis-v"></i>
              </span>
          <input type="checkbox" value="">
          <span class="text">Make the theme responsive</span>
          <small class="label label-info"><i class="fa fa-clock-o"></i> 4 hours</small>
          <div class="tools">
            <i class="fa fa-edit"></i>
            <i class="fa fa-trash-o"></i>
          </div>
        </li>
        <li>
              <span class="handle">
                <i class="fa fa-ellipsis-v"></i>
                <i class="fa fa-ellipsis-v"></i>
              </span>
          <input type="checkbox" value="">
          <span class="text">Let theme shine like a star</span>
          <small class="label label-warning"><i class="fa fa-clock-o"></i> 1 day</small>
          <div class="tools">
            <i class="fa fa-edit"></i>
            <i class="fa fa-trash-o"></i>
          </div>
        </li>
        <li>
              <span class="handle">
                <i class="fa fa-ellipsis-v"></i>
                <i class="fa fa-ellipsis-v"></i>
              </span>
          <input type="checkbox" value="">
          <span class="text">Let theme shine like a star</span>
          <small class="label label-success"><i class="fa fa-clock-o"></i> 3 days</small>
          <div class="tools">
            <i class="fa fa-edit"></i>
            <i class="fa fa-trash-o"></i>
          </div>
        </li>
        <li>
              <span class="handle">
                <i class="fa fa-ellipsis-v"></i>
                <i class="fa fa-ellipsis-v"></i>
              </span>
          <input type="checkbox" value="">
          <span class="text">Check your messages and notifications</span>
          <small class="label label-primary"><i class="fa fa-clock-o"></i> 1 week</small>
          <div class="tools">
            <i class="fa fa-edit"></i>
            <i class="fa fa-trash-o"></i>
          </div>
        </li>
        <li>
              <span class="handle">
                <i class="fa fa-ellipsis-v"></i>
                <i class="fa fa-ellipsis-v"></i>
              </span>
          <input type="checkbox" value="">
          <span class="text">Let theme shine like a star</span>
          <small class="label label-default"><i class="fa fa-clock-o"></i> 1 month</small>
          <div class="tools">
            <i class="fa fa-edit"></i>
            <i class="fa fa-trash-o"></i>
          </div>
        </li>
      </ul>
    </div>
    <!-- /.box-body -->
    <div class="box-footer clearfix no-border">
      <button type="button" class="btn btn-default pull-right"><i class="fa fa-plus"></i> Add item</button>
    </div>
  </div>
  <!-- /.box -->

</template>

<script>

export default {
  name: 'TodoList',
  mounted () {
    // jQuery UI sortable for the todo list
    $(this.$el).find('.todo-list').sortable({
      placeholder: 'sort-highlight',
      handle: '.handle',
      forcePlaceholderSize: true,
      zIndex: 999999
    })
    /* The todo list plugin */
    $(this.$el).find('.todo-list').todolist({
      onCheck: function (ele) {
        window.console.log('The element has been checked')
        return ele
      },
      onUncheck: function (ele) {
        window.console.log('The element has been unchecked')
        return ele
      }
    })
  }
}
</script>
