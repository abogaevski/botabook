<template>
  <div class="card">
    <div class="card-body pb-0">
      <div class="text-center pt-15 pb-5">
        <h2 class="fs-2x fw-bolder mb-0">Создать новую услугу</h2>
        <p class="text-gray-400 fs-4 fw-bold py-7">Нажмите на кнопку ниже,
          <br>чтобы открыть окно создания услуги.</p>
        <button class="btn btn-primary er fs-6 px-8 py-4" @click="showModal">Создать услугу</button>
      </div>
      <div class="text-center px-5">
        <img src="/media/illustrations/6.png" alt="" class="mw-100 h-200px h-sm-325px">
      </div>
    </div>
  </div>
  <project-create-modal :show-modal="isActiveCreateModal" @modal:close="closeModal"/>
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'
import ProjectCreateModal from '@/components/project/ProjectCreateModal'

export default {
  name: 'ProjectCreate',
  components: { ProjectCreateModal },
  setup() {
    const store = useStore()
    const isActiveCreateModal = ref(false)
    const closeModal = () => isActiveCreateModal.value = false
    const showModal = () => isActiveCreateModal.value = true
    store.dispatch('setTitle', 'Новая услуга')
    return {
      isActiveCreateModal,
      closeModal,
      showModal,
    }
  }
}
</script>
