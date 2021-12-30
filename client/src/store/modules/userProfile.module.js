import UserService from '@/core/services/user.service'
import * as Mutation from '../mutation-types'
import alert from '@/core/_utils/swal'

export const getWhIndexById = (state, whId) => state.userProfile.workHours.findIndex((wh) => wh.id.toString() === whId.toString())

const initialProfile = {
  id: '',
  email: '',
  isVerified: true,
  isSuperuser: false,
  profile: {
    avatar: '/media/avatars/blank.png',
  },
  workHours: []
}
export const userProfile = {
  namespaced: true,
  state: {
    userProfile: initialProfile,
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
    },
    updateWorkHour({ dispatch, commit }, { wh, profileId }) {
      return UserService.updateWorkHour(wh, profileId)
        .then((workHour) => {
          commit(Mutation.UPDATE_WORKHOUR, workHour)
          return Promise.resolve(workHour)
        })
        .catch((error) => {
          alert({ title: 'Произошла ошибка!', html: error, icon: 'error' })
          dispatch('setError', error, { root: true })
          return Promise.reject(error)
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
    },
    [Mutation.UPDATE_WORKHOUR](state, wh) {
      const index = getWhIndexById(state, wh.id)
      if (index === -1) {
        return
      }
      return state.userProfile.workHours.splice(index, 1, {
        ...state.userProfile.workHours[index],
        ...wh
      })
    }

  },
  getters: {
    user: (state) => state.userProfile,
    id: (state) => state.userProfile.id,
    avatar: (state) => state.userProfile.profile.avatar,
    timezone: (state) => state.userProfile.profile.timezone,
    workHours: (state) => state.userProfile.workHours,
  }
}
