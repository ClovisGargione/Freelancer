import services from '@/http'
import * as types from './mutation-types'

export const ActionGetByUser = ({ dispatch }, { isStarted, isConfirmed, isFinished, isRated }) => {
  return services.activity.findByUser({ isStarted, isConfirmed, isFinished, isRated })
}

export const ActionGetByPersonalUser = ({ dispatch }, { isStarted, isConfirmed, isFinished, isRated }) => {
  return services.activity.findByPersonalUser({ isStarted, isConfirmed, isFinished, isRated })
}

export const ActionGetPendingByPersonalUser = ({ dispatch }) => {
  return services.activity.findPendingByPersonal()
    .then(res => {
      dispatch('ActionSetActivities', res.data.activity)
    })
}

export const ActionGetActivitiesNotRated = ({ dispatch }, payload) => {
  return services.activity.findByUser({ isStarted: true, isConfirmed: true, isFinished: true, isRated: false })
    .then(res => {
      dispatch('ActionSetActivitiesNotRated', res.data.activity)
    })
}

export const ActionGetActivitiesStarted = ({ dispatch }, payload) => {
  return services.activity.findByPersonalUser({ isStarted: true, isConfirmed: false, isFinished: false, isRated: false })
    .then(res => {
      dispatch('ActionSetActivitiesStarted', res.data.activity)
    })
}

export const ActionGetActivitiesConfirmed = ({ dispatch }, payload) => {
  return services.activity.findByPersonalUser({ isStarted: true, isConfirmed: true, isFinished: false, isRated: false })
    .then(res => {
      dispatch('ActionSetActivitiesConfirmed', res.data.activity)
    })
}

export const ActionCreateActivity = ({ commit }, payload) => {
  return services.activity.create(payload)
}

export const ActionUpdateActivity = ({ commit }, payload) => {
  return services.activity.update(payload)
}

export const ActionSetActivitiesStarted = ({ commit }, payload) => {
  commit(types.SET_ACTIVITIES_STARTED, payload)
}

export const ActionSetActivitiesConfirmed = ({ commit }, payload) => {
  commit(types.SET_ACTIVITIES_CONFIRMED, payload)
}

export const ActionSetActivitiesFinished = ({ commit }, payload) => {
  commit(types.SET_ACTIVITIES_FINISHED, payload)
}

export const ActionSetActivitiesNotRated = ({ commit }, payload) => {
  commit(types.SET_ACTIVITIES_NOT_RATED, payload)
}

export const ActionSetActivities = ({ commit }, payload) => {
  commit(types.SET_ACTIVITIES, payload)
}
