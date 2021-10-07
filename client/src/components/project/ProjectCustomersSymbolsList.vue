<template>
  <template v-if="customers">
    <div class="symbol-group symbol-hover">
      <template v-for="(k, i) in 8" :key="i">
        <template v-if="customers[i]">
          <template v-if="customersId.includes(customers[i].id)">
            <bt-tooltip
              tag="div"
              class="symbol symbol-35px symbol-circle"
              :title="customers[i].name"
              placement="top"
            >
            <span
              class="symbol-label fw-bolder"
              :class="`bg-light-${customers[i].color} text-${customers[i].color}`"
            >
              {{ customers[i].initials }}
            </span>
            </bt-tooltip>
          </template>
        </template>
      </template>
      <template v-if="customersId.length > 8">
        <router-link to="/customers" class="symbol symbol-35px symbol-circle">
          <span class="symbol-label bg-dark text-gray-300 fs-8 fw-bolder">
            +{{ customersId.length - 8 }}
          </span>
        </router-link>
      </template>
    </div>
  </template>
</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import BtTooltip from '@/components/_core/BtTooltip'

export default {
  props: {
    customersId: Array
  },
  components: { BtTooltip },
  setup() {
    const store = useStore()
    const customers = computed(() => store.getters['customerModule/customers'])
    return {
      customers
    }
  }
}
</script>
