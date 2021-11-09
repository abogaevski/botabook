<template>
  <div class="d-flex align-items-stretch flex-shrink-0">
    <div class="d-flex align-items-center ms-1 ms-lg-3">
      <bt-tooltip title="Открыть календарь">
        <router-link v-slot="{ href, navigate, isActive, isExactActive }" to="/calendar">
          <a
            :class="[isActive && 'active', isExactActive && 'active']"
            :href="href"
            class="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px"
            @click="navigate"
          >
          <span class="svg-icon svg-icon-2x">
            <inline-svg src="/media/icons/duotune/general/gen014.svg"/>
          </span>
          </a>
        </router-link>
      </bt-tooltip>
    </div>
    <div class="d-flex align-items-center ms-3">
      <div
        class="cursor-pointer symbol symbol-30px symbol-md-40px"
        data-bb-menu-trigger="click"
        data-bb-menu-attach="parent"
        data-bb-menu-placement="bottom-end"
        data-bb-menu-flip="bottom"
      >
        <img :src="user.profile.avatar" :alt="user.profile.firstName"/>
      </div>
      <UserMenu></UserMenu>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import UserMenu from './partials/UserMenu.vue'
import BtTooltip from '@/components/_core/BtTooltip'

export default {
  name: 'TopBar',
  components: { UserMenu, BtTooltip },
  computed: {
    ...mapGetters('userProfile', ['user'])
  }
}
</script>
