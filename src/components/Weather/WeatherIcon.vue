<template>
  <MaterialIcon class="weather-icon" :name="weatherIcon" size="xl" />
</template>

<script>
import MaterialIcon from '@/components/MaterialIcon'
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'WeatherIcon',
  components: { MaterialIcon },
  props: {
    weather: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const weatherIcon = computed(() => {
      switch (props.weather) {
        case 'Clear':
          return 'sunny'
        case 'Clouds':
          return 'cloudy'
        case 'Rain':
          return 'rainy'
        case 'Snow':
          return 'weather_snowy'
        default:
          return 'sunny'
      }
    })

    return {
      weatherIcon
    }
  }
})
</script>

<style scoped>

</style>
