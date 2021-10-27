<template>
  <div class="me-7">
    <span v-if="isStatusUpdating" class="spinner-border spinner-border-sm align-middle text-primary me-3"></span>
    <bt-tooltip
      v-if="currentStatus < 1"
      title="Подтвердить встречу" placement="top">
      <bt-button
        btn-class="btn-icon btn-sm btn-active-icon-success"
        @click:btn="approveEvent"
        icon-class="svg-icon-1"
        icon-url="/media/icons/duotone/Navigation/Check.svg"
        :disabled="isStatusUpdating"
      >
      </bt-button>
    </bt-tooltip>
    <bt-tooltip
      v-if="currentStatus < 1"
      title="Отменить встречу" placement="top">
      <bt-button
        btn-class="btn-icon btn-sm btn-active-icon-danger"
        @click:btn="cancelEvent"
        icon-class="svg-icon-1"
        icon-url="/media/icons/duotone/General/Trash.svg"
        :disabled="isStatusUpdating"
      />
    </bt-tooltip>
    <div v-else>
      <span class="event__status-badge badge" :class="`badge-light-${statusInfo.color}`">{{ statusInfo.name }}</span>
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { computed, toRefs, ref } from 'vue'
import Swal from 'sweetalert2'
import BtButton from '@/components/_core/buttons/BtButton'
import BtTooltip from '@/components/_core/BtTooltip'
import getEventStatus from '@/core/_utils/helpers/event-helpers/getEventStatus'

export default {
  props: ['eventId', 'currentStatus'],
  components: { BtButton, BtTooltip },
  setup(props) {
    const { eventId, currentStatus } = toRefs(props)
    const store = useStore()

    const statusInfo = computed(() => getEventStatus(currentStatus.value))
    const isStatusUpdating = ref(false)
    const updateEventStatus = (status) => {
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
          isStatusUpdating.value = true
          store.dispatch('calendar/updateEvent', { id: eventId.value, status })
            .then(() => {
              isStatusUpdating.value = false
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
            .catch((e) => {
              isStatusUpdating.value = false
              Swal.fire({
                title: 'Произошла ошибка!',
                html: e,
                icon: 'error',
                buttonsStyling: false,
                confirmButtonText: 'Попробовать еще раз',
                customClass: {
                  confirmButton: 'btn btn-secondary'
                }
              })
            })
        }
      })
    }

    const approveEvent = () => {
      updateEventStatus(1)
    }
    const cancelEvent = () => {
      updateEventStatus(3)
    }

    return {
      approveEvent,
      cancelEvent,
      updateEventStatus,
      statusInfo,
      isStatusUpdating
    }
  }
}
</script>
