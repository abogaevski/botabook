<template>
  <div class="card card-flush">
    <div class="card-header mt-6">
      <div class="card-title flex-column">
        <h3 class="fw-bolder mb-1">Последние 5 клиентов</h3>
        <div class="fs-6 text-gray-400">Клиенты, подписанные на услугу</div>
      </div>
    </div>
    <div class="card-body pt-2">
      <template v-if="customers.length">
        <template v-for="(customer, i) in customers" :key="i">
          <div class="d-flex align-items-center mb-7">
            <div class="symbol symbol-50px me-5">
              <span
                class="symbol-label fw-bolder"
                :class="getCustomerColorClass(customer.color)"
              >
                {{ customer.initials }}
              </span>
            </div>
            <div class="flex-grow-1">
              <a href="#" class="text-dark fw-bolder text-hover-primary fs-6">{{ customer.name }}</a>
              <span class="text-muted d-block fw-bold">{{ customer.email }}</span>
              <span class="text-muted d-block fw-bold">{{ customer.phone }}</span>
            </div>
          </div>
        </template>
      </template>

    </div>
  </div>
</template>
<script>

import { computed, toRefs } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'

export default {
  name: 'ProjectDetailsCustomersList',
  props: {
    customersId: Array
  },
  setup(props) {
    const store = useStore()
    const { customersId } = toRefs(props)

    const allCustomers = computed(() => store.getters['customerModule/customers'])
    const customers = computed(() => allCustomers.value
      .reduce((acc, current) => {
        if (customersId.value.find((c) => c === current.id)) {
          acc.push(current)
        }
        // eslint-disable-next-line no-nested-ternary
        return acc.sort((a, b) => ((moment(a.createdAt) > moment(b.createdAt)) ? 1 : ((b.createdAt > a.createdAt) ? -1 : 0)))
      }, []))

    const getCustomerColorClass = (color) => [
      `bg-light-${color}`,
      `text-${color}`
    ]

    return {
      customers,
      getCustomerColorClass
    }
  }
}
</script>
