<template>
  <div class="d-flex align-items-stretch flex-shrink-0">
    <div class="d-flex align-items-center ms-1 ms-lg-3">
      <div
        class="cursor-pointer symbol symbol-30px symbol-md-40px"
        data-bb-menu-trigger="click"
        data-bb-menu-attach="parent"
        data-bb-menu-placement="bottom-end"
        data-bb-menu-flip="bottom"
      >
        <img src="/media/avatars/blank.png" alt="metronic"/>
      </div>
      <UserMenu></UserMenu>
    </div>
  </div>
</template>
<script>
import UserMenu from './partials/UserMenu.vue'

export default {
  name: 'Topbar',
  components: { UserMenu },
}
</script>
