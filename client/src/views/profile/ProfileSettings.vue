<template>
  <div v-if="user" class="card mb-5 mb-xl-10">
    <div class="card-header border-0 cursor-pointer p-4 p-sm-9 p-lg-4 px-xl-9">
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
        <div class="card-body border-top p-4 p-sm-9 p-lg-4 px-xl-9">

          <profile-avatar :id="user.id" :avatar="user.profile.avatar"></profile-avatar>

          <div class="row mb-3 mb-lg-6">
            <div class="col-lg-4">
              <div class="d-flex flex-row flex-sm-column justify-content-between justify-content-sm-start align-items-center align-items-sm-start">
                <div class="fs-6 fw-bold mt-2 mb-1">Ссылка</div>
                <div class="fs-7 fw-bold text-muted">{{ location }}</div>
              </div>
            </div>
            <div class="col-lg-8 fv-row">
              <div class="form-text mb-3"></div>
              <Field
                type="text"
                rows="3"
                name="slug"
                class="form-control form-control-lg form-control-solid"
                v-model="profileData.slug"
              />
              <div class="form-text mt-0">Формат: латинские буквы в нижнем регистре. Для разделения слов изпользуйте дефис.</div>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="slug"/>
                </div>
              </div>
            </div>
          </div>

          <div class="separator my-3 my-lg-6"></div>

          <div class="row mb-3 mb-lg-6">
            <label class="col-lg-4 col-form-label fw-bold fs-6">
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

          <div class="row mb-3 mb-lg-6">
            <label class="col-lg-4 col-form-label fw-bold fs-6">
              Текст приветствия
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

          <div class="separator my-3 my-lg-6"></div>

          <div class="row mb-3 mb-lg-6">
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

          <div class="row mb-3 mb-lg-6">
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

          <div class="separator my-3 my-lg-6"></div>

          <div class="row mb-3 mb-lg-6">
            <label class="col-lg-4 col-form-label fw-bold fs-6">
              <span>Телефон</span>
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

          <div class="row mb-3 mb-lg-6">
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

          <div class="row mb-3 mb-lg-6">
            <label class="col-lg-4 col-form-label fw-bold fs-6">
              <span>Страна</span>
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

          <div class="row mb-3 mb-lg-6">
            <label class="col-lg-4 col-form-label fw-bold fs-6">
              <span>Город</span>
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

          <div class="separator my-3 my-lg-6"></div>

          <div class="row mb-3 mb-lg-6">
            <label class="col-lg-4 col-form-label fw-bold fs-6">
              <span>График работы</span>
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
                      :editable="false"
                      :clearable="false"
                      :model-value="value"
                      @update:model-value="handleChange"
                      placeholder="Start time"
                      start="00:00"
                      step="01:00"
                      end="22:00"
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
                      :editable="false"
                      :clearable="false"
                      :min-time="profileData.startWorkHour"
                      :model-value="value"
                      @update:model-value="handleChange"
                      placeholder="Время конца"
                      start="00:00"
                      step="01:00"
                      end="22:00"
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
          <div class="row mb-3 mb-lg-6">
            <label class="col-lg-4 col-form-label fw-bold fs-6">
              <span>Часовой пояс</span>
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

        <div class="card-footer d-flex justify-content-end p-sm-9 p-lg-4 px-xl-9">
          <button
            type="submit"
            class="btn btn-primary"
            ref="submitBtn"
          >
            <span class="indicator-label">Сохранить</span>
            <span class="indicator-progress">Подождите...<span class="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { tz } from 'moment-timezone'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { string, object } from 'yup'
import ProfileAvatar from '@/components/profile/ProfileAvatar'
import UserService from '@/core/services/user.service'

export default {
  name: 'ProfileSettings',
  components: { Form, Field, ErrorMessage, ProfileAvatar },
  setup() {
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
    const profileSchema = object({
      firstName: string()
        .trim()
        .required()
        .max(50)
        .label('Имя'),
      lastName: string()
        .trim()
        .max(50)
        .required()
        .label('Фамилия'),
      welcomeText: string()
        .label('Текст приветствия'),
      slug: string()
        .matches('^[a-z0-9]+(?:-[a-z0-9]+)*$')
        .test('slugUnique', (value, { path, createError }) => {
          if (value) {
            return UserService
              .checkProfileSlug(value)
              .then((status) => !status.success || createError({ path, message: 'Ссылка уже занята другим пользователем' }))
          }
          return false
        })
        .min(4, 'Минимальное количество символов - 4')
        .required()
        .label('Ссылка на страницу'),
      title: string()
        .trim()
        .max(50)
        .label('Должность'),
      company: string()
        .trim()
        .max(50)
        .label('Компания'),
      phone: string()
        .trim()
        .max(32)
        .label('Телефон'),
      website: string()
        .trim()
        .max(50)
        .label('Вебсайт'),
      country: string()
        .trim()
        .max(32)
        .label('Страна'),
      city: string()
        .trim()
        .max(32)
        .label('Город'),
      timezone: string()
        .label('Часовой пояс'),
      startWorkHour: string()
        .label('Часы доступности'),
      endWorkHour: string()
        .label('Часы доступности')
    })
    const user = computed(() => store.getters['userProfile/user'])
    const startTime = ref('')
    const endTime = ref('')
    const location = window.location.origin
    const zones = computed(() => {
      const result = []
      result.push(...tz.zonesForCountry('BY'))
      result.push(...tz.zonesForCountry('GE'))
      result.push(...tz.zonesForCountry('UA'))
      result.push(...tz.zonesForCountry('RU'))
      result.push(...tz.zonesForCountry('UZ'))
      result.push(...tz.zonesForCountry('KZ'))
      return result
    })
    watch(user, (newUser) => profileData.value = { ...newUser.profile })
    const submitBtn = ref()
    const profileSubmit = (values) => {
      submitBtn.value.setAttribute('data-bb-indicator', 'on')
      const { id } = user.value
      store.dispatch('userProfile/updateUserProfile', { values, id })
        .then(() => submitBtn.value.removeAttribute('data-bb-indicator'))
        .catch(() => submitBtn.value.removeAttribute('data-bb-indicator'))
    }

    return {
      profileData,
      profileSchema,
      startTime,
      endTime,
      location,
      zones,
      profileSubmit,
      submitBtn,
      user
    }
  },
}
</script>
