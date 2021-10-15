import CustomerService from '@/core/services/customer.service'
import * as Mutation from '../mutation-types'

export const getCustomerIndexById = (state, customerId) => state.customers.findIndex((customer) => customer.id.toString() === customerId.toString())

export const customerModule = {
  namespaced: true,
  state: {
    customers: [],
    boardColumns: []
  },
  actions: {
    getCustomers({ commit }) {
      return CustomerService.getCustomers()
        .then((customers) => {
          commit(Mutation.SET_CUSTOMERS, customers)
        })
    },
    updateCustomer({ commit }, updatedCustomer) {
      return CustomerService.updateCustomer(updatedCustomer)
        .then((customer) => {
          commit(Mutation.UPDATE_CUSTOMER, customer)
        })
    },
    getBoard({ commit }) {
      return CustomerService.getBoard()
        .then((columns) => {
          commit(Mutation.SET_BOARD, columns)
        })
    },
    createBoardColumn({ commit }, column) {
      return CustomerService.createBoardColumn(column)
        .then((newColumn) => {
          commit(Mutation.CREATE_BOARD_COLUMN, newColumn)
        })
    }
  },
  mutations: {
    [Mutation.SET_CUSTOMERS](state, customers) {
      return state.customers = [...customers]
    },
    [Mutation.SET_BOARD](state, columns) {
      return state.boardColumns = columns.map((board) => {
        board.customers = board.customers.map((c) => state.customers.find((customer) => customer.id === c))
        // eslint-disable-next-line no-nested-ternary
        board.customers.sort((a, b) => ((a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0)))

        return board
      })
    },
    [Mutation.CREATE_BOARD_COLUMN](state, newColumn) {
      return state.boardColumns.push(newColumn)
    },
    [Mutation.UPDATE_CUSTOMER](state, updatedCustomer) {
      const index = getCustomerIndexById(state, updatedCustomer.id)
      if (index === -1) {
        return console.warn(`Unable to delete event (id ${updatedCustomer.id})`)
      }
      return state.customers.splice(index, 1, {
        ...state.customers[index],
        ...updatedCustomer
      })
    },
  },
  getters: {
    customers: (state) => state.customers,
    customerCount: (state) => state.customers.length,
    customerById: (state) => (id) => state.customers.find((customer) => customer.id === id),
    board: (state) => state.boardColumns
  }
}
