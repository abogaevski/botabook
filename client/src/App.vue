<template>
  <router-view/>
</template>

<style lang="scss">
@import "~element-plus/lib/theme-chalk/index.css";
@import '~flatpickr/dist/flatpickr.css';
@import "~sweetalert2/dist/sweetalert2.css";

// Main demo style scss
@import "assets/sass/plugins";
@import "assets/sass/style";
</style>
<script>
import EventBus from '@/core/EventBus'

export default {
  methods: {
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
  beforeUnmount() {
    EventBus.remove('signout');
  }
}
</script>
