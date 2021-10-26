<template>
  <loader v-if="loader" />
  <div class="page d-flex flex-row flex-column flex-column-fluid">
    <Aside />
    <div class="d-flex flex-column flex-row-fluid wrapper">
      <Header />
      <div class="content d-flex flex-column flex-column-fluid">
        <div class="post d-flex flex-column-fluid">
          <div class="container">
            <user-not-verified v-if="!user.isVerified" />
            <router-view />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import EventBus from '@/core/EventBus'
import { MenuComponent } from '@/core/components/MenuComponent'
import Loader from '@/components/Loader.vue'
import Aside from './aside/Aside.vue'
import Header from './header/Header.vue'
import Footer from './footer/Footer'
import UserNotVerified from '@/components/user/UserNotVerified'

export default {
  components: { Aside, Header, Loader, Footer, UserNotVerified },
  setup() {
    const router = useRouter()
    const store = useStore()
    const loader = computed(() => store.getters.loader)
    store.dispatch('userProfile/getUserProfile')
    store.dispatch('calendar/getEvents')
    store.dispatch('project/getProjects')
    store.dispatch('customerModule/getCustomers')
    store.dispatch('customerModule/getBoard')
    onMounted(async () => {
      MenuComponent.hideDropdowns(undefined)
      MenuComponent.reinitialization()
      EventBus.on('signout', () => {
        signout()
      })
    })
    const user = computed(() => store.getters['userProfile/user'])
    const signout = () => {
      store.dispatch('auth/signout')
      router.push('/signin')
    }
    watch(loader, (l) => {
      l ? document.body.classList.add('page-loading') : document.body.classList.remove('page-loading')
    })
    return {
      loader,
      user
    }
  }
}
</script>
