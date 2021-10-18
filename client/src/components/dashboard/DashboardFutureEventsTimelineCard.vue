<template>
  <div class="card mb-5 mb-xl-10">
    <div class="card-header align-items-center border-0 mt-4">
      <h3 class="card-title align-items-start flex-column">
        <span class="fw-bolder mb-2 text-dark">Встречи</span>
        <span class="text-muted fw-bold fs-7">Всего подтвержденных: {{ events.length }}</span>
      </h3>
    </div>
    <div class="card-body pt-5">
      <div class="timeline-label">
        <template v-for="(event, i) in events" :key="i">
          <div class="timeline-item">
            <div class="timeline-label fw-bolder text-gray-800 fs-6">{{ getEventTimeString(event.start) }}</div>
            <div class="timeline-badge">
              <i
                class="fa fa-genderless fs-1"
                :class="`text-${event.eventColor}`"
              ></i>
              </div>
            <div class="timeline-content ps-3" :class="getEventTitleClass(event.end)"> {{ event.title }} </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  name: 'DashboardFutureEventsTimelineCard',
  props: ['events'],
  setup() {
    const getEventTimeString = (time) => moment(time).format('DD.MMM HH:mm')
    const checkEventTimeFromNow = (time) => moment() < moment(time) || false
    const getEventTitleClass = (end) => ({
      'fw-bold': checkEventTimeFromNow(end),
      'text-dark': checkEventTimeFromNow(end),
      'text-muted': !checkEventTimeFromNow(end)
    })
    return {
      getEventTimeString,
      checkEventTimeFromNow,
      getEventTitleClass
    }
  }
}
</script>
