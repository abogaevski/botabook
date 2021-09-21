<template>
  <template v-if="projects.length">
    <project-list-heading></project-list-heading>
    <div class="d-flex flex-wrap flex-stack my-5">
      <h2 class="fs-2 fw-bold my-2">
        Услуги
        <span class="fs-6 text-gray-400 ms-1">по названию</span>
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
    <div class="row g-6 g-xl-9">

      <template v-for="(project, i) in projects" :key="i">
        <div class="col-md-6 col-xl-4">
          <project-card
            :title=project.title
            :description=project.description
            :time-range=project.timeRange
            :price=project.price
            :is-active=project.isActive
          />
        </div>
      </template>

    </div>
  </template>
  <project-no-data
    v-else
    @modal:show="showModal"
    :is-active-create-modal="isActiveCreateModal"
  />
  <project-create-modal
    :show-modal="isActiveCreateModal"
    @modal:hide="closeModal"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import ProjectListHeading from '@/components/project/ProjectListHeading'
import ProjectCard from '@/components/project/ProjectCard'
import ProjectNoData from '@/components/project/ProjectNoData'
import BtButton from '@/components/_core/buttons/BtButton'
import ProjectCreateModal from '@/components/project/ProjectCreateModal'

export default {
  name: 'ProjectList',
  components: {
    ProjectListHeading,
    ProjectCard,
    BtButton,
    ProjectNoData,
    ProjectCreateModal
  },
  data() {
    return {
      isActiveCreateModal: false
    }
  },
  created() {
    this.$store.dispatch('project/getProjects')
  },
  computed: {
    ...mapGetters('project', ['projects'])
  },
  methods: {
    closeModal() {
      this.isActiveCreateModal = false
    },
    showModal() {
      this.isActiveCreateModal = true
    }
  }
}
</script>
