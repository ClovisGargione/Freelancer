<template>
  <div id="app" class="h-100">
    <navbar v-if="$route.name != 'login'"></navbar>
    <router-view/>
  </div>
</template>
<script>
import Navbar from './components/Navbar'
export default {
  components: {
    Navbar
  },
  metaInfo: {
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' }
    ]
  }
}
</script>
<style lang="scss">

</style>
