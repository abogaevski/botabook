<template>
  <div class="d-flex flex-column flex-column-fluid">
    <div class="d-flex flex-column flex-column-fluid text-center p-10 py-lg-20">
      <a href="#" class="mb-10 pt-lg-20">
        <img alt="Logo" src="media/logos/botabook-dark.svg" class="h-50px mb-5" />
      </a>

      <div class="pt-lg-10">
        <h1 class="fw-bolder fs-4x text-gray-700 mb-10">Упс... Ошибка 500</h1>

        <div class="fw-bold fs-3 text-gray-400 mb-15">
          Что-то пошло не так! <br />
          Попробуйте позже.
        </div>
        <!--end::Message-->

        <!--begin::Action-->
        <div class="text-center">
          <router-link to="/" class="btn btn-lg btn-primary fw-bolder"
          >На главную</router-link
          >
        </div>
        <!--end::Action-->
      </div>
      <!--end::Wrapper-->
    </div>
    <!--end::Content-->

    <!--begin::Footer-->
    <div class="d-flex flex-center flex-column-auto p-10">
      <!--begin::Links-->
      <div class="d-flex align-items-center fw-bold fs-6">
        <a href="#" class="text-muted text-hover-primary px-2">About</a>

        <a href="#" class="text-muted text-hover-primary px-2">Contact</a>

        <a href="#" class="text-muted text-hover-primary px-2">Contact Us</a>
      </div>
      <!--end::Links-->
    </div>
    <!--end::Footer-->
  </div>
</template>

<script>
export default {
  name: 'error-500',
  components: {}
}
</script>
