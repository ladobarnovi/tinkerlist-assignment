<template>
  <div class="home">
    <SearchHistory />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchInput from '@/components/SearchInput.vue'
import SearchHistory from '@/components/SearchHistory.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    SearchHistory
  }
})
</script>

<style scoped lang="scss">
.home {
  padding: 8px
}
</style>
