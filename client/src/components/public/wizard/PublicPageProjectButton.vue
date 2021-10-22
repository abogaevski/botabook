<template>
  <label
    class="btn btn-outline btn-outline-default btn-outline-dashed p-7 d-flex align-items-center mb-10"
    :for="projectInputId">
      <span class="svg-icon svg-icon-3x me-5">
        <inline-svg src="/media/icons/duotone/Communication/Clipboard-list.svg"></inline-svg>
      </span>
    <span class="d-block fw-bold text-start">
      <span class="text-dark fw-bolder d-block fs-4 mb-2">{{ project.title }}</span>
      <div class="d-flex flex-wrap fw-bold fs-6 mt-4 pe-2">
        <public-page-project-symbols :time-range="project.timeRange" :price="project.price" />
      </div>
    </span>
  </label>
</template>

<script>
import PublicPageProjectSymbols from '@/components/public/wizard/PublicPageProjectSymbols'

export default {
  name: 'PublicPageProjectButton',
  props: ['projectInputId', 'project'],
  components: { PublicPageProjectSymbols }
}
</script>
