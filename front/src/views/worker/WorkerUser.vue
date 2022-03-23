<template>
<div id="worker-register" class="container-fluid content h-100">
   <div class="row">
      <div class="col-lg-10 col-8 title">
         <h2>Serviços</h2>
      </div>
      <div class="col-lg-2 col-4 mt-3">
         <button type="button" class="btn btn-dark float-right" @click="createNew()"><font-awesome-icon :icon="['fas', 'plus']" /></button>
         <button type="button" v-show="this.searchText" class="btn btn-primary float-right mr-1" @click="clearSearch()"><font-awesome-icon :icon="['fas', 'sync']" /></button>
      </div>
   </div>
</div>
</template>
<script>
export default {

}
</script>
<style scoped>

</style>
