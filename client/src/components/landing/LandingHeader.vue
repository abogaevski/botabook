<template>
  <div class="bgi-no-repeat bgi-size-contain bgi-position-x-center bgi-position-y-bottom landing-dark-bg">
    <landing-navbar />
    <landing-hero />
  </div>
</template>
<script>
import LandingNavbar from './header/LandingNavbar'
import LandingHero from './header/LandingHero'

export default {
  name: 'LandingHeader',
  components: { LandingNavbar, LandingHero }
}
</script>
