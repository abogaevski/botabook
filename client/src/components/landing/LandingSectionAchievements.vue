<template>
  <div class="container">
    <div class="text-center" id="achievements">
      <h3 class="fs-2hx text-white fw-bolder mb-5">Мы хотим сделать простые вещи действительно
        простыми</h3>
      <div class="fs-5 text-gray-700 fw-bold">Изучив гипотезу, как предприниматели и фрилансеры следят за
        своими встречами,
        <br>мы пришли к выводу в острой необходимости нашей идеи для Вас!
      </div>
    </div>
    <div class="text-center my-10">
      <router-link to="/signup" class="btn btn-primary">Попробовать сейчас!</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingSectionAchievements'
}
</script>
