<template>
  <div class="card">
    <div class="card-body">
      <div class="card-px text-center pt-20 pb-12">
        <h2 class="fs-2x fw-bolder">Возвращайтесь позже:)</h2>
        <p class="text-gray-400 fs-4 fw-bold py-7">Ой... У вас пока нет клиентов.
          <br>Они появятся сразу после того, как к вам запишутся на встречу.
          <br>Если вас это утешит, можете создать еще одну продаваемую услугу!
        </p>
        <router-link
          to="/projects"
          class="btn btn-primary er fs-6 px-8 py-4"
        >Добавить еще услугу</router-link>
      </div>
      <div class="text-center px-5">
        <img src="/media/illustrations/user-welcome.png" alt="" class="mw-100 h-200px h-sm-325px">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CustomerNoData'
}
</script>
