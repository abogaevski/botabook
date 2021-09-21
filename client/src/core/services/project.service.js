import api from './api'

class ProjectService {
  getProjects() {
    return api
      .get('/projects')
      .then((response) => response.data)
  }

  createProject(project) {
    return api
      .post('/projects/create', { ...project })
      .then((response) => response.data)
  }
}
export default new ProjectService()
