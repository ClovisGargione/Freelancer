<template>
    <profession-form :prev-route="prevRoute" :title="'Atualizar Profissão'"></profession-form>
</template>

<script>
import { mapActions } from 'vuex'
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
    prevRoute: {},
    professionObj: {}
  }),
  created () {
    this.getData()
  },
  methods: {
    ...mapActions('profession', ['ActionGetProfession']),
    async getData () {
      const loader = this.$loading.show()
      await this.ActionGetProfession({ id: this.$route.params.id })
      loader.hide()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
