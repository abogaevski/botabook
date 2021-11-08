<template>
  <customer-board-skeleton v-if="isLoading" />
  <customer-tab-content v-else-if="customers.length && !isLoading" />
  <no-data is-large v-else/>
</template>
<script>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import CustomerTabContent from '@/components/customer/CustomerTabContent'
import CustomerBoardSkeleton from '@/components/customer/CustomerBoardSkeleton'
import NoData from '@/components/common/NoData'

export default {
  name: 'CustomerList',
  components: { NoData, CustomerTabContent, CustomerBoardSkeleton },
  setup() {
    const store = useStore()
    const isLoading = ref(true)
    store.dispatch('setTitle', 'Клиенты')
    store.dispatch('customerModule/getCustomers')
      .finally(() => isLoading.value = false)

    const customers = computed(() => store.getters['customerModule/customers'])
    return { customers, isLoading }
  }
}
</script>
