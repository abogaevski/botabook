import AuthService from '@/core/services/auth.service'

import * as Mutation from '../mutation-types'
import router from '@/router'
import alert from '@/core/_utils/swal'

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
      return AuthService.signin(user)
        .then((token) => {
          dispatch('redirectUser', token)
        },
        (error) => {
          commit(Mutation.SIGNIN_FAILURE)
          alert({
            title: error.response ? 'Не удалось войти в систему' : 'Что-то пошло не так',
            html: error.response.data.detail
              ? error.response.data.detail
              : `Произошла неизвестная ошибка, пожалуйста обратитесь в поддержку
              <a href="mailto:support.botabook@gmail.com">сюда</a>
            `,
            icon: 'error'
          })
          return Promise.reject(error)
        })
    },

    signup({ dispatch, commit }, user) {
      return AuthService.signup(user)
        .then((token) => {
          dispatch('redirectUser', token)
        },
        (error) => {
          commit(Mutation.SIGNIN_FAILURE)
          alert({
            title: error.response ? 'Не удалось зарегистрироваться в систему' : 'Что-то пошло не так',
            html: error.response.data.email
              ? error.response.data.email
              : `Произошла неизвестная ошибка, пожалуйста обратитесь в поддержку
              <a href="mailto:support.botabook@gmail.com">сюда</a>
            `,
            icon: 'error'
          })
          return Promise.reject(error)
        })
    },
    redirectUser({ commit }, token) {
      commit(Mutation.SIGNIN_SUCCESS, token)
      router.push({ name: 'calendar' }).then(() => Promise.resolve(token))
    },

    refreshToken({ commit }, accessToken) {
      commit(Mutation.REFRESH_TOKEN, accessToken)
    },

    signout({ commit }) {
      AuthService.signout()
        .then(() => {
          commit(Mutation.SIGNOUT)
          router.push({ name: 'signin' })
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
