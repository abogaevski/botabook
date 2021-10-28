<template>
  <div class="card">
    <div class="card-body">
      <div class="page-loader flex-column">
        <div class="d-flex align-items-center">
          <span class="spinner-border text-primary" role="status"></span>
          <span class="text-muted fs-6 fw-bold ms-5">Загрузка...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader'
}
</script>
