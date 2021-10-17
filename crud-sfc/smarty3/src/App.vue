<template>
  <div id="app">
    <keep-alive v-if="$crud.env.persistent">
      <router-view :key="$route.fullPath"/>
    </keep-alive>
    <div v-else>
      <router-view :key="$route.fullPath"/>
    </div>
<!--    <router-view :key="'cWindow'"/>-->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  /*
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
   */
}
</style>
