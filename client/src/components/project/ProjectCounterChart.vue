<template>
  <div>
    <DoughnutChart ref="doughnutRef" :chartData="dataset" :options="options"/>
  </div>
</template>

<script>
import { DoughnutChart } from 'vue-chart-3'

export default {
  name: 'ProjectCounterChart',
  props: ['dataset'],
  data() {
    return {
      options: {
        chart: {
          fontFamily: 'inherit'
        },
        cutout: '75%',
        cutoutPercentage: 65,
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          animateScale: true,
          animateRotate: true
        },
        plugins: {
          title: {
            display: false
          },
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            intersect: false,
            mode: 'nearest',
            bodySpacing: 5,
            yPadding: 10,
            xPadding: 10,
            caretPadding: 0,
            displayColors: false,
            cornerRadius: 4,
            footerSpacing: 0,
            titleSpacing: 0
          },
        },
        hoverBorderColor: '#fff',
        hoverOffset: 2
      }
    }
  },
  components: { DoughnutChart }
}
</script>
