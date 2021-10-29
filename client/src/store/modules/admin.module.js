import AdminService from '@/core/services/admin.service'
import * as Mutation from '../mutation-types'

export const adminModule = {
  namespaced: true,
  state: {
    counters: []
  },
  actions: {
    getCounters({ dispatch, commit }) {
      return AdminService.getCounters()
        .then((c) => commit(Mutation.SET_COUNTERS, c))
        .catch((e) => dispatch('setError', e, { root: true }))
    }
  },
  mutations: {
    [Mutation.SET_COUNTERS](state, counters) {
      return state.counters = { ...counters }
    }
  },
  getters: {
    counters: (state) => state.counters
  }
}
