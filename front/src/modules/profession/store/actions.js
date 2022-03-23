import services from '@/http'
import * as types from './mutation-types'

export const ActionGetProfessions = ({ dispatch }, payload) => {
  return new Promise((resolve, reject) => {
    let params = {}
    if (payload) {
      params = payload
    }
    services.profession.getAll({ page: params.page, limit: params.limit }).then(res => {
      dispatch('ActionSetProfessions', res.data.professions)
      resolve()
    })
  })
}

export const ActionSetProfessions = ({ commit }, payload) => {
  commit(types.SET_PROFESSIONS, payload)
}

export const ActionGetCategories = ({ dispatch }) => {
  return new Promise((resolve, reject) => {
    services.profession.getCategories().then(res => {
      dispatch('ActionSetCategories', res.data)
      resolve()
    })
  })
}

export const ActionSetCategories = ({ commit }, payload) => {
  commit(types.SET_CATEGORIES, payload)
}

export const ActionCreateProfession = ({ commit }, payload) => {
  return services.profession.post(payload)
}

export const ActionRemoveProfession = ({ dispatch, state }, payload) => {
  return services.profession.delete({ id: payload.id }).then(res => {
    const pageParams = { page: state.pageIndex, limit: 10 }
    dispatch('ActionGetCountProfession')
    dispatch('ActionGetProfessions', pageParams)
  })
}

export const ActionUpdateProfession = ({ dispatch }, payload) => {
  return services.profession.put(payload).then((res) => {
    dispatch('ActionSetProfession', res.body.profession)
  })
}

export const ActionGetProfession = ({ dispatch }, payload) => {
  services.profession.get({ id: payload.id }).then((res) => {
    dispatch('ActionSetProfession', res.body.profession)
  })
}

export const ActionSetProfession = ({ commit }, payload) => {
  commit(types.SET_PROFESSION, payload)
}

export const ActionGetCountProfession = ({ dispatch }, payload) => {
  services.profession.count(payload ? { searchText: payload.searchText } : '').then((res) => {
    dispatch('ActionSetCountProfession', res.body.totalRecords)
  })
}

export const ActionSetCountProfession = ({ commit }, payload) => {
  commit(types.SET_COUNT_PROFESSION, payload)
}

export const ActionSetPageIndex = ({ commit }, payload) => {
  commit(types.SET_PAGE_INDEX, payload)
}

export const ActionSearchProfession = ({ dispatch }, { page, limit, searchText }) => {
  return services.profession.search({ page, limit, searchText }).then((res) => {
    dispatch('ActionSetProfessions', res.body.professions)
  })
}

export const ActionSetSearchText = ({ commit }, payload) => {
  commit(types.SET_SEARCH_TEXT, payload)
}
