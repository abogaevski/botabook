import UserService from '@/core/services/user.service'

import * as Mutation from '../mutation-types'

const initialProfile = {
  id: '',
  email: '',
  profile: {
    avatar: '/media/avatars/blank.png',
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
      return UserService.updateUserProfile(profile, id)
        .then((newProfile) => {
          commit(Mutation.UPDATE_USERPROFILE, newProfile)
          return Promise.resolve()
        })
        .catch((error) => {
          commit(Mutation.SET_ERROR, error.response, { root: true })
          return Promise.reject(error)
        })
    },

    updateUserProfileAvatar({ commit }, { form, id }) {
      return UserService.uploadProfileAvatar(form, id)
        .then((response) => {
          commit(Mutation.UPDATE_USERPROFILE_AVATAR, response.avatar)
        })
    },

    removeUserProfileAvatar({ commit }, id) {
      return UserService.removeProfileAvatar(id)
        .then(() => {
          commit(Mutation.REMOVE_USERPROFILE_AVATAR)
        })
    }
  },
  mutations: {
    [Mutation.SET_USERPROFILE](state, user) {
      if (user.profile.avatar === null) {
        user.profile.avatar = initialProfile.profile.avatar
      }
      return state.userProfile = { ...user }
    },
    [Mutation.UPDATE_USERPROFILE](state, profile) {
      return state.userProfile.profile = { ...profile }
    },
    [Mutation.UPDATE_USERPROFILE_AVATAR](state, avatar) {
      return state.userProfile.profile.avatar = avatar
    },
    [Mutation.REMOVE_USERPROFILE_AVATAR](state) {
      return state.userProfile.profile.avatar = initialProfile.profile.avatar
    }

  },
  getters: {
    user: (state) => state.userProfile,
    avatar: (state) => state.userProfile.profile.avatar,
    timezone: (state) => state.userProfile.profile.timezone,
  }
}
