<template>
  <div class="header align-items-stretch">
    <div class="container-fluid d-flex align-items-stretch justify-content-between">

      <div class="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
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
