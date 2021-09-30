<template>
  <div class="page-loader flex-column">
    <img alt="Logo" class="h-40px" src="/media/logos/botabook-dark.svg" />

    <div class="d-flex align-items-center mt-5">
      <span class="spinner-border text-primary" role="status"></span>
      <span class="text-muted fs-6 fw-bold ms-5">Загрузка...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader'
}
</script>
