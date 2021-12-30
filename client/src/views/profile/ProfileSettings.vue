<template>
  <profile-info-form />
  <profile-work-hours-form />
</template>
<script>
import ProfileInfoForm from '@/components/profile/ProfileInfoForm'
import ProfileWorkHoursForm from '@/components/profile/ProfileWorkHoursForm'

export default {
  name: 'ProfileSettings',
  components: { ProfileInfoForm, ProfileWorkHoursForm }
}
</script>
