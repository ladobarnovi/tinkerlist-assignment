<template>
  <li>
    <MaterialIcon :name="icon" :is-filled="isFilled" />
    <p class="label">{{ label }}</p>
    <p class="value">{{ value }}</p>
  </li>
</template>

<script>
import { defineComponent } from 'vue'
import MaterialIcon from '@/components/MaterialIcon'

export default defineComponent({
  name: 'InfoRow',
  components: { MaterialIcon },
  props: {
    icon: {
      type: String,
      required: true
    },
    isFilled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped lang="scss">
li {
  display: flex;
  align-items: center;
  padding: 8px 0;

  .icon {
    margin-right: 4px;
  }

  .label {
    margin-right: auto;
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  }
}
</style>
