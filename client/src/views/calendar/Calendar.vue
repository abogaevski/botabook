<template>
  <div class="card">
    <div class="card-body calendar-wrapper">
      <full-calendar :options="calendarOptions" />
    </div>
  </div>
  <calendar-view-event-modal
    :show-modal="isActiveViewModal"
    @modal:close="closeModal"
    :event-id="eventId"
  />

</template>

<script>
import { computed, ref } from 'vue'
import moment from 'moment'
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import momentTimezonePlugin from '@fullcalendar/moment-timezone'
import ruLocale from '@fullcalendar/core/locales/ru'
import { useStore } from 'vuex'
import setEventStyle from '@/core/_utils/helpers/event-helpers/setEventStyle'
import CalendarViewEventModal from '@/components/calendar/CalendarViewEventModal'

export default {
  name: 'Calendar',
  components: { FullCalendar, CalendarViewEventModal },
  setup() {
    const store = useStore()
    const isActiveViewModal = ref(false)
    const eventId = ref('0')
    store.dispatch('userProfile/getUserProfile')
    store.dispatch('calendar/getEvents')
    store.dispatch('project/getProjects')
    store.dispatch('customerModule/getCustomers')
    store.dispatch('customerModule/getBoard')
    store.dispatch('setTitle', 'Календарь')

    const onEventClick = ({ event }) => {
      eventId.value = event.id
      showModal()
    }
    const events = computed(() => store.getters['calendar/events'])
    const user = computed(() => store.getters['userProfile/user'])
    const showModal = () => isActiveViewModal.value = true
    const closeModal = () => isActiveViewModal.value = false
    const slotMin = computed(() => moment(user.value.profile.startWorkHour, 'HH:mm')
      .subtract(1, 'hours'))
    const slotMax = computed(() => moment(user.value.profile.endWorkHour, 'HH:mm')
      .add(1, 'hours'))
    const calendarOptions = computed(() => ({
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, momentTimezonePlugin],
      initialView: 'listDay',
      navLinks: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'listDay,listWeek,timeGridWeek,dayGridMonth'
      },
      buttonText: {
        today: 'Сегодня',
        month: 'Месяц',
        week: 'Неделя',
        day: 'День',
        listWeek: 'Повестка недели',
        listDay: 'Сегодня'
      },
      locale: ruLocale,
      timeZone: user.value.profile.timezone,
      businessHours: {
        daysOfWeek: [0, 1, 2, 3, 4, 5, 6, 7],
        startTime: user.value.profile.startWorkHour,
        endTime: user.value.profile.endWorkHour
      },
      slotMinTime: slotMin.value.format('HH:mm'),
      slotMaxTime: slotMax.value.format('HH:mm'),
      firstDay: '1',
      events: events.value,
      nowIndicator: true,
      eventShortHeight: 10,
      eventDidMount(info) {
        const { event, el, view } = info
        setEventStyle(event, el, view)
      },
      eventClick: onEventClick
    }))

    return {
      eventId,
      isActiveViewModal,
      onEventClick,
      closeModal,
      calendarOptions,
    }
  },
}
</script>
