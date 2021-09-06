import api from './api';
import TokenService from './token.service'

class AuthService {
  signin(user) {
    return api
      .post('/account/signin', { ...user })
      .then((response) => {
        if (response.data.access) {
          TokenService.setUser(response.data)
        }

        return response.data
      });
  }

  signout() {
    TokenService.removeUser()
    return Promise.resolve()
  }

  signup(user) {
    return api.post('/account/signup', { ...user })
      .then((response) => {
        if (response.data.access) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }
}

export default new AuthService();
