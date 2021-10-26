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

  requestPasswordReset(email) {
    return api.post('/account/request-reset-password', { ...email })
      .then((response) => response.data)
  }

  confirmPasswordReset(uid64, token) {
    return api.get(`/account/reset-password/${uid64}/${token}`)
      .then((response) => response.data)
      .catch((e) => Promise.reject(e))
  }

  completePasswordReset(data) {
    return api.patch('/account/reset-password-complete', { ...data })
      .then((response) => response.data)
      .catch((e) => Promise.reject(e))
  }

  verifyEmail(token) {
    return api.get(`/account/verify-email?token=${token}`)
      .then((response) => response.data)
      .catch((e) => Promise.reject(e))
  }

  requestEmailVerification() {
    return api.get('/account/request-email-verification')
      .then((response) => response.data)
      .catch((e) => Promise.reject(e))
  }
}

export default new AuthService();
