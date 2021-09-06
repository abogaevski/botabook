import AuthService from '@/core/services/auth.service'
import router from '@/router';

import * as Mutation from '../mutation-types'

const userInStorage = JSON.parse(localStorage.getItem('user'));
const initialUser = {
  access: '',
  refresh: '',
  data: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
  }
}
const initialState = userInStorage
  ? { status: { isAuthenticated: true }, user: { ...userInStorage } }
  : { status: { isAuthenticated: false }, user: initialUser };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {

    signin({ commit }, user) {
      return AuthService.signin(user).then(
        (u) => {
          commit(Mutation.SIGNIN_SUCCESS, u);
          return Promise.resolve(u);
        },
        (error) => {
          commit(Mutation.SIGNIN_FAILURE);
          commit(Mutation.SET_ERROR, error.response.data.detail, { root: true })
          return Promise.reject(error);
        }
      );
    },

    signup({ commit }, user) {
      return AuthService.signup(user).then(
        (u) => {
          commit(Mutation.SIGNIN_SUCCESS, u);
          return Promise.resolve(u);
        },
        (error) => {
          commit(Mutation.SIGNIN_FAILURE);
          commit(Mutation.SET_ERROR, error.response.data.email[0], { root: true })
          return Promise.reject(error);
        }
      )
    },

    refreshToken({ commit }, accessToken) {
      commit(Mutation.REFRESH_TOKEN, accessToken);
    },

    signout({ commit }) {
      AuthService.signout()
        .then(() => {
          commit(Mutation.SIGNOUT);
        })
    },
  },

  mutations: {
    [Mutation.SIGNIN_SUCCESS](state, user) {
      router.push({ name: 'dashboard' })
      state.status.isAuthenticated = true;
      state.user = user;
    },
    [Mutation.SIGNIN_FAILURE](state) {
      state.status.isAuthenticated = false;
      state.user = initialUser;
    },
    [Mutation.REFRESH_TOKEN](state, accessToken) {
      state.status.isAuthenticated = true;
      state.user = { ...state.user, access: accessToken };
    },
    [Mutation.SIGNOUT](state) {
      router.push({ name: 'signin' })
      state.status.isAuthenticated = false;
      state.user = initialUser;
    },
  },
  getters: {
    user: (state) => state.user.data
  }
}
