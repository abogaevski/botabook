import api from './api'

class AdminService {
  getCounters() {
    return api.get('/account/counter')
      .then((response) => Promise.resolve(response.data))
      .catch((e) => Promise.reject(e))
  }
}
export default new AdminService()
