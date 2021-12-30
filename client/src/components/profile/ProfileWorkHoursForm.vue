<template>
  <div class="card mb-5 mb-xl-10">
    <div class="card-header border-0 cursor-pointer p-4 p-sm-9 p-lg-4 px-xl-9">
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Настройки графика работы</h3>
      </div>
      <div class="card-toolbar">
        <span v-if="isSaved" class="fw-bold">
          <span class="fw-bolder me-4 text-primary">
            <span class="spinner-border spinner-border-sm align-middle"></span>
          </span>
          Настройки сохранены
        </span>
      </div>
    </div>
    <div class="collapse show">
      <profile-work-hours-list :work-hours="workHours" :profileId="profileId" @wh-saved="showSaveMessage" />
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import ProfileWorkHoursList from '@/components/profile/ProfileWorkHoursList'

export default {
  name: 'ProfileWorkHoursForm',
  components: { ProfileWorkHoursList },
  setup() {
    const store = useStore()
    const profileId = computed(() => store.getters['userProfile/id'])
    const workHours = computed(() => store.getters['userProfile/workHours'])
    const isSaved = ref(false)
    const showSaveMessage = () => {
      isSaved.value = true
      setTimeout(() => {
        isSaved.value = false
      }, 1000)
    }
    return {
      workHours,
      profileId,
      isSaved,
      showSaveMessage
    }
  }
}
</script>
