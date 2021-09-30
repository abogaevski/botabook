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
                  class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                >
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg
                      src="/media/icons/duotone/Communication/Mail-at.svg"
                    />
                  </span>
                  {{ user.email }}
                </a>
                <a
                  v-if="slug"
                  :href="slug"
                  class="d-flex align-items-center text-gray-400 text-hover-primary mb-2"
                >
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg
                      src="/media/icons/duotone/Interface/Grid-Vetical.svg"
                    />
                  </span>
                  {{ slug }}
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
          <div class="d-flex flex-wrap flex-stack">
            <div class="d-flex flex-column flex-grow-1 pe-8">
              <div class="d-flex flex-wrap">

                <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                  <div class="d-flex align-items-center">
                    <span
                      class="svg-icon svg-icon-3 me-2"
                      :class="getSvgIconColor(projectCount)"
                    >
                      <inline-svg src="/media/icons/duotone/General/Settings-2.svg" />
                    </span>
                    <div
                      class="fs-2 fw-bolder counted">
                      {{ projectCount }}
                    </div>
                  </div>
                  <div class="fw-bold fs-6 text-gray-400">Услуг всего</div>
                </div>

                <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                  <div class="d-flex align-items-center">
                    <span
                      class="svg-icon svg-icon-3 me-2"
                      :class="getSvgIconColor(eventCount)"
                    >
                      <inline-svg src="/media/icons/duotone/Interface/Calendar.svg" />
                    </span>
                    <div
                      class="fs-2 fw-bolder counted">
                      {{ eventCount }}
                    </div>
                  </div>
                  <div class="fw-bold fs-6 text-gray-400">Встреч всего</div>
                </div>

                <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                  <div class="d-flex align-items-center">
                    <span
                      class="svg-icon svg-icon-3 me-2"
                      :class="getSvgIconColor(customerCount)"
                    >
                      <inline-svg src="/media/icons/duotone/Communication/Group.svg" />
                    </span>
                    <div
                      class="fs-2 fw-bolder counted">
                      {{ customerCount }}
                    </div>
                  </div>
                  <div class="fw-bold fs-6 text-gray-400">Клиентов всего</div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex overflow-auto h-55px">
        <ul class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap">
          <li class="nav-item">
            <router-link
              to="/profile/settings"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              Основные
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
    ...mapGetters({
      user: 'userProfile/user',
      projectCount: 'project/projectCount',
      eventCount: 'calendar/eventCount',
      customerCount: 'customerModule/customerCount'
    }),
    fullName() {
      return `${this.user.profile.firstName} ${this.user.profile.lastName}`
    },
    place() {
      return this.user.profile.city && this.user.profile.country
        ? `${this.user.profile.city}, ${this.user.profile.country}`
        : ''
    },
    slug() {
      return `${window.location.origin}/${this.user.profile.slug}` || ''
    },
  },
  methods: {
    getSvgIconColor(counter) {
      return counter ? 'svg-icon-success' : 'svg-icon-danger'
    }
  }
}
</script>
