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
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  }

  retrieveUserData() {
    return api
      .get('/account/user/retrieve')
      .then((response) => response.data)
      .catch((error) => Promise.reject(error))
  }

  updateUserProfile(profile, id) {
    return api
      .put(`/account/user/${id}/update`, { ...profile })
      .then((response) => response.data)
      .catch((error) => Promise.reject(error))
  }

  updateWorkHour(wh, id) {
    if (wh.dayOff) {
      wh.startTime = null
      wh.endTime = null
    }
    return api
      .patch(`/account/user/${id}/work-hour/update`, { ...wh })
      .then((response) => response.data)
      .catch((error) => Promise.reject(error))
  }

  uploadProfileAvatar(form, id) {
    return api
      .patch(`/account/user/${id}/upload-avatar`, form, fileUploadConfig)
      .then((response) => response.data)
      .catch((error) => Promise.reject(error))
  }

  removeProfileAvatar(id) {
    return api
      .patch(`/account/user/${id}/remove-avatar`)
      .then((response) => response.data)
      .catch((error) => Promise.reject(error))
  }

  getPublicProfile(slug) {
    return api
      .get(`/account/profile/${slug}/info`)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  }

  checkProfileSlug(slug) {
    return api
      .get(`/account/profile/check-slug/${slug}`)
      .then((response) => response.data)
  }
}

export default new UserService();
