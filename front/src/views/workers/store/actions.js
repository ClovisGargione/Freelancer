import services from '@/http'
import * as types from './mutation-types'

export const ActionGetWorkers = ({ commit }) => {
  services.workers.getAll().then(res => {
    commit(types.SET_WORKERS, res.data.personals)
  })
}
