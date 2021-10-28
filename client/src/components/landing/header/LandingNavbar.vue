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
<!--        <div class="d-lg-block" id="kt_header_nav_wrapper">-->
<!--          <div-->
<!--            class="d-lg-block p-5 p-lg-0"-->
<!--            data-bb-drawer="true"-->
<!--            data-bb-drawer-name="landing-menu"-->
<!--            data-bb-drawer-activate="{default: true, lg: false}"-->
<!--            data-bb-drawer-overlay="true"-->
<!--            data-bb-drawer-width="200px"-->
<!--            data-bb-drawer-direction="start"-->
<!--            data-bb-drawer-toggle="#landing_menu_toggle"-->
<!--          >-->
<!--            <div class="menu menu-column flex-nowrap menu-rounded menu-lg-row menu-title-gray-500 menu-state-title-primary nav nav-flush fs-5 fw-bold"-->
<!--                 id="landing_menu">-->
<!--              <div class="menu-item">-->
<!--                <router-link class="menu-link nav-link py-3 px-4 px-xxl-6" to="/doc"-->
<!--                   data-bb-drawer-dismiss="true">-->
<!--                  Документация-->
<!--                </router-link>-->
<!--              </div>-->
<!--              <div class="menu-item">-->
<!--                <a class="menu-link nav-link py-3 px-4 px-xxl-6" href="#achievements"-->
<!--                   data-bb-drawer-dismiss="true">Контакты</a>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
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
