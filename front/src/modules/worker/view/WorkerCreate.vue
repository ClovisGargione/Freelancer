<template>
    <worker-user-form :prev-route="prevRoute" :title="'Nova atividade'"></worker-user-form>
</template>

<script>
import WorkerUserForm from '@/components/WorkerUserForm'
export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.prevRoute = from
    })
  },
  components: {
    WorkerUserForm
  },
  data: () => ({
    prevRoute: {}
  })
}
</script>
<style lang="scss" scoped>

</style>
