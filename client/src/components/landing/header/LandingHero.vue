<template>
  <div class="d-flex flex-column flex-center w-100 min-h-350px min-h-lg-500px px-9">
    <div class="text-center mb-5 mb-lg-10 py-10 py-lg-20">
      <h1 class="text-white lh-base fw-bolder fs-2x fs-lg-3x mb-15">Пусть все Ваши встречи
        <br/>запоминает
        <span style="background: linear-gradient(to right, #00D076 0%, #30A3E6 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
          <span id="kt_landing_hero_text">BotaBook</span>
        </span>
      </h1>
      <router-link :to="{name: 'signup'}" class="btn btn-primary">Попробовать сейчас!</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LandingHero'
}
</script>
