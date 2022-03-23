<template>
<div id="worker" class="container-fluid content title">
    <h1>Worker</h1>
    <worker-detail-box :worker="worker"></worker-detail-box>
</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import WorkerDetailBox from '@/components/WorkerDetailBox'
export default {
  components: {
    WorkerDetailBox
  },
  created () {
    this.ActionShowWorker({ id: this.$route.params.id })
  },
  methods: {
    ...mapActions('worker', ['ActionShowWorker'])
  },
  computed: {
    ...mapState('worker', ['worker'])
  }
}
</script>
<style lang="scss" scoped>

</style>
