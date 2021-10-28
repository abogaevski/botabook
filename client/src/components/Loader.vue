<template>
  <div class="card">
    <div class="card-body">
      <div class="page-loader flex-column">
        <inline-svg v-if="logoEnabled" class="h-40px" src="/media/logos/botabook-dark.svg" />
        <div class="d-flex align-items-center" :class="{'mt-5': logoEnabled}">
          <span class="spinner-border text-primary" role="status"></span>
          <span class="text-muted fs-6 fw-bold ms-5">Загрузка...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    logoEnabled: {
      required: false,
      default: false
    }
  }
}
</script>
