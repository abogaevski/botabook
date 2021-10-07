<template>
  <div v-if="events" class="card card-flush h-lg-100">
    <div class="card-header mt-6">
      <div class="card-title flex-column">
        <h3 class="fw-bolder mb-1">
          Встречи
        </h3>
        <div class="fs-6 fw-bold text-gray-400">
          Предстоящие встречи: {{ activeEvents.length }}
        </div>
      </div>
    </div>
    <div class="card-body p-9 pt-5">
      <div class="d-flex flex-wrap">
        <div class="position-relative d-flex flex-center h-175px w-175px me-15 mb-7">
          <DoughnutChart ref="doughnutRef" :chartData="datasets" :options="doughnutOptions"/>
          <div class="position-absolute translate-middle start-50 top-50 d-flex flex-column flex-center">
            <span class="fs-2qx fw-bolder">
              {{ events.length }}
            </span>
            <span class="fs-6 fw-bold text-gray-400">Всего</span>
          </div>
        </div>
        <div class="d-flex flex-column justify-content-center flex-row-fluid pe-11 mb-5">
          <div class="d-flex fs-6 fw-bold align-items-center mb-3">
            <div class="bullet bg-primary me-3"></div>
            <div class="text-gray-400">Предстоящие</div>
            <div class="ms-auto fw-bolder text-gray-700">{{ activeEvents.length }}</div>
          </div>
          <div class="d-flex fs-6 fw-bold align-items-center mb-3">
            <div class="bullet bg-success me-3"></div>
            <div class="text-gray-400">Выполненные</div>
            <div class="ms-auto fw-bolder text-gray-700">{{ completedEvents.length }}</div>
          </div>
          <div class="d-flex fs-6 fw-bold align-items-center mb-3">
            <div class="bullet bg-danger me-3"></div>
            <div class="text-gray-400">Просроченные</div>
            <div class="ms-auto fw-bolder text-gray-700">{{ notApprovedEventOverdue.length }}</div>
          </div>
          <div class="d-flex fs-6 fw-bold align-items-center">
            <div class="bullet bg-secondary me-3"></div>
            <div class="text-gray-400">Еще не начали</div>
            <div class="ms-auto fw-bolder text-gray-700">{{ notApprovedEventYet.length }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { computed, ref, toRefs } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'
import { DoughnutChart } from 'vue-chart-3'
import { doughnutChartDefaultConfig } from '@/core/config/charts/DoughnutChart.default.config'

export default {
  props: {
    eventsId: Array
  },
  components: { DoughnutChart },
  setup(props) {
    const doughnutOptions = doughnutChartDefaultConfig
    const store = useStore()
    const { eventsId } = toRefs(props)
    const now = moment()

    const allEvents = computed(() => store.getters['calendar/events'])

    const events = computed(() => allEvents.value
      .reduce((acc, current) => {
        if (eventsId.value.find((e) => e === current.id)) {
          acc.push(current)
        }
        return acc
      }, []))

    const completedEvents = computed(() => events.value.filter((e) => e.isApproved && moment(e.end) < now))
    const notApprovedEventYet = computed(() => events.value.filter((e) => !e.isApproved && moment(e.start) > now))
    const activeEvents = computed(() => events.value.filter((e) => e.isApproved && moment(e.start) > now))
    const notApprovedEventOverdue = computed(() => events.value.filter((e) => !e.isApproved && moment(e.end) < now))

    const datasets = ref({
      datasets: [{
        data: [
          completedEvents.value.length,
          activeEvents.value.length,
          notApprovedEventOverdue.value.length,
          notApprovedEventYet.value.length,
        ],
        backgroundColor: ['#50CD89', '#30A3E6', '#F1416C', '#E4E6EF']
      }],
      labels: ['Выполнены', 'Предстоящие', 'Не подтверждены и окончены', 'Не подтверждены']
    })

    return {
      doughnutOptions,
      events,
      datasets,
      completedEvents,
      activeEvents,
      notApprovedEventYet,
      notApprovedEventOverdue
    }
  }
}
</script>
