import CustomerService from '@/core/services/customer.service'
import * as Mutation from '../mutation-types'

export const getCustomerIndexById = (state, customerId) => state.customers.findIndex((customer) => customer.id.toString() === customerId.toString())
export const getBoardColumnIndexById = (state, columnId) => state.boardColumns.findIndex((customer) => customer.id.toString() === columnId.toString())
export const updateCustomerRepresentation = (state, customers) => {
  const updatedCustomers = customers.map((c) => state.customers.find((customer) => customer.id === c))
  // eslint-disable-next-line no-nested-ternary
  updatedCustomers.sort((a, b) => ((a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0)))
  return updatedCustomers
}

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
      commit(Mutation.SET_LOADER, true, { root: true })
      return CustomerService.getBoard()
        .then((columns) => {
          commit(Mutation.SET_BOARD, columns)
          commit(Mutation.SET_LOADER, false, { root: true })
        })
    },
    createBoardColumn({ commit }, column) {
      return CustomerService.createBoardColumn(column)
        .then((newColumn) => {
          commit(Mutation.CREATE_BOARD_COLUMN, newColumn)
        })
    },
    updateBoardColumn({ commit }, column) {
      return CustomerService.updateBoardColumn(column)
        .then((updatedColumn) => {
          commit(Mutation.UPDATE_BOARD_COLUMN, updatedColumn)
        })
    },
    deleteBoardColumn({ commit }, columnId) {
      return CustomerService.deleteBoardColumn(columnId)
        .then(() => commit(Mutation.DELETE_BOARD_COLUMN, columnId))
    }
  },
  mutations: {
    [Mutation.SET_CUSTOMERS](state, customers) {
      return state.customers = [...customers]
    },
    [Mutation.SET_BOARD](state, columns) {
      return state.boardColumns = columns.map((board) => {
        board.customers = updateCustomerRepresentation(state, board.customers)
        return board
      })
    },
    [Mutation.CREATE_BOARD_COLUMN](state, newColumn) {
      return state.boardColumns.push(newColumn)
    },
    [Mutation.UPDATE_BOARD_COLUMN](state, updatedColumn) {
      const index = getBoardColumnIndexById(state, updatedColumn.id)
      if (index === -1) {
        return console.warn(`Unable to delete event (id ${updatedColumn.id})`)
      }
      if (state.boardColumns[index].isPrimary !== updatedColumn.isPrimary) {
        state.boardColumns.find((c) => c.isPrimary).isPrimary = false
      }
      updatedColumn.customers = updateCustomerRepresentation(state, updatedColumn.customers)
      return state.boardColumns.splice(index, 1, {
        ...state.boardColumns[index],
        ...updatedColumn
      })
    },
    [Mutation.DELETE_BOARD_COLUMN](state, columnId) {
      const index = getBoardColumnIndexById(state, columnId)
      if (index === -1) {
        return console.warn(`Unable to delete event (id ${columnId})`)
      }
      const customers = state.boardColumns[index].customers.map((c) => c.id)
      if (customers.length !== 0) {
        const primaryColumn = state.boardColumns.find((c) => c.isPrimary)
        const customersToReplace = updateCustomerRepresentation(state, customers)
        primaryColumn.customers.push(...customersToReplace)
      }
      return state.boardColumns.splice(index, 1)
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
    }
  },
  getters: {
    customers: (state) => state.customers,
    customerCount: (state) => state.customers.length,
    customerById: (state) => (id) => state.customers.find((customer) => customer.id === id),
    board: (state) => state.boardColumns,
    boardById: (state) => (id) => state.boardColumns.find((col) => col.id === id)
  }
}
