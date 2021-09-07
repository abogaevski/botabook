<template>
  <div class="card mb-5 mb-xl-8">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bolder fs-3 mb-1">Клиенты</span>
        <span class="text-muted mt-1 fw-bold fs-7">42 клиента</span>
      </h3>
      <div class="card-toolbar">
        <bt-button
          btnClass="btn btn-sm btn-light-primary"
          icon-url="/media/icons/duotone/Navigation/Plus.svg"
          icon-class="svg-icon-2"
        >
          Новый клиент
        </bt-button>
      </div>
    </div>
    <div class="card-body py-3">
      <div class="table-responsive">
        <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
          <thead>
          <tr class="fw-bolder text-muted">
            <th class="ps-4 min-w-300px rounded-start">Имя</th>
            <th class="min-w-125px">Телефон</th>
            <th class="min-w-125px">Статус</th>
            <th class="min-w-125px text-end rounded-end"></th>
          </tr>
          </thead>
          <tbody>

          <template v-for="(item, index) in list" :key="index">
            <tr>
              <td>
                <div class="d-flex align-items-center">
                  <div class="symbol symbol-50px me-5">
                      <span class="symbol-label bg-light">
                        <img
                          :src="item.image"
                          class="h-75 align-self-end"
                          alt=""
                        />
                      </span>
                  </div>

                  <div class="d-flex justify-content-start flex-column">
                    <a
                      href="#"
                      class="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                      {{ item.name }}
                    </a>
                    <span class="text-muted fw-bold text-muted d-block fs-7">
                      {{ item.note }}
                    </span>
                  </div>
                </div>
              </td>

              <td>
                <a href="#" class="text-dark fw-bolder text-hover-primary d-block mb-1 fs-6">
                  {{ item.phone }}
                </a>
              </td>

              <td>
                <span
                  :class="`badge-light-${getStatus(item.status).class}`"
                  class="badge">{{ getStatus(item.status).text }}</span>
              </td>

              <td class="text-end">
                <a href="#" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="/media/icons/duotone/General/Settings-1.svg"/>
                  </span>
                </a>
                <a href="#" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="/media/icons/duotone/Communication/Write.svg"/>
                  </span>
                </a>
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
    </div>
  </div>
</template>

<script>
import BtButton from '@/components/_core/buttons/BtButton.vue';

export default {
  name: 'CustomerListTable',
  setup() {
    const list = [
      {
        image: '/media/svg/avatars/001-boy.svg',
        name: 'Антон Богаевский',
        note: 'HTML, JS, ReactJS',
        phone: '+995 587 042 792',
        status: 'approved',
      },
      {
        image: '/media/svg/avatars/001-boy.svg',
        name: 'Антон Богаевский',
        note: 'HTML, JS, ReactJS',
        phone: '+995 587 042 792',
        status: 'warning',
      },
      {
        image: '/media/svg/avatars/001-boy.svg',
        name: 'Антон Богаевский',
        note: 'HTML, JS, ReactJS',
        phone: '+995 587 042 792',
        status: 'approved',
      }
    ];

    return {
      list
    };
  },
  components: {
    BtButton
  },
  computed: {
  },
  methods: {
    getStatus(status) {
      return {
        class: status === 'approved' ? 'success' : 'warning',
        text: status === 'approved' ? 'Подтвержден' : 'Не подтвержден'
      }
    }
  }
}
</script>
