<template>
  <div class="card">
    <div class="card-body calendar-wrapper">
      <full-calendar :options="config"></full-calendar>
    </div>
  </div>
  <view-event-modal
    :show-modal="isActiveViewModal"
    @modal:hide="closeModal"
    :event-data="eventData"
  ></view-event-modal>

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
import ViewEventModal from '@/components/calendar/ViewEventModal.vue'
import setEventStyle from '@/core/_utils/helpers/event-helpers/setEventStyle'

export default {
  data() {
    return {
      isActiveViewModal: false,
      eventData: {
        id: '',
        title: '',
        start: '',
        end: '',
        allDay: false,
        isApproved: false,
        eventColor: ''
      }
    }
  },

  methods: {
    onEventClick({ event }) {
      this.eventData = {
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        allDay: event.allDay,
        isApproved: event.extendedProps.isApproved,
        eventColor: event.extendedProps.color
      }
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
          right: 'listWeek,timeGridWeek,dayGridMonth,timeGridDay'
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
  },

  components: {
    ViewEventModal,
    FullCalendar
  }
}
</script>
