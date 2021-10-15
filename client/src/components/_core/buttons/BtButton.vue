<template>
  <component :is="tag" :type="btnType" class="btn" :class="btnClass" @click="clickAction">
    <span v-if="iconUrl" class="svg-icon" :class="iconClass">
      <inline-svg :src="iconUrl" />
    </span>
    <slot/>
  </component>
</template>
<script>
export default {
  name: 'BtButton',
  emits: ['click:btn'],
  props: {
    btnClass: String,
    btnType: {
      type: String,
      default: 'button'
    },
    iconClass: [String, Array],
    iconUrl: String,
    tag: {
      default: 'button'
    }
  },
  methods: {
    clickAction(event) {
      this.$emit('click:btn', event);
    }
  }
}
</script>
