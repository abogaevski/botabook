<template>
  <div class="card">
    <div class="card-body">
      <div class="card-px text-center pb-5" :class="[isLarge ? 'pt-15' : 'pt-5']">
        <h2 :class="[isLarge ? 'fs-2x' : 'fs-1']" class="fw-bolder mb-0">{{ header }}</h2>
        <p :class="[isLarge ? 'fs-4 py-7' : 'fs-6 py-3']" class="text-gray-500 fw-bold" v-html="content"></p>
      </div>
      <div class="text-center px-5">
        <img
          :class="[isLarge ? 'h-200px h-sm-325px' : 'h-100px h-sm-200px']"
          class="mw-100"
          src="/media/illustrations/15.png"
          alt=""
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NoData',
  props: {
    header: {
      required: false,
      type: String,
      default: 'Нет никаких данных'
    },
    content: {
      required: false,
      type: String,
      default: 'Пока что нет никаких данных для отображения. Возвращайтесь позже!'
    },
    isLarge: {
      required: false,
      type: Boolean,
      default: false
    }
  }
}
</script>
