<template>
  <div class="card">
    <div class="card-body">
      <div class="card-px text-center pt-20 pb-12">
        <h2 class="fs-2x fw-bolder">Создайте вашу первую услугу</h2>
        <p class="text-gray-400 fs-4 fw-bold py-7">Ой... У вас пока нет услуг.
          <br>Нажмите на кнопку ниже, чтобы создать Вашу первую услугу!</p>
        <button
          class="btn btn-primary er fs-6 px-8 py-4"
          @click="$emit('modal:show')"
        >Создать услугу</button>
      </div>
      <div class="text-center px-5">
        <img src="/media/illustrations/user-welcome.png" alt="" class="mw-100 h-200px h-sm-325px">
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'ProjectNoData',
  props: ['isActiveCreateModal']
}
</script>
