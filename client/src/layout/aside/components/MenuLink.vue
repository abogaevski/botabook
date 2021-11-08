<template>
  <div class="menu-item">
    <span v-if="disabled" class="menu-link">
      <span v-if="icon" class="w-auto me-3">
        <span class="svg-icon svg-icon-2">
          <inline-svg :src="icon"/>
        </span>
      </span>
      <span class="menu-title text-gray-400">
          {{ heading }}
          <span class="badge badge-light-danger ms-auto">{{ badgeContent }}</span>
        </span>
    </span>
    <router-link
      v-else
      v-slot="{ href, navigate, isActive, isExactActive }"
      :to="route"
    >
      <a
        :class="[ isActive && 'active', isExactActive && 'active']"
        :href="href"
        class="menu-link"
        @click="navigate"
      >
      <span v-if="icon" class="menu-icon w-auto me-3">
        <span class="svg-icon svg-icon-2">
          <inline-svg :src="icon"/>
        </span>
      </span>
        <span v-else class="menu-bullet">
        <span class="bullet bullet-dot"></span>
      </span>
        <span class="menu-title">
          {{ heading }}
          <bt-tooltip class="ms-auto" v-if="badgeContent && tooltipContent" :title="tooltipContent">
            <span class="badge badge-circle badge-light-primary">{{ badgeContent }}</span>
          </bt-tooltip>
        </span>
      </a>
    </router-link>
  </div>
</template>

<script>
import BtTooltip from '@/components/_core/BtTooltip'

export default {
  name: 'MenuLink',
  components: { BtTooltip },
  props: {
    route: {
      required: true,
      type: [String, Object]
    },
    heading: {
      required: true,
      type: String
    },
    icon: {
      required: false,
      type: String,
      default: ''
    },
    badgeContent: {
      required: false,
      type: [String, Number],
      default: ''
    },
    tooltipContent: {
      required: false,
      type: String,
      default: ''
    },
    disabled: {
      required: false,
      type: Boolean,
      default: false
    }
  }
}
</script>
