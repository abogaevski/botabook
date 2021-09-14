<template>
  <div class="card border border-2 border-gray-300 border-hover">
    <div class="card-header border-0 pt-9">
      <div class="card-title m-0">
        <div class="symbol symbol-50px w-50px bg-light">
          <span
            class="bg-light text-inverse-light symbol-label fw-bolder"
          >
            {{ getInitials }}
          </span>
        </div>
      </div>
      <div class="card-toolbar">
        <span
          :class="`badge-${getStatusDataColor}`"
          class="badge fw-bolder me-auto px-4 py-3"
        >
          {{ getStatus }}
        </span>
      </div>
    </div>
    <div class="card-body p-9">
      <div class="fs-3 fw-bolder text-dark">
        {{ title }}
      </div>
      <p class="text-gray-400 fw-bold fs-5 mt-1 mb-7">
        {{ description }}
      </p>

      <div class="d-flex flex-wrap mb-5">
        <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3">
          <div class="fs-6 text-gray-800 fw-bolder">{{ timeRange }} мин.</div>
          <div class="fw-bold text-gray-400">Длительность</div>
        </div>

        <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mb-3">
          <div class="fs-6 text-gray-800 fw-bolder">{{ price }}</div>
          <div class="fw-bold text-gray-400">Стоимость</div>
        </div>
      </div>
      <!--      <template v-if="service.customers">-->
      <!--        <div class="symbol-group symbol-hover">-->
      <!--          <template v-for="(user, index) in service.customers" :key="index">-->
      <!--            <div-->
      <!--              class="symbol symbol-35px symbol-circle"-->
      <!--              data-bs-toggle="tooltip"-->
      <!--              :title="user.title"-->
      <!--            >-->
      <!--              <img v-if="user.src" alt="Pic" :src="user.src" />-->
      <!--              <span-->
      <!--                v-else-->
      <!--                class="symbol-label fw-bolder"-->
      <!--                :class="`bg-${user.state} text-inverse-${user.state}`"-->
      <!--              >{{ user.initials }}</span-->
      <!--              >-->
      <!--            </div>-->
      <!--            &lt;!&ndash;begin::User&ndash;&gt;-->
      <!--          </template>-->
      <!--        </div>-->
      <!--        &lt;!&ndash;end::Users&ndash;&gt;-->
      <!--      </template>-->
    </div>
  </div>
</template>
<script>

export default {
  name: 'ServiceCard',
  props: {
    title: String,
    description: String,
    timeRange: Number,
    price: String,
    isActive: Boolean
  },
  computed: {
    getStatusDataColor() {
      return this.isActive ? 'light-success' : 'light'
    },
    getStatus() {
      return this.isActive ? 'Активен' : 'Неактивен'
    },
    getInitials() {
      return this.title.split('')[0].toUpperCase()
    }
  }
}
</script>
