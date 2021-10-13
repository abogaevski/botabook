<template>
  <div class="me-5">
    <span class="svg-icon svg-icon-3 me-3" :class="`svg-icon-${statuses[currentStatus].color}`">
      <inline-svg src="/media/icons/duotone/Design/Circle.svg"></inline-svg>
    </span>
    <el-select v-model="selectedStatus" @change="updateStatus" placeholder="Выберите статус">
      <el-option
        v-for="(status, i) in statuses"
        :key="i"
        :value="i"
        :label="status.name"
      >
        <span class="svg-icon svg-icon-3 me-3" :class="`svg-icon-${status.color}`">
          <inline-svg src="/media/icons/duotone/Design/Circle.svg"></inline-svg>
        </span>
        {{ status.name }}
      </el-option>
    </el-select>
  </div>
</template>
<script>

import { ref, toRefs, watchEffect } from 'vue'
import { useStore } from 'vuex'
import Swal from 'sweetalert2'
import getEventStatus from '@/core/_utils/helpers/event-helpers/getEventStatus'

export default {
  name: 'CalendarStatusSelect',
  props: ['eventId', 'currentStatus'],
  setup(props) {
    const { eventId, currentStatus } = toRefs(props)
    const store = useStore()
    const statuses = getEventStatus()
    const selectedStatus = ref(0)
    watchEffect(() => selectedStatus.value = currentStatus.value)
    const updateStatus = () => {
      Swal.fire({
        title: 'Вы уверены, что хотите изменить статус встречи?',
        icon: 'question',
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: 'Изменить!',
        cancelButtonText: 'Отмена',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-active-light'
        }
      }).then((result) => {
        if (result.value) {
          store.dispatch('calendar/updateEvent', { id: eventId.value, status: selectedStatus.value })
            .then(() => {
              Swal.fire({
                title: 'Статус изменен!',
                icon: 'success',
                showCancelButton: false,
                buttonsStyling: false,
                confirmButtonText: 'Супер!',
                customClass: {
                  confirmButton: 'btn btn-primary',
                  cancelButton: 'btn btn-active-light'
                }
              })
            })
        } else {
          selectedStatus.value = currentStatus.value
        }
      })
    }

    return {
      statuses,
      selectedStatus,
      updateStatus
    }
  }
}
</script>
