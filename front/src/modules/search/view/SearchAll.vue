<template>
<div id="worker-register" class="container-fluid content h-100">
  <div class="row">
    <div class="col-lg-10 col-10 title">
        <h2>Freelancers</h2>
    </div>
    <div class="col-lg-2 col-2 mt-3">
        <button type="button" v-show="this.searchText" class="btn btn-primary float-right mr-1" @click="clearSearch()"><font-awesome-icon :icon="['fas', 'sync']" /></button>
    </div>
  </div>
  <div class="row mt-3">
    <div class="col-12" :key="work._id" v-for="work in worksData">
        <work-box :work="work"></work-box>
    </div>
  </div>
  <empty-state v-if="this.worksData.length === 0"/>
  <div class="row">
    <div class="col-12">
      <b-button block v-show="showLoadButton()" variant="dark" class="mb-3 p-3" size="lg" @click="loadMore()" :disabled="loadButton.spinLoadButton"><font-awesome-icon :icon="loadButton.iconLoadButton" :spin="loadButton.spinLoadButton" /> {{loadButton.labelLoadButton}}</b-button>
    </div>
  </div>
</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import WorkBox from '@/components/WorkBox'
import EmptyState from '@/components/EmptyState'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faSync, faArrowCircleDown, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
library.add(faPlus, faSync, faArrowCircleDown, faCircleNotch)
export default {
  components: {
    WorkBox, EmptyState
  },
  data: () => ({
    worksData: [],
    loader: {},
    loadButton: {
      iconLoadButton: 'arrow-circle-down',
      labelLoadButton: 'Carregar mais',
      spinLoadButton: false
    },
    pageParams: {
      limit: 20,
      page: 1
    }
  }),
  computed: {
    ...mapState('search', ['found', 'totalRecords', 'pageIndex', 'searchText'])
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions('search', ['ActionGetAll', 'ActionSearchSetPageIndex', 'ActionSearchSetSearchText', 'ActionGetCountAll', 'ActionSearchFreelancer']),
    async init () {
      this.loader = this.$loading.show()
      await this.ActionSearchSetPageIndex(this.pageParams.page)
      if (!this.searchText) {
        await this.ActionSearchSetSearchText('')
        await this.ActionGetAll(this.pageParams)
        await this.ActionGetCountAll()
      }
    },
    async clearSearch () {
      this.pageParams.page = 1
      await this.ActionSearchSetSearchText('')
      this.init()
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
      await this.ActionSearchSetPageIndex(this.pageParams.page)
      if (this.searchText) {
        await this.ActionSearchFreelancer({ page: this.pageParams.page, limit: this.pageParams.limit, searchText: this.searchText })
      } else {
        this.ActionGetAll(this.pageParams)
      }
      this.loadButtonDefault()
    },
    showLoadButton () {
      return this.worksData.length > 0 && this.worksData.length < this.totalRecords
    }
  },
  watch: {
    found: function (val) {
      if (this.pageIndex === 1) {
        this.worksData = val
        this.pageParams.page = 1
      } else {
        this.worksData = this.worksData.concat(val)
      }
      this.loader.hide()
    }
  }
}
</script>
<style scoped>

</style>
