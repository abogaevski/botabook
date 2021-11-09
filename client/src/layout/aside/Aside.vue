<template>
  <div
    class="aside aside-hoverable aside-light"
    data-bb-drawer="true"
    data-bb-drawer-name="aside"
    data-bb-drawer-activate="{default: true, lg: false}"
    data-bb-drawer-overlay="true"
    data-bb-drawer-width="{default:'320px'}"
    data-bb-drawer-direction="start"
    data-bb-drawer-toggle="#bb_aside_mobile_toggle"
  >
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
      <a target="_blank" href="https://t.me/botabookchat" class="btn btn-custom btn-light-primary w-100 btn-icon mb-3">
        <span class="svg-icon svg-icon-2">
          <inline-svg src="/media/svg/brand-logos/telegram-2.svg" />
        </span>
        <span class="btn-label">
          <span class="ms-2">Помощь в чате</span>
        </span>
      </a>
      <a
        target="_blank"
        href="https://www.youtube.com/channel/UC-3zrq0yCjCXFFTjSf80scQ"
        class="btn btn-custom btn-light-youtube w-100 btn-icon"
      >
        <span class="svg-icon svg-icon-2">
          <inline-svg src="/media/icons/duotone/Media/Youtube.svg" />
        </span>
        <span class="btn-label">
          <span class="ms-2">YouTube</span>
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import { onMounted, onUpdated } from 'vue'
import { ToggleComponent } from '@/core/components/_ToggleComponent'
import { DrawerComponent } from '@/core/_utils/_DrawerComponent'
import Menu from './Menu.vue'

export default {
  name: 'Aside',
  components: {
    Menu
  },
  setup() {
    onMounted(() => {
      DrawerComponent.reinitialization()
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
