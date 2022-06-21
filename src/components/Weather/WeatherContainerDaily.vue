<template>
  <div class="container">
    <p class="title">Next 7 Days</p>
    <WeatherCardDaily v-for="(weather, index) in weatherList" :key="index" :weather="weather" />
    <template v-if="!weatherList">
      <div v-for="i in 6" :key="i" class="shimmer"/>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import WeatherCardDaily from '@/components/Weather/WeatherCardDaily.vue'
import { WeatherInfoDaily } from '@/hooks/useWeather'

export default defineComponent({
  name: 'WeatherContainerDaily',
  components: { WeatherCardDaily },
  props: {
    weatherList: {
      type: Array as PropType<WeatherInfoDaily[]>,
      required: true
    }
  }
})
</script>

<style scoped lang="scss">
.container {
  .shimmer {
    height: 40px;
    margin-bottom: 8px;
  }
}
</style>
