<template>
  <div v-if="columns.length" class="h-100 row hover-scroll-x flex-nowrap gx-3 pb-6">
    <template v-for="(column, i) in columns" :key="i">
      <div class="col-10 col-sm-6 col-md-5 col-lg-5 col-xl-3 h-100">
        <div class="card bg-light-dark card-flush">
          <div class="card-header px-4">
            <customer-board-section-heading :column="column"/>
          </div>
          <div class="card-body px-4 py-0">
<!--              handle=".draggable .draggable-handle"-->
            <draggable
              class="min-h-50px"
              v-model="column.customers"
              group="customers"
              ghost-class="draggable-mirror"
              chosen-class="draggable-chosen"
              drag-class="draggable-drag"
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
        </div>
      </div>
    </template>
    <div class="col-10 col-sm-6 col-md-5 col-lg-5 col-xl-3 h-100">
      <button
        v-if="!isCreateNewColumn"
        @click="isCreateNewColumn = true"
        class="card bg-light-dark bg-hover-secondary card-flush w-100 ">
        <div class="card-header justify-content-center px-4 py-2 w-100 min-h-auto">
          <span class="text-center text-gray-700 fs-5 fw-bolder my-2">Добавить колонку</span>
        </div>
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
import { computed, ref } from 'vue'
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
    store.dispatch('customerModule/getBoard')
    const columns = computed(() => store.getters['customerModule/board'])
    const onCardDrop = (e) => {
      const to = e.to.dataset.column
      const itemId = e.clone.dataset.card
      store.dispatch('customerModule/updateCustomer', { id: itemId, boardColumn: to })
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
