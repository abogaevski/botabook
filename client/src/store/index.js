import { createStore } from 'vuex'
import { auth } from './modules/auth.module';
import { userProfile } from './modules/userProfile.module'
import { calendar } from './modules/calendar.module'
import { project } from './modules/project.module'
import { customerModule } from './modules/customer.module'
import { adminModule } from './modules/admin.module'
import * as Mutation from './mutation-types'
import UserService from '@/core/services/user.service'
import setError from '@/core/_utils/helpers/error-helpers/setError'

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
      const e = setError(error)
      commit(Mutation.SET_ERROR, e)
    },
    retrieveUserData({ commit }) {
      return UserService.retrieveUserData()
        .then((user) => {
          commit(`calendar/${Mutation.GET_EVENTS}`, [...user.events])
          commit(`customerModule/${Mutation.SET_CUSTOMERS}`, [...user.customers])
          commit(`customerModule/${Mutation.SET_BOARD}`, [...user.boardColumns])
          commit(`project/${Mutation.SET_PROJECTS}`, [...user.projects])
          commit(`userProfile/${Mutation.SET_USERPROFILE}`, {
            id: user.id,
            isVerified: user.isVerified,
            isSuperuser: user.isSuperuser,
            profile: user.profile
          })
        })
    }
  },
  modules: {
    auth,
    userProfile,
    calendar,
    project,
    customerModule,
    adminModule
  },
}
const store = createStore(states)

export default store
