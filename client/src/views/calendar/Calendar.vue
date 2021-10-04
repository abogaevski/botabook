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
import { mapActions, mapGetters } from 'vuex'
import ViewEventModal from '@/components/calendar/ViewEventModal.vue';

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
      }
    }
  },

  methods: {
    ...mapActions('calendar', ['updateEvent']),
    onEventClick({ event }) {
      this.eventData = {
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        allDay: event.allDay,
        customer: ''
      }
      this.showModal('View')
    },
    showModal(type) {
      this[`isActive${type}Modal`] = true
    },
    closeModal() {
      this.isActiveAddModal = false
      this.isActiveViewModal = false
      this.isActiveEditModal = false
    },
  },
  computed: {
    ...mapGetters({
      events: 'calendar/events',
      profileTimezone: 'userProfile/timezone',
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
        initialView: 'timeGridWeek',
        navLinks: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,dayGridMonth,timeGridDay,listWeek'
        },
        locale: ruLocale,
        timeZone: this.profileTimezone,
        // TODO: Change to profile working hours
        slotMinTime: '08:00:00',
        slotMaxTime: '18:00:00',
        firstDay: '1',
        events: this.events,
        // aspectRatio: 1.6
      }
    },
    eventHandlers() {
      return {
        eventClick: this.onEventClick,
      }
    }
  },

  mounted() {
    this.$store.dispatch('calendar/getEvents')
  },

  components: {
    ViewEventModal,
    FullCalendar,
  }
}
</script>
