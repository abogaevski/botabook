<template>
  <div v-if="columns.length" class="h-100 row hover-scroll-x flex-nowrap">
    <template v-for="(column, i) in columns" :key="i">
      <div class="col-md-6 col-lg-6 col-xl-3 h-100">
        <customer-board-section-heading :column="column"/>
        <draggable
          class="min-h-300px"
          v-model="column.customers"
          group="customers"
          item-key="id"
          @end="onCardDrop"
          :data-column="column.id"
          :sort="false"
        >
          <template #item="{ element }">
            <customer-board-item :customer="element"/>
          </template>
        </draggable>
      </div>
    </template>
    <div class="col-md-6 col-lg-4 col-xl-3">
      <button
        v-if="!isCreateNewColumn"
        @click="isCreateNewColumn = true"
        class="card w-100 flex-center bg-transparent bg-hover-light-primary border-primary border border-dashed">
        <span class="text-primary fs-5 fw-bolder my-2">Добавить новую колонку</span>
      </button>
      <customer-board-new-column
        v-else
        @column-create:close="isCreateNewColumn = false"
      />
    </div>
  </div>
</template>
<script>

import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import Swal from 'sweetalert2'
import draggable from 'vuedraggable'
import CustomerBoardSectionHeading from '@/components/customer/CustomerBoardSectionHeading'
import CustomerBoardItem from '@/components/customer/CustomerBoardItem'
import CustomerBoardNewColumn from '@/components/customer/CustomerBoardNewColumn'

export default {
  name: 'CustomerBoard',
  components: { CustomerBoardSectionHeading, CustomerBoardItem, CustomerBoardNewColumn, draggable },
  emits: ['column-create:close'],
  setup() {
    const store = useStore()
    const columns = computed(() => store.getters['customerModule/board'])
    onMounted(() => store.dispatch('customerModule/getBoard'))
    const onCardDrop = (e) => {
      const to = e.to.dataset.column
      const itemId = e.clone.dataset.card
      store.dispatch('customerModule/updateCustomer', { id: itemId, boardColumn: to })
        .catch((error) => {
          Swal.fire({
            title: 'Произошла ошибка!',
            html: error,
            icon: 'error',
            buttonsStyling: false,
            confirmButtonText: 'Попробовать еще раз',
            customClass: {
              confirmButton: 'btn btn-secondary'
            }
          })
        })
    }
    const isCreateNewColumn = ref(false)
    return {
      columns,
      onCardDrop,
      isCreateNewColumn
    }
  }
}
</script>
