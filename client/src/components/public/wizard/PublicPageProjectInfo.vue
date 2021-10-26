<template>
  <div v-if="project" class="d-none d-lg-flex flex-column">
    <div class="d-flex flex-row align-items-center mb-5">
      <div class="symbol symbol-50px w-50px bg-light me-3">
        <span class="symbol-label fw-bolder" :class="`bg-light-${project.color} text-${project.color}`">{{ initial }}</span>
      </div>
      <div class="text-dark fs-5 fw-bolder">{{ project.title }}</div>
    </div>
    <div class="text-muted fw-bolder mb-5">{{ project.description }}</div>
    <div class="separator"></div>
    <div class="d-flex flex-column fw-bolder fs-4 mt-5">
      <public-page-project-symbols :time-range="project.timeRange" :price="project.price" />
    </div>
    <div class="separator py-3"></div>
    <div v-if="event" class="d-flex flex-column fw-bolder fs-4 mt-5 text-muted">
      {{ eventDate }}
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, toRefs } from 'vue'
import moment from 'moment'
import PublicPageProjectSymbols from '@/components/public/wizard/PublicPageProjectSymbols'

export default {
  name: 'PublicPageProjectInfo',
  props: ['projectId', 'event'],
  components: { PublicPageProjectSymbols },
  setup(props) {
    const store = useStore()
    const { projectId, event } = toRefs(props)
    const project = computed(() => store.getters['project/projectById'](projectId.value))
    const initial = computed(() => project.value.title.split('')[0])
    const eventDate = computed(() => moment(event.value).format('DD MMM YYYY HH:mm'))
    return {
      project,
      initial,
      eventDate
    }
  }
}
</script>

<style scoped>

</style>
