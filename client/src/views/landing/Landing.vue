<template>
  <div class="d-flex flex-column flex-root">
    <div class="mb-0" id="home">
      <landing-header/>
      <landing-curve-bottom/>
    </div>
    <div class="mb-10 z-index-2">
      <landing-section-how-it-works />
    </div>
    <div class="">
      <div class="pb-15 pt-18 landing-dark-bg">
        <landing-section-achievements />
      </div>
    </div>
    <div class="py-10 py-lg-20">
      <landing-section-team />
    </div>
    <div class="mt-lg-15 mt-0 mb-n20 position-relative z-index-2">
      <landing-highlight />
    </div>
    <div class="mb-0">
      <landing-curve-top />
      <landing-footer @modal:show="showModal" />
    </div>
  </div>
  <contact-modal
    :showModal="isActiveContactModal"
    @modal:close="closeModal"
  />
</template>
<script>
import { ref } from 'vue'
import LandingHeader from '@/components/landing/LandingHeader'
import LandingCurveBottom from '@/components/landing/_core/LandingCurveBottom'
import LandingCurveTop from '@/components/landing/_core/LandingCurveTop'
import LandingSectionHowItWorks from '@/components/landing/LandingSectionHowItWorks'
import LandingSectionAchievements from '@/components/landing/LandingSectionAchievements'
import LandingSectionTeam from '@/components/landing/LandingSectionTeam'
import LandingHighlight from '@/components/landing/footer/LandingHighlight'
import LandingFooter from '@/components/landing/footer/LandingFooter'
import ContactModal from '@/components/common/ContactModal'

export default {
  name: 'Landing',
  components: {
    LandingHeader,
    LandingCurveBottom,
    LandingCurveTop,
    LandingSectionHowItWorks,
    LandingSectionAchievements,
    LandingSectionTeam,
    LandingHighlight,
    LandingFooter,
    ContactModal
  },
  emits: ['modal:show', 'modal:close'],
  setup() {
    const isActiveContactModal = ref(false)
    const showModal = () => isActiveContactModal.value = true
    const closeModal = () => isActiveContactModal.value = false
    return {
      isActiveContactModal,
      showModal,
      closeModal
    }
  }
}
</script>
