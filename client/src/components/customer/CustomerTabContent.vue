<template>
  <div class="d-flex flex-wrap flex-stack pb-8">
    <h3 class="fw-bolder my-2">Ваши клиенты</h3>
    <div class="d-flex flex-wrap my-1">
      <ul class="nav nav-pills me-5">
        <li class="nav-item m-0">
          <a class="btn btn-sm btn-icon btn-light btn-color-muted btn-active-primary me-3 active" data-bs-toggle="tab"
             href="#customer_card_pane">
              <span class="svg-icon svg-icon-2">
              <inline-svg src="/media/icons/duotone/Interface/Grid.svg"/>
            </span>
          </a>
        </li>
        <li class="nav-item m-0">
          <a class="btn btn-sm btn-icon btn-light btn-color-muted btn-active-primary" data-bs-toggle="tab"
             href="#customer_table_pane">
              <span class="svg-icon svg-icon-2">
              <inline-svg src="/media/icons/duotone/Interface/Grid-Horizontal.svg"/>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div class="tab-content customer__board-content">
    <div id="customer_card_pane" class="h-100 tab-pane fade active show">
      <customer-board />
    </div>
    <div id="customer_table_pane" class="tab-pane">
      <customer-table-list :customers="customers" />
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import CustomerTableList from '@/components/customer/CustomerTableList'
import CustomerBoard from '@/components/customer/CustomerBoard'

export default {
  name: 'CustomerTabContent',
  props: ['isLoading'],
  components: { CustomerBoard, CustomerTableList },
  setup() {
    const store = useStore()
    const customers = computed(() => store.getters['customerModule/customers'])
    return { customers }
  }
}
</script>

<style scoped>

</style>
