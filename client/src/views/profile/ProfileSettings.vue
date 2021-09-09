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
              <div
                class="image-input image-input-outline"
                data-bb-image-input="true"
                style="background-image: url('/media/avatars/blank.png')"
              >
                <div
                  class="image-input-wrapper w-125px h-125px"
                  :style="`background-image: url(${user.profile.avatar})`"
                ></div>
                <label
                  class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                  data-bb-image-input-action="change"
                  data-bs-toggle="tooltip"
                  title="Change avatar"
                >
                  <i class="bi bi-pencil-fill fs-7"></i>

                  <Field type="file" name="avatar" ref="avatar" accept=".png, .jpg, .jpeg" />
                  <input type="hidden" name="avatar_remove" />
                </label>
                <span
                  class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                  data-bb-image-input-action="remove"
                  data-bs-toggle="tooltip"
                  title="Remove avatar"
                >
                  <i class="bi bi-x fs-2"></i>
                </span>
                <span
                  class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-bb-image-input-action="cancel"
                  data-bs-toggle="tooltip" title=""
                  data-bs-original-title="Cancel avatar"
                >
                  <i class="bi bi-x fs-2"></i>
                </span>
              </div>
              <div class="form-text">Расширения файлов: png, jpg, jpeg.</div>
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
import { ImageInputComponent } from '@/core/components/_ImageInputComponent'
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'ProfileSettings',
  data() {
    const profileSchema = Yup.object({
      avatar: Yup.mixed(),
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
    ImageInputComponent.reinitialization()
  },
  methods: {
    ...mapActions('userProfile', ['updateUserProfile']),

    profileSubmit(profile) {
      const { id } = this.user
      // const avatar = this.$refs.avatar.files[0]
      // profile.avatar = avatar
      console.log(profile.avatar[0])
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
    }
  }
}
</script>
