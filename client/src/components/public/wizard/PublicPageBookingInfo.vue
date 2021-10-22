<template>
  <div class="alert alert-dismissible bg-light-primary d-flex flex-column flex-sm-row p-5 mb-10">
    <span class="svg-icon svg-icon-2hx svg-icon-primary me-4 mb-5 mb-sm-0">
      <inline-svg src="/media/icons/duotone/General/Notification2.svg" />
    </span>
    <div class="d-flex flex-column pe-0 pe-sm-10">
      <h4 class="fw-bold">Поздравляем!</h4>
      <span>
        Вы уже бронировали запись на <strong>{{ time }}</strong>
          <br>Если вы хотите записаться еще раз, пожалуйста, укажите данные ниже.
      </span>
    </div>
    <bt-button
      type="button"
      data-bs-dismiss="alert"
      btn-class="position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto"
      @click:btn="$emit('alert:close')"
      icon-class="svg-icon svg-icon-1 svg-icon-primary"
      icon-url="/media/icons/duotone/Navigation/Close.svg"
    />
  </div>
</template>
<script>
import BtButton from '@/components/_core/buttons/BtButton'

export default {
  name: 'PublicPageBookingInfo',
  props: ['time'],
  components: { BtButton },
}
</script>
