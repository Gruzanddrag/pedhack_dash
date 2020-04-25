<template>
  <v-content  class="grey lighten-2" >
    <div id="core-view" class="grey darken-4">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </div>
  </v-content>
</template>

<script>
  export default {
    name: 'CoreView',
    metaInfo () {
      return {
        title: 'BruhBot',
      }
    },
  }
</script>
<style lang="scss">
  #core-view {
    height: 100%;
  }
</style>
