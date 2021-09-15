<template>
  <div class="card">
    <div class="card-header">
      <h2 class="card-title fw-bolder">Календарь</h2>
      <div class="card-toolbar">

        <bt-button
          @click:btn="onAddEventButtonClick"
          btn-class="btn-primary btn-flex"
          icon-url="/media/icons/duotone/Navigation/Plus.svg"
          icon-class="svg-icon-2"
        >
          Добавить событие
        </bt-button>

      </div>
    </div>
    <div class="card-body calendar-wrapper">
      <full-calendar :options="config"></full-calendar>
    </div>
  </div>

  <add-event-modal
    :show-modal="isActiveAddModal"
    @modal:hide="closeModal"
    :event-data="eventData"
  ></add-event-modal>

  <view-event-modal
    :show-modal="isActiveViewModal"
    @modal:hide="closeModal"
    @modal:edit-event="showModal('Edit')"
    :event-data="eventData"
  ></view-event-modal>

  <edit-event-modal
    :show-modal="isActiveEditModal"
    @modal:hide="closeModal"
    :event-data="eventData"
  ></edit-event-modal>

</template>

<script>
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import ruLocale from '@fullcalendar/core/locales/ru'
import { mapActions, mapGetters } from 'vuex'
import BtButton from '@/components/_core/buttons/BtButton.vue'
import AddEventModal from '@/components/calendar/AddEventModal.vue';
import ViewEventModal from '@/components/calendar/ViewEventModal.vue';
import EditEventModal from '@/components/calendar/EditEventModal.vue';

export default {
  data() {
    return {
      isActiveAddModal: false,
      isActiveViewModal: false,
      isActiveEditModal: false,
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

    onAddEventButtonClick() {
      this.eventData = {
        title: '',
        start: new Date(),
        end: new Date(),
        allDay: false,
      }
      this.showModal('Add')
    },
    onDateClick(payload) {
      this.eventData = {
        ...this.eventData,
        start: payload.date,
        end: payload.date,
        allDay: payload.allDay,
      }
      this.showModal('Add')
    },
    onDateSelect(payload) {
      this.eventData = {
        ...this.eventData,
        start: payload.start,
        end: payload.end,
        allDay: payload.allDay,
      }
      this.showModal('Add')
    },
    onEventClick({ event }) {
      this.eventData = {
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        allDay: event.allDay
      }
      this.showModal('View')
    },
    onEventDrop({ event }) {
      return this.updateEvent(event)
    },

    // Modals
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
    ...mapGetters('calendar', ['events']),
    config() {
      return {
        ...this.calendarOptions,
        ...this.eventHandlers
      }
    },
    calendarOptions() {
      return {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
        initialView: 'dayGridMonth',
        navLinks: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        // buttonText: {
        //   today: 'Сегодня',
        //   month: 'Месяц',
        //   week: 'Неделя',
        //   day: 'День',
        //   list: 'Повестка'
        // },
        locale: ruLocale,
        firstDay: '1',
        events: this.events
      }
    },
    eventHandlers() {
      return {
        dateClick: this.onDateClick,
        eventClick: this.onEventClick,
        eventDrop: this.onEventDrop,
        eventResize: this.onEventDrop,
        select: this.onDateSelect
      }
    }

  },

  mounted() {
    this.$store.dispatch('calendar/getEvents')
  },

  components: {
    AddEventModal,
    ViewEventModal,
    EditEventModal,
    FullCalendar,
    BtButton,
  }
}
</script>
