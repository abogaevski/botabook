<template>
  <!--  Loader -->
  <loader></loader>
  <div class="page d-flex flex-row flex-column flex-column-fluid">
    <Aside></Aside>
    <div class="d-flex flex-column flex-row-fluid wrapper">
      <Header></Header>
      <div class="content d-flex flex-column flex-column-fluid">
        <div class="post d-flex flex-column-fluid">
          <div class="container">
            <router-view></router-view>
          </div>
        </div>
      </div>
      <!--    Footer    -->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import EventBus from '@/core/EventBus'

import { MenuComponent } from '@/core/components/MenuComponent'
import Loader from '@/components/Loader.vue'
import Aside from './aside/Aside.vue'
import Header from './header/Header.vue'

export default {
  components: {
    Aside, Header, Loader
  },
  mounted() {
    setTimeout(() => {
      // Remove page loader after some time
      // store.dispatch(Actions.REMOVE_BODY_CLASSNAME, "page-loading");
      // TODO: Loader with store (just change the page-loading class in the body)
      document.body.classList.remove('page-loading')
    }, 500)
    MenuComponent.hideDropdowns(undefined)
    MenuComponent.reinitialization()

    EventBus.on('signout', () => {
      this.signout()
    })
  },

  created() {
    this.getUserProfile()
      .then(() => {
      })
      .catch(() => EventBus.dispatch('signout'))
  },

  methods: {
    ...mapActions('userProfile', ['getUserProfile']),

    signout() {
      this.$store.dispatch('auth/signout')
      this.$router.push('/signin')
    },
  },

  // beforeUnmount() {
  //   EventBus.remove('signout')
  // }
}

</script>

<style>

</style>
