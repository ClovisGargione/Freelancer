<template>
    <div>
        <alert-box :message-props="messageProps"></alert-box>
        <b-card class="card bd-callout">
            <div class="row float-right">
                <div class="col-12">
                    <router-link :to="{name: 'profession-update', params: {id: profession._id}}" class="no-underline">
                        <font-awesome-icon icon='edit' size="lg" class="text-info"/>
                    </router-link>
                </div>
            </div>
            <b-media>
                <label class="mt-0 d-block">{{profession.name}} <font-awesome-icon icon='toolbox' /></label>
                <small>
                    {{profession.category.name}} <font-awesome-icon icon='tag' />
                </small>
            </b-media>
            <div class="row float-right">
                <div class="col-12">
                    <font-awesome-icon icon='trash' class="text-danger pointer" @click="confirmRemove()" size="lg"/>
                </div>
            </div>
        </b-card>
        <b-modal id="bv-modal-remove" ref="my-modal" centered :no-close-on-backdrop="true">
            <template #modal-title>
                Confirmação
            </template>
            <div class="d-block text-center">
                <h5>Deseja remover a profissão {{profession.name}}?</h5>
            </div>
            <template #modal-footer>
                    <b-button class="btn-secondary" @click="$bvModal.hide('bv-modal-remove')">Cancelar</b-button>
                    <b-button class="btn-danger ml-1" @click="remove()">Remover</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import AlertBox from '@/components/AlertBox'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTag, faToolbox, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
library.add(faTag, faToolbox, faTrash, faEdit)
export default {
  name: 'professionBox',
  props: {
    profession: { type: Object, require: true }
  },
  components: {
    AlertBox
  },
  data: () => ({
    messageProps: {
      variant: '',
      message: '',
      dismissCountDown: 0,
      dismissSecs: 5
    }
  }),
  methods: {
    ...mapActions('profession', ['ActionGetProfessions', 'ActionRemoveProfession', 'ActionSetPageIndex']),
    confirmRemove () {
      this.$refs['my-modal'].show()
    },
    remove () {
      this.ActionSetPageIndex(1)
      this.$refs['my-modal'].hide()
      this.loader = this.$loading.show()
      this.ActionRemoveProfession({ id: this.profession._id })
        .catch((err) => {
          const obj = { variant: 'danger', message: `Não foi possível remover a profissão ${this.profession.name}`, dismissCountDown: 5 }
          if (err.status === 404) {
            obj.message = 'Endereço não encontrado'
          }
          this.setAlertProps(obj)
        })
        .finally(() => {
          window.scrollTo(0, 0)
          this.loader.hide()
        })
    },
    setAlertProps ({ variant, message, dismissCountDown }) {
      this.messageProps.variant = variant
      this.messageProps.message = message
      this.messageProps.dismissCountDown = dismissCountDown
    }
  }
}
</script>

<style lang="scss" scoped>
@import url(//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');

.no-underline:hover{
    text-decoration: none;
}

</style>
