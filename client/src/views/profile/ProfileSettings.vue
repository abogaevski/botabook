<template>
  <div class="card mb-5 mb-xl-10">
    <div class="card-header border-0 cursor-pointer">
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Настройки профиля</h3>
      </div>
    </div>
    <div class="collapse show">
      <Form
        class="form"
        novalidate
        :validation-schema="profileSchema"
        @submit="profileSubmit"
      >
        <div class="card-body border-top p-9">
          <div class="row mb-6">
            <label class="col-lg-4 col-form-label fw-bold fs-6">Аватар</label>
            <div class="col-lg-8">
              <el-upload
                class="image-input image-input-outline"
                :show-file-list="false"
                action=""
                :http-request="uploadProfileAvatar"
                :on-remove="removeProfileAvatar"
                :auto-upload="true"
              >
                <img v-if="user.profile.avatar" :src="user.profile.avatar" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
          <div class="row mb-6">
            <label class="col-lg-4 col-form-label required fw-bold fs-6">
              Полное имя
            </label>
            <div class="col-lg-8">
              <div class="row">
                <div class="col-lg-6 fv-row">
                  <Field
                    type="text"
                    name="firstName"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="Федор"
                    v-model.lazy="user.profile.firstName"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="firstName" />
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 fv-row">
                  <Field
                    type="text"
                    name="lastName"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Федоров"
                    v-model.lazy="user.profile.lastName"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="lastName" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row mb-6">
            <label class="col-lg-4 col-form-label fw-bold fs-6">
              Должность / специализация
            </label>
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="title"
                class="form-control form-control-lg form-control-solid"
                placeholder="Например, психолог"
                v-model.lazy="user.profile.title"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="title" />
                </div>
              </div>
            </div>
          </div>

          <div class="row mb-6">
            <label class="col-lg-4 col-form-label fw-bold fs-6">
              Компания
            </label>
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="company"
                class="form-control form-control-lg form-control-solid"
                placeholder="ООО &quot;Рога и копыта&quot;"
                v-model.lazy="user.profile.company"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="company" />
                </div>
              </div>
            </div>
          </div>

          <div class="row mb-6">
            <label class="col-lg-4 col-form-label fw-bold fs-6">
              <span>Телефон</span>
              <i
                class="fas fa-exclamation-circle ms-1 fs-7"
                data-bs-toggle="tooltip"
                title="Phone number must be active"
              ></i>
            </label>

            <div class="col-lg-8 fv-row">
              <Field
                type="tel"
                name="phone"
                class="form-control form-control-lg form-control-solid"
                placeholder="+7 12345678"
                v-model.lazy="user.profile.phone"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="phone" />
                </div>
              </div>
            </div>
          </div>

          <div class="row mb-6">
            <label class="col-lg-4 col-form-label fw-bold fs-6">
              Вебсайт
            </label
            >
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="website"
                class="form-control form-control-lg form-control-solid"
                placeholder="https://botabook.com"
                v-model.lazy="user.profile.website"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="website" />
                </div>
              </div>
            </div>
          </div>

          <div class="row mb-6">
            <label class="col-lg-4 col-form-label fw-bold fs-6">
              <span>Страна</span>

              <i
                class="fas fa-exclamation-circle ms-1 fs-7"
                data-bs-toggle="tooltip"
                title="Country of origination"
              ></i>
            </label>
            <div class="col-lg-8 fv-row">
              <Field
                name="country"
                class="form-control form-control-solid fw-bold"
                placeholder="Беларусь"
                v-model.lazy="user.profile.country"
              >
              </Field>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="country" />
                </div>
              </div>
            </div>
          </div>

          <div class="row mb-6">
            <label class="col-lg-4 col-form-label fw-bold fs-6">
              <span>Город</span>

              <i
                class="fas fa-exclamation-circle ms-1 fs-7"
                data-bs-toggle="tooltip"
                title="Country of origination"
              ></i>
            </label>
            <div class="col-lg-8 fv-row">
              <Field
                name="city"
                class="form-control form-control-solid fw-bold"
                placeholder="Брест"
                v-model.lazy="user.profile.city"
              >
              </Field>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="city" />
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button
            type="reset"
            class="btn btn-white btn-active-light-primary me-2"
          >
            Отмена
          </button>

          <button
            type="submit"
            class="btn btn-primary"
          >
            <span class="indicator-label">
              Сохранить изменения
            </span>
            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as Yup from 'yup'
// import { ImageInputComponent } from '@/core/components/_ImageInputComponent'
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'ProfileSettings',
  data() {
    const profileSchema = Yup.object({
      firstName: Yup.string()
        .required()
        .label('Имя'),
      lastName: Yup.string()
        .required()
        .label('Фамилия'),
      title: Yup.string()
        .label('Должность'),
      company: Yup.string()
        .label('Компания'),
      phone: Yup.string()
        .label('Телефон'),
      website: Yup.string()
        .label('Вебсайт'),
      country: Yup.string()
        .label('Страна'),
      city: Yup.string()
        .label('Город'),
    })
    return {
      profileSchema
    }
  },
  computed: {
    ...mapGetters('userProfile', ['user']),
    error() {
      return this.$store.getters.error
    }
  },
  components: { Form, Field, ErrorMessage },
  mounted() {
    // ImageInputComponent.reinitialization()
  },
  methods: {
    ...mapActions('userProfile', ['updateUserProfile', 'updateUserProfileAvatar']),

    profileSubmit(profile) {
      const { id } = this.user
      this.updateUserProfile({ profile, id })
        .then(() => {
          Swal.fire({
            title: 'Ваш профиль успешно обновлен!',
            icon: 'success',
            buttonsStyling: false,
            confirmButtonText: 'Отлично',
            customClass: {
              confirmButton: 'btn btn-primary'
            }
          })
        })
        .catch(() => {
          const title = this.error.status
            ? `Ошибка: ${this.error.status}. Не удалось обновить профиль`
            : 'Что-то пошло не так'
          const html = this.error.statusText
            ? this.error.statusText
            : 'Произошла неизвестная ошибка'

          Swal.fire({
            title,
            html: `${html}.<br>Пожалуйста обратитесь в поддержку
              <a href="mailto:antnbog@gmail.com">сюда</a>`,
            icon: 'error',
            buttonsStyling: false,
            confirmButtonText: 'Попробуйте еще раз!',
            customClass: {
              confirmButton: 'btn fw-bold btn-light-danger'
            }
          })
        })
    },

    uploadProfileAvatar(props) {
      const avatar = props.file
      const { id } = this.user
      const form = new FormData()
      form.append('avatar', avatar)
      this.updateUserProfileAvatar({ form, id })
        .then(() => {
          Swal.fire({
            title: 'Ваш профиль успешно обновлен!',
            icon: 'success',
            buttonsStyling: false,
            confirmButtonText: 'Отлично',
            customClass: {
              confirmButton: 'btn btn-primary'
            }
          })
        })
    },
    removeProfileAvatar(props) {
      console.log(props)
    }
  }
}
</script>
