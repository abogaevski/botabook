<template>
  <div class="aside aside-hoverable aside-light">
    <div id="bb_aside_logo" class="aside-logo flex-column-auto">
      <img src="/media/logos/botabook-dark.svg" class="h-35px logo" alt="">

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
    <div class="aside-footer flex-column-auto pt-5 pb-7 px-5" id="bb_aside_footer">
    </div>
  </div>
</template>

<script>
import { onMounted, onUpdated } from 'vue'
import { ToggleComponent } from '@/core/components/_ToggleComponent'
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
