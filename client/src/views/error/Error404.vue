<template>
  <div class="d-flex flex-column flex-column-fluid">
    <div class="d-flex flex-column flex-column-fluid text-center p-10 py-lg-20">
      <a href="#" class="mb-10 pt-lg-20">
        <img alt="Logo" src="/media/logos/botabook-dark.svg" class="h-50px mb-5" />
      </a>

      <div class="pt-lg-10">
        <h1 class="fw-bolder fs-4x text-gray-700 mb-10">Упс... Ошибка 404</h1>

        <div class="fw-bold fs-3 text-gray-400 mb-15">
          Страницу не найдена! <br />
          Пожалуйста, вернитесь на главную или укажите правильный URL
        </div>

        <div class="text-center">
          <router-link to="/" class="btn btn-lg btn-primary fw-bolder"
          >На главную</router-link
          >
        </div>
      </div>
    </div>
    <div class="d-flex flex-center flex-column-auto p-10">
      <div class="d-flex align-items-center fw-bold fs-6">
        <a href="#" class="text-muted text-hover-primary px-2">Главная</a>

        <a href="#" class="text-muted text-hover-primary px-2">О BotaBook</a>

        <a href="#" class="text-muted text-hover-primary px-2">Связаться с нами</a>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'error-404',
  components: {}
}
</script>
