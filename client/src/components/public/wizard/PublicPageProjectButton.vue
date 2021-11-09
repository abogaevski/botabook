<template>
  <label
    class="btn p-4 d-flex align-items-center mb-10 h-100 btn-bg-light"
    :class="`btn-active-light-${project.color}`"
    :for="projectInputId">
      <span class="svg-icon svg-icon-3x me-4">
        <inline-svg src="/media/icons/duotune/general/gen005.svg" />
      </span>
    <div class="d-block fw-bold text-start">
      <span class="fw-bolder d-block fs-4 mb-3">
        {{ project.title }}
      </span>
      <span class="d-block fs-6 mb-3">{{ subDescription }}</span>
      <div class="d-flex flex-wrap fw-bold fs-6 pe-2">
        <public-page-project-symbols :time-range="project.timeRange" :price="project.price" />
      </div>
    </div>
  </label>
</template>

<script>
import { toRefs } from 'vue'
import PublicPageProjectSymbols from '@/components/public/wizard/PublicPageProjectSymbols'

export default {
  name: 'PublicPageProjectButton',
  props: ['projectInputId', 'project'],
  components: { PublicPageProjectSymbols },
  setup(props) {
    const { project } = toRefs(props)
    const subDescription = project.value.description ? project.value.description.substring(0, 40) : ''
    return { subDescription }
  }
}
</script>
