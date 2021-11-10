<template>
  <template v-if="view.type === 'listDay' || view.type === 'listWeek'">
    <calendar-event-list-view :event="event" />
  </template>
</template>

<script>
import { toRefs } from 'vue'
import CalendarEventListView from '@/components/calendar/components/CalendarEventListView'

export default {
  name: 'CalendarEventContent',
  components: { CalendarEventListView },
  props: ['args'],
  setup(props) {
    const { args } = toRefs(props)
    const { event, view } = args.value
    return { event, view }
  }
}
</script>
