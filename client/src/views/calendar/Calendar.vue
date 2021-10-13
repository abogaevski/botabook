<template>
  <div class="card">
    <div class="card-body calendar-wrapper">
      <full-calendar :options="config" />
    </div>
  </div>
  <calendar-view-event-modal
    :show-modal="isActiveViewModal"
    @modal:close="closeModal"
    :event-id="eventId"
  />

</template>

<script>
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import momentTimezonePlugin from '@fullcalendar/moment-timezone'
import ruLocale from '@fullcalendar/core/locales/ru'
import { mapGetters } from 'vuex'
import setEventStyle from '@/core/_utils/helpers/event-helpers/setEventStyle'
import CalendarViewEventModal from '@/components/calendar/CalendarViewEventModal'

export default {
  data() {
    return {
      isActiveViewModal: false,
      eventId: ''
    }
  },

  methods: {
    onEventClick({ event }) {
      this.eventId = event.id
      this.showModal('View')
    },
    showModal(type) {
      this[`isActive${type}Modal`] = true
    },
    closeModal() {
      this.isActiveViewModal = false
    }
  },
  computed: {
    ...mapGetters({
      events: 'calendar/events',
      profileTimezone: 'userProfile/timezone',
      profileBusinessHours: 'userProfile/businessHours'
    }),
    config() {
      return {
        ...this.calendarOptions,
        ...this.eventHandlers
      }
    },
    calendarOptions() {
      return {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, momentTimezonePlugin],
        initialView: 'listWeek',
        navLinks: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'listWeek,timeGridWeek,dayGridMonth'
        },
        buttonText: {
          today: 'Сегодня',
          month: 'Месяц',
          week: 'Неделя',
          day: 'День',
          listWeek: 'Повестка недели',
          listDay: 'Повестка дня'
        },
        locale: ruLocale,
        timeZone: this.profileTimezone,
        businessHours: {
          daysOfWeek: [0, 1, 2, 3, 4, 5, 6, 7],
          startTime: this.businessHours[0],
          endTime: this.businessHours[1]
        },
        // slotMinTime: ,
        // slotMaxTime:
        firstDay: '1',
        events: this.events,
        nowIndicator: true,
        eventShortHeight: 10,
        eventDidMount(info) {
          const { event, el, view } = info
          setEventStyle(event, el, view)
        }
      }
    },
    eventHandlers() {
      return {
        eventClick: this.onEventClick
      }
    },
    businessHours() {
      if (this.profileBusinessHours) {
        return this.profileBusinessHours.split('-')
      }
      return ''
    }
  },

  mounted() {
    this.$store.dispatch('calendar/getEvents')
    this.$store.dispatch('setTitle', 'Календарь')
  },

  components: {
    // ViewEventModal,
    FullCalendar,
    CalendarViewEventModal
  }
}
</script>
