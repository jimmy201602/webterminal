<template>
  <div class="box box-danger">
    <div class="box-header with-border">
      <h3 class="box-title">Latest Members</h3>

      <div class="box-tools pull-right">
        <span class="label label-danger">8 New Members</span>
        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
        </button>
        <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i>
        </button>
      </div>
    </div>
    <!-- /.box-header -->
    <div class="box-body no-padding">
      <ul class="users-list clearfix">
        <li>
          <img src="~admin-lte/dist/img/user1-128x128.jpg" alt="User Image">
          <a class="users-list-name" href="#">Alexander Pierce</a>
          <span class="users-list-date">Today</span>
        </li>
        <li>
          <img src="~admin-lte/dist/img/user8-128x128.jpg" alt="User Image">
          <a class="users-list-name" href="#">Norman</a>
          <span class="users-list-date">Yesterday</span>
        </li>
        <li>
          <img src="~admin-lte/dist/img/user7-128x128.jpg" alt="User Image">
          <a class="users-list-name" href="#">Jane</a>
          <span class="users-list-date">12 Jan</span>
        </li>
        <li>
          <img src="~admin-lte/dist/img/user6-128x128.jpg" alt="User Image">
          <a class="users-list-name" href="#">John</a>
          <span class="users-list-date">12 Jan</span>
        </li>
        <li>
          <img src="~admin-lte/dist/img/user2-160x160.jpg" alt="User Image">
          <a class="users-list-name" href="#">Alexander</a>
          <span class="users-list-date">13 Jan</span>
        </li>
        <li>
          <img src="~admin-lte/dist/img/user5-128x128.jpg" alt="User Image">
          <a class="users-list-name" href="#">Sarah</a>
          <span class="users-list-date">14 Jan</span>
        </li>
        <li>
          <img src="~admin-lte/dist/img/user4-128x128.jpg" alt="User Image">
          <a class="users-list-name" href="#">Nora</a>
          <span class="users-list-date">15 Jan</span>
        </li>
        <li>
          <img src="~admin-lte/dist/img/user3-128x128.jpg" alt="User Image">
          <a class="users-list-name" href="#">Nadia</a>
          <span class="users-list-date">15 Jan</span>
        </li>
      </ul>
      <!-- /.users-list -->
    </div>
    <!-- /.box-body -->
    <div class="box-footer text-center">
      <a href="javascript:void(0)" class="uppercase">View All Users</a>
    </div>
    <!-- /.box-footer -->
  </div>
</template>

<script>
export default {
  name: 'UserList',
  created () {

  }
}
</script>
