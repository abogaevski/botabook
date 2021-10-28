<template>
  <div class="landing-dark-bg pt-20">
    <div class="container">
      <div class="row py-10 py-lg-20">
        <div class="col-lg-6 pe-lg-16 mb-10 mb-lg-0">
          <div class="rounded landing-dark-border p-9 mb-10">
            <h2 class="text-white">Хотите расскажем подробнее?</h2>
            <span class="fw-normal fs-4 text-gray-700">Напишите нам на
              <a href="mailto:hello.botabook@gmail.com"
                     class="text-white opacity-50 text-hover-primary">
                hello.botabook@gmail.com
              </a>
            </span>
          </div>
          <div class="rounded landing-dark-border p-9">
            <h2 class="text-white">Как насчет оставить заявку?</h2>
            <span class="fw-normal fs-4 text-gray-700">Пишите нам что-угодно, мы все читаем🤓
              <br>
              <a
                href="#"
                @click.prevent="$emit('modal:show')"
                class="text-white opacity-50 text-hover-primary">
                Написать нам!
              </a>
            </span>
          </div>
        </div>
        <div class="col-lg-6 ps-lg-16">
          <div class="d-flex justify-content-center">
            <div class="d-flex fw-bold flex-column me-20">
              <h4 class="fw-bolder text-gray-400 mb-6">Больше о BotaBook</h4>
              <a target="_blank"
                 href="https://drive.google.com/file/d/1J_9y8SoW1tI57Cp_3zF9f6WYq_TAtUQE/view?usp=sharing"
                 class="text-white opacity-50 text-hover-primary fs-5 mb-6">Презентация</a>
              <a target="_blank"
                 href="https://docs.google.com/spreadsheets/d/1jmuW9nS2HWKnOnmRiee2XvrIa6kRBrHDVsHDSxBVEwM/edit?usp=sharing"
                 class="text-white opacity-50 text-hover-primary fs-5 mb-6">Анализ конкурентов</a>
              <a target="_blank"
                 href="https://docs.google.com/document/d/1_Taj5LMp8Ehg531zoqhFWI6wy6-YhPm7-cyw1UwBvdg/edit?usp=sharing"
                 class="text-white opacity-50 text-hover-primary fs-5 mb-6">Стратегия</a>
            </div>
            <div class="d-flex fw-bold flex-column ms-lg-20">
              <h4 class="fw-bolder text-gray-400 mb-6">И ещё больше</h4>
              <a target="_blank" href="https://t.me/botabook" class="mb-6">
                <img src="/media/svg/brand-logos/telegram.svg" class="h-20px me-2" alt=""/>
                <span class="text-white opacity-50 text-hover-primary fs-5 mb-6">Паблик Telegram</span>
              </a>
              <a target="_blank" href="https://t.me/botabookchat" class="mb-6">
                <img src="/media/svg/brand-logos/telegram.svg" class="h-20px me-2" alt=""/>
                <span class="text-white opacity-50 text-hover-primary fs-5 mb-6">Botabook Community</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="landing-dark-separator"></div>
    <div class="container">
      <div class="d-flex flex-column flex-md-row flex-stack py-7 py-lg-10">
        <div class="d-flex align-items-center order-2 order-md-1">
          <a href="#">
            <img alt="Logo" src="/media/logos/botabook-dark.svg" class="h-15px h-md-20px"/>
          </a>
          <span class="mx-5 fs-6 fw-bold text-gray-600 pt-1" href="#" data-bs-toggle="modal"
                data-bs-target="#modal_contact">© 2021 botabook.com</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LandingFooter'
}
</script>
