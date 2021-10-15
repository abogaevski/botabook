<template>
  <div class="card">
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-row-bordered table-row-dashed gy-4 align-middle fw-bolder dataTable no-footer">
          <thead class="fs-7 text-gray-400 text-uppercase">
          <tr>
            <th></th>
            <th>Имя</th>
            <th>Email</th>
            <th>Телефон</th>
            <th>Дата добавления</th>
            <th>Кол-во встреч</th>
            <th>Статус</th>
<!--            <th></th>-->
          </tr>
          </thead>
          <tbody class="fs-6 fw-bold text-gray-600">
          <template v-for="(customer, index) in customers" :key="index">
            <tr>
              <td>
                <div class="d-flex align-items-center">
                  <div class="symbol symbol-30px">
                    <span :class="`bg-${customer.color} text-white`" class="symbol-label">
                      {{ customer.initials }}
                    </span>
                  </div>
                </div>
              </td>
              <td class="fw-bolder">
                <div class="text-gray-900">{{ customer.name }}</div>
              </td>
              <td>
                <a :href="`mailto:${customer.email}`" class="text-dark text-hover-primary d-block fs-6">
                  {{ customer.email }}
                </a>
              </td>
              <td>
                <a :href="`tel:${customer.phone}`" class="text-dark text-hover-primary d-block fs-6">
                  {{ customer.phone }}
                </a>
              </td>
              <td>
                {{ getDate(customer.date) }}
              </td>
              <td>
                <span class="svg-icon svg-icon-1">
                  <inline-svg src="/media/icons/duotone/Interface/Calendar.svg"/>
                </span>
                <span class="ms-3">
                  {{ customer.events.length }}
                </span>
              </td>
              <td>
                <span class="badge" :class="`badge-light-${getBoardColumn(customer.boardColumn).color}`">
                  {{ getBoardColumn(customer.boardColumn).title }}
                </span>
              </td>
<!--              <td class="text-end">-->
<!--                <bt-tooltip title="Удалить клиента" placement="top">-->
<!--                  <bt-button-->
<!--                    class="btn btn-icon btn-bg-white btn-active-light-danger btn-active-color-danger btn-sm"-->
<!--                    icon-url="/media/icons/duotone/General/Trash.svg"-->
<!--                    icon-class="svg-icon svg-icon-3"-->
<!--                  />-->
<!--                </bt-tooltip>-->
<!--              </td>-->
            </tr>
          </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import moment from 'moment'
// import BtButton from '@/components/_core/buttons/BtButton'
// import BtTooltip from '@/components/_core/BtTooltip'

export default {
  name: 'CustomerTableList',
  components: {},
  props: {
    customers: Array
  },
  setup() {
    const store = useStore()
    const getDate = (date) => moment(date).format('DD MMM YYYY')
    const getBoardColumn = (id) => store.getters['customerModule/boardById'](id) || ''

    return {
      getDate,
      getBoardColumn
    }
  }
}
</script>
<style lang="scss">
</style>
