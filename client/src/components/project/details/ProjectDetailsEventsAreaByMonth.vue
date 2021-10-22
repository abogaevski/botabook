<template>
  <div class="card card-flush h-lg-100">
    <div class="card-header mt-6">
      <div class="card-title flex-column">
        <h3 class="fw-bolder mb-1">
          Запись на услугу
        </h3>

        <div class="fs-6 d-flex text-gray-400 fs-6 fw-bold">
          <div class="d-flex align-items-center me-xl-6 me-3">{{ monthsNumText }}</div>
          <div class="d-flex align-items-center me-xl-6 me-3">
            <span class="menu-bullet d-flex align-items-center me-2">
              <span class="bullet bg-success"></span>
            </span>Оконченные
          </div>
          <div class="d-flex align-items-center">
            <span class="menu-bullet d-flex align-items-center me-2">
              <span class="bullet bg-primary"></span>
            </span>Всего
          </div>
        </div>
      </div>
    </div>
    <div class="card-body pt-10 pb-0 px-xl-5 px-0">
      <apexchart type="area" :options="options" :series="series"/>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, toRefs } from 'vue'
import moment from 'moment'
import { getCSSVariableValue } from '@/core/_utils/helpers/dom-helpers/_getCSSVariableValue'
import getLastMonthsNamesListFromNow from '@/core/_utils/helpers/date-healpers/getLastMonthNamesListFromNow'
import getLastMonthsListFromNow from '@/core/_utils/helpers/date-healpers/getLastMonthsListFromNow'

export default {
  props: {
    eventsId: Array,
    projectCreatedAt: String
  },
  setup(props) {
    const { eventsId, projectCreatedAt } = toRefs(props)
    const store = useStore()

    const colors = {
      success: getCSSVariableValue('--bs-success'),
      lightSuccess: getCSSVariableValue('--bs-light-success'),
      primary: getCSSVariableValue('--bs-primary'),
      lightPrimary: getCSSVariableValue('--bs-light-primary'),
      gray500: getCSSVariableValue('--bs-gray-500'),
      gray200: getCSSVariableValue('--bs-gray-200')
    }

    const allEvents = computed(() => store.getters['calendar/events'])

    const events = computed(() => allEvents.value
      .reduce((acc, current) => {
        if (eventsId.value.find((e) => e === current.id)) {
          acc.push(current)
        }
        return acc
      }, []))

    const monthsNum = computed(() => (projectCreatedAt
      ? moment().month() - moment(projectCreatedAt).month() + 1
      : 6))
    const monthsNames = computed(() => getLastMonthsNamesListFromNow(monthsNum.value))
    const months = computed(() => getLastMonthsListFromNow(monthsNum.value))

    const completedEvents = computed(() => months.value
      .reduce((acc, month) => {
        acc.push(events.value.filter((e) => moment(e.end).month() === month.month() && e.status === 2).length)
        return acc
      }, []))

    const summaryEvents = computed(() => months.value
      .reduce((acc, month) => {
        acc.push(events.value.filter((e) => moment(e.end).month() === month.month()).length)
        return acc
      }, []))

    const monthsNumText = computed(() => {
      if (monthsNum.value === 1) {
        return '1 месяц'
      }
      if (monthsNum.value === 2) {
        return '2 месяца'
      }
      return `${monthsNum.value} месяцев`
    })

    const series = computed(() => [
      {
        name: 'Всего',
        data: summaryEvents.value
      },
      {
        name: 'Оконченные',
        data: completedEvents.value
      }
    ])

    const options = {
      chart: {
        type: 'area',
        toolbar: {
          show: false
        }
      },
      plotOptions: {},
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'solid',
        opacity: 1
      },
      stroke: {
        curve: 'smooth',
        show: true,
        width: 3,
        colors: [colors.primary, colors.success]
      },
      xaxis: {
        categories: monthsNames.value,
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          style: {
            colors: colors.gray500,
            fontSize: '12px'
          }
        },
        crosshairs: {
          position: 'front',
          stroke: {
            color: colors.success,
            width: 1,
            dashArray: 3
          }
        },
        tooltip: {
          enabled: true,
          formatter: undefined,
          offsetY: 0,
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: colors.gray500,
            fontSize: '12px'
          }
        }
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0
          }
        },
        hover: {
          filter: {
            type: 'none',
            value: 0
          }
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0
          }
        }
      },
      tooltip: {
        style: {
          fontSize: '12px'
        },
        y: {
          formatter: (val) => `${val} встреч`
        }
      },
      colors: [colors.lightPrimary, colors.lightSuccess],
      grid: {
        borderColor: colors.gray200,
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true
          }
        }
      },
      markers: {
        colors: [colors.lightPrimary, colors.lightPrimary],
        strokeColor: [colors.primary, colors.success],
        strokeWidth: 3
      }
    }

    return {
      series,
      options,
      events,
      monthsNumText
    }
  }
}
</script>
