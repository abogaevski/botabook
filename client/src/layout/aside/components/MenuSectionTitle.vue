<template>
  <div class="menu-item">
    <div class="menu-content pt-8 pb-2">
      <span class="menu-section text-muted text-uppercase fs-8 ls-1">
        <slot name="default"/>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuSectionTitle'
}
</script>
