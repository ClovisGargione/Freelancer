<template>
<div id="worker-register" class="container-fluid content h-100">
  <div class="row">
    <div class="col-lg-10 col-10 title">
        <h2>Atividades</h2>
    </div>
    <div class="col-lg-2 col-2 mt-3">
        <button type="button" class="btn btn-dark float-right" @click="createNew()"><font-awesome-icon :icon="['fas', 'plus']" /></button>
    </div>
  </div>
  <div class="row mt-3">
    <div class="col-12" :key="work._id" v-for="work in worksData">
        <work-box :work="work"></work-box>
    </div>
  </div>
  <empty-state v-if="this.worksData.length === 0"/>
</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import WorkBox from '@/components/WorkBox'
import EmptyState from '@/components/EmptyState'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faSync } from '@fortawesome/free-solid-svg-icons'
library.add(faPlus, faSync)
export default {
  components: {
    WorkBox, EmptyState
  },
  data: () => ({
    worksData: [],
    loadButton: {
      iconLoadButton: 'arrow-circle-down',
      labelLoadButton: 'Carregar mais',
      spinLoadButton: false
    },
    pageParams: {
      limit: 10,
      page: 1
    }
  }),
  computed: {
    ...mapState('worker', ['works'])
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions('worker', ['ActionGetWorksByUser', 'ActionSetWork']),
    async init () {
      const loader = this.$loading.show()
      this.ActionSetWork(null)
      await this.ActionGetWorksByUser()
      setTimeout(() => { loader.hide() }, 500)
    },
    createNew () {
      this.$router.push({ name: 'worker-create' })
    }
  },
  watch: {
    works: function (val) {
      this.worksData = val
    }
  }
}
</script>
<style scoped>

</style>
