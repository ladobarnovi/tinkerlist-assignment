<template>
  <div class="weather-card weather-card-hourly">
    <div class="main-container" @click="toggleActive">
      <p class="time">
        {{ date }}
      </p>

      <WeatherIcon :weather="weather.weather[0].main" />

      <p class="temperature">
        {{ Math.floor(weather.temp) }}°
      </p>

      <p class="feels-like">
        Feels like {{ Math.floor(weather.feels_like) }}°
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

    <AccordionContainer :is-active="active" >
      <div class="weather-info">
        <ul class="column">
          <InfoRow icon="thermometer" label="Temperature" :value="`${Math.floor(weather.temp)}°`" />
          <InfoRow icon="cloud" label="Clouds" :value="`${weather.clouds}%`" />
          <InfoRow icon="solar_power" label="UVI" :value="`${weather.uvi} of 10`" />
        </ul>
        <ul class="column">
          <InfoRow icon="air" label="Wind Speed" :value="`${weather.wind_speed} km/h`" />
          <InfoRow icon="compress" label="Pressure" :value="`${weather.pressure} cm`" />
          <InfoRow icon="humidity_low" label="Humidity" :value="`${weather.humidity}%`" />
        </ul>
      </div>
    </AccordionContainer>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue'
import { WeatherInfoCurrent } from '@/hooks/useWeather'
import moment from 'moment'
import WeatherIcon from '@/components/Weather/WeatherIcon.vue'
import MaterialIcon from '@/components/MaterialIcon.vue'
import AccordionContainer from '@/components/AccordionContainer.vue'
import InfoRow from '@/components/InfoRow.vue'

export default defineComponent({
  name: 'WeatherCard',
  components: { InfoRow, AccordionContainer, MaterialIcon, WeatherIcon },
  props: {
    weather: {
      type: Object as PropType<WeatherInfoCurrent>,
      required: true
    }
  },
  setup (props) {
    const active = ref(false)

    const date = computed(() => moment(props.weather.dt * 1000).format('HH:mm'))

    function toggleActive () {
      active.value = !active.value
    }

    return {
      active,
      toggleActive,
      date
    }
  }
})
</script>

<style scoped lang="scss">
.weather-card-hourly {
  .feels-like {
    margin: 0 auto;
    display: none;
  }

  @media (min-width: 768px) {
    .feels-like {
      display: block;
    }

    .humidity {
      margin-left: unset;
    }
  }
}
</style>
