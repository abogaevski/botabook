import ProjectService from '@/core/services/project.service'
import * as Mutation from '../mutation-types'
import alert from '@/core/_utils/swal'

export const getProjectIndexById = (state, projectId) => state.projects.findIndex((project) => project.id.toString() === projectId.toString())

export const project = {
  namespaced: true,
  state: {
    projects: []
  },

  actions: {
    getProjects({ dispatch, commit }) {
      commit(Mutation.SET_LOADER, true, { root: true })
      return ProjectService.getProjects()
        .then((projects) => {
          commit(Mutation.SET_PROJECTS, projects)
          commit(Mutation.SET_LOADER, false, { root: true })
        })
        .catch((error) => {
          dispatch('setError', error, { root: true })
        })
    },
    createProject({ dispatch, commit }, newProject) {
      return ProjectService.createProject(newProject)
        .then((prj) => {
          commit(Mutation.CREATE_PROJECT, prj)
          alert({ title: 'Услуга успешно добавлена', icon: 'success' })
          return Promise.resolve()
        })
        .catch((error) => {
          dispatch('setError', error, { root: true })
          return Promise.reject(error)
        })
    },
    toggleProject({ dispatch, commit }, toggledProject) {
      toggledProject.isActive = !toggledProject.isActive
      return ProjectService.toggleProject(toggledProject.id, toggledProject.isActive)
        .then((p) => {
          commit(Mutation.UPDATE_PROJECT, p)
          alert({ title: 'Статус услуги изменен успешно', icon: 'success' })
        })
        .catch((error) => {
          dispatch('setError', error, { root: true })
          return Promise.reject(error)
        })
    },
    updateProject({ dispatch, commit }, updatedProject) {
      const { id } = updatedProject
      return ProjectService.updateProject(id, updatedProject)
        .then((p) => {
          commit(Mutation.UPDATE_PROJECT, p)
          alert({ title: 'Услуга изменена успешно', icon: 'success' })
        })
        .catch((error) => {
          dispatch('setError', error, { root: true })
          return Promise.reject(error)
        })
    },
    deleteProject({ dispatch, commit }, projectId) {
      return ProjectService.deleteProject(projectId)
        .then(() => commit(Mutation.DELETE_PROJECT, projectId))
        .catch((error) => {
          dispatch('setError', error, { root: true })
          return Promise.reject(error)
        })
    },
    getPublicProjects({ commit }, slug) {
      return ProjectService.getPublicProjects(slug)
        .then((p) => commit(Mutation.SET_PROJECTS, p))
        .catch((error) => Promise.reject(error))
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
      const index = getProjectIndexById(state, updatedProject.id)
      if (index === -1) {
        return
      }
      return state.projects.splice(index, 1, {
        ...state.projects[index],
        ...updatedProject
      })
    },
    [Mutation.DELETE_PROJECT](state, projectId) {
      const index = getProjectIndexById(state, projectId)
      if (index === -1) {
        return
      }

      return state.projects.splice(index, 1)
    }
  },
  getters: {
    projects: (state) => state.projects,
    projectCount: (state) => state.projects.length,
    projectById: (state) => (id) => state.projects.find((p) => p.id.toString() === id.toString())
  }
}
