import CalendarService from '@/core/services/calendar.service'
import * as Mutation from '../mutation-types'
import alert from '@/core/_utils/swal'

export const getEventIndexById = (state, eventId) => state.events.findIndex((event) => event.id.toString() === eventId.toString())

export const calendar = {
  namespaced: true,

  state: {
    events: []
  },

  actions: {
    getEvents({ dispatch, commit }) {
      commit(Mutation.SET_LOADER, true, { root: true })
      return CalendarService.getEvents()
        .then((events) => {
          commit(Mutation.GET_EVENTS, events)
          commit(Mutation.SET_LOADER, false, { root: true })
        })
        .catch((error) => {
          dispatch('setError', error, { root: true })
        })
    },
    deleteEvent({ commit }, eventId) {
      return CalendarService.deleteEvent(eventId)
        .then(() => {
          commit(Mutation.DELETE_EVENT, eventId)
          return Promise.resolve()
        })
    },
    updateEvent({ dispatch, commit }, event) {
      return CalendarService.updateEvent(event.id, event)
        .then((e) => {
          commit(Mutation.UPDATE_EVENT, e)
          return Promise.resolve(e)
        })
        .catch((error) => {
          alert({ title: 'Произошла ошибка!', html: error, icon: 'error' })
          dispatch('setError', error, { root: true })
          return Promise.reject(error)
        })
    }
  },

  mutations: {
    [Mutation.GET_EVENTS](state, events) {
      return state.events = [...events]
    },
    [Mutation.UPDATE_EVENT](state, event) {
      const index = getEventIndexById(state, event.id)
      if (index === -1) {
        return
      }
      return state.events.splice(index, 1, {
        ...state.events[index],
        ...event
      })
    },
    [Mutation.DELETE_EVENT](state, eventId) {
      const index = getEventIndexById(state, eventId)
      if (index === -1) {
        return
      }
      return state.events.splice(index, 1)
    },
  },

  getters: {
    events: (state) => state.events,
    eventCount: (state) => state.events.length,
    eventById: (state) => (id) => state.events.find((e) => e.id.toString() === id.toString()),
    eventsByStatus: (state) => (status) => state.events.filter((e) => e.status.toString() === status.toString())

  }
}
