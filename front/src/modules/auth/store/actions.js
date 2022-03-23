import services from '@/http'
import * as storage from '../storage'
import * as types from './mutation-types'

export const ActionDoLogin = ({ dispatch }, payload) => {
  return services.auth.login(payload).then(res => {
    const { user, token } = res.data
    dispatch('ActionSetUser', user)
    dispatch('ActionSetToken', token)
  })
}

export const ActionSetUser = ({ commit }, payload) => {
  storage.setUser(JSON.stringify(payload))
  commit(types.SET_USER, payload)
}

export const ActionSetToken = ({ commit }, payload) => {
  storage.setLocalToken(payload)
  storage.setHeaderToken(payload)
  commit(types.SET_TOKEN, payload)
}

export const ActionSignOut = ({ dispatch }) => {
  storage.setHeaderToken('')
  storage.deleteLocalToken()
  dispatch('ActionSetUser', {})
  dispatch('ActionSetToken', '')
}

export const ActionCheckToken = ({ dispatch, state }) => {
  if (state.token) {
    return Promise.resolve(state.token)
  }

  const token = storage.getLocalToken()

  if (!token) {
    dispatch('ActionSignOut')
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('Token não informado')
  }

  const user = storage.getUser()
  if (user) {
    dispatch('ActionSetUser', JSON.parse(user))
  }
  dispatch('ActionSetToken', token)
  return Promise.resolve(token)
}
