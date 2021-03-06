<template>
  <div class="card card-flush h-lg-100">
    <div class="card-header p-4 p-sm-9 p-lg-4 px-xl-9">
      <div class="card-title flex-column">
        <h3 class="fw-bolder mb-1">
          Встречи
        </h3>
        <div class="fs-6 fw-bold text-gray-400">
          Представление ваших встреч по статусам за все время
        </div>
      </div>
    </div>
    <div class="card-body p-4 p-sm-9 p-lg-4 px-xl-9">
      <div class="align-items-center d-flex flex-center flex-column flex-lg-column flex-md-row flex-wrap">
        <div class="d-flex flex-center h-175px mb-7 me-0 me-lg-0 me-md-15 position-relative w-175px">
          <DoughnutChart ref="doughnutRef" :chartData="datasets" :options="doughnutOptions"/>
          <div class="position-absolute translate-middle start-50 top-50 d-flex flex-column flex-center">
            <span class="fs-2qx fw-bolder">
              {{ events.length }}
            </span>
            <span class="fs-6 fw-bold text-gray-400">Всего</span>
          </div>
        </div>
        <div class="d-flex flex-column flex-row-fluid justify-content-center mb-5 pe-10 pe-lg-0 w-100 w-md-auto w-lg-100">
          <template v-for="(status, i) in statuses" :key="i">
            <div class="d-flex fs-6 fw-bold align-items-center mb-3">
              <div
                class="bullet me-3"
                :class="`bg-${status.color}`"
              ></div>
              <div class="text-gray-400">{{ status.name }}</div>
              <div class="ms-auto fw-bolder text-gray-700">{{ eventsData[i] }}</div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { computed, toRefs } from 'vue'
import { useStore } from 'vuex'
import { DoughnutChart } from 'vue-chart-3'
import { doughnutChartDefaultConfig } from '@/core/config/charts/DoughnutChart.default.config'
import getEventStatus from '@/core/_utils/helpers/event-helpers/getEventStatus'

export default {
  props: {
    eventsId: Array
  },
  components: { DoughnutChart },
  setup(props) {
    const doughnutOptions = doughnutChartDefaultConfig
    const store = useStore()
    const { eventsId } = toRefs(props)

    const allEvents = computed(() => store.getters['calendar/events'])

    const events = computed(() => allEvents.value
      .reduce((acc, current) => {
        if (eventsId.value.find((e) => e === current.id)) {
          acc.push(current)
        }
        return acc
      }, []))
    const statuses = getEventStatus()
    const newEvents = computed(() => events.value.filter((e) => e.status === 0))
    const waitingPayEvents = computed(() => events.value.filter((e) => e.status === 1))
    const activeEvents = computed(() => events.value.filter((e) => e.status === 2))
    const completedEvents = computed(() => events.value.filter((e) => e.status === 3))
    const canceledEvents = computed(() => events.value.filter((e) => e.status === 4))

    const eventsData = computed(() => [
      newEvents.value.length,
      waitingPayEvents.value.length,
      activeEvents.value.length,
      completedEvents.value.length,
      canceledEvents.value.length
    ])
    const datasets = computed(() => ({
      datasets: [{
        data: eventsData.value,
        backgroundColor: [...statuses.map((s) => s.colorHEX)]
      }],
      labels: [...statuses.map((s) => s.name)]
    }))

    return {
      doughnutOptions,
      events,
      datasets,
      eventsData,
      statuses
    }
  }
}
</script>
