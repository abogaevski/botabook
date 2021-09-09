import UserService from '@/core/services/user.service'

import * as Mutation from '../mutation-types'

const initialProfile = {
  id: '',
  email: '',
  profile: {
    avatar: '',
    city: '',
    company: '',
    country: '',
    createdAt: '',
    firstName: '',
    lastName: '',
    phone: '',
    title: '',
    updatedAt: '',
    website: ''
  }
}
export const userProfile = {
  namespaced: true,
  state: {
    userProfile: initialProfile
  },
  actions: {
    getUserProfile({ commit }) {
      return UserService.getUserProfile()
        .then((user) => {
          commit(Mutation.SET_USERPROFILE, user)
          return Promise.resolve()
        })
        .catch((error) => {
          commit(Mutation.SET_ERROR, error.response, { root: true })
          return Promise.reject(error)
        })
    },

    updateUserProfile({ commit }, { profile, id }) {
      console.log(profile, id)
      return UserService.updateUserProfile(profile, id)
        .then((newProfile) => {
          commit(Mutation.UPDATE_USERPROFILE, newProfile)
          return Promise.resolve()
        })
        .catch((error) => {
          commit(Mutation.SET_ERROR, error.response, { root: true })
          return Promise.reject(error)
        })
    }
  },
  mutations: {
    [Mutation.SET_USERPROFILE](state, user) {
      if (user.profile.avatar === '') {
        user.profile.avatar = '/media/avatars/blank.png'
      }
      console.log(user)
      return state.userProfile = { ...user }
    },
    [Mutation.UPDATE_USERPROFILE](state, profile) {
      return state.userProfile.profile = { ...profile }
    }

  },
  getters: {
    user: (state) => state.userProfile,
    // avatar: (state) => state.userProfile.profile.avatar
  }
}
