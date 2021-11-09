<template>
  <template v-if="!isLoading && projects.length">
    <project-list-heading />
    <div class="d-flex flex-wrap flex-stack my-5">
      <h2 class="fs-2 fw-bold my-2">
        Услуги
      </h2>
      <div class="d-flex flex-wrap my-1">
        <div class="m-0">
          <bt-button
            btn-class="btn-sm btn-primary me-3"
            icon-url="/media/icons/duotone/Navigation/Plus.svg"
            icon-class="svg-icon-2"
            @click="showModal"
          >
            Добавить услугу
          </bt-button>
        </div>
      </div>
    </div>
    <div class="row g-6 g-xl-9" v-if="projects.length">
      <template v-for="(project, i) in projects" :key="i">
        <div class="col-md-6 col-xl-4">
          <project-card :project="project"/>
        </div>
      </template>
    </div>
  </template>
  <div v-else-if="isLoading" class="card">
    <div class="card-body">
      <el-skeleton :rows="6" animated />
    </div>
  </div>
  <no-data
    v-else-if="projects.length === 0"
    is-large
    header="Услуг не найдено"
  />
  <project-create-modal :show-modal="isActiveCreateModal" @modal:close="closeModal"/>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import ProjectListHeading from '@/components/project/ProjectListHeading'
import ProjectCard from '@/components/project/ProjectCard'
import BtButton from '@/components/_core/buttons/BtButton'
import ProjectCreateModal from '@/components/project/ProjectCreateModal'
import NoData from '@/components/common/NoData'

export default {
  name: 'ProjectList',
  components: {
    ProjectListHeading,
    ProjectCard,
    BtButton,
    ProjectCreateModal,
    NoData
  },
  setup() {
    const store = useStore()
    const isActiveCreateModal = ref(false)
    const isLoading = ref(true)
    store.dispatch('project/getProjects')
      .then(() => isLoading.value = false)
    store.dispatch('customerModule/getCustomers')
    store.dispatch('setTitle', 'Услуги')
    const closeModal = () => isActiveCreateModal.value = false
    const showModal = () => isActiveCreateModal.value = true
    const projects = computed(() => store.getters['project/projects'])

    return {
      isActiveCreateModal,
      closeModal,
      showModal,
      projects,
      isLoading
    }
  }
}
</script>
