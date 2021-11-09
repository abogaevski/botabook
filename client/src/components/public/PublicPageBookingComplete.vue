<template>
  <div class="text-center pt-10 pb-5 mw-600px mx-auto">
    <h3 class="fs-2x fw-bolder mb-0">Поздравляем!</h3>
    <p class="text-gray-600 fs-4 fw-bold py-3">
      Ваша заявка на встречу успешно отправлена!
      <br/> {{ profile.firstName }} {{ profile.lastName }} в ближайшее время просмотрит заявку и подтвердит свое присутствие.
    </p>
    <div class="d-flex flex-column text-left border-top-dashed border-bottom-dashed border-2 border-gray-300 py-5">
      <div class="d-flex align-items-center mb-3">
        <div class="symbol symbol-25px w-25px bg-light me-5">
          <span class="symbol-label fw-bolder" :class="`bg-light-${project.color} text-${project.color}`">{{ projectInitial }}</span>
        </div>
        <div class="fs-5 fw-bolder text-gray-600">{{ project.title }}</div>
      </div>

      <div class="d-flex align-items-center mb-3">
          <span class="svg-icon svg-icon-2x svg-icon-muted me-5">
            <inline-svg src="/media/icons/duotone/Interface/Calendar.svg"></inline-svg>
          </span>
        <div class="fs-5">
          <span class="fw-bolder text-gray-600">{{ time }}</span>
        </div>
      </div>

      <div class="d-flex align-items-center mb-5">
          <span class="svg-icon svg-icon-2x svg-icon-muted me-5">
            <inline-svg src="/media/icons/duotone/Home/Earth.svg"></inline-svg>
          </span>
        <div class="fs-5">
          <span class="fw-bolder text-gray-600">{{ profile.timezone }}</span>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <div class="fs-5">
          <span class="fw-bolder text-gray-600">
            В ближайшее время Вам придет уведомление на email с подробностями!
          </span>
        </div>
      </div>
    </div>

    <h4 class="fw-bolder mb-0 pt-6">Понравился BotaBook?</h4>
    <router-link :to="{name: 'signup'}" class="btn btn-lg btn-primary fs-6 fw-bolder mt-5 px-8 py-4 text-uppercase">Попробуй сейчас!</router-link>
    <div class="text-center px-5 pt-10">
      <img class="mw-100 h-100px h-sm-200px" src="/media/illustrations/17.png" alt="">
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'

export default {
  name: 'PublicPageBookingComplete',
  props: ['eventDate', 'projectId'],
  setup(props) {
    const store = useStore()
    const project = computed(() => store.getters['project/projectById'](props.projectId))
    const projectInitial = computed(() => project.value.title.split('')[0])
    const profile = computed(() => store.getters['userProfile/user'])
    const time = `${moment(props.eventDate).format('DD MMM YYYY HH:mm')} -
    ${moment(props.eventDate).add(project.value.timeRange, 'minutes').format('HH:mm')}`

    return {
      project,
      profile,
      time,
      projectInitial
    }
  }
}
</script>
