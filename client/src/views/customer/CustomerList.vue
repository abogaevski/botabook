<template>
  <loader class="mb-xl-8 mb-lg-8 mb-6" v-if="loader"/>
  <customer-tab-content v-else-if="customers.length && !loader" />
  <customer-no-data v-else/>
</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import CustomerTabContent from '@/components/customer/CustomerTabContent'
import CustomerNoData from '@/components/customer/CustomerNoData'
import Loader from '@/components/Loader'

export default {
  name: 'CustomerList',
  components: { CustomerNoData, CustomerTabContent, Loader },
  setup() {
    const store = useStore()
    store.dispatch('setTitle', 'Клиенты')
    store.dispatch('customerModule/getCustomers')
    const loader = computed(() => store.getters.loader)

    const customers = computed(() => store.getters['customerModule/customers'])
    return { customers, loader }
  }
}
</script>
