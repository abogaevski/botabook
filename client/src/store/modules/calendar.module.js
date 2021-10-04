import CalendarService from '@/core/services/calendar.service'
import * as Mutation from '../mutation-types'

export const getEventIndexById = (state, eventId) => state.events.findIndex((event) => event.id.toString() === eventId.toString())

export const calendar = {
  namespaced: true,

  state: {
    events: []
  },

  actions: {
    getEvents({ commit }) {
      return CalendarService.getEvents()
        .then((events) => {
          commit(Mutation.GET_EVENTS, events)
        })
    },
    deleteEvent({ commit }, eventId) {
      return CalendarService.deleteEvent(eventId)
        .then(() => {
          commit(Mutation.DELETE_EVENT, eventId)
          return Promise.resolve()
        })
    },
    approveEvent({ commit }, eventId) {
      return CalendarService.approveEvent(eventId)
        .then(() => {
          commit(Mutation.APPROVE_EVENT, eventId)
        })
    }
  },

  mutations: {
    [Mutation.GET_EVENTS](state, events) {
      return state.events = [...events]
    },
    [Mutation.APPROVE_EVENT](state, eventId) {
      const index = getEventIndexById(state, eventId)

      if (index === -1) {
        return console.warn(`Unable to delete event (id ${eventId})`)
      }
      return state.events.splice(index, 1, {
        ...state.events[index],
        isApproved: true,
      })
    },
    [Mutation.DELETE_EVENT](state, eventId) {
      const index = getEventIndexById(state, eventId)

      if (index === -1) {
        return console.warn(`Unable to delete event (id ${eventId})`)
      }

      return state.events.splice(index, 1)
    },
  },

  getters: {
    events: (state) => state.events,
    eventCount: (state) => state.events.length
  }
}
