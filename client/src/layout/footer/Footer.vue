<template>
  <div class="bg-white footer py-4 d-flex flex-lg-column">
    <div
      class="d-flex flex-column flex-md-row align-items-center justify-content-between container-fluid"
    >
      <div class="text-dark order-2 order-md-1">
        <span class="text-muted fw-bold me-1">2021&copy;</span>
        <a
          href="http://botabook.com/"
          target="_blank"
          class="text-gray-800 text-hover-primary"
        >
          BotaBook
        </a>
      </div>
      <ul class="menu menu-gray-600 menu-hover-primary fw-bold order-1">
        <li class="menu-item">
          <a href="#" target="_blank" class="menu-link px-2">О BotaBook</a>
        </li>

        <li class="menu-item">
          <a href="#" target="_blank" class="menu-link px-2">Поддержка</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Footer',
}
</script>
