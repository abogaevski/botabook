<template>
  <div class="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">
    <h1 v-if="title" class="d-flex align-items-center text-dark fw-bolder fs-3 my-1">{{ title }}</h1>
  </div>
</template>

<script>

import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  setup() {
    const store = useStore()
    const title = computed(() => store.getters.title) || ''

    return {
      title
    }
  }
}
</script>
