<template>
  <div class="d-flex flex-row justify-content-between">
    <div class="row w-100 d-flex flex-start align-items-center mb-2 min-h-40px">
      <div class="col-lg-3">
        <span class="fs-6 text-muted fw-bolder">
          {{ wh.title }}
        </span>
      </div>
      <div class="col-lg-3">
        <div class="d-flex flex-row">
          <span class="fs-6 fw-bold text-gray-500 me-2">Выходной?</span>
          <el-switch v-model="dayOff" @change="updateWorkHour"/>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="d-flex flex-row" v-if="!dayOff">
          <el-time-select
            class="me-2"
            v-model="start"
            :editable="true"
            :clearable="false"
            start="00:00"
            step="00:30"
            end="23:00"
            @change="updateWorkHour"
          />
          <el-time-select
            v-model="end"
            :editable="true"
            :clearable="false"
            start="00:00"
            step="01:00"
            end="22:00"
            @change="updateWorkHour"
          />
        </div>
        <div class="fs-5 fw-bolder text-muted" v-else>
          У вас выходной:)
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs, watchEffect, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ProfileWorkHoursItem',
  props: {
    wh: {
      required: true,
      type: Object
    },
    profileId: {
      required: true
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const { wh, profileId } = toRefs(props)
    const whId = ref(0)
    const dayOff = ref(false)
    const start = ref('')
    const end = ref('')
    watchEffect(() => {
      whId.value = wh.value.id
      dayOff.value = wh.value.dayOff
      start.value = wh.value.startTime
      end.value = wh.value.endTime
    })
    const updateWorkHour = () => {
      const whData = {
        profileId: profileId.value,
        wh: {
          id: whId.value,
          startTime: start.value,
          endTime: end.value,
          dayOff: dayOff.value
        }
      }
      store.dispatch('userProfile/updateWorkHour', whData)
        .then(() => {
          emit('wh-saved')
        })
    }
    return {
      dayOff,
      start,
      end,
      updateWorkHour
    }
  }
}
</script>
