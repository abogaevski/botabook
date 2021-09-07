<template>
  <div class="card mb-5 mb-xl-10">
    <div class="card-body pt-9 pb-0">
      <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
        <div class="me-7 mb-4">
          <div
            class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative"
          >
            <img src="/media/avatars/blank.png" alt="image" />
<!--            <div-->
<!--              class="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px"-->
<!--            >-->
<!--            </div>-->
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
                >Антон Богаевский</a
                >
                <a href="#">
                  <span class="svg-icon svg-icon-1 svg-icon-primary">
                    <inline-svg src="/media/icons/duotone/Design/Verified.svg" />
                  </span>
                </a>
              </div>
              <div class="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                <a
                  href="#"
                  class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                >
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg src="/media/icons/duotone/General/User.svg" />
                  </span>
                  Разработчик
                </a>
                <a
                  href="#"
                  class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                >
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg src="/media/icons/duotone/Map/Marker1.svg" />
                  </span>
                  Batumi, Georgia
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
                  anton.bahayeuski@botabook.com
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
