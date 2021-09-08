import UserService from '@/core/services/user.service'

import * as Mutation from '../mutation-types'

export const userProfile = {
  namespaced: true,
  state: {
    userProfile: {}
  },
  actions: {
    getUserProfile({ commit }) {
      return UserService.getUserProfile()
        .then((profile) => {
          commit(Mutation.SET_USERPROFILE, profile)
          return Promise.resolve()
        })
        .catch((error) => {
          commit(Mutation.SET_ERROR, error.response, { root: true })
          return Promise.reject(error)
        })
    }
  },
  mutations: {
    [Mutation.SET_USERPROFILE](state, profile) {
      return state.userProfile = { ...profile }
    },
  },
  getters: {
    user: (state) => state.userProfile,
    // avatar: (state) => state.userProfile.profile.avatar
  }
}
