<template>
  <div class="d-flex align-items-stretch flex-shrink-0">
    <div class="d-flex align-items-center ms-1 ms-lg-3">
      <div @click="toggleMenu" class="cursor-pointer symbol symbol-30px symbol-md-40px">
        <img src="media/avatars/blank.png" alt="metronic" />
      </div>
      <UserMenu :is-active="isMenuActive"></UserMenu>
    </div>
  </div>
</template>
<script>
import UserMenu from '@/layout/header/partials/UserMenu.vue';

export default {
  name: 'Topbar',
  data() {
    return {
      isMenuActive: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive
    }
  },
  components: { UserMenu }
}
</script>
