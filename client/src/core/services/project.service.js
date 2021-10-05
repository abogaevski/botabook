import api from './api'
import getErrorStatusCode from '@/core/_utils/helpers/error-helpers/getErrorStatusCode'
import router from '@/router'

class ProjectService {
  getProjects() {
    return api
      .get('/projects/')
      .then((response) => response.data)
  }

  createProject(project) {
    return api
      .post('/projects/create', { ...project })
      .then((response) => response.data)
  }

  toggleProject(projectId, status) {
    return api
      .patch(`/projects/${projectId}`, { isActive: status })
      .then((response) => response.data)
  }

  getPublicProjects(slug) {
    return api
      .get(`/projects/profile/${slug}/projects`)
      .then((response) => response.data)
      .catch((error) => {
        if (error.response) {
          const status = getErrorStatusCode(error.response)
          const redirectPath = status === 404 ? '/404' : '/500'
          router.push(redirectPath)
        }
      })
  }
}
export default new ProjectService()
