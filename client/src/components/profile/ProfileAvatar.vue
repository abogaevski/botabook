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
          class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
          data-bb-image-input-action=change
        >
          <i class="bi bi-pencil-fill fs-7"></i>
        </span>
      </el-upload>
      <div class="form-text">Для лучшего отображения используйте квадратную фотографию</div>
      <div class="form-text mt-0">Расширения файлов: png, jpg, jpeg.</div>
    </div>
  </div>
</template>
<script>

import Swal from 'sweetalert2'
import { mapActions } from 'vuex'

export default {
  props: ['avatar', 'id'],
  computed: {
    isInitAvatar() {
      return this.avatar === '/media/avatars/blank.png'
    }
  },
  methods: {
    ...mapActions('userProfile', ['updateUserProfileAvatar', 'removeUserProfileAvatar']),

    uploadProfileAvatar(props) {
      const avatar = props.file
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
