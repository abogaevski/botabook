<template>
  <div class="card border border-2 border-gray-300 border-hover">
    <div class="card-header border-0 pt-9">
      <div class="card-title m-0">
        <div class="symbol symbol-50px w-50px bg-light">
          <span
            class="symbol-label fw-bolder"
            :class="getColorClass"
          >
            {{ getInitials }}
          </span>
        </div>
      </div>
      <div class="card-toolbar">
        <span
          :class="`badge-${getStatusDataColor}`"
          class="badge fw-bolder me-auto px-4 py-3"
        >
          {{ getStatus }}
        </span>
      </div>
    </div>
    <div class="card-body p-9">
      <div class="fs-3 fw-bolder text-dark">
        {{ title }}
      </div>
      <p class="text-gray-400 fw-bold fs-5 mt-1 mb-7">
        {{ description }}
      </p>

      <div class="d-flex flex-wrap mb-5">
        <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3">
          <div class="fs-6 text-gray-800 fw-bolder">{{ timeRange }} мин.</div>
          <div class="fw-bold text-gray-400">Длительность</div>
        </div>

        <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mb-3">
          <div class="fs-6 text-gray-800 fw-bolder">{{ getPrice }}</div>
          <div class="fw-bold text-gray-400">Стоимость</div>
        </div>
      </div>
            <template v-if="customers">
              <div class="symbol-group symbol-hover">
                <template v-for="(customer, index) in customers" :key="index">
                  <bt-tooltip
                    tag="div"
                    class="symbol symbol-35px symbol-circle"
                    :title="customer.name"
                    placement="top"
                  >
                    <span
                      class="symbol-label fw-bolder"
                      :class="`bg-${customer.color} text-inverse-${customer.color}`"
                    >{{ customer.initials }}</span
                    >
                  </bt-tooltip>
                </template>
              </div>
            </template>
    </div>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'
import BtTooltip from '@/components/_core/BtTooltip'

export default {
  name: 'ProjectCard',
  components: { BtTooltip },
  props: {
    title: String,
    description: String,
    timeRange: Number,
    price: String,
    isActive: Boolean,
    color: String,
    events: Array,
    customersId: Array
  },
  data() {
    return {
      customers: []
    }
  },
  computed: {
    ...mapGetters('customerModule', ['customerById']),
    getStatusDataColor() {
      return this.isActive ? 'light-success' : 'light'
    },
    getStatus() {
      return this.isActive ? 'Активен' : 'Неактивен'
    },
    getInitials() {
      return this.title.split('')[0].toUpperCase()
    },
    getColorClass() {
      return [
        `bg-light-${this.color}`,
        `text-${this.color}`
      ]
    },
    getPrice() {
      return parseFloat(this.price) > 0 ? this.price : 'Бесплатно'
    },
  },
  mounted() {
    this.customersId.forEach((id) => {
      const customer = this.customerById(id)
      this.customers.push(customer)
    })
  }
}
</script>
