<template>
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
import { useRoute, useRouter } from 'vue-router'
import EventBus from '@/core/EventBus'
import { MenuComponent } from '@/core/components/MenuComponent'
import { DrawerComponent } from '@/core/_utils/_DrawerComponent'
import Aside from './aside/Aside.vue'
import Header from './header/Header.vue'
import Footer from './footer/Footer'
import UserNotVerified from '@/components/user/UserNotVerified'

export default {
  components: { Aside, Header, Footer, UserNotVerified },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const loader = computed(() => store.getters.loader)
    store.dispatch('retrieveUserData')
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
    document.body.classList.add('header-fixed', 'header-tablet-and-mobile-fixed', 'aside-enabled', 'aside-fixed')

    DrawerComponent.bootstrap();
    DrawerComponent.updateAll();

    watch(() => route.path, () => {
      MenuComponent.hideDropdowns(undefined);
      DrawerComponent.hideAll();
    })
    return {
      loader,
      user
    }
  }
}
</script>
