import api from '@/core/services/api'

class CustomerService {
  getCustomers() {
    return api
      .get('/customers/')
      .then((response) => response.data)
  }
}

export default new CustomerService()
