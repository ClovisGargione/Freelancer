import Vue from 'vue'
import VueMeta from 'vue-meta'
// eslint-disable-next-line spaced-comment
//import VueMask from 'v-mask'
import VueTheMask from 'vue-the-mask'
import App from './App'
import store from './store'
import router from './router'
import 'bootstrap'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/scss/app.scss'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueLoading from 'vue-loading-overlay/'
import 'vue-loading-overlay/dist/vue-loading.css'
import loaderProps from './assets/loader-config'

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(VueMeta)
Vue.use(VueTheMask)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueLoading, loaderProps)

window._Vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
