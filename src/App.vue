<template>
  <div class="appContainer">
    <h1>Web-blokus</h1>
    <web-blokus/>
    <hr>
    Powered by <a href="https://v3.vuejs.org/">Vue.js</a><br>
    Source on <a href="https://github.com/msakuta/web-blokus">GitHub</a>.
  </div>
</template>

<script>
import WebBlokus from './components/WebBlokus.vue'

export default {
  name: 'App',
  components: {
    WebBlokus
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
  margin-top: 30px;
  margin-bottom: 30px;
}

.appContainer {
  width: 650px;
  position: relative;
  margin: auto;
}
</style>
