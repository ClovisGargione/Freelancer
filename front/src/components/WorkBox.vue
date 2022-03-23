<template>
    <div>
        <b-card class="card bd-callout">
            <b-media>
              <div class="row">
                <div class="col-10">
                  <h5 class="mt-0 mb-0" v-if="work.user.name">{{work.user.name}} </h5>
                  <h5 class="mt-0 mb-0" v-else>{{work.user.email}} </h5>
                </div>
                <div class="col-2 text-right">
                    <router-link v-if="!isSearch" :to="{name: 'worker-update', params: {id: work._id}}" class="no-underline">
                        <font-awesome-icon icon='edit' size="lg" class="text-info"/>
                    </router-link>
                </div>
              </div>
              <div class="mt-0 star d-inline" :key="s" v-for="s in score">
                  <span class="fa fa-star" :class="{'checked': s <= work.score}"></span>
              </div>
              <div :key="profession._id" v-for="profession in work.professions">
                  {{profession.name}}
              </div>
              <small class="mt-1 d-block" v-if="work.address && work.address.district">
                  {{work.address.street}} {{work.address.number}}
              </small>
              <small class="d-block" v-if="work.address && work.address.complement">
                  {{work.address.complement}}
              </small>
              <small class="d-block" v-if="work.address && work.address.reference">
                  {{work.address.reference}}
              </small>
              <small class="d-block">
                  {{work.address.district}}  -  {{work.city.name}}-{{work.state.acronym}}
              </small>
              <div class="row mt-1">
                <div class="col-12" v-if="work.contacts">
                  <span v-if="work.contacts.phoneNumber"><font-awesome-icon icon="phone-square"/> <a @click.prevent="openLink('tel:' + work.contacts.phoneNumber)" href="#">{{applyMask(work.contacts.phoneNumber, 'phonenumber')}}</a></span> <span v-if="work.contacts.cellphone && work.contacts.phoneNumber">|</span> <span v-if="work.contacts.cellphone"><svg v-if="work.contacts.whatsapp" class="align-middle" width="17px" height="17px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path fill="white" d="M224 122.8c-72.7 0-131.8 59.1-131.9 131.8 0 24.9 7 49.2 20.2 70.1l3.1 5-13.3 48.6 49.9-13.1 4.8 2.9c20.2 12 43.4 18.4 67.1 18.4h.1c72.6 0 133.3-59.1 133.3-131.8 0-35.2-15.2-68.3-40.1-93.2-25-25-58-38.7-93.2-38.7zm77.5 188.4c-3.3 9.3-19.1 17.7-26.7 18.8-12.6 1.9-22.4.9-47.5-9.9-39.7-17.2-65.7-57.2-67.7-59.8-2-2.6-16.2-21.5-16.2-41s10.2-29.1 13.9-33.1c3.6-4 7.9-5 10.6-5 2.6 0 5.3 0 7.6.1 2.4.1 5.7-.9 8.9 6.8 3.3 7.9 11.2 27.4 12.2 29.4s1.7 4.3.3 6.9c-7.6 15.2-15.7 14.6-11.6 21.6 15.3 26.3 30.6 35.4 53.9 47.1 4 2 6.3 1.7 8.6-1 2.3-2.6 9.9-11.6 12.5-15.5 2.6-4 5.3-3.3 8.9-2 3.6 1.3 23.1 10.9 27.1 12.9s6.6 3 7.6 4.6c.9 1.9.9 9.9-2.4 19.1zM400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM223.9 413.2c-26.6 0-52.7-6.7-75.8-19.3L64 416l22.5-82.2c-13.9-24-21.2-51.3-21.2-79.3C65.4 167.1 136.5 96 223.9 96c42.4 0 82.2 16.5 112.2 46.5 29.9 30 47.9 69.8 47.9 112.2 0 87.4-72.7 158.5-160.1 158.5z"/></svg><font-awesome-icon v-else icon="mobile-alt"/><a href="#" @click.prevent="work.contacts.whatsapp ? openLink('https://wa.me/+55' + work.contacts.cellphone + '/?text=Olá ' + work.user.name) : openLink('tel:' + work.contacts.cellphone)"> {{applyMask(work.contacts.cellphone, 'cellphone')}}</a></span>
                </div>
              </div>
              <div class="row">
                <div class="col-10" v-if="work.contacts">
                  <div v-if="work.contacts.email"><font-awesome-icon icon="envelope"/> <a @click.prevent="openLink('mailto:' + work.contacts.email)" href="#">{{work.contacts.email}}</a></div>
                </div>
                <div class="col-2 text-right" :class="{'col-12': !work.contacts}">
                  <font-awesome-icon icon='trash' v-if="!isSearch" @click="confirmRemove()" class="text-danger pointer" size="lg"/>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col align-self-end">
                  <b-button size="sm" variant="primary" v-b-toggle="'accordion-' + work._id">Descrição</b-button>
                </div>
                <div class="col align-self-end">
                  <font-awesome-icon v-if="!isSearch" icon="images" size="lg" @click="goToImages()" class="float-right text-light pointer"/>
                  <font-awesome-icon v-if="isSearch" icon="handshake" size="lg" @click="confirmStartActivity()" class="float-right text-info pointer"/>
                  <!--<b-button size="sm" @click="goToImages()" class="float-right" variant="secondary"><font-awesome-icon icon="images"/> Add Imagens</b-button>-->
                </div>
              </div>
              <b-collapse :id="'accordion-' + work._id">
                <div class="mt-3" style="font-size: medium;">
                  {{work.description}}
                </div>
                <div class="row justify-content-center mt-3">
                  <div class="col-md-6 col-sx-12">
                    <b-carousel
                      id="carousel-1"
                      v-if="work.images.length"
                      :interval="4000"
                      controls
                      indicators
                      background="#ababab"
                      style="text-shadow: 1px 1px 2px #333; border: 5px solid #343a40; border-radius: 0.25rem; box-shadow: 0 5px 10px rgba(0,0,0,0.5);">
                      <span :key="image.url" v-for="image in work.images">
                          <b-carousel-slide>
                          <template #img>
                            <img
                              class="d-block img-fluid w-100"
                              :src="image.url"
                              alt="image slot"
                            >
                          </template>
                        </b-carousel-slide>
                      </span>
                    </b-carousel>
                  </div>
                </div>
              </b-collapse>
            </b-media>
        </b-card>
        <b-modal id="bv-modal-remove" ref="my-modal" centered :no-close-on-backdrop="true">
            <template #modal-title>
                Confirmação
            </template>
            <div class="d-block text-center">
                <h5>Ao remover esta atividade, não será mais exibida nos resultados de busca. Deseja continuar?</h5>
            </div>
            <template #modal-footer>
                    <b-button class="btn-secondary" @click="$bvModal.hide('bv-modal-remove')">Cancelar</b-button>
                    <b-button class="btn-danger ml-1" @click="remove()">Remover</b-button>
            </template>
        </b-modal>
        <b-modal id="bv-modal-confirm" ref="confirm-modal" centered :no-close-on-backdrop="true">
            <template #modal-title>
                Confirmação
            </template>
            <div class="d-block text-center">
                <h5>Esta ação irá iniciar o processo de atendimento com {{work.user.name}}. Após a finalização do atendimento você poderá avaliar o trabalho. Deseja continuar?</h5>
            </div>
            <template #modal-footer>
                    <b-button class="btn-secondary" @click="$bvModal.hide('bv-modal-confirm')">Cancelar</b-button>
                    <b-button variant="primary" class="btn-primary ml-1" @click="startActivity()">Continuar</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPhoneSquare, faEnvelope, faMobileAlt, faImages, faEdit, faHandshake } from '@fortawesome/free-solid-svg-icons'
library.add(faPhoneSquare, faEnvelope, faMobileAlt, faImages, faEdit, faHandshake)
export default {
  name: 'workBox',
  props: {
    work: { type: Object, require: true }
  },
  data: () => ({
    isSearch: false,
    score: [1, 2, 3, 4, 5]
  }),
  mounted () {
    this.isSearch = this.$route.name === 'search'
  },
  methods: {
    ...mapActions('worker', ['ActionSetWork', 'ActionRemoveWorker']),
    ...mapActions('activity', ['ActionCreateActivity']),
    confirmRemove () {
      this.$refs['my-modal'].show()
    },
    confirmStartActivity () {
      this.$refs['confirm-modal'].show()
    },
    async startActivity () {
      const loader = this.$loading.show()
      this.$refs['confirm-modal'].hide()
      await this.ActionCreateActivity({ personal: this.work._id, isStarted: true })
      loader.hide()
    },
    remove () {
      this.$refs['my-modal'].hide()
      this.loader = this.$loading.show()
      this.ActionRemoveWorker({ personalId: this.work._id })
        .catch((err) => {
          const obj = { variant: 'danger', message: 'Não foi possível remover a atividade', dismissCountDown: 5 }
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
    applyMask (value, type) {
      let valueMask = ''
      switch (type) {
        case 'phonenumber':
          // eslint-disable-next-line no-case-declarations
          const phonenumber = value.toString().replace(/\D/g, '').match(/(\d{2})(\d{4})(\d{4})/)
          valueMask = '(' + phonenumber[1] + ') ' + phonenumber[2] + '-' + phonenumber[3]
          break
        case 'cellphone':
          // eslint-disable-next-line no-case-declarations
          const cellphone = value.toString().replace(/\D/g, '').match(/(\d{2})(\d{5})(\d{4})/)
          valueMask = '(' + cellphone[1] + ') ' + cellphone[2] + '-' + cellphone[3]
      }
      return valueMask
    },
    openLink (link) {
      window.open(link, '_blank')
    },
    goToImages () {
      this.$router.push({ name: 'worker-images', params: { id: this.work._id } })
    }
  }
}
</script>

<style lang="scss" scoped>

.no-underline:hover{
  text-decoration: none;
}

.checked {
  color: #ffca08;
}

.fa-star:hover {
  color:#ffca08;
}

.star > span:hover {
 color: #ffca08;
}
</style>
