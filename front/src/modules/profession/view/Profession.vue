<template>
    <div id="profession" class="container-fluid content h-100">
        <div class="row">
            <div class="col-lg-10 col-8 title">
                <h2>Profissões</h2>
            </div>
            <div class="col-lg-2 col-4 mt-3">
                <button type="button" class="btn btn-dark float-right" @click="createNew()"><font-awesome-icon :icon="['fas', 'plus']" /></button>
                <button type="button" v-show="this.searchText" class="btn btn-primary float-right mr-1" @click="clearSearch()"><font-awesome-icon :icon="['fas', 'sync']" /></button>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12" :key="profession._id" v-for="profession in professionData">
                <profession-box :profession="profession"></profession-box>
            </div>
        </div>
        <empty-state v-if="!professionData.length"/>
        <div class="row">
          <div class="col-12">
            <b-button block v-show="showLoadButton()" variant="dark" class="mb-3 p-3" size="lg" @click="loadMore()" :disabled="loadButton.spinLoadButton"><font-awesome-icon :icon="loadButton.iconLoadButton" :spin="loadButton.spinLoadButton" /> {{loadButton.labelLoadButton}}</b-button>
          </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ProfessionBox from '@/components/ProfessionBox'
import EmptyState from '@/components/EmptyState'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faSync, faArrowCircleDown, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
library.add(faPlus, faSync, faArrowCircleDown, faCircleNotch)
export default {
  components: {
    ProfessionBox, EmptyState
  },
  data: () => ({
    professionData: [],
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
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions('profession', ['ActionGetProfessions', 'ActionGetCountProfession', 'ActionSetPageIndex', 'ActionSetSearchText', 'ActionSearchProfession']),
    async getData (payload) {
      await this.ActionGetProfessions(payload)
    },
    async init () {
      const loader = this.$loading.show()
      await this.ActionSetPageIndex(this.pageParams.page)
      await this.ActionSetSearchText('')
      await this.getData(this.pageParams)
      await this.ActionGetCountProfession()
      loader.hide()
    },
    clearSearch () {
      this.pageParams.page = 1
      this.init()
    },
    createNew () {
      this.$router.push({ name: 'profession-create' })
    },
    loadButtonDefault () {
      this.loadButton.iconLoadButton = 'arrow-circle-down'
      this.loadButton.labelLoadButton = 'Carregar mais'
      this.loadButton.spinLoadButton = false
    },
    loadButtonLoading () {
      this.loadButton.iconLoadButton = 'circle-notch'
      this.loadButton.labelLoadButton = 'Buscando...'
      this.loadButton.spinLoadButton = true
    },
    async loadMore () {
      this.loadButtonLoading()
      this.pageParams.page++
      await this.ActionSetPageIndex(this.pageParams.page)
      if (this.searchText) {
        await this.ActionSearchProfession({ page: this.pageParams.page, limit: this.pageParams.limit, searchText: this.searchText })
      } else {
        this.getData(this.pageParams)
      }
      this.loadButtonDefault()
    },
    showLoadButton () {
      return this.professionData.length > 0 && this.professionData.length < this.totalRecords
    }
  },
  computed: {
    ...mapState('profession', ['professions', 'totalRecords', 'pageIndex', 'searchText'])
  },
  watch: {
    professions: function (val) {
      if (this.pageIndex === 1) {
        this.professionData = val
        this.pageParams.page = 1
      } else {
        this.professionData = this.professionData.concat(val)
      }
    }
  }

}
</script>
<style scoped>
</style>
