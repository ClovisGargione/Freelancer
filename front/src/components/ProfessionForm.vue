<template>
    <div id="profession" class="container-fluid content title">
        <div class="row">
            <div class="col-10 title">
                <h2 v-html="title"></h2>
            </div>
            <div class="col-2 mt-3">
                <go-back class="pull-right" v-if="prevRoute" :route="prevRoute"></go-back>
            </div>
        </div>
        <alert-box class="mt-2" :message-props="messageProps"></alert-box>
        <div class="row mt-3">
            <div class="col-md-6 col-sm-12">
                <b-card class="card bd-callout">
                    <form ref="formContainer">
                        <div class="form-group">
                            <label>Profissão</label>
                            <input ref="name" type="text" v-model="professionData.name" class="form-control" placeholder="Nome da profissão" required>
                        </div>
                        <div class="form-group">
                            <label>Categoria</label>
                            <b-form-select required v-model="professionData.category" value-field="_id" text-field="name" :options="categories.categories"></b-form-select>
                        </div>
                        <hr>
                        <div class="pull-right">
                            <button type="button" class="btn btn-secondary ml-2" @click="clear()"><font-awesome-icon icon="times" /> Cancelar</button>
                            <button type="button" class="btn btn-primary ml-2" @click="professionData._id ? update() : save()" :disabled="!isEmptyForm()"><font-awesome-icon icon="save" :spin="false"/> Salvar</button>
                        </div>
                    </form>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AlertBox from '@/components/AlertBox'
import GoBack from '@/components/GoBack'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faSave, faSpinner, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
library.add(faTimes, faSave, faSpinner, faArrowLeft)
export default {
  name: 'professionForm',
  props: {
    prevRoute: { type: Object, require: false },
    title: { type: String, require: false }
  },
  components: {
    AlertBox, GoBack
  },
  data: () => ({
    professionData: {
      name: '',
      category: ''
    },
    loader: {},
    messageProps: {
      variant: '',
      message: '',
      dismissCountDown: 0,
      dismissSecs: 5
    }
  }),
  mounted () {
    this.getData()
  },
  methods: {
    ...mapActions('profession', ['ActionGetCategories', 'ActionCreateProfession', 'ActionUpdateProfession']),
    async getData () {
      await this.ActionGetCategories()
    },
    clear () {
      this.professionData = { name: '', category: '' }
      this.$refs.name.focus()
    },
    showLoader () {
      return this.$loading.show({ container: this.$refs.formContainer })
    },
    save () {
      this.loader = this.showLoader()
      let obj = {}
      this.ActionCreateProfession(this.professionData).then(res => {
        obj = { variant: 'success', message: `Profissão <b>${this.professionData.name}</b> cadastrada com sucesso.`, dismissCountDown: 5 }
        this.setAlertProps(obj)
        this.backToList()
      }).catch(err => {
        obj = { variant: 'danger', message: err.body.error, dismissCountDown: 5 }
        this.setAlertProps(obj)
      }).finally(() => {
        this.loader.hide()
      })
    },
    update () {
      this.loader = this.showLoader()
      let obj = {}
      this.ActionUpdateProfession(this.professionData).then(res => {
        obj = { variant: 'success', message: `Profissão <b>${this.professionData.name}</b> atualizada com sucesso.`, dismissCountDown: 5 }
        this.setAlertProps(obj)
        this.backToList()
      }).catch(err => {
        obj = { variant: 'danger', message: err.body.error, dismissCountDown: 5 }
        this.setAlertProps(obj)
      }).finally(() => {
        this.loader.hide()
      })
    },
    setAlertProps ({ variant, message, dismissCountDown }) {
      this.messageProps.variant = variant
      this.messageProps.message = message
      this.messageProps.dismissCountDown = dismissCountDown
    },
    isEmptyForm () {
      return this.professionData.name && this.professionData.category
    },
    backToList () {
      setTimeout(() => { this.$router.push({ name: this.prevRoute.name, params: this.prevRoute.params }) }, 5000)
    }
  },
  computed: {
    ...mapState('profession', ['categories', 'profession'])
  },
  watch: {
    profession: function (val) {
      this.professionData = val
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
