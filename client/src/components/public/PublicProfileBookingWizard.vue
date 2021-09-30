<template>
  <div class="flex-lg-row-fluid ms-lg-15">
    <div class="card card-flush mb-6 mb-xl-9">
      <div class="card-header mt-6">
        <div class="card-title flex-column">
          <h2 class="mb-1">
            Записаться
          </h2>
          <div class="fs-6 fw-bold text-muted">
            42 встречи уже назначено
          </div>
        </div>
      </div>
      <div class="card-body p-9 pt-4">
        <div class="stepper stepper-links d-flex flex-column" data-bb-steper="true"
        >
          <div class="stepper-nav py-5">
            <div class="stepper-item current" data-bb-stepper-element="nav">
              <h3 class="stepper-title">Выберите услугу</h3>
            </div>
            <div class="stepper-item" data-bb-stepper-element="nav">
              <h3 class="stepper-title">Выберите дату</h3>
            </div>
            <div class="stepper-item" data-bb-stepper-element="nav">
              <h3 class="stepper-title">Выберите время</h3>
            </div>
            <div class="stepper-item" data-bb-stepper-element="nav">
              <h3 class="stepper-title">Последний шаг</h3>
            </div>
          </div>

          <form action="" class="mx-auto mw-700px w-100 py-10 fv-plugins-bootstrap5 fv-plugins-framework">
            <div class="current" data-bb-stepper-element="content">
              <div class="w-100">
                <div class="pb-10 pb-lg-15">
                  <h2 class="fw-bolder d-flex align-items-center text-dark">Выберите услугу</h2>
                </div>
                <div class="fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
                  <div class="row">
                    <div
                      v-for="(project, k) in projects"
                      :key="k"
                      class="col-lg-6">
                      <input
                        type="radio"
                        class="btn-check"
                        name="project_name"
                        :value="project.id"
                        :id="projectInputId(project.id)">
                      <label
                        class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center mb-10"
                        :for="projectInputId(project.id)">
                        <span class="svg-icon svg-icon-3x me-5">
                          <inline-svg src="/media/icons/duotone/Communication/Clipboard-list.svg"></inline-svg>
                        </span>
                        <span class="d-block fw-bold text-start">
                          <span class="text-dark fw-bolder d-block fs-4 mb-2">{{ project.title }}</span>
                          <span class="text-muted fw-bold fs-6">{{ project.description }}</span>
                          <div class="d-flex flex-wrap fw-bold fs-6 mt-4 pe-2">
                            <div class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                              <span class="svg-icon svg-icon-4 me-1">
                                <inline-svg src="/media/icons/duotone/Code/Time-schedule.svg" />
                                {{ project.timeRange }} мин.
                              </span>
                            </div>
                            <div class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                              <span class="svg-icon svg-icon-4 me-1">
                                <inline-svg src="/media/icons/duotone/Shopping/Money.svg" />
                                {{ project.price }} руб.
                              </span>
                            </div>
                          </div>
                        </span>
                      </label>
                      <div class="fv-plugins-message-container invalid-feedback"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="d-flex flex-stack pt-15">
              <div class="mr-2">
                <button type="button" class="btn btn-lg btn-light-primary me-3" data-bb-stepper-action="previous">
                  <!--begin::Svg Icon | path: icons/duotune/arrows/arr063.svg-->
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg src="/media/icons/duotone/Navigation/Arrow-left.svg"/>
                  </span>
                  Назад
                </button>
              </div>
              <div>
                <button type="button" class="btn btn-lg btn-primary me-3" data-bb-stepper-action="submit">
                  <span class="indicator-label">Отправить
                    <span class="svg-icon svg-icon-3 ms-2 me-0">
                      <inline-svg src="/media/icons/duotone/Navigation/Arrow-right.svg"/>
                    </span>
                  </span>
                  <span class="indicator-progress">Подождите...
                    <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                </button>
                <button type="button" class="btn btn-lg btn-primary" data-bb-stepper-action="next">Продолжить
                  <span class="svg-icon svg-icon-4 ms-1 me-0">
                    <inline-svg src="/media/icons/duotone/Navigation/Arrow-right.svg"/>
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ProjectService from '@/core/services/project.service'

export default {
  setup() {
    const route = useRoute()
    const projects = ref([])

    const getProjects = async () => {
      projects.value = await ProjectService.getPublicProjects(route.params.slug)
        .then((p) => p)
    }
    onMounted(getProjects)
    const projectInputId = (id) => `project_type_${id}`

    return {
      projects,
      getProjects,
      projectInputId
    }
  }
}
</script>
