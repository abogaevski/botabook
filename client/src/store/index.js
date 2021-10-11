import { createStore } from 'vuex'
import { auth } from '@/store/modules/auth.module';
import { userProfile } from '@/store/modules/userProfile.module'
import { calendar } from '@/store/modules/calendar.module'
import { project } from '@/store/modules/project.module'
import * as Mutation from './mutation-types'
import { customerModule } from '@/store/modules/customer.module'

export default createStore({
  state: {
    error: null,
    title: ''
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
    }
  },
  getters: {
    error: (s) => s.error,
    title: (s) => s.title
  },
  actions: {
    setTitle({ commit }, title) {
      commit(Mutation.SET_TITLE, title)
    }
  },
  modules: {
    auth,
    userProfile,
    calendar,
    project,
    customerModule
  },
});
