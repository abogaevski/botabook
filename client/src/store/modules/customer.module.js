import CustomerService from '@/core/services/customer.service'

import * as Mutation from '../mutation-types'

export const customerModule = {
  namespaced: true,
  state: {
    customers: []
  },
  actions: {
    getCustomers({ commit }) {
      return CustomerService.getCustomers()
        .then((customers) => {
          commit(Mutation.SET_CUSTOMERS, customers)
        })
    }
  },
  mutations: {
    [Mutation.SET_CUSTOMERS](state, customers) {
      return state.customers = [...customers]
    }
  },
  getters: {
    customers: (state) => state.customers,
    customerCount: (state) => state.customers.length,
    customerById: (state) => (id) => state.customers.find((customer) => customer.id === id)
  }
}
