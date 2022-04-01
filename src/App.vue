<template>
  <div id="app">
    <header></header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  header {
    height: 65px;
    max-height: 65px;
    display: flex;
    background: rgb(18, 29, 51);
  }
}
</style>
