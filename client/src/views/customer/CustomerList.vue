<template>
  <div
    v-if="customers.length"
    class="card mb-5 mb-xl-8"
  >
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bolder fs-3 mb-1">Клиенты</span>
        <span class="text-muted mt-1 fw-bold fs-7">Клиентов: {{ customers.length }}</span>
      </h3>
    </div>
    <div class="card-body py-3">
      <customer-table-list :customers="customers" />
    </div>
  </div>
  <customer-no-data v-else />

</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import CustomerNoData from '@/components/customer/CustomerNoData'
import CustomerTableList from '@/components/customer/CustomerTableList'

export default {
  name: 'CustomerList',
  components: { CustomerNoData, CustomerTableList },
  setup() {
    const store = useStore()
    const customers = computed(() => store.getters['customerModule/customers'])
    return { customers }
  }
}
</script>
