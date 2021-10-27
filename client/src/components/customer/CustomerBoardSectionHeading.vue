<template>
  <div class="mb-9">
    <div class="d-flex flex-stack">
      <div class="me-2 w-100">
        <input
          v-if="!isActiveChangeColor"
          @change="updateTitle"
          class="fw-bolder fs-4 form-control form-control-flush form-control-solid"
          type="text"
          :value="column.title"
        >
        <el-select
          v-else
          v-model="currentColor"
          @update:model-value="updateColor"
          class="form-control-flush form-control-solid board__column-color-picker"
        >
          <el-option
            v-for="(color, i) in colors"
            :key="i"
            :value="color.color"
            :label="color.name"
            placeholder="Выберите цвет"
          >
            <span class="svg-icon svg-icon-3 me-3" :class="`svg-icon-${color.color}`">
              <inline-svg src="/media/icons/duotone/Design/Circle.svg"></inline-svg>
            </span>
            {{ color.name }}
          </el-option>
        </el-select>
      </div>
      <span v-if="isUpdating" class="fw-bolder me-4 text-primary">
        <span class="spinner-border spinner-border-sm align-middle"></span>
      </span>
      <bt-tooltip :title="getColorPickerTooltipTitle()" placement="top">
        <bt-button
          @click="isActiveChangeColor = !isActiveChangeColor"
          :btn-class="`btn-active-light-${column.color}`"
          class="btn btn-sm btn-icon btn-color-light-dark"
          :icon-url="getIconUrl()"
          icon-class="svg-icon-2"
          :disabled="isUpdating"
        />
      </bt-tooltip>

      <bt-tooltip :title="getTooltipTitle(column.isPrimary)" placement="top">
        <bt-button
          @click="updatePrimaryColumn(column)"
          class="btn btn-sm btn-icon btn-active-light-warning"
          icon-url="/media/icons/duotone/General/Star.svg"
          :icon-class="['svg-icon-2', {'svg-icon-warning': column.isPrimary}]"
          :disabled="isUpdating"
        />
      </bt-tooltip>
      <bt-tooltip :title="getDeleteTooltipTitle()" placement="top">
        <bt-button
          :disabled="column.isPrimary || isUpdating"
          @click="deleteColumn"
          class="btn btn-sm btn-icon btn-active-light-danger"
          icon-url="/media/icons/duotone/General/Trash.svg"
          icon-class="svg-icon-2 svg-active-icon-danger"
        />
      </bt-tooltip>
    </div>
    <div class="h-3px w-100" :class="`bg-${column.color}`"></div>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { toRefs, ref } from 'vue'
import Swal from 'sweetalert2'
import BtTooltip from '@/components/_core/BtTooltip'
import BtButton from '@/components/_core/buttons/BtButton'

export default {
  name: 'CustomerBoardSectionHeading',
  props: ['column'],
  components: { BtButton, BtTooltip },
  setup(props) {
    const store = useStore()
    const { column } = toRefs(props)
    const isUpdating = ref(false)
    const updateTitle = (e) => {
      const title = e.target.value
      isUpdating.value = true
      store.dispatch('customerModule/updateBoardColumn', { id: column.value.id, title })
        .then(() => isUpdating.value = false)
        .catch((error) => {
          isUpdating.value = false
          Swal.fire({
            title: 'Произошла ошибка!',
            html: error,
            icon: 'error',
            buttonsStyling: false,
            confirmButtonText: 'Попробовать еще раз',
            customClass: {
              confirmButton: 'btn btn-secondary'
            }
          })
        })
      e.target.blur()
    }
    const updatePrimaryColumn = (col) => {
      if (!col.isPrimary) {
        isUpdating.value = true
        store.dispatch('customerModule/updateBoardColumn', { id: col.id, isPrimary: true })
          .then(() => isUpdating.value = false)
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
      }
    }
    const getTooltipTitle = (primary) => (primary ? 'Основная колонка' : 'Сделать основной')

    const isActiveChangeColor = ref(false)
    const colors = [
      {
        name: 'Синий',
        color: 'primary'
      },
      {
        name: 'Зеленый',
        color: 'success'
      },
      {
        name: 'Красный',
        color: 'danger'
      },
      {
        name: 'Фиолетовый',
        color: 'info'
      },
      {
        name: 'Желтый',
        color: 'warning'
      },
    ]
    const currentColor = ref(column.value.color)
    const getIconUrl = () => (isActiveChangeColor.value ? '/media/icons/duotone/Navigation/Close.svg' : '/media/icons/duotone/Design/Color.svg')
    const getColorPickerTooltipTitle = () => (isActiveChangeColor.value ? 'Закрыть' : 'Изменить цвет')
    const updateColor = () => {
      if (column.value.color !== currentColor.value) {
        isUpdating.value = true
        store.dispatch('customerModule/updateBoardColumn', { id: column.value.id, color: currentColor.value })
          .then(() => isUpdating.value = false)
          .catch((e) => {
            isUpdating.value = false
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
        isActiveChangeColor.value = false
      }
    }

    const deleteColumn = () => {
      Swal.fire({
        title: 'Вы уверены, что хотите удалить колонку?',
        html: 'Ваши клиенты отобразятся в основной колонке',
        icon: 'question',
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: 'Удалить!',
        cancelButtonText: 'Отмена',
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-active-light'
        }
      }).then((result) => {
        if (result.value) {
          isUpdating.value = true
          store.dispatch('customerModule/deleteBoardColumn', column.value.id)
            .then(() => isUpdating.value = false)
            .catch((e) => {
              isUpdating.value = false
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
        }
      })
    }
    const getDeleteTooltipTitle = () => (column.value.isPrimary ? 'Вы не можете удалить основную колонку' : 'Удалить колонку')

    return {
      updateTitle,
      updatePrimaryColumn,
      getTooltipTitle,
      isActiveChangeColor,
      colors,
      currentColor,
      getIconUrl,
      updateColor,
      getColorPickerTooltipTitle,
      deleteColumn,
      getDeleteTooltipTitle,
      isUpdating
    }
  }
}
</script>
