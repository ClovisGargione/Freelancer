import * as types from './mutation-types'

export default {
  [types.SET_WORKS] (state, payload) {
    state.works = payload
  },
  [types.SET_STATES] (state, payload) {
    state.states = payload
  },
  [types.SET_CITIES] (state, payload) {
    state.cities = payload
  },
  [types.SET_WORK] (state, payload) {
    state.work = payload
  }
}
