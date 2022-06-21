<template>
  <div class="container">
    <template v-if="weather && place">
      <p class="title">Weather in {{ place?.formatted_address }}</p>

      <div class="top-container">
        <div class="icon-container">
          <WeatherIcon :weather="current?.weather[0].main" />
          <p>{{ current?.weather[0].description }}</p>
        </div>

        <div class="feels-like">
          <p class="temp">{{ Math.floor(current.temp) }}°</p>
          <p>Feels like {{ Math.floor(current.feels_like) }}°</p>
        </div>
      </div>

      <ul class="weather-info">
        <InfoRow icon="thermometer" label="Max" :value="`${today?.temp.max}%`" :is-filled="true" />
        <InfoRow icon="thermometer" label="Min" :value="`${today?.temp.min}%`" />
        <InfoRow icon="cloud" label="Clouds" :value="`${today?.clouds}%`" />
        <InfoRow icon="solar_power" label="UVI" :value="`${today?.uvi} of 10`" />

        <AccordionContainer :is-active="isExpanded">
          <InfoRow icon="air" label="Wind Speed" :value="`${today?.wind_speed} km/h`" />
          <InfoRow icon="compress" label="Pressure" :value="`${today?.pressure} cm`" />
          <InfoRow icon="humidity_low" label="Humidity" :value="`${today?.humidity}%`" />
          <InfoRow icon="wb_twilight" label="Sunrise" :value="sunrise" />
          <InfoRow icon="nightlight" label="Sunset" :value="sunset" />
        </AccordionContainer>
      </ul>
      <button class="toggle-expand" @click="toggleExpand">
        <span v-if="isExpanded">Show Less</span>
        <span v-else>Show More</span>
        <MaterialIcon
          :name="isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          size="md"
        />
      </button>
    </template>
    <template v-else>
      <div v-for="i in 10" :key="i" class="shimmer"/>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { WeatherInfoCurrent, WeatherInfoDaily, WeatherResponse } from '@/hooks/useWeather'
import moment from 'moment'
import WeatherIcon from '@/components/Weather/WeatherIcon.vue'
import MaterialIcon from '@/components/MaterialIcon.vue'
import InfoRow from '@/components/InfoRow.vue'
import AccordionContainer from '@/components/AccordionContainer.vue'

export default defineComponent({
  name: 'WeatherContainerCurrent',
  components: { AccordionContainer, InfoRow, MaterialIcon, WeatherIcon },
  props: {
    place: {
      type: Object as PropType<google.maps.GeocoderResult>,
      required: true
    },
    weather: {
      type: Object as PropType<WeatherResponse>,
      required: true
    }
  },
  setup (props) {
    const isExpanded = ref(false)

    const current = computed<WeatherInfoCurrent>(() => props.weather.current)
    const today = computed<WeatherInfoDaily>(() => props.weather.daily[0])

    const sunrise = computed(() => moment(today.value?.sunrise * 1000).format('HH:mm'))
    const sunset = computed(() => moment(today.value?.sunset * 1000).format('HH:mm'))

    function toggleExpand () {
      isExpanded.value = !isExpanded.value
    }

    return {
      current,
      today,
      sunrise,
      sunset,
      isExpanded,
      toggleExpand
    }
  }
})
</script>

<style scoped lang="scss">
.container {
  .top-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 3px solid rgba(0, 0, 0, 0.5);
    padding-bottom: 8px;

    .icon-container {
      display: flex;
      flex-direction: column;
      gap: 8px;

      p {
        font-weight: 600;
        text-transform: capitalize;
      }
    }

    .feels-like {
      text-align: center;

      .temp {
        font-size: 48px;
        font-weight: 600;
      }
    }
  }

  .weather-info {
    margin-top: 8px;
  }

  .toggle-expand {
    display: flex;
    align-items: center;
    margin-left: auto;
    font-weight: 700;
  }

  .shimmer {
    height: 24px;
    margin-bottom: 8px;
  }
}
</style>
