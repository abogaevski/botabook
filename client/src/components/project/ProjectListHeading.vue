<template>
  <div class="row g-6 g-xl-9">
    <div class="col-lg-6 col-xxl-4">
      <div class="card h-100">
        <div class="card-body p-9">
          <div class="fs-2hx fw-bolder">
            {{ projects.length }}
          </div>
          <div class="fs-4 fw-bold text-gray-400 mb-7">Всего услуг</div>
          <div class="d-flex flex-wrap">
            <div class="d-flex flex-center h-100px w-100px me-5 mb-5">
              <project-counter-chart :dataset="chartDataSet"></project-counter-chart>
            </div>
            <div class="d-flex flex-column justify-content-center flex-row-fluid pe-11 mb-5">
              <div class="d-flex fs-6 fw-bold align-items-center mb-3">
                <div class="bullet bg-success me-3"></div>
                <div class="text-gray-400">Активные</div>
                <div class="ms-auto fw-bolder text-gray-700">
                  {{ activeProjects }}
                </div>
              </div>
              <div class="d-flex fs-6 fw-bold align-items-center mb-3">
                <div class="bullet bg-gray me-3"></div>
                <div class="text-gray-400">Неактивные</div>
                <div class="ms-auto fw-bolder text-gray-700">
                  {{ disabledProjects }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-6 col-xxl-4">
      <div class="card h-100">
        <div class="card-body p-9">
          <div class="fs-2hx fw-bolder">{{ priceSum }} руб</div>
          <div class="fs-4 fw-bold text-gray-400 mb-7">Сумма всех услуг</div>
          <div class="fs-6 d-flex justify-content-between mb-4">
            <div class="fw-bold">Средняя цена</div>
            <div class="d-flex fw-bolder">
              <!--begin::Svg Icon | path: icons/duotune/arrows/arr007.svg-->
              <span class="svg-icon svg-icon-3 me-1 svg-icon-success"></span>
              {{ priceAvg }} руб
            </div>
          </div>
          <div class="separator separator-dashed"></div>
          <div class="fs-6 d-flex justify-content-between my-4">
            <div class="fw-bold">Минимальная цена</div>
            <div class="d-flex fw-bolder">
              <!--begin::Svg Icon | path: icons/duotune/arrows/arr006.svg-->
              <span class="svg-icon svg-icon-3 me-1 svg-icon-danger"></span>
              {{ priceMin }} руб
            </div>
          </div>
          <div class="separator separator-dashed"></div>
          <div class="fs-6 d-flex justify-content-between mt-4">
            <div class="fw-bold">Максимальная цена</div>
            <div class="d-flex fw-bolder">
              <!--begin::Svg Icon | path: icons/duotune/arrows/arr007.svg-->
              <span class="svg-icon svg-icon-3 me-1 svg-icon-success"></span>
              {{ priceMax }} руб
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-6 col-xxl-4">
      <div class="card h-100">
        <div class="card-body p-9">
          <div class="fs-2hx fw-bolder">{{ customersCount }}</div>
          <div class="fs-4 fw-bold text-gray-400 mb-7">Всего клиентов</div>
          <div class="symbol-group symbol-hover mb-9">
            <template v-for="(k, i) of 8" :key="i">
              <template v-if="customers[i]">
                <bt-tooltip
                  tag="div"
                  class="symbol symbol-35px symbol-circle"
                  :title="customers[i].name"
                  placement="top"
                >
                    <span
                      class="symbol-label fw-bolder"
                      :class="`bg-light-${customers[i].color} text-${customers[i].color}`"
                    >{{ customers[i].initials }}</span
                    >
                </bt-tooltip>
              </template>
            </template>
            <template v-if="customersCount > 8">
              <router-link to="/customers" class="symbol symbol-35px symbol-circle">
                <span class="symbol-label bg-dark text-gray-300 fs-8 fw-bolder">
                  +{{ customersCount - 8 }}
                </span>
              </router-link>
            </template>
          </div>
          <div class="d-flex">
            <router-link to="/customers" class="btn btn-light-primary btn-sm me-3">Все клиенты</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ProjectCounterChart from '@/components/project/ProjectCounterChart'
import BtTooltip from '@/components/_core/BtTooltip'

export default {
  name: 'ProjectListHeading',
  computed: {
    ...mapGetters({
      projects: 'project/projects',
      customers: 'customerModule/customers',
      customersCount: 'customerModule/customerCount'
    }),

    activeProjects() {
      return this.projects.filter((project) => project.isActive).length
    },
    disabledProjects() {
      return this.projects.filter((project) => !project.isActive).length
    },
    priceSum() {
      const sum = this.getPriceArray().reduce((acc, current) => acc + current, 0)
      return sum.toFixed(2)
    },
    priceAvg() {
      const sum = this.getPriceArray().reduce((acc, current) => acc + current, 0)
      return (sum / this.projects.length).toFixed(2) || 0
    },
    priceMin() {
      return Math.min(...this.getPriceArray())
    },
    priceMax() {
      return Math.max(...this.getPriceArray())
    },
    chartDataSet() {
      return {
        datasets: [{
          data: [this.activeProjects, this.disabledProjects],
          backgroundColor: ['#50CD89', '#E4E6EF']
        }],
        labels: ['Активные', 'Неактивные']
      }
    }
  },
  methods: {
    getPriceArray() {
      return this.projects.reduce((acc, current) => {
        acc.push(parseFloat(current.price))
        return acc
      }, [])
    }
  },
  components: { ProjectCounterChart, BtTooltip }
}
</script>
