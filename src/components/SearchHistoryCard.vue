<template>
  <RouterLink class="search-history-card" :title="place.name" :to="`/weather/${place.id}`">
    <template v-if="today">
      <p class="location">{{ place.name }}</p>
      <div class="wrapper">
        <WeatherIcon :weather="today?.weather[0].main" />
        <p class="temp">{{ Math.floor(today?.temp) }}°</p>
        <div class="humidity">
          <MaterialIcon name="humidity_low" size="sm" />
          <span>{{ today?.humidity }}%</span>
        </div>
      </div>

      <MaterialIcon class="delete" name="close" @click="deleteHistory(place.id)" />
    </template>
    <template v-else>
      <div class="shimmer sm" />
      <div class="shimmer lg" />
    </template>
  </RouterLink>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue'
import { useWeather, WeatherInfoCurrent } from '@/hooks/useWeather'
import { HistoryItem, useHistory } from '@/hooks/useHistory'
import WeatherIcon from '@/components/Weather/WeatherIcon.vue'
import MaterialIcon from '@/components/MaterialIcon.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'SearchHistoryCard',
  components: { MaterialIcon, WeatherIcon },
  props: {
    place: {
      type: Object as PropType<HistoryItem>,
      required: true
    }
  },
  setup (props) {
    const today = ref<WeatherInfoCurrent>()
    const { getWeather } = useWeather()
    const { deleteHistory } = useHistory()

    onMounted(async () => {
      const res = await getWeather(props.place.lat, props.place.lng)
      today.value = res.current
    })

    return {
      today,
      deleteHistory
    }
  }
})
</script>

<style scoped lang="scss">
.search-history-card {
  background-color: white;
  border-radius: 4px;
  padding: 8px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  color: inherit;
  text-decoration: none;

  .location {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-right: 16px;
  }

  .wrapper {
    margin-top: 4px;
    display: flex;
    align-items: flex-end;

    .temp {
      margin-right: auto;
      margin-left: 4px;
      font-size: 20px;
      font-weight: 700;
    }

    .humidity {
      display: flex;
      align-items: center;

      span {
        margin-top: 2px;
      }
    }
  }

  .delete {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
  }
}

.shimmer {
  &.sm {
    height: 16px;
    margin-bottom: 4px;
  }

  &.lg {
    height: 48px;
  }
}
</style>
