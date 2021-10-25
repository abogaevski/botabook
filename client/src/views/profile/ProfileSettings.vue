<template>
  <div v-if="user" class="card mb-5 mb-xl-10">
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

          <profile-avatar :id="user.id" :avatar="user.profile.avatar"></profile-avatar>

          <div class="row mb-4 mb-lg-6">
            <label class="col-lg-4 col-form-label fw-bold fs-6">
              Ссылка на страницу
            </label>
            <div class="col-lg-8 fv-row">
              <div class="form-text mb-3">{{ location }}</div>
              <Field
                type="text"
                rows="3"
                name="slug"
                class="form-control form-control-lg form-control-solid"
                v-model="profileData.slug"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="slug"/>
                </div>
              </div>
            </div>
          </div>

          <div class="row mb-4 mb-lg-6">
            <label class="col-lg-4 col-form-label required fw-bold fs-6">
              Полное имя
            </label>
            <div class="col-lg-8">
              <div class="row">
                <div class="col-lg-6 col-md-6 fv-row">
                  <Field
                    type="text"
                    name="firstName"
                    class="form-control form-control-lg form-control-solid mb-3 mb-md-0"
                    placeholder="Федор"
                    v-model="profileData.firstName"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="firstName"/>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 fv-row">
                  <Field
                    type="text"
                    name="lastName"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Федоров"
                    v-model="profileData.lastName"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="lastName"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row mb-4 mb-lg-6">
            <label class="col-lg-4 col-form-label fw-bold fs-6">
              Текст приветствия
              <bt-tooltip
                tag="i"
                tooltipClass="fas fa-exclamation-circle ms-1 fs-7"
                title="Отобразится на Вашей публичной странице"
                placement="right"
              />
            </label>
            <div class="col-lg-8 fv-row">
              <Field
                as="textarea"
                rows="3"
                name="welcomeText"
                class="form-control form-control-lg form-control-solid"
                v-model="profileData.welcomeText"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="welcomeText"/>
                </div>
              </div>
            </div>
          </div>

          <div class="row mb-4 mb-lg-6">
            <label class="col-lg-4 col-form-label fw-bold fs-6">
              Должность / специализация
            </label>
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="title"
                class="form-control form-control-lg form-control-solid"
                placeholder="Например, психолог"
                v-model="profileData.title"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="title"/>
                </div>
              </div>
            </div>
          </div>

          <div class="row mb-4 mb-lg-6">
            <label class="col-lg-4 col-form-label fw-bold fs-6">
              Компания
            </label>
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="company"
                class="form-control form-control-lg form-control-solid"
                placeholder="ООО &quot;Рога и копыта&quot;"
                v-model="profileData.company"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="company"/>
                </div>
              </div>
            </div>
          </div>

          <div class="row mb-4 mb-lg-6">
            <label class="col-lg-4 col-form-label fw-bold fs-6">
              <span>Телефон</span>
              <bt-tooltip
                tag="i"
                tooltipClass="fas fa-exclamation-circle ms-1 fs-7"
                title="Телефон должен быть активен"
                placement="right"
              />
            </label>

            <div class="col-lg-8 fv-row">
              <Field
                type="tel"
                name="phone"
                class="form-control form-control-lg form-control-solid"
                placeholder="+7 12345678"
                v-model="profileData.phone"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="phone"/>
                </div>
              </div>
            </div>
          </div>

          <div class="row mb-4 mb-lg-6">
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
                v-model="profileData.website"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="website"/>
                </div>
              </div>
            </div>
          </div>

          <div class="row mb-4 mb-lg-6">
            <label class="col-lg-4 col-form-label fw-bold fs-6">
              <span>Страна</span>

              <bt-tooltip
                tag="i"
                tooltipClass="fas fa-exclamation-circle ms-1 fs-7"
                title="Страна нахождения"
                placement="right"
              />
            </label>
            <div class="col-lg-8 fv-row">
              <Field
                name="country"
                class="form-control form-control-solid fw-bold"
                placeholder="Беларусь"
                v-model="profileData.country"
              >
              </Field>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="country"/>
                </div>
              </div>
            </div>
          </div>

          <div class="row mb-4 mb-lg-6">
            <label class="col-lg-4 col-form-label fw-bold fs-6">
              <span>Город</span>

              <bt-tooltip
                tag="i"
                tooltipClass="fas fa-exclamation-circle ms-1 fs-7"
                title="Город проживания"
                placement="right"
              />
            </label>
            <div class="col-lg-8 fv-row">
              <Field
                name="city"
                class="form-control form-control-solid fw-bold"
                placeholder="Брест"
                v-model="profileData.city"
              >
              </Field>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="city"/>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-4 mb-lg-6">
            <label class="col-lg-4 col-form-label fw-bold fs-6">
              <span>График работы</span>

              <bt-tooltip
                tag="i"
                tooltipClass="fas fa-exclamation-circle ms-1 fs-7"
                title="График работы в формате. например 08:00:00-17:00:00"
                placement="right"
              />
            </label>
            <div class="col-lg-8 fv-row profile__time-picker">
              <div class="row">
                <div class="col-lg-6 col-md-6 fv-row mb-3 mb-md-0">
                  <Field
                    v-model="profileData.startWorkHour"
                    name="startWorkHour"
                    v-slot="{ value, handleChange }"
                  >
                    <el-time-select
                      class="d-block"
                      :model-value="value"
                      @update:model-value="handleChange"
                      placeholder="Start time"
                      start="00:00"
                      step="00:30"
                      end="23:30"
                    />
                  </Field>
                </div>
                <div class="col-lg-6 col-md-6 fv-row">
                  <Field
                    v-model="profileData.endWorkHour"
                    name="endWorkHour"
                    v-slot="{ value, handleChange }"
                  >
                    <el-time-select
                      class="d-block"
                      :min-time="profileData.startWorkHour"
                      :model-value="value"
                      @update:model-value="handleChange"
                      placeholder="Start time"
                      start="00:00"
                      step="00:30"
                      end="23:30"
                    />
                  </Field>
                </div>
              </div>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="startWorkHour"/>
                  <ErrorMessage name="endWorkHour"/>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-4 mb-lg-6">
            <label class="col-lg-4 col-form-label fw-bold fs-6">
              <span>Часовой пояс</span>

              <bt-tooltip
                tag="i"
                tooltipClass="fas fa-exclamation-circle ms-1 fs-7"
                title="Город проживания"
                placement="right"
              />
            </label>
            <div class="col-lg-8 fv-row">
              <Field
                name="timezone"
                class="form-select form-select-solid"
                as="select"
                v-model="profileData.timezone"
              >
                <option v-for="(zone, i) in zones" :key="i" :value="zone">{{ zone }}</option>
              </Field>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="city"/>
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
import { computed, ref, toRefs, watch } from 'vue'
import { useStore } from 'vuex'
import { tz } from 'moment-timezone'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import ProfileAvatar from '@/components/profile/ProfileAvatar'
import BtTooltip from '@/components/_core/BtTooltip'
import UserService from '@/core/services/user.service'

export default {
  name: 'ProfileSettings',
  props: ['user'],
  components: { Form, Field, ErrorMessage, ProfileAvatar, BtTooltip },
  setup(props) {
    const { user } = toRefs(props)
    const store = useStore()
    const profileData = ref({
      firstName: '',
      lastName: '',
      welcomeText: '',
      slug: '',
      title: '',
      company: '',
      phone: '',
      website: '',
      country: '',
      city: '',
      timezone: '',
      startWorkHour: '',
      endWorkHour: ''
    })
    const profileSchema = Yup.object({
      firstName: Yup.string()
        .required()
        .label('Имя'),
      lastName: Yup.string()
        .required()
        .label('Фамилия'),
      welcomeText: Yup.string()
        .label('Текст приветствия'),
      slug: Yup.string()
        .matches('^[a-z0-9]+(?:-[a-z0-9]+)*$')
        .test('slugUnique', (value, { path, createError }) => {
          if (value) {
            return UserService
              .checkProfileSlug(value)
              .then((status) => status || createError({ path, message: 'Ссылка уже занята другим пользователем' }))
          }
          return false
        })
        .min(4, 'Минимальное количество символов - 4')
        .required()
        .label('Ссылка на страницу'),
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
      timezone: Yup.string()
        .label('Часовой пояс'),
      startWorkHour: Yup.string()
        .label('Часы доступности'),
      endWorkHour: Yup.string()
        .label('Часы доступности')
    })
    const startTime = ref('')
    const endTime = ref('')
    const location = window.location.origin
    const zones = computed(() => {
      const result = []
      result.push(...tz.zonesForCountry('BY'))
      result.push(...tz.zonesForCountry('GE'))
      result.push(...tz.zonesForCountry('UA'))
      result.push(...tz.zonesForCountry('RU'))
      return result
    })
    watch(user, (newUser) => {
      profileData.value = {
        ...newUser.profile
      }
    })
    const profileSubmit = (values) => {
      const { id } = user.value
      console.log(values)
      store.dispatch('userProfile/updateUserProfile', { values, id })
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
            html: `${html}`,
            icon: 'error',
            buttonsStyling: false,
            confirmButtonText: 'Попробуйте еще раз!',
            customClass: {
              confirmButton: 'btn fw-bold btn-light-danger'
            }
          })
        })
    }

    return {
      profileData,
      profileSchema,
      startTime,
      endTime,
      location,
      zones,
      profileSubmit
    }
  },
}
</script>
