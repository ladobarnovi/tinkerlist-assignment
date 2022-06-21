<template>
  <div class="icon material-symbols-outlined" :class="`${size} ${isFilled && 'is-filled'}`">
    {{ name }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

type IconSizes = 'sm' | 'md' | 'lg' | 'xl'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String as PropType<IconSizes>,
      default: 'md'
    },
    isFilled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style scoped lang="scss">
.icon {
  color: rgba(0, 0, 0, 0.6);
  font-weight: inherit;

  &.sm {
    font-size: 16px;
  }

  &.md {
    font-size: 24px;
  }

  &.lg {
    font-size: 32px;
  }

  &.xl {
    font-size: 48px;
  }

  &.is-filled {
    font-variation-settings:
      'FILL' 1
  }
}
</style>
