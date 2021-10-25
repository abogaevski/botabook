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
          <button type="submit" class="btn btn-sm btn-light-primary me-2">Создать</button>
          <button type="button" @click="$emit('column-create:close')" class="btn btn-sm btn-white">Отмена</button>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
import * as Yup from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useStore } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'CustomerBoardNewColumn',
  components: { Form, Field, ErrorMessage },
  setup(_, { emit }) {
    const store = useStore()
    const columnSchema = Yup.object({
      title: Yup.string()
        .required()
        .label('Название колонки')
    })
    const submitColumn = (values) => {
      store.dispatch('customerModule/createBoardColumn', values)
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
      emit('column-create:close')
    }

    return {
      submitColumn,
      columnSchema
    }
  }
}
</script>
