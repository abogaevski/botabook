import api from './api'

class CalendarService {
  getEvents() {
    return api
      .get('/events/')
      .then((response) => response.data)
  }

  createEvent(event) {
    return api
      .post('/events/create', { ...event })
      .then((response) => response.data)
  }

  updateEvent(event) {
    const { id } = event
    return api
      .put(`/events/${id}`, { ...event })
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
  }

  addEventRequest(eventData) {
    return api
      .post('/events/event-request', { ...eventData })
      .then((response) => response.data)
  }

  // retrieveEvent(eventId) {
  //   return api
  //     .get(`/events/${eventId}`)
  //     .then((response) => response.data)
  // }
}

export default new CalendarService()
