<template>
  <div class="aside aside-hoverable aside-light">
    <div class="aside-logo flex-column-auto">
      <img src="/media/logos/logo-full.svg" class="h-45px logo" alt="">

      <div
        id="bb_aside_toggle"
        class="btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle"
        data-bb-toggle="true"
        data-bb-toggle-state="active"
        data-bb-toggle-target="body"
        data-bb-toggle-name="aside-minimize"
      >
        <span class="svg-icon svg-icon-1 rotate-180">
          <inline-svg src="/media/icons/duotone/Navigation/Angle-double-left.svg"/>
        </span>
      </div>
    </div>

    <div class="aside-menu flex-column-fluid">
      <Menu></Menu>
    </div>
  </div>
</template>

<script>
import { ToggleComponent } from '@/core/components/_ToggleComponent'
import { onMounted, onUpdated } from 'vue'
import Menu from './Menu.vue'

export default {
  name: 'Aside',
  components: {
    Menu
  },
  setup() {
    onMounted(() => {
      ToggleComponent.reinitialization();
    })
    onUpdated(() => {
      ToggleComponent.bootstrap();
    });
  }
}
</script>

<style>

</style>
