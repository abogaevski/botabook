import ProjectService from '@/core/services/project.service'
import * as Mutation from '../mutation-types'

export const project = {
  namespaced: true,
  state: {
    projects: []
  },

  actions: {
    getProjects({ commit }) {
      return ProjectService.getProjects()
        .then((projects) => {
          commit(Mutation.SET_PROJECTS, projects)
        })
    }
  },
  mutations: {
    [Mutation.SET_PROJECTS](state, projects) {
      return state.projects = [...projects]
    }
  },
  getters: {
    projects: (state) => state.projects
  }
}
