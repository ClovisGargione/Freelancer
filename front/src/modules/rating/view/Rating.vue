<template>
<div id="worker-register" class="container-fluid content h-100">
  <div class="row">
    <div class="col-lg-10 col-10 title">
        <h2>Avaliações</h2>
    </div>
    <div class="col-2 mt-3">
        <go-back class="pull-right" v-if="prevRoute" :route="prevRoute"></go-back>
    </div>
  </div>
  <div class="row">
     <div class="col-12" :key="activity._id" v-for="activity in activitiesNotRated">
         <b-card class="card bd-callout" header-tag="header" footer-tag="footer">
             <template #header>
                <h6 style="display:inline" class="mb-0 mr-2">Avaliação</h6>
            </template>
           <b-media>
                <div class="row">
                    <div class="col-12">
                        <p>Avalie o trabalho de {{activity.personal.user.name}}:</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                            <b-form-group v-slot="{ ariaDescribedby }">
                            <b-form-radio v-model="rating[activity._id]" :aria-describedby="ariaDescribedby" :name="'some-radios-5' + activity._id" value="5">5. Excelente</b-form-radio>
                            <b-form-radio v-model="rating[activity._id]" :aria-describedby="ariaDescribedby" :name="'some-radios-4' + activity._id" value="4">4. Muito bom</b-form-radio>
                            <b-form-radio v-model="rating[activity._id]" :aria-describedby="ariaDescribedby" :name="'some-radios-3' + activity._id" value="3">3. Bom</b-form-radio>
                            <b-form-radio v-model="rating[activity._id]" :aria-describedby="ariaDescribedby" :name="'some-radios-2' + activity._id" value="2">2. Regular</b-form-radio>
                            <b-form-radio v-model="rating[activity._id]" :aria-describedby="ariaDescribedby" :name="'some-radios-1' + activity._id" value="1">1. Ruim</b-form-radio>
                        </b-form-group>
                    </div>
                </div>
            </b-media>
            <template #footer>
                <div class="pull-right">
                    <button type="button" class="btn btn-warning" @click="saveRating(activity)" :disabled="!rating[activity._id]"><font-awesome-icon icon="star" /> Avaliar</button>
                </div>
            </template>
         </b-card>
     </div>
  </div>
  <empty-state v-if="this.activitiesNotRated.length === 0"/>
</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import GoBack from '@/components/GoBack'
import EmptyState from '@/components/EmptyState'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'
library.add(faStar)
export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.prevRoute = from
      if (!vm.prevRoute.name) {
        vm.prevRoute = {}
        vm.prevRoute.name = 'search'
      }
    })
  },
  components: {
    GoBack, EmptyState
  },
  data: () => ({
    prevRoute: {},
    rating: { }
  }),
  computed: {
    ...mapState('activity', ['activitiesNotRated'])
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions('activity', ['ActionGetActivitiesNotRated']),
    ...mapActions('rating', ['ActionCreateRating']),
    async init () {
      const loader = this.$loading.show()
      await this.ActionGetActivitiesNotRated()
      loader.hide()
    },
    async saveRating (activity) {
      const loader = this.$loading.show()
      const rating = { personal: activity.personal._id, score: this.rating[activity._id], activityId: activity._id }
      await this.ActionCreateRating(rating)
      await this.ActionGetActivitiesNotRated()
      loader.hide()
    }
  }
}
</script>
<style scoped>

</style>
