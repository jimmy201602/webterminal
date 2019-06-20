<template>

  <div class="small-box" :class="bgColor">
    <div class="inner">
      <h3>{{title}}</h3>

      <p>{{description}}</p>
    </div>
    <div class="icon">
      <i class="ion" :class="icon"></i>
    </div>
    <a href="#" class="small-box-footer" @click="moreEvent">{{moreText}} <i class="fa fa-arrow-circle-right"></i></a>
  </div>
</template>

<script>
export default {
  name: 'SmallBox',
  props: ['color', 'icon', 'title', 'description', 'moreText'],
  computed: {
    bgColor () {
      return `bg-${this.color}`
    }
  },
  methods: {
    moreEvent () {
      this.$emit('more-click')
    }
  }
}
</script>
