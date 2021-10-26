import axiosInstance from './api'
import TokenService from './token.service'
import EventBus from '@/core/EventBus'

const excludedUrls = [
  '/account/signin',
  '/account/signup',
  '/account/reset-password',
]
const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  axiosInstance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalConfig = err.config
      if (excludedUrls.includes(originalConfig.url) && err.response) {
        if (err.response.status === 401 && originalConfig.url === '/account/token/refresh') {
          TokenService.removeUser()
          EventBus.dispatch('signout')
          return Promise.reject(err)
        }
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true
          try {
            const rs = await axiosInstance.post('/account/token/refresh', {
              refresh: TokenService.getLocalRefreshToken()
            })

            const { access } = rs.data

            store.dispatch('auth/refreshToken', access)
            TokenService.updateLocalAccessToken(access)

            return axiosInstance(originalConfig)
          } catch (_error) {
            return Promise.reject(_error)
          }
        }
      }

      return Promise.reject(err)
    }
  )
}

export default setup
