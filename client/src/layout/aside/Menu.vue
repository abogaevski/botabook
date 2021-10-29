<template>
  <div
    id="bb-aside-menu-wrapper"
    data-bb-scroll="true"
    data-bb-scroll-activate="{default: false, lg: true}"
    data-bb-scroll-height="auto"
    data-bb-scroll-dependencies="#bb_aside_logo, #bb_aside_footer"
    data-bb-scroll-wrappers="#bb_aside_menu"
    data-bb-scroll-offset="0"
    class="hover-scroll-overlay-y my-lg-5">
    <div
      id="bb_aside_menu"
      class="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500"
      data-bb-menu="true"
    >
      <template v-for="(item, i) in menuItems" :key="i">
        <div v-if="item.heading" class="menu-item">
          <div class="menu-content pt-8 pb-2">
              <span class="menu-section text-muted text-uppercase fs-8 ls-1">
                {{ item.heading }}
              </span>
          </div>
        </div>
        <template v-for="(menuItem, j) in item.pages" :key="j">
          <template v-if="menuItem.heading">
            <div class="menu-item">
              <router-link
                v-slot="{ href, navigate, isActive, isExactActive }"
                :to="menuItem.route"
              >
                <a
                  :class="[isActive && 'active', isExactActive && 'active']"
                  :href="href"
                  class="menu-link"
                  @click="navigate"
                >
                    <span v-if="menuItem.svgIcon" class="menu-icon">
                      <span class="svg-icon svg-icon-2">
                        <inline-svg :src="menuItem.svgIcon"/>
                      </span>
                    </span>
                  <span class="menu-title">
                    {{ menuItem.heading }}
                  </span>
                </a>
              </router-link>
            </div>
          </template>
          <div
            v-if="menuItem.sectionTitle"
            :class="{ show: hasActiveChildren(menuItem.route) }"
            class="menu-item menu-accordion"
            data-bb-menu-sub="accordion"
            data-bb-menu-trigger="click"
          >
            <span class="menu-link">
              <span
                v-if="menuItem.svgIcon"
                class="menu-icon"
              >
                <span class="svg-icon svg-icon-2">
                  <inline-svg :src="menuItem.svgIcon"/>
                </span>
              </span>
              <span class="menu-title">
                {{ menuItem.sectionTitle }}
              </span>
              <span class="menu-arrow"></span>
            </span>
            <div
              :class="{ show: hasActiveChildren(menuItem.route) }"
              class="menu-sub menu-sub-accordion"
            >
              <template v-for="(subItem, k) in menuItem.sub" :key="k">
                <div v-if="subItem.heading" class="menu-item">
                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  :to="subItem.route"
                >
                  <a
                    :class="[
                      isActive && 'active',
                      isExactActive && 'active'
                    ]"
                    :href="href"
                    class="menu-link"
                    @click="navigate"
                  >
                    <span class="menu-bullet">
                      <span class="bullet bullet-dot"></span>
                    </span>
                    <span class="menu-title">
                      {{ subItem.heading }}
                    </span>
                  </a>
                </router-link>
            </div>
              </template>
            </div>
          </div>
        </template>
      </template>
      <template v-if="user">
        <div v-if="user.isSuperuser">
          <div class="menu-item">
            <div class="menu-content pt-8 pb-2">
              <span class="menu-section text-muted text-uppercase fs-8 ls-1">Типа админ</span>
            </div>
          </div>
          <div class="menu-item">
            <router-link v-slot="{ href, navigate, isActive, isExactActive }" to="/admin/counter">
              <a :class="[isActive && 'active', isExactActive && 'active']" :href="href" class="menu-link" @click="navigate">
              <span class="menu-icon">
                <span class="svg-icon svg-icon-2">
                  <inline-svg src="/media/icons/duotone/Food/Beer.svg"/>
                </span>
              </span>
                <span class="menu-title">
                Счетчики
              </span>
              </a>
            </router-link>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { AsideMenuConfig } from '@/core/config/AsideMenu.config'
import { ScrollComponent } from '@/core/components/_ScrollComponent'

export default {
  name: 'AsideMenu',
  setup() {
    const route = useRoute()
    const store = useStore()
    const menuItems = [...AsideMenuConfig]
    const user = computed(() => store.getters['userProfile/user'])
    const hasActiveChildren = (match) => route.path.indexOf(match) !== -1
    onMounted(() => setTimeout(() => ScrollComponent.reinitialization(), 0))
    return {
      user,
      menuItems,
      hasActiveChildren
    }
  }
}
</script>

<style>
.aside-menu .menu .menu-sub .menu-item a a.menu-link {
  padding-left: calc(0.75rem + 25px);
  cursor: pointer;
  display: flex;
  align-items: center;
  flex: 0 0 100%;
  transition: none;
  outline: none !important;
}

.aside-menu .menu .menu-sub .menu-sub .menu-item a a.menu-link {
  padding-left: calc(1.5rem + 25px);
  cursor: pointer;
  display: flex;
  align-items: center;
  flex: 0 0 100%;
  transition: none;
  outline: none !important;
}
</style>
