<template>
  <div class="public-calendar">
    <v-date-picker
      mode="date"
      v-model="selectedDate"
      trim-weeks
      :min-date="minDate"
      @dayclick="selectDate"
    />
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import moment from 'moment'

export default {
  name: 'PublicPageWizardCalendar',
  setup(_, { emit }) {
    const selectedDate = ref(minDate)
    const selectDate = (e) => {
      if (!e.isDisabled) {
        emit('calendar:change-date', e)
      }
    }
    const minDate = computed(() => moment().add(1, 'day').toDate())
    return {
      selectedDate,
      selectDate,
      minDate
    }
  }
}
</script>
