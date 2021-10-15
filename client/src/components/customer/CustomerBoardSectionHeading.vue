<template>
  <div class="mb-9">
    <div class="d-flex flex-stack">
      <div class="fw-bolder fs-4">{{ column.title }}
        <span class="fs-6 text-gray-400 ms-2">{{ column.customers.length }}</span>
      </div>
      <bt-tooltip title="Изменить колонку" placement="top">
        <bt-button
          :btn-class="`btn-active-light-${column.color}`"
          class="btn btn-sm btn-icon btn-color-light-dark"
          icon-url="/media/icons/duotone/General/Edit.svg"
          icon-class="svg-icon-2"
        />
      </bt-tooltip>
    </div>
    <div class="h-3px w-100" :class="`bg-${column.color}`"></div>
  </div>
</template>
<script>
import BtTooltip from '@/components/_core/BtTooltip'
import BtButton from '@/components/_core/buttons/BtButton'

export default {
  name: 'CustomerBoardSectionHeading',
  props: ['column'],
  components: { BtButton, BtTooltip }
}
</script>
