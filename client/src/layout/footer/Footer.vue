<template>
  <div class="bg-white footer py-4 d-flex flex-lg-column">
    <div
      class="d-flex flex-column flex-md-row align-items-center justify-content-between container-fluid"
    >
      <div class="text-dark order-2 order-md-1">
        <span class="text-muted fw-bold me-1">2021&copy;</span>
        <router-link
          to="/"
          class="text-gray-800 text-hover-primary"
        >
          BotaBook
        </router-link>
      </div>
      <ul class="menu menu-gray-600 menu-hover-primary fw-bold order-1">
        <li class="menu-item">
          <router-link to="/" class="menu-link px-2">О BotaBook</router-link>
        </li>
        <li class="menu-item">
          <a href="#" @click.prevent="showModal" class="menu-link px-2">Связаться</a>
        </li>
        <li class="menu-item">
          <a target="_blank" href="https://t.me/botabookchat" class="menu-link px-2">Botabook Community</a>
        </li>
      </ul>
    </div>
  </div>
  <contact-modal
    :showModal="isActiveContactModal"
    @modal:close="closeModal"
  />
</template>
<script>
import ContactModal from '@/components/common/ContactModal'

export default {
  name: 'Footer',
  components: { ContactModal },
  emits: ['modal:show', 'modal:close'],
  data() {
    return {
      isActiveContactModal: false
    }
  },
  methods: {
    showModal() {
      this.isActiveContactModal = true
    },
    closeModal() {
      this.isActiveContactModal = false
    },
  }
}
</script>
