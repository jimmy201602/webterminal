<template>
  <div class="hello">
    <div>
      <img class="logo" src="../assets/logo.png">
      <button
        id="myButton"
        class="btn bg-maroon btn-flat margin"
        @click="clickBtn"
        :disabled="loading"
        ><template v-if="loading">{{msgBye}}</template><template v-else>{{msgHello}}</template></button>
    </div>
    <div>
      <h1>Demo list</h1>

      <h3>Dashboard</h3>
      <ul>
        <li>헬로화면</li>
        <li>샘플화면</li>
        <li>Dashboard v1</li>
        <li>Dashboard v2</li>
        <li>InfoBox</li>
        <li>Chart.js</li>
        <li>Alert</li>
        <li>Modal</li>
        <li>APIExample</li>
      </ul>

      <h3>Widgets</h3>
      <ul>
        <li>all</li>
      </ul>

      <h3>UI Elements</h3>
      <ul>
        <li>General</li>
        <li>Buttons</li>
      </ul>

      <h3>Forms</h3>
      <ul>
        <li>General Elements</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msgHello: 'Hello',
      msgBye: 'Bye',
      loading: false
    }
  },
  methods: {
    clickBtn () {
      this.loading = !this.loading
      setTimeout(() => {
        this.loading = !this.loading
      }, 1000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
