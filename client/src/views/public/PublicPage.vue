<template>
  <loader v-if="loaderEnabled"></loader>
  <div v-if="projects.length" class="d-flex flex-column flex-column-fluid pb-10">
    <public-page-header />
    <div class="d-flex flex-column-fluid pt-5">
      <div class="container">
          <div class="row g-8">
            <div class="col-xl-3 col-lg-4">
              <public-profile-overview />
            </div>
            <div class="col-xl-9 col-lg-8">
              <public-profile-booking-wizard :projects="projects" />
            </div>
          </div>
      </div>
    </div>
  </div>
  <template v-else>
    <public-profile-no-data/>
  </template>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
// import UserService from '@/core/services/user.service'
import PublicPageHeader from '@/components/public/PublicPageHeader'
import PublicProfileOverview from '@/components/public/PublicProfileOverview'
import PublicProfileBookingWizard from '@/components/public/PublicProfileBookingWizard'
import PublicProfileNoData from '@/components/public/PublicProfileNoData'
import Loader from '@/components/Loader'

export default {
  components: { PublicProfileOverview, PublicProfileBookingWizard, PublicProfileNoData, Loader, PublicPageHeader },
  setup() {
    const store = useStore()
    const loaderEnabled = ref(true)
    const route = useRoute()
    const slug = computed(() => route.params.slug)

    store.dispatch('project/getPublicProjects', slug.value)
    const projects = computed(() => store.getters['project/projects'])
    watch(projects, (val) => {
      if (val) {
        document.body.classList.remove('page-loading')
      }
    })
    document.body.classList.remove('header-fixed', 'header-tablet-and-mobile-fixed', 'aside-enabled', 'aside-fixed')

    return {
      loaderEnabled,
      projects
    }
  },
}
</script>
