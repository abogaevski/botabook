<template>
  <div
    id="bb-aside-menu-wrapper"
    data-bb-scroll="true"
    data-bb-scroll-activate="{default: false, lg: true}"
    data-bb-scroll-height="auto"
    data-bb-scroll-dependencies="#bb_aside_logo, #bb_aside_footer"
    data-bb-scroll-wrappers="#bb_aside_menu"
    data-bb-scroll-offset="0"
    class="hover-scroll-overlay-y my-lg-5">
    <div
      id="bb_aside_menu"
      class="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500"
      data-bb-menu="true"
    >
<!--      <menu-link-->
<!--        icon="/media/icons/duotune/abstract/abs027.svg"-->
<!--        route="/dashboard"-->
<!--        heading="Рабочий стол"-->
<!--      />-->
      <menu-link
        icon="/media/icons/duotune/general/gen014.svg"
        route="/calendar"
        heading="Календарь"
        :badge-content="newEvents.length"
        tooltip-content="У вас новая встреча"
      />
      <menu-link
        icon="/media/icons/duotune/ecommerce/ecm002.svg"
        route="/customers"
        heading="Клиенты"
      />
      <menu-dropdown
        v-if="projects.length >= 1"
        icon="/media/icons/duotune/finance/fin006.svg"
        heading="Услуги"
        route="project"
        :links="projectUrls"
      />
      <menu-link
        v-else
        icon="/media/icons/duotune/finance/fin006.svg"
        heading="Создать услугу"
        route="/project/create"
      />
      <menu-section-title>Настройки</menu-section-title>
      <menu-link
        icon="/media/icons/duotune/communication/com013.svg"
        heading="Профиль"
        route="/profile"
      />
      <menu-link
        icon="/media/icons/duotune/abstract/abs026.svg"
        heading="Интеграции"
        route="/"
        :disabled="true"
        badge-content="уже скоро😉"

      />
      <!--      <template v-if="user">-->
<!--        <div v-if="user.isSuperuser">-->
<!--          <div class="menu-item">-->
<!--            <div class="menu-content pt-8 pb-2">-->
<!--              <span class="menu-section text-muted text-uppercase fs-8 ls-1">Типа админ</span>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="menu-item">-->
<!--            <router-link v-slot="{ href, navigate, isActive, isExactActive }" to="/admin/counter">-->
<!--              <a :class="[isActive && 'active', isExactActive && 'active']" :href="href" class="menu-link" @click="navigate">-->
<!--              <span class="menu-icon">-->
<!--                <span class="svg-icon svg-icon-2">-->
<!--                  <inline-svg src="/media/icons/duotone/Food/Beer.svg"/>-->
<!--                </span>-->
<!--              </span>-->
<!--                <span class="menu-title">-->
<!--                Счетчики-->
<!--              </span>-->
<!--              </a>-->
<!--            </router-link>-->
<!--          </div>-->
<!--        </div>-->
<!--      </template>-->
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { ScrollComponent } from '@/core/components/_ScrollComponent'
import MenuLink from './components/MenuLink'
import MenuDropdown from './components/MenuDropdown'
import MenuSectionTitle from './components/MenuSectionTitle'

export default {
  name: 'AsideMenu',
  components: { MenuDropdown, MenuLink, MenuSectionTitle },
  setup() {
    const store = useStore()
    const projects = computed(() => store.getters['project/projects'])
    const newEvents = computed(() => store.getters['calendar/newEvents'])
    const projectUrls = computed(() => {
      const length = 5
      const links = [{ heading: 'Добавить услугу', route: '/project/create', icon: '/media/icons/duotune/arrows/arr075.svg' }]
      if (projects.value.length) {
        projects.value
          .filter((p, i) => i < length)
          .forEach((_, i) => {
            const p = projects.value[i]
            let { color } = p
            if (!p.isActive) {
              color = 'secondary'
            }
            links.push({ heading: p.title, route: `/project/${p.id}`, color })
          })
        links.push({ heading: 'Все услуги', route: '/projects', icon: '/media/icons/duotune/general/gen004.svg' })
      }
      return links
    })

    const user = computed(() => store.getters['userProfile/user'])
    onMounted(() => setTimeout(() => ScrollComponent.reinitialization(), 0))
    return {
      user,
      projectUrls,
      projects,
      newEvents
    }
  }
}
</script>
