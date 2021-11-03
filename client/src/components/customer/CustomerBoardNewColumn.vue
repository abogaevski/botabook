<template>
  <div class="card">
    <div class="card-body p-2">
      <Form class="form" @submit="submitColumn" :validation-schema="columnSchema">
        <Field
          placeholder="Например, на удержании"
          type="text"
          name="title"
          class="form-control form-control-sm form-control-solid"
        />
        <div class="fv-plugins-message-container invalid-feedback">
          <ErrorMessage name="title" />
        </div>
        <div class="mt-2">
          <button ref="submitButton" type="submit" class="btn btn-sm btn-light-primary me-2">
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
import { ref } from 'vue'
import { string, object } from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useStore } from 'vuex'

export default {
  name: 'CustomerBoardNewColumn',
  components: { Form, Field, ErrorMessage },
  setup(_, { emit }) {
    const store = useStore()
    const columnSchema = object().shape({
      title: string()
        .required()
        .label('Название колонки')
    })
    const submitButton = ref()

    const submitColumn = (values) => {
      submitButton.value.setAttribute('data-bb-indicator', 'on')
      store.dispatch('customerModule/createBoardColumn', values)
        .then(() => emit('column-create:close'))
    }

    return {
      submitColumn,
      columnSchema,
      submitButton
    }
  }
}
</script>
