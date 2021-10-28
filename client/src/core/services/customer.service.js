import api from '@/core/services/api'

class CustomerService {
  getCustomers() {
    return api
      .get('/customers/')
      .then((response) => response.data)
  }

  updateCustomer(customer) {
    return api
      .patch(`/customers/${customer.id}`, { ...customer })
      .then((response) => response.data)
  }

  deleteCustomer(customerId) {
    return api
      .delete(`/customers/${customerId}`)
      .then(() => Promise.resolve())
      .catch((e) => Promise.reject(e))
  }

  getBoard() {
    return api
      .get('/customers/board')
      .then((response) => response.data)
  }

  createBoardColumn(column) {
    return api
      .post('/customers/board/column/create', { ...column })
      .then((response) => response.data)
  }

  updateBoardColumn(column) {
    return api
      .patch(`/customers/board/column/${column.id}`, { ...column })
      .then((response) => response.data)
  }

  deleteBoardColumn(id) {
    return api
      .delete(`/customers/board/column/${id}`)
      .then((response) => response)
  }
}

export default new CustomerService()
