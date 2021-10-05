import ProjectService from '@/core/services/project.service'
import * as Mutation from '../mutation-types'

export const getProjectIndexById = (state, projectId) => state.projects.findIndex((project) => project.id.toString() === projectId.toString())

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
    },
    toggleProject({ commit }, toggledProject) {
      toggledProject.isActive = !toggledProject.isActive
      return ProjectService.toggleProject(toggledProject.id, toggledProject.isActive)
        .then((p) => {
          commit(Mutation.UPDATE_PROJECT, p)
        })
    }
  },
  mutations: {
    [Mutation.SET_PROJECTS](state, projects) {
      return state.projects = [...projects]
    },
    [Mutation.CREATE_PROJECT](state, prj) {
      return state.projects.push(prj)
    },
    [Mutation.UPDATE_PROJECT](state, updatedProject) {
      console.log(updatedProject)
      const index = getProjectIndexById(state, updatedProject.id)
      if (index === -1) {
        return console.warn(`Unable to delete event (id ${updatedProject.id})`)
      }
      return state.projects.splice(index, 1, {
        ...state.projects[index],
        ...updatedProject
      })
    }
  },
  getters: {
    projects: (state) => state.projects,
    projectCount: (state) => state.projects.length,
    projectById: (state) => (id) => state.projects.find((p) => p.id.toString() === id.toString())
  }
}
