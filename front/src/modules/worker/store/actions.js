import services from '@/http'
import * as types from './mutation-types'

export const ActionCreateWorker = ({ dispatch }, payload) => {
  return services.worker.create(payload)
}

export const ActionUpdateWorker = ({ dispatch }, { personal, personalId }) => {
  return services.worker.update({ personalId }, personal)
}

export const ActionRemoveWorker = ({ dispatch }, { personalId }) => {
  return services.worker.remove({ personalId }).then(res => {
    dispatch('ActionGetWorksByUser')
  })
}

export const ActionGetWorksByUser = ({ dispatch }) => {
  services.worker.user().then(res => {
    dispatch('ActionSetWorks', res.data.personals)
  })
}

export const ActionGetWorkById = ({ dispatch }, { personalId }) => {
  return new Promise((resolve, reject) => {
    services.worker.find({ personalId }).then(res => {
      dispatch('ActionSetWork', res.data.personal)
      resolve(res)
    })
  })
}

export const ActionSetWorks = ({ commit }, payload) => {
  commit(types.SET_WORKS, payload)
}

export const ActionGetStates = ({ dispatch }) => {
  services.worker.getStates().then(res => {
    dispatch('ActionSetStates', res.data.states)
  })
}

export const ActionSetStates = ({ commit }, payload) => {
  commit(types.SET_STATES, payload)
}

export const ActionGetCitiesByState = ({ dispatch }, stateId) => {
  services.worker.getCities({ stateId }).then(res => {
    dispatch('ActionSetCities', res.data.cities)
  })
}

export const ActionSetCities = ({ commit }, payload) => {
  commit(types.SET_CITIES, payload)
}

export const ActionSetWork = ({ commit }, payload) => {
  commit(types.SET_WORK, payload)
}

export const ActionUploadImage = ({ dispatch }, { image, personalId }) => {
  return services.worker.uploadImage({ personalId }, image)
}

export const ActionRemoveImage = ({ dispatch }, { imageId, personalId }) => {
  return services.worker.removeImage({ personalId, imageId })
}
