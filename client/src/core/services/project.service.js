import api from './api'

class ProjectService {
  getProjects() {
    return api
      .get('/projects')
      .then((response) => response.data)
  }
}
export default new ProjectService()
