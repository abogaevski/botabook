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
}

export default new CustomerService()
