<template>
  <div class="card mb-5 mb-xl-10">
    <div class="card-header cursor-pointer">
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Детали профиля</h3>
      </div>
      <router-link
        to="/profile/settings"
        class="btn btn-primary align-self-center"
      >Изменить профиль
      </router-link
      >
    </div>
    <div class="card-body p-9">
      <div class="row mb-7">
        <label class="col-lg-4 fw-bold text-muted">Полное имя</label>
        <div class="col-lg-8">
          <span class="fw-bolder fs-6 text-dark">{{ fullName }}</span>
        </div>
      </div>
      <div class="row mb-7">
        <label class="col-lg-4 fw-bold text-muted">Email адрес</label>
        <div class="col-lg-8 fv-row">
          <span class="fw-bold fs-6">{{ user.email }}</span>
        </div>
      </div>
      <div class="row mb-7">
        <label class="col-lg-4 fw-bold text-muted">Должность / специализация</label>
        <div class="col-lg-8 fv-row">
          <span class="fw-bolder fs-6">
            {{ user.profile.title || 'Не указано' }}
          </span>
        </div>
      </div>
      <div class="row mb-7">
        <label class="col-lg-4 fw-bold text-muted">Компания</label>
        <div class="col-lg-8 fv-row">
          <span class="fw-bold fs-6">
            {{ user.profile.company || 'Не указано'}}
          </span>
        </div>
      </div>
      <div class="row mb-7">
        <label class="col-lg-4 fw-bold text-muted">
          Телефон
          <i
            class="fas fa-exclamation-circle ms-1 fs-7"
            data-bs-toggle="tooltip"
            title="Phone number must be active"
          ></i>
        </label>
        <div class="col-lg-8 d-flex align-items-center">
          <span class="fw-bolder fs-6 me-2">
            {{ user.profile.phone || 'Не указано' }}
          </span>
        </div>
      </div>
      <div class="row mb-7">
        <label class="col-lg-4 fw-bold text-muted">Вебсайт</label>
        <div class="col-lg-8">
          <a href="#" class="fw-bold fs-6 text-dark text-hover-primary">
            {{ user.profile.website || 'Не указано' }}
          </a>
        </div>
      </div>
      <div class="row mb-7">
        <label class="col-lg-4 fw-bold text-muted">
          Местоположение
          <i
            class="fas fa-exclamation-circle ms-1 fs-7"
            data-bs-toggle="tooltip"
            title="Country of origination"
          ></i>
        </label>
        <div class="col-lg-8">
          <span class="fw-bolder fs-6 text-dark">
            {{ place }}
          </span>
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
          <span class="fw-bold fs-6 text-dark">
            Не указано
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProfileOverview',
  computed: {
    ...mapGetters('userProfile', ['user']),
    fullName() {
      return `${this.user.profile.firstName} ${this.user.profile.lastName}`
    },
    place() {
      return this.user.profile.city && this.user.profile.country
        ? `${this.user.profile.city}, ${this.user.profile.country}`
        : 'Не указано'
    }
  }
}
</script>
