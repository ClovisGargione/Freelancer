import * as types from './mutation-types'

export default {
  [types.SET_WORKERS] (state, payload) {
    state.workers = payload
  }
}
