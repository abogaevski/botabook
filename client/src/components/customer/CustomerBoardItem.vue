<template>
  <div v-if="customer" class="card mb-4 mb-xl-6" :data-card="customer.id" :data-card-order="customer.boardOrder">
    <div class="card-body">
      <div class="mb-2">
        <span class="fs-5 fw-bolder mb-1 text-gray-900">{{ customer.name }}</span>
      </div>
      <a
        :href="`mailto:${customer.email}`"
        class=" fs-6 d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
        <span class="svg-icon svg-icon-5 me-1">
          <inline-svg
            src="/media/icons/duotone/Communication/Mail-at.svg"
          />
        </span>
        {{ customer.email }}
      </a>
      <a
        :href="`tel:${customer.phone}`"
        class=" fs-6 d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-5">
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
import moment from 'moment'
import { toRefs } from 'vue'
// import BtButton from '@/components/_core/buttons/BtButton'
import BtTooltip from '@/components/_core/BtTooltip'

export default {
  name: 'CustomerBoardItem',
  props: ['customer'],
  components: { BtTooltip },
  setup(props) {
    const { customer } = toRefs(props)
    const createdAt = moment(customer.value.createdAt).format('DD MMM YYYY')
    return {
      createdAt
    }
  }
}
</script>
