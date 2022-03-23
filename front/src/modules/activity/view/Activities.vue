<template>
<div id="worker-register" class="container-fluid content h-100">
  <div class="row">
    <div class="col-lg-10 col-10 title">
        <h2>Gerenciar Atividades</h2>
    </div>
    <div class="col-2 mt-3">
        <go-back class="pull-right" v-if="prevRoute" :route="prevRoute"></go-back>
    </div>
  </div>
  <div class="row">
     <div class="col-12">
         <b-card class="card bd-callout" header-tag="header">
             <template #header>
                <h6 style="display:inline" class="mb-0 mr-2">Gerenciar Atividades</h6>
            </template>
           <b-media>
               <p><span class="text-danger" style="font-weight: bold;font-size: larger;">Cancelar:</span> Cancela a solicitação de atendimento.</p>
               <p><span class="text-success" style="font-weight: bold;font-size: larger;">Confirmar:</span> Confirma a solicitação de atendimento.</p>
               <p><span class="text-primary" style="font-weight: bold;font-size: larger;">Finalizar:</span> Finaliza o atendimento e libera para a avaliação do solicitante.</p>
           </b-media>
         </b-card>
     </div>
  </div>
  <div class="row mt-3">
    <div class="col-12" :key="activity._id" v-for="activity in activities">
        <b-card class="card bd-callout">
            <b-media>
                <div class="row">
                    <div class="col-md-6 col-12">
                        <div style="font-size:18px">Solicitante: {{activity.user.name}}</div>
                        <div v-if="activity.finishAt">Finalizado em: {{formatDate(activity.finishAt)}}</div>
                    </div>
                    <div class="col-md-6 col-12 text-right">
                        <b-button :disabled="activity.isFinished" @click="confirmCancelActivity(activity)" variant="danger">Cancelar</b-button>
                        <b-button class="ml-2" :disabled="activity.isConfirmed" @click="confirmActivity(activity)" variant="success">Confirmar</b-button>
                        <b-button class="ml-2" :disabled="!activity.isConfirmed && !activity.isFinished || activity.isFinished" @click="finishActivity(activity)" variant="primary">Finalizar</b-button>
                    </div>
                </div>
            </b-media>
        </b-card>
    </div>
    <b-modal id="bv-modal-confirm" ref="confirm-modal" centered :no-close-on-backdrop="true">
        <template #modal-title>
            Confirmação
        </template>
        <div class="d-block text-center">
            <h5>Deseja cancelar este atendimento?</h5>
        </div>
        <template #modal-footer>
                <b-button class="btn-secondary" @click="$bvModal.hide('bv-modal-confirm')">Cancelar</b-button>
                <b-button class="btn-danger ml-1" @click="cancelActivity()">Continuar</b-button>
        </template>
    </b-modal>
  </div>
  <empty-state v-if="this.activities.length === 0"/>
</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import GoBack from '@/components/GoBack'
import EmptyState from '@/components/EmptyState'
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
    activity: {}
  }),
  computed: {
    ...mapState('activity', ['activities'])
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions('activity', ['ActionUpdateActivity', 'ActionGetPendingByPersonalUser', 'ActionGetActivitiesStarted', 'ActionGetActivitiesConfirmed']),
    async init () {
      const loader = this.$loading.show()
      await this.ActionGetPendingByPersonalUser()
      loader.hide()
    },
    async confirmActivity (activity) {
      const loader = this.$loading.show()
      activity.isConfirmed = true
      await this.ActionUpdateActivity(activity)
      await this.ActionGetPendingByPersonalUser()
      await this.ActionGetActivitiesStarted()
      await this.ActionGetActivitiesConfirmed()
      loader.hide()
    },
    async finishActivity (activity) {
      const loader = this.$loading.show()
      activity.isFinished = true
      activity.finishAt = new Date()
      await this.ActionUpdateActivity(activity)
      await this.ActionGetPendingByPersonalUser()
      await this.ActionGetActivitiesStarted()
      await this.ActionGetActivitiesConfirmed()
      loader.hide()
    },
    async cancelActivity () {
      this.$refs['confirm-modal'].hide()
      this.activity.isFinished = false
      this.activity.isConfirmed = false
      this.activity.isStarted = false
      this.activity.isCanceled = true
      const loader = this.$loading.show()
      await this.ActionUpdateActivity(this.activity)
      await this.ActionGetPendingByPersonalUser()
      await this.ActionGetActivitiesStarted()
      await this.ActionGetActivitiesConfirmed()
      loader.hide()
    },
    confirmCancelActivity (activity) {
      this.activity = activity
      this.$refs['confirm-modal'].show()
    },
    formatDate (date) {
      const d = new Date(date)
      return ('0' + d.getDate()).slice(-2) + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' +
    d.getFullYear() + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2)
    }
  }
}
</script>
<style scoped>

</style>
