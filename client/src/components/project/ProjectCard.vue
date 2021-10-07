<template>
  <router-link
    :to="`/project/${project.id}`"
  >
    <div class="card border border-2 border-gray-300 border-hover">
      <div class="card-header border-0 pt-9">
        <div class="card-title m-0">
          <div class="symbol symbol-50px w-50px bg-light">
          <span
            class="symbol-label fw-bolder"
            :class="getColorClass"
          >
            {{ getInitials }}
          </span>
          </div>
        </div>
        <div class="card-toolbar">
        <span
          :class="`badge-${getStatusDataColor}`"
          class="badge fw-bolder me-auto px-4 py-3 cursor-pointer"
          @click="toggleProjectStatus"
        >
          {{ getStatus }}
        </span>
        </div>
      </div>
      <div class="card-body p-9">
        <div class="fs-3 fw-bolder text-dark">
          {{ project.title }}
        </div>
        <p class="text-gray-400 fw-bold fs-5 mt-1 mb-7">
          {{ project.description }}
        </p>

        <div class="d-flex flex-wrap mb-5">
          <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3">
            <div class="fs-6 text-gray-800 fw-bolder">{{ project.timeRange }} мин.</div>
            <div class="fw-bold text-gray-400">Длительность</div>
          </div>

          <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mb-3">
            <div class="fs-6 text-gray-800 fw-bolder">{{ getPrice }}</div>
            <div class="fw-bold text-gray-400">Стоимость</div>
          </div>
        </div>
        <template v-if="customers">
          <project-customers-symbols-list :customers-id="project.customers" />
        </template>
      </div>
    </div>
  </router-link>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'
import ProjectCustomersSymbolsList from '@/components/project/ProjectCustomersSymbolsList'

export default {
  name: 'ProjectCard',
  components: { ProjectCustomersSymbolsList },
  props: {
    project: Object
  },
  computed: {
    ...mapGetters('customerModule', ['customers']),
    getStatusDataColor() {
      return this.project.isActive ? 'light-success' : 'light'
    },
    getStatus() {
      return this.project.isActive ? 'Активен' : 'Неактивен'
    },
    getInitials() {
      return this.project.title.split('')[0].toUpperCase()
    },
    getColorClass() {
      return [
        `bg-light-${this.project.color}`,
        `text-${this.project.color}`
      ]
    },
    getPrice() {
      return parseFloat(this.project.price) > 0 ? this.project.price : 'Бесплатно'
    }
  },
  methods: {
    ...mapActions('project', ['toggleProject']),
    toggleProjectStatus() {
      Swal.fire({
        title: 'Вы уверены, что хотите изменить статус услуги?',
        icon: 'warning',
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: 'Да!',
        cancelButtonText: 'Отмена',
        customClass: {
          confirmButton: 'btn btn-warning',
          cancelButton: 'btn btn-active-light'
        }
      }).then((result) => {
        if (result.value) {
          this.toggleProject(this.project)
        }
      })
    }
  }
}
</script>
