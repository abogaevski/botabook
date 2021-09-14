import { createStore } from 'vuex'
import { auth } from '@/store/modules/auth.module';
import { userProfile } from '@/store/modules/userProfile.module'
import { calendar } from '@/store/modules/calendar.module'
import { project } from '@/store/modules/project.module'
import * as Mutation from './mutation-types'

export default createStore({
  state: {
    error: null
  },
  mutations: {
    [Mutation.SET_ERROR](state, error) {
      state.error = error
    },
    [Mutation.CLEAR_ERROR](state) {
      state.error = null
    }
  },
  getters: {
    error: (s) => s.error
  },
  actions: {
  },
  modules: {
    auth,
    userProfile,
    calendar,
    project
  },
});
