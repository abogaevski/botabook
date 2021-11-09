<template>
  <div class="d-flex flex-column">
    <div class="d-flex align-items-center mb-2">
    <span class="svg-icon svg-icon-4 me-1">
      <inline-svg src="/media/icons/duotone/Code/Time-schedule.svg"/>
      {{ timeRange }} мин.
    </span>
    </div>
    <div class="d-flex align-items-center me-5">
    <span class="svg-icon svg-icon-4 me-1">
      <inline-svg src="/media/icons/duotone/Shopping/Money.svg"/>
      {{ calcPrice }}
    </span>
    </div>
  </div>
</template>

<script>
import { computed, toRefs } from 'vue'

export default {
  name: 'PublicPageProjectSymbols',
  props: ['timeRange', 'price'],
  setup(props) {
    const { price } = toRefs(props)
    // eslint-disable-next-line radix
    const calcPrice = computed(() => (parseInt(price.value) === 0 ? 'Бесплатно' : `${price.value} руб`))
    return { calcPrice }
  }
}
</script>
