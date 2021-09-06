import api from './api'

class UserService {
  getUserInfo() {
    return api.get('/account/user');
  }
}

export default new UserService();
