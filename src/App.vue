<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <web-brokus/>
  <hr>
  Powered by <a href="https://v3.vuejs.org/">Vue.js</a>
</template>

<script>
import WebBrokus from './components/WebBrokus.vue'

export default {
  name: 'App',
  components: {
    WebBrokus
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
