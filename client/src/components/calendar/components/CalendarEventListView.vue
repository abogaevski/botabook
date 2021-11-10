<template>
  <div v-if="event" class="d-flex flex-row justify-content-between align-items-center">
    <div class="d-flex flex-column">
      <span class="fs-3 fw-bolder text-dark">{{ event.title }}</span>
      <span v-if="event.extendedProps.description" class="fs-7 fw-bolder text-muted mb-2">
                  {{ event.extendedProps.description }}
                </span>
      <div class="d-flex flex-row flex-wrap fw-bold fs-7">
                <span class="d-flex align-items-center text-gray-400 me-2">
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg src="/media/icons/duotune/finance/fin006.svg"/>
                  </span>
                  {{ getProjectTitle(args.event.extendedProps.project) }}
                </span>
        <span class="d-flex align-items-center text-gray-400">
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg src="/media/icons/duotune/communication/com006.svg"/>
                  </span>
                  {{ getCustomerName(args.event.extendedProps.customer) }}
                </span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, toRefs } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'CalendarEventListView',
  props: ['event'],
  setup(props) {
    const store = useStore()
    const { event } = toRefs(props)
    const { eProps } = event.value.extendedProps
    const customer = computed(() => store.getters['customer/customerById'](eProps.customer))
    return {
      customer
    }
  }
}
</script>
