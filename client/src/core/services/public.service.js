import api from '@/core/services/api'

class PublicService {
  sendNotificationRequest(data) {
    return api
      .post('/notifications/contact-request', { ...data })
      .then((response) => response.data)
  }
}
export default new PublicService()
