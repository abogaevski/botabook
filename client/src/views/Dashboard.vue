<template>
  <div class="card">
    <div class="card-header">
      <h2 class="card-title fw-bolder">Встречи</h2>
      <div class="card-toolbar">
        <button class="btn btn-flex btn-primary">
          <span class="svg-icon svg-icon-2">
            <inline-svg src="/media/icons/duotone/Navigation/Plus.svg"></inline-svg>
          </span>
          Добавить событие
        </button>
      </div>
    </div>
    <div class="card-body">

    </div>
  </div>
</template>

<script>
import UserService from '@/core/services/user.service'
import EventBus from '@/core/EventBus';

export default {
  computed: {
  },
  // For tests only
  mounted() {
    UserService.getUserInfo().then(
      // If all is ok
      () => {},
      // If have an error
      () => {
        EventBus.dispatch('signout')
      }
    )
  }
}

</script>

<style scoped>

</style>
