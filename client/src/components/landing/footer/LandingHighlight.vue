<template>
  <div class="container">
    <div
      class="footer-highlight d-flex flex-stack flex-wrap flex-md-nowrap card-rounded shadow p-8 p-lg-12 mb-n5 mb-lg-n13"
      style="background: linear-gradient(90deg, #00D076 0%, #30A3E6 120%);">
      <div class="my-2 me-5">
        <div class="fs-1 fs-lg-2qx fw-bolder text-white mb-2">Понравился BotaBook?
          <span class="fw-normal">Попробуйте прямо сейчас!</span></div>
        <div class="fs-6 fs-lg-5 text-white fw-bold opacity-75">
          А также мы сейчас в поиске потенциальных инвесторов, бизнес-консультантов и супер-специалистов в команду.
          Присоединяйтесь к BotaBook!
        </div>
      </div>
      <router-link
        to="signup"
        class="btn btn-lg btn-outline border-2 btn-outline-white flex-shrink-0 my-2"
      >
        Попробовать сейчас!
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LandingHighlight'
}
</script>
