<template>
  <div class="weather">
    <WeatherContainerCurrent
      :place="place"
      :weather="weather"
    />

    <WeatherContainerHourly :weather-list="hourly" />
    <WeatherContainerDaily :weather-list="daily" />
  </div>
</template>

<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useWeather, WeatherResponse } from '@/hooks/useWeather'
import { useMaps } from '@/hooks/useMaps'
import WeatherContainerCurrent from '@/components/Weather/WeatherContainerCurrent.vue'
import WeatherContainerHourly from '@/components/Weather/WeatherContainerHourly.vue'
import WeatherContainerDaily from '@/components/Weather/WeatherContainerDaily.vue'
import { useHistory } from '@/hooks/useHistory'

export default defineComponent({
  name: 'WeatherView',
  components: { WeatherContainerDaily, WeatherContainerHourly, WeatherContainerCurrent },
  setup () {
    const route = useRoute()
    const { push } = useRouter()

    const { setHistory } = useHistory()
    const { getWeather } = useWeather()
    const { getPlaceById } = useMaps()

    const isFetching = ref(true)
    const place = ref<google.maps.GeocoderResult>()
    const weather = ref<WeatherResponse>()

    onMounted(() => fetchData())

    const hourly = computed(() => weather.value?.hourly.slice(0, 12))
    const daily = computed(() => weather.value?.daily)

    async function fetchData () {
      const { placeId } = route.params

      weather.value = undefined

      try {
        place.value = await getPlaceById(placeId as string)

        setHistory({
          id: place.value?.place_id,
          name: place.value?.formatted_address,
          lat: place.value?.geometry.location.lat(),
          lng: place.value?.geometry.location.lng()
        })

        const lng = place.value.geometry.location.lng()
        const lat = place.value.geometry.location.lat()

        weather.value = await getWeather(lat, lng)
      } catch {
        await push('/')
      } finally {
        isFetching.value = false
      }
    }

    watch(route, () => fetchData())

    return {
      place,
      weather,
      hourly,
      daily,
      isFetching
    }
  }
})
</script>

<style scoped lang="scss">
.weather {
  padding: 0 8px;
}
</style>
