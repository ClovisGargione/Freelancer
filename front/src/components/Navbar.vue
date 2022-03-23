<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
            <router-link :to="{name: 'home'}" class="navbar-brand">Freelancer<!--<b-nav-item class="material-icons" v-b-toggle.sidebar-1>reorder</b-nav-item>--></router-link>
            <b-navbar-nav class="d-sm-block d-md-block d-lg-none" style="flex: auto">
              <b-nav-item @click="setShowHideSearchBar()"><font-awesome-icon icon="search" /> Pesquisar</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav @click="show = !show" class="d-sm-block d-md-block d-lg-none" style="flex: auto">
              <b-nav-item><font-awesome-icon id="popover-notification-1" icon="bell" :class="{'text-warning': this.activitiesNotRated.length || this.activitiesStarted.length || this.activitiesConfirmed.length}" /></b-nav-item>
              <b-popover variant="secondary" :placement="'bottom'" :show.sync="show" target="popover-notification-1" title="Notificações">
                <b-list-group>
                  <b-list-group-item variant="light" @click="goToRating()" class="d-flex justify-content-between align-items-center">
                    Avaliações pendentes
                    <b-badge variant="primary" pill>{{this.activitiesNotRated.length}}</b-badge>
                  </b-list-group-item>
                  <b-list-group-item variant="light" @click="goToActivities()" class="d-flex justify-content-between align-items-center">
                    Atividades à confirmar
                    <b-badge variant="primary" class="ml-1" pill>{{this.activitiesStarted.length}}</b-badge>
                  </b-list-group-item>
                  <b-list-group-item variant="light" @click="goToActivities()" class="d-flex justify-content-between align-items-center">
                    Atividades à finalizar
                    <b-badge variant="primary" class="ml-1" pill>{{this.activitiesConfirmed.length}}</b-badge>
                  </b-list-group-item>
                </b-list-group>
              </b-popover>
            </b-navbar-nav>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav>
                  <b-nav-item :to="{name: 'home'}" class="material-icons">home</b-nav-item>
                  <b-nav-item :to="{name: 'search'}">Encontrar</b-nav-item>
                  <b-nav-item :to="{name: 'worker'}">Cadastrar</b-nav-item>
                  <b-nav-item :to="{name: 'profession'}">Profissões</b-nav-item>
              </b-navbar-nav>

              <!-- Right aligned nav items -->
              <b-navbar-nav class="ml-auto">
                  <b-nav-item class="d-none d-sm-none d-md-none d-lg-block" @click="setShowHideSearchBar()"><font-awesome-icon icon="search" /> Pesquisar</b-nav-item>
                  <b-nav-item id="popover-notification" @click="show = !show" class="d-none d-sm-none d-md-none d-lg-block"><font-awesome-icon icon="bell" :class="{'text-warning': this.activitiesNotRated.length || this.activitiesStarted.length || this.activitiesConfirmed.length}" /></b-nav-item>
                  <b-popover variant="secondary" :placement="'bottom'" :show.sync="show" target="popover-notification" title="Notificações" triggers="hover">
                    <b-list-group-item @click="goToRating()" variant="light" class="pointer d-flex justify-content-between align-items-center">
                      Avaliações pendentes
                      <b-badge variant="primary" class="ml-2" pill>{{this.activitiesNotRated.length}}</b-badge>
                    </b-list-group-item>
                    <b-list-group-item @click="goToActivities()" variant="light" class="pointer d-flex justify-content-between align-items-center">
                      Atividades à confirmar
                      <b-badge variant="primary" class="ml-2" pill>{{this.activitiesStarted.length}}</b-badge>
                    </b-list-group-item>
                    <b-list-group-item @click="goToActivities()" variant="light" class="pointer d-flex justify-content-between align-items-center">
                      Atividades à finalizar
                      <b-badge variant="primary" class="ml-2" pill>{{this.activitiesConfirmed.length}}</b-badge>
                    </b-list-group-item>
                  </b-popover>
                  <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                    <template #button-content>
                        <em>{{user.name}}</em>
                    </template>
                    <b-dropdown-item href="#">Perfil</b-dropdown-item>
                    <b-dropdown-item class="pointer" @click="logout()">Sair</b-dropdown-item>
                  </b-nav-item-dropdown>
              </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <div :class="{'search-bar-closed': !showSearchBar, 'search-bar-open': showSearchBar}" class="bg-dark search-bar">
          <div class="row h-100 justify-content-center align-items-center">
            <div class="col-md-6 col-sx-12">
              <div class="input-group pr-4 pl-4 input-search" v-show="showSearchBar">
                <input type="text" class="form-control" v-model="searchText" ref="inputsearch" placeholder="Buscar" aria-label="Recipient's username" aria-describedby="basic-addon2">
                <div class="input-group-append">
                  <button class="btn btn-secondary" @click="search()" type="button"><font-awesome-icon icon="search" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
    <b-sidebar id="sidebar-1" title="Sidebar" shadow>
        <b-navbar-nav>
          <b-nav-item class="material-icons" v-b-toggle.sidebar-1>home</b-nav-item>
          <b-nav-item href="#">Encontre um profissional</b-nav-item>
          <b-nav-item href="#">Ofereça um serviço</b-nav-item>
          <b-nav-item href="#">Veja as profissões</b-nav-item>
        </b-navbar-nav>
    </b-sidebar>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faBell } from '@fortawesome/free-solid-svg-icons'
library.add(faSearch, faBell)
export default {
  name: 'navbar',
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('activity', ['activitiesNotRated', 'activitiesStarted', 'activitiesConfirmed'])
  },
  data: () => ({
    showSearchBar: false,
    searchText: '',
    show: false
  }),
  methods: {
    ...mapActions('auth', ['ActionSignOut']),
    ...mapActions('profession', ['ActionSearchProfession', 'ActionGetCountProfession', 'ActionSetPageIndex', 'ActionSetSearchText']),
    ...mapActions('search', ['ActionGetAll', 'ActionSearchSetPageIndex', 'ActionSearchSetSearchText', 'ActionGetCountAll', 'ActionSearchFreelancer']),
    setShowHideSearchBar () {
      this.clearSearchText()
      this.showSearchBar = !this.showSearchBar
      if (this.showSearchBar) {
        setTimeout(() => { this.setInputSearchFocus() }, 300)
      }
    },
    showLoader () {
      return this.$loading.show()
    },
    setInputSearchFocus () {
      this.$refs.inputsearch.focus()
    },
    clearSearchText () {
      this.searchText = ''
    },
    async logout () {
      await this.ActionSignOut()
      this.$router.push({ name: 'login' })
    },
    goToActivities () {
      this.show = !this.show
      this.$router.push({ name: 'activities' })
    },
    goToRating () {
      this.show = !this.show
      this.$router.push({ name: 'rating' })
    },
    async search () {
      if (!this.searchText) {
        this.setInputSearchFocus()
        return
      }
      if (this.$route.name === 'profession') {
        const loader = this.showLoader()
        await this.ActionSetPageIndex(1)
        await this.ActionSetSearchText(this.searchText)
        await this.ActionGetCountProfession({ page: 1, limit: 10, searchText: this.searchText })
        await this.ActionSearchProfession({ page: 1, limit: 10, searchText: this.searchText })
        loader.hide()
      }
      if (this.$route.name === 'search' || this.$route.name === 'home') {
        if (this.$route.name === 'home') {
          this.$router.push({ name: 'search' })
        }
        const loader = this.showLoader()
        await this.ActionSearchSetPageIndex(1)
        await this.ActionSearchSetSearchText(this.searchText)
        await this.ActionGetCountAll({ page: 1, limit: 10, searchText: this.searchText })
        await this.ActionSearchFreelancer({ page: 1, limit: 10, searchText: this.searchText })
        loader.hide()
      }
      this.setShowHideSearchBar()
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin search-bar {
  margin-top: 56px;
  position: fixed;
  z-index: 999;
  opacity: 1;
  width: 100%;
  right: 0;
  left: 0;
  -webkit-transition: height 0.1s linear;
  -moz-transition: height 0.5s linear;
  -ms-transition: height 0.5s linear;
  -o-transition: height 0.5s linear;
  transition: height 0.1s linear;
}

.search-bar-closed {
  height: 0;
  @include search-bar
}

.search-bar-open {
  height: 65px;
  @include search-bar
}

.input-search {
  animation: 1s fadeIn;
  animation-fill-mode: forwards;
  visibility: hidden;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    visibility: visible;
    opacity: 1;
  }
}

.nav-item > .dropdown-menu {
    padding: 0rem 0 !important;
    background-color: #000;
}

.dropdown-item:focus, .dropdown-item:hover {
    color: #16181b;
    text-decoration: none;
    background-color: #2c82d8;
}

</style>
