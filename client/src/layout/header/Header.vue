<template>
  <div class="header align-items-stretch">
    <div class="container-fluid d-flex align-items-stretch justify-content-between">
      <div class="d-flex align-items-center d-lg-none me-3">
        <div class="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px" id="bb_aside_mobile_toggle">
          <span class="svg-icon svg-icon-2x mt-1">
            <inline-svg src="/media/icons/duotone/Text/Menu.svg" />
          </span>
        </div>
      </div>
      <div class="d-flex align-items-stretch justify-content-between flex-grow-1">
        <div class="d-flex align-items-center">
          <page-title />
        </div>
      </div>
      <div class="d-flex align-items-stretch flex-shrink-0">
        <TopBar />
      </div>

    </div>

  </div>
</template>

<script>
import TopBar from '@/layout/header/Topbar.vue';
import PageTitle from '../page-title/PageTitle.vue';

export default {
  components: {
    TopBar,
    PageTitle
  }
}
</script>

<style scoped>

</style>
