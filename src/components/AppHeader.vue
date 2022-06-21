<template>
  <div class="app-header">
    <RouterLink to="/">
      <MaterialIcon name="wb_sunny" size="lg" />
      <span>Weather App</span>
    </RouterLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MaterialIcon from '@/components/MaterialIcon.vue'

export default defineComponent({
  name: 'AppHeader',
  components: { MaterialIcon }
})
</script>

<style scoped lang="scss">
.app-header {
  padding: 8px;
  font-weight: 700;
  background-color: white;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #1f1f1f;
  }

  .icon {
    margin-right: 8px;
  }
}
</style>
