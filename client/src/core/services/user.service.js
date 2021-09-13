import api from './api'

const fileUploadConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
  }
}

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

  uploadProfileAvatar(form, id) {
    return api
      .patch(`/account/user/${id}/upload-avatar`, form, fileUploadConfig)
      .then((response) => response.data)
  }

  removeProfileAvatar(id) {
    return api
      .patch(`/account/user/${id}/remove-avatar`)
      .then((response) => response.data)
  }
}

export default new UserService();
