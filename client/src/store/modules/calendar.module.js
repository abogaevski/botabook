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
    createEvent({ commit }, newEvent) {
      return CalendarService.createEvent(newEvent)
        .then((event) => {
          commit(Mutation.CREATE_EVENT, event)
          return Promise.resolve()
        })
    },
    updateEvent({ commit }, updatedEvent) {
      return CalendarService.updateEvent(updatedEvent)
        .then((event) => {
          commit(Mutation.UPDATE_EVENT, event)
        })
    },
    deleteEvent({ commit }, eventId) {
      return CalendarService.deleteEvent(eventId)
        .then(() => {
          commit(Mutation.DELETE_EVENT, eventId)
          return Promise.resolve()
        })
    }
  },

  mutations: {
    [Mutation.GET_EVENTS](state, events) {
      return state.events = [...events]
    },
    [Mutation.CREATE_EVENT](state, event) {
      return state.events.push(event)
    },
    [Mutation.UPDATE_EVENT](state, updatedEvent) {
      const index = getEventIndexById(state, updatedEvent.id)

      if (index === -1) {
        return console.warn(`Unable to update event (id ${updatedEvent.id})`)
      }

      return state.events.splice(index, 1, {
        ...state.events[index],
        title: updatedEvent.title,
        start: updatedEvent.start,
        end: updatedEvent.end,
        date: updatedEvent.date,
        allDay: updatedEvent.allDay
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
