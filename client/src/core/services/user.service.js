import api from './api'

class UserService {
  getUserProfile() {
    return api
      .get('/account/user')
      .then((response) => response.data)
  }

  updateUserProfile(profile, id) {
    return api
      .put(`/account/user/${id}/update`, { ...profile })
      .then((response) => response.data)
  }
}

export default new UserService();
