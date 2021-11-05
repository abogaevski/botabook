import api from './api'
import router from '@/router'
import getErrorStatusCode from '@/core/_utils/helpers/error-helpers/getErrorStatusCode'

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

  retrieveUserData() {
    return api
      .get('/account/user/retrieve')
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

  getPublicProfile(slug) {
    return api
      .get(`/account/profile/${slug}/info`)
      .then((response) => response.data)
      .catch((error) => {
        if (error.response) {
          const status = getErrorStatusCode(error.response)
          const redirectPath = status === 404 ? '/404' : '/500'
          router.push(redirectPath)
        }
      })
  }

  checkProfileSlug(slug) {
    return api
      .get(`/account/profile/check-slug/${slug}`)
      .then((response) => response.data)
  }
}

export default new UserService();
