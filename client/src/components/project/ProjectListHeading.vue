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
      <!--begin::Clients-->
      <div class="card h-100">
        <div class="card-body p-9">
          <!--begin::Heading-->
          <div class="fs-2hx fw-bolder">49</div>
          <div class="fs-4 fw-bold text-gray-400 mb-7">Клиенты</div>
          <!--end::Heading-->
          <!--begin::Users group-->
          <div class="symbol-group symbol-hover mb-9">
            <div class="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" title=""
                 data-bs-original-title="Alan Warden">
              <span class="symbol-label bg-warning text-inverse-warning fw-bolder">A</span>
            </div>
            <div class="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" title=""
                 data-bs-original-title="Michael Eberon">
              <img alt="Pic" src="/media/avatars/150-12.jpg">
            </div>
            <div class="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" title=""
                 data-bs-original-title="Michelle Swanston">
              <img alt="Pic" src="/media/avatars/150-13.jpg">
            </div>
            <div class="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" title=""
                 data-bs-original-title="Francis Mitcham">
              <img alt="Pic" src="/media/avatars/150-5.jpg">
            </div>
            <div class="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" title=""
                 data-bs-original-title="Susan Redwood">
              <span class="symbol-label bg-primary text-inverse-primary fw-bolder">S</span>
            </div>
            <div class="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" title=""
                 data-bs-original-title="Melody Macy">
              <img alt="Pic" src="/media/avatars/150-3.jpg">
            </div>
            <div class="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" title=""
                 data-bs-original-title="Perry Matthew">
              <span class="symbol-label bg-info text-inverse-info fw-bolder">P</span>
            </div>
            <div class="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" title=""
                 data-bs-original-title="Barry Walter">
              <img alt="Pic" src="/media/avatars/150-7.jpg">
            </div>
            <a href="#" class="symbol symbol-35px symbol-circle" data-bs-toggle="modal"
               data-bs-target="#kt_modal_view_users">
              <span class="symbol-label bg-dark text-gray-300 fs-8 fw-bolder">+42</span>
            </a>
          </div>
          <div class="d-flex">
            <a href="#" class="btn btn-primary btn-sm me-3" data-bs-toggle="modal"
               data-bs-target="#kt_modal_view_users">All Clients</a>
            <a href="#" class="btn btn-light btn-sm" data-bs-toggle="modal" data-bs-target="#kt_modal_users_search">Invite
              New</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ProjectCounterChart from '@/components/project/ProjectCounterChart'

export default {
  name: 'ProjectListHeading',
  computed: {
    ...mapGetters('project', ['projects']),

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
  components: { ProjectCounterChart }
}
</script>
