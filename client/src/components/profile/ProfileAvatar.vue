<template>
  <div class="row mb-6">
    <label class="col-lg-4 col-form-label fw-bold fs-6">Аватар</label>
    <div class="col-lg-8">
      <el-upload
        class="image-input image-input-outline"
        :show-file-list="false"
        action=""
        :http-request="uploadAvatar"
        :auto-upload="true"
      >
        <img :src="avatar" class="avatar image-input-wrapper" alt="avatar"/>
        <template v-if="!isInitAvatar">
            <span
              class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
              data-bb-image-input-action="remove"
              @click.stop="removeAvatar"
            >
            <i class="bi bi-x fs-2"></i>
          </span>
        </template>
        <span
          v-if="!isAvatarUpdating"
          class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
          data-bb-image-input-action=change
        >
          <i class="bi bi-pencil-fill fs-7"></i>
        </span>
        <span
          v-else
          class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
          data-bb-image-input-action=change
        >
          <span class="border-1 spinner-border spinner-border-sm text-primary"></span>
        </span>
      </el-upload>
      <div class="form-text">Для лучшего отображения используйте квадратную фотографию</div>
      <div class="form-text mt-0">Расширения файлов: png, jpg, jpeg.</div>
      <div class="form-text mt-0">Максимальный размер файла - 2Мб.</div>
    </div>
  </div>
</template>
<script>
import { computed, ref, toRefs } from 'vue'
import { useStore } from 'vuex'
import alert from '@/core/_utils/swal'

export default {
  name: 'ProfileAvatar',
  props: ['avatar', 'id'],
  setup(props) {
    const store = useStore()
    const { avatar, id } = toRefs(props)
    const isAvatarUpdating = ref(false)
    const isInitAvatar = computed(() => avatar.value === '/media/avatars/blank.png')
    const uploadAvatar = (values) => {
      const { file } = values
      const fileSize = file.size / 1024 / 1024
      if (fileSize >= 2) {
        alert({ title: 'Ошибка.', html: 'Слишком большой размер фотографии. Пожалуйста, добавьте другую.<br>Максимальный размер - 2МБ', icon: 'warning' })
        return
      }
      isAvatarUpdating.value = true
      const form = new FormData()
      form.append('avatar', file)
      store.dispatch('userProfile/updateUserProfileAvatar', { form, id: id.value })
        .then(() => isAvatarUpdating.value = false)
        .catch(() => isAvatarUpdating.value = false)
    }
    const removeAvatar = () => {
      store.dispatch('userProfile/removeUserProfileAvatar', id.value)
    }
    return {
      isInitAvatar,
      isAvatarUpdating,
      uploadAvatar,
      removeAvatar
    }
  }
}
</script>
