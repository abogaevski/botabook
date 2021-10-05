<template>
  <loader></loader>
  <div class="pt-xl-20 content d-flex flex-column flex-column-fluid">
    <div class="d-flex flex-column-fluid">
      <div class="container-xxl">
        <template v-if="projects.length">
          <div class="d-flex flex-column flex-xl-row">
            <public-profile-overview />
            <public-profile-booking-wizard :projects="projects" />
          </div>

        </template>
        <template v-else>
          <public-profile-no-data/>
        </template>

      </div>
    </div>
  </div>
</template>

<script>
import PublicProfileOverview from '@/components/public/PublicProfileOverview'
import PublicProfileBookingWizard from '@/components/public/PublicProfileBookingWizard'
import PublicProfileNoData from '@/components/public/PublicProfileNoData'
import ProjectService from '@/core/services/project.service'
import Loader from '@/components/Loader'

export default {
  data() {
    return {
      projects: []
    }
  },
  components: { PublicProfileOverview, PublicProfileBookingWizard, PublicProfileNoData, Loader },
  methods: {
    async getProjects() {
      await ProjectService.getPublicProjects(this.slug)
        .then((p) => {
          this.projects = p
          document.body.classList.remove('page-loading')
        })
    },
  },
  mounted() {
    this.getProjects()
  },
  computed: {
    slug() {
      return this.$route.params.slug
    }
  }
}
</script>
