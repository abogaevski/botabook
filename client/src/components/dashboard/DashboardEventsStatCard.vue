<template>
  <div class="card card-xl-stretch mb-xl-8">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bolder fs-3 mb-1">Статистика по встречам</span>
        <span class="text-muted fw-bold fs-7">Статистика по встречам за все время</span>
      </h3>
    </div>
    <div class="card-body">
      <apexchart type="bar" :options="options" :series="series"></apexchart>
    </div>
  </div>
</template>
<script>
import { computed, toRefs } from 'vue'
import moment from 'moment'
import { getCSSVariableValue } from '@/core/_utils/helpers/dom-helpers/_getCSSVariableValue'
import getLastMonthsNamesListFromNow from '@/core/_utils/helpers/date-healpers/getLastMonthNamesListFromNow'
import getLastMonthsListFromNow from '@/core/_utils/helpers/date-healpers/getLastMonthsListFromNow'

export default {
  name: 'DashboardEventsStatCard',
  props: ['events', 'userCreatedAt'],
  setup(props) {
    const labelColor = getCSSVariableValue('--bs-gray-500')
    const borderColor = getCSSVariableValue('--bs-gray-200')
    const baseColor = getCSSVariableValue('--bs-primary')
    const secondaryColor = getCSSVariableValue('--bs-gray-300')
    const { events, userCreatedAt } = toRefs(props)

    const monthsNum = computed(() => (userCreatedAt
      ? moment().month() - moment(userCreatedAt).month() + 1
      : 6))
    const monthsNames = computed(() => getLastMonthsNamesListFromNow(monthsNum.value))
    const months = computed(() => getLastMonthsListFromNow(monthsNum.value))

    const completedEvents = computed(() => months.value
      .reduce((acc, month) => {
        acc.push(events.value.filter((e) => moment(e.end).month() === month.month() && e.status === 2).length)
        return acc
      }, []))

    const canceledEvents = computed(() => months.value
      .reduce((acc, month) => {
        acc.push(events.value.filter((e) => moment(e.end).month() === month.month() && e.status === 3).length)
        return acc
      }, []))

    const options = {
      chart: {
        fontFamily: 'inherit',
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: ['30%'],
          endingShape: 'rounded'
        }
      },
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
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
            colors: labelColor,
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px'
          }
        }
      },
      fill: {
        opacity: 1
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
      colors: [baseColor, secondaryColor],
      grid: {
        borderColor,
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true
          }
        }
      }
    }
    const series = [
      {
        name: 'Выполненные встречи',
        data: completedEvents.value
      },
      {
        name: 'Отмененные встречи',
        data: canceledEvents.value
      }
    ]

    return {
      options,
      series,
    }
  }
}
</script>
