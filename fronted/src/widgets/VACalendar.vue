<template>
  <!-- Calendar -->
  <div class="box box-solid bg-green-gradient">
    <div class="box-header">
      <i class="fa fa-calendar"></i>

      <h3 class="box-title">Calendar</h3>
      <!-- tools box -->
      <div class="pull-right box-tools">
        <!-- button with a dropdown -->
        <div class="btn-group">
          <button type="button" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">
            <i class="fa fa-bars"></i></button>
          <ul class="dropdown-menu pull-right" role="menu">
            <li><a href="#">Add new event</a></li>
            <li><a href="#">Clear events</a></li>
            <li class="divider"></li>
            <li><a href="#">View calendar</a></li>
          </ul>
        </div>
        <button type="button" class="btn btn-success btn-sm" data-widget="collapse"><i class="fa fa-minus"></i>
        </button>
        <button type="button" class="btn btn-success btn-sm" data-widget="remove"><i class="fa fa-times"></i>
        </button>
      </div>
      <!-- /. tools -->
    </div>
    <!-- /.box-header -->
    <div class="box-body no-padding">
      <!--The calendar -->
      <div class="id-calendar" style="width: 100%"></div>
    </div>
    <!-- /.box-body -->
    <div class="box-footer text-black">
      <row>
        <div class="col-sm-6">
          <!-- Progress bars -->
          <div class="clearfix">
            <span class="pull-left">Task #1</span>
            <small class="pull-right">90%</small>
          </div>
          <div class="progress xs">
            <div class="progress-bar progress-bar-green" style="width: 90%;"></div>
          </div>

          <div class="clearfix">
            <span class="pull-left">Task #2</span>
            <small class="pull-right">70%</small>
          </div>
          <div class="progress xs">
            <div class="progress-bar progress-bar-green" style="width: 70%;"></div>
          </div>
        </div>
        <!-- /.col -->
        <div class="col-sm-6">
          <div class="clearfix">
            <span class="pull-left">Task #3</span>
            <small class="pull-right">60%</small>
          </div>
          <div class="progress xs">
            <div class="progress-bar progress-bar-green" style="width: 60%;"></div>
          </div>

          <div class="clearfix">
            <span class="pull-left">Task #4</span>
            <small class="pull-right">40%</small>
          </div>
          <div class="progress xs">
            <div class="progress-bar progress-bar-green" style="width: 40%;"></div>
          </div>
        </div>
        <!-- /.col -->
      </row>
      <!-- /.row -->
    </div>
  </div>
  <!-- /.box -->
</template>

<script>

export default {
  name: 'va-calendar',
  mounted () {
    $(this.$el).find('.id-calendar').datepicker()
  }
}
</script>

<style>

/*!
 * datepicker for Bootstrap
 *
 * Copyright 2012 Stefan Petre
 * Improvements by Andrew Rowls
 * Licensed under the Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 */
.ui-datepicker {
  padding: 4px;
  border-radius: 4px;
  direction: ltr;
  /*.dow {
		border-top: 1px solid #ddd !important;
	}*/
}
.ui-datepicker-inline {
  width: 100%;
}
.ui-datepicker.ui-datepicker-rtl {
  direction: rtl;
}
.ui-datepicker.ui-datepicker-rtl table tr td span {
  float: right;
}
.ui-datepicker-dropdown {
  top: 0;
  left: 0;
}
.ui-datepicker-dropdown:before {
  content: '';
  display: inline-block;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 7px solid #ccc;
  border-top: 0;
  border-bottom-color: rgba(0, 0, 0, 0.2);
  position: absolute;
}
.ui-datepicker-dropdown:after {
  content: '';
  display: inline-block;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #fff;
  border-top: 0;
  position: absolute;
}
.ui-datepicker-dropdown.ui-datepicker-orient-left:before {
  left: 6px;
}
.ui-datepicker-dropdown.ui-datepicker-orient-left:after {
  left: 7px;
}
.ui-datepicker-dropdown.ui-datepicker-orient-right:before {
  right: 6px;
}
.ui-datepicker-dropdown.ui-datepicker-orient-right:after {
  right: 7px;
}
.ui-datepicker-dropdown.ui-datepicker-orient-top:before {
  top: -7px;
}
.ui-datepicker-dropdown.ui-datepicker-orient-top:after {
  top: -6px;
}
.ui-datepicker-dropdown.ui-datepicker-orient-bottom:before {
  bottom: -7px;
  border-bottom: 0;
  border-top: 7px solid #999;
}
.ui-datepicker-dropdown.ui-datepicker-orient-bottom:after {
  bottom: -6px;
  border-bottom: 0;
  border-top: 6px solid #fff;
}
.ui-datepicker > div {
  display: none;
}
.ui-datepicker.days div.ui-datepicker-days {
  display: block;
}
.ui-datepicker.months div.ui-datepicker-months {
  display: block;
}
.ui-datepicker.years div.ui-datepicker-years {
  display: block;
}
.ui-datepicker table {
  margin: 0;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.ui-datepicker table tr td,
.ui-datepicker table tr th {
  text-align: center;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  border: none;
}
.table-striped .ui-datepicker table tr td,
.table-striped .ui-datepicker table tr th {
  background-color: transparent;
}
.ui-datepicker table tr td.day:hover,
.ui-datepicker table tr td.day.focused {
  background: rgba(0,0,0,0.2);
  cursor: pointer;
}
.ui-datepicker table tr td.old,
.ui-datepicker table tr td.new {
  color: #777;
}
.ui-datepicker table tr td.disabled,
.ui-datepicker table tr td.disabled:hover {
  background: none;
  color: #444;
  cursor: default;
}
.ui-datepicker table tr td.today,
.ui-datepicker table tr td.today:hover,
.ui-datepicker table tr td.today.disabled,
.ui-datepicker table tr td.today.disabled:hover {
  color: #000000;
  background: rgba(0,0,0,0.2);
  border-color: #ffb733;
}
.ui-datepicker table tr td.today:hover,
.ui-datepicker table tr td.today:hover:hover,
.ui-datepicker table tr td.today.disabled:hover,
.ui-datepicker table tr td.today.disabled:hover:hover,
.ui-datepicker table tr td.today:focus,
.ui-datepicker table tr td.today:hover:focus,
.ui-datepicker table tr td.today.disabled:focus,
.ui-datepicker table tr td.today.disabled:hover:focus,
.ui-datepicker table tr td.today:active,
.ui-datepicker table tr td.today:hover:active,
.ui-datepicker table tr td.today.disabled:active,
.ui-datepicker table tr td.today.disabled:hover:active,
.ui-datepicker table tr td.today.active,
.ui-datepicker table tr td.today:hover.active,
.ui-datepicker table tr td.today.disabled.active,
.ui-datepicker table tr td.today.disabled:hover.active,
.open .dropdown-toggle.ui-datepicker table tr td.today,
.open .dropdown-toggle.ui-datepicker table tr td.today:hover,
.open .dropdown-toggle.ui-datepicker table tr td.today.disabled,
.open .dropdown-toggle.ui-datepicker table tr td.today.disabled:hover {
  color: #000000;
  background: rgba(0,0,0,0.2);
  border-color: #f59e00;
}
.ui-datepicker table tr td.today:active,
.ui-datepicker table tr td.today:hover:active,
.ui-datepicker table tr td.today.disabled:active,
.ui-datepicker table tr td.today.disabled:hover:active,
.ui-datepicker table tr td.today.active,
.ui-datepicker table tr td.today:hover.active,
.ui-datepicker table tr td.today.disabled.active,
.ui-datepicker table tr td.today.disabled:hover.active,
.open .dropdown-toggle.ui-datepicker table tr td.today,
.open .dropdown-toggle.ui-datepicker table tr td.today:hover,
.open .dropdown-toggle.ui-datepicker table tr td.today.disabled,
.open .dropdown-toggle.ui-datepicker table tr td.today.disabled:hover {
  background-image: none;
}
.ui-datepicker table tr td.today.disabled,
.ui-datepicker table tr td.today:hover.disabled,
.ui-datepicker table tr td.today.disabled.disabled,
.ui-datepicker table tr td.today.disabled:hover.disabled,
.ui-datepicker table tr td.today[disabled],
.ui-datepicker table tr td.today:hover[disabled],
.ui-datepicker table tr td.today.disabled[disabled],
.ui-datepicker table tr td.today.disabled:hover[disabled],
fieldset[disabled] .ui-datepicker table tr td.today,
fieldset[disabled] .ui-datepicker table tr td.today:hover,
fieldset[disabled] .ui-datepicker table tr td.today.disabled,
fieldset[disabled] .ui-datepicker table tr td.today.disabled:hover,
.ui-datepicker table tr td.today.disabled:hover,
.ui-datepicker table tr td.today:hover.disabled:hover,
.ui-datepicker table tr td.today.disabled.disabled:hover,
.ui-datepicker table tr td.today.disabled:hover.disabled:hover,
.ui-datepicker table tr td.today[disabled]:hover,
.ui-datepicker table tr td.today:hover[disabled]:hover,
.ui-datepicker table tr td.today.disabled[disabled]:hover,
.ui-datepicker table tr td.today.disabled:hover[disabled]:hover,
fieldset[disabled] .ui-datepicker table tr td.today:hover,
fieldset[disabled] .ui-datepicker table tr td.today:hover:hover,
fieldset[disabled] .ui-datepicker table tr td.today.disabled:hover,
fieldset[disabled] .ui-datepicker table tr td.today.disabled:hover:hover,
.ui-datepicker table tr td.today.disabled:focus,
.ui-datepicker table tr td.today:hover.disabled:focus,
.ui-datepicker table tr td.today.disabled.disabled:focus,
.ui-datepicker table tr td.today.disabled:hover.disabled:focus,
.ui-datepicker table tr td.today[disabled]:focus,
.ui-datepicker table tr td.today:hover[disabled]:focus,
.ui-datepicker table tr td.today.disabled[disabled]:focus,
.ui-datepicker table tr td.today.disabled:hover[disabled]:focus,
fieldset[disabled] .ui-datepicker table tr td.today:focus,
fieldset[disabled] .ui-datepicker table tr td.today:hover:focus,
fieldset[disabled] .ui-datepicker table tr td.today.disabled:focus,
fieldset[disabled] .ui-datepicker table tr td.today.disabled:hover:focus,
.ui-datepicker table tr td.today.disabled:active,
.ui-datepicker table tr td.today:hover.disabled:active,
.ui-datepicker table tr td.today.disabled.disabled:active,
.ui-datepicker table tr td.today.disabled:hover.disabled:active,
.ui-datepicker table tr td.today[disabled]:active,
.ui-datepicker table tr td.today:hover[disabled]:active,
.ui-datepicker table tr td.today.disabled[disabled]:active,
.ui-datepicker table tr td.today.disabled:hover[disabled]:active,
fieldset[disabled] .ui-datepicker table tr td.today:active,
fieldset[disabled] .ui-datepicker table tr td.today:hover:active,
fieldset[disabled] .ui-datepicker table tr td.today.disabled:active,
fieldset[disabled] .ui-datepicker table tr td.today.disabled:hover:active,
.ui-datepicker table tr td.today.disabled.active,
.ui-datepicker table tr td.today:hover.disabled.active,
.ui-datepicker table tr td.today.disabled.disabled.active,
.ui-datepicker table tr td.today.disabled:hover.disabled.active,
.ui-datepicker table tr td.today[disabled].active,
.ui-datepicker table tr td.today:hover[disabled].active,
.ui-datepicker table tr td.today.disabled[disabled].active,
.ui-datepicker table tr td.today.disabled:hover[disabled].active,
fieldset[disabled] .ui-datepicker table tr td.today.active,
fieldset[disabled] .ui-datepicker table tr td.today:hover.active,
fieldset[disabled] .ui-datepicker table tr td.today.disabled.active,
fieldset[disabled] .ui-datepicker table tr td.today.disabled:hover.active {
  background: rgba(0,0,0,0.2);
  border-color: #ffb733;
}
.ui-datepicker table tr td.today:hover:hover {
  color: #000;
}
.ui-datepicker table tr td.today.active:hover {
  color: #fff;
}
.ui-datepicker table tr td.range,
.ui-datepicker table tr td.range:hover,
.ui-datepicker table tr td.range.disabled,
.ui-datepicker table tr td.range.disabled:hover {
  background: rgba(0,0,0,0.2);
  border-radius: 0;
}
.ui-datepicker table tr td.range.today,
.ui-datepicker table tr td.range.today:hover,
.ui-datepicker table tr td.range.today.disabled,
.ui-datepicker table tr td.range.today.disabled:hover {
  color: #000000;
  background: rgba(0,0,0,0.2);
  border-color: #f1a417;
  border-radius: 0;
}
.ui-datepicker table tr td.range.today:hover,
.ui-datepicker table tr td.range.today:hover:hover,
.ui-datepicker table tr td.range.today.disabled:hover,
.ui-datepicker table tr td.range.today.disabled:hover:hover,
.ui-datepicker table tr td.range.today:focus,
.ui-datepicker table tr td.range.today:hover:focus,
.ui-datepicker table tr td.range.today.disabled:focus,
.ui-datepicker table tr td.range.today.disabled:hover:focus,
.ui-datepicker table tr td.range.today:active,
.ui-datepicker table tr td.range.today:hover:active,
.ui-datepicker table tr td.range.today.disabled:active,
.ui-datepicker table tr td.range.today.disabled:hover:active,
.ui-datepicker table tr td.range.today.active,
.ui-datepicker table tr td.range.today:hover.active,
.ui-datepicker table tr td.range.today.disabled.active,
.ui-datepicker table tr td.range.today.disabled:hover.active,
.open .dropdown-toggle.ui-datepicker table tr td.range.today,
.open .dropdown-toggle.ui-datepicker table tr td.range.today:hover,
.open .dropdown-toggle.ui-datepicker table tr td.range.today.disabled,
.open .dropdown-toggle.ui-datepicker table tr td.range.today.disabled:hover {
  color: #000000;
  background: rgba(0,0,0,0.2);
  border-color: #bf800c;
}
.ui-datepicker table tr td.range.today:active,
.ui-datepicker table tr td.range.today:hover:active,
.ui-datepicker table tr td.range.today.disabled:active,
.ui-datepicker table tr td.range.today.disabled:hover:active,
.ui-datepicker table tr td.range.today.active,
.ui-datepicker table tr td.range.today:hover.active,
.ui-datepicker table tr td.range.today.disabled.active,
.ui-datepicker table tr td.range.today.disabled:hover.active,
.open .dropdown-toggle.ui-datepicker table tr td.range.today,
.open .dropdown-toggle.ui-datepicker table tr td.range.today:hover,
.open .dropdown-toggle.ui-datepicker table tr td.range.today.disabled,
.open .dropdown-toggle.ui-datepicker table tr td.range.today.disabled:hover {
  background-image: none;
}
.ui-datepicker table tr td.range.today.disabled,
.ui-datepicker table tr td.range.today:hover.disabled,
.ui-datepicker table tr td.range.today.disabled.disabled,
.ui-datepicker table tr td.range.today.disabled:hover.disabled,
.ui-datepicker table tr td.range.today[disabled],
.ui-datepicker table tr td.range.today:hover[disabled],
.ui-datepicker table tr td.range.today.disabled[disabled],
.ui-datepicker table tr td.range.today.disabled:hover[disabled],
fieldset[disabled] .ui-datepicker table tr td.range.today,
fieldset[disabled] .ui-datepicker table tr td.range.today:hover,
fieldset[disabled] .ui-datepicker table tr td.range.today.disabled,
fieldset[disabled] .ui-datepicker table tr td.range.today.disabled:hover,
.ui-datepicker table tr td.range.today.disabled:hover,
.ui-datepicker table tr td.range.today:hover.disabled:hover,
.ui-datepicker table tr td.range.today.disabled.disabled:hover,
.ui-datepicker table tr td.range.today.disabled:hover.disabled:hover,
.ui-datepicker table tr td.range.today[disabled]:hover,
.ui-datepicker table tr td.range.today:hover[disabled]:hover,
.ui-datepicker table tr td.range.today.disabled[disabled]:hover,
.ui-datepicker table tr td.range.today.disabled:hover[disabled]:hover,
fieldset[disabled] .ui-datepicker table tr td.range.today:hover,
fieldset[disabled] .ui-datepicker table tr td.range.today:hover:hover,
fieldset[disabled] .ui-datepicker table tr td.range.today.disabled:hover,
fieldset[disabled] .ui-datepicker table tr td.range.today.disabled:hover:hover,
.ui-datepicker table tr td.range.today.disabled:focus,
.ui-datepicker table tr td.range.today:hover.disabled:focus,
.ui-datepicker table tr td.range.today.disabled.disabled:focus,
.ui-datepicker table tr td.range.today.disabled:hover.disabled:focus,
.ui-datepicker table tr td.range.today[disabled]:focus,
.ui-datepicker table tr td.range.today:hover[disabled]:focus,
.ui-datepicker table tr td.range.today.disabled[disabled]:focus,
.ui-datepicker table tr td.range.today.disabled:hover[disabled]:focus,
fieldset[disabled] .ui-datepicker table tr td.range.today:focus,
fieldset[disabled] .ui-datepicker table tr td.range.today:hover:focus,
fieldset[disabled] .ui-datepicker table tr td.range.today.disabled:focus,
fieldset[disabled] .ui-datepicker table tr td.range.today.disabled:hover:focus,
.ui-datepicker table tr td.range.today.disabled:active,
.ui-datepicker table tr td.range.today:hover.disabled:active,
.ui-datepicker table tr td.range.today.disabled.disabled:active,
.ui-datepicker table tr td.range.today.disabled:hover.disabled:active,
.ui-datepicker table tr td.range.today[disabled]:active,
.ui-datepicker table tr td.range.today:hover[disabled]:active,
.ui-datepicker table tr td.range.today.disabled[disabled]:active,
.ui-datepicker table tr td.range.today.disabled:hover[disabled]:active,
fieldset[disabled] .ui-datepicker table tr td.range.today:active,
fieldset[disabled] .ui-datepicker table tr td.range.today:hover:active,
fieldset[disabled] .ui-datepicker table tr td.range.today.disabled:active,
fieldset[disabled] .ui-datepicker table tr td.range.today.disabled:hover:active,
.ui-datepicker table tr td.range.today.disabled.active,
.ui-datepicker table tr td.range.today:hover.disabled.active,
.ui-datepicker table tr td.range.today.disabled.disabled.active,
.ui-datepicker table tr td.range.today.disabled:hover.disabled.active,
.ui-datepicker table tr td.range.today[disabled].active,
.ui-datepicker table tr td.range.today:hover[disabled].active,
.ui-datepicker table tr td.range.today.disabled[disabled].active,
.ui-datepicker table tr td.range.today.disabled:hover[disabled].active,
fieldset[disabled] .ui-datepicker table tr td.range.today.active,
fieldset[disabled] .ui-datepicker table tr td.range.today:hover.active,
fieldset[disabled] .ui-datepicker table tr td.range.today.disabled.active,
fieldset[disabled] .ui-datepicker table tr td.range.today.disabled:hover.active {
  background: rgba(0,0,0,0.2);
  border-color: #f1a417;
}
.ui-datepicker table tr td.selected,
.ui-datepicker table tr td.selected:hover,
.ui-datepicker table tr td.selected.disabled,
.ui-datepicker table tr td.selected.disabled:hover {
  color: #ffffff;
  background: rgba(0,0,0,0.2);
  border-color: #555555;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
}
.ui-datepicker table tr td.selected:hover,
.ui-datepicker table tr td.selected:hover:hover,
.ui-datepicker table tr td.selected.disabled:hover,
.ui-datepicker table tr td.selected.disabled:hover:hover,
.ui-datepicker table tr td.selected:focus,
.ui-datepicker table tr td.selected:hover:focus,
.ui-datepicker table tr td.selected.disabled:focus,
.ui-datepicker table tr td.selected.disabled:hover:focus,
.ui-datepicker table tr td.selected:active,
.ui-datepicker table tr td.selected:hover:active,
.ui-datepicker table tr td.selected.disabled:active,
.ui-datepicker table tr td.selected.disabled:hover:active,
.ui-datepicker table tr td.selected.active,
.ui-datepicker table tr td.selected:hover.active,
.ui-datepicker table tr td.selected.disabled.active,
.ui-datepicker table tr td.selected.disabled:hover.active,
.open .dropdown-toggle.ui-datepicker table tr td.selected,
.open .dropdown-toggle.ui-datepicker table tr td.selected:hover,
.open .dropdown-toggle.ui-datepicker table tr td.selected.disabled,
.open .dropdown-toggle.ui-datepicker table tr td.selected.disabled:hover {
  color: #ffffff;
  background: rgba(0,0,0,0.2);
  border-color: #373737;
}
.ui-datepicker table tr td.selected:active,
.ui-datepicker table tr td.selected:hover:active,
.ui-datepicker table tr td.selected.disabled:active,
.ui-datepicker table tr td.selected.disabled:hover:active,
.ui-datepicker table tr td.selected.active,
.ui-datepicker table tr td.selected:hover.active,
.ui-datepicker table tr td.selected.disabled.active,
.ui-datepicker table tr td.selected.disabled:hover.active,
.open .dropdown-toggle.ui-datepicker table tr td.selected,
.open .dropdown-toggle.ui-datepicker table tr td.selected:hover,
.open .dropdown-toggle.ui-datepicker table tr td.selected.disabled,
.open .dropdown-toggle.ui-datepicker table tr td.selected.disabled:hover {
  background-image: none;
}
.ui-datepicker table tr td.selected.disabled,
.ui-datepicker table tr td.selected:hover.disabled,
.ui-datepicker table tr td.selected.disabled.disabled,
.ui-datepicker table tr td.selected.disabled:hover.disabled,
.ui-datepicker table tr td.selected[disabled],
.ui-datepicker table tr td.selected:hover[disabled],
.ui-datepicker table tr td.selected.disabled[disabled],
.ui-datepicker table tr td.selected.disabled:hover[disabled],
fieldset[disabled] .ui-datepicker table tr td.selected,
fieldset[disabled] .ui-datepicker table tr td.selected:hover,
fieldset[disabled] .ui-datepicker table tr td.selected.disabled,
fieldset[disabled] .ui-datepicker table tr td.selected.disabled:hover,
.ui-datepicker table tr td.selected.disabled:hover,
.ui-datepicker table tr td.selected:hover.disabled:hover,
.ui-datepicker table tr td.selected.disabled.disabled:hover,
.ui-datepicker table tr td.selected.disabled:hover.disabled:hover,
.ui-datepicker table tr td.selected[disabled]:hover,
.ui-datepicker table tr td.selected:hover[disabled]:hover,
.ui-datepicker table tr td.selected.disabled[disabled]:hover,
.ui-datepicker table tr td.selected.disabled:hover[disabled]:hover,
fieldset[disabled] .ui-datepicker table tr td.selected:hover,
fieldset[disabled] .ui-datepicker table tr td.selected:hover:hover,
fieldset[disabled] .ui-datepicker table tr td.selected.disabled:hover,
fieldset[disabled] .ui-datepicker table tr td.selected.disabled:hover:hover,
.ui-datepicker table tr td.selected.disabled:focus,
.ui-datepicker table tr td.selected:hover.disabled:focus,
.ui-datepicker table tr td.selected.disabled.disabled:focus,
.ui-datepicker table tr td.selected.disabled:hover.disabled:focus,
.ui-datepicker table tr td.selected[disabled]:focus,
.ui-datepicker table tr td.selected:hover[disabled]:focus,
.ui-datepicker table tr td.selected.disabled[disabled]:focus,
.ui-datepicker table tr td.selected.disabled:hover[disabled]:focus,
fieldset[disabled] .ui-datepicker table tr td.selected:focus,
fieldset[disabled] .ui-datepicker table tr td.selected:hover:focus,
fieldset[disabled] .ui-datepicker table tr td.selected.disabled:focus,
fieldset[disabled] .ui-datepicker table tr td.selected.disabled:hover:focus,
.ui-datepicker table tr td.selected.disabled:active,
.ui-datepicker table tr td.selected:hover.disabled:active,
.ui-datepicker table tr td.selected.disabled.disabled:active,
.ui-datepicker table tr td.selected.disabled:hover.disabled:active,
.ui-datepicker table tr td.selected[disabled]:active,
.ui-datepicker table tr td.selected:hover[disabled]:active,
.ui-datepicker table tr td.selected.disabled[disabled]:active,
.ui-datepicker table tr td.selected.disabled:hover[disabled]:active,
fieldset[disabled] .ui-datepicker table tr td.selected:active,
fieldset[disabled] .ui-datepicker table tr td.selected:hover:active,
fieldset[disabled] .ui-datepicker table tr td.selected.disabled:active,
fieldset[disabled] .ui-datepicker table tr td.selected.disabled:hover:active,
.ui-datepicker table tr td.selected.disabled.active,
.ui-datepicker table tr td.selected:hover.disabled.active,
.ui-datepicker table tr td.selected.disabled.disabled.active,
.ui-datepicker table tr td.selected.disabled:hover.disabled.active,
.ui-datepicker table tr td.selected[disabled].active,
.ui-datepicker table tr td.selected:hover[disabled].active,
.ui-datepicker table tr td.selected.disabled[disabled].active,
.ui-datepicker table tr td.selected.disabled:hover[disabled].active,
fieldset[disabled] .ui-datepicker table tr td.selected.active,
fieldset[disabled] .ui-datepicker table tr td.selected:hover.active,
fieldset[disabled] .ui-datepicker table tr td.selected.disabled.active,
fieldset[disabled] .ui-datepicker table tr td.selected.disabled:hover.active {
  background: rgba(0,0,0,0.2);
  border-color: #555555;
}
.ui-datepicker table tr td.active,
.ui-datepicker table tr td.active:hover,
.ui-datepicker table tr td.active.disabled,
.ui-datepicker table tr td.active.disabled:hover {
  color: #ffffff;
  background: rgba(0,0,0,0.2);
  border-color: #357ebd;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
}
.ui-datepicker table tr td.active:hover,
.ui-datepicker table tr td.active:hover:hover,
.ui-datepicker table tr td.active.disabled:hover,
.ui-datepicker table tr td.active.disabled:hover:hover,
.ui-datepicker table tr td.active:focus,
.ui-datepicker table tr td.active:hover:focus,
.ui-datepicker table tr td.active.disabled:focus,
.ui-datepicker table tr td.active.disabled:hover:focus,
.ui-datepicker table tr td.active:active,
.ui-datepicker table tr td.active:hover:active,
.ui-datepicker table tr td.active.disabled:active,
.ui-datepicker table tr td.active.disabled:hover:active,
.ui-datepicker table tr td.active.active,
.ui-datepicker table tr td.active:hover.active,
.ui-datepicker table tr td.active.disabled.active,
.ui-datepicker table tr td.active.disabled:hover.active,
.open .dropdown-toggle.ui-datepicker table tr td.active,
.open .dropdown-toggle.ui-datepicker table tr td.active:hover,
.open .dropdown-toggle.ui-datepicker table tr td.active.disabled,
.open .dropdown-toggle.ui-datepicker table tr td.active.disabled:hover {
  color: #ffffff;
  background: rgba(0,0,0,0.5);
  border-color: #285e8e;
}
.ui-datepicker table tr td.active:active,
.ui-datepicker table tr td.active:hover:active,
.ui-datepicker table tr td.active.disabled:active,
.ui-datepicker table tr td.active.disabled:hover:active,
.ui-datepicker table tr td.active.active,
.ui-datepicker table tr td.active:hover.active,
.ui-datepicker table tr td.active.disabled.active,
.ui-datepicker table tr td.active.disabled:hover.active,
.open .dropdown-toggle.ui-datepicker table tr td.active,
.open .dropdown-toggle.ui-datepicker table tr td.active:hover,
.open .dropdown-toggle.ui-datepicker table tr td.active.disabled,
.open .dropdown-toggle.ui-datepicker table tr td.active.disabled:hover {
  background-image: none;
}
.ui-datepicker table tr td.active.disabled,
.ui-datepicker table tr td.active:hover.disabled,
.ui-datepicker table tr td.active.disabled.disabled,
.ui-datepicker table tr td.active.disabled:hover.disabled,
.ui-datepicker table tr td.active[disabled],
.ui-datepicker table tr td.active:hover[disabled],
.ui-datepicker table tr td.active.disabled[disabled],
.ui-datepicker table tr td.active.disabled:hover[disabled],
fieldset[disabled] .ui-datepicker table tr td.active,
fieldset[disabled] .ui-datepicker table tr td.active:hover,
fieldset[disabled] .ui-datepicker table tr td.active.disabled,
fieldset[disabled] .ui-datepicker table tr td.active.disabled:hover,
.ui-datepicker table tr td.active.disabled:hover,
.ui-datepicker table tr td.active:hover.disabled:hover,
.ui-datepicker table tr td.active.disabled.disabled:hover,
.ui-datepicker table tr td.active.disabled:hover.disabled:hover,
.ui-datepicker table tr td.active[disabled]:hover,
.ui-datepicker table tr td.active:hover[disabled]:hover,
.ui-datepicker table tr td.active.disabled[disabled]:hover,
.ui-datepicker table tr td.active.disabled:hover[disabled]:hover,
fieldset[disabled] .ui-datepicker table tr td.active:hover,
fieldset[disabled] .ui-datepicker table tr td.active:hover:hover,
fieldset[disabled] .ui-datepicker table tr td.active.disabled:hover,
fieldset[disabled] .ui-datepicker table tr td.active.disabled:hover:hover,
.ui-datepicker table tr td.active.disabled:focus,
.ui-datepicker table tr td.active:hover.disabled:focus,
.ui-datepicker table tr td.active.disabled.disabled:focus,
.ui-datepicker table tr td.active.disabled:hover.disabled:focus,
.ui-datepicker table tr td.active[disabled]:focus,
.ui-datepicker table tr td.active:hover[disabled]:focus,
.ui-datepicker table tr td.active.disabled[disabled]:focus,
.ui-datepicker table tr td.active.disabled:hover[disabled]:focus,
fieldset[disabled] .ui-datepicker table tr td.active:focus,
fieldset[disabled] .ui-datepicker table tr td.active:hover:focus,
fieldset[disabled] .ui-datepicker table tr td.active.disabled:focus,
fieldset[disabled] .ui-datepicker table tr td.active.disabled:hover:focus,
.ui-datepicker table tr td.active.disabled:active,
.ui-datepicker table tr td.active:hover.disabled:active,
.ui-datepicker table tr td.active.disabled.disabled:active,
.ui-datepicker table tr td.active.disabled:hover.disabled:active,
.ui-datepicker table tr td.active[disabled]:active,
.ui-datepicker table tr td.active:hover[disabled]:active,
.ui-datepicker table tr td.active.disabled[disabled]:active,
.ui-datepicker table tr td.active.disabled:hover[disabled]:active,
fieldset[disabled] .ui-datepicker table tr td.active:active,
fieldset[disabled] .ui-datepicker table tr td.active:hover:active,
fieldset[disabled] .ui-datepicker table tr td.active.disabled:active,
fieldset[disabled] .ui-datepicker table tr td.active.disabled:hover:active,
.ui-datepicker table tr td.active.disabled.active,
.ui-datepicker table tr td.active:hover.disabled.active,
.ui-datepicker table tr td.active.disabled.disabled.active,
.ui-datepicker table tr td.active.disabled:hover.disabled.active,
.ui-datepicker table tr td.active[disabled].active,
.ui-datepicker table tr td.active:hover[disabled].active,
.ui-datepicker table tr td.active.disabled[disabled].active,
.ui-datepicker table tr td.active.disabled:hover[disabled].active,
fieldset[disabled] .ui-datepicker table tr td.active.active,
fieldset[disabled] .ui-datepicker table tr td.active:hover.active,
fieldset[disabled] .ui-datepicker table tr td.active.disabled.active,
fieldset[disabled] .ui-datepicker table tr td.active.disabled:hover.active {
  background-color: #428bca;
  border-color: #357ebd;
}
.ui-datepicker table tr td span {
  display: block;
  width: 23%;
  height: 54px;
  line-height: 54px;
  float: left;
  margin: 1%;
  cursor: pointer;
  border-radius: 4px;
}
.ui-datepicker table tr td span:hover {
  background: rgba(0,0,0,0.2);
}
.ui-datepicker table tr td span.disabled,
.ui-datepicker table tr td span.disabled:hover {
  background: none;
  color: #444;
  cursor: default;
}
.ui-datepicker table tr td span.active,
.ui-datepicker table tr td span.active:hover,
.ui-datepicker table tr td span.active.disabled,
.ui-datepicker table tr td span.active.disabled:hover {
  color: #ffffff;
  background-color: #428bca;
  border-color: #357ebd;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
}
.ui-datepicker table tr td span.active:hover,
.ui-datepicker table tr td span.active:hover:hover,
.ui-datepicker table tr td span.active.disabled:hover,
.ui-datepicker table tr td span.active.disabled:hover:hover,
.ui-datepicker table tr td span.active:focus,
.ui-datepicker table tr td span.active:hover:focus,
.ui-datepicker table tr td span.active.disabled:focus,
.ui-datepicker table tr td span.active.disabled:hover:focus,
.ui-datepicker table tr td span.active:active,
.ui-datepicker table tr td span.active:hover:active,
.ui-datepicker table tr td span.active.disabled:active,
.ui-datepicker table tr td span.active.disabled:hover:active,
.ui-datepicker table tr td span.active.active,
.ui-datepicker table tr td span.active:hover.active,
.ui-datepicker table tr td span.active.disabled.active,
.ui-datepicker table tr td span.active.disabled:hover.active,
.open .dropdown-toggle.ui-datepicker table tr td span.active,
.open .dropdown-toggle.ui-datepicker table tr td span.active:hover,
.open .dropdown-toggle.ui-datepicker table tr td span.active.disabled,
.open .dropdown-toggle.ui-datepicker table tr td span.active.disabled:hover {
  color: #ffffff;
  background-color: #3276b1;
  border-color: #285e8e;
}
.ui-datepicker table tr td span.active:active,
.ui-datepicker table tr td span.active:hover:active,
.ui-datepicker table tr td span.active.disabled:active,
.ui-datepicker table tr td span.active.disabled:hover:active,
.ui-datepicker table tr td span.active.active,
.ui-datepicker table tr td span.active:hover.active,
.ui-datepicker table tr td span.active.disabled.active,
.ui-datepicker table tr td span.active.disabled:hover.active,
.open .dropdown-toggle.ui-datepicker table tr td span.active,
.open .dropdown-toggle.ui-datepicker table tr td span.active:hover,
.open .dropdown-toggle.ui-datepicker table tr td span.active.disabled,
.open .dropdown-toggle.ui-datepicker table tr td span.active.disabled:hover {
  background-image: none;
}
.ui-datepicker table tr td span.active.disabled,
.ui-datepicker table tr td span.active:hover.disabled,
.ui-datepicker table tr td span.active.disabled.disabled,
.ui-datepicker table tr td span.active.disabled:hover.disabled,
.ui-datepicker table tr td span.active[disabled],
.ui-datepicker table tr td span.active:hover[disabled],
.ui-datepicker table tr td span.active.disabled[disabled],
.ui-datepicker table tr td span.active.disabled:hover[disabled],
fieldset[disabled] .ui-datepicker table tr td span.active,
fieldset[disabled] .ui-datepicker table tr td span.active:hover,
fieldset[disabled] .ui-datepicker table tr td span.active.disabled,
fieldset[disabled] .ui-datepicker table tr td span.active.disabled:hover,
.ui-datepicker table tr td span.active.disabled:hover,
.ui-datepicker table tr td span.active:hover.disabled:hover,
.ui-datepicker table tr td span.active.disabled.disabled:hover,
.ui-datepicker table tr td span.active.disabled:hover.disabled:hover,
.ui-datepicker table tr td span.active[disabled]:hover,
.ui-datepicker table tr td span.active:hover[disabled]:hover,
.ui-datepicker table tr td span.active.disabled[disabled]:hover,
.ui-datepicker table tr td span.active.disabled:hover[disabled]:hover,
fieldset[disabled] .ui-datepicker table tr td span.active:hover,
fieldset[disabled] .ui-datepicker table tr td span.active:hover:hover,
fieldset[disabled] .ui-datepicker table tr td span.active.disabled:hover,
fieldset[disabled] .ui-datepicker table tr td span.active.disabled:hover:hover,
.ui-datepicker table tr td span.active.disabled:focus,
.ui-datepicker table tr td span.active:hover.disabled:focus,
.ui-datepicker table tr td span.active.disabled.disabled:focus,
.ui-datepicker table tr td span.active.disabled:hover.disabled:focus,
.ui-datepicker table tr td span.active[disabled]:focus,
.ui-datepicker table tr td span.active:hover[disabled]:focus,
.ui-datepicker table tr td span.active.disabled[disabled]:focus,
.ui-datepicker table tr td span.active.disabled:hover[disabled]:focus,
fieldset[disabled] .ui-datepicker table tr td span.active:focus,
fieldset[disabled] .ui-datepicker table tr td span.active:hover:focus,
fieldset[disabled] .ui-datepicker table tr td span.active.disabled:focus,
fieldset[disabled] .ui-datepicker table tr td span.active.disabled:hover:focus,
.ui-datepicker table tr td span.active.disabled:active,
.ui-datepicker table tr td span.active:hover.disabled:active,
.ui-datepicker table tr td span.active.disabled.disabled:active,
.ui-datepicker table tr td span.active.disabled:hover.disabled:active,
.ui-datepicker table tr td span.active[disabled]:active,
.ui-datepicker table tr td span.active:hover[disabled]:active,
.ui-datepicker table tr td span.active.disabled[disabled]:active,
.ui-datepicker table tr td span.active.disabled:hover[disabled]:active,
fieldset[disabled] .ui-datepicker table tr td span.active:active,
fieldset[disabled] .ui-datepicker table tr td span.active:hover:active,
fieldset[disabled] .ui-datepicker table tr td span.active.disabled:active,
fieldset[disabled] .ui-datepicker table tr td span.active.disabled:hover:active,
.ui-datepicker table tr td span.active.disabled.active,
.ui-datepicker table tr td span.active:hover.disabled.active,
.ui-datepicker table tr td span.active.disabled.disabled.active,
.ui-datepicker table tr td span.active.disabled:hover.disabled.active,
.ui-datepicker table tr td span.active[disabled].active,
.ui-datepicker table tr td span.active:hover[disabled].active,
.ui-datepicker table tr td span.active.disabled[disabled].active,
.ui-datepicker table tr td span.active.disabled:hover[disabled].active,
fieldset[disabled] .ui-datepicker table tr td span.active.active,
fieldset[disabled] .ui-datepicker table tr td span.active:hover.active,
fieldset[disabled] .ui-datepicker table tr td span.active.disabled.active,
fieldset[disabled] .ui-datepicker table tr td span.active.disabled:hover.active {
  background-color: #428bca;
  border-color: #357ebd;
}
.ui-datepicker table tr td span.old,
.ui-datepicker table tr td span.new {
  color: #444;
}
.ui-datepicker th.ui-datepicker-switch {
  width: 145px;
}
.ui-datepicker thead tr:first-child th,
.ui-datepicker tfoot tr th {
  cursor: pointer;
}
.ui-datepicker thead tr:first-child th:hover,
.ui-datepicker tfoot tr th:hover {
  background: rgba(0,0,0,0.2);
}
.ui-datepicker .cw {
  font-size: 10px;
  width: 12px;
  padding: 0 2px 0 5px;
  vertical-align: middle;
}
.ui-datepicker thead tr:first-child th.cw {
  cursor: default;
  background-color: transparent;
}
.input-group.date .input-group-addon i {
  cursor: pointer;
  width: 16px;
  height: 16px;
}
.input-daterange input {
  text-align: center;
}
.input-daterange input:first-child {
  border-radius: 3px 0 0 3px;
}
.input-daterange input:last-child {
  border-radius: 0 3px 3px 0;
}
.input-daterange .input-group-addon {
  width: auto;
  min-width: 16px;
  padding: 4px 5px;
  font-weight: normal;
  line-height: 1.428571429;
  text-align: center;
  text-shadow: 0 1px 0 #fff;
  vertical-align: middle;
  background-color: #eeeeee;
  border: solid #cccccc;
  border-width: 1px 0;
  margin-left: -5px;
  margin-right: -5px;
}
.ui-datepicker.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  float: left;
  display: none;
  min-width: 160px;
  list-style: none;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding;
  background-clip: padding-box;
  *border-right-width: 2px;
  *border-bottom-width: 2px;
  color: #333333;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  line-height: 1.428571429;
}
.ui-datepicker.dropdown-menu th,
.ui-datepicker.dropdown-menu td {
  padding: 4px 5px;
}


</style>
