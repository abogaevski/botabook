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
    },
    createProject({ commit }, newProject) {
      return ProjectService.createProject(newProject)
        .then((prj) => {
          commit(Mutation.CREATE_PROJECT, prj)
          return Promise.resolve()
        })
    }
  },
  mutations: {
    [Mutation.SET_PROJECTS](state, projects) {
      return state.projects = [...projects]
    },
    [Mutation.CREATE_PROJECT](state, prj) {
      return state.projects.push(prj)
    }
  },
  getters: {
    projects: (state) => state.projects,
    projectCount: (state) => state.projects.length
  }
}
