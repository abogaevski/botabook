<template>
  <component
    :is="tag"
    data-bs-toggle="tooltip"
    ref="tooltip"
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
import { ref, onMounted } from 'vue'

export default {
  props: {
    tag: String,
    tooltipClass: String,
    title: String,
    placement: String
  },
  setup() {
    const tooltip = ref(null)
    onMounted(() => {
      // eslint-disable-next-line no-new
      new Tooltip(tooltip.value)
    })

    return {
      tooltip
    }
  }
}
</script>
