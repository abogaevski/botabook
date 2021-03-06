<template>
  <div class="card mb-6 mb-xl-9">
    <div class="card-body p-4 p-sm-9 p-lg-4 p-xl-9" :class="{'pb-0 pb-sm-0 pb-lg-0 pb-xl-0': project}">
      <div v-if="project" class="d-flex flex-wrap flex-sm-nowrap mb-6 flex-center">
        <div
          class="fs-5tx d-flex flex-center flex-shrink-0 rounded w-100px h-100px w-lg-150px h-lg-150px me-sm-6 mb-4 symbol-label fw-bolder"
          :class="colorClass"
        >
          {{ initials }}
        </div>
        <div class="flex-grow-1">
          <div class="flex-center d-flex flex-column flex-sm-row flex-wrap justify-content-sm-between mb-2">
            <div class="d-flex flex-column">
              <div class="d-flex align-items-center mb-4">
                <h3 class="text-gray-800 mb-0 fs-2 fw-bolder me-3">
                  {{ project.title }}
                </h3>
                <span class="badge me-auto" :class="statusColor">
                  {{ statusText }}
                </span>
              </div>
              <div v-if="project.description" class="d-flex flex-wrap fw-bold mb-4 fs-5 text-gray-400">
                {{ project.description }}
              </div>
            </div>
            <div class="d-flex flex-end mb-4">
              <router-link
                to="settings"
                class="btn btn-sm btn-primary me-3">
                Изменить
              </router-link>
              <div class="me-0">
                <bt-button
                  @click="deleteProject"
                  btn-class="btn btn-icon btn-bg-light btn-icon btn-sm btn-active-icon-danger"
                  icon-class="svg-icon-1"
                  icon-url="/media/icons/duotone/General/Trash.svg"
                ></bt-button>
              </div>
            </div>
          </div>
          <div class="d-flex flex-wrap justify-content-start">
            <div class="d-flex flex-wrap">
              <div class="border border-gray-300 border-dashed rounded min-w-125px p-3 px-sm-4 me-sm-4 me-3 mb-3">
                <div class="d-flex align-items-center">
                  <div class="fs-4 fw-bolder">
                    {{ createdAt }}
                  </div>
                </div>
                <div class="fw-bold fs-6 text-gray-400">
                  Дата создания
                </div>
              </div>
              <div class="border border-gray-300 border-dashed rounded min-w-125px p-3 px-sm-4 me-sm-4 me-3 mb-3">
                <div class="d-flex align-items-center">
                  <div class="fs-4 fw-bolder">
                    {{ price }}
                  </div>
                </div>
                <div class="fw-bold fs-6 text-gray-400">
                  Цена
                </div>
              </div>
              <div class="border border-gray-300 border-dashed rounded min-w-125px p-3 px-sm-4 me-sm-4 me-3 mb-3">
                <div class="d-flex align-items-center">
                  <div class="fs-4 fw-bolder">
                    {{ project.events.length }}
                  </div>
                </div>
                <div class="fw-bold fs-6 text-gray-400">
                  Всего встреч
                </div>
              </div>
            </div>
            <template v-if="customers">
              <project-customers-symbols-list :customers-id="project.customers" />
            </template>
          </div>
        </div>
      </div>
      <div v-if="project" class="d-flex overflow-auto h-55px">
        <ul class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap">
          <li class="nav-item">
            <router-link
              :to="`/project/${project.id}/overview`"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              Основные
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="`/project/${project.id}/settings/`"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              Настройки
            </router-link>
          </li>
        </ul>
      </div>
      <el-skeleton v-else :rows="4" animated />
    </div>
  </div>
  <router-view v-if="project" />
</template>
<script>

import { useStore } from 'vuex'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import { computed, onMounted, watchEffect } from 'vue'
import moment from 'moment'
import alert from '@/core/_utils/swal'
import ProjectCustomersSymbolsList from '@/components/project/ProjectCustomersSymbolsList'
import BtButton from '@/components/_core/buttons/BtButton'

export default {
  name: 'ProjectDetail',
  components: { ProjectCustomersSymbolsList, BtButton },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const getProjects = () => store.dispatch('project/getProjects')
    const project = computed(() => store.getters['project/projectById'](route.params.id))

    const stop = watchEffect(() => (project.value ? store.dispatch('setTitle', project.value.title) : ''))
    const customers = computed(() => store.getters['customerModule/customers'])
    const colorClass = computed(() => {
      const color = project.value ? project.value.color : 'primary'
      return [`bg-light-${color}`, `text-${color}`]
    })
    const initials = computed(() => (project.value.title ? project.value.title.split('')[0].toUpperCase() : ''))

    const statusColor = computed(() => (project.value.isActive ? 'badge-light-success' : 'badge-light'))
    const statusText = computed(() => (project.value.isActive ? 'Активна' : 'Неактивна'))
    const createdAt = computed(() => moment(project.value.createdAt).format('DD MMM YYYY'))
    const price = computed(() => (parseFloat(project.value.price) > 0 ? project.value.price : 'Бесплатно'))

    const deleteProject = () => {
      alert({
        title: 'Вы уверены, что хотите удалить проект?',
        html: 'Все встречи будут также удалены (клиенты останутся)',
        icon: 'question',
        confirmButtonText: 'Удалить'
      }).then((result) => {
        if (result.value) {
          store.dispatch('project/deleteProject', project.value.id)
            .then(() => router.push('/projects'))
        }
      })
    }

    onBeforeRouteLeave(stop)
    onMounted(getProjects)

    return {
      project,
      colorClass,
      initials,
      statusColor,
      statusText,
      createdAt,
      customers,
      price,
      deleteProject
    }
  }
}
</script>
