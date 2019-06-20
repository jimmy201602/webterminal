<template>
  <div :class="this['class']">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'column',
  props: {
    'class': {
      type: String,
      default: ''
    }
  },
  created () {

  }
}
</script>
