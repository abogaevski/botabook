import UserService from '@/core/services/user.service'
import * as Mutation from '../mutation-types'
import alert from '@/core/_utils/swal'

const initialProfile = {
  id: '',
  email: '',
  isVerified: true,
  isSuperUser: false,
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
    getUserProfile({ dispatch, commit }) {
      return UserService.getUserProfile()
        .then((user) => {
          commit(Mutation.SET_USERPROFILE, user)
          return Promise.resolve()
        })
        .catch((error) => {
          dispatch('setError', error, { root: true })
        })
    },

    updateUserProfile({ dispatch, commit }, { values, id }) {
      return UserService.updateUserProfile(values, id)
        .then((newProfile) => {
          commit(Mutation.UPDATE_USERPROFILE, newProfile)
          alert({ title: 'Ваш профиль успешно обновлен!', icon: 'success' })
          return Promise.resolve()
        })
        .catch((error) => {
          dispatch('setError', error, { root: true })
          return Promise.reject(error)
        })
    },

    updateUserProfileAvatar({ dispatch, commit }, { form, id }) {
      return UserService.uploadProfileAvatar(form, id)
        .then((response) => {
          commit(Mutation.UPDATE_USERPROFILE_AVATAR, response.avatar)
          alert({ title: 'Аватар успешно обновлен', icon: 'success' })
        })
        .catch((error) => {
          dispatch('setError', error, { root: true })
          return Promise.reject(error)
        })
    },

    removeUserProfileAvatar({ dispatch, commit }, id) {
      return UserService.removeProfileAvatar(id)
        .then(() => {
          commit(Mutation.REMOVE_USERPROFILE_AVATAR)
          alert({ title: 'Аватар успешно удален', icon: 'success' })
        })
        .catch((error) => {
          dispatch('setError', error, { root: true })
          return Promise.reject(error)
        })
    },
    getPublicProfile({ dispatch, commit }, slug) {
      return UserService.getPublicProfile(slug)
        .then((profile) => commit(Mutation.SET_PUBLICPROFILE, profile))
        .catch((e) => {
          dispatch('setError', e, { root: true })
          return Promise.reject(e)
        })
    }
  },
  mutations: {
    [Mutation.SET_USERPROFILE](state, user) {
      if (!user.profile.avatar) {
        user.profile.avatar = initialProfile.profile.avatar
      }
      return state.userProfile = { ...user }
    },
    [Mutation.SET_PUBLICPROFILE](state, profile) {
      if (!profile.avatar) {
        profile.avatar = initialProfile.profile.avatar
      }
      return state.userProfile = { ...profile }
    },
    [Mutation.UPDATE_USERPROFILE](state, profile) {
      if (!profile.avatar) {
        profile.avatar = initialProfile.profile.avatar
      }
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
