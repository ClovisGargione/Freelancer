import * as types from './mutation-types'

export default {
  [types.SET_ACTIVITIES_STARTED] (state, payload) {
    state.activitiesStarted = payload
  },
  [types.SET_ACTIVITIES_CONFIRMED] (state, payload) {
    state.activitiesConfirmed = payload
  },
  [types.SET_ACTIVITIES_FINISHED] (state, payload) {
    state.activitiesFinished = payload
  },
  [types.SET_ACTIVITIES_NOT_RATED] (state, payload) {
    state.activitiesNotRated = payload
  },
  [types.SET_ACTIVITIES] (state, payload) {
    state.activities = payload
  }
}
