<template>
  <div class="row">
    <div class="col-md-6">
      <div class="card mb-7">
        <div class="card-header border-0 pt-5">
          <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bolder fs-3 mb-1">Количество пользователей</span>
          </h3>
        </div>
        <div class="card-body">
          <h1 style="background: linear-gradient(to right, #00D076 0%, #30A3E6 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
            {{ counters.users }}
          </h1>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card">
        <div class="card-header border-0 pt-5">
          <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bolder fs-3 mb-1">Количество встреч</span>
            <span class="text-muted fw-bold fs-7">Не учитывая отмененные</span>

          </h3>
        </div>
        <div class="card-body">
          <h1 style="background: linear-gradient(to right, #00D076 0%, #30A3E6 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
            {{ counters.events }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'AdminCounter',
  setup() {
    const store = useStore()
    store.dispatch('adminModule/getCounters')
    store.dispatch('setTitle', 'Циферки 🍺')
    const counters = computed(() => store.getters['adminModule/counters'])
    return { counters }
  }
}
</script>
<style scoped lang="scss">
  h1 {
    font-size: 80px;
    text-align: center;
    span {
      font-size: .5em;
    }
  }
</style>
