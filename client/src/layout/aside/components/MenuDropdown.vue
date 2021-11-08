<template>
  <div
    class="menu-item menu-accordion"
    :class="{ show: hasActiveChildren(route) }"
    data-bb-menu-sub="accordion"
    data-bb-menu-trigger="click"
  >
    <span class="menu-link">
      <span v-if="icon" class="menu-icon">
        <span class="svg-icon svg-icon-2">
          <inline-svg :src="icon"/>
        </span>
      </span>
      <span class="menu-title">
        {{ heading }}
      </span>
      <span class="menu-arrow"></span>
    </span>
    <div class="menu-sub menu-sub-accordion bg-lighten bg-opacity-75 border-top border-bottom" :class="{ show: hasActiveChildren(route) }">
      <template v-for="(link, k) in links" :key="k">
        <div v-if="link.heading" class="menu-item">
          <router-link
            v-slot="{ href, navigate, isActive, isExactActive }"
            :to="link.route"
          >
            <a
              :class="[isActive && 'active', isExactActive && 'active']"
              :href="href"
              class="menu-link"
              @click="navigate"
            >
              <span v-if="link.icon" class="menu-icon w-auto me-3">
                <span class="svg-icon svg-icon-6">
                  <inline-svg :src="link.icon"/>
                </span>
              </span>
              <span v-else class="menu-bullet">
                <span class="bullet bullet-dot" :class="link.color ? `bg-${link.color}` : ''"></span>
              </span>
              <span class="menu-title">
                {{ link.heading }}
              </span>
            </a>
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
  name: 'MenuDropdown',
  props: ['icon', 'heading', 'route', 'links'],
  setup() {
    const route = useRoute()
    const hasActiveChildren = (match) => route.path.indexOf(match) !== -1
    return {
      hasActiveChildren
    }
  }
}
</script>
