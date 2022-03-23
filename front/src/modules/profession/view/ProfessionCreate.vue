<template>
    <profession-form :prev-route="prevRoute" :title="'Nova Profissão'"></profession-form>
</template>

<script>
import { mapState } from 'vuex'
import ProfessionForm from '@/components/ProfessionForm'
export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.prevRoute = from
      if (!vm.prevRoute.name) {
        vm.prevRoute = {}
        vm.prevRoute.name = 'profession'
      }
    })
  },
  components: {
    ProfessionForm
  },
  data: () => ({
    prevRoute: {}
  }),
  computed: {
    ...mapState('worker', ['work'])
  }
}
</script>
<style lang="scss" scoped>

</style>
