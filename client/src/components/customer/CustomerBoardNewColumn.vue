<template>
  <div class="card bg-light-dark">
    <div class="card-body py-2 px-4">
      <Form class="form" @submit="submitColumn" :validation-schema="columnSchema">
        <Field
          ref="titleField"
          placeholder="Например, на удержании"
          type="text"
          name="title"
          class="form-control form-control"
        />
        <div class="fv-plugins-message-container invalid-feedback">
          <ErrorMessage name="title" />
        </div>
        <div class="mt-2">
          <button ref="submitButton" type="submit" class="btn btn-sm btn-primary me-2">
            <span class="indicator-label">Создать</span>
            <span class="indicator-progress">Подождите...
              <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          </button>
          <button type="button" @click="$emit('column-create:close')" class="btn btn-sm btn-white">Отмена</button>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue'
import { string, object } from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useStore } from 'vuex'
import alert from '@/core/_utils/swal'

export default {
  name: 'CustomerBoardNewColumn',
  components: { Form, Field, ErrorMessage },
  setup(_, { emit }) {
    const store = useStore()
    const titleField = ref()
    const columnSchema = object().shape({
      title: string()
        .label('Название колонки')
    })
    const submitButton = ref()

    const submitColumn = (values) => {
      if (!values.title) {
        alert({ title: 'Введите название колонки', icon: 'warning' })
        return
      }
      submitButton.value.setAttribute('data-bb-indicator', 'on')
      store.dispatch('customerModule/createBoardColumn', values)
        .then(() => emit('column-create:close'))
    }
    onMounted(() => {
      titleField.value.$el.focus()
    })

    return {
      submitColumn,
      columnSchema,
      submitButton,
      titleField
    }
  }
}
</script>
