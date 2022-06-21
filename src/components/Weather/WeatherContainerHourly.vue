<template>
  <div class="container">
    <p class="title">Next 12 Hours</p>
    <WeatherCardHourly v-for="(weather, index) in weatherList" :key="index" :weather="weather" />
    <template v-if="!weatherList">
      <div v-for="i in 6" :key="i" class="shimmer"/>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { WeatherInfoCurrent } from '@/hooks/useWeather'
import WeatherCardHourly from '@/components/Weather/WeatherCardHourly.vue'

export default defineComponent({
  name: 'WeatherContainerHourly',
  components: { WeatherCardHourly },
  props: {
    weatherList: {
      type: Array as PropType<WeatherInfoCurrent[]>,
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
