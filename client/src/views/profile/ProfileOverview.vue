<template>
  <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
    <div class="card-header cursor-pointer">
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Детали профиля</h3>
      </div>
      <router-link
        to="/profile/settings"
        class="btn btn-primary align-self-center"
      >Изменить профиль</router-link
      >
    </div>
    <div class="card-body p-9">
      <div class="row mb-7">
        <label class="col-lg-4 fw-bold text-muted">Полное имя</label>
        <div class="col-lg-8">
          <span class="fw-bolder fs-6 text-dark">Антон Богаевский</span>
        </div>
      </div>
      <div class="row mb-7">
        <label class="col-lg-4 fw-bold text-muted">Компания</label>
        <div class="col-lg-8 fv-row">
          <span class="fw-bold fs-6">BotaBook</span>
        </div>
      </div>
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-bold text-muted">
          Телефон
          <i
            class="fas fa-exclamation-circle ms-1 fs-7"
            data-bs-toggle="tooltip"
            title="Phone number must be active"
          ></i>
        </label>
        <div class="col-lg-8 d-flex align-items-center">
          <span class="fw-bolder fs-6 me-2">+995 587 042 792</span>
        </div>
      </div>
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-bold text-muted">Вебсайт</label>
        <div class="col-lg-8">
          <a href="#" class="fw-bold fs-6 text-dark text-hover-primary"
          >botabook.com</a
          >
        </div>
      </div>
      <div class="row mb-7">
        <label class="col-lg-4 fw-bold text-muted">
          Страна
          <i
            class="fas fa-exclamation-circle ms-1 fs-7"
            data-bs-toggle="tooltip"
            title="Country of origination"
          ></i>
        </label>
        <div class="col-lg-8">
          <span class="fw-bolder fs-6 text-dark">Georgia</span>
        </div>
      </div>
      <div class="row mb-7">
        <label class="col-lg-4 fw-bold text-muted">
          График работы
          <i
            class="fas fa-exclamation-circle ms-1 fs-7"
            data-bs-toggle="tooltip"
            title="Working hours"
          ></i>
        </label>
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">07:30 - 16:30</span>
        </div>
      </div>
    </div>
  </div>
</template>
