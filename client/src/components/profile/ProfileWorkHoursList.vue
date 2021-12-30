<template>
    <div class="card-body border-top p-4 p-sm-9 p-lg-4 px-xl-9 pb-xl-0">
      <div class="row mb-3 mb-lg-6">
        <label class="fs-5 fw-bold mb-4">График работы</label>
        <template v-for="wh in workHours" :key="wh.day">
          <profile-work-hours-item :wh="wh" :profileId="profileId" @wh-saved="$emit('wh-saved')" />
        </template>
      </div>
    </div>
</template>
<script>
import ProfileWorkHoursItem from './ProfileWorkHoursItem'

export default {
  name: 'ProfileWorkHoursList',
  components: { ProfileWorkHoursItem },
  props: {
    workHours: {
      required: true,
      type: Array
    },
    profileId: {
      required: true,
    }
  }
}
</script>
