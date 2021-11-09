<template>
  <div class="d-flex flex-column flex-center flex-column-fluid p-10">
    <router-link to="/">
      <img alt="BotaBook Logo" src="/media/logos/botabook-dark.svg" class="h-50px mb-10"/>
    </router-link>
    <img src="/media/illustrations/18.png" alt="" class="mw-100 mb-10 h-lg-450px">
    <h1 class="fw-bold mb-10" style="color: #A3A3C7">Уууууупс. Страница не найдена!</h1>
    <router-link :to="{name: 'calendar'}" class="btn btn-primary">Вернутся на главную</router-link>
  </div>
</template>

<script>

export default {
  name: 'Error404'
}
</script>
