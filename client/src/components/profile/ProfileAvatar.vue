<template>
  <div class="row mb-6">
    <label class="col-lg-4 col-form-label fw-bold fs-6">Аватар</label>
    <div class="col-lg-8">
      <el-upload
        class="image-input image-input-outline"
        :show-file-list="false"
        action=""
        :http-request="uploadProfileAvatar"
        :auto-upload="true"
      >
        <img :src="avatar" class="avatar image-input-wrapper" alt="avatar"/>
        <template v-if="!isInitAvatar">
            <span
              class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
              data-bb-image-input-action="remove"
              @click.stop="removeProfileAvatar"
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

import Swal from 'sweetalert2'
import { mapActions } from 'vuex'

export default {
  props: ['avatar', 'id'],
  data() {
    return {
      isAvatarUpdating: false
    }
  },
  computed: {
    isInitAvatar() {
      return this.avatar === '/media/avatars/blank.png'
    }
  },
  methods: {
    ...mapActions('userProfile', ['updateUserProfileAvatar', 'removeUserProfileAvatar']),

    uploadProfileAvatar(props) {
      const avatar = props.file
      const fileSize = avatar.size / 1024 / 1024;
      console.log(fileSize)
      if (fileSize >= 2) {
        Swal.fire({
          title: 'Ошибка.',
          html: 'Слишком большой размер фотографии. Пожалуйста, добавьте другую.<br>Максимальный размер - 2МБ',
          icon: 'warning',
          buttonsStyling: false,
          confirmButtonText: 'Попробовать еще раз',
          customClass: {
            confirmButton: 'btn btn-primary'
          }
        })
        return
      }
      this.isAvatarUpdating = true
      const { id } = this
      const form = new FormData()
      form.append('avatar', avatar)
      this.updateUserProfileAvatar({ form, id })
        .then(() => {
          Swal.fire({
            title: 'Ваш аватар успешно обновлен!',
            icon: 'success',
            buttonsStyling: false,
            confirmButtonText: 'Отлично',
            customClass: {
              confirmButton: 'btn btn-primary'
            }
          }).then(() => this.isAvatarUpdating = false)
        })
        .catch((e) => {
          Swal.fire({
            title: 'Произошла ошибка!',
            html: e,
            icon: 'error',
            buttonsStyling: false,
            confirmButtonText: 'Попробовать еще раз',
            customClass: {
              confirmButton: 'btn btn-secondary'
            }
          }).then(() => this.isAvatarUpdating = false)
        })
    },
    removeProfileAvatar() {
      const { id } = this
      this.removeUserProfileAvatar(id)
        .then(() => {
          Swal.fire({
            title: 'Ваш аватар успешно удален!',
            icon: 'warning',
            buttonsStyling: false,
            confirmButtonText: 'ОК',
            customClass: {
              confirmButton: 'btn btn-warning'
            }
          })
        })
        .catch((e) => {
          Swal.fire({
            title: 'Произошла ошибка!',
            html: e,
            icon: 'error',
            buttonsStyling: false,
            confirmButtonText: 'Попробовать еще раз',
            customClass: {
              confirmButton: 'btn btn-secondary'
            }
          })
        })
    },
  },
}
</script>
