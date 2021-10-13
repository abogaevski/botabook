import api from './api'
import getErrorStatusCode from '@/core/_utils/helpers/error-helpers/getErrorStatusCode'
import router from '@/router'

class CalendarService {
  getEvents() {
    return api
      .get('/events/')
      .then((response) => response.data)
  }

  updateEvent(id, event) {
    return api
      .patch(`/events/${id}`, event)
      .then((response) => response.data)
  }

  deleteEvent(eventId) {
    return api
      .delete(`/events/${eventId}`)
      .then((response) => response)
  }

  getAvailableDates(slug, date, projectId) {
    return api
      .get(`/events/${slug}/${projectId}/${date}`)
      .then((response) => response.data)
      .catch((error) => {
        if (error.response) {
          const status = getErrorStatusCode(error.response)
          const redirectPath = status === 404 ? '/404' : '/500'
          router.push(redirectPath)
        }
      })
  }

  addEventRequest(eventData) {
    return api
      .post('/events/event-request', { ...eventData })
      .then((response) => response.data)
  }
}

export default new CalendarService()
