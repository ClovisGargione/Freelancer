import services from '@/http'
import * as types from './mutation-types'

export const ActionGetAll = ({ dispatch }, { page, limit }) => {
  services.search.all({ page, limit }).then(res => {
    dispatch('ActionSetFound', res.data.personals)
  })
}

export const ActionGetCountAll = ({ dispatch }, payload) => {
  services.search.count(payload ? { searchText: payload.searchText } : '').then((res) => {
    dispatch('ActionSearchSetTotalRecords', res.body.totalRecords)
  })
}

export const ActionSearchFreelancer = ({ dispatch }, { page, limit, searchText }) => {
  return services.search.search({ page, limit, searchText }).then((res) => {
    dispatch('ActionSetFound', res.body.personals)
  })
}

export const ActionSetFound = ({ commit }, payload) => {
  commit(types.SET_FOUND, payload)
}

export const ActionSearchSetTotalRecords = ({ commit }, payload) => {
  commit(types.SET_TOTAL_RECORDS, payload)
}

export const ActionSearchSetPageIndex = ({ commit }, payload) => {
  commit(types.SET_PAGE_INDEX, payload)
}

export const ActionSearchSetSearchText = ({ commit }, payload) => {
  commit(types.SET_SEARCH_TEXT, payload)
}
