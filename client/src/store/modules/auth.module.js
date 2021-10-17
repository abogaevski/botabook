import AuthService from '@/core/services/auth.service'

import * as Mutation from '../mutation-types'

const tokenInStorage = JSON.parse(localStorage.getItem('token'))
const initialToken = {
  access: '',
  refresh: ''
}
const initialState = tokenInStorage
  ? { status: { isAuthenticated: true }, token: { ...tokenInStorage } }
  : { status: { isAuthenticated: false }, token: initialToken }

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {

    signin({ commit, dispatch }, user) {
      return AuthService.signin(user).then(
        (token) => {
          commit(Mutation.SIGNIN_SUCCESS, token)
          dispatch('userProfile/getUserProfile', {}, { root: true })
          return Promise.resolve(token)
        },
        (error) => {
          commit(Mutation.SIGNIN_FAILURE)
          commit(Mutation.SET_ERROR, error.response.data.detail, { root: true })
          return Promise.reject(error)
        }
      )
    },

    signup({ commit }, user) {
      return AuthService.signup(user).then(
        (token) => {
          commit(Mutation.SIGNIN_SUCCESS, token)
          return Promise.resolve(token)
        },
        (error) => {
          commit(Mutation.SIGNIN_FAILURE)
          commit(Mutation.SET_ERROR, error.response.data.email[0], { root: true })
          return Promise.reject(error)
        }
      )
    },

    refreshToken({ commit }, accessToken) {
      commit(Mutation.REFRESH_TOKEN, accessToken)
    },

    signout({ commit }) {
      AuthService.signout()
        .then(() => {
          commit(Mutation.SIGNOUT)
        })
    }
  },

  mutations: {
    [Mutation.SIGNIN_SUCCESS](state, token) {
      state.status.isAuthenticated = true
      state.token = token
    },
    [Mutation.SIGNIN_FAILURE](state) {
      state.status.isAuthenticated = false
      state.token = initialToken
    },
    [Mutation.REFRESH_TOKEN](state, accessToken) {
      state.status.isAuthenticated = true
      state.token = { ...state.token, access: accessToken }
    },
    [Mutation.SIGNOUT](state) {
      state.status.isAuthenticated = false
      state.token = initialToken
    }
  }
}
