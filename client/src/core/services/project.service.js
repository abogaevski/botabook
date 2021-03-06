import api from './api'

class ProjectService {
  getProjects() {
    return api
      .get('/projects/')
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  }

  retrieveProject(id) {
    return api
      .get(`/projects/${id}`)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  }

  createProject(project) {
    return api
      .post('/projects/create', { ...project })
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  }

  toggleProject(projectId, status) {
    return api
      .patch(`/projects/${projectId}`, { isActive: status })
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  }

  updateProject(projectId, project) {
    return api
      .put(`/projects/${projectId}`, { ...project })
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  }

  deleteProject(projectId) {
    return api
      .delete(`/projects/${projectId}`)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  }

  getPublicProjects(slug) {
    return api
      .get(`/projects/profile/${slug}/projects`)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  }
}
export default new ProjectService()
