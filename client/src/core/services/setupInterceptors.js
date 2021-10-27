import axiosInstance from './api'
import TokenService from './token.service'

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
      if (originalConfig.url !== '/account/signin' && err.response) {
        originalConfig._retry = false
        if (err.response.status === 401 && originalConfig.url === '/account/token/refresh') {
          store.dispatch('auth/signout')
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
            store.dispatch('auth/signout')
            return Promise.reject(_error)
          }
        }
      }
      return Promise.reject(err)
    }
  )
}

export default setup
