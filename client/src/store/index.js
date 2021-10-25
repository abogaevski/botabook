import { createStore } from 'vuex'
import { auth } from '@/store/modules/auth.module';
import { userProfile } from '@/store/modules/userProfile.module'
import { calendar } from '@/store/modules/calendar.module'
import { project } from '@/store/modules/project.module'
import * as Mutation from './mutation-types'
import { customerModule } from '@/store/modules/customer.module'

const states = {
  state: {
    error: null,
    title: '',
    loaderEnabled: false
  },
  mutations: {
    [Mutation.SET_ERROR](state, error) {
      state.error = error
    },
    [Mutation.CLEAR_ERROR](state) {
      state.error = null
    },
    [Mutation.SET_TITLE](state, title) {
      state.title = title
    },
    [Mutation.SET_LOADER](state, loaderStatus) {
      state.loaderEnabled = loaderStatus
    }
  },
  getters: {
    error: (s) => s.error,
    title: (s) => s.title,
    loader: (s) => s.loaderEnabled
  },
  actions: {
    setTitle({ commit }, title) {
      commit(Mutation.SET_TITLE, title)
    },
    setError({ commit }, error) {
      let errorData = ''
      if (error.response) {
        errorData = `Error: ${error.response.statusText}`
      } else if (error.request) {
        errorData = error
      } else {
        errorData = `Error ${error.message}`
      }
      commit(Mutation.SET_ERROR, errorData, { root: true })
    }
  },
  modules: {
    auth,
    userProfile,
    calendar,
    project,
    customerModule
  },
}
const store = createStore(states)

export default store
