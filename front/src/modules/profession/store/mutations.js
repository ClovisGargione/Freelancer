import * as types from './mutation-types'

export default {
  [types.SET_PROFESSIONS] (state, payload) {
    state.professions = payload
  },
  [types.SET_CATEGORIES] (state, payload) {
    state.categories = payload
  },
  [types.SET_PROFESSION] (state, payload) {
    state.profession = payload
  },
  [types.SET_COUNT_PROFESSION] (state, payload) {
    state.totalRecords = payload
  },
  [types.SET_PAGE_INDEX] (state, payload) {
    state.pageIndex = payload
  },
  [types.SET_SEARCH_TEXT] (state, payload) {
    state.searchText = payload
  }
}
