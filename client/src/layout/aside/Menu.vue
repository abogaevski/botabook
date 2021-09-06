<template>
  <div class="hover-scroll-overlay-y my-5 my-lg-5">
    <div
      class="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500"
    >
      <div class="menu-item" v-for="item in menuItems" :key="item">
        <router-link
          v-slot="{ href, navigate, isActive, isExactActive }"
          :to="item.to"
        >
          <a
            :class="[isActive && 'active', isExactActive && 'active']"
            :href="href"
            class="menu-link"
            @click="navigate"
          >
            <span class="menu-icon">
              <span class="svg-icon svg-icon-2">
                <inline-svg :src="item.iconUrl"/>
              </span>
            </span>
            <span class="menu-title">{{ item.title }}</span>
          </a>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AsideMenu',
  data() {
    return {
      menuItems: [
        {
          to: 'dashboard',
          title: 'Дашборд',
          iconUrl: 'media/icons/duotone/Interface/Calendar.svg'
        },
        {
          to: 'calendar',
          title: 'Календарь',
          iconUrl: 'media/icons/duotone/Design/PenAndRuller.svg'
        }
      ]
    }
  }
}
</script>

<style>

</style>
