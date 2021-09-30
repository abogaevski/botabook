<template>
  <div class="pt-xl-20 content d-flex flex-column flex-column-fluid">
    <div class="d-flex flex-column-fluid">
      <div class="container-xxl">
        <div class="d-flex flex-column flex-xl-row">
          <public-profile-overview/>
          <public-profile-booking-wizard/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PublicProfileOverview from '@/components/public/PublicProfileOverview'
import PublicProfileBookingWizard from '@/components/public/PublicProfileBookingWizard'

export default {
  components: { PublicProfileOverview, PublicProfileBookingWizard }
}
</script>
