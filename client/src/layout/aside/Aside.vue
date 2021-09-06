<template>
  <div class="aside aside-hoverable aside-light">
    <div class="aside-logo flex-column-auto">
      <img src="media/logos/logo-full.svg" class="h-45px logo" alt="">
    </div>

    <div class="aside-menu flex-column-fluid">
      <Menu>></Menu>
    </div>
  </div>
</template>

<script>
import Menu from './Menu.vue'

export default {
  name: 'Aside',
  components: {
    Menu
  }
}
</script>

<style>

</style>
