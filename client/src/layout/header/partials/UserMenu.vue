<template>
  <div
    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold py-4 fs-6 w-275px"
    data-bb-menu="true"
  >
    <div class="menu-item px-3">
      <div class="menu-content d-flex align-items-center px-3">
        <div class="symbol symbol-50px me-5">
          <img alt="Logo" src="/media/avatars/blank.png"/>
        </div>
        <div class="d-flex flex-column">
          <div class="fw-bolder d-flex align-items-center fs-5">
            {{ fullName }}
          </div>
          <a href="#" class="fw-bold text-muted text-hover-primary fs-7"
          >{{ email }}</a>
        </div>
      </div>
    </div>

    <div class="separator my-2"></div>

    <div class="menu-item px-5">
      <router-link to="/" class="menu-link px-5">
        Мой профиль
      </router-link>
    </div>
    <div class="menu-item px-5">
      <a @click="signOut" class="menu-link px-5">
        Выйти
      </a>
    </div>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'

export default {
  name: 'UserMenu',
  computed: {
    ...mapGetters('auth', ['user']),
    fullName() {
      return `${this.user.firstName} ${this.user.lastName}`
    },
    email() {
      return this.user.email
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch('auth/signout')
    }
  }

}
</script>

<style scoped>
.menu {
  position: fixed;
  top: 60px;
  right: 20px;
}
</style>
