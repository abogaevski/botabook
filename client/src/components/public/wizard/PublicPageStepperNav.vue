<template>
  <div class="d-none d-md-flex stepper-nav py-2">
    <div class="stepper-item current me-5 me-lg-3 me-xl-10" data-bb-stepper-element="nav">
      <h3 class="stepper-title">Выберите услугу</h3>
    </div>
    <div class="stepper-item me-5 me-lg-3 me-xl-10" data-bb-stepper-element="nav">
      <h3 class="stepper-title">Выберите дату и время</h3>
    </div>
    <div class="stepper-item me-5 me-lg-3 me-xl-10" data-bb-stepper-element="nav">
      <h3 class="stepper-title">Последний шаг</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PublicPageStepperNav'
}
</script>
