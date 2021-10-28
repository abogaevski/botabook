<template>
  <div class="landing-header" data-kt-sticky="true" data-kt-sticky-name="landing-header"
       data-bb-sticky-offset="{default: '200px', lg: '300px'}">
    <div class="container">
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center flex-equal">
          <a href="#">
            <img alt="Logo" src="/media/logos/botabook.svg"
                 class="logo-default h-30px h-lg-40px"/>
            <img alt="Logo" src="/media/logos/botabook-dark.svg" class="logo-sticky h-25px h-lg-30px"/>
          </a>
        </div>
        <div class="flex-equal text-end ms-1">
          <router-link to="/signin" class="btn btn-text-white">Войти</router-link>
          <router-link to="/signup" class="btn btn-success d-none d-md-inline-block">Зарегистрироваться</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingNavbar',
}
</script>
