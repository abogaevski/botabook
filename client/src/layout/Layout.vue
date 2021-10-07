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
      <Footer />
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
import Footer from './footer/Footer'

export default {
  components: {
    Aside, Header, Loader, Footer
  },
  mounted() {
    MenuComponent.hideDropdowns(undefined)
    MenuComponent.reinitialization()

    EventBus.on('signout', () => {
      this.signout()
    })
  },

  async created() {
    await this.getProfile()
      .then(() => {
      })
      .catch(() => EventBus.dispatch('signout'))
    await this.getEvents()
    await this.getProjects()
    await this.getCustomers()
      .then(() => {
        document.body.classList.remove('page-loading')
      })
  },

  methods: {
    ...mapActions({
      getEvents: 'calendar/getEvents',
      getProfile: 'userProfile/getUserProfile',
      getProjects: 'project/getProjects',
      getCustomers: 'customerModule/getCustomers'
    }),

    signout() {
      this.$store.dispatch('auth/signout')
      this.$router.push('/signin')
    }
  }
}
</script>
