import Vue from 'vue'
import VueResource from 'vue-resource'
import services from './services'
import interceptor from './interceptors'

Vue.use(VueResource)

const http = Vue.http

http.options.root = 'http://192.168.1.5:3000/'

http.interceptors.push(interceptor)

Object.keys(services).map(service => {
  services[service] = Vue.resource('', {}, services[service])
})

const setBearerToken = token => {
  http.headers.common.Authorization = `Bearer ${token}`
}

export { http, setBearerToken }
export default services
