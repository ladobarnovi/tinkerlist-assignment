<template>
  <div class="weather-card weather-card-daily">
    <div class="main-container" @click="toggleActive">
      <p class="time">
        {{ date }}
      </p>

      <WeatherIcon :weather="weather.weather[0].main" />

      <p class="temperature">
        <span class="max">{{ Math.floor(weather.temp.max) }}°</span>/
        <span class="min">{{ Math.floor(weather.temp.min) }}°</span>
      </p>

      <div class="humidity">
        <MaterialIcon name="humidity_low" size="sm" />
        <span>
          {{ weather.humidity }}%
        </span>
      </div>

      <MaterialIcon
        :name="active ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
      />
    </div>
    <AccordionContainer :is-active="active">
      <div class="weather-info">
        <ul class="column">
          <InfoRow icon="thermometer" label="Max" :value="`${weather.temp.max}%`" :is-filled="true" />
          <InfoRow icon="thermometer" label="Min" :value="`${weather.temp.min}%`" />
          <InfoRow icon="cloud" label="Clouds" :value="`${weather.clouds}%`" />
          <InfoRow icon="solar_power" label="UVI" :value="`${weather.uvi} of 10`" />
        </ul>
        <ul class="column">
          <InfoRow icon="air" label="Wind Speed" :value="`${weather.wind_speed} km/h`" />
          <InfoRow icon="compress" label="Pressure" :value="`${weather.pressure} cm`" />
          <InfoRow icon="wb_twilight" label="Sunrise" :value="sunrise" />
          <InfoRow icon="nightlight" label="Sunset" :value="sunset" />
        </ul>
      </div>
    </AccordionContainer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import moment from 'moment'
import { WeatherInfoDaily } from '@/hooks/useWeather'
import WeatherIcon from '@/components/Weather/WeatherIcon.vue'
import MaterialIcon from '@/components/MaterialIcon.vue'
import AccordionContainer from '@/components/AccordionContainer.vue'
import InfoRow from '@/components/InfoRow.vue'

export default defineComponent({
  name: 'WeatherCardDaily',
  components: { InfoRow, AccordionContainer, MaterialIcon, WeatherIcon },
  props: {
    weather: {
      type: Object as PropType<WeatherInfoDaily>,
      required: true
    }
  },
  setup (props) {
    const active = ref(false)

    const date = computed(() => moment(props.weather.dt * 1000).format('DD/MM'))

    function toggleActive () {
      active.value = !active.value
    }

    const sunrise = computed(() => moment(props.weather.sunrise * 1000).format('HH:mm'))
    const sunset = computed(() => moment(props.weather.sunset * 1000).format('HH:mm'))

    return {
      date,
      active,
      sunrise,
      sunset,
      toggleActive
    }
  }
})
</script>

<style scoped lang="scss">
.weather-card-daily {
  .temperature {
    font-weight: 600;
    .min {
      opacity: 0.6;
    }
  }
}
</style>
