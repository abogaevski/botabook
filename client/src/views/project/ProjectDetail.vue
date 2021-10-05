<template>
  <div class="card mb-6 mb-xl-9">
    <div class="card-body pt-9 pb-0">
      <div class="d-flex flex-wrap flex-sm-nowrap mb-6">
        <div
          class="fs-5tx d-flex flex-center flex-shrink-0 rounded w-100px h-100px w-lg-150px h-lg-150px me-7 mb-4 symbol-label fw-bolder"
          :class="getColorClass"
        >
          {{ getInitials }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ProjectDetail',
  computed: {
    ...mapGetters('project', ['projectById']),
    getColorClass() {
      const color = this.project.color || ''
      return [
        `bg-light-${color}`,
        `text-${color}`
      ]
    },
    getInitials() {
      return this.project.title ? this.project.title.split('')[0].toUpperCase() : ''
    },
  },
  methods: {
    ...mapActions('project', ['getProjects'])
  },
}
</script>
