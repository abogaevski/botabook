<template>
  <div class="card mb-5 mb-xl-10">
    <div class="card-body pt-9 pb-0">
      <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
        <div class="me-7 mb-4">
          <div class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
            <img :src="user.profile.avatar" :alt="fullName" />
          </div>
        </div>
        <div class="flex-grow-1">
          <div
            class="d-flex justify-content-between align-items-start flex-wrap mb-2"
          >
            <div class="d-flex flex-column">
              <div class="d-flex align-items-center mb-2">
                <a
                  href="#"
                  class="text-gray-800 text-hover-primary fs-2 fw-bolder me-1"
                >{{ fullName }}</a
                >
                <a href="#">
                  <span class="svg-icon svg-icon-1 svg-icon-primary">
                    <inline-svg src="/media/icons/duotone/Design/Verified.svg" />
                  </span>
                </a>
              </div>
              <div class="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                <a
                  v-if="user.profile.title"
                  href="#"
                  class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                >
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg src="/media/icons/duotone/General/User.svg" />
                  </span>
                  {{ user.profile.title }}
                </a>
                <a
                  v-if="place"
                  href="#"
                  class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                >
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg src="/media/icons/duotone/Map/Marker1.svg" />
                  </span>
                  {{ place }}
                </a>
                <a
                  href="#"
                  class="d-flex align-items-center text-gray-400 text-hover-primary mb-2"
                >
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg
                      src="/media/icons/duotone/Communication/Mail-at.svg"
                    />
                  </span>
                  {{ user.email }}
                </a>
              </div>
            </div>
<!--            <div class="d-flex my-4">-->
<!--              <a-->
<!--                href="#"-->
<!--                class="btn btn-sm btn-primary me-3"-->
<!--                data-bs-toggle="modal"-->
<!--                data-bs-target="#kt_modal_offer_a_deal"-->
<!--              >Что тут делать?</a>-->
<!--            </div>-->
          </div>
        </div>
      </div>

      <div class="d-flex overflow-auto h-55px">
        <ul
          class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap"
        >
          <li class="nav-item">
            <router-link
              to="/profile/overview"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              Подробнее
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/profile/settings"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              Настройки
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>
<script>

import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  computed: {
    ...mapGetters('userProfile', ['user']),
    fullName() {
      return `${this.user.profile.firstName} ${this.user.profile.lastName}`
    },
    place() {
      return this.user.profile.city && this.user.profile.country
        ? `${this.user.profile.city}, ${this.user.profile.country}`
        : ''
    }
  }
}
</script>
