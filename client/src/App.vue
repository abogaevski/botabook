<template>
  <router-view/>
</template>

<style lang="scss">
@import "~bootstrap-icons/font/bootstrap-icons.css";
@import "~element-plus/lib/theme-chalk/index.css";
@import '~flatpickr/dist/flatpickr.css';
@import "~sweetalert2/dist/sweetalert2.css";

// Main demo style scss
@import "assets/sass/plugins";
@import "assets/sass/style";
</style>
<script>
import EventBus from '@/core/EventBus'
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('userProfile', ['getUserProfile']),

    signout() {
      this.$store.dispatch('auth/signout')
      this.$router.push('/signin')
    }
  },
  mounted() {
    EventBus.on('signout', () => {
      this.signout();
    });
  },
  created() {
    this.getUserProfile()
      .then(() => {})
      .catch(() => EventBus.dispatch('signout'))
  },
  beforeUnmount() {
    EventBus.remove('signout');
  }
}
</script>
