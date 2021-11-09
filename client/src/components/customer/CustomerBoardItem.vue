<template>
  <div v-if="customer" class="card mb-4 mb-xl-6" :data-card="customer.id" :data-card-order="customer.boardOrder">
    <div class="card-body px-6 py-3">
      <div class="mb-2 d-flex align-items-center justify-content-between">
        <span class="fs-5 fw-bolder text-gray-900">{{ customer.name }}</span>
        <span v-if="isCustomerDeleting" class="spinner-border spinner-border-sm align-middle text-primary me-3"></span>
        <bt-tooltip
          title="Удалить" placement="top">
          <bt-button
            @click:btn="deleteCustomer"
            btn-class="btn-icon btn-sm btn-active-icon-danger"
            icon-class="svg-icon-2"
            icon-url="/media/icons/duotune/general/gen027.svg"
            :disabled="isCustomerDeleting"
          />
        </bt-tooltip>
      </div>
      <a
        :href="`mailto:${customer.email}`"
        class=" fs-6 d-flex align-items-center text-gray-600 text-hover-primary me-5 mb-2 overflow-hidden">
        <span class="svg-icon svg-icon-5 me-1">
          <inline-svg
            src="/media/icons/duotone/Communication/Mail-at.svg"
          />
        </span>
        {{ customer.email }}
      </a>
      <a
        :href="`tel:${customer.phone}`"
        class=" fs-6 d-flex align-items-center text-gray-600 text-hover-primary me-5 mb-5">
        <span class="svg-icon svg-icon-5 me-1">
          <inline-svg
            src="/media/icons/duotone/Communication/Contact1.svg"
          />
        </span>
        {{ customer.phone }}
      </a>
      <div class="d-flex my-1">
        <bt-tooltip title="Первое обращение">
          <div class="border border-dashed border-gray-300 rounded py-2 px-3">
            <span class="svg-icon svg-icon-3">
              <inline-svg src="/media/icons/duotone/Home/Clock.svg" />
            </span>
            <span class="ms-1 fs-7 fw-bolder text-gray-600">
              {{ createdAt }}
            </span>
          </div>
        </bt-tooltip>
        <bt-tooltip title="Всего встреч">
          <div class="border border-dashed border-gray-300 rounded py-2 px-3 ms-3">
            <span class="svg-icon svg-icon-3">
              <inline-svg src="/media/icons/duotone/Interface/Calendar.svg"/>
            </span>
              <span class="ms-1 fs-7 fw-bolder text-gray-600">
              {{ customer.events.length }}
            </span>
          </div>
        </bt-tooltip>

      </div>
    </div>
  </div>
</template>
<script>
import { toRefs, ref } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'
import alert from '@/core/_utils/swal'
import BtButton from '@/components/_core/buttons/BtButton'
import BtTooltip from '@/components/_core/BtTooltip'

export default {
  name: 'CustomerBoardItem',
  props: ['customer'],
  components: { BtTooltip, BtButton },
  setup(props) {
    const { customer } = toRefs(props)
    const store = useStore()
    const createdAt = moment(customer.value.createdAt).format('DD MMM YYYY')
    const isCustomerDeleting = ref(false)
    const deleteCustomer = () => {
      alert({
        title: 'Вы уверены?',
        html: `Подтвердите, что хотите удалить клиента "${customer.value.name}".
        Все встречи останутся, но информация о клиенте будет утеряна!`,
        icon: 'question',
      }).then((result) => {
        if (result.value) {
          isCustomerDeleting.value = true
          store.dispatch('customerModule/deleteCustomer', customer.value.id)
            .finally(() => isCustomerDeleting.value = false)
        }
      })
    }
    return {
      createdAt,
      deleteCustomer,
      isCustomerDeleting
    }
  }
}
</script>
