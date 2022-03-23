import * as types from './mutation-types'

export default {
  [types.SET_FOUND] (state, payload) {
    state.found = payload
  },
  [types.SET_TOTAL_RECORDS] (state, payload) {
    state.totalRecords = payload
  },
  [types.SET_PAGE_INDEX] (state, payload) {
    state.pageIndex = payload
  },
  [types.SET_SEARCH_TEXT] (state, payload) {
    state.searchText = payload
  }
}
