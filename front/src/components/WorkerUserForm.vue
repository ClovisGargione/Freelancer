<template>
  <div id="worker-register" class="container-fluid content h-100">
    <div class="row">
        <div class="col-10 title">
              <h2 v-html="title"></h2>
        </div>
        <div class="col-2 mt-3">
              <go-back class="pull-right" v-if="prevRoute" :route="prevRoute"></go-back>
        </div>
    </div>
    <alert-box class="mt-2" :message-props="messageProps"></alert-box>
    <div class='row mt-3'>
      <div class="col-md-6 col-sm-12">
          <b-card class="card bd-callout" header-tag="header">
            <template #header>
                <h6 style="display:inline" class="mb-0 mr-2">Endereço</h6><font-awesome-icon icon="info" id="info-tooltip-1" @click="showTooltip1 = !showTooltip1" class="text-info"/>
                <b-tooltip :show.sync="showTooltip1" target="info-tooltip-1" placement="right">
                  Preencha o formulário com os dados do seu endereço. Informe tudo que puder. <span style='font-size:15px'>&#128221;</span>
                </b-tooltip>
            </template>
            <form>
                <div class="form-group">
                  <label>Estado</label>
                  <b-form-select autocomplete="off" aria-describedby="input-live-help input-state-feedback" :state="validationState.state" required v-model="workerData.state" @change="getCities(); isValid('state')" value-field="_id" text-field="name" :options="states"></b-form-select>
                  <b-form-invalid-feedback id="input-state-feedback">
                    Selecione o Estado.
                  </b-form-invalid-feedback>
                </div>
                <div class="form-group">
                  <label>Cidade</label>
                  <b-form-input type="text" trim @blur="isValid('city')" aria-describedby="input-live-help" list="my-list-id" :state="validationState.city" :disabled="!workerData.state" required v-model="workerData.city"></b-form-input>
                  <div id="input-city-feedback" class="invalid-feedback" :style="{display:validationState.cityEmpty}">
                    Informe a cidade.
                  </div>
                  <div id="input-not-found-feedback" class="invalid-feedback" :style="{display:validationState.cityNotFound}">
                    Cidade não encontrada neste estado.
                  </div>
                  <b-form-datalist id="my-list-id" text-field="name" :options="cities"></b-form-datalist>
                </div>
                <div role="group">
                  <label>Bairro</label>
                  <b-form-input type="text" autocomplete="off" trim @blur="isValid('district')" aria-describedby="input-live-help input-district-feedback" :state="validationState.district" :disabled="!workerData.city" required v-model="workerData.district"></b-form-input>
                  <b-form-invalid-feedback id="input-district-feedback">
                    Informe o bairro.
                  </b-form-invalid-feedback>
                </div>
                <div role="group">
                  <label>Rua</label>
                  <b-form-input type="text" autocomplete="off" trim @blur="isValid('street')" aria-describedby="input-live-help input-street-feedback" :state="validationState.street" class="form-control" :disabled="!workerData.district" required v-model="workerData.street"></b-form-input>
                  <b-form-invalid-feedback id="input-street-feedback">
                    Informe a rua.
                  </b-form-invalid-feedback>
                </div>
                <div role="group">
                  <label>Número</label>
                  <b-form-input type="number" autocomplete="off" trim @blur="isValid('number')" aria-describedby="input-live-help input-number-feedback" :state="validationState.number" class="form-control" min="1" :disabled="!workerData.street" required v-model="workerData.number"></b-form-input>
                  <b-form-invalid-feedback id="input-number-feedback">
                    Informe o número.
                  </b-form-invalid-feedback>
                </div>
                <div role="group">
                  <label>Complemento</label>
                  <b-form-input type="text" autocomplete="off" class="form-control" :disabled="!workerData.number" v-model="workerData.complement"></b-form-input>
                </div>
                <div role="group">
                  <label>CEP</label>
                  <b-form-input type="text" autocomplete="off" trim @blur="isValid('zipcode')" aria-describedby="input-live-help input-zipcode-feedback" :state="validationState.zipcode" v-mask="'#####-###'" class="form-control" :disabled="!workerData.number" required v-model="workerData.zipcode"></b-form-input>
                  <b-form-invalid-feedback id="input-zipcode-feedback">
                    Informe o CEP.
                  </b-form-invalid-feedback>
                </div>
                <div role="group">
                  <label>Referência</label>
                  <b-form-input type="text" autocomplete="off" class="form-control" :disabled="!workerData.zipcode" v-model="workerData.reference"></b-form-input>
                </div>
            </form>
          </b-card>
      </div>
      <div class="col-md-6 col-sm-12">
        <b-card class="card bd-callout" header-tag="header">
            <template #header>
                <h6 style="display:inline" class="mb-0 mr-2">Profissão</h6><font-awesome-icon icon="info" id="info-tooltip-2" @click="showTooltip2 = !showTooltip2" class="text-info"/>
                <b-tooltip :show.sync="showTooltip2" target="info-tooltip-2" placement="right">
                  Selecione a sua profissão. Você pode adicionar mais de uma. Se não encontrar, cadastre pelo link <span style='font-size:15px'>&#128279;</span> <b-button @click="createNewProfession()" variant="link">Cadastrar profissão</b-button>
                </b-tooltip>
            </template>
            <form>
              <div class="form-group">
                  <div class="col-12 d-flex justify-content-end">
                    <b-link @click="createNewProfession()">Cadastrar profissão</b-link>
                  </div>
                  <label>Profissão</label>
                  <b-form-select v-model="profession" @change="addProfession()" :state="validationState.professionsAdd">
                    <option v-for="p in professions" :value="p" :key="p._id">{{p.name}} - {{p.category.name}}</option>
                  </b-form-select>
                  <div id="input-profession-feedback" class="invalid-feedback" :style="{display:validationState.professionsAdd ? 'none' : 'block'}">
                    Adicione uma profissão.
                  </div>
                  <div class="mt-3">
                    <div class="row" v-for="(p, index) in workerData.professionsAdd" :key="p._id">
                      <span class="col-5">{{p.name}}</span>
                      <span class="col-5">{{p.category.name}}</span>
                      <span class="col-2 d-flex justify-content-end"><font-awesome-icon icon='trash' class="text-danger pointer" @click="removeProfession(index)"/></span>
                    </div>
                  </div>
              </div>
            </form>
        </b-card>
        <b-card class="card bd-callout" header-tag="header">
            <template #header>
                <h6 class="mb-0">Contato</h6>
            </template>
            <form>
              <div role="group">
                  <label>Telefone</label>
                  <b-form-input type="text" autocomplete="off" trim aria-describedby="input-live-help" v-mask="'(##) ####-####'" v-model="workerData.phoneNumber"></b-form-input>
                </div>
                <div role="group">
                  <label>Celular</label>
                  <b-input-group>
                    <b-form-input type="text" autocomplete="off" trim aria-describedby="input-live-help" v-mask="['(##) ####-####', '(##) #####-####']" v-model="workerData.cellphone"></b-form-input>
                    <b-input-group-append is-text style="border-radius: 0.25rem">
                      <b-form-checkbox
                      id="checkbox-1"
                      :disabled="!workerData.cellphone"
                      v-model="workerData.whatsapp"
                      name="checkbox-1"
                      value="1"
                      unchecked-value="0">
                      WhatsApp
                    </b-form-checkbox>
                  </b-input-group-append>
                  </b-input-group>
                </div>
                <div role="group">
                  <label>E-mail</label>
                  <b-form-input type="email" autocomplete="off" trim aria-describedby="input-live-help" v-model="workerData.email"></b-form-input>
                </div>
            </form>
        </b-card>
        <b-card class="card bd-callout" header-tag="header">
            <template #header>
                <h6 class="mb-0">Descrição</h6>
            </template>
            <form>
              <b-form-textarea
                id="textarea"
                aria-describedby="input-live-help input-description-feedback"
                v-model="workerData.description"
                @blur="isValid('description')"
                :state="validationState.description"
                placeholder="Descreva um pouco do seu trabalho..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>
              <b-form-invalid-feedback id="input-description-feedback">
                  Informe a descrição do seu trabalho.
              </b-form-invalid-feedback>
            </form>
        </b-card>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <b-card class="card bd-callout" no-body>
          <div class="p-2 d-flex justify-content-end">
              <button type="button" class="btn btn-secondary ml-2" @click="clear()"><font-awesome-icon icon="times" /> Cancelar</button>
              <button type="button" class="btn btn-primary ml-2" @click="save()" :disabled="isEmptyForm()"><font-awesome-icon icon="save" :spin="false"/> Salvar</button>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import GoBack from '@/components/GoBack'
import AlertBox from '@/components/AlertBox'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faSave, faSpinner, faArrowLeft, faInfo, faTrash } from '@fortawesome/free-solid-svg-icons'
library.add(faTimes, faSave, faSpinner, faArrowLeft, faInfo, faTrash)
export default {
  name: 'workerUserForm',
  props: {
    prevRoute: { type: Object, require: false },
    title: { type: String, require: false }
  },
  components: {
    GoBack,
    AlertBox
  },
  data: () => ({
    workerData: {
      professionsAdd: []
    },
    professionsAdd: [],
    profession: {},
    showTooltip1: false,
    showTooltip2: false,
    loader: {},
    messageProps: {
      variant: '',
      message: '',
      dismissCountDown: 0,
      dismissSecs: 5
    },
    validationState: {
      state: null,
      city: null,
      district: null,
      street: null,
      number: null,
      zipcode: null,
      description: null,
      professionsAdd: true,
      cityNotFound: null

    }
  }),
  mounted () {
    this.getData()
  },
  methods: {
    ...mapActions('worker', ['ActionGetStates', 'ActionGetCitiesByState', 'ActionCreateWorker', 'ActionUpdateWorker']),
    ...mapActions('profession', ['ActionGetProfessions']),
    async getData () {
      await this.ActionGetStates()
      await this.ActionGetProfessions()
    },
    handleObjectWork () {
      console.log(this.work)
      this.workerData._id = this.$route.params.id
      this.workerData.state = this.work.state._id
      this.validationState.state = true
      this.workerData.city = this.work.city.name
      this.validationState.city = true
      this.workerData.district = this.work.address.district
      this.validationState.district = true
      this.workerData.street = this.work.address.street
      this.validationState.street = true
      this.workerData.number = this.work.address.number
      this.validationState.number = true
      this.workerData.complement = this.work.address.complement
      this.workerData.reference = this.work.address.reference
      this.workerData.zipcode = this.work.address.zipcode
      this.validationState.zipcode = true

      this.work.professions.map(profession => {
        this.workerData.professionsAdd.push(profession)
      })
      this.validationState.professionsAdd = this.workerData.professionsAdd.length > 0

      this.workerData.phoneNumber = this.work.contacts.phoneNumber
      this.workerData.cellphone = this.work.contacts.cellphone
      this.workerData.whatsapp = this.work.contacts.whatsapp ? 1 : 0
      this.workerData.email = this.work.contacts.email

      this.workerData.description = this.work.description
      this.validationState.description = true
    },
    clear () {
      this.workerData = {}
      this.workerData.professionsAdd = []
    },
    isEmptyForm () {
      const mandatoryFields = ['state', 'city', 'district', 'street', 'number', 'zipcode', 'description', 'professionsAdd']
      let isEmpty = false
      mandatoryFields.map(field => {
        if (this.workerData[field] == null || this.workerData[field].length === 0 || !this.validationState[field]) {
          isEmpty = true
          return isEmpty
        }
      })
      return isEmpty
    },
    setAlertProps ({ variant, message, dismissCountDown }) {
      this.messageProps.variant = variant
      this.messageProps.message = message
      this.messageProps.dismissCountDown = dismissCountDown
    },
    backToList () {
      setTimeout(() => { this.$router.push({ name: 'worker' }) }, 5000)
    },
    isValid (field) {
      this.validationState[field] = this.workerData[field] != null && this.workerData[field].length > 0
      if (field === 'city') {
        if (!this.validationState[field]) {
          this.validationState.cityEmpty = 'block'
        }
        if (field === 'city' && this.validationState[field]) {
          this.validationState.cityEmpty = 'none'
          this.getIdCityByName()
        }
      }
    },
    async getCities () {
      this.workerData.city = ''
      this.validationState.city = null
      const stateId = this.workerData.state
      await this.ActionGetCitiesByState(stateId)
    },
    addProfession () {
      if (!this.validationState.professionsAdd.length) {
        this.validationState.professionsAdd = true
      }
      this.workerData.professionsAdd.push(this.profession)
      this.profession = {}
    },
    removeProfession (index) {
      this.workerData.professionsAdd.splice(index, 1)
      this.isProfessionsEmpty()
    },
    isProfessionsEmpty () {
      if (!this.workerData.professionsAdd.length) {
        this.validationState.professionsAdd = false
        return true
      }
      this.validationState.professionsAdd = true
      return false
    },
    createNewProfession () {
      this.$router.push({ name: 'profession-create' })
    },
    showLoader () {
      return this.$loading.show()
    },
    save () {
      if (this.isProfessionsEmpty()) {
        return
      }
      this.loader = this.showLoader()
      const address = {
        street: this.workerData.street,
        number: this.workerData.number,
        complement: this.workerData.complement ? this.workerData.complement : '',
        district: this.workerData.district,
        zipcode: parseInt(this.workerData.zipcode.replace(/\D/g, '')),
        reference: this.workerData.reference ? this.workerData.reference : ''
      }

      const contacts = {
        phoneNumber: this.workerData.phoneNumber ? parseInt(this.workerData.phoneNumber.replace(/\D/g, '')) : null,
        cellphone: this.workerData.cellphone ? parseInt(this.workerData.cellphone.replace(/\D/g, '')) : null,
        whatsapp: this.workerData.whatsapp,
        email: this.workerData.email
      }

      const professions = []
      this.workerData.professionsAdd.map(profession => {
        professions.push(profession._id)
      })

      const personal = { address, contacts, description: this.workerData.description, professions, state: this.workerData.state, city: this.workerData.cityId }
      let obj = {}
      if (!this.workerData._id) {
        this.ActionCreateWorker(personal)
          .then(res => {
            obj = { variant: 'success', message: 'Atividade cadastrada com sucesso.', dismissCountDown: 5 }
            this.setAlertProps(obj)
            this.backToList()
          })
          .catch(err => {
            obj = { variant: 'danger', message: err.body.error, dismissCountDown: 5 }
            this.setAlertProps(obj)
          })
          .finally(() => {
            this.loader.hide()
          })
      } else {
        this.ActionUpdateWorker({ personal, personalId: this.workerData._id })
          .then(res => {
            obj = { variant: 'success', message: 'Atividade atualizada com sucesso.', dismissCountDown: 5 }
            this.setAlertProps(obj)
            this.backToList()
          })
          .catch(err => {
            obj = { variant: 'danger', message: err.body.error, dismissCountDown: 5 }
            this.setAlertProps(obj)
          })
          .finally(() => {
            this.loader.hide()
          })
      }
    },
    getIdCityByName () {
      this.workerData.cityId = ''
      this.cities.map(city => {
        if (city.name.toUpperCase() === this.workerData.city.toUpperCase()) {
          this.workerData.cityId = city._id
          this.workerData.city = city.name
          return this.workerData.cityId
        }
      })
      if (!this.workerData.cityId) {
        this.validationState.cityNotFound = 'block'
        this.validationState.city = false
      } else {
        this.validationState.cityNotFound = 'none'
        this.validationState.city = true
      }
    }
  },
  computed: {
    ...mapState('worker', ['states', 'cities', 'work']),
    ...mapState('profession', ['professions'])
  },
  watch: {
    work: function (val) {
      if (this.$route.name === 'worker-update') {
        this.handleObjectWork()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.form-control.is-invalid,.was-validated .form-control:invalid {
  border-color:#dc3545;
  padding-right:calc(1.5em + .75rem);
  background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545'%3E%3Ccircle cx='6' cy='6' r='4.5'/%3E%3Cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3E%3Ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3E%3C/svg%3E");
  background-repeat:no-repeat;
  background-position:right calc(.375em + .1875rem) center;
  background-size:calc(.75em + .375rem) calc(.75em + .375rem)
}
.form-control.is-valid,.was-validated .form-control:valid {
  border-color:#28a745;
  padding-right:calc(1.5em + .75rem);
  background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E");
  background-repeat:no-repeat;
  background-position:right calc(.375em + .1875rem) center;
  background-size:calc(.75em + .375rem) calc(.75em + .375rem)
}

.input-group-text {
    display: flex;
    align-items: center;
    padding: 0.375rem 0.75rem;
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #ffffff;
    text-align: center;
    white-space: nowrap;
    background-color: #60aea1;
    border: 1px solid #60aea1;
    border-radius: 0.25rem;
}

</style>
