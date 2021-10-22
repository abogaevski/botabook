<template>
  <div class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-3">
    <span class="svg-icon svg-icon-4 me-1">
      <inline-svg src="/media/icons/duotone/Code/Time-schedule.svg"/>
      {{ timeRange }} мин.
    </span>
  </div>
  <div class="d-flex align-items-center text-gray-400 text-hover-primary me-5">
    <span class="svg-icon svg-icon-4 me-1">
      <inline-svg src="/media/icons/duotone/Shopping/Money.svg"/>
      {{ price }} руб.
    </span>
  </div>
</template>

<script>
export default {
  name: 'PublicPageProjectSymbols',
  props: ['timeRange', 'price']
}
</script>
