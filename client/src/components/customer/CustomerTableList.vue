<template>
  <div class="table-responsive">
    <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
      <thead>
      <tr class="fw-bolder text-muted">
        <th class="min-w-300px rounded-start">Имя</th>
        <th class="min-w-125px">Телефон</th>
        <th class="min-w-125px text-end rounded-end"></th>
      </tr>
      </thead>
      <tbody>
      <template v-for="(customer, index) in customers" :key="index">
        <tr>
          <td>
            <div class="d-flex align-items-center">
              <div class="symbol symbol-50px me-5">
                <span
                  :class="`bg-light-${customer.color} text-${customer.color}`"
                  class="symbol-label"
                >
                  {{ customer.initials }}
                </span>
              </div>
              <div class="d-flex justify-content-start flex-column">
                <span class="text-dark fw-bolder text-hover-primary mb-1 fs-6">{{ customer.name }}</span>
                <a :href="`mailto:${customer.email}`" class="text-muted fw-bold text-muted d-block fs-7">
                  {{ customer.email }}
                </a>
              </div>
            </div>
          </td>
          <td>
            <a :href="`tel:${customer.phone}`" class="text-dark fw-bolder text-hover-primary d-block mb-1 fs-6">
              {{ customer.phone }}
            </a>
          </td>
          <td class="text-end">
            <a href="#" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
              <span class="svg-icon svg-icon-3">
                <inline-svg src="/media/icons/duotone/General/Trash.svg"/>
              </span>
            </a>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>
<script>
// import { toRefs } from 'vue'

export default {
  name: 'CustomerTableList',
  components: {},
  props: {
    customers: Array
  },
  setup() {
    // const { customers } = toRefs(props)

    return {}
  }
}
</script>
<style lang="scss">
</style>
