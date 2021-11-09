<template>
  <div class="d-flex flex-column flex-column-fluid pb-10">
    <public-page-header />
    <div class="d-flex flex-column-fluid pt-5">
      <div class="container">
          <div class="row g-8">
            <div class="col-xl-3 col-lg-4">
              <public-profile-skeleton v-if="isLoading" />
              <public-profile-overview v-else-if="!isLoading && profile" />
            </div>
            <div class="col-xl-9 col-lg-8">
              <public-profile-skeleton v-if="isLoading" />
              <public-profile-booking-wizard v-if="!isLoading && projects.length" :projects="projects" />
              <no-data v-else header="Нет услуг" content="Пользователь пока не готов принимать встречи! Возвращайтесь позже." is-large />
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import PublicPageHeader from '@/components/public/PublicPageHeader'
import PublicProfileOverview from '@/components/public/PublicProfileOverview'
import PublicProfileBookingWizard from '@/components/public/PublicProfileBookingWizard'
import PublicProfileSkeleton from '@/components/public/PublicProfileSkeleton'
import NoData from '@/components/common/NoData'

export default {
  components: { PublicProfileOverview, PublicProfileBookingWizard, PublicPageHeader, PublicProfileSkeleton, NoData },
  setup() {
    const store = useStore()
    const isLoading = ref(true)
    const route = useRoute()
    const slug = computed(() => route.params.slug)

    store.dispatch('userProfile/getPublicProfile', route.params.slug)
    store.dispatch('project/getPublicProjects', slug.value)
      .then(() => isLoading.value = false)
    const profile = computed(() => store.getters['userProfile/user'])
    const projects = computed(() => store.getters['project/projects'])
    document.body.classList.remove('header-fixed', 'header-tablet-and-mobile-fixed', 'aside-enabled', 'aside-fixed')

    return {
      isLoading,
      projects,
      profile
    }
  },
}
</script>
