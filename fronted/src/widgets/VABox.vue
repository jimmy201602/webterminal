<template>
  <div class="box" :class="[theme, this.isOpen?'':'collapsed-box', isSolid?'box-solid':'']">
    <div class="box-header" :class="(isBorder || isSolid)?'with-border':''">
      <slot name="icon-title"></slot>
      <h3 class="box-title">{{ title }}</h3>

      <div class="box-tools pull-right">
        <button type="button" class="btn btn-box-tool" :data-widget="widgetType"><i :class="btnIcon"></i>
        </button>
      </div>
      <!-- /.box-tools -->
    </div>
    <!-- /.box-header -->
    <div class="box-body">
      <slot name="content"></slot>
    </div>
    <!-- /.box-body -->

    <div v-if="$slots.footer" class="box-footer">
      <slot name="footer"></slot>
    </div>

    <div v-if="this.isLoading" class="overlay">
      <i class="fa fa-refresh fa-spin"></i>
    </div>
  </div>
  <!-- /.box -->
</template>

<script>
export default {
  name: 'va-box',
  props: {
    widgetType: {
      type: String,
      default: 'collapse'
    },
    title: {
      type: String
    },
    content: {
      type: String
    },
    theme: {
      type: String
    },
    isOpen: {
      type: Boolean,
      default: true
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isSolid: {
      type: Boolean,
      default: false
    },
    isBorder: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    btnIcon () {
      if (this.widgetType === 'collapse') {
        return this.isOpen ? 'fa fa-minus' : 'fa fa-plus'
      } else if (this.widgetType === 'remove') {
        return 'fa fa-times'
      }
      return ''
    }
  },
  created () {

  }
}
</script>
