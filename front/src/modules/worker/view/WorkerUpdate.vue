<template>
    <worker-user-form :prev-route="prevRoute" :title="'Atualizar Atividade'"></worker-user-form>
</template>

<script>
import { mapActions } from 'vuex'
import WorkerUserForm from '@/components/WorkerUserForm'
export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.prevRoute = from
      if (!vm.prevRoute.name) {
        vm.prevRoute = {}
        vm.prevRoute.name = 'worker'
      }
    })
  },
  components: {
    WorkerUserForm
  },
  data: () => ({
    prevRoute: {},
    professionObj: {}
  }),
  created () {
    console.log(this.prevRoute.name)
    this.getData()
  },
  methods: {
    ...mapActions('worker', ['ActionGetWorkById']),
    async getData () {
      const loader = this.$loading.show()
      await this.ActionGetWorkById({ personalId: this.$route.params.id })
      loader.hide()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
