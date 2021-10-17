<template>
  <div class="card card-flush h-lg-100">
    <div class="card-header mt-6">
      <div class="card-title flex-column">
        <h3 class="fw-bolder mb-1">Навигация по встречам</h3>
        <div class="fs-6 text-gray-400">Последний месяц</div>
      </div>
    </div>
    <div class="card-body p-9 pt-4">
      <div class="nav nav-pills d-flex flex-nowrap hover-scroll-x py-2" ref="tabLinks">
        <template v-for="(day, i) in days" :key="i">
          <li class="nav-item me-1">
            <a
              :class="{'active': currentTab === i}"
              class="position-relative nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px me-2 py-4 px-3 btn-active-primary"
              data-bs-toggle="tab"
              role="tab"
              aria-selected="false"
              :href="`#${getDayNavId(day.date)}`"
            >
              <span
                v-if="checkEventCountInDay(day)"
                class="bullet bullet-dot h-6px w-6px position-absolute translate-middle start-50 project__events-bullet"></span>
              <span class="opacity-50 fs-7 fw-bold">{{ day.name }}</span>
              <span class="fs-6 fw-bolder">{{ day.date }}</span>
            </a>
          </li>
        </template>
      </div>
      <div class="tab-content">
        <template v-for="(d, j) in eventsByDay" :key="j">
          <div
            :class="{'active show': currentTab === j}"
            :id="getDayNavId(d.date)"
            class="tab-pane fade"
          >
            <template v-if="d.events.length">
              <template v-for="(event, k) in d.events" :key="k">
                <div class="d-flex flex-stack position-relative mt-8">
                  <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  <div class="fw-bold ms-5 text-gray-600">
                    <div class="fs-5">
                      {{ getEventStartEnd(event.start, event.end) }}
                    </div>
                    <h3 class="fs-5 fw-bolder text-gray-800 mb-2">
                      {{ event.title }}
                    </h3>
                    <div :class="`text-${getEventStatus(event.status).color}`">
                      {{ getEventStatus(event.status).name }}
                    </div>
                  </div>
                  <button
                    @click="showModal(event)"
                    class="btn btn-light-primary btn-sm"
                  >Просмотр
                  </button>
                </div>
              </template>
            </template>
            <template v-else>
              <div class="d-flex flex-stack mt-8 h-100px">
                <div class="fw-bold ms-5 text-gray-600">
                  <div class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">
                    Событий на этот день не существует
                  </div>
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
  <calendar-view-event-modal
    v-if="events.length"
    :show-modal="isActiveViewModal"
    @modal:close="closeModal"
    :event-id="eventId"
  />
</template>

<script>

import { useStore } from 'vuex'
import moment from 'moment'
import { computed, onMounted, ref, toRefs } from 'vue'
import { Tab } from 'bootstrap'
import getEventStatus from '@/core/_utils/helpers/event-helpers/getEventStatus'
import getDaysOfLastMonth from '@/core/_utils/helpers/date-healpers/getDaysOfLastMonth'
import CalendarViewEventModal from '@/components/calendar/CalendarViewEventModal'

export default {
  name: 'ProjectDetailsEventsNav',
  props: {
    eventsId: Array
  },
  components: { CalendarViewEventModal },
  setup(props) {
    const store = useStore()
    const { eventsId } = toRefs(props)

    const tabLinks = ref(null)
    // eslint-disable-next-line radix
    const currentTab = ref(parseInt(moment().format('D')) - 1)

    const days = computed(() => getDaysOfLastMonth())

    const allEvents = computed(() => store.getters['calendar/events'])

    const events = computed(() => allEvents.value
      .reduce((acc, current) => {
        if (eventsId.value.find((e) => e === current.id)) {
          acc.push(current)
        }
        // eslint-disable-next-line no-nested-ternary
        return acc.sort((a, b) => ((moment(a.start) > moment(b.start)) ? 1 : ((b.start > a.start) ? -1 : 0)))
      }, []))

    const eventsByDay = computed(() => days.value
      .reduce((acc, current) => {
        const dayEvents = events.value.filter((e) => moment(e.start)
          .format('MM-DD-YYYY') === moment(current.fullDate).format('MM-DD-YYYY'))
        if (dayEvents) {
          acc.push({ date: current.date, events: dayEvents })
        }
        return acc
      }, []))

    const checkEventCountInDay = (day) => {
      const evs = events.value
        .filter((e) => moment(e.start).format('MM-DD-YYYY') === moment(day.fullDate).format('MM-DD-YYYY'))
      return evs.length || false
    }

    const getDayNavId = (date) => `bb_schedule_day_${date}`

    const getEventStartEnd = (start, end) => `${moment(start).format('hh:mm')} - ${moment(end).format('hh:mm')}`

    onMounted(() => {
      const links = tabLinks.value.querySelectorAll('.nav-item a')
      links.forEach((l, i) => {
        const triggerEl = new Tab(l)
        l.addEventListener('click', (event) => {
          event.preventDefault()
          currentTab.value = i
          triggerEl.show()
        })
      })
    })

    const eventId = ref('')
    const isActiveViewModal = ref(false)

    const showModal = (event) => {
      eventId.value = event.id.toString()
      isActiveViewModal.value = true
    }

    const closeModal = () => {
      isActiveViewModal.value = false
    }

    return {
      events,
      eventsByDay,
      days,
      getDayNavId,
      getEventStartEnd,
      tabLinks,
      currentTab,
      isActiveViewModal,
      showModal,
      closeModal,
      eventId,
      getEventStatus,
      checkEventCountInDay
    }
  }
}
</script>
