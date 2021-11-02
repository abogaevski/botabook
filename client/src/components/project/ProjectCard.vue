<template>
  <router-link
    v-if="project"
    :to="`/project/${project.id}`"
  >
    <div class="card border border-2 border-gray-300 border-hover">
      <div class="card-header border-0 pt-9">
        <div class="card-title m-0">
          <div class="symbol symbol-50px w-50px bg-light">
          <span
            class="symbol-label fw-bolder"
            :class="colorClass"
          >
            {{ initial }}
          </span>
          </div>
        </div>
        <div class="card-toolbar">
        <span
          :class="`badge-${statusDataColor}`"
          class="badge fw-bolder me-auto px-4 py-3 cursor-pointer"
          @click.prevent="toggleStatus"
        >
          {{ statusText }}
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
            <div class="fs-6 text-gray-800 fw-bolder">{{ price }}</div>
            <div class="fw-bold text-gray-400">Стоимость</div>
          </div>
        </div>
        <template v-if="customers.length">
          <project-customers-symbols-list :customers-id="project.customers" />
        </template>
      </div>
    </div>
  </router-link>
</template>
<script>
import { computed, toRefs } from 'vue'
import { useStore } from 'vuex'
import alert from '@/core/_utils/swal'
import ProjectCustomersSymbolsList from '@/components/project/ProjectCustomersSymbolsList'

export default {
  name: 'ProjectCard',
  components: { ProjectCustomersSymbolsList },
  props: {
    project: Object
  },
  setup(props) {
    const { project } = toRefs(props)
    const store = useStore()
    const customers = computed(() => store.getters['customerModule/customers'])
    const statusDataColor = computed(() => (project.value.isActive ? 'light-success' : 'light'))
    const statusText = computed(() => (project.value.isActive ? 'Активна' : 'Неактивна'))
    const initial = computed(() => project.value.title.split('')[0].toUpperCase())
    const colorClass = computed(() => [`bg-light-${project.value.color}`, `text-${project.value.color}`])
    const price = computed(() => (parseFloat(project.value.price) > 0 ? project.value.price : 'Бесплатно'))
    const toggleStatus = () => {
      alert({ title: 'Подтвердите изменение статуса', icon: 'question' })
        .then((result) => {
          if (result.value) {
            store.dispatch('project/toggleProject', project.value)
          }
        })
    }
    return {
      customers,
      statusDataColor,
      statusText,
      initial,
      colorClass,
      price,
      toggleStatus
    }
  }
}
</script>
