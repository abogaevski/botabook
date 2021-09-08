import api from './api'

class UserService {
  getUserProfile() {
    return api
      .get('/account/user')
      .then((response) => response.data)
  }
}

export default new UserService();
