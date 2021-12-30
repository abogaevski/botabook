<template>
  <Field
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
  <Field
    name="endWorkHour"
    v-slot="{ value, handleChange }"
  >
    <el-time-select
      class="d-block"
      :editable="false"
      :clearable="false"
      :model-value="value"
      @update:model-value="handleChange"
      placeholder="Время конца"
      start="00:00"
      step="01:00"
      end="22:00"
    />
  </Field>
</template>
