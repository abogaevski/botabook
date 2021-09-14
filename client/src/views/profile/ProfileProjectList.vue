<template>
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
<script>
import BtButton from '@/components/_core/buttons/BtButton'
import ProjectCard from '@/components/project/ProjectCard'
import { mapGetters } from 'vuex'

export default {
  name: 'ProfileProjectList',
  components: {
    BtButton, ProjectCard
  },
  computed: {
    ...mapGetters('project', ['projects'])
  },
  created() {
    this.$store.dispatch('project/getProjects')
  }
}
</script>
