<template>
  <component
    :is="tag"
    data-bs-toggle="tooltip"
    ref="tooltipEl"
    :class="tooltipClass"
    :data-bs-original-title="title"
    :data-bs-placement="placement"
    :title="title"
    :aria-label="title">
    <slot />
  </component>
</template>
<script>
import { Tooltip } from 'bootstrap'
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  props: {
    tag: {
      required: false,
      default: 'span'
    },
    tooltipClass: {
      required: false,
      default: ''
    },
    title: {
      required: true
    },
    placement: {
      required: false,
      default: 'top'
    }
  },
  setup() {
    const tooltipEl = ref(null)
    const tooltip = ref([])
    onMounted(() => {
      tooltip.value = new Tooltip(tooltipEl.value)
    })
    onBeforeUnmount(() => {
      tooltip.value = ''
    })
    return {
      tooltip,
      tooltipEl
    }
  }
}
</script>
