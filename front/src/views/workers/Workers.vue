<template>
<div id="workers" class="container-fluid content">
  <div class="row">
    <div class="col title">
      <h1>Workers</h1>
    </div>
   </div>
   <div class="row">
   <div class="col-12" :key="work._id" v-for="work in workers">
    <work-box :work="work"></work-box>
   </div>
   </div>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import WorkBox from '@/components/WorkBox'
export default {
  components: {
    WorkBox
  },
  mounted () {
    this.ActionGetWorkers()
  },
  methods: {
    ...mapActions('workers', ['ActionGetWorkers'])
  },
  computed: {
    ...mapState('workers', ['workers'])
  }
}
</script>

<style lang="scss" scoped>
</style>
